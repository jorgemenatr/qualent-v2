# -----------------------------------------------------------------------------
# General Variables
# -----------------------------------------------------------------------------

variable "aws_region" {
  description = "AWS region for all resources"
  type        = string
  default     = "ca-central-1"
}

variable "environment" {
  description = "Environment name (production, staging)"
  type        = string
  default     = "production"
}

variable "project_name" {
  description = "Project name used for resource naming"
  type        = string
  default     = "picklellama"
}

# -----------------------------------------------------------------------------
# Database Variables
# -----------------------------------------------------------------------------

variable "db_instance_class" {
  description = "RDS instance class"
  type        = string
  default     = "db.t3.micro"
}

variable "db_name" {
  description = "Name of the database"
  type        = string
  default     = "picklellama"
}

variable "db_username" {
  description = "Master username for the database"
  type        = string
  default     = "picklellama_admin"
}

variable "db_allocated_storage" {
  description = "Allocated storage in GB"
  type        = number
  default     = 20
}

variable "db_backup_retention_period" {
  description = "Number of days to retain backups"
  type        = number
  default     = 7
}

# -----------------------------------------------------------------------------
# Cognito Variables
# -----------------------------------------------------------------------------

variable "google_client_id" {
  description = "Google OAuth 2.0 Client ID"
  type        = string
  sensitive   = true
}

variable "google_client_secret" {
  description = "Google OAuth 2.0 Client Secret"
  type        = string
  sensitive   = true
}

variable "app_domain" {
  description = "Application domain for Cognito callbacks"
  type        = string
  default     = "picklellama.studio"
}

variable "cognito_callback_urls" {
  description = "List of allowed callback URLs for Cognito"
  type        = list(string)
  default = [
    "http://localhost:3000/auth/callback",
    "https://picklellama.studio/auth/callback"
  ]
}

variable "cognito_logout_urls" {
  description = "List of allowed logout URLs for Cognito"
  type        = list(string)
  default = [
    "http://localhost:3000",
    "https://picklellama.studio"
  ]
}

# -----------------------------------------------------------------------------
# S3 Variables
# -----------------------------------------------------------------------------

variable "s3_bucket_name" {
  description = "Name for the S3 content bucket"
  type        = string
  default     = "picklellama-content"
}

# -----------------------------------------------------------------------------
# SES Variables
# -----------------------------------------------------------------------------

variable "ses_email_domain" {
  description = "Domain for SES email sending"
  type        = string
  default     = "picklellama.studio"
}

variable "ses_from_email" {
  description = "Default from email address"
  type        = string
  default     = "hello@picklellama.studio"
}

# -----------------------------------------------------------------------------
# GitHub / Amplify Variables
# -----------------------------------------------------------------------------

variable "github_repository" {
  description = "GitHub repository URL for Amplify"
  type        = string
  default     = "https://github.com/PickleLlama-Studio/home-2.0"
}

variable "github_access_token" {
  description = "GitHub personal access token for Amplify to access the repository"
  type        = string
  sensitive   = true
}

# -----------------------------------------------------------------------------
# AI Service Variables
# -----------------------------------------------------------------------------

variable "anthropic_api_key" {
  description = "Anthropic API key for Claude chat responses"
  type        = string
  sensitive   = true
}

variable "google_api_key" {
  description = "Google AI API key for Gemini RAG retrieval"
  type        = string
  sensitive   = true
}

variable "gemini_file_search_store" {
  description = "Gemini File Search Store name for RAG retrieval"
  type        = string
  default     = "fileSearchStores/picklellamaknowledgebase-b1ambzi0s32z"
}
