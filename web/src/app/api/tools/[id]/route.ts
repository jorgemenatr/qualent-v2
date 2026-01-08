import { NextRequest, NextResponse } from "next/server";
import { getPrisma } from "@/lib/db";
import { getAuthenticatedUser } from "@/lib/auth/server";
import { z } from "zod";

const updateToolSchema = z.object({
  cognitoId: z.string().min(1, "Authentication required"),
  name: z.string().min(1).optional(),
  data: z.record(z.unknown()).optional(),
});

// GET /api/tools/[id] - Get a specific tool save
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

    const save = await prisma.toolSave.findFirst({
      where: {
        id,
        userId: user.id,
      },
    });

    if (!save) {
      return NextResponse.json(
        { success: false, error: "Save not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      save: {
        id: save.id,
        toolType: save.toolType,
        name: save.name,
        data: save.data,
        createdAt: save.createdAt,
        updatedAt: save.updatedAt,
      },
    });
  } catch (error) {
    console.error("Error fetching tool save:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch save" },
      { status: 500 }
    );
  }
}

// PUT /api/tools/[id] - Update a tool save
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const validated = updateToolSchema.parse(body);

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

    // Check that the save belongs to this user
    const existingSave = await prisma.toolSave.findFirst({
      where: {
        id,
        userId: user.id,
      },
    });

    if (!existingSave) {
      return NextResponse.json(
        { success: false, error: "Save not found" },
        { status: 404 }
      );
    }

    const save = await prisma.toolSave.update({
      where: { id },
      data: {
        ...(validated.name ? { name: validated.name } : {}),
        ...(validated.data ? { data: validated.data } : {}),
      },
    });

    return NextResponse.json({
      success: true,
      save: {
        id: save.id,
        toolType: save.toolType,
        name: save.name,
        data: save.data,
        createdAt: save.createdAt,
        updatedAt: save.updatedAt,
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

    console.error("Error updating tool save:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update save" },
      { status: 500 }
    );
  }
}

// DELETE /api/tools/[id] - Delete a tool save
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

    // Check that the save belongs to this user
    const existingSave = await prisma.toolSave.findFirst({
      where: {
        id,
        userId: user.id,
      },
    });

    if (!existingSave) {
      return NextResponse.json(
        { success: false, error: "Save not found" },
        { status: 404 }
      );
    }

    await prisma.toolSave.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      message: "Save deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting tool save:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete save" },
      { status: 500 }
    );
  }
}
