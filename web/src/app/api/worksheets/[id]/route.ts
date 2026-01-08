import { NextRequest, NextResponse } from "next/server";
import { getPrisma } from "@/lib/db";
import { getAuthenticatedUser } from "@/lib/auth/server";
import { z } from "zod";
import type { Prisma } from "@prisma/client";

const updateWorksheetSchema = z.object({
  cognitoId: z.string().min(1, "Authentication required"),
  name: z.string().min(1).optional(),
  data: z.record(z.string(), z.unknown()).optional(),
});

// GET /api/worksheets/[id] - Get a specific worksheet
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const user = await getAuthenticatedUser(request);

    if (!user) {
      return NextResponse.json(
        { success: false, error: "Authentication required" },
        { status: 401 }
      );
    }

    const prisma = await getPrisma();

    const worksheet = await prisma.worksheetSubmission.findFirst({
      where: {
        id,
        userId: user.id,
      },
    });

    if (!worksheet) {
      return NextResponse.json(
        { success: false, error: "Worksheet not found" },
        { status: 404 }
      );
    }

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
    console.error("Error fetching worksheet:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch worksheet" },
      { status: 500 }
    );
  }
}

// PUT /api/worksheets/[id] - Update a worksheet
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const validated = updateWorksheetSchema.parse(body);

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

    // Check that the worksheet belongs to this user
    const existingWorksheet = await prisma.worksheetSubmission.findFirst({
      where: {
        id,
        userId: user.id,
      },
    });

    if (!existingWorksheet) {
      return NextResponse.json(
        { success: false, error: "Worksheet not found" },
        { status: 404 }
      );
    }

    const worksheet = await prisma.worksheetSubmission.update({
      where: { id },
      data: {
        ...(validated.name ? { name: validated.name } : {}),
        ...(validated.data
          ? { data: validated.data as Prisma.InputJsonValue }
          : {}),
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

    console.error("Error updating worksheet:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update worksheet" },
      { status: 500 }
    );
  }
}

// DELETE /api/worksheets/[id] - Delete a worksheet
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const user = await getAuthenticatedUser(request);

    if (!user) {
      return NextResponse.json(
        { success: false, error: "Authentication required" },
        { status: 401 }
      );
    }

    const prisma = await getPrisma();

    // Check that the worksheet belongs to this user
    const existingWorksheet = await prisma.worksheetSubmission.findFirst({
      where: {
        id,
        userId: user.id,
      },
    });

    if (!existingWorksheet) {
      return NextResponse.json(
        { success: false, error: "Worksheet not found" },
        { status: 404 }
      );
    }

    await prisma.worksheetSubmission.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      message: "Worksheet deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting worksheet:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete worksheet" },
      { status: 500 }
    );
  }
}
