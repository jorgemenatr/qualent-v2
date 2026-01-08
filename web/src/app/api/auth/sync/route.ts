import { NextRequest, NextResponse } from "next/server";
import { getPrisma } from "@/lib/db";
import { z } from "zod";

const syncSchema = z.object({
  cognitoId: z.string().min(1, "Cognito ID is required"),
  email: z.string().email("Valid email is required"),
  name: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validated = syncSchema.parse(body);

    const prisma = await getPrisma();

    // Upsert user - create if doesn't exist, update if exists
    const user = await prisma.user.upsert({
      where: { cognitoId: validated.cognitoId },
      update: {
        email: validated.email,
        name: validated.name || null,
      },
      create: {
        cognitoId: validated.cognitoId,
        email: validated.email,
        name: validated.name || null,
      },
    });

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      const issues = error.issues || [];
      return NextResponse.json(
        { success: false, error: issues[0]?.message || "Validation error" },
        { status: 400 }
      );
    }

    console.error("Error syncing user:", error);
    return NextResponse.json(
      { success: false, error: "Failed to sync user" },
      { status: 500 }
    );
  }
}
