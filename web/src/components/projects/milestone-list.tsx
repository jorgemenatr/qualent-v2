"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Plus,
  Calendar,
  ChevronDown,
  ChevronRight,
  Edit2,
  Trash2,
  CheckCircle2,
  Circle,
  Clock,
  ListTodo,
} from "lucide-react";
import { format } from "date-fns";

interface Task {
  id: string;
  title: string;
  status: string;
}

interface Milestone {
  id: string;
  name: string;
  description: string | null;
  status: string;
  dueDate: string | null;
  completedAt: string | null;
  tasks?: Task[];
  _count?: { tasks: number };
}

interface MilestoneListProps {
  milestones: Milestone[];
  projectId: string;
  canEdit: boolean;
  cognitoId: string;
  onRefresh: () => void;
}

const statusConfig: Record<string, { label: string; icon: React.ElementType; color: string }> = {
  pending: { label: "Pending", icon: Circle, color: "text-muted-foreground" },
  in_progress: { label: "In Progress", icon: Clock, color: "text-blue-500" },
  completed: { label: "Completed", icon: CheckCircle2, color: "text-green-500" },
};

export function MilestoneList({
  milestones,
  projectId,
  canEdit,
  cognitoId,
  onRefresh,
}: MilestoneListProps) {
  const [expandedMilestones, setExpandedMilestones] = useState<Set<string>>(new Set());
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingMilestone, setEditingMilestone] = useState<Milestone | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    dueDate: "",
    status: "pending",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const toggleExpanded = (id: string) => {
    const newExpanded = new Set(expandedMilestones);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedMilestones(newExpanded);
  };

  const resetForm = () => {
    setFormData({ name: "", description: "", dueDate: "", status: "pending" });
  };

  const openCreate = () => {
    resetForm();
    setIsCreateOpen(true);
  };

  const openEdit = (milestone: Milestone) => {
    setFormData({
      name: milestone.name,
      description: milestone.description || "",
      dueDate: milestone.dueDate ? milestone.dueDate.split("T")[0] : "",
      status: milestone.status,
    });
    setEditingMilestone(milestone);
  };

  const handleCreate = async () => {
    if (!formData.name.trim()) return;
    setIsSubmitting(true);

    try {
      const res = await fetch(`/api/projects/${projectId}/milestones`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-cognito-id": cognitoId,
        },
        body: JSON.stringify({
          name: formData.name,
          description: formData.description || null,
          dueDate: formData.dueDate ? new Date(formData.dueDate).toISOString() : null,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setIsCreateOpen(false);
        resetForm();
        onRefresh();
      }
    } catch (err) {
      console.error("Create milestone error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdate = async () => {
    if (!editingMilestone || !formData.name.trim()) return;
    setIsSubmitting(true);

    try {
      const res = await fetch(
        `/api/projects/${projectId}/milestones/${editingMilestone.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "x-cognito-id": cognitoId,
          },
          body: JSON.stringify({
            name: formData.name,
            description: formData.description || null,
            status: formData.status,
            dueDate: formData.dueDate ? new Date(formData.dueDate).toISOString() : null,
          }),
        }
      );

      const data = await res.json();
      if (data.success) {
        setEditingMilestone(null);
        resetForm();
        onRefresh();
      }
    } catch (err) {
      console.error("Update milestone error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (milestone: Milestone) => {
    if (!confirm(`Delete milestone "${milestone.name}"? Tasks will be unlinked but not deleted.`)) {
      return;
    }

    try {
      const res = await fetch(
        `/api/projects/${projectId}/milestones/${milestone.id}`,
        {
          method: "DELETE",
          headers: { "x-cognito-id": cognitoId },
        }
      );

      const data = await res.json();
      if (data.success) {
        onRefresh();
      }
    } catch (err) {
      console.error("Delete milestone error:", err);
    }
  };

  const getTaskProgress = (milestone: Milestone) => {
    if (!milestone.tasks || milestone.tasks.length === 0) {
      return { completed: 0, total: milestone._count?.tasks || 0 };
    }
    const completed = milestone.tasks.filter((t) => t.status === "completed").length;
    return { completed, total: milestone.tasks.length };
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Milestones</h3>
        {canEdit && (
          <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
            <DialogTrigger asChild>
              <Button size="sm" onClick={openCreate}>
                <Plus className="h-4 w-4 mr-1" />
                Add Milestone
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create Milestone</DialogTitle>
                <DialogDescription>
                  Add a new milestone to track project progress.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div>
                  <label className="text-sm font-medium">Name</label>
                  <Input
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g., Phase 1 Complete"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Description (optional)</label>
                  <Textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="What does this milestone represent?"
                    rows={3}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Due Date (optional)</label>
                  <Input
                    type="date"
                    value={formData.dueDate}
                    onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsCreateOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCreate} disabled={isSubmitting || !formData.name.trim()}>
                  {isSubmitting ? "Creating..." : "Create"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </div>

      {/* Milestone list */}
      {milestones.length === 0 ? (
        <Card>
          <CardContent className="py-8 text-center text-muted-foreground">
            <ListTodo className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>No milestones yet</p>
            {canEdit && (
              <p className="text-sm mt-1">
                Create milestones to organize and track project progress.
              </p>
            )}
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {milestones.map((milestone) => {
            const StatusIcon = statusConfig[milestone.status]?.icon || Circle;
            const statusColor = statusConfig[milestone.status]?.color || "text-muted-foreground";
            const progress = getTaskProgress(milestone);
            const isExpanded = expandedMilestones.has(milestone.id);

            return (
              <Card key={milestone.id}>
                <Collapsible open={isExpanded} onOpenChange={() => toggleExpanded(milestone.id)}>
                  <CardHeader className="py-4">
                    <div className="flex items-start gap-3">
                      <CollapsibleTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-6 w-6 shrink-0 mt-0.5">
                          {isExpanded ? (
                            <ChevronDown className="h-4 w-4" />
                          ) : (
                            <ChevronRight className="h-4 w-4" />
                          )}
                        </Button>
                      </CollapsibleTrigger>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <StatusIcon className={`h-4 w-4 ${statusColor}`} />
                          <span className="font-medium">{milestone.name}</span>
                          <span className={`text-xs ${statusColor}`}>
                            {statusConfig[milestone.status]?.label}
                          </span>
                        </div>

                        <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                          {milestone.dueDate && (
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3.5 w-3.5" />
                              {format(new Date(milestone.dueDate), "MMM d, yyyy")}
                            </span>
                          )}
                          <span className="flex items-center gap-1">
                            <ListTodo className="h-3.5 w-3.5" />
                            {progress.completed}/{progress.total} tasks
                          </span>
                        </div>

                        {milestone.description && (
                          <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                            {milestone.description}
                          </p>
                        )}
                      </div>

                      {canEdit && (
                        <div className="flex items-center gap-1 shrink-0">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={(e) => {
                              e.stopPropagation();
                              openEdit(milestone);
                            }}
                          >
                            <Edit2 className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-destructive hover:text-destructive"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDelete(milestone);
                            }}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      )}
                    </div>

                    {/* Progress bar */}
                    {progress.total > 0 && (
                      <div className="ml-9 mt-3">
                        <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full bg-primary rounded-full transition-all"
                            style={{
                              width: `${(progress.completed / progress.total) * 100}%`,
                            }}
                          />
                        </div>
                      </div>
                    )}
                  </CardHeader>

                  <CollapsibleContent>
                    <CardContent className="pt-0 pb-4">
                      {milestone.tasks && milestone.tasks.length > 0 ? (
                        <div className="ml-9 space-y-2">
                          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">
                            Tasks
                          </p>
                          {milestone.tasks.map((task) => (
                            <div
                              key={task.id}
                              className="flex items-center gap-2 text-sm py-1"
                            >
                              {task.status === "completed" ? (
                                <CheckCircle2 className="h-4 w-4 text-green-500" />
                              ) : (
                                <Circle className="h-4 w-4 text-muted-foreground" />
                              )}
                              <span
                                className={
                                  task.status === "completed"
                                    ? "line-through text-muted-foreground"
                                    : ""
                                }
                              >
                                {task.title}
                              </span>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="ml-9 text-sm text-muted-foreground">
                          No tasks assigned to this milestone yet.
                        </p>
                      )}
                    </CardContent>
                  </CollapsibleContent>
                </Collapsible>
              </Card>
            );
          })}
        </div>
      )}

      {/* Edit Dialog */}
      <Dialog open={!!editingMilestone} onOpenChange={(open) => !open && setEditingMilestone(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Milestone</DialogTitle>
            <DialogDescription>
              Update milestone details and status.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <label className="text-sm font-medium">Name</label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g., Phase 1 Complete"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Description (optional)</label>
              <Textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="What does this milestone represent?"
                rows={3}
              />
            </div>
            <div>
              <label className="text-sm font-medium">Status</label>
              <Select
                value={formData.status}
                onValueChange={(value) => setFormData({ ...formData, status: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="in_progress">In Progress</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium">Due Date (optional)</label>
              <Input
                type="date"
                value={formData.dueDate}
                onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditingMilestone(null)}>
              Cancel
            </Button>
            <Button onClick={handleUpdate} disabled={isSubmitting || !formData.name.trim()}>
              {isSubmitting ? "Saving..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
