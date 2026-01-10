import { NextRequest, NextResponse } from "next/server";
import { getPrisma } from "@/lib/db";
import { getAuthenticatedUser } from "@/lib/auth/server";
import {
  getProjectAccess,
  getProjectWithDetails,
  canManageProject,
  canDeleteProject,
  canViewProject,
} from "@/lib/projects";
import { updateProjectSchema } from "@/lib/validations/projects";
import { z } from "zod";

type RouteParams = { params: Promise<{ id: string }> };

// GET /api/projects/[id] - Get project details
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const user = await getAuthenticatedUser(request);

    if (!user) {
      return NextResponse.json(
        { success: false, error: "Authentication required" },
        { status: 401 }
      );
    }

    const { id } = await params;
    const access = await getProjectAccess(user.id, id, user.email);

    if (!canViewProject(access)) {
      return NextResponse.json(
        { success: false, error: "Project not found" },
        { status: 404 }
      );
    }

    const project = await getProjectWithDetails(id);

    if (!project) {
      return NextResponse.json(
        { success: false, error: "Project not found" },
        { status: 404 }
      );
    }

    // Calculate task statistics
    const taskStats = {
      total: project.tasks.length,
      todo: project.tasks.filter((t: { status: string }) => t.status === "todo").length,
      inProgress: project.tasks.filter((t: { status: string }) => t.status === "in_progress").length,
      review: project.tasks.filter((t: { status: string }) => t.status === "review").length,
      completed: project.tasks.filter((t: { status: string }) => t.status === "completed").length,
    };

    return NextResponse.json({
      success: true,
      project,
      taskStats,
      access: {
        role: access.role,
        canManage: canManageProject(access),
        canDelete: canDeleteProject(access),
      },
    });
  } catch (error) {
    console.error("Error fetching project:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch project" },
      { status: 500 }
    );
  }
}

// PUT /api/projects/[id] - Update project
export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const user = await getAuthenticatedUser(request);

    if (!user) {
      return NextResponse.json(
        { success: false, error: "Authentication required" },
        { status: 401 }
      );
    }

    const { id } = await params;
    const access = await getProjectAccess(user.id, id, user.email);

    if (!canManageProject(access)) {
      return NextResponse.json(
        { success: false, error: "Permission denied" },
        { status: 403 }
      );
    }

    const body = await request.json();
    const validated = updateProjectSchema.parse(body);

    const prisma = await getPrisma();

    const project = await prisma.project.update({
      where: { id },
      data: {
        ...(validated.name !== undefined && { name: validated.name }),
        ...(validated.description !== undefined && { description: validated.description }),
        ...(validated.status !== undefined && { status: validated.status }),
        ...(validated.totalBudget !== undefined && { totalBudget: validated.totalBudget }),
        ...(validated.amountSpent !== undefined && { amountSpent: validated.amountSpent }),
        ...(validated.currency !== undefined && { currency: validated.currency }),
        ...(validated.startDate !== undefined && {
          startDate: validated.startDate ? new Date(validated.startDate) : null,
        }),
        ...(validated.targetEndDate !== undefined && {
          targetEndDate: validated.targetEndDate ? new Date(validated.targetEndDate) : null,
        }),
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

    console.error("Error updating project:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update project" },
      { status: 500 }
    );
  }
}

// DELETE /api/projects/[id] - Delete project
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const user = await getAuthenticatedUser(request);

    if (!user) {
      return NextResponse.json(
        { success: false, error: "Authentication required" },
        { status: 401 }
      );
    }

    const { id } = await params;
    const access = await getProjectAccess(user.id, id, user.email);

    if (!canDeleteProject(access)) {
      return NextResponse.json(
        { success: false, error: "Permission denied" },
        { status: 403 }
      );
    }

    const prisma = await getPrisma();

    await prisma.project.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      message: "Project deleted",
    });
  } catch (error) {
    console.error("Error deleting project:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete project" },
      { status: 500 }
    );
  }
}
