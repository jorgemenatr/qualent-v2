import { NextRequest, NextResponse } from "next/server";
import { getPrisma } from "@/lib/db";
import { getPresignedUrl, getReportPdfKey } from "@/lib/s3";
import { sendEmail, getDownloadConfirmationEmail } from "@/lib/email";
import { syncClientToCRM } from "@/lib/crm-sync";
import { z } from "zod";

const downloadSchema = z.object({
  reportSlug: z.string().min(1, "Report slug is required"),
  reportTitle: z.string().optional(),
  contactId: z.string().optional(),
  email: z.string().email().optional(),
  sendEmail: z.boolean().optional().default(false),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validated = downloadSchema.parse(body);

    const prisma = await getPrisma();

    // Get or create contact if email provided
    let contactId = validated.contactId;

    if (!contactId && validated.email) {
      const contact = await prisma.contact.upsert({
        where: { email: validated.email },
        update: {},
        create: {
          email: validated.email,
          source: "pdf_download",
        },
      });
      contactId = contact.id;

      // Sync to CRM (fire and forget)
      syncClientToCRM({
        name: validated.email.split("@")[0],
        email: validated.email,
        notes: `Source: PDF Download\nReport: ${validated.reportSlug}`,
      }).catch((err) => console.error("CRM sync failed:", err));
    }

    // Generate presigned URL
    const pdfKey = getReportPdfKey(validated.reportSlug);
    const downloadUrl = await getPresignedUrl(pdfKey, 3600); // 1 hour expiry

    // Track the download
    await prisma.download.create({
      data: {
        reportSlug: validated.reportSlug,
        contactId: contactId || null,
      },
    });

    // Send confirmation email if requested
    if (validated.sendEmail && validated.email && validated.reportTitle) {
      const emailContent = getDownloadConfirmationEmail(
        validated.reportTitle,
        downloadUrl
      );
      // Fire and forget - don't wait for email to send
      sendEmail({
        to: validated.email,
        ...emailContent,
      }).catch((err) => console.error("Failed to send download email:", err));
    }

    return NextResponse.json({
      success: true,
      downloadUrl,
      expiresIn: 3600,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      const issues = error.issues || [];
      return NextResponse.json(
        { success: false, error: issues[0]?.message || "Validation error" },
        { status: 400 }
      );
    }

    console.error("Error generating download URL:", error);
    return NextResponse.json(
      { success: false, error: "Failed to generate download URL" },
      { status: 500 }
    );
  }
}
