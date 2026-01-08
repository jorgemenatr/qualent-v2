import Link from "next/link";
import { Metadata } from "next";
import {
  ArrowRight,
  FileText,
  Target,
  Calculator,
  CheckCircle,
  Shield,
  ClipboardList,
} from "lucide-react";
import { Container } from "@/components/layout";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PageHeroBackground } from "@/components/page-hero-background";

export const metadata: Metadata = {
  title: "Thunk Box",
  description:
    "Everything we know about solving problems for 50% of the annual cost. Research, frameworks, and tools for mid-market leaders.",
};

const reports = [
  {
    title: "The Pilot-to-Production Gap",
    description: "Why 80% of AI projects fail to reach production—and how to be in the 20% that succeed.",
  },
  {
    title: "Selecting the Right Problems: The FIVES Framework",
    description: "A practical framework for evaluating which automation opportunities are worth pursuing.",
  },
  {
    title: "The ROI of AI Automation",
    description: "Learn how to calculate and maximize the return on investment from AI initiatives.",
  },
  {
    title: "Build, Buy, or Both",
    description: "Practitioner decision frameworks for determining when to build custom vs. buy off-the-shelf.",
  },
  {
    title: "AI & LLM Fundamentals for Business Leaders",
    description: "Demystifying AI: what models do, what they cost, and when they're appropriate.",
  },
  {
    title: "Data Readiness in the LLM Era",
    description: "Challenging the outdated 'clean data first' narrative with modern approaches.",
  },
];

