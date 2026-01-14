"use client";

import { useEffect, useState, useCallback } from "react";
import {
  Users,
  ClipboardList,
  Wrench,
  Mail,
  Loader2,
  ShieldX,
  LogIn,
  Calendar,
  Building2,
  FileText,
  FolderOpen,
  DollarSign,
  CheckSquare,
  Music,
  Plus,
  Pencil,
  Trash2,
  Check,
  X,
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useAuth } from "@/lib/auth";
import { isAdmin } from "@/lib/admin";
import { AudioUploadDialog } from "@/components/admin/audio-upload-dialog";
import { AudioEditDialog } from "@/components/admin/audio-edit-dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface Stats {
  users: number;
  worksheets: number;
  tools: number;
  contacts: number;
  projects: number;
}

interface AdminUser {
  id: string;
  email: string;
  name: string | null;
  createdAt: string;
  companyProfile: {
    companyName: string;
    industry: string | null;
    companySize: string | null;
    userRole: string | null;
  } | null;
  counts: {
    tools: number;
    worksheets: number;
  };
}

interface AdminWorksheet {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  user: {
    id: string;
    email: string;
    name: string | null;
  };
}

interface AdminTool {
  id: string;
  name: string;
  toolType: string;
  createdAt: string;
  updatedAt: string;
  user: {
    id: string;
    email: string;
    name: string | null;
  };
}

interface AdminContact {
  id: string;
  email: string;
  name: string | null;
  company: string | null;
  source: string | null;
  createdAt: string;
  downloadsCount: number;
}

interface AdminProject {
  id: string;
  name: string;
  description: string | null;
  status: string;
  totalBudget: number | null;
  amountSpent: number;
  currency: string;
  startDate: string | null;
  targetEndDate: string | null;
  createdAt: string;
  updatedAt: string;
  owner: {
    id: string;
    email: string;
    name: string | null;
  };
  members: Array<{
    id: string;
    role: string;
    user: {
      id: string;
      email: string;
      name: string | null;
    };
  }>;
  _count: {
    tasks: number;
    milestones: number;
    documents: number;
  };
}

interface AdminAudio {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  s3Key: string;
  fileName: string;
  fileSize: number;
  mimeType: string;
  duration: string;
  available: boolean;
  createdAt: string;
  updatedAt: string;
  uploadedBy: {
    id: string;
    name: string | null;
    email: string;
  };
}

// Available reports for audio upload
const AVAILABLE_REPORTS = [
  { slug: "ai-automation-roi-guide", title: "AI Automation ROI Guide" },
  { slug: "selecting-the-right-problems", title: "Selecting the Right Problems" },
  { slug: "pilot-to-production-gap", title: "The Pilot to Production Gap" },
  { slug: "requirements-problem", title: "The Requirements Problem" },
  { slug: "build-buy-or-both", title: "Build, Buy, or Both" },
  { slug: "data-readiness", title: "Data Readiness for the LLM Era" },
  { slug: "cloud-infrastructure", title: "Cloud Infrastructure Decisions" },
  { slug: "low-code-platform-selection", title: "Low-Code Platform Selection" },
  { slug: "technical-implementation-patterns", title: "Technical Implementation Patterns" },
  { slug: "process-requirements-frameworks", title: "Process Requirements Frameworks" },
];

const statusLabels: Record<string, { label: string; className: string }> = {
  active: { label: "Active", className: "bg-green-500/10 text-green-600" },
  on_hold: { label: "On Hold", className: "bg-yellow-500/10 text-yellow-600" },
  completed: { label: "Completed", className: "bg-blue-500/10 text-blue-600" },
  cancelled: { label: "Cancelled", className: "bg-red-500/10 text-red-600" },
};

const toolTypeLabels: Record<string, string> = {
  fives: "FIVES",
  build_vs_buy: "Build vs Buy",
  prioritization: "Prioritization",
};

