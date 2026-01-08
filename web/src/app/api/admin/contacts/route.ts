import { NextRequest, NextResponse } from "next/server";
import { getPrisma } from "@/lib/db";
import { getAuthenticatedUser } from "@/lib/auth/server";
import { isAdmin } from "@/lib/admin";

// GET /api/admin/contacts - Get all contacts with download counts
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

    const contacts = await prisma.contact.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        _count: {
          select: {
            downloads: true,
          },
        },
      },
    });

    return NextResponse.json({
      success: true,
      contacts: contacts.map((c) => ({
        id: c.id,
        email: c.email,
        name: c.name,
        company: c.company,
        source: c.source,
        createdAt: c.createdAt,
        downloadsCount: c._count.downloads,
      })),
    });
  } catch (error) {
    console.error("Error fetching admin contacts:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch contacts" },
      { status: 500 }
    );
  }
}
