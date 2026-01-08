terraform {
  required_version = ">= 1.0"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
    random = {
      source  = "hashicorp/random"
      version = "~> 3.0"
    }
  }

  # Using local state for now
  # To migrate to S3 later, uncomment and run: terraform init -migrate-state
  # backend "s3" {
  #   bucket     = "picklellama-terraform-state"
  #   key        = "website/terraform.tfstate"
  #   region     = "ca-central-1"
  #   encrypt    = true
  #   use_lockfile = true
  # }
}

provider "aws" {
  region = var.aws_region

  default_tags {
    tags = {
      Project     = "picklellama-website"
      Environment = var.environment
      ManagedBy   = "terraform"
    }
  }
}
