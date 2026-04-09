"use client";

import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProjectStatusBadge } from "./project-status-badge";
import { Calendar, Users, CheckSquare, DollarSign } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface ProjectMember {
  id: string;
  role: string;
  user: {
    id: string;
    name: string | null;
    email: string;
  };
}

interface ProjectCardProps {
  project: {
    id: string;
    name: string;
    description: string | null;
    status: string;
    totalBudget: number | string | null;
    amountSpent: number | string | null;
    currency: string;
    targetEndDate: string | null;
    updatedAt: string;
    members: ProjectMember[];
    _count: {
      tasks: number;
      milestones: number;
      documents: number;
    };
  };
}

export function ProjectCard({ project }: ProjectCardProps) {
  const t = useTranslations("ProjectComponents");
  const budget = project.totalBudget ? Number(project.totalBudget) : null;
  const spent = project.amountSpent ? Number(project.amountSpent) : 0;
  const budgetPercent = budget ? Math.min((spent / budget) * 100, 100) : 0;

  return (
    <Link href={`/projects/${project.id}`}>
      <Card className="h-full transition-shadow hover:shadow-md cursor-pointer">
        <CardHeader className="pb-2">
          <div className="flex items-start justify-between gap-2">
            <CardTitle className="text-lg line-clamp-1">{project.name}</CardTitle>
            <ProjectStatusBadge status={project.status} />
          </div>
          {project.description && (
            <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
              {project.description}
            </p>
          )}
        </CardHeader>
        <CardContent className="space-y-3">
          {/* Stats row */}
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <CheckSquare className="h-4 w-4" />
              <span>{t("tasksCount", { count: project._count.tasks })}</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              <span>{project.members.length}</span>
            </div>
          </div>

          {/* Budget progress */}
          {budget && (
            <div className="space-y-1">
              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-1 text-muted-foreground">
                  <DollarSign className="h-3.5 w-3.5" />
                  {t("budget")}
                </span>
                <span className="font-medium">
                  {new Intl.NumberFormat("en-CA", {
                    style: "currency",
                    currency: project.currency,
                    maximumFractionDigits: 0,
                  }).format(spent)}{" "}
                  /{" "}
                  {new Intl.NumberFormat("en-CA", {
                    style: "currency",
                    currency: project.currency,
                    maximumFractionDigits: 0,
                  }).format(budget)}
                </span>
              </div>
              <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full transition-all"
                  style={{ width: `${budgetPercent}%` }}
                />
              </div>
            </div>
          )}

          {/* Due date */}
          {project.targetEndDate && (
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span>
                {t("due")} {formatDistanceToNow(new Date(project.targetEndDate), { addSuffix: true })}
              </span>
            </div>
          )}

          {/* Member avatars */}
          <div className="flex -space-x-2">
            {project.members.slice(0, 4).map((member) => (
              <div
                key={member.id}
                className="h-7 w-7 rounded-full bg-primary/10 border-2 border-background flex items-center justify-center text-xs font-medium"
                title={member.user.name || member.user.email}
              >
                {(member.user.name || member.user.email).charAt(0).toUpperCase()}
              </div>
            ))}
            {project.members.length > 4 && (
              <div className="h-7 w-7 rounded-full bg-muted border-2 border-background flex items-center justify-center text-xs font-medium">
                +{project.members.length - 4}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
