"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  FileText,
  Trash2,
  Calendar,
  Clock,
  LogIn,
  Loader2,
  FolderOpen,
} from "lucide-react";
import { Container } from "@/components/layout";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useAuth } from "@/lib/auth";

interface ToolSave {
  id: string;
  toolType: string;
  name: string;
  data: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

const toolTypeLabels: Record<string, string> = {
  fives: "FIVES Assessment",
  build_vs_buy: "Build vs Buy Analysis",
  prioritization: "Prioritization Matrix",
};

const toolTypeRoutes: Record<string, string> = {
  fives: "/learn/tools/fives",
  build_vs_buy: "/learn/tools/build-vs-buy",
  prioritization: "/learn/tools/prioritization",
};

export default function SavedPage() {
  const { isAuthenticated, isLoading: authLoading, cognitoId, login } = useAuth();
  const router = useRouter();
  const [saves, setSaves] = useState<ToolSave[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      setIsLoading(false);
      return;
    }

    if (isAuthenticated && cognitoId) {
      fetchSaves();
    }
  }, [isAuthenticated, authLoading, cognitoId]);

  const fetchSaves = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/tools", {
        headers: {
          "x-cognito-id": cognitoId || "",
        },
      });

      const data = await response.json();

      if (data.success) {
        setSaves(data.saves);
      } else {
        setError(data.error || "Failed to load saves");
      }
    } catch (err) {
      setError("Failed to load saves");
      console.error("Error fetching saves:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      setDeletingId(id);
      const response = await fetch(`/api/tools/${id}`, {
        method: "DELETE",
        headers: {
          "x-cognito-id": cognitoId || "",
        },
      });

      const data = await response.json();

      if (data.success) {
        setSaves((prev) => prev.filter((save) => save.id !== id));
      } else {
        setError(data.error || "Failed to delete save");
      }
    } catch (err) {
      setError("Failed to delete save");
      console.error("Error deleting save:", err);
    } finally {
      setDeletingId(null);
    }
  };

  const handleOpenSave = (save: ToolSave) => {
    const route = toolTypeRoutes[save.toolType];
    if (route) {
      router.push(`${route}?load=${save.id}`);
    }
  };

  // Show login prompt if not authenticated
  if (!authLoading && !isAuthenticated) {
    return (
      <section className="py-20">
        <Container size="small">
          <div className="text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-muted">
              <LogIn className="h-8 w-8 text-muted-foreground" />
            </div>
            <h1 className="mt-6 text-2xl font-bold">Sign in to view your saves</h1>
            <p className="mt-2 text-muted-foreground">
              Save your tool assessments and access them from anywhere.
            </p>
            <Button className="mt-6" onClick={login}>
              Sign In
            </Button>
          </div>
        </Container>
      </section>
    );
  }

  return (
    <>
      {/* Header */}
      <section className="border-b border-border py-12">
        <Container>
          <h1 className="text-3xl font-bold tracking-tight">Saved Tools</h1>
          <p className="mt-2 text-muted-foreground">
            Your saved assessments and analyses
          </p>
        </Container>
      </section>

      {/* Content */}
      <section className="py-12">
        <Container>
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          ) : error ? (
            <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-4 text-center">
              <p className="text-destructive">{error}</p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => {
                  setError(null);
                  fetchSaves();
                }}
              >
                Try Again
              </Button>
            </div>
          ) : saves.length === 0 ? (
            <div className="rounded-lg border border-dashed border-border bg-muted/30 p-12 text-center">
              <FolderOpen className="mx-auto h-12 w-12 text-muted-foreground/50" />
              <h2 className="mt-4 text-lg font-medium">No saved tools yet</h2>
              <p className="mt-2 text-muted-foreground">
                Complete an assessment tool and save your results to see them here.
              </p>
              <Button className="mt-6" asChild>
                <Link href="/learn">Explore Tools</Link>
              </Button>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {saves.map((save) => (
                <Card key={save.id} className="group relative">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                        <FileText className="h-5 w-5 text-primary" />
                      </div>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 opacity-0 transition-opacity group-hover:opacity-100"
                            disabled={deletingId === save.id}
                          >
                            {deletingId === save.id ? (
                              <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                              <Trash2 className="h-4 w-4 text-muted-foreground hover:text-destructive" />
                            )}
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete this save?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This will permanently delete &quot;{save.name}&quot;. This action
                              cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDelete(save.id)}
                              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                    <CardTitle className="mt-4 text-base">{save.name}</CardTitle>
                    <CardDescription>
                      {toolTypeLabels[save.toolType] || save.toolType}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {new Date(save.createdAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {new Date(save.updatedAt).toLocaleTimeString("en-US", {
                          hour: "numeric",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                    <Button
                      variant="outline"
                      className="mt-4 w-full"
                      onClick={() => handleOpenSave(save)}
                    >
                      Open
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </Container>
      </section>
    </>
  );
}
