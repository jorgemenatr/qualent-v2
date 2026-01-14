import { NextResponse } from "next/server";

// GET /api/healthcheck - Check what env vars are available
export async function GET() {
  const envStatus = {
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

    // List all env var keys (not values) for debugging
    allEnvKeys: Object.keys(process.env).sort(),
  };

  return NextResponse.json(envStatus);
}
