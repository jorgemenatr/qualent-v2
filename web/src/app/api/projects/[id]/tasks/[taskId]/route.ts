import { NextRequest, NextResponse } from "next/server";
import { getPrisma } from "@/lib/db";
import { getAuthenticatedUser } from "@/lib/auth/server";
import { getProjectAccess, canEditContent, canManageProject } from "@/lib/projects";
import { updateTaskSchema } from "@/lib/validations/projects";
import { z } from "zod";

type RouteParams = { params: Promise<{ id: string; taskId: string }> };

// GET /api/projects/[id]/tasks/[taskId] - Get task
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const user = await getAuthenticatedUser(request);

    if (!user) {
      return NextResponse.json(
        { success: false, error: "Authentication required" },
        { status: 401 }
      );
    }

    const { id: projectId, taskId } = await params;
    const access = await getProjectAccess(user.id, projectId, user.email);

    if (!access.hasAccess) {
      return NextResponse.json(
        { success: false, error: "Project not found" },
        { status: 404 }
      );
    }

    const prisma = await getPrisma();

    const task = await prisma.task.findFirst({
      where: { id: taskId, projectId },
      include: {
        assignee: {
          select: { id: true, name: true, email: true },
        },
        milestone: {
          select: { id: true, name: true },
        },
      },
    });

    if (!task) {
      return NextResponse.json(
        { success: false, error: "Task not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      task,
    });
  } catch (error) {
    console.error("Error fetching task:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch task" },
      { status: 500 }
    );
  }
}

// PUT /api/projects/[id]/tasks/[taskId] - Update task
export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const user = await getAuthenticatedUser(request);

    if (!user) {
      return NextResponse.json(
        { success: false, error: "Authentication required" },
        { status: 401 }
      );
    }

    const { id: projectId, taskId } = await params;
    const access = await getProjectAccess(user.id, projectId, user.email);

    if (!canEditContent(access)) {
      return NextResponse.json(
        { success: false, error: "Permission denied" },
        { status: 403 }
      );
    }

    const body = await request.json();
    const validated = updateTaskSchema.parse(body);

    const prisma = await getPrisma();

    // Verify milestone belongs to project if changing it
    if (validated.milestoneId) {
      const milestone = await prisma.milestone.findFirst({
        where: { id: validated.milestoneId, projectId },
      });
      if (!milestone) {
        return NextResponse.json(
          { success: false, error: "Milestone not found in this project" },
          { status: 400 }
        );
      }
    }

    // Verify assignee is a project member if changing it
    if (validated.assigneeId) {
      const member = await prisma.projectMember.findFirst({
        where: { projectId, userId: validated.assigneeId },
      });
      if (!member) {
        return NextResponse.json(
          { success: false, error: "Assignee is not a project member" },
          { status: 400 }
        );
      }
    }

    const result = await prisma.task.updateMany({
      where: { id: taskId, projectId },
      data: {
        ...(validated.title !== undefined && { title: validated.title }),
        ...(validated.description !== undefined && { description: validated.description }),
        ...(validated.status !== undefined && {
          status: validated.status,
          completedAt: validated.status === "completed" ? new Date() : null,
        }),
        ...(validated.priority !== undefined && { priority: validated.priority }),
        ...(validated.dueDate !== undefined && {
          dueDate: validated.dueDate ? new Date(validated.dueDate) : null,
        }),
        ...(validated.milestoneId !== undefined && { milestoneId: validated.milestoneId }),
        ...(validated.assigneeId !== undefined && { assigneeId: validated.assigneeId }),
        ...(validated.sortOrder !== undefined && { sortOrder: validated.sortOrder }),
      },
    });

    if (result.count === 0) {
      return NextResponse.json(
        { success: false, error: "Task not found" },
        { status: 404 }
      );
    }

    const task = await prisma.task.findUnique({
      where: { id: taskId },
      include: {
        assignee: {
          select: { id: true, name: true, email: true },
        },
        milestone: {
          select: { id: true, name: true },
        },
      },
    });

    return NextResponse.json({
      success: true,
      task,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      const issues = error.issues || [];
      return NextResponse.json(
        { success: false, error: issues[0]?.message || "Validation error" },
        { status: 400 }
      );
    }

    console.error("Error updating task:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update task" },
      { status: 500 }
    );
  }
}

// DELETE /api/projects/[id]/tasks/[taskId] - Delete task
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const user = await getAuthenticatedUser(request);

    if (!user) {
      return NextResponse.json(
        { success: false, error: "Authentication required" },
        { status: 401 }
      );
    }

    const { id: projectId, taskId } = await params;
    const access = await getProjectAccess(user.id, projectId, user.email);

    if (!canManageProject(access)) {
      return NextResponse.json(
        { success: false, error: "Permission denied" },
        { status: 403 }
      );
    }

    const prisma = await getPrisma();

    const deleted = await prisma.task.deleteMany({
      where: { id: taskId, projectId },
    });

    if (deleted.count === 0) {
      return NextResponse.json(
        { success: false, error: "Task not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Task deleted",
    });
  } catch (error) {
    console.error("Error deleting task:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete task" },
      { status: 500 }
    );
  }
}
