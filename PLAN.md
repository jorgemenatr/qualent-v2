# PickleLlama Website Implementation Plan

This document tracks the implementation progress for the PickleLlama website rebuild.

**Technical Requirements:** `/Users/johnheslop/Marketing/internal docs/website-technical-requirements.md`
**Functional Requirements:** `/Users/johnheslop/Marketing/internal docs/website-functional-requirements.md`
**Strategy Document:** `/Users/johnheslop/Marketing/internal docs/website-strategy.md`

---

## Phase 1: AWS Infrastructure (Terraform)

### Prerequisites
- [ ] AWS CLI configured with appropriate credentials
- [ ] Terraform installed (v1.0+)
- [ ] Google Cloud Console access for OAuth setup

### Terraform State Backend
- [ ] Run bootstrap: `cd terraform/bootstrap && terraform init && terraform apply`
  - Creates S3 bucket: `picklellama-terraform-state`
  - Creates DynamoDB table: `terraform-locks` (for state locking)

### Google OAuth Setup
- [ ] Create project in Google Cloud Console
- [ ] Configure OAuth consent screen
- [ ] Create OAuth 2.0 credentials (Web application)
- [ ] Note Client ID and Client Secret

### Terraform Deployment
- [x] Create `/terraform` directory with all .tf files
- [ ] Create `terraform.tfvars` with secrets (git-ignored)
- [ ] Run `terraform init`
- [ ] Run `terraform plan` and review
- [ ] Run `terraform apply`
- [ ] Save outputs for environment variables

### Post-Terraform DNS Setup
- [ ] Add SES DKIM CNAME records to Route 53
- [ ] Add SES verification TXT record to Route 53
- [ ] Verify SES domain in AWS Console

### Amplify Setup (Manual)
- [ ] Create Amplify app in AWS Console
- [ ] Connect to GitHub repository
- [ ] Set platform to WEB_COMPUTE
- [ ] Configure build settings (amplify.yml)
- [ ] Add environment variables from Terraform outputs
- [ ] Set up branch deployments (main → prod, develop → staging)

**Phase 1 Complete:** [ ]

---

## Phase 2: Project Foundation

### Next.js Project Setup
- [ ] Initialize Next.js 15.5 with TypeScript: `pnpm create next-app`
- [ ] Configure `next.config.js` for Amplify
- [ ] Set up path aliases in `tsconfig.json`
- [ ] Create `.env.local` from Terraform outputs
- [ ] Create `.env.example` (without secrets)

### Styling & Components
- [ ] Install and configure Tailwind CSS
- [ ] Install shadcn/ui: `pnpm dlx shadcn@latest init`
- [ ] Add core shadcn components (button, card, input, etc.)
- [ ] Review existing picklellama.studio for design tokens
- [ ] Create `/styles/globals.css` with design system variables
- [ ] Create consistent component variants

### Database Setup
- [ ] Install Prisma: `pnpm add prisma @prisma/client`
- [ ] Initialize Prisma: `pnpm prisma init`
- [ ] Create schema from tech requirements
- [ ] Run initial migration: `pnpm prisma migrate dev`
- [ ] Generate Prisma client
- [ ] Create `/lib/db.ts` for database connection

### Authentication Setup
- [ ] Install Amplify: `pnpm add aws-amplify`
- [ ] Install JWT verifier: `pnpm add aws-jwt-verify`
- [ ] Create `/lib/auth/config.ts` (Amplify configuration)
- [ ] Create `/lib/auth/client.ts` (client-side auth functions)
- [ ] Create `/lib/auth/server.ts` (server-side token verification)
- [ ] Create auth middleware
- [ ] Create login page with Cognito redirect
- [ ] Create auth callback handler (`/api/auth/callback`)
- [ ] Test Google SSO flow end-to-end

### Content Layer Setup
- [ ] Install Contentlayer: `pnpm add contentlayer next-contentlayer`
- [ ] Create `contentlayer.config.ts`
- [ ] Define Report document type
- [ ] Define CaseStudy document type
- [ ] Define Insight document type
- [ ] Update `next.config.js` for Contentlayer

### Global Components
- [ ] Create `<Header />` component with navigation
- [ ] Create `<Footer />` component
- [ ] Create `<Layout />` wrapper component
- [ ] Create `<Container />` for consistent max-width
- [ ] Create `<Logo />` component (use logo from internal docs)
- [ ] Create `<Button />` variants (primary, secondary, ghost)
- [ ] Create `<Card />` component
- [ ] Create `<SEO />` head component