export default function ThunkBoxPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative py-16 md:py-20 min-h-[40vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/8 via-transparent to-transparent" />
          <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[400px] rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute bottom-0 right-0 w-[300px] h-[250px] rounded-full bg-[rgba(132,204,22,0.08)] blur-3xl" />
        </div>
        <PageHeroBackground />

        <Container className="relative">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
              The AI Readiness Collection
            </div>
            <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
              The Thunk Box
            </h1>
            <p className="mt-6 text-lg text-muted-foreground">
              Everything we know about solving <span className="text-foreground font-medium">problems for 50% of the annual cost</span>.
              Research reports, frameworks, and tools for mid-market leaders navigating AI and automation.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button size="lg" asChild>
                <Link href="#book-diagnostic">
                  Book 17-Minute Diagnostic <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/thunkbox/worksheet">
                  Complete Pre-Meeting Worksheet <ClipboardList className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* The Offer */}
      <section className="border-t border-border bg-primary/5 py-16 md:py-20">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center justify-center h-14 w-14 rounded-full bg-primary/10 mb-5">
              <Target className="h-7 w-7 text-primary" />
            </div>
            <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
              The Offer
            </h2>
            <p className="mt-4 text-xl md:text-2xl text-foreground">
              A detailed executive-level report on how to eliminate a business problem for less than 50% of its annual cost.
            </p>
            <p className="mt-4 text-muted-foreground">
              If the math doesn&apos;t work, we don&apos;t proceed.
            </p>
          </div>
        </Container>
      </section>

      {/* The 5 Bullets */}
      <section className="border-t border-border py-16 md:py-20">
        <Container>
          <div className="mx-auto max-w-2xl text-center mb-10">
            <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
              Why This Works Now
            </h2>
            <p className="mt-3 text-muted-foreground">
              The math has changed. Here&apos;s what that means for you.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "What We Do",
                text: "Elite Software Architects + AI leverage = Solutions in weeks at ~10x lower cost.",
              },
              {
                title: "Why Now",
                text: "The math flipped. Fixing problems now costs less than tolerating them.",
              },
              {
                title: "The Hidden Cost",
                text: "Manual work, workarounds, and bottlenecks quietly drain money and growth.",
              },
              {
                title: "What This Means",
                text: "Every manual workaround is a mistake waiting to happen. Every bottleneck is a resignation waiting to happen.",
              },
              {
                title: "The Opportunity",
                text: "Fix one bottleneck. Free up capacity. Use that capacity to fix the next one. Repeat.",
              },
              {
                title: "The Next Step",
                text: "A 17-minute call to quantify what's worth fixing.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-lg border border-border bg-card p-5"
              >
                <h3 className="font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* What's Inside */}
      <section className="border-t border-border bg-muted/50 py-16 md:py-20">
        <Container>
          <div className="mx-auto max-w-2xl text-center mb-10">
            <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
              What&apos;s Inside the Thunk Box
            </h2>
            <p className="mt-3 text-muted-foreground">
              ~150-200 pages of research, frameworks, and practical tools.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {reports.map((report) => (
              <Card key={report.title} className="flex flex-col">
                <CardHeader>
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <FileText className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle className="mt-4 text-base">{report.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-1">
                  <CardDescription>{report.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-10 text-center">
            <p className="text-sm text-muted-foreground">
              Plus: worksheets, executive summaries, and decision frameworks.
            </p>
          </div>
        </Container>
      </section>

      {/* Guarantee */}
      <section className="border-t border-border py-16 md:py-20">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center justify-center h-14 w-14 rounded-full bg-primary/10 mb-5">
              <Shield className="h-7 w-7 text-primary" />
            </div>
            <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
              Our Guarantee
            </h2>
            <p className="mt-4 text-2xl md:text-3xl font-semibold text-primary">
              50% of annual cost — or we finish for free.
            </p>
            <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
              If the math doesn&apos;t work, we&apos;ll tell you.
              <br />
              If we can&apos;t deliver, you don&apos;t pay.
            </p>
          </div>
        </Container>
      </section>

      {/* Pre-Meeting Worksheet CTA */}
      <section className="border-t border-border bg-muted/50 py-16 md:py-20">
        <Container>
          <div className="grid gap-10 md:grid-cols-2 md:items-center">
            <div>
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 mb-4">
                <ClipboardList className="h-6 w-6 text-primary" />
              </div>
              <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
                Prepare for Your Diagnostic
              </h2>
              <p className="mt-4 text-muted-foreground">
                Complete our 10-minute worksheet before your call. You&apos;ll identify your top problems,
                estimate what they&apos;re costing you, and help us ask better questions.
              </p>
              <Button className="mt-6" asChild>
                <Link href="/thunkbox/worksheet">
                  Complete Worksheet <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="rounded-lg border border-border bg-card p-6">
              <h3 className="font-semibold mb-4">What you&apos;ll cover:</h3>
              <ul className="space-y-3">
                {[
                  "Your top 3-5 operational problems",
                  "Estimated cost of each problem",
                  "What you've already tried",
                  "What success would look like",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <CheckCircle className="h-4 w-4 flex-shrink-0 text-primary" />
                    <span className="text-sm text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      {/* Booking Calendar */}
      <section id="book-diagnostic" className="border-t border-border py-16 md:py-20">
        <Container>
          <div className="mx-auto max-w-3xl text-center mb-10">
            <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
              17 Minutes to Clarity
            </h2>
            <p className="mt-4 text-muted-foreground">
              15 minutes for us to listen. 2 minutes to talk next steps.
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              Walk away with a clear picture of your top problems, what they&apos;re costing you, and whether the math works.
            </p>
          </div>

          <div className="rounded-lg border border-border bg-card/80 backdrop-blur-sm p-4 md:p-8 shadow-sm overflow-hidden">
            <iframe
              src="https://calendar.google.com/calendar/appointments/schedules/AcZssZ3W1-onS8oPLIGAhf0t7uCrUScrUMlKcEfR-UBBlnpfI_B6N6HSPX49X_skh9vnwUHEH77Kkfq8?gv=true"
              className="w-full rounded-lg"
              style={{ border: 0, minHeight: "600px" }}
              title="Book your 17-minute diagnostic with PickleLlama"
            />
          </div>

          <div className="mt-8 text-center">
            <p className="text-sm text-muted-foreground/80 italic">
              Whether we work together or not, you&apos;ll have what you need to act.
            </p>
          </div>
        </Container>
      </section>
    </>
  );
}
