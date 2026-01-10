import { NextRequest, NextResponse } from "next/server";
import { getPrisma } from "@/lib/db";
import { getAuthenticatedUser } from "@/lib/auth/server";
import { isAdmin } from "@/lib/admin";

export async function GET(request: NextRequest) {
  try {
    const user = await getAuthenticatedUser(request);

    if (!user || !isAdmin(user.email)) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 403 }
      );
    }

    const prisma = await getPrisma();

    // Fetch all projects with owner and member details
    const projects = await prisma.project.findMany({
      include: {
        owner: {
          select: {
            id: true,
            email: true,
            name: true,
          },
        },
        members: {
          include: {
            user: {
              select: {
                id: true,
                email: true,
                name: true,
              },
            },
          },
        },
        _count: {
          select: {
            tasks: true,
            milestones: true,
            documents: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({
      success: true,
      projects: projects.map((project) => ({
        id: project.id,
        name: project.name,
        description: project.description,
        status: project.status,
        totalBudget: project.totalBudget ? Number(project.totalBudget) : null,
        amountSpent: project.amountSpent ? Number(project.amountSpent) : 0,
        currency: project.currency,
        startDate: project.startDate?.toISOString() || null,
        targetEndDate: project.targetEndDate?.toISOString() || null,
        createdAt: project.createdAt.toISOString(),
        updatedAt: project.updatedAt.toISOString(),
        owner: project.owner,
        members: project.members.map((m) => ({
          id: m.id,
          role: m.role,
          user: m.user,
        })),
        _count: project._count,
      })),
    });
  } catch (error) {
    console.error("Error fetching admin projects:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch projects" },
      { status: 500 }
    );
  }
}
