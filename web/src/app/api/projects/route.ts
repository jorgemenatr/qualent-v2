import { NextRequest, NextResponse } from "next/server";
import { getPrisma } from "@/lib/db";
import { getAuthenticatedUser } from "@/lib/auth/server";
import { getUserProjects } from "@/lib/projects";
import { createProjectSchema } from "@/lib/validations/projects";
import { z } from "zod";

// GET /api/projects - List all projects for the user
export async function GET(request: NextRequest) {
  try {
    const user = await getAuthenticatedUser(request);

    if (!user) {
      return NextResponse.json(
        { success: false, error: "Authentication required" },
        { status: 401 }
      );
    }

    // Get optional status filter
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");

    let projects = await getUserProjects(user.id, user.email);

    // Apply status filter if provided
    if (status && status !== "all") {
      projects = projects.filter((p: { status: string }) => p.status === status);
    }

    return NextResponse.json({
      success: true,
      projects,
    });
  } catch (error) {
    console.error("Error fetching projects:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch projects" },
      { status: 500 }
    );
  }
}

// POST /api/projects - Create a new project
export async function POST(request: NextRequest) {
  try {
    const user = await getAuthenticatedUser(request);

    if (!user) {
      return NextResponse.json(
        { success: false, error: "Authentication required" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const validated = createProjectSchema.parse(body);

    const prisma = await getPrisma();

    // Create the project and add the creator as owner
    const project = await prisma.project.create({
      data: {
        name: validated.name,
        description: validated.description,
        totalBudget: validated.totalBudget,
        currency: validated.currency,
        startDate: validated.startDate ? new Date(validated.startDate) : null,
        targetEndDate: validated.targetEndDate ? new Date(validated.targetEndDate) : null,
        ownerId: user.id,
        // Also create a member record for the owner
        members: {
          create: {
            userId: user.id,
            role: "owner",
          },
        },
      },
      include: {
        owner: {
          select: { id: true, name: true, email: true },
        },
        members: {
          include: {
            user: {
              select: { id: true, name: true, email: true },
            },
          },
        },
      },
    });

    return NextResponse.json({
      success: true,
      project,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      const issues = error.issues || [];
      return NextResponse.json(
        { success: false, error: issues[0]?.message || "Validation error" },
        { status: 400 }
      );
    }

    console.error("Error creating project:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create project" },
      { status: 500 }
    );
  }
}
