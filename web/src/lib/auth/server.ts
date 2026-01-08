import { NextRequest } from "next/server";
import { getPrisma } from "@/lib/db";

/**
 * Get the authenticated user from a request.
 * Expects cognitoId to be passed in the request body or as a header.
 * Returns the user from the database if found.
 */
export async function getAuthenticatedUser(request: NextRequest) {
  // Try to get cognitoId from header first (for GET/DELETE requests)
  let cognitoId = request.headers.get("x-cognito-id");

  // If not in header, try to get from body (for POST/PUT requests)
  if (!cognitoId && request.method !== "GET" && request.method !== "DELETE") {
    try {
      const body = await request.clone().json();
      cognitoId = body.cognitoId;
    } catch {
      // Body might not be JSON
    }
  }

  if (!cognitoId) {
    return null;
  }

  const prisma = await getPrisma();
  const user = await prisma.user.findUnique({
    where: { cognitoId },
  });

  return user;
}
