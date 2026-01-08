# PickleLlama Website

Marketing website for PickleLlama - AI/automation consulting for mid-market companies.

## Tech Stack

- **Framework:** Next.js 15.5 (App Router)
- **Hosting:** AWS Amplify
- **Database:** AWS RDS PostgreSQL
- **Auth:** AWS Cognito (Google SSO)
- **Storage:** Amazon S3
- **Email:** AWS SES
- **RAG:** Gemini File Search + Claude
- **Styling:** Tailwind CSS + shadcn/ui

## Getting Started

### Prerequisites

- Node.js 20+
- pnpm
- AWS CLI configured
- Terraform 1.0+

### Infrastructure Setup

```bash
cd terraform
terraform init
terraform plan -var-file="terraform.tfvars"
terraform apply -var-file="terraform.tfvars"
```

### Local Development

```bash
# Install dependencies
pnpm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with values from Terraform outputs

# Run database migrations
pnpm prisma migrate dev

# Start development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000)

## Project Structure

```
/picklellama-website
├── /app                    # Next.js App Router
├── /components             # React components
├── /content                # MDX content (reports, case studies)
├── /lib                    # Utilities and services
├── /prisma                 # Database schema and migrations
├── /public                 # Static assets
├── /scripts                # Setup and utility scripts
├── /styles                 # Global styles
├── /terraform              # Infrastructure as code
└── /types                  # TypeScript types
```

## Documentation

- [Implementation Plan](./PLAN.md)
- [Technical Requirements](../Marketing/internal%20docs/website-technical-requirements.md)
- [Functional Requirements](../Marketing/internal%20docs/website-functional-requirements.md)

## Deployment

Deployments are handled automatically via AWS Amplify:

- `main` branch → Production
- `develop` branch → Staging
- Pull requests → Preview environments
