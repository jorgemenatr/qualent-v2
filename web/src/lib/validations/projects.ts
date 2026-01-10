import { z } from "zod";

// ============================================================================
// Project Schemas
// ============================================================================

export const createProjectSchema = z.object({
  name: z.string().min(1, "Project name is required").max(100),
  description: z.string().max(5000).optional(),
  totalBudget: z.number().positive().optional().nullable(),
  currency: z.string().length(3).default("CAD"),
  startDate: z.string().datetime().optional().nullable(),
  targetEndDate: z.string().datetime().optional().nullable(),
});

export const updateProjectSchema = z.object({
  name: z.string().min(1).max(100).optional(),
  description: z.string().max(5000).optional().nullable(),
  status: z.enum(["active", "on_hold", "completed", "cancelled"]).optional(),
  totalBudget: z.number().min(0).optional().nullable(),
  amountSpent: z.number().min(0).optional(),
  currency: z.string().length(3).optional(),
  startDate: z.string().datetime().optional().nullable(),
  targetEndDate: z.string().datetime().optional().nullable(),
});

export type CreateProjectInput = z.infer<typeof createProjectSchema>;
export type UpdateProjectInput = z.infer<typeof updateProjectSchema>;

// ============================================================================
// Milestone Schemas
// ============================================================================

export const createMilestoneSchema = z.object({
  name: z.string().min(1, "Milestone name is required").max(100),
  description: z.string().max(2000).optional(),
  dueDate: z.string().datetime().optional().nullable(),
  sortOrder: z.number().int().optional(),
});

export const updateMilestoneSchema = z.object({
  name: z.string().min(1).max(100).optional(),
  description: z.string().max(2000).optional().nullable(),
  status: z.enum(["pending", "in_progress", "completed"]).optional(),
  dueDate: z.string().datetime().optional().nullable(),
  sortOrder: z.number().int().optional(),
});

export type CreateMilestoneInput = z.infer<typeof createMilestoneSchema>;
export type UpdateMilestoneInput = z.infer<typeof updateMilestoneSchema>;

// ============================================================================
// Task Schemas
// ============================================================================

export const createTaskSchema = z.object({
  title: z.string().min(1, "Task title is required").max(200),
  description: z.string().max(5000).optional(),
  priority: z.enum(["low", "medium", "high", "urgent"]).default("medium"),
  dueDate: z.string().datetime().optional().nullable(),
  milestoneId: z.string().optional().nullable(),
  assigneeId: z.string().optional().nullable(),
  sortOrder: z.number().int().optional(),
});

export const updateTaskSchema = z.object({
  title: z.string().min(1).max(200).optional(),
  description: z.string().max(5000).optional().nullable(),
  status: z.enum(["todo", "in_progress", "review", "completed"]).optional(),
  priority: z.enum(["low", "medium", "high", "urgent"]).optional(),
  dueDate: z.string().datetime().optional().nullable(),
  milestoneId: z.string().optional().nullable(),
  assigneeId: z.string().optional().nullable(),
  sortOrder: z.number().int().optional(),
});

export type CreateTaskInput = z.infer<typeof createTaskSchema>;
export type UpdateTaskInput = z.infer<typeof updateTaskSchema>;

// ============================================================================
// Document Schemas
// ============================================================================

export const createDocumentSchema = z.object({
  name: z.string().min(1, "Document name is required").max(200),
  description: z.string().max(1000).optional(),
  type: z.enum(["business", "technical", "general"]).default("general"),
  externalUrl: z.string().url("Must be a valid URL").optional(),
});

export const uploadDocumentSchema = z.object({
  name: z.string().min(1).max(200),
  description: z.string().max(1000).optional(),
  type: z.enum(["business", "technical", "general"]).default("general"),
  fileName: z.string(),
  fileSize: z.number().positive(),
  mimeType: z.string(),
});

export type CreateDocumentInput = z.infer<typeof createDocumentSchema>;
export type UploadDocumentInput = z.infer<typeof uploadDocumentSchema>;

// ============================================================================
// Member Schemas
// ============================================================================

export const addMemberSchema = z.object({
  email: z.string().email("Valid email required"),
  role: z.enum(["admin", "member", "viewer"]).default("member"),
});

export const updateMemberSchema = z.object({
  role: z.enum(["admin", "member", "viewer"]),
});

export type AddMemberInput = z.infer<typeof addMemberSchema>;
export type UpdateMemberInput = z.infer<typeof updateMemberSchema>;
