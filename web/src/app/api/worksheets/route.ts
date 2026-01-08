import { NextRequest, NextResponse } from "next/server";
import { getPrisma } from "@/lib/db";
import { getAuthenticatedUser } from "@/lib/auth/server";
import { z } from "zod";
import type { Prisma } from "@prisma/client";

const createWorksheetSchema = z.object({
  cognitoId: z.string().min(1, "Authentication required"),
  name: z.string().min(1, "Name is required").default("My Worksheet"),
  data: z.record(z.string(), z.unknown()),
});

// GET /api/worksheets - List all worksheet submissions for the user
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

    const worksheets = await prisma.worksheetSubmission.findMany({
      where: { userId: user.id },
      orderBy: { updatedAt: "desc" },
      select: {
        id: true,
        name: true,
        data: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return NextResponse.json({
      success: true,
      worksheets,
    });
  } catch (error) {
    console.error("Error fetching worksheets:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch worksheets",
        details: errorMessage,
      },
      { status: 500 }
    );
  }
}

// POST /api/worksheets - Create a new worksheet submission
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validated = createWorksheetSchema.parse(body);

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

    const worksheet = await prisma.worksheetSubmission.create({
      data: {
        userId: user.id,
        name: validated.name,
        data: validated.data as Prisma.InputJsonValue,
      },
    });

    return NextResponse.json({
      success: true,
      worksheet: {
        id: worksheet.id,
        name: worksheet.name,
        data: worksheet.data,
        createdAt: worksheet.createdAt,
        updatedAt: worksheet.updatedAt,
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

    console.error("Error creating worksheet:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create worksheet" },
      { status: 500 }
    );
  }
}
