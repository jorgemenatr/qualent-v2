import { anthropic } from "@ai-sdk/anthropic";
import { streamText } from "ai";
import { retrieveContext, formatContextForPrompt } from "@/lib/rag";

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

export async function POST(req: Request) {
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

    if (lastUserMessage?.content) {
      // Retrieve relevant context from knowledge base
      const context = await retrieveContext(lastUserMessage.content);
      contextPrompt = formatContextForPrompt(context);
    }

    // Build the full system prompt with retrieved context
    const fullSystemPrompt = contextPrompt
      ? `${SYSTEM_PROMPT}\n\n${contextPrompt}`
      : SYSTEM_PROMPT;

    // Stream the response using Claude
    const result = streamText({
      model: anthropic("claude-sonnet-4-20250514"),
      system: fullSystemPrompt,
      messages,
    });

    return result.toTextStreamResponse();
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
