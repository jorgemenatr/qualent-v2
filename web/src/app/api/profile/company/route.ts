import { NextRequest, NextResponse } from "next/server";
import { getPrisma } from "@/lib/db";
import { getAuthenticatedUser } from "@/lib/auth/server";
import { z } from "zod";

const companyProfileSchema = z.object({
  cognitoId: z.string().min(1, "Authentication required"),
  companyName: z.string().min(1, "Company name is required"),
  industry: z.string().optional(),
  companySize: z.string().optional(),
  userRole: z.string().optional(),
});

// GET /api/profile/company - Get user's company profile
export async function GET(request: NextRequest) {
  try {
    const user = await getAuthenticatedUser(request);

    if (!user) {
      return NextResponse.json(
        { success: false, error: "Authentication required" },
        { status: 401 }
      );
    }

    const prisma = await getPrisma();

    const profile = await prisma.companyProfile.findUnique({
      where: { userId: user.id },
      select: {
        id: true,
        companyName: true,
        industry: true,
        companySize: true,
        userRole: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return NextResponse.json({
      success: true,
      profile,
    });
  } catch (error) {
    console.error("Error fetching company profile:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch profile",
        details: errorMessage,
      },
      { status: 500 }
    );
  }
}

// POST /api/profile/company - Create company profile
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validated = companyProfileSchema.parse(body);

    const prisma = await getPrisma();

    // Find the user by cognitoId
    const user = await prisma.user.findUnique({
      where: { cognitoId: validated.cognitoId },
    });

    if (!user) {
      return NextResponse.json(
        { success: false, error: "User not found" },
        { status: 404 }
      );
    }

    // Check if profile already exists
    const existing = await prisma.companyProfile.findUnique({
      where: { userId: user.id },
    });

    if (existing) {
      return NextResponse.json(
        { success: false, error: "Company profile already exists. Use PUT to update." },
        { status: 409 }
      );
    }

    const profile = await prisma.companyProfile.create({
      data: {
        userId: user.id,
        companyName: validated.companyName,
        industry: validated.industry,
        companySize: validated.companySize,
        userRole: validated.userRole,
      },
    });

    return NextResponse.json({
      success: true,
      profile: {
        id: profile.id,
        companyName: profile.companyName,
        industry: profile.industry,
        companySize: profile.companySize,
        userRole: profile.userRole,
        createdAt: profile.createdAt,
        updatedAt: profile.updatedAt,
      },
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      const issues = error.issues || [];
      return NextResponse.json(
        { success: false, error: issues[0]?.message || "Validation error" },
        { status: 400 }
      );
    }

    console.error("Error creating company profile:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create profile" },
      { status: 500 }
    );
  }
}

// PUT /api/profile/company - Update company profile
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const validated = companyProfileSchema.parse(body);

    const prisma = await getPrisma();

    // Find the user by cognitoId
    const user = await prisma.user.findUnique({
      where: { cognitoId: validated.cognitoId },
    });

    if (!user) {
      return NextResponse.json(
        { success: false, error: "User not found" },
        { status: 404 }
      );
    }

    // Upsert the profile (create if not exists, update if exists)
    const profile = await prisma.companyProfile.upsert({
      where: { userId: user.id },
      create: {
        userId: user.id,
        companyName: validated.companyName,
        industry: validated.industry,
        companySize: validated.companySize,
        userRole: validated.userRole,
      },
      update: {
        companyName: validated.companyName,
        industry: validated.industry,
        companySize: validated.companySize,
        userRole: validated.userRole,
      },
    });

    // Sync to CRM with company info (fire and forget)
    return NextResponse.json({
      success: true,
      profile: {
        id: profile.id,
        companyName: profile.companyName,
        industry: profile.industry,
        companySize: profile.companySize,
        userRole: profile.userRole,
        createdAt: profile.createdAt,
        updatedAt: profile.updatedAt,
      },
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      const issues = error.issues || [];
      return NextResponse.json(
        { success: false, error: issues[0]?.message || "Validation error" },
        { status: 400 }
      );
    }

    console.error("Error updating company profile:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update profile" },
      { status: 500 }
    );
  }
}
