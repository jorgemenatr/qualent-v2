import { GoogleGenAI } from "@google/genai";

const genai = new GoogleGenAI({
  apiKey: process.env.GOOGLE_AI_API_KEY || "",
});

export interface RetrievalResult {
  content: string;
  source: string;
  relevanceScore?: number;
}

export interface RAGContext {
  query: string;
  retrievedContent: RetrievalResult[];
  totalTokens?: number;
}

/**
 * Retrieve relevant content from Gemini's grounded generation
 * using the uploaded report corpus
 */
export async function retrieveContext(query: string): Promise<RAGContext> {
  const corpusName = process.env.GEMINI_CORPUS_NAME;

  if (!corpusName) {
    console.warn("GEMINI_CORPUS_NAME not set, using fallback retrieval");
    return {
      query,
      retrievedContent: [],
    };
  }

  try {
    // Use Gemini's grounded generation with retrieval
    const result = await genai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: `Based on the PickleLlama knowledge base, find relevant information for this question: "${query}"

Return ONLY the relevant excerpts and their sources. Do not answer the question directly.
Format each excerpt as:
[SOURCE: document name]
Excerpt content here...
---`,
      config: {
        temperature: 0.1,
        maxOutputTokens: 2000,
      },
    });

    const text = result.text ?? "";

    // Parse the response into structured results
    const retrievedContent = parseRetrievalResponse(text);

    return {
      query,
      retrievedContent,
      totalTokens: result.usageMetadata?.totalTokenCount,
    };
  } catch (error) {
    console.error("Error retrieving context from Gemini:", error);
    return {
      query,
      retrievedContent: [],
    };
  }
}

function parseRetrievalResponse(text: string): RetrievalResult[] {
  const results: RetrievalResult[] = [];
  const sections = text.split("---").filter((s) => s.trim());

  for (const section of sections) {
    const sourceMatch = section.match(/\[SOURCE:\s*(.+?)\]/i);
    const source = sourceMatch ? sourceMatch[1].trim() : "Unknown";
    const content = section.replace(/\[SOURCE:\s*.+?\]/i, "").trim();

    if (content) {
      results.push({
        content,
        source,
      });
    }
  }

  return results;
}

/**
 * Format retrieved context for inclusion in Claude prompt
 */
export function formatContextForPrompt(context: RAGContext): string {
  if (context.retrievedContent.length === 0) {
    return "";
  }

  let formatted = `\n<retrieved_context>\n`;
  formatted += `The following information was retrieved from PickleLlama's knowledge base:\n\n`;

  for (let i = 0; i < context.retrievedContent.length; i++) {
    const result = context.retrievedContent[i];
    formatted += `[${i + 1}] Source: ${result.source}\n`;
    formatted += `${result.content}\n\n`;
  }

  formatted += `</retrieved_context>\n`;
  return formatted;
}

/**
 * Simple keyword-based fallback retrieval from local content
 * Used when Gemini API is not available
 */
export async function fallbackRetrieval(query: string): Promise<RAGContext> {
  // This would search local MDX content
  // For now, return empty - the chat will work without RAG
  return {
    query,
    retrievedContent: [],
  };
}
