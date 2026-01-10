import { NextRequest, NextResponse } from "next/server";
import { getPrisma } from "@/lib/db";
import { getAuthenticatedUser } from "@/lib/auth/server";
import { getProjectAccess, canManageProject, canViewProject } from "@/lib/projects";
import { addMemberSchema } from "@/lib/validations/projects";
import { z } from "zod";

type RouteParams = { params: Promise<{ id: string }> };

// GET /api/projects/[id]/members - List members
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

    const members = await prisma.projectMember.findMany({
      where: { projectId },
      include: {
        user: {
          select: { id: true, name: true, email: true },
        },
      },
      orderBy: [
        { role: "asc" }, // owner first, then admin, member, viewer
        { createdAt: "asc" },
      ],
    });

    return NextResponse.json({
      success: true,
      members,
    });
  } catch (error) {
    console.error("Error fetching members:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch members" },
      { status: 500 }
    );
  }
}

// POST /api/projects/[id]/members - Add member
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

    if (!canManageProject(access)) {
      return NextResponse.json(
        { success: false, error: "Permission denied" },
        { status: 403 }
      );
    }

    const body = await request.json();
    const validated = addMemberSchema.parse(body);

    const prisma = await getPrisma();

    // Find user by email
    const targetUser = await prisma.user.findUnique({
      where: { email: validated.email.toLowerCase() },
    });

    if (!targetUser) {
      return NextResponse.json(
        { success: false, error: "User not found. They must create an account first." },
        { status: 404 }
      );
    }

    // Check if already a member
    const existingMember = await prisma.projectMember.findUnique({
      where: {
        projectId_userId: { projectId, userId: targetUser.id },
      },
    });

    if (existingMember) {
      return NextResponse.json(
        { success: false, error: "User is already a member of this project" },
        { status: 409 }
      );
    }

    const member = await prisma.projectMember.create({
      data: {
        projectId,
        userId: targetUser.id,
        role: validated.role,
      },
      include: {
        user: {
          select: { id: true, name: true, email: true },
        },
      },
    });

    return NextResponse.json({
      success: true,
      member,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      const issues = error.issues || [];
      return NextResponse.json(
        { success: false, error: issues[0]?.message || "Validation error" },
        { status: 400 }
      );
    }

    console.error("Error adding member:", error);
    return NextResponse.json(
      { success: false, error: "Failed to add member" },
      { status: 500 }
    );
  }
}
