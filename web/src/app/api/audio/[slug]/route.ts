import { NextRequest } from "next/server";
import { getPresignedUrl, getAudioKey } from "@/lib/s3";
import { getAllSlugs as _getAllSlugs } from "@/lib/content";

// Valid audio report slugs
const validSlugs = new Set([
  "ai-automation-roi-guide",
  "selecting-the-right-problems",
  "pilot-to-production-gap",
  "requirements-problem",
  "build-buy-or-both",
  "data-readiness",
]);

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    // Validate slug
    if (!validSlugs.has(slug)) {
      return Response.json(
        { error: "Audio not found" },
        { status: 404 }
      );
    }

    // Generate presigned URL for the audio file
    const audioKey = getAudioKey(slug);
    const presignedUrl = await getPresignedUrl(audioKey, 3600); // 1 hour expiry

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
