# -----------------------------------------------------------------------------
# RDS PostgreSQL Configuration
# -----------------------------------------------------------------------------

resource "aws_db_subnet_group" "main" {
  name       = "${var.project_name}-db-subnet-group"
  subnet_ids = data.aws_subnets.default.ids

  tags = {
    Name = "${var.project_name}-db-subnet-group"
  }
}

resource "aws_db_parameter_group" "main" {
  name   = "${var.project_name}-pg-params"
  family = "postgres17"

  parameter {
    name  = "log_statement"
    value = "ddl"
  }

  parameter {
    name  = "log_min_duration_statement"
    value = "1000"
  }

  tags = {
    Name = "${var.project_name}-pg-params"
  }
}

resource "aws_db_instance" "main" {
  identifier = "${var.project_name}-db"

  # Engine configuration
  engine               = "postgres"
  engine_version       = "17"
  instance_class       = var.db_instance_class
  allocated_storage    = var.db_allocated_storage
  max_allocated_storage = 100  # Enable storage autoscaling up to 100GB

  # Database configuration
  db_name  = var.db_name
  username = var.db_username
  password = random_password.db_password.result
  port     = 5432

  # Network configuration
  db_subnet_group_name   = aws_db_subnet_group.main.name
  vpc_security_group_ids = [aws_security_group.rds.id]
  publicly_accessible    = false
  multi_az               = var.environment == "production" ? true : false

  # Parameter group
  parameter_group_name = aws_db_parameter_group.main.name

  # Backup configuration
  backup_retention_period = var.db_backup_retention_period
  backup_window          = "03:00-04:00"
  maintenance_window     = "sun:04:00-sun:05:00"

  # Performance & monitoring
  performance_insights_enabled = true
  monitoring_interval          = 60
  monitoring_role_arn         = aws_iam_role.rds_monitoring.arn

  # Encryption
  storage_encrypted = true

  # Deletion protection (enable for production)
  deletion_protection = var.environment == "production" ? true : false
  skip_final_snapshot = var.environment != "production"
  final_snapshot_identifier = var.environment == "production" ? "${var.project_name}-final-snapshot" : null

  tags = {
    Name = "${var.project_name}-db"
  }
}

# -----------------------------------------------------------------------------
# RDS Enhanced Monitoring Role
# -----------------------------------------------------------------------------

resource "aws_iam_role" "rds_monitoring" {
  name = "${var.project_name}-rds-monitoring-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Principal = {
          Service = "monitoring.rds.amazonaws.com"
        }
      }
    ]
  })

  tags = {
    Name = "${var.project_name}-rds-monitoring-role"
  }
}

resource "aws_iam_role_policy_attachment" "rds_monitoring" {
  role       = aws_iam_role.rds_monitoring.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AmazonRDSEnhancedMonitoringRole"
}
