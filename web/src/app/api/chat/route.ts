import { createAnthropic } from "@ai-sdk/anthropic";
import { streamText, createUIMessageStream, createUIMessageStreamResponse, generateId } from "ai";
import { retrieveContext, formatContextForPrompt } from "@/lib/rag";

// Message type for streamText
type Message = {
  role: "user" | "assistant";
  content: string;
};

export const maxDuration = 30;

const SYSTEM_PROMPT = `You are an AI assistant for PickleLlama, an AI and automation consulting practice that helps mid-market companies (50-500 employees) navigate technology decisions.

Your role is to:
1. Answer questions about AI, automation, and technology strategy
2. Reference PickleLlama's frameworks and reports when relevant
3. Provide practical, actionable guidance
4. Be honest about limitations and when to seek human expertise

Key principles:
- Be concise and direct - busy executives don't have time for fluff
- Focus on practical application, not theory
- When you cite information from the retrieved context, mention the source
- If you don't have enough information, say so rather than making things up
- Suggest scheduling a conversation with PickleLlama for complex or specific situations

PickleLlama's key frameworks include:
- FIVES Framework: For evaluating automation opportunities (Frequency, Impact, Variability, Existing Data, Stakeholder Readiness)
- Build vs Buy analysis
- Pilot to Production methodology
- Data Readiness assessment

When formatting responses:
- Use markdown for structure
- Keep paragraphs short
- Use bullet points for lists
- Bold key terms when helpful`;

// Helper to extract text content from message (handles both formats)
function getMessageText(message: { content?: string; parts?: Array<{ type: string; text?: string }> }): string {
  if (message.content) {
    return message.content;
  }
  if (message.parts) {
    return message.parts
      .filter((part): part is { type: string; text: string } => part.type === "text" && !!part.text)
      .map((part) => part.text)
      .join("");
  }
  return "";
}

// Convert incoming messages to the format expected by streamText
function convertToMessages(messages: Array<{ role: string; content?: string; parts?: Array<{ type: string; text?: string }> }>): Message[] {
  return messages.map((msg) => ({
    role: msg.role as "user" | "assistant",
    content: getMessageText(msg),
  }));
}

export async function POST(req: Request) {
  // Get API key from environment
  const anthropicKey = process.env.ANTHROPIC_API_KEY;

  if (!anthropicKey) {
    return new Response(
      JSON.stringify({ error: "Anthropic API key not configured" }),
      { status: 503, headers: { "Content-Type": "application/json" } }
    );
  }

  // Create Anthropic client with explicit API key
  const anthropic = createAnthropic({
    apiKey: anthropicKey,
  });

  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return new Response(JSON.stringify({ error: "Messages are required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Get the latest user message for retrieval
    const lastUserMessage = messages
      .filter((m: { role: string }) => m.role === "user")
      .pop();

    let contextPrompt = "";

    const lastUserText = lastUserMessage ? getMessageText(lastUserMessage) : "";
    if (lastUserText) {
      // Retrieve relevant context from knowledge base
      const context = await retrieveContext(lastUserText);
      contextPrompt = formatContextForPrompt(context);
    }

    // Build the full system prompt with retrieved context
    const fullSystemPrompt = contextPrompt
      ? `${SYSTEM_PROMPT}\n\n${contextPrompt}`
      : SYSTEM_PROMPT;

    // Convert messages to the format expected by streamText
    const formattedMessages = convertToMessages(messages);

    // Stream the response using Claude
    const result = streamText({
      model: anthropic("claude-sonnet-4-20250514"),
      system: fullSystemPrompt,
      messages: formattedMessages,
    });

    // Create a UI message stream for the frontend
    const textPartId = generateId();
    const stream = createUIMessageStream({
      execute: async ({ writer }) => {
        try {
          // Signal text start
          writer.write({ type: "text-start", id: textPartId });

          // Stream text chunks to the writer
          let hasContent = false;
          for await (const chunk of result.textStream) {
            hasContent = true;
            writer.write({ type: "text-delta", delta: chunk, id: textPartId });
          }

          // If no content was streamed, check for errors
          if (!hasContent) {
            try {
              // Wait for the result to complete to get any errors
              const finalText = await result.text;
              if (finalText) {
                writer.write({ type: "text-delta", delta: finalText, id: textPartId });
              } else {
                // Check if API key is configured
                const hasApiKey = !!process.env.ANTHROPIC_API_KEY;
                writer.write({
                  type: "error",
                  errorText: `No output generated. API key configured: ${hasApiKey}. Check the stream for errors.`
                });
              }
            } catch (textError) {
              console.error("Error getting final text:", textError);
              writer.write({
                type: "error",
                errorText: textError instanceof Error ? `API Error: ${textError.message}` : "Unknown API error"
              });
            }
          }

          // Signal text end
          writer.write({ type: "text-end", id: textPartId });
        } catch (streamError) {
          console.error("Stream execution error:", streamError);
          // Write error to the stream
          writer.write({
            type: "error",
            errorText: streamError instanceof Error ? streamError.message : "Stream error occurred"
          });
        }
      },
      onError: (error) => {
        console.error("UI Message Stream error:", error);
        return error instanceof Error ? error.message : "An error occurred";
      },
    });

    // Return the UI message stream response
    return createUIMessageStreamResponse({ stream });
  } catch (error) {
    console.error("Chat API error:", error);

    // Check for specific error types
    if (error instanceof Error) {
      if (error.message.includes("rate limit")) {
        return new Response(
          JSON.stringify({
            error: "Too many requests. Please wait a moment and try again.",
          }),
          { status: 429, headers: { "Content-Type": "application/json" } }
        );
      }

      if (error.message.includes("API key")) {
        return new Response(
          JSON.stringify({
            error: "Service configuration error. Please try again later.",
          }),
          { status: 503, headers: { "Content-Type": "application/json" } }
        );
      }
    }

    return new Response(
      JSON.stringify({
        error: "An error occurred while processing your request.",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
