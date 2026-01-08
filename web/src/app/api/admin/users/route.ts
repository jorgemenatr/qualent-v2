import { NextRequest, NextResponse } from "next/server";
import { getPrisma } from "@/lib/db";
import { getAuthenticatedUser } from "@/lib/auth/server";
import { isAdmin } from "@/lib/admin";

// GET /api/admin/users - Get all users with company profiles
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

    const users = await prisma.user.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        companyProfile: true,
        _count: {
          select: {
            toolSaves: true,
            worksheetSubmissions: true,
          },
        },
      },
    });

    return NextResponse.json({
      success: true,
      users: users.map((u) => ({
        id: u.id,
        email: u.email,
        name: u.name,
        createdAt: u.createdAt,
        companyProfile: u.companyProfile
          ? {
              companyName: u.companyProfile.companyName,
              industry: u.companyProfile.industry,
              companySize: u.companyProfile.companySize,
              userRole: u.companyProfile.userRole,
            }
          : null,
        counts: {
          tools: u._count.toolSaves,
          worksheets: u._count.worksheetSubmissions,
        },
      })),
    });
  } catch (error) {
    console.error("Error fetching admin users:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch users" },
      { status: 500 }
    );
  }
}
