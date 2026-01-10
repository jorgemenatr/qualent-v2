import { NextRequest, NextResponse } from "next/server";
import { getPrisma } from "@/lib/db";
import { getAuthenticatedUser } from "@/lib/auth/server";
import { getProjectAccess, canManageProject } from "@/lib/projects";
import { updateMemberSchema } from "@/lib/validations/projects";
import { z } from "zod";

type RouteParams = { params: Promise<{ id: string; memberId: string }> };

// PUT /api/projects/[id]/members/[memberId] - Update member role
export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const user = await getAuthenticatedUser(request);

    if (!user) {
      return NextResponse.json(
        { success: false, error: "Authentication required" },
        { status: 401 }
      );
    }

    const { id: projectId, memberId } = await params;
    const access = await getProjectAccess(user.id, projectId, user.email);

    if (!canManageProject(access)) {
      return NextResponse.json(
        { success: false, error: "Permission denied" },
        { status: 403 }
      );
    }

    const body = await request.json();
    const validated = updateMemberSchema.parse(body);

    const prisma = await getPrisma();

    // Get the member to check it exists and isn't the owner
    const member = await prisma.projectMember.findFirst({
      where: { id: memberId, projectId },
    });

    if (!member) {
      return NextResponse.json(
        { success: false, error: "Member not found" },
        { status: 404 }
      );
    }

    // Can't change the owner's role
    if (member.role === "owner") {
      return NextResponse.json(
        { success: false, error: "Cannot change owner's role" },
        { status: 400 }
      );
    }

    const updated = await prisma.projectMember.update({
      where: { id: memberId },
      data: { role: validated.role },
      include: {
        user: {
          select: { id: true, name: true, email: true },
        },
      },
    });

    return NextResponse.json({
      success: true,
      member: updated,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      const issues = error.issues || [];
      return NextResponse.json(
        { success: false, error: issues[0]?.message || "Validation error" },
        { status: 400 }
      );
    }

    console.error("Error updating member:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update member" },
      { status: 500 }
    );
  }
}

// DELETE /api/projects/[id]/members/[memberId] - Remove member
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const user = await getAuthenticatedUser(request);

    if (!user) {
      return NextResponse.json(
        { success: false, error: "Authentication required" },
        { status: 401 }
      );
    }

    const { id: projectId, memberId } = await params;
    const access = await getProjectAccess(user.id, projectId, user.email);

    if (!canManageProject(access)) {
      return NextResponse.json(
        { success: false, error: "Permission denied" },
        { status: 403 }
      );
    }

    const prisma = await getPrisma();

    // Get the member to check it exists and isn't the owner
    const member = await prisma.projectMember.findFirst({
      where: { id: memberId, projectId },
    });

    if (!member) {
      return NextResponse.json(
        { success: false, error: "Member not found" },
        { status: 404 }
      );
    }

    // Can't remove the owner
    if (member.role === "owner") {
      return NextResponse.json(
        { success: false, error: "Cannot remove the project owner" },
        { status: 400 }
      );
    }

    await prisma.projectMember.delete({
      where: { id: memberId },
    });

    return NextResponse.json({
      success: true,
      message: "Member removed",
    });
  } catch (error) {
    console.error("Error removing member:", error);
    return NextResponse.json(
      { success: false, error: "Failed to remove member" },
      { status: 500 }
    );
  }
}
