import { NextRequest, NextResponse } from "next/server";
import { getPrisma } from "@/lib/db";
import { getAuthenticatedUser } from "@/lib/auth/server";
import { isAdmin } from "@/lib/admin";
import { deleteS3Object, getPresignedUploadUrl } from "@/lib/s3";

type RouteParams = { params: Promise<{ id: string }> };

// GET /api/admin/audio/[id] - Get single audio file
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const user = await getAuthenticatedUser(request);

    if (!user || !isAdmin(user.email)) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 403 }
      );
    }

    const { id } = await params;
    const prisma = await getPrisma();

    const audioFile = await prisma.audioFile.findUnique({
      where: { id },
      include: {
        uploadedBy: {
          select: { id: true, name: true, email: true },
        },
      },
    });

    if (!audioFile) {
      return NextResponse.json(
        { success: false, error: "Audio file not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      audioFile,
    });
  } catch (error) {
    console.error("Error fetching audio file:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch audio file" },
      { status: 500 }
    );
  }
}

// PUT /api/admin/audio/[id] - Update audio metadata
export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const user = await getAuthenticatedUser(request);

    if (!user || !isAdmin(user.email)) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 403 }
      );
    }

    const { id } = await params;
    const body = await request.json();
    const { name, description, duration, available, replaceFile } = body;

    const prisma = await getPrisma();

    // Check if audio exists
    const existing = await prisma.audioFile.findUnique({
      where: { id },
    });

    if (!existing) {
      return NextResponse.json(
        { success: false, error: "Audio file not found" },
        { status: 404 }
      );
    }

    // Build update data
    const updateData: {
      name?: string;
      description?: string | null;
      duration?: string;
      available?: boolean;
      fileName?: string;
      fileSize?: number;
      mimeType?: string;
    } = {};

    if (name !== undefined) updateData.name = name;
    if (description !== undefined) updateData.description = description || null;
    if (duration !== undefined) updateData.duration = duration;
    if (available !== undefined) updateData.available = available;

    // If replacing the file, update file metadata
    if (replaceFile) {
      const { fileName, fileSize, mimeType } = replaceFile;
      if (fileName) updateData.fileName = fileName;
      if (fileSize) updateData.fileSize = fileSize;
      if (mimeType) updateData.mimeType = mimeType;
    }

    const audioFile = await prisma.audioFile.update({
      where: { id },
      data: updateData,
    });

    // If replacing the file, generate new upload URL
    let uploadUrl: string | null = null;
    if (replaceFile && replaceFile.mimeType) {
      uploadUrl = await getPresignedUploadUrl(
        existing.s3Key,
        replaceFile.mimeType,
        3600
      );
    }

    return NextResponse.json({
      success: true,
      audioFile,
      uploadUrl,
    });
  } catch (error) {
    console.error("Error updating audio file:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update audio file" },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/audio/[id] - Delete audio file
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const user = await getAuthenticatedUser(request);

    if (!user || !isAdmin(user.email)) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 403 }
      );
    }

    const { id } = await params;
    const prisma = await getPrisma();

    // Get the audio file to get the S3 key
    const audioFile = await prisma.audioFile.findUnique({
      where: { id },
    });

    if (!audioFile) {
      return NextResponse.json(
        { success: false, error: "Audio file not found" },
        { status: 404 }
      );
    }

    // Delete from S3
    try {
      await deleteS3Object(audioFile.s3Key);
    } catch (s3Error) {
      console.error("Error deleting from S3 (continuing with DB delete):", s3Error);
      // Continue with database deletion even if S3 fails
    }

    // Delete from database
    await prisma.audioFile.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      message: "Audio file deleted",
    });
  } catch (error) {
    console.error("Error deleting audio file:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete audio file" },
      { status: 500 }
    );
  }
}
