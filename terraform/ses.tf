# -----------------------------------------------------------------------------
# SES Domain Identity
# -----------------------------------------------------------------------------

resource "aws_ses_domain_identity" "main" {
  domain = var.ses_email_domain
}

# -----------------------------------------------------------------------------
# SES DKIM Configuration
# -----------------------------------------------------------------------------

resource "aws_ses_domain_dkim" "main" {
  domain = aws_ses_domain_identity.main.domain
}

# -----------------------------------------------------------------------------
# SES Email Identity (for sending from specific address)
# -----------------------------------------------------------------------------

resource "aws_ses_email_identity" "hello" {
  email = var.ses_from_email
}

# -----------------------------------------------------------------------------
# SES Configuration Set (for tracking)
# -----------------------------------------------------------------------------

resource "aws_ses_configuration_set" "main" {
  name = "${var.project_name}-emails"

  reputation_metrics_enabled = true
  sending_enabled            = true

  delivery_options {
    tls_policy = "Require"
  }
}

# -----------------------------------------------------------------------------
# IAM Policy for SES Sending
# -----------------------------------------------------------------------------

resource "aws_iam_policy" "ses_send" {
  name        = "${var.project_name}-ses-send"
  description = "Policy for application to send emails via SES"

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Sid    = "SendEmail"
        Effect = "Allow"
        Action = [
          "ses:SendEmail",
          "ses:SendRawEmail",
          "ses:SendTemplatedEmail"
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
# Output DNS Records (for manual Route 53 setup)
# Note: SES DKIM records need to be added to Route 53 manually or via separate
# module since the domain might be in a different AWS account
# -----------------------------------------------------------------------------

# These outputs will be displayed and should be added to Route 53
output "ses_verification_token" {
  description = "SES domain verification token - add as TXT record"
  value       = aws_ses_domain_identity.main.verification_token
}

output "ses_dkim_tokens" {
  description = "DKIM tokens - add as CNAME records"
  value       = aws_ses_domain_dkim.main.dkim_tokens
}

output "ses_dns_instructions" {
  description = "Instructions for DNS setup"
  value       = <<-EOT
    Add the following DNS records to Route 53:

    1. Domain Verification TXT Record:
       Name: _amazonses.${var.ses_email_domain}
       Type: TXT
       Value: ${aws_ses_domain_identity.main.verification_token}

    2. DKIM CNAME Records (add all 3):
       %{for token in aws_ses_domain_dkim.main.dkim_tokens~}
       Name: ${token}._domainkey.${var.ses_email_domain}
       Type: CNAME
       Value: ${token}.dkim.amazonses.com
       %{endfor~}

    After adding records, verify the domain in AWS SES Console.
  EOT
}
