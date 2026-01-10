"use client";

import { useEffect, useState, useCallback, use } from "react";
import Link from "next/link";
import { useAuth } from "@/lib/auth/hooks";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ProjectStatusBadge,
  TaskList,
  DocumentList,
  MemberList,
} from "@/components/projects";
import {
  ArrowLeft,
  Loader2,
  CheckSquare,
  FileText,
  Users,
  DollarSign,
  Calendar,
  Edit2,
  Check,
  X,
} from "lucide-react";

interface Project {
  id: string;
  name: string;
  description: string | null;
  status: string;
  totalBudget: string | null;
  amountSpent: string;
  currency: string;
  startDate: string | null;
  targetEndDate: string | null;
  createdAt: string;
  updatedAt: string;
  owner: { id: string; name: string | null; email: string };
  members: Array<{
    id: string;
    role: string;
    createdAt: string;
    user: { id: string; name: string | null; email: string };
  }>;
  milestones: Array<{
    id: string;
    name: string;
    status: string;
    dueDate: string | null;
  }>;
  tasks: Array<{
    id: string;
    title: string;
    description: string | null;
    status: string;
    priority: string;
    dueDate: string | null;
    assignee: { id: string; name: string | null; email: string } | null;
    milestone: { id: string; name: string } | null;
  }>;
  documents: Array<{
    id: string;
    name: string;
    description: string | null;
    type: string;
    s3Key: string | null;
    externalUrl: string | null;
    fileName: string | null;
    fileSize: number | null;
    mimeType: string | null;
    createdAt: string;
    uploadedBy: { id: string; name: string | null; email: string };
  }>;
}

interface TaskStats {
  total: number;
  todo: number;
  inProgress: number;
  review: number;
  completed: number;
}

interface Access {
  role: string | null;
  canManage: boolean;
  canDelete: boolean;
}

