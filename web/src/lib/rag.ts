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
 * Retrieve relevant content using Gemini's File Search tool
 * This queries the uploaded document corpus for relevant information
 */
export async function retrieveContext(query: string): Promise<RAGContext> {
  const fileSearchStore = process.env.GEMINI_FILE_SEARCH_STORE;

  if (!fileSearchStore) {
    console.warn("GEMINI_FILE_SEARCH_STORE not set, skipping RAG retrieval");
    return {
      query,
      retrievedContent: [],
    };
  }

  try {
    // Use Gemini with File Search tool to find relevant content
    const result = await genai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: `Based on the documents in the knowledge base, find and return relevant excerpts that would help answer this question: "${query}"

Return the most relevant passages with their source document names. Format as:
[SOURCE: document-name]
Relevant excerpt here...
---

If no relevant information is found, respond with "NO_RELEVANT_CONTENT".`,
      config: {
        tools: [
          {
            fileSearch: {
              fileSearchStoreNames: [fileSearchStore]
            }
          }
        ],
        temperature: 0.1,
        maxOutputTokens: 2000,
      },
    });

    const text = result.text ?? "";

    // Check if no relevant content was found
    if (text.includes("NO_RELEVANT_CONTENT")) {
      return {
        query,
        retrievedContent: [],
      };
    }

    // Parse the response into structured results
    const retrievedContent = parseRetrievalResponse(text);

    return {
      query,
      retrievedContent,
      totalTokens: result.usageMetadata?.totalTokenCount,
    };
  } catch (error) {
    console.error("Error retrieving context from Gemini File Search:", error);
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