### Core Pages (Static)
- [ ] Build homepage (`/`)
- [ ] Build about page (`/about`) - with placeholder photos
- [ ] Build talk/contact page (`/talk`) - with Cal.com embed
- [ ] Build privacy policy page (`/privacy`) - placeholder content
- [ ] Build terms of service page (`/terms`) - placeholder content

### Services Pages
- [ ] Build services landing page (`/services`)
- [ ] Build PIaaS page (`/services/problem-identification`)
- [ ] Build Implementation page (`/services/implementation`)
- [ ] Build Ongoing Partnership page (`/services/partnership`)

### Verify Deployment
- [ ] Push to GitHub
- [ ] Verify Amplify build succeeds
- [ ] Test deployed site
- [ ] Verify environment variables are working

**Phase 2 Complete:** [ ]

---

## Phase 3: Content Library

### S3 Structure Setup
- [ ] Create folder structure in S3 bucket:
  - `/reports/pdfs/`
  - `/reports/audio/`
  - `/reports/covers/`
  - `/case-studies/images/`
- [ ] Upload report PDFs
- [ ] Upload report cover images

### Report Content Migration
- [ ] Create MDX files for each report in `/content/reports/`:
  - [ ] `selecting-the-right-problems.mdx` (FIVES)
  - [ ] `pilot-to-production-gap.mdx`
  - [ ] `requirements-problem.mdx`
  - [ ] `process-frameworks.mdx`
  - [ ] `build-buy-or-both.mdx`
  - [ ] `implementation-patterns.mdx`
  - [ ] `low-code-selection.mdx`
  - [ ] `infrastructure-decisions.mdx`
  - [ ] `data-readiness.mdx`
  - [ ] `ai-fundamentals.mdx`

### Report Pages
- [ ] Build `/learn` listing page (Everything We Know)
- [ ] Build individual report page template (`/learn/[slug]`)
- [ ] Implement report summary (public) vs full PDF (gated)
- [ ] Style report pages with proper typography

### PDF Download Gating
- [ ] Create `/api/contacts` endpoint (create contact)
- [ ] Create `/api/downloads/pdf` endpoint (generate presigned URL)
- [ ] Create `<PDFGateModal />` component (email capture form)
- [ ] Implement download flow with contact capture
- [ ] Store download events in database

### Email Setup
- [ ] Create `/lib/email.ts` for SES integration
- [ ] Create email template: PDF download confirmation
- [ ] Test email sending

**Phase 3 Complete:** [ ]

---

## Phase 4: Thunk Box

### Thunk Box Landing
- [ ] Build `/thunkbox` landing page
- [ ] Create personalized welcome message component
- [ ] Add navigation to Thunk Box sub-pages

### Audio Content
- [ ] Generate audio files with ElevenLabs (manual process)
- [ ] Upload audio files to S3 (`/reports/audio/`)
- [ ] Create `<AudioPlayer />` component
- [ ] Build `/thunkbox/audio` page with audio library
- [ ] Implement audio playback tracking

### Thunk Box Request Form
- [ ] Create `/api/thunkbox/request` endpoint
- [ ] Build request form component
- [ ] Create confirmation email template
- [ ] Build `/thunkbox/request` page

**Phase 4 Complete:** [ ]

---

## Phase 5: AI Chat

### Gemini File Search Setup
- [ ] Create Google AI API key
- [ ] Create `/scripts/setup-gemini-store.ts`
- [ ] Run script to create File Search store
- [ ] Upload all report PDFs to Gemini store
- [ ] Save store name to environment variables

### Chat API
- [ ] Install Google GenAI SDK: `pnpm add @google/genai`
- [ ] Install Anthropic SDK: `pnpm add @anthropic-ai/sdk`
- [ ] Install Vercel AI SDK: `pnpm add ai`
- [ ] Create `/lib/rag.ts` (Gemini retrieval function)
- [ ] Create `/api/chat/route.ts` (hybrid chat endpoint)
- [ ] Implement streaming responses
- [ ] Add rate limiting with Upstash

### Chat UI
- [ ] Create `<ChatInterface />` component
- [ ] Create `<ChatMessage />` component (with citations)
- [ ] Create `<ChatInput />` component
- [ ] Implement streaming message display
- [ ] Add loading states
- [ ] Build `/thunkbox/ask` page

### Testing & Optimization
- [ ] Test chat with various queries
- [ ] Monitor response times
- [ ] Verify stays under 30s Lambda limit
- [ ] Test citation display

**Phase 5 Complete:** [ ]

---

## Phase 6: Tools Platform

### Authentication UI
- [ ] Build `/login` page with Google SSO button
- [ ] Build `/signup` page (redirects to Cognito)
- [ ] Create `<AuthGuard />` component for protected routes
- [ ] Build `/account` dashboard page

