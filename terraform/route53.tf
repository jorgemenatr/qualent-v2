# -----------------------------------------------------------------------------
# Route 53 - DNS Configuration
# -----------------------------------------------------------------------------

# Reference the existing hosted zone (assumes it already exists)
data "aws_route53_zone" "main" {
  name         = var.ses_email_domain
  private_zone = false
}

# -----------------------------------------------------------------------------
# SES Domain Verification Record
# -----------------------------------------------------------------------------

resource "aws_route53_record" "ses_verification" {
  zone_id = data.aws_route53_zone.main.zone_id
  name    = "_amazonses.${var.ses_email_domain}"
  type    = "TXT"
  ttl     = 600
  records = [aws_ses_domain_identity.main.verification_token]
}

# -----------------------------------------------------------------------------
# SES DKIM Records
# -----------------------------------------------------------------------------

resource "aws_route53_record" "ses_dkim" {
  count   = 3
  zone_id = data.aws_route53_zone.main.zone_id
  name    = "${aws_ses_domain_dkim.main.dkim_tokens[count.index]}._domainkey.${var.ses_email_domain}"
  type    = "CNAME"
  ttl     = 600
  records = ["${aws_ses_domain_dkim.main.dkim_tokens[count.index]}.dkim.amazonses.com"]
}

# -----------------------------------------------------------------------------
# SES Domain Verification (wait for DNS propagation)
# -----------------------------------------------------------------------------

resource "aws_ses_domain_identity_verification" "main" {
  domain = aws_ses_domain_identity.main.id

  depends_on = [aws_route53_record.ses_verification]
}
