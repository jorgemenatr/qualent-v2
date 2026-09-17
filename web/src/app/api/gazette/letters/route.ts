import { NextRequest, NextResponse } from "next/server";
import { getPrisma } from "@/lib/db";
import { z } from "zod";

const letterSchema = z.object({
  place: z.string().max(120).optional(),
  letter: z
    .string()
    .min(20, "Tell us a little more about the spreadsheet")
    .max(5000, "That is longer than the paper"),
  email: z.string().email("Invalid email address").optional().or(z.literal("")),
});

export async function POST(request: NextRequest) {
  try {
    const validated = letterSchema.parse(await request.json());
    const email = validated.email || null;

    const prisma = await getPrisma();
    const letter = await prisma.gazetteLetter.create({
      data: {
        place: validated.place || null,
        letter: validated.letter,
        email,
        status: "unread",
      },
    });

    // Writing in is opting in only if they left an address.
    if (email) {
      await prisma.contact.upsert({
        where: { email },
        update: {},
        create: { email, source: "gazette_letter" },
      });
    }

    return NextResponse.json({ success: true, id: letter.id }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      const issues = error.issues || [];
      return NextResponse.json(
        { success: false, error: issues[0]?.message || "Validation error" },
        { status: 400 }
      );
    }

    console.error("Error saving gazette letter:", error);
    return NextResponse.json(
      { success: false, error: "Failed to send letter" },
      { status: 500 }
    );
  }
}