export default function AdminPage() {
  const { isAuthenticated, isLoading: authLoading, cognitoId, email, login } = useAuth();

  const [stats, setStats] = useState<Stats | null>(null);
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [worksheets, setWorksheets] = useState<AdminWorksheet[]>([]);
  const [tools, setTools] = useState<AdminTool[]>([]);
  const [contacts, setContacts] = useState<AdminContact[]>([]);
  const [projects, setProjects] = useState<AdminProject[]>([]);
  const [audios, setAudios] = useState<AdminAudio[]>([]);

  const [statsLoading, setStatsLoading] = useState(true);
  const [usersLoading, setUsersLoading] = useState(true);
  const [worksheetsLoading, setWorksheetsLoading] = useState(true);
  const [toolsLoading, setToolsLoading] = useState(true);
  const [contactsLoading, setContactsLoading] = useState(true);
  const [projectsLoading, setProjectsLoading] = useState(true);
  const [audiosLoading, setAudiosLoading] = useState(true);

  const [error, setError] = useState<string | null>(null);
  const [isAdminUser, setIsAdminUser] = useState<boolean | null>(null);

  // Audio dialog states
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedAudio, setSelectedAudio] = useState<AdminAudio | null>(null);

  // Check admin status
  useEffect(() => {
    if (!authLoading && isAuthenticated && email) {
      setIsAdminUser(isAdmin(email));
    }
  }, [authLoading, isAuthenticated, email]);

  // Fetch stats
  const fetchStats = useCallback(async () => {
    try {
      setStatsLoading(true);
      const response = await fetch("/api/admin/stats", {
        headers: { "x-cognito-id": cognitoId || "" },
      });
      const data = await response.json();
      if (data.success) {
        setStats(data.stats);
      } else if (response.status === 403) {
        setIsAdminUser(false);
      }
    } catch {
      setError("Failed to load stats");
    } finally {
      setStatsLoading(false);
    }
  }, [cognitoId]);

  // Fetch users
  const fetchUsers = useCallback(async () => {
    try {
      setUsersLoading(true);
      const response = await fetch("/api/admin/users", {
        headers: { "x-cognito-id": cognitoId || "" },
      });
      const data = await response.json();
      if (data.success) {
        setUsers(data.users);
      }
    } catch {
      console.error("Failed to load users");
    } finally {
      setUsersLoading(false);
    }
  }, [cognitoId]);

  // Fetch worksheets
  const fetchWorksheets = useCallback(async () => {
    try {
      setWorksheetsLoading(true);
      const response = await fetch("/api/admin/worksheets", {
        headers: { "x-cognito-id": cognitoId || "" },
      });
      const data = await response.json();
      if (data.success) {
        setWorksheets(data.worksheets);
      }
    } catch {
      console.error("Failed to load worksheets");
    } finally {
      setWorksheetsLoading(false);
    }
  }, [cognitoId]);

  // Fetch tools
  const fetchTools = useCallback(async () => {
    try {
      setToolsLoading(true);
      const response = await fetch("/api/admin/tools", {
        headers: { "x-cognito-id": cognitoId || "" },
      });
      const data = await response.json();
      if (data.success) {
        setTools(data.tools);
      }
    } catch {
      console.error("Failed to load tools");
    } finally {
      setToolsLoading(false);
    }
  }, [cognitoId]);

  // Fetch contacts
  const fetchContacts = useCallback(async () => {
    try {
      setContactsLoading(true);
      const response = await fetch("/api/admin/contacts", {
        headers: { "x-cognito-id": cognitoId || "" },
      });
      const data = await response.json();
      if (data.success) {
        setContacts(data.contacts);
      }
    } catch {
      console.error("Failed to load contacts");
    } finally {
      setContactsLoading(false);
    }
  }, [cognitoId]);

  // Fetch projects
  const fetchProjects = useCallback(async () => {
    try {
      setProjectsLoading(true);
      const response = await fetch("/api/admin/projects", {
        headers: { "x-cognito-id": cognitoId || "" },
      });
      const data = await response.json();
      if (data.success) {
        setProjects(data.projects);
      }
    } catch {
      console.error("Failed to load projects");
    } finally {
      setProjectsLoading(false);
    }
  }, [cognitoId]);

  // Fetch audio files
  const fetchAudios = useCallback(async () => {
    try {
      setAudiosLoading(true);
      const response = await fetch("/api/admin/audio", {
        headers: { "x-cognito-id": cognitoId || "" },
      });
      const data = await response.json();
      if (data.success) {
        setAudios(data.audioFiles);
      }
    } catch {
      console.error("Failed to load audio files");
    } finally {
      setAudiosLoading(false);
    }
  }, [cognitoId]);

  // Handle audio deletion
  const handleDeleteAudio = async () => {
    if (!selectedAudio || !cognitoId) return;

    try {
      const response = await fetch(`/api/admin/audio/${selectedAudio.id}`, {
        method: "DELETE",
        headers: { "x-cognito-id": cognitoId },
      });
      const data = await response.json();
      if (data.success) {
        setDeleteDialogOpen(false);
        setSelectedAudio(null);
        fetchAudios();
      }
    } catch {
      console.error("Failed to delete audio");
    }
  };

  // Fetch all data when authenticated admin
  useEffect(() => {
    if (isAdminUser && cognitoId) {
      fetchStats();
      fetchUsers();
      fetchWorksheets();
      fetchTools();
      fetchContacts();
      fetchProjects();
      fetchAudios();
    }
  }, [isAdminUser, cognitoId, fetchStats, fetchUsers, fetchWorksheets, fetchTools, fetchContacts, fetchProjects, fetchAudios]);

  // Show login prompt if not authenticated
  if (!authLoading && !isAuthenticated) {
    return (
      <section className="py-20">
        <Container size="small">
          <div className="text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-muted">
              <LogIn className="h-8 w-8 text-muted-foreground" />
            </div>
            <h1 className="mt-6 text-2xl font-bold">Admin Access Required</h1>
            <p className="mt-2 text-muted-foreground">
              Please sign in to access the admin dashboard.
            </p>
            <Button className="mt-6" onClick={login}>
              Sign In
            </Button>
          </div>
        </Container>
      </section>
    );
  }

  // Show access denied if not admin
  if (isAdminUser === false) {
    return (
      <section className="py-20">
        <Container size="small">
          <div className="text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10">
              <ShieldX className="h-8 w-8 text-destructive" />
            </div>
            <h1 className="mt-6 text-2xl font-bold">Access Denied</h1>
            <p className="mt-2 text-muted-foreground">
              You don&apos;t have permission to access the admin dashboard.
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Signed in as: {email}
            </p>
          </div>
        </Container>
      </section>
    );
  }

  // Loading state
  if (authLoading || isAdminUser === null) {
    return (
      <section className="py-20">
        <Container size="small">
          <div className="flex items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        </Container>
      </section>
    );
  }

  return (
    <>
      {/* Header */}
      <section className="border-b border-border py-8">
        <Container>
          <h1 className="text-2xl font-bold tracking-tight">Admin Dashboard</h1>
          <p className="mt-1 text-muted-foreground">
            Overview of all users and activity
          </p>
        </Container>
      </section>

      {/* Stats */}
      <section className="py-8">
        <Container>
          {statsLoading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
            </div>
          ) : stats ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Users
                  </CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.users}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">
                    Worksheets
                  </CardTitle>
                  <ClipboardList className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.worksheets}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">
                    Saved Tools
                  </CardTitle>
                  <Wrench className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.tools}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">
                    Contacts
                  </CardTitle>
                  <Mail className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.contacts}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">
                    Projects
                  </CardTitle>
                  <FolderOpen className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.projects}</div>
                </CardContent>
              </Card>
            </div>
          ) : error ? (
            <p className="text-destructive">{error}</p>
          ) : null}
        </Container>
      </section>

      {/* Data Tables */}
      <section className="pb-12">
        <Container>
          <Tabs defaultValue="users" className="space-y-6">
            <TabsList>
              <TabsTrigger value="users" className="gap-2">
                <Users className="h-4 w-4" />
                Users
              </TabsTrigger>
              <TabsTrigger value="projects" className="gap-2">
                <FolderOpen className="h-4 w-4" />
                Projects
              </TabsTrigger>
              <TabsTrigger value="worksheets" className="gap-2">
                <ClipboardList className="h-4 w-4" />
                Worksheets
              </TabsTrigger>
              <TabsTrigger value="tools" className="gap-2">
                <Wrench className="h-4 w-4" />
                Tools
              </TabsTrigger>
              <TabsTrigger value="contacts" className="gap-2">
                <Mail className="h-4 w-4" />
                Contacts
              </TabsTrigger>
              <TabsTrigger value="audio" className="gap-2">
                <Music className="h-4 w-4" />
                Audio
              </TabsTrigger>
            </TabsList>

            {/* Users Tab */}
            <TabsContent value="users">
              <Card>
                <CardHeader>
                  <CardTitle>All Users</CardTitle>
                  <CardDescription>
                    Users who have created an account
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {usersLoading ? (
                    <div className="flex items-center justify-center py-8">
                      <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                    </div>
                  ) : users.length === 0 ? (
                    <p className="py-8 text-center text-muted-foreground">
                      No users yet
                    </p>
                  ) : (
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>User</TableHead>
                            <TableHead>Company</TableHead>
                            <TableHead>Role</TableHead>
                            <TableHead>Activity</TableHead>
                            <TableHead>Joined</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {users.map((user) => (
                            <TableRow key={user.id}>
                              <TableCell>
                                <div>
                                  <p className="font-medium">
                                    {user.name || "—"}
                                  </p>
                                  <p className="text-sm text-muted-foreground">
                                    {user.email}
                                  </p>
                                </div>
                              </TableCell>
                              <TableCell>
                                {user.companyProfile ? (
                                  <div className="flex items-center gap-2">
                                    <Building2 className="h-4 w-4 text-muted-foreground" />
                                    <span>{user.companyProfile.companyName}</span>
                                  </div>
                                ) : (
                                  <span className="text-muted-foreground">—</span>
                                )}
                              </TableCell>
                              <TableCell>
                                {user.companyProfile?.userRole || (
                                  <span className="text-muted-foreground">—</span>
                                )}
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center gap-3 text-sm">
                                  <span
                                    className="flex items-center gap-1"
                                    title="Saved tools"
                                  >
                                    <FileText className="h-3 w-3" />
                                    {user.counts.tools}
                                  </span>
                                  <span
                                    className="flex items-center gap-1"
                                    title="Worksheets"
                                  >
                                    <ClipboardList className="h-3 w-3" />
                                    {user.counts.worksheets}
                                  </span>
                                </div>
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                  <Calendar className="h-3 w-3" />
                                  {new Date(user.createdAt).toLocaleDateString(
                                    "en-US",
                                    {
                                      month: "short",
                                      day: "numeric",
                                      year: "numeric",
                                    }
                                  )}
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Projects Tab */}
            <TabsContent value="projects">
              <Card>
                <CardHeader>
                  <CardTitle>All Projects</CardTitle>
                  <CardDescription>
                    Client projects across all users
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {projectsLoading ? (
                    <div className="flex items-center justify-center py-8">
                      <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                    </div>
                  ) : projects.length === 0 ? (
                    <p className="py-8 text-center text-muted-foreground">
                      No projects yet
                    </p>
                  ) : (
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Project</TableHead>
                            <TableHead>Owner</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Budget</TableHead>
                            <TableHead>Activity</TableHead>
                            <TableHead>Created</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {projects.map((project) => (
                            <TableRow key={project.id}>
                              <TableCell>
                                <div>
                                  <p className="font-medium">{project.name}</p>
                                  {project.description && (
                                    <p className="text-sm text-muted-foreground line-clamp-1">
                                      {project.description}
                                    </p>
                                  )}
                                </div>
                              </TableCell>
                              <TableCell>
                                <div>
                                  <p>{project.owner.name || "—"}</p>
                                  <p className="text-sm text-muted-foreground">
                                    {project.owner.email}
                                  </p>
                                </div>
                              </TableCell>
                              <TableCell>
                                <span
                                  className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                                    statusLabels[project.status]?.className ||
                                    "bg-muted text-muted-foreground"
                                  }`}
                                >
                                  {statusLabels[project.status]?.label ||
                                    project.status}
                                </span>
                              </TableCell>
                              <TableCell>
                                {project.totalBudget ? (
                                  <div className="flex items-center gap-1 text-sm">
                                    <DollarSign className="h-3 w-3" />
                                    <span>
                                      {project.amountSpent.toLocaleString()} /{" "}
                                      {project.totalBudget.toLocaleString()}
                                    </span>
                                  </div>
                                ) : (
                                  <span className="text-muted-foreground">—</span>
                                )}
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center gap-3 text-sm">
                                  <span
                                    className="flex items-center gap-1"
                                    title="Tasks"
                                  >
                                    <CheckSquare className="h-3 w-3" />
                                    {project._count.tasks}
                                  </span>
                                  <span
                                    className="flex items-center gap-1"
                                    title="Documents"
                                  >
                                    <FileText className="h-3 w-3" />
                                    {project._count.documents}
                                  </span>
                                  <span
                                    className="flex items-center gap-1"
                                    title="Members"
                                  >
                                    <Users className="h-3 w-3" />
                                    {project.members.length}
                                  </span>
                                </div>
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                  <Calendar className="h-3 w-3" />
                                  {new Date(project.createdAt).toLocaleDateString(
                                    "en-US",
                                    {
                                      month: "short",
                                      day: "numeric",
                                      year: "numeric",
                                    }
                                  )}
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Worksheets Tab */}
            <TabsContent value="worksheets">
              <Card>
                <CardHeader>
                  <CardTitle>All Worksheets</CardTitle>
                  <CardDescription>
                    Pre-meeting worksheets submitted by users
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {worksheetsLoading ? (
                    <div className="flex items-center justify-center py-8">
                      <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                    </div>
                  ) : worksheets.length === 0 ? (
                    <p className="py-8 text-center text-muted-foreground">
                      No worksheets yet
                    </p>
                  ) : (
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Worksheet</TableHead>
                            <TableHead>User</TableHead>
                            <TableHead>Created</TableHead>
                            <TableHead>Updated</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {worksheets.map((worksheet) => (
                            <TableRow key={worksheet.id}>
                              <TableCell className="font-medium">
                                {worksheet.name}
                              </TableCell>
                              <TableCell>
                                <div>
                                  <p>{worksheet.user.name || "—"}</p>
                                  <p className="text-sm text-muted-foreground">
                                    {worksheet.user.email}
                                  </p>
                                </div>
                              </TableCell>
                              <TableCell>
                                {new Date(worksheet.createdAt).toLocaleDateString(
                                  "en-US",
                                  {
                                    month: "short",
                                    day: "numeric",
                                    year: "numeric",
                                  }
                                )}
                              </TableCell>
                              <TableCell>
                                {new Date(worksheet.updatedAt).toLocaleDateString(
                                  "en-US",
                                  {
                                    month: "short",
                                    day: "numeric",
                                    year: "numeric",
                                  }
                                )}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Tools Tab */}
            <TabsContent value="tools">
              <Card>
                <CardHeader>
                  <CardTitle>All Saved Tools</CardTitle>
                  <CardDescription>
                    Tool assessments saved by users
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {toolsLoading ? (
                    <div className="flex items-center justify-center py-8">
                      <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                    </div>
                  ) : tools.length === 0 ? (
                    <p className="py-8 text-center text-muted-foreground">
                      No saved tools yet
                    </p>
                  ) : (
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead>User</TableHead>
                            <TableHead>Created</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {tools.map((tool) => (
                            <TableRow key={tool.id}>
                              <TableCell className="font-medium">
                                {tool.name}
                              </TableCell>
                              <TableCell>
                                <span className="inline-flex items-center rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                                  {toolTypeLabels[tool.toolType] || tool.toolType}
                                </span>
                              </TableCell>
                              <TableCell>
                                <div>
                                  <p>{tool.user.name || "—"}</p>
                                  <p className="text-sm text-muted-foreground">
                                    {tool.user.email}
                                  </p>
                                </div>
                              </TableCell>
                              <TableCell>
                                {new Date(tool.createdAt).toLocaleDateString(
                                  "en-US",
                                  {
                                    month: "short",
                                    day: "numeric",
                                    year: "numeric",
                                  }
                                )}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Contacts Tab */}
            <TabsContent value="contacts">
              <Card>
                <CardHeader>
                  <CardTitle>All Contacts</CardTitle>
                  <CardDescription>
                    Contacts collected from PDF downloads and forms
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {contactsLoading ? (
                    <div className="flex items-center justify-center py-8">
                      <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                    </div>
                  ) : contacts.length === 0 ? (
                    <p className="py-8 text-center text-muted-foreground">
                      No contacts yet
                    </p>
                  ) : (
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Contact</TableHead>
                            <TableHead>Company</TableHead>
                            <TableHead>Source</TableHead>
                            <TableHead>Downloads</TableHead>
                            <TableHead>Added</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {contacts.map((contact) => (
                            <TableRow key={contact.id}>
                              <TableCell>
                                <div>
                                  <p className="font-medium">
                                    {contact.name || "—"}
                                  </p>
                                  <p className="text-sm text-muted-foreground">
                                    {contact.email}
                                  </p>
                                </div>
                              </TableCell>
                              <TableCell>
                                {contact.company || (
                                  <span className="text-muted-foreground">—</span>
                                )}
                              </TableCell>
                              <TableCell>
                                {contact.source ? (
                                  <span className="inline-flex items-center rounded-full bg-muted px-2 py-1 text-xs">
                                    {contact.source}
                                  </span>
                                ) : (
                                  <span className="text-muted-foreground">—</span>
                                )}
                              </TableCell>
                              <TableCell>{contact.downloadsCount}</TableCell>
                              <TableCell>
                                {new Date(contact.createdAt).toLocaleDateString(
                                  "en-US",
                                  {
                                    month: "short",
                                    day: "numeric",
                                    year: "numeric",
                                  }
                                )}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Audio Tab */}
            <TabsContent value="audio">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Audio Files</CardTitle>
                    <CardDescription>
                      Audio versions of reports for the listening feature
                    </CardDescription>
                  </div>
                  <Button onClick={() => setUploadDialogOpen(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Upload Audio
                  </Button>
                </CardHeader>
                <CardContent>
                  {audiosLoading ? (
                    <div className="flex items-center justify-center py-8">
                      <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                    </div>
                  ) : audios.length === 0 ? (
                    <p className="py-8 text-center text-muted-foreground">
                      No audio files yet. Upload audio for reports to enable the listening feature.
                    </p>
                  ) : (
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Report</TableHead>
                            <TableHead>Duration</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>File Size</TableHead>
                            <TableHead>Uploaded</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {audios.map((audio) => (
                            <TableRow key={audio.id}>
                              <TableCell>
                                <div>
                                  <p className="font-medium">{audio.name}</p>
                                  <p className="text-sm text-muted-foreground">
                                    {audio.slug}
                                  </p>
                                </div>
                              </TableCell>
                              <TableCell>
                                <span className="font-mono">{audio.duration}</span>
                              </TableCell>
                              <TableCell>
                                {audio.available ? (
                                  <span className="inline-flex items-center gap-1 rounded-full bg-green-500/10 px-2 py-1 text-xs font-medium text-green-600">
                                    <Check className="h-3 w-3" />
                                    Available
                                  </span>
                                ) : (
                                  <span className="inline-flex items-center gap-1 rounded-full bg-yellow-500/10 px-2 py-1 text-xs font-medium text-yellow-600">
                                    <X className="h-3 w-3" />
                                    Hidden
                                  </span>
                                )}
                              </TableCell>
                              <TableCell>
                                {(audio.fileSize / 1024 / 1024).toFixed(1)} MB
                              </TableCell>
                              <TableCell>
                                <div>
                                  <p className="text-sm">
                                    {new Date(audio.createdAt).toLocaleDateString(
                                      "en-US",
                                      {
                                        month: "short",
                                        day: "numeric",
                                        year: "numeric",
                                      }
                                    )}
                                  </p>
                                  <p className="text-xs text-muted-foreground">
                                    by {audio.uploadedBy.name || audio.uploadedBy.email}
                                  </p>
                                </div>
                              </TableCell>
                              <TableCell className="text-right">
                                <div className="flex items-center justify-end gap-2">
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => {
                                      setSelectedAudio(audio);
                                      setEditDialogOpen(true);
                                    }}
                                  >
                                    <Pencil className="h-4 w-4" />
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="text-destructive hover:text-destructive"
                                    onClick={() => {
                                      setSelectedAudio(audio);
                                      setDeleteDialogOpen(true);
                                    }}
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </Container>
      </section>

      {/* Audio Dialogs */}
      <AudioUploadDialog
        open={uploadDialogOpen}
        onOpenChange={setUploadDialogOpen}
        reports={AVAILABLE_REPORTS}
        existingSlugs={audios.map((a) => a.slug)}
        cognitoId={cognitoId || ""}
        onSuccess={fetchAudios}
      />

      <AudioEditDialog
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
        audioFile={selectedAudio}
        cognitoId={cognitoId || ""}
        onSuccess={fetchAudios}
      />

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Audio File</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete the audio file for &quot;{selectedAudio?.name}&quot;?
              This will remove it from S3 and users will no longer be able to listen to this report.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteAudio}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
