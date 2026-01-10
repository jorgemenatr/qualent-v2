import { NextRequest, NextResponse } from "next/server";
import { getPrisma } from "@/lib/db";
import { getAuthenticatedUser } from "@/lib/auth/server";
import { getProjectAccess, canEditContent, canViewProject } from "@/lib/projects";
import { createMilestoneSchema } from "@/lib/validations/projects";
import { z } from "zod";

type RouteParams = { params: Promise<{ id: string }> };

// GET /api/projects/[id]/milestones - List milestones
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

    const prisma = await getPrisma();

    const milestones = await prisma.milestone.findMany({
      where: { projectId },
      include: {
        _count: {
          select: { tasks: true },
        },
      },
      orderBy: { sortOrder: "asc" },
    });

    return NextResponse.json({
      success: true,
      milestones,
    });
  } catch (error) {
    console.error("Error fetching milestones:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch milestones" },
      { status: 500 }
    );
  }
}

// POST /api/projects/[id]/milestones - Create milestone
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
    const validated = createMilestoneSchema.parse(body);

    const prisma = await getPrisma();

    // Get the next sort order
    const lastMilestone = await prisma.milestone.findFirst({
      where: { projectId },
      orderBy: { sortOrder: "desc" },
    });
    const nextSortOrder = (lastMilestone?.sortOrder ?? -1) + 1;

    const milestone = await prisma.milestone.create({
      data: {
        projectId,
        name: validated.name,
        description: validated.description,
        dueDate: validated.dueDate ? new Date(validated.dueDate) : null,
        sortOrder: validated.sortOrder ?? nextSortOrder,
      },
    });

    return NextResponse.json({
      success: true,
      milestone,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      const issues = error.issues || [];
      return NextResponse.json(
        { success: false, error: issues[0]?.message || "Validation error" },
        { status: 400 }
      );
    }

    console.error("Error creating milestone:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create milestone" },
      { status: 500 }
    );
  }
}
