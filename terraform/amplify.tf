# -----------------------------------------------------------------------------
# IAM Role for Amplify
# -----------------------------------------------------------------------------

resource "aws_iam_role" "amplify_service_role" {
  name = "${var.project_name}-amplify-service-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Principal = {
          Service = [
            "amplify.amazonaws.com",
            "lambda.amazonaws.com"
          ]
        }
      }
    ]
  })
}

resource "aws_iam_role_policy" "amplify_s3_access" {
  name = "${var.project_name}-amplify-s3-access"
  role = aws_iam_role.amplify_service_role.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Action = [
          "s3:GetObject",
          "s3:PutObject",
          "s3:DeleteObject",
          "s3:ListBucket"
        ]
        Resource = [
          aws_s3_bucket.content.arn,
          "${aws_s3_bucket.content.arn}/*"
        ]
      }
    ]
  })
}

resource "aws_iam_role_policy" "amplify_ses_access" {
  name = "${var.project_name}-amplify-ses-access"
  role = aws_iam_role.amplify_service_role.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Action = [
          "ses:SendEmail",
          "ses:SendRawEmail"
        ]
        Resource = "*"
        Condition = {
          StringEquals = {
            "ses:FromAddress" = var.ses_from_email
          }
        }
      }
    ]
  })
}

# -----------------------------------------------------------------------------
# AWS Amplify App
# -----------------------------------------------------------------------------

resource "aws_amplify_app" "website" {
  name       = "${var.project_name}-website"
  repository = var.github_repository

  # IAM role for accessing AWS services (S3, SES)
  iam_service_role_arn = aws_iam_role.amplify_service_role.arn

  # GitHub personal access token for repo access
  access_token = var.github_access_token

  # Build settings are defined in amplify.yml in the repo root
  # This allows the build config to be version controlled with the code

  # Enable auto branch creation for feature branches (optional)
  enable_auto_branch_creation = false

  # Environment variables for the app
  environment_variables = {
    # Database
    DATABASE_URL = "postgresql://${var.db_username}:${urlencode(random_password.db_password.result)}@${aws_db_instance.main.endpoint}/${aws_db_instance.main.db_name}?schema=public"

    # AWS Cognito
    NEXT_PUBLIC_COGNITO_USER_POOL_ID = aws_cognito_user_pool.main.id
    NEXT_PUBLIC_COGNITO_CLIENT_ID    = aws_cognito_user_pool_client.web.id
    NEXT_PUBLIC_COGNITO_DOMAIN       = "${aws_cognito_user_pool_domain.main.domain}.auth.${var.aws_region}.amazoncognito.com"
    NEXT_PUBLIC_COGNITO_ISSUER       = "https://cognito-idp.${var.aws_region}.amazonaws.com/${aws_cognito_user_pool.main.id}"

    # S3 (Note: Can't use AWS_ prefix - reserved by Amplify)
    S3_BUCKET_NAME      = aws_s3_bucket.content.id
    S3_REGION           = var.aws_region
    S3_ACCESS_KEY_ID    = aws_iam_access_key.amplify_s3_user.id
    S3_SECRET_ACCESS_KEY = aws_iam_access_key.amplify_s3_user.secret

    # SES
    SES_FROM_EMAIL = var.ses_from_email

    # App
    NEXT_PUBLIC_APP_URL = "https://${var.app_domain}"

    # Amplify specific
    AMPLIFY_MONOREPO_APP_ROOT = "web"

    # AI Services
    ANTHROPIC_API_KEY        = var.anthropic_api_key
    GOOGLE_AI_API_KEY        = var.google_api_key
    GEMINI_FILE_SEARCH_STORE = var.gemini_file_search_store

    # Micro-CRM Integration
    MICRO_CRM_API_URL = var.micro_crm_api_url
    MICRO_CRM_API_KEY = var.micro_crm_api_key
  }

  # Platform - use WEB_COMPUTE for Next.js SSR support
  platform = "WEB_COMPUTE"

  # Note: No custom_rule blocks needed for Next.js SSR
  # Amplify's WEB_COMPUTE platform handles routing automatically
}

# -----------------------------------------------------------------------------
# Main Branch (Production)
# -----------------------------------------------------------------------------

resource "aws_amplify_branch" "main" {
  app_id      = aws_amplify_app.website.id
  branch_name = "main"

  # Production environment
  stage = "PRODUCTION"

  # Enable auto-build on push
  enable_auto_build = true

  # Framework detection
  framework = "Next.js - SSR"

  # Branch-specific environment variables
  # Note: SSR compute functions require env vars at branch level, not just app level
  environment_variables = {
    NODE_ENV                 = "production"
    DATABASE_URL             = "postgresql://${var.db_username}:${urlencode(random_password.db_password.result)}@${aws_db_instance.main.endpoint}/${aws_db_instance.main.db_name}?schema=public"
    ANTHROPIC_API_KEY        = var.anthropic_api_key
    GOOGLE_AI_API_KEY        = var.google_api_key
    GEMINI_FILE_SEARCH_STORE = var.gemini_file_search_store
    # S3 configuration for SSR functions (using IAM user credentials)
    S3_BUCKET_NAME           = aws_s3_bucket.content.id
    S3_REGION                = var.aws_region
    S3_ACCESS_KEY_ID         = aws_iam_access_key.amplify_s3_user.id
    S3_SECRET_ACCESS_KEY     = aws_iam_access_key.amplify_s3_user.secret
    # Micro-CRM Integration
    MICRO_CRM_API_URL        = var.micro_crm_api_url
    MICRO_CRM_API_KEY        = var.micro_crm_api_key
  }
}

# -----------------------------------------------------------------------------
# Custom Domain (picklellama.studio)
# -----------------------------------------------------------------------------
# NOTE: Commented out - domain is currently associated with live site.
# Uncomment when ready to migrate domain to this new Amplify app.
# -----------------------------------------------------------------------------

# resource "aws_amplify_domain_association" "main" {
#   app_id      = aws_amplify_app.website.id
#   domain_name = var.app_domain
#
#   # Wait for certificate validation
#   wait_for_verification = true
#
#   # Root domain
#   sub_domain {
#     branch_name = aws_amplify_branch.main.branch_name
#     prefix      = ""
#   }
#
#   # www subdomain
#   sub_domain {
#     branch_name = aws_amplify_branch.main.branch_name
#     prefix      = "www"
#   }
# }
