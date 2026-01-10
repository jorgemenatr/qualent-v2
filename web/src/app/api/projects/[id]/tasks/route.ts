import { NextRequest, NextResponse } from "next/server";
import { getPrisma } from "@/lib/db";
import { getAuthenticatedUser } from "@/lib/auth/server";
import { getProjectAccess, canEditContent, canViewProject } from "@/lib/projects";
import { createTaskSchema } from "@/lib/validations/projects";
import { z } from "zod";

type RouteParams = { params: Promise<{ id: string }> };

// GET /api/projects/[id]/tasks - List tasks
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const user = await getAuthenticatedUser(request);

    if (!user) {
      return NextResponse.json(
        { success: false, error: "Authentication required" },
        { status: 401 }
      );
    }

    const { id: projectId } = await params;
    const access = await getProjectAccess(user.id, projectId, user.email);

    if (!canViewProject(access)) {
      return NextResponse.json(
        { success: false, error: "Project not found" },
        { status: 404 }
      );
    }

    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const milestoneId = searchParams.get("milestoneId");
    const assigneeId = searchParams.get("assigneeId");

    const prisma = await getPrisma();

    const tasks = await prisma.task.findMany({
      where: {
        projectId,
        ...(status && { status }),
        ...(milestoneId && { milestoneId }),
        ...(assigneeId && { assigneeId }),
      },
      include: {
        assignee: {
          select: { id: true, name: true, email: true },
        },
        milestone: {
          select: { id: true, name: true },
        },
      },
      orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
    });

    return NextResponse.json({
      success: true,
      tasks,
    });
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch tasks" },
      { status: 500 }
    );
  }
}

// POST /api/projects/[id]/tasks - Create task
export async function POST(request: NextRequest, { params }: RouteParams) {
  try {
    const user = await getAuthenticatedUser(request);

    if (!user) {
      return NextResponse.json(
        { success: false, error: "Authentication required" },
        { status: 401 }
      );
    }

    const { id: projectId } = await params;
    const access = await getProjectAccess(user.id, projectId, user.email);

    if (!canEditContent(access)) {
      return NextResponse.json(
        { success: false, error: "Permission denied" },
        { status: 403 }
      );
    }

    const body = await request.json();
    const validated = createTaskSchema.parse(body);

    const prisma = await getPrisma();

    // Verify milestone belongs to project if provided
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

    // Verify assignee is a project member if provided
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

    // Get the next sort order
    const lastTask = await prisma.task.findFirst({
      where: { projectId },
      orderBy: { sortOrder: "desc" },
    });
    const nextSortOrder = (lastTask?.sortOrder ?? -1) + 1;

    const task = await prisma.task.create({
      data: {
        projectId,
        title: validated.title,
        description: validated.description,
        priority: validated.priority,
        dueDate: validated.dueDate ? new Date(validated.dueDate) : null,
        milestoneId: validated.milestoneId,
        assigneeId: validated.assigneeId,
        sortOrder: validated.sortOrder ?? nextSortOrder,
      },
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

    console.error("Error creating task:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create task" },
      { status: 500 }
    );
  }
}
