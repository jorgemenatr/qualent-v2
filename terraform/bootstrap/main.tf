# -----------------------------------------------------------------------------
# Terraform State Backend Bootstrap
# -----------------------------------------------------------------------------
# Run this FIRST before the main Terraform configuration.
# This creates the S3 bucket and DynamoDB table for state management.
#
# Usage:
#   cd terraform/bootstrap
#   terraform init
#   terraform apply
# -----------------------------------------------------------------------------

terraform {
  required_version = ">= 1.0"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = "ca-central-1"

  default_tags {
    tags = {
      Project   = "picklellama-website"
      ManagedBy = "terraform"
      Purpose   = "terraform-state"
    }
  }
}

# -----------------------------------------------------------------------------
# S3 Bucket for State Storage
# -----------------------------------------------------------------------------

resource "aws_s3_bucket" "terraform_state" {
  bucket = "picklellama-terraform-state"

  # Prevent accidental deletion
  lifecycle {
    prevent_destroy = true
  }

  tags = {
    Name = "picklellama-terraform-state"
  }
}

resource "aws_s3_bucket_versioning" "terraform_state" {
  bucket = aws_s3_bucket.terraform_state.id
  versioning_configuration {
    status = "Enabled"
  }
}

resource "aws_s3_bucket_server_side_encryption_configuration" "terraform_state" {
  bucket = aws_s3_bucket.terraform_state.id

  rule {
    apply_server_side_encryption_by_default {
      sse_algorithm = "AES256"
    }
  }
}

resource "aws_s3_bucket_public_access_block" "terraform_state" {
  bucket = aws_s3_bucket.terraform_state.id

  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

# -----------------------------------------------------------------------------
# DynamoDB Table for State Locking
# -----------------------------------------------------------------------------

resource "aws_dynamodb_table" "terraform_locks" {
  name         = "terraform-locks"
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "LockID"

  attribute {
    name = "LockID"
    type = "S"
  }

  tags = {
    Name = "terraform-locks"
  }
}

# -----------------------------------------------------------------------------
# Outputs
# -----------------------------------------------------------------------------

output "state_bucket_name" {
  description = "Name of the S3 bucket for Terraform state"
  value       = aws_s3_bucket.terraform_state.id
}

output "state_bucket_arn" {
  description = "ARN of the S3 bucket for Terraform state"
  value       = aws_s3_bucket.terraform_state.arn
}

output "dynamodb_table_name" {
  description = "Name of the DynamoDB table for state locking"
  value       = aws_dynamodb_table.terraform_locks.name
}

output "next_steps" {
  description = "Next steps after bootstrap"
  value       = <<-EOT
    Bootstrap complete! Now you can run the main Terraform configuration:

    1. cd ../  (go back to terraform directory)
    2. cp terraform.tfvars.example terraform.tfvars
    3. Edit terraform.tfvars with your values
    4. terraform init
    5. terraform plan
    6. terraform apply
  EOT
}
