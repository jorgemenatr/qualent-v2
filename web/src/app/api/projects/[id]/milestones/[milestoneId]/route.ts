import { NextRequest, NextResponse } from "next/server";
import { getPrisma } from "@/lib/db";
import { getAuthenticatedUser } from "@/lib/auth/server";
import { getProjectAccess, canEditContent, canManageProject } from "@/lib/projects";
import { updateMilestoneSchema } from "@/lib/validations/projects";
import { z } from "zod";

type RouteParams = { params: Promise<{ id: string; milestoneId: string }> };

// GET /api/projects/[id]/milestones/[milestoneId] - Get milestone
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const user = await getAuthenticatedUser(request);

    if (!user) {
      return NextResponse.json(
        { success: false, error: "Authentication required" },
        { status: 401 }
      );
    }

    const { id: projectId, milestoneId } = await params;
    const access = await getProjectAccess(user.id, projectId, user.email);

    if (!access.hasAccess) {
      return NextResponse.json(
        { success: false, error: "Project not found" },
        { status: 404 }
      );
    }

    const prisma = await getPrisma();

    const milestone = await prisma.milestone.findFirst({
      where: { id: milestoneId, projectId },
      include: {
        tasks: {
          include: {
            assignee: {
              select: { id: true, name: true, email: true },
            },
          },
          orderBy: { sortOrder: "asc" },
        },
      },
    });

    if (!milestone) {
      return NextResponse.json(
        { success: false, error: "Milestone not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      milestone,
    });
  } catch (error) {
    console.error("Error fetching milestone:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch milestone" },
      { status: 500 }
    );
  }
}

// PUT /api/projects/[id]/milestones/[milestoneId] - Update milestone
export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const user = await getAuthenticatedUser(request);

    if (!user) {
      return NextResponse.json(
        { success: false, error: "Authentication required" },
        { status: 401 }
      );
    }

    const { id: projectId, milestoneId } = await params;
    const access = await getProjectAccess(user.id, projectId, user.email);

    if (!canEditContent(access)) {
      return NextResponse.json(
        { success: false, error: "Permission denied" },
        { status: 403 }
      );
    }

    const body = await request.json();
    const validated = updateMilestoneSchema.parse(body);

    const prisma = await getPrisma();

    const milestone = await prisma.milestone.updateMany({
      where: { id: milestoneId, projectId },
      data: {
        ...(validated.name !== undefined && { name: validated.name }),
        ...(validated.description !== undefined && { description: validated.description }),
        ...(validated.status !== undefined && {
          status: validated.status,
          completedAt: validated.status === "completed" ? new Date() : null,
        }),
        ...(validated.dueDate !== undefined && {
          dueDate: validated.dueDate ? new Date(validated.dueDate) : null,
        }),
        ...(validated.sortOrder !== undefined && { sortOrder: validated.sortOrder }),
      },
    });

    if (milestone.count === 0) {
      return NextResponse.json(
        { success: false, error: "Milestone not found" },
        { status: 404 }
      );
    }

    const updated = await prisma.milestone.findUnique({
      where: { id: milestoneId },
    });

    return NextResponse.json({
      success: true,
      milestone: updated,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      const issues = error.issues || [];
      return NextResponse.json(
        { success: false, error: issues[0]?.message || "Validation error" },
        { status: 400 }
      );
    }

    console.error("Error updating milestone:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update milestone" },
      { status: 500 }
    );
  }
}

// DELETE /api/projects/[id]/milestones/[milestoneId] - Delete milestone
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const user = await getAuthenticatedUser(request);

    if (!user) {
      return NextResponse.json(
        { success: false, error: "Authentication required" },
        { status: 401 }
      );
    }

    const { id: projectId, milestoneId } = await params;
    const access = await getProjectAccess(user.id, projectId, user.email);

    if (!canManageProject(access)) {
      return NextResponse.json(
        { success: false, error: "Permission denied" },
        { status: 403 }
      );
    }

    const prisma = await getPrisma();

    const deleted = await prisma.milestone.deleteMany({
      where: { id: milestoneId, projectId },
    });

    if (deleted.count === 0) {
      return NextResponse.json(
        { success: false, error: "Milestone not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Milestone deleted",
    });
  } catch (error) {
    console.error("Error deleting milestone:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete milestone" },
      { status: 500 }
    );
  }
}
