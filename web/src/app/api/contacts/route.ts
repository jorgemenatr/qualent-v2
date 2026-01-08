import { NextRequest, NextResponse } from "next/server";
import { getPrisma } from "@/lib/db";
import { z } from "zod";

const createContactSchema = z.object({
  email: z.string().email("Invalid email address"),
  name: z.string().optional(),
  company: z.string().optional(),
  source: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validated = createContactSchema.parse(body);

    // Upsert contact - create if doesn't exist, update if it does
    const prisma = await getPrisma();
    const contact = await prisma.contact.upsert({
      where: { email: validated.email },
      update: {
        name: validated.name || undefined,
        company: validated.company || undefined,
      },
      create: {
        email: validated.email,
        name: validated.name,
        company: validated.company,
        source: validated.source || "pdf_download",
      },
    });

    return NextResponse.json(
      { success: true, contact: { id: contact.id, email: contact.email } },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      const issues = error.issues || [];
      return NextResponse.json(
        { success: false, error: issues[0]?.message || "Validation error" },
        { status: 400 }
      );
    }

    console.error("Error creating contact:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create contact" },
      { status: 500 }
    );
  }
}
