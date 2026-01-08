import { NextResponse } from "next/server";

// Temporary debug endpoint - REMOVE after debugging
export async function GET() {
  const allKeys = Object.keys(process.env).sort();

  return NextResponse.json({
    hasDatabaseUrl: !!process.env.DATABASE_URL,
    databaseUrlLength: process.env.DATABASE_URL?.length || 0,
    nodeEnv: process.env.NODE_ENV,
    // Show all env var NAMES (not values) to debug
    allEnvVarNames: allKeys,
    totalCount: allKeys.length,
  });
}
