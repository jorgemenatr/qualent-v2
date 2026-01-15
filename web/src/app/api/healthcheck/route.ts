import { NextResponse } from "next/server";
import { S3Client, ListObjectsV2Command } from "@aws-sdk/client-s3";
import { getPrisma } from "@/lib/db";

// GET /api/healthcheck - Check what env vars are available and test connectivity
export async function GET() {
  const envStatus: Record<string, unknown> = {
    timestamp: new Date().toISOString(),
    nodeEnv: process.env.NODE_ENV,

    // Database
    DATABASE_URL: process.env.DATABASE_URL ? `set (${process.env.DATABASE_URL.substring(0, 30)}...)` : "NOT SET",

    // S3 - check all possible variants
    S3_BUCKET_NAME: process.env.S3_BUCKET_NAME || "NOT SET",
    S3_REGION: process.env.S3_REGION || "NOT SET",
    AWS_S3_BUCKET: process.env.AWS_S3_BUCKET || "NOT SET",
    AWS_S3_REGION: process.env.AWS_S3_REGION || "NOT SET",

    // Cognito
    NEXT_PUBLIC_COGNITO_USER_POOL_ID: process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID || "NOT SET",
    NEXT_PUBLIC_COGNITO_CLIENT_ID: process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID || "NOT SET",
    COGNITO_ISSUER: process.env.COGNITO_ISSUER || "NOT SET",
    NEXT_PUBLIC_COGNITO_ISSUER: process.env.NEXT_PUBLIC_COGNITO_ISSUER || "NOT SET",

    // AI Services
    ANTHROPIC_API_KEY: process.env.ANTHROPIC_API_KEY ? "set (redacted)" : "NOT SET",
    GOOGLE_AI_API_KEY: process.env.GOOGLE_AI_API_KEY ? "set (redacted)" : "NOT SET",
    GEMINI_FILE_SEARCH_STORE: process.env.GEMINI_FILE_SEARCH_STORE || "NOT SET",

    // SES
    SES_FROM_EMAIL: process.env.SES_FROM_EMAIL || "NOT SET",

    // App
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL || "NOT SET",
  };

  // Test database connectivity
  try {
    const prisma = await getPrisma();
    const userCount = await prisma.user.count();
    envStatus.dbTest = { status: "OK", userCount };
  } catch (err) {
    envStatus.dbTest = { status: "ERROR", error: err instanceof Error ? err.message : String(err) };
  }

  // Test S3 connectivity (using IAM role, no explicit credentials)
  try {
    const s3Client = new S3Client({
      region: process.env.S3_REGION || "ca-central-1",
    });
    const command = new ListObjectsV2Command({
      Bucket: process.env.S3_BUCKET_NAME || "picklellama-content",
      MaxKeys: 1,
    });
    const response = await s3Client.send(command);
    envStatus.s3Test = { status: "OK", keyCount: response.KeyCount };
  } catch (err) {
    envStatus.s3Test = {
      status: "ERROR",
      error: err instanceof Error ? err.message : String(err),
      errorName: err instanceof Error ? err.name : "Unknown",
    };
  }

  return NextResponse.json(envStatus);
}
