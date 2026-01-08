# -----------------------------------------------------------------------------
# Database Password Generation & Storage
# -----------------------------------------------------------------------------

resource "random_password" "db_password" {
  length           = 32
  special          = true
  override_special = "!#$%&*()-_=+[]{}<>:?"  # Allowed special chars for RDS
}

resource "aws_secretsmanager_secret" "db_password" {
  name        = "${var.project_name}/database/password"
  description = "RDS PostgreSQL master password for ${var.project_name}"

  tags = {
    Name = "${var.project_name}-db-password"
  }
}

resource "aws_secretsmanager_secret_version" "db_password" {
  secret_id = aws_secretsmanager_secret.db_password.id
  secret_string = jsonencode({
    username = var.db_username
    password = random_password.db_password.result
    host     = aws_db_instance.main.address
    port     = aws_db_instance.main.port
    dbname   = aws_db_instance.main.db_name
  })
}

# -----------------------------------------------------------------------------
# IAM Policy for Application to Read Secret
# -----------------------------------------------------------------------------

resource "aws_iam_policy" "read_db_secret" {
  name        = "${var.project_name}-read-db-secret"
  description = "Policy for application to read database credentials from Secrets Manager"

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Sid    = "ReadDBSecret"
        Effect = "Allow"
        Action = [
          "secretsmanager:GetSecretValue"
        ]
        Resource = aws_secretsmanager_secret.db_password.arn
      }
    ]
  })
}
