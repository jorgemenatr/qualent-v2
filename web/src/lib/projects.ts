/**
 * Project access control helpers
 */

import { getPrisma } from "@/lib/db";
import { isAdmin } from "@/lib/admin";

export type ProjectRole = "owner" | "admin" | "member" | "viewer";

export interface ProjectAccess {
  hasAccess: boolean;
  role: ProjectRole | null;
  isSiteAdmin: boolean;
}

/**
 * Get a user's access level for a specific project
 */
export async function getProjectAccess(
  userId: string,
  projectId: string,
  userEmail?: string | null
): Promise<ProjectAccess> {
  const prisma = await getPrisma();

  // Check if site admin
  const isSiteAdmin = isAdmin(userEmail);

  // Check project membership
  const membership = await prisma.projectMember.findUnique({
    where: {
      projectId_userId: { projectId, userId },
    },
  });

  return {
    hasAccess: isSiteAdmin || !!membership,
    role: (membership?.role as ProjectRole) || null,
    isSiteAdmin,
  };
}

/**
 * Check if user can manage project settings (edit details, manage members)
 */
export function canManageProject(access: ProjectAccess): boolean {
  return (
    access.isSiteAdmin ||
    access.role === "owner" ||
    access.role === "admin"
  );
}

/**
 * Check if user can delete the project
 */
export function canDeleteProject(access: ProjectAccess): boolean {
  return access.isSiteAdmin || access.role === "owner";
}

/**
 * Check if user can edit tasks and upload documents
 */
export function canEditContent(access: ProjectAccess): boolean {
  return (
    access.isSiteAdmin ||
    access.role === "owner" ||
    access.role === "admin" ||
    access.role === "member"
  );
}

/**
 * Check if user can view the project
 */
export function canViewProject(access: ProjectAccess): boolean {
  return access.hasAccess;
}

/**
 * Check if user can edit budget information
 */
export function canEditBudget(access: ProjectAccess): boolean {
  return canManageProject(access);
}

/**
 * Get projects that a user has access to
 */
export async function getUserProjects(userId: string, userEmail?: string | null) {
  const prisma = await getPrisma();
  const isSiteAdmin = isAdmin(userEmail);

  if (isSiteAdmin) {
    // Site admins can see all projects
    return prisma.project.findMany({
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
        _count: {
          select: {
            tasks: true,
            milestones: true,
            documents: true,
          },
        },
      },
      orderBy: { updatedAt: "desc" },
    });
  }

  // Regular users see projects they're members of
  return prisma.project.findMany({
    where: {
      members: {
        some: { userId },
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
      _count: {
        select: {
          tasks: true,
          milestones: true,
          documents: true,
        },
      },
    },
    orderBy: { updatedAt: "desc" },
  });
}

/**
 * Get a single project with full details
 */
export async function getProjectWithDetails(projectId: string) {
  const prisma = await getPrisma();

  return prisma.project.findUnique({
    where: { id: projectId },
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
      milestones: {
        orderBy: { sortOrder: "asc" },
      },
      tasks: {
        include: {
          assignee: {
            select: { id: true, name: true, email: true },
          },
          milestone: {
            select: { id: true, name: true },
          },
        },
        orderBy: { sortOrder: "asc" },
      },
      documents: {
        include: {
          uploadedBy: {
            select: { id: true, name: true, email: true },
          },
        },
        orderBy: { createdAt: "desc" },
      },
    },
  });
}
