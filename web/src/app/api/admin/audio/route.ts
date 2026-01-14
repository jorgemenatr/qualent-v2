import { NextRequest, NextResponse } from "next/server";
import { getPrisma } from "@/lib/db";
import { getAuthenticatedUser } from "@/lib/auth/server";
import { isAdmin } from "@/lib/admin";
import { getPresignedUploadUrl, getAudioKey } from "@/lib/s3";

// GET /api/admin/audio - Get all audio files
export async function GET(request: NextRequest) {
  try {
    const user = await getAuthenticatedUser(request);

    if (!user || !isAdmin(user.email)) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 403 }
      );
    }

    const prisma = await getPrisma();

    const audioFiles = await prisma.audioFile.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        uploadedBy: {
          select: { id: true, name: true, email: true },
        },
      },
    });

    return NextResponse.json({
      success: true,
      audioFiles: audioFiles.map((a) => ({
        id: a.id,
        slug: a.slug,
        name: a.name,
        description: a.description,
        s3Key: a.s3Key,
        fileName: a.fileName,
        fileSize: a.fileSize,
        mimeType: a.mimeType,
        duration: a.duration,
        available: a.available,
        createdAt: a.createdAt,
        updatedAt: a.updatedAt,
        uploadedBy: a.uploadedBy,
      })),
    });
  } catch (error) {
    console.error("Error fetching admin audio files:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch audio files" },
      { status: 500 }
    );
  }
}

// POST /api/admin/audio - Create audio record and get upload URL
export async function POST(request: NextRequest) {
  try {
    const user = await getAuthenticatedUser(request);

    if (!user || !isAdmin(user.email)) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 403 }
      );
    }

    const body = await request.json();
    const { slug, name, description, fileName, fileSize, mimeType, duration } = body;

    // Validate required fields
    if (!slug || !name || !fileName || !fileSize || !mimeType || !duration) {
      return NextResponse.json(
        { success: false, error: "Missing required fields: slug, name, fileName, fileSize, mimeType, duration" },
        { status: 400 }
      );
    }

    // Validate mime type
    const validMimeTypes = ["audio/mpeg", "audio/mp3", "audio/wav", "audio/ogg", "audio/m4a", "audio/x-m4a"];
    if (!validMimeTypes.includes(mimeType)) {
      return NextResponse.json(
        { success: false, error: "Invalid audio file type. Supported: MP3, WAV, OGG, M4A" },
        { status: 400 }
      );
    }

    // Max file size: 200MB
    const maxSize = 200 * 1024 * 1024;
    if (fileSize > maxSize) {
      return NextResponse.json(
        { success: false, error: "File size exceeds 200MB limit" },
        { status: 400 }
      );
    }

    const prisma = await getPrisma();

    // Check if audio for this slug already exists
    const existing = await prisma.audioFile.findUnique({
      where: { slug },
    });

    if (existing) {
      return NextResponse.json(
        { success: false, error: `Audio file for slug "${slug}" already exists. Delete it first or use update.` },
        { status: 409 }
      );
    }

    // Generate S3 key - use the standard audio path
    const s3Key = getAudioKey(slug);

    // Create the database record
    const audioFile = await prisma.audioFile.create({
      data: {
        slug,
        name,
        description: description || null,
        s3Key,
        fileName,
        fileSize,
        mimeType,
        duration,
        available: true,
        uploadedById: user.id,
      },
    });

    // Generate presigned upload URL
    const uploadUrl = await getPresignedUploadUrl(s3Key, mimeType, 3600);

    return NextResponse.json({
      success: true,
      audioFile,
      uploadUrl,
    });
  } catch (error) {
    console.error("Error creating audio file:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create audio file" },
      { status: 500 }
    );
  }
}
