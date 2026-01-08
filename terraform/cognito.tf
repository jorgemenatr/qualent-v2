# -----------------------------------------------------------------------------
# Cognito User Pool
# -----------------------------------------------------------------------------

resource "aws_cognito_user_pool" "main" {
  name = "${var.project_name}-users"

  # Username configuration
  username_attributes      = ["email"]
  auto_verified_attributes = ["email"]

  # Password policy
  password_policy {
    minimum_length                   = 8
    require_lowercase                = true
    require_numbers                  = true
    require_symbols                  = false
    require_uppercase                = true
    temporary_password_validity_days = 7
  }

  # Account recovery
  account_recovery_setting {
    recovery_mechanism {
      name     = "verified_email"
      priority = 1
    }
  }

  # User attributes
  schema {
    name                = "email"
    attribute_data_type = "String"
    required            = true
    mutable             = true

    string_attribute_constraints {
      min_length = 5
      max_length = 256
    }
  }

  schema {
    name                = "name"
    attribute_data_type = "String"
    required            = false
    mutable             = true

    string_attribute_constraints {
      min_length = 1
      max_length = 256
    }
  }

  # Email configuration (using Cognito default, upgrade to SES later if needed)
  email_configuration {
    email_sending_account = "COGNITO_DEFAULT"
  }

  # MFA (optional, off by default)
  mfa_configuration = "OFF"

  # Verification message
  verification_message_template {
    default_email_option = "CONFIRM_WITH_LINK"
  }

  # User pool add-ons
  user_pool_add_ons {
    advanced_security_mode = "OFF"
  }

  tags = {
    Name = "${var.project_name}-user-pool"
  }
}

# -----------------------------------------------------------------------------
# Google Identity Provider
# -----------------------------------------------------------------------------

resource "aws_cognito_identity_provider" "google" {
  user_pool_id  = aws_cognito_user_pool.main.id
  provider_name = "Google"
  provider_type = "Google"

  provider_details = {
    client_id        = var.google_client_id
    client_secret    = var.google_client_secret
    authorize_scopes = "openid email profile"
  }

  attribute_mapping = {
    email    = "email"
    name     = "name"
    username = "sub"
  }
}

# -----------------------------------------------------------------------------
# User Pool Domain
# -----------------------------------------------------------------------------

resource "random_string" "cognito_domain_suffix" {
  length  = 8
  special = false
  upper   = false
}

resource "aws_cognito_user_pool_domain" "main" {
  domain       = "${var.project_name}-${random_string.cognito_domain_suffix.result}"
  user_pool_id = aws_cognito_user_pool.main.id
}

# -----------------------------------------------------------------------------
# App Client
# -----------------------------------------------------------------------------

resource "aws_cognito_user_pool_client" "web" {
  name         = "${var.project_name}-web-client"
  user_pool_id = aws_cognito_user_pool.main.id

  # Client configuration
  generate_secret                      = false
  prevent_user_existence_errors        = "ENABLED"
  enable_token_revocation              = true
  enable_propagate_additional_user_context_data = false

  # OAuth configuration
  allowed_oauth_flows                  = ["code"]
  allowed_oauth_flows_user_pool_client = true
  allowed_oauth_scopes                 = ["email", "openid", "profile"]
  supported_identity_providers         = ["Google", "COGNITO"]
  callback_urls                        = var.cognito_callback_urls
  logout_urls                          = var.cognito_logout_urls

  # Token validity
  access_token_validity  = 1   # hours
  id_token_validity      = 1   # hours
  refresh_token_validity = 30  # days

  token_validity_units {
    access_token  = "hours"
    id_token      = "hours"
    refresh_token = "days"
  }

  # Read/write attributes
  read_attributes = [
    "email",
    "email_verified",
    "name",
    "profile",
    "updated_at"
  ]

  write_attributes = [
    "email",
    "name",
    "profile",
    "updated_at"
  ]

  # Explicit auth flows
  explicit_auth_flows = [
    "ALLOW_REFRESH_TOKEN_AUTH",
    "ALLOW_USER_SRP_AUTH"
  ]
}
