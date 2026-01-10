import { NextRequest, NextResponse } from "next/server";
import { getPrisma } from "@/lib/db";
import { getAuthenticatedUser } from "@/lib/auth/server";
import { getProjectAccess, canEditContent } from "@/lib/projects";
import { uploadDocumentSchema } from "@/lib/validations/projects";
import { getPresignedUploadUrl, getProjectDocumentKey } from "@/lib/s3";
import { z } from "zod";

type RouteParams = { params: Promise<{ id: string }> };

// POST /api/projects/[id]/documents/upload-url - Get presigned upload URL
export async function POST(request: NextRequest, { params }: RouteParams) {
  try {
    const user = await getAuthenticatedUser(request);

    if (!user) {
      return NextResponse.json(
        { success: false, error: "Authentication required" },
        { status: 401 }
      );
    }

    const { id: projectId } = await params;
    const access = await getProjectAccess(user.id, projectId, user.email);

    if (!canEditContent(access)) {
      return NextResponse.json(
        { success: false, error: "Permission denied" },
        { status: 403 }
      );
    }

    const body = await request.json();
    const validated = uploadDocumentSchema.parse(body);

    // Validate file size (max 50MB)
    const maxSize = 50 * 1024 * 1024;
    if (validated.fileSize > maxSize) {
      return NextResponse.json(
        { success: false, error: "File size exceeds 50MB limit" },
        { status: 400 }
      );
    }

    // Generate S3 key
    const s3Key = getProjectDocumentKey(projectId, validated.fileName);

    // Get presigned upload URL
    const uploadUrl = await getPresignedUploadUrl(s3Key, validated.mimeType);

    const prisma = await getPrisma();

    // Create document record
    const document = await prisma.projectDocument.create({
      data: {
        projectId,
        name: validated.name,
        description: validated.description,
        type: validated.type,
        s3Key,
        fileName: validated.fileName,
        fileSize: validated.fileSize,
        mimeType: validated.mimeType,
        uploadedById: user.id,
      },
      include: {
        uploadedBy: {
          select: { id: true, name: true, email: true },
        },
      },
    });

    return NextResponse.json({
      success: true,
      uploadUrl,
      document,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      const issues = error.issues || [];
      return NextResponse.json(
        { success: false, error: issues[0]?.message || "Validation error" },
        { status: 400 }
      );
    }

    console.error("Error getting upload URL:", error);
    return NextResponse.json(
      { success: false, error: "Failed to get upload URL" },
      { status: 500 }
    );
  }
}