export default function ProjectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { isAuthenticated, isLoading: authLoading, cognitoId, login } = useAuth();
  const [project, setProject] = useState<Project | null>(null);
  const [taskStats, setTaskStats] = useState<TaskStats | null>(null);
  const [access, setAccess] = useState<Access | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingName, setEditingName] = useState(false);
  const [editingDesc, setEditingDesc] = useState(false);
  const [nameValue, setNameValue] = useState("");
  const [descValue, setDescValue] = useState("");

  const fetchProject = useCallback(async () => {
    if (!cognitoId) return;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`/api/projects/${id}`, {
        headers: { "x-cognito-id": cognitoId },
      });

      const data = await res.json();

      if (!data.success) {
        throw new Error(data.error || "Failed to fetch project");
      }

      setProject(data.project);
      setTaskStats(data.taskStats);
      setAccess(data.access);
      setNameValue(data.project.name);
      setDescValue(data.project.description || "");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load project");
    } finally {
      setLoading(false);
    }
  }, [cognitoId, id]);

  useEffect(() => {
    if (isAuthenticated && cognitoId) {
      fetchProject();
    }
  }, [isAuthenticated, cognitoId, fetchProject]);

  const updateProject = async (updates: Record<string, unknown>) => {
    if (!cognitoId || !project) return;

    try {
      const res = await fetch(`/api/projects/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-cognito-id": cognitoId,
        },
        body: JSON.stringify(updates),
      });

      const data = await res.json();

      if (!data.success) {
        throw new Error(data.error || "Failed to update project");
      }

      setProject({ ...project, ...data.project });
      return true;
    } catch (err) {
      console.error("Update error:", err);
      return false;
    }
  };

  const updateTaskStatus = async (taskId: string, status: string) => {
    if (!cognitoId) return;

    try {
      const res = await fetch(`/api/projects/${id}/tasks/${taskId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-cognito-id": cognitoId,
        },
        body: JSON.stringify({ status }),
      });

      const data = await res.json();

      if (data.success) {
        fetchProject(); // Refresh to get updated stats
      }
    } catch (err) {
      console.error("Update task error:", err);
    }
  };

  const handleSaveName = async () => {
    if (await updateProject({ name: nameValue })) {
      setEditingName(false);
    }
  };

  const handleSaveDesc = async () => {
    if (await updateProject({ description: descValue })) {
      setEditingDesc(false);
    }
  };

  if (authLoading || loading) {
    return (
      <Container className="py-12">
        <div className="flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </Container>
    );
  }

  if (!isAuthenticated) {
    return (
      <Container className="py-12">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Project Details</h1>
          <p className="text-muted-foreground mb-6">Sign in to view this project</p>
          <Button onClick={login}>Sign In</Button>
        </div>
      </Container>
    );
  }

  if (error || !project) {
    return (
      <Container className="py-12">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Project Not Found</h1>
          <p className="text-muted-foreground mb-6">{error || "Unable to load project"}</p>
          <Button asChild>
            <Link href="/projects">Back to Projects</Link>
          </Button>
        </div>
      </Container>
    );
  }

  const budget = project.totalBudget ? Number(project.totalBudget) : null;
  const spent = Number(project.amountSpent) || 0;
  const remaining = budget ? budget - spent : 0;
  const budgetPercent = budget ? Math.min((spent / budget) * 100, 100) : 0;

  const canEdit = access?.canManage || false;

  return (
    <Container className="py-8">
      {/* Back button */}
      <div className="mb-6">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/projects">
            <ArrowLeft className="h-4 w-4 mr-2" />
            All Projects
          </Link>
        </Button>
      </div>

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-start justify-between gap-4 mb-2">
          {editingName ? (
            <div className="flex items-center gap-2 flex-1">
              <Input
                value={nameValue}
                onChange={(e) => setNameValue(e.target.value)}
                className="text-2xl font-bold h-auto py-1"
                autoFocus
              />
              <Button size="icon" variant="ghost" onClick={handleSaveName}>
                <Check className="h-4 w-4" />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                onClick={() => {
                  setNameValue(project.name);
                  setEditingName(false);
                }}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <h1 className="text-3xl font-bold flex items-center gap-2">
              {project.name}
              {canEdit && (
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-8 w-8"
                  onClick={() => setEditingName(true)}
                >
                  <Edit2 className="h-4 w-4" />
                </Button>
              )}
            </h1>
          )}
          {canEdit && (
            <Select
              value={project.status}
              onValueChange={(value) => updateProject({ status: value })}
            >
              <SelectTrigger className="w-[140px]">
                <ProjectStatusBadge status={project.status} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="on_hold">On Hold</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          )}
          {!canEdit && <ProjectStatusBadge status={project.status} />}
        </div>

        {editingDesc ? (
          <div className="space-y-2">
            <Textarea
              value={descValue}
              onChange={(e) => setDescValue(e.target.value)}
              rows={3}
              autoFocus
            />
            <div className="flex gap-2">
              <Button size="sm" onClick={handleSaveDesc}>
                Save
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  setDescValue(project.description || "");
                  setEditingDesc(false);
                }}
              >
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          <p className="text-muted-foreground group">
            {project.description || "No description"}
            {canEdit && (
              <Button
                size="icon"
                variant="ghost"
                className="h-6 w-6 ml-1 opacity-0 group-hover:opacity-100"
                onClick={() => setEditingDesc(true)}
              >
                <Edit2 className="h-3 w-3" />
              </Button>
            )}
          </p>
        )}
      </div>

      {/* Stats cards */}
      <div className="grid gap-4 md:grid-cols-4 mb-8">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                <CheckSquare className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Tasks</p>
                <p className="text-2xl font-bold">
                  {taskStats?.completed || 0}/{taskStats?.total || 0}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
                <DollarSign className="h-5 w-5 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Budget Used</p>
                <p className="text-2xl font-bold">{budgetPercent.toFixed(0)}%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
                <FileText className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Documents</p>
                <p className="text-2xl font-bold">{project.documents.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-100 dark:bg-orange-900 rounded-lg">
                <Users className="h-5 w-5 text-orange-600 dark:text-orange-400" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Team</p>
                <p className="text-2xl font-bold">{project.members.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="tasks" className="space-y-6">
        <TabsList>
          <TabsTrigger value="tasks">
            <CheckSquare className="h-4 w-4 mr-2" />
            Tasks
          </TabsTrigger>
          <TabsTrigger value="documents">
            <FileText className="h-4 w-4 mr-2" />
            Documents
          </TabsTrigger>
          <TabsTrigger value="budget">
            <DollarSign className="h-4 w-4 mr-2" />
            Budget
          </TabsTrigger>
          <TabsTrigger value="team">
            <Users className="h-4 w-4 mr-2" />
            Team
          </TabsTrigger>
        </TabsList>

        <TabsContent value="tasks">
          <TaskList
            tasks={project.tasks}
            projectId={project.id}
            canEdit={canEdit}
            onStatusChange={updateTaskStatus}
          />
        </TabsContent>

        <TabsContent value="documents">
          <DocumentList
            documents={project.documents}
            canEdit={canEdit}
            onDownload={async (doc) => {
              if (!cognitoId) return;
              try {
                const res = await fetch(
                  `/api/projects/${id}/documents/${doc.id}`,
                  { headers: { "x-cognito-id": cognitoId } }
                );
                const data = await res.json();
                if (data.downloadUrl) {
                  window.open(data.downloadUrl, "_blank");
                }
              } catch (err) {
                console.error("Download error:", err);
              }
            }}
          />
        </TabsContent>

        <TabsContent value="budget">
          <Card>
            <CardHeader>
              <CardTitle>Budget Overview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-6 md:grid-cols-3">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Total Budget</p>
                  <p className="text-3xl font-bold">
                    {budget
                      ? new Intl.NumberFormat("en-CA", {
                          style: "currency",
                          currency: project.currency,
                        }).format(budget)
                      : "Not set"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Spent</p>
                  <p className="text-3xl font-bold text-orange-600">
                    {new Intl.NumberFormat("en-CA", {
                      style: "currency",
                      currency: project.currency,
                    }).format(spent)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Remaining</p>
                  <p className="text-3xl font-bold text-green-600">
                    {new Intl.NumberFormat("en-CA", {
                      style: "currency",
                      currency: project.currency,
                    }).format(remaining)}
                  </p>
                </div>
              </div>

              {budget && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progress</span>
                    <span>{budgetPercent.toFixed(1)}%</span>
                  </div>
                  <div className="h-3 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full transition-all"
                      style={{ width: `${budgetPercent}%` }}
                    />
                  </div>
                </div>
              )}

              {project.startDate && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>
                    Started {new Date(project.startDate).toLocaleDateString()}
                  </span>
                  {project.targetEndDate && (
                    <span>
                      &bull; Target end {new Date(project.targetEndDate).toLocaleDateString()}
                    </span>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="team">
          <MemberList
            members={project.members}
            currentUserId={project.owner.id}
            canManage={canEdit}
            onRoleChange={async (memberId, role) => {
              if (!cognitoId) return;
              try {
                await fetch(`/api/projects/${id}/members/${memberId}`, {
                  method: "PUT",
                  headers: {
                    "Content-Type": "application/json",
                    "x-cognito-id": cognitoId,
                  },
                  body: JSON.stringify({ role }),
                });
                fetchProject();
              } catch (err) {
                console.error("Update member error:", err);
              }
            }}
            onRemoveMember={async (member) => {
              if (!cognitoId) return;
              if (!confirm(`Remove ${member.user.name || member.user.email} from the project?`)) return;
              try {
                await fetch(`/api/projects/${id}/members/${member.id}`, {
                  method: "DELETE",
                  headers: { "x-cognito-id": cognitoId },
                });
                fetchProject();
              } catch (err) {
                console.error("Remove member error:", err);
              }
            }}
          />
        </TabsContent>
      </Tabs>
    </Container>
  );
}
