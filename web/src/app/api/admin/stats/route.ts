import { NextRequest, NextResponse } from "next/server";
import { getPrisma } from "@/lib/db";
import { getAuthenticatedUser } from "@/lib/auth/server";
import { isAdmin } from "@/lib/admin";

// GET /api/admin/stats - Get summary statistics
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

    const [usersCount, worksheetsCount, toolsCount, contactsCount, projectsCount] =
      await Promise.all([
        prisma.user.count(),
        prisma.worksheetSubmission.count(),
        prisma.toolSave.count(),
        prisma.contact.count(),
        prisma.project.count(),
      ]);

    return NextResponse.json({
      success: true,
      stats: {
        users: usersCount,
        worksheets: worksheetsCount,
        tools: toolsCount,
        contacts: contactsCount,
        projects: projectsCount,
      },
    });
  } catch (error) {
    console.error("Error fetching admin stats:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch stats" },
      { status: 500 }
    );
  }
}
