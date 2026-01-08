import { NextRequest, NextResponse } from "next/server";
import { getPrisma } from "@/lib/db";
import { getAuthenticatedUser } from "@/lib/auth/server";
import { isAdmin } from "@/lib/admin";

// GET /api/admin/worksheets - Get all worksheet submissions
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

    const worksheets = await prisma.worksheetSubmission.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            name: true,
          },
        },
      },
    });

    return NextResponse.json({
      success: true,
      worksheets: worksheets.map((w) => ({
        id: w.id,
        name: w.name,
        createdAt: w.createdAt,
        updatedAt: w.updatedAt,
        user: {
          id: w.user.id,
          email: w.user.email,
          name: w.user.name,
        },
      })),
    });
  } catch (error) {
    console.error("Error fetching admin worksheets:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch worksheets" },
      { status: 500 }
    );
  }
}
