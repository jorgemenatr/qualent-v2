"use client";

import { useState } from "react";
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
  const [filter, setFilter] = useState<string>("all");
  const [search, setSearch] = useState("");

  const filteredTasks = tasks.filter((task) => {
    if (filter !== "all" && task.status !== filter) return false;
    if (search && !task.title.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const statusOptions = [
    { value: "todo", label: "To Do" },
    { value: "in_progress", label: "In Progress" },
    { value: "review", label: "Review" },
    { value: "completed", label: "Completed" },
  ];

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex items-center gap-4">
        <Input
          placeholder="Search tasks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-xs"
        />
        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Filter status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="todo">To Do</SelectItem>
            <SelectItem value="in_progress">In Progress</SelectItem>
            <SelectItem value="review">Review</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
          </SelectContent>
        </Select>
        {canEdit && onCreateTask && (
          <Button onClick={onCreateTask} size="sm">
            <Plus className="h-4 w-4 mr-1" />
            Add Task
          </Button>
        )}
      </div>

      {/* Task table */}
      {filteredTasks.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">
          {tasks.length === 0 ? "No tasks yet" : "No tasks match your filters"}
        </div>
      ) : (
        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[40%]">Task</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Assignee</TableHead>
                <TableHead>Due Date</TableHead>
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
                        Unassigned
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
