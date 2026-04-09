"use client";

import { useEffect, useState, useCallback } from "react";
import { Link } from "@/i18n/navigation";
import { useAuth } from "@/lib/auth/hooks";
import { useTranslations } from "next-intl";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProjectCard } from "@/components/projects";
import { Plus, Loader2, FolderOpen } from "lucide-react";

interface Project {
  id: string;
  name: string;
  description: string | null;
  status: string;
  totalBudget: number | string | null;
  amountSpent: number | string | null;
  currency: string;
  targetEndDate: string | null;
  updatedAt: string;
  members: Array<{
    id: string;
    role: string;
    user: {
      id: string;
      name: string | null;
      email: string;
    };
  }>;
  _count: {
    tasks: number;
    milestones: number;
    documents: number;
  };
}

export default function ProjectsPage() {
  const { isAuthenticated, isLoading: authLoading, cognitoId, login } = useAuth();
  const t = useTranslations("Projects");
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState("all");
  const [search, setSearch] = useState("");

  const fetchProjects = useCallback(async () => {
    if (!cognitoId) return;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/projects", {
        headers: {
          "x-cognito-id": cognitoId,
        },
      });

      const data = await res.json();

      if (!data.success) {
        throw new Error(data.error || "Failed to fetch projects");
      }

      setProjects(data.projects);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load projects");
    } finally {
      setLoading(false);
    }
  }, [cognitoId]);

  useEffect(() => {
    if (isAuthenticated && cognitoId) {
      fetchProjects();
    }
  }, [isAuthenticated, cognitoId, fetchProjects]);

  // Filter projects by status and search
  const filteredProjects = projects.filter((project) => {
    if (statusFilter !== "all" && project.status !== statusFilter) return false;
    if (search && !project.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  if (authLoading) {
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
          <FolderOpen className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
          <h1 className="text-2xl font-bold mb-2">{t("projectPortal")}</h1>
          <p className="text-muted-foreground mb-6">
            {t("signInToManage")}
          </p>
          <Button onClick={login}>{t("signIn")}</Button>
        </div>
      </Container>
    );
  }

  return (
    <Container className="py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">{t("title")}</h1>
          <p className="text-muted-foreground mt-1">
            {t("subtitle")}
          </p>
        </div>
        <Button asChild>
          <Link href="/projects/new">
            <Plus className="h-4 w-4 mr-2" />
            {t("newProject")}
          </Link>
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <Input
          placeholder={t("searchPlaceholder")}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-xs"
        />
        <Tabs value={statusFilter} onValueChange={setStatusFilter}>
          <TabsList>
            <TabsTrigger value="all">{t("all")}</TabsTrigger>
            <TabsTrigger value="active">{t("active")}</TabsTrigger>
            <TabsTrigger value="on_hold">{t("onHold")}</TabsTrigger>
            <TabsTrigger value="completed">{t("completed")}</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Content */}
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : error ? (
        <div className="text-center py-12">
          <p className="text-destructive mb-4">{error}</p>
          <Button variant="outline" onClick={fetchProjects}>
            {t("tryAgain")}
          </Button>
        </div>
      ) : filteredProjects.length === 0 ? (
        <div className="text-center py-12 border-2 border-dashed rounded-lg">
          <FolderOpen className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
          {projects.length === 0 ? (
            <>
              <h3 className="text-lg font-medium mb-2">{t("noProjectsYet")}</h3>
              <p className="text-muted-foreground mb-4">
                {t("createFirstProject")}
              </p>
              <Button asChild>
                <Link href="/projects/new">
                  <Plus className="h-4 w-4 mr-2" />
                  {t("createProject")}
                </Link>
              </Button>
            </>
          ) : (
            <>
              <h3 className="text-lg font-medium mb-2">{t("noMatchingProjects")}</h3>
              <p className="text-muted-foreground">
                {t("tryAdjustingFilters")}
              </p>
            </>
          )}
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}
    </Container>
  );
}
