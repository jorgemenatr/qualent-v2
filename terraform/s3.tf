# -----------------------------------------------------------------------------
# S3 Content Bucket
# -----------------------------------------------------------------------------

resource "aws_s3_bucket" "content" {
  bucket = var.s3_bucket_name

  tags = {
    Name = "${var.project_name}-content"
  }
}

# Block all public access
resource "aws_s3_bucket_public_access_block" "content" {
  bucket = aws_s3_bucket.content.id

  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

# Enable versioning
resource "aws_s3_bucket_versioning" "content" {
  bucket = aws_s3_bucket.content.id
  versioning_configuration {
    status = "Enabled"
  }
}

# Server-side encryption
resource "aws_s3_bucket_server_side_encryption_configuration" "content" {
  bucket = aws_s3_bucket.content.id

  rule {
    apply_server_side_encryption_by_default {
      sse_algorithm = "AES256"
    }
    bucket_key_enabled = true
  }
}

# Lifecycle rules for cost optimization
resource "aws_s3_bucket_lifecycle_configuration" "content" {
  bucket = aws_s3_bucket.content.id

  rule {
    id     = "cleanup-old-versions"
    status = "Enabled"

    filter {}

    noncurrent_version_expiration {
      noncurrent_days = 90
    }

    abort_incomplete_multipart_upload {
      days_after_initiation = 7
    }
  }
}

# CORS configuration for presigned URLs
resource "aws_s3_bucket_cors_configuration" "content" {
  bucket = aws_s3_bucket.content.id

  cors_rule {
    allowed_headers = ["*"]
    allowed_methods = ["GET", "HEAD", "PUT"]
    allowed_origins = [
      "http://localhost:3000",
      "https://picklellama.studio",
      "https://*.picklellama.studio"
    ]
    expose_headers  = ["ETag"]
    max_age_seconds = 3600
  }
}

# -----------------------------------------------------------------------------
# S3 Bucket Folder Structure (using null resources)
# Note: S3 doesn't have real folders, but we can create placeholder objects
# -----------------------------------------------------------------------------

resource "aws_s3_object" "reports_pdfs" {
  bucket  = aws_s3_bucket.content.id
  key     = "reports/pdfs/.keep"
  content = ""
}

resource "aws_s3_object" "reports_audio" {
  bucket  = aws_s3_bucket.content.id
  key     = "reports/audio/.keep"
  content = ""
}

resource "aws_s3_object" "reports_covers" {
  bucket  = aws_s3_bucket.content.id
  key     = "reports/covers/.keep"
  content = ""
}

resource "aws_s3_object" "case_studies_images" {
  bucket  = aws_s3_bucket.content.id
  key     = "case-studies/images/.keep"
  content = ""
}

# -----------------------------------------------------------------------------
# IAM Policy for Application Access
# -----------------------------------------------------------------------------

resource "aws_iam_policy" "s3_content_access" {
  name        = "${var.project_name}-s3-content-access"
  description = "Policy for application to access S3 content bucket"

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Sid    = "ListBucket"
        Effect = "Allow"
        Action = [
          "s3:ListBucket"
        ]
        Resource = aws_s3_bucket.content.arn
      },
      {
        Sid    = "ReadWriteObjects"
        Effect = "Allow"
        Action = [
          "s3:GetObject",
          "s3:PutObject",
          "s3:DeleteObject"
        ]
        Resource = "${aws_s3_bucket.content.arn}/*"
      },
      {
        Sid    = "SendEmails"
        Effect = "Allow"
        Action = [
          "ses:SendEmail",
          "ses:SendRawEmail"
        ]
        Resource = "*"
      }
    ]
  })
}

# -----------------------------------------------------------------------------
# IAM User for Amplify SSR S3 Access
# Amplify WEB_COMPUTE doesn't provide IAM credentials to Lambda functions,
# so we create a dedicated user with access keys.
# -----------------------------------------------------------------------------

resource "aws_iam_user" "amplify_s3_user" {
  name = "${var.project_name}-amplify-s3-user"
  tags = {
    Purpose = "S3 access for Amplify SSR functions"
  }
}

resource "aws_iam_user_policy_attachment" "amplify_s3_user_policy" {
  user       = aws_iam_user.amplify_s3_user.name
  policy_arn = aws_iam_policy.s3_content_access.arn
}

resource "aws_iam_access_key" "amplify_s3_user" {
  user = aws_iam_user.amplify_s3_user.name
}
