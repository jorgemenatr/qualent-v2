import { NextRequest, NextResponse } from "next/server";
import { getPrisma } from "@/lib/db";
import { getAuthenticatedUser } from "@/lib/auth/server";
import { isAdmin } from "@/lib/admin";

// GET /api/admin/tools - Get all saved tools
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

    const tools = await prisma.toolSave.findMany({
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
      tools: tools.map((t) => ({
        id: t.id,
        name: t.name,
        toolType: t.toolType,
        createdAt: t.createdAt,
        updatedAt: t.updatedAt,
        user: {
          id: t.user.id,
          email: t.user.email,
          name: t.user.name,
        },
      })),
    });
  } catch (error) {
    console.error("Error fetching admin tools:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch tools" },
      { status: 500 }
    );
  }
}
