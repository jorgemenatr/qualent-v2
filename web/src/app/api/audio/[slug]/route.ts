import { NextRequest } from "next/server";
import { getPresignedUrl } from "@/lib/s3";
import { getPrisma } from "@/lib/db";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    // Validate slug against database
    const prisma = await getPrisma();
    const audioFile = await prisma.audioFile.findUnique({
      where: { slug },
      select: {
        s3Key: true,
        available: true,
      },
    });

    // Check if audio exists and is available
    if (!audioFile) {
      return Response.json(
        { error: "Audio not found" },
        { status: 404 }
      );
    }

    if (!audioFile.available) {
      return Response.json(
        { error: "Audio is not currently available" },
        { status: 404 }
      );
    }

    // Generate presigned URL for the audio file
    const presignedUrl = await getPresignedUrl(audioFile.s3Key, 3600); // 1 hour expiry

    return Response.json({
      url: presignedUrl,
      slug,
      expiresIn: 3600,
    });
  } catch (error) {
    console.error("Error generating audio URL:", error);

    // Check if it's an S3 access error (file doesn't exist)
    if (error instanceof Error && error.name === "NoSuchKey") {
      return Response.json(
        { error: "Audio file not available yet" },
        { status: 404 }
      );
    }

    return Response.json(
      { error: "Failed to generate audio URL" },
      { status: 500 }
    );
  }
}
