import { NextRequest, NextResponse } from "next/server";
import { getPrisma } from "@/lib/db";
import { sendEmail, getThunkBoxConfirmationEmail } from "@/lib/email";
import { syncClientToCRM } from "@/lib/crm-sync";
import { z } from "zod";

const requestSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  name: z.string().optional(),
  company: z.string().optional(),
  request: z
    .string()
    .min(20, "Please provide more detail about your request")
    .max(5000, "Request is too long"),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validated = requestSchema.parse(body);

    const prisma = await getPrisma();

    // Create the thunk box request
    const thunkRequest = await prisma.thunkBoxRequest.create({
      data: {
        email: validated.email,
        name: validated.name || null,
        company: validated.company || null,
        request: validated.request,
        status: "pending",
      },
    });

    // Also create/update contact
    await prisma.contact.upsert({
      where: { email: validated.email },
      update: {
        name: validated.name || undefined,
        company: validated.company || undefined,
      },
      create: {
        email: validated.email,
        name: validated.name,
        company: validated.company,
        source: "thunkbox_request",
      },
    });

    // Sync to CRM (fire and forget)
    syncClientToCRM({
      name: validated.name || validated.email.split("@")[0],
      email: validated.email,
      company: validated.company,
      notes: `Source: ThunkBox Request\n\nRequest:\n${validated.request.substring(0, 500)}${validated.request.length > 500 ? "..." : ""}`,
    }).catch((err) => console.error("CRM sync failed:", err));

    // Send confirmation email
    const emailContent = getThunkBoxConfirmationEmail(
      validated.name || "",
      validated.request.substring(0, 200) +
        (validated.request.length > 200 ? "..." : "")
    );

    sendEmail({
      to: validated.email,
      ...emailContent,
    }).catch((err) =>
      console.error("Failed to send thunkbox confirmation email:", err)
    );

    return NextResponse.json(
      {
        success: true,
        requestId: thunkRequest.id,
        message: "Your request has been submitted. We'll be in touch soon!",
      },
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

    console.error("Error creating thunkbox request:", error);
    return NextResponse.json(
      { success: false, error: "Failed to submit request" },
      { status: 500 }
    );
  }
}
