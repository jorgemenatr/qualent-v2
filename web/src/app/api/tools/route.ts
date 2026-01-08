import { NextRequest, NextResponse } from "next/server";
import { getPrisma } from "@/lib/db";
import { getAuthenticatedUser } from "@/lib/auth/server";
import { z } from "zod";
import type { Prisma } from "@prisma/client";

const createToolSchema = z.object({
  cognitoId: z.string().min(1, "Authentication required"),
  toolType: z.string().min(1, "Tool type is required"),
  name: z.string().min(1, "Name is required"),
  data: z.record(z.string(), z.unknown()),
});

// GET /api/tools - List all tool saves for the user
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

    // Get optional toolType filter from query params
    const { searchParams } = new URL(request.url);
    const toolType = searchParams.get("toolType");

    const saves = await prisma.toolSave.findMany({
      where: {
        userId: user.id,
        ...(toolType ? { toolType } : {}),
      },
      orderBy: { updatedAt: "desc" },
      select: {
        id: true,
        toolType: true,
        name: true,
        data: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return NextResponse.json({
      success: true,
      saves,
    });
  } catch (error) {
    console.error("Error fetching tool saves:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { success: false, error: "Failed to fetch saves", details: errorMessage },
      { status: 500 }
    );
  }
}

// POST /api/tools - Create a new tool save
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validated = createToolSchema.parse(body);

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

    const save = await prisma.toolSave.create({
      data: {
        userId: user.id,
        toolType: validated.toolType,
        name: validated.name,
        data: validated.data as Prisma.InputJsonValue,
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

    console.error("Error creating tool save:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create save" },
      { status: 500 }
    );
  }
}