### Tool Infrastructure
- [ ] Create `/api/tools/saves` endpoints (CRUD)
- [ ] Create `<ToolLayout />` wrapper component
- [ ] Create `<ToolSidebar />` for AI assistance
- [ ] Create PDF export utility (`/lib/pdf-export.ts`)

### FIVES Worksheet Tool
- [ ] Build `/tools/fives` page
- [ ] Create FIVES form components
- [ ] Implement scoring display (visual, not prescriptive)
- [ ] Add AI side panel for reasoning assistance
- [ ] Implement save/load functionality
- [ ] Implement PDF export

### Build vs Buy Worksheet Tool
- [ ] Build `/tools/build-vs-buy` page
- [ ] Create comparison matrix components
- [ ] Add AI side panel
- [ ] Implement save/load functionality
- [ ] Implement PDF export

### Problem Prioritization Worksheet Tool
- [ ] Build `/tools/problem-prioritization` page
- [ ] Create prioritization matrix components
- [ ] Add AI side panel
- [ ] Implement save/load functionality
- [ ] Implement PDF export

### Account Dashboard
- [ ] Display saved tool sessions
- [ ] Allow resuming/editing saved tools
- [ ] Allow deleting saved tools
- [ ] Show recent activity

**Phase 6 Complete:** [ ]

---

## Phase 7: Proof (Case Studies)

### Case Study Content
- [ ] Migrate existing case studies from current site
- [ ] Create MDX files in `/content/case-studies/`
- [ ] Upload case study images to S3

### Case Study Pages
- [ ] Build `/proof` listing page
- [ ] Build individual case study template (`/proof/[slug]`)
- [ ] Add related reports/tools links

**Phase 7 Complete:** [ ]

---

## Phase 8: Polish & Launch

### Analytics
- [ ] Set up CloudWatch dashboards
- [ ] Implement custom event tracking
- [ ] Track key metrics:
  - [ ] PDF downloads
  - [ ] Tool usage
  - [ ] Chat interactions
  - [ ] Meeting bookings

### Error Monitoring
- [ ] Install Sentry: `pnpm add @sentry/nextjs`
- [ ] Configure Sentry for client and server
- [ ] Set up error alerts

### Performance
- [ ] Run Lighthouse audits
- [ ] Optimize images (next/image)
- [ ] Verify Core Web Vitals targets
- [ ] Test on mobile devices

### SEO
- [ ] Add meta tags to all pages
- [ ] Create sitemap.xml
- [ ] Create robots.txt
- [ ] Add structured data (JSON-LD)
- [ ] Submit to Google Search Console

### Security Audit
- [ ] Review security headers
- [ ] Test authentication flows
- [ ] Verify API rate limiting
- [ ] Check for exposed secrets

### Insights Section
- [ ] Build `/insights` listing page (empty state)
- [ ] Build individual insight template (`/insights/[slug]`)
- [ ] Ready for future content

### Final Review
- [ ] Cross-browser testing
- [ ] Mobile responsiveness check
- [ ] Content review
- [ ] Link verification
- [ ] 404 page

**Phase 8 Complete:** [ ]

---

## Launch Checklist

- [ ] All phases complete
- [ ] Staging environment tested
- [ ] DNS configured for production
- [ ] SSL certificate verified
- [ ] Monitoring in place
- [ ] Backup strategy confirmed
- [ ] Team trained on CMS (if applicable)
- [ ] Launch!

---

## Notes & Decisions Log

Use this section to track important decisions made during implementation:

| Date | Decision | Rationale |
|------|----------|-----------|
| 2025-12-29 | Use Gemini File Search + Claude hybrid | Managed RAG, no vector DB maintenance |
| 2025-12-29 | Static audio files (ElevenLabs manual) | Simpler than API integration |
| 2025-12-29 | AWS Cognito + Google SSO | Easy signup, all-AWS stack |
| 2025-12-29 | Tools as decision SUPPORT | Users make final decisions, not the tool |
| 2025-12-29 | Accept 30s Lambda limit initially | Simplicity over flexibility, upgrade path documented |

---

## Resources

- [Next.js 15 Docs](https://nextjs.org/docs)
- [AWS Amplify Hosting Docs](https://docs.aws.amazon.com/amplify/latest/userguide/)
- [Prisma Docs](https://www.prisma.io/docs)
- [shadcn/ui Docs](https://ui.shadcn.com/)
- [Gemini File Search Docs](https://ai.google.dev/gemini-api/docs/file-search)
- [Vercel AI SDK Docs](https://sdk.vercel.ai/docs)
