# -----------------------------------------------------------------------------
# Database Outputs
# -----------------------------------------------------------------------------

output "database_endpoint" {
  description = "RDS PostgreSQL endpoint"
  value       = aws_db_instance.main.endpoint
}

output "database_host" {
  description = "RDS PostgreSQL host (without port)"
  value       = aws_db_instance.main.address
}

output "database_port" {
  description = "RDS PostgreSQL port"
  value       = aws_db_instance.main.port
}

output "database_name" {
  description = "Database name"
  value       = aws_db_instance.main.db_name
}

output "database_url" {
  description = "Full database connection URL for Prisma"
  value       = "postgresql://${var.db_username}:${random_password.db_password.result}@${aws_db_instance.main.endpoint}/${aws_db_instance.main.db_name}?schema=public"
  sensitive   = true
}

output "database_secret_arn" {
  description = "ARN of the Secrets Manager secret containing DB credentials"
  value       = aws_secretsmanager_secret.db_password.arn
}

# -----------------------------------------------------------------------------
# Cognito Outputs
# -----------------------------------------------------------------------------

output "cognito_user_pool_id" {
  description = "Cognito User Pool ID"
  value       = aws_cognito_user_pool.main.id
}

output "cognito_user_pool_arn" {
  description = "Cognito User Pool ARN"
  value       = aws_cognito_user_pool.main.arn
}

output "cognito_client_id" {
  description = "Cognito App Client ID"
  value       = aws_cognito_user_pool_client.web.id
}

output "cognito_domain" {
  description = "Cognito hosted UI domain"
  value       = "${aws_cognito_user_pool_domain.main.domain}.auth.${var.aws_region}.amazoncognito.com"
}

output "cognito_login_url" {
  description = "Cognito hosted UI login URL"
  value       = "https://${aws_cognito_user_pool_domain.main.domain}.auth.${var.aws_region}.amazoncognito.com/login?client_id=${aws_cognito_user_pool_client.web.id}&response_type=code&scope=email+openid+profile&redirect_uri=${urlencode(var.cognito_callback_urls[0])}"
}

output "cognito_issuer" {
  description = "Cognito token issuer URL (for JWT verification)"
  value       = "https://cognito-idp.${var.aws_region}.amazonaws.com/${aws_cognito_user_pool.main.id}"
}

# -----------------------------------------------------------------------------
# S3 Outputs
# -----------------------------------------------------------------------------

output "s3_bucket_name" {
  description = "S3 content bucket name"
  value       = aws_s3_bucket.content.id
}

output "s3_bucket_arn" {
  description = "S3 content bucket ARN"
  value       = aws_s3_bucket.content.arn
}

output "s3_bucket_region" {
  description = "S3 bucket region"
  value       = aws_s3_bucket.content.region
}

# -----------------------------------------------------------------------------
# SES Outputs
# -----------------------------------------------------------------------------

output "ses_domain" {
  description = "SES verified domain"
  value       = aws_ses_domain_identity.main.domain
}

output "ses_from_email" {
  description = "SES from email address"
  value       = var.ses_from_email
}

# -----------------------------------------------------------------------------
# VPC Outputs (for Amplify if needed)
# -----------------------------------------------------------------------------

output "vpc_id" {
  description = "VPC ID (using default VPC)"
  value       = data.aws_vpc.default.id
}

output "subnet_ids" {
  description = "Subnet IDs in default VPC"
  value       = data.aws_subnets.default.ids
}

output "lambda_security_group_id" {
  description = "Security group ID for Lambda functions"
  value       = aws_security_group.lambda.id
}

# -----------------------------------------------------------------------------
# Amplify Outputs
# -----------------------------------------------------------------------------

output "amplify_app_id" {
  description = "Amplify App ID"
  value       = aws_amplify_app.website.id
}

output "amplify_app_arn" {
  description = "Amplify App ARN"
  value       = aws_amplify_app.website.arn
}

output "amplify_default_domain" {
  description = "Amplify default domain"
  value       = aws_amplify_app.website.default_domain
}

output "amplify_production_url" {
  description = "Production branch URL"
  value       = "https://${aws_amplify_branch.main.branch_name}.${aws_amplify_app.website.default_domain}"
}

# Commented out - domain association is disabled until migration
# output "amplify_custom_domain" {
#   description = "Custom domain URL"
#   value       = "https://${var.app_domain}"
# }

# -----------------------------------------------------------------------------
# Environment Variables Export
# -----------------------------------------------------------------------------

output "env_file_content" {
  description = "Content for .env.local file (contains secrets - handle carefully)"
  sensitive   = true
  value       = <<-EOT
    # Database
    DATABASE_URL="postgresql://${var.db_username}:${urlencode(random_password.db_password.result)}@${aws_db_instance.main.endpoint}/${aws_db_instance.main.db_name}?schema=public"
    DATABASE_SECRET_ARN="${aws_secretsmanager_secret.db_password.arn}"

    # AWS Cognito
    NEXT_PUBLIC_COGNITO_USER_POOL_ID="${aws_cognito_user_pool.main.id}"
    NEXT_PUBLIC_COGNITO_CLIENT_ID="${aws_cognito_user_pool_client.web.id}"
    NEXT_PUBLIC_COGNITO_DOMAIN="${aws_cognito_user_pool_domain.main.domain}.auth.${var.aws_region}.amazoncognito.com"
    COGNITO_ISSUER="https://cognito-idp.${var.aws_region}.amazonaws.com/${aws_cognito_user_pool.main.id}"

    # S3 (Note: Can't use AWS_ prefix in Amplify)
    S3_BUCKET_NAME="${aws_s3_bucket.content.id}"

    # SES
    SES_FROM_EMAIL="${var.ses_from_email}"

    # App
    NEXT_PUBLIC_APP_URL="https://${var.app_domain}"
  EOT
}
