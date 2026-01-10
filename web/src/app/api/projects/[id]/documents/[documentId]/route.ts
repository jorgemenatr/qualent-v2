import { NextRequest, NextResponse } from "next/server";
import { getPrisma } from "@/lib/db";
import { getAuthenticatedUser } from "@/lib/auth/server";
import { getProjectAccess, canManageProject, canViewProject } from "@/lib/projects";
import { getPresignedDownloadUrl } from "@/lib/s3";

type RouteParams = { params: Promise<{ id: string; documentId: string }> };

// GET /api/projects/[id]/documents/[documentId] - Get document with download URL
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const user = await getAuthenticatedUser(request);

    if (!user) {
      return NextResponse.json(
        { success: false, error: "Authentication required" },
        { status: 401 }
      );
    }

    const { id: projectId, documentId } = await params;
    const access = await getProjectAccess(user.id, projectId, user.email);

    if (!canViewProject(access)) {
      return NextResponse.json(
        { success: false, error: "Project not found" },
        { status: 404 }
      );
    }

    const prisma = await getPrisma();

    const document = await prisma.projectDocument.findFirst({
      where: { id: documentId, projectId },
      include: {
        uploadedBy: {
          select: { id: true, name: true, email: true },
        },
      },
    });

    if (!document) {
      return NextResponse.json(
        { success: false, error: "Document not found" },
        { status: 404 }
      );
    }

    // If it's a file upload, generate download URL
    let downloadUrl: string | null = null;
    if (document.s3Key) {
      downloadUrl = await getPresignedDownloadUrl(document.s3Key);
    }

    return NextResponse.json({
      success: true,
      document,
      downloadUrl,
    });
  } catch (error) {
    console.error("Error fetching document:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch document" },
      { status: 500 }
    );
  }
}

// DELETE /api/projects/[id]/documents/[documentId] - Delete document
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const user = await getAuthenticatedUser(request);

    if (!user) {
      return NextResponse.json(
        { success: false, error: "Authentication required" },
        { status: 401 }
      );
    }

    const { id: projectId, documentId } = await params;
    const access = await getProjectAccess(user.id, projectId, user.email);

    const prisma = await getPrisma();

    // Get the document to check ownership
    const document = await prisma.projectDocument.findFirst({
      where: { id: documentId, projectId },
    });

    if (!document) {
      return NextResponse.json(
        { success: false, error: "Document not found" },
        { status: 404 }
      );
    }

    // Allow deletion if user is manager, or if user uploaded the document
    const canDelete = canManageProject(access) || document.uploadedById === user.id;

    if (!canDelete) {
      return NextResponse.json(
        { success: false, error: "Permission denied" },
        { status: 403 }
      );
    }

    // TODO: Also delete from S3 if s3Key exists

    await prisma.projectDocument.delete({
      where: { id: documentId },
    });

    return NextResponse.json({
      success: true,
      message: "Document deleted",
    });
  } catch (error) {
    console.error("Error deleting document:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete document" },
      { status: 500 }
    );
  }
}
