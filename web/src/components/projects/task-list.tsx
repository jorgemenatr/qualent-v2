"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { TaskStatusBadge, PriorityBadge } from "./project-status-badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, Calendar, User } from "lucide-react";
import { format } from "date-fns";

interface Task {
  id: string;
  title: string;
  description: string | null;
  status: string;
  priority: string;
  dueDate: string | null;
  assignee: {
    id: string;
    name: string | null;
    email: string;
  } | null;
  milestone: {
    id: string;
    name: string;
  } | null;
}

interface TaskListProps {
  tasks: Task[];
  projectId: string;
  canEdit: boolean;
  onTaskClick?: (task: Task) => void;
  onCreateTask?: () => void;
  onStatusChange?: (taskId: string, status: string) => void;
}

export function TaskList({
  tasks,
  canEdit,
  onTaskClick,
  onCreateTask,
  onStatusChange,
}: TaskListProps) {
  const t = useTranslations("ProjectComponents");
  const [filter, setFilter] = useState<string>("all");
  const [search, setSearch] = useState("");

  const filteredTasks = tasks.filter((task) => {
    if (filter !== "all" && task.status !== filter) return false;
    if (search && !task.title.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const statusOptions = [
    { value: "todo", label: t("statusTodo") },
    { value: "in_progress", label: t("statusInProgress") },
    { value: "review", label: t("statusReview") },
    { value: "completed", label: t("statusCompleted") },
  ];

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex items-center gap-4">
        <Input
          placeholder={t("searchTasks")}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-xs"
        />
        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder={t("filterStatus")} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t("allStatus")}</SelectItem>
            <SelectItem value="todo">{t("statusTodo")}</SelectItem>
            <SelectItem value="in_progress">{t("statusInProgress")}</SelectItem>
            <SelectItem value="review">{t("statusReview")}</SelectItem>
            <SelectItem value="completed">{t("statusCompleted")}</SelectItem>
          </SelectContent>
        </Select>
        {canEdit && onCreateTask && (
          <Button onClick={onCreateTask} size="sm">
            <Plus className="h-4 w-4 mr-1" />
            {t("addTask")}
          </Button>
        )}
      </div>

      {/* Task table */}
      {filteredTasks.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">
          {tasks.length === 0 ? t("noTasksYet") : t("noTasksMatch")}
        </div>
      ) : (
        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[40%]">{t("task")}</TableHead>
                <TableHead>{t("status")}</TableHead>
                <TableHead>{t("priority")}</TableHead>
                <TableHead>{t("assignee")}</TableHead>
                <TableHead>{t("dueDate")}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTasks.map((task) => (
                <TableRow
                  key={task.id}
                  className={onTaskClick ? "cursor-pointer hover:bg-muted/50" : ""}
                  onClick={() => onTaskClick?.(task)}
                >
                  <TableCell>
                    <div>
                      <div className="font-medium">{task.title}</div>
                      {task.milestone && (
                        <div className="text-xs text-muted-foreground">
                          {task.milestone.name}
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    {canEdit && onStatusChange ? (
                      <Select
                        value={task.status}
                        onValueChange={(value) => onStatusChange(task.id, value)}
                      >
                        <SelectTrigger className="h-7 w-[120px]">
                          <TaskStatusBadge status={task.status} />
                        </SelectTrigger>
                        <SelectContent>
                          {statusOptions.map((opt) => (
                            <SelectItem key={opt.value} value={opt.value}>
                              {opt.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    ) : (
                      <TaskStatusBadge status={task.status} />
                    )}
                  </TableCell>
                  <TableCell>
                    <PriorityBadge priority={task.priority} />
                  </TableCell>
                  <TableCell>
                    {task.assignee ? (
                      <div className="flex items-center gap-1.5">
                        <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-medium">
                          {(task.assignee.name || task.assignee.email).charAt(0).toUpperCase()}
                        </div>
                        <span className="text-sm">
                          {task.assignee.name || task.assignee.email.split("@")[0]}
                        </span>
                      </div>
                    ) : (
                      <span className="text-muted-foreground flex items-center gap-1">
                        <User className="h-4 w-4" />
                        {t("unassigned")}
                      </span>
                    )}
                  </TableCell>
                  <TableCell>
                    {task.dueDate ? (
                      <span className="flex items-center gap-1 text-sm">
                        <Calendar className="h-4 w-4" />
                        {format(new Date(task.dueDate), "MMM d")}
                      </span>
                    ) : (
                      <span className="text-muted-foreground">-</span>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
