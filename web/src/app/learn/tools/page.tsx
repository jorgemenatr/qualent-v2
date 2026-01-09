import Link from "next/link";
import { Metadata } from "next";
import {
  ArrowRight,
  Target,
  Scale,
  CheckCircle,
  Sparkles,
  MessageSquare,
  Headphones,
  ClipboardList,
  Send,
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
  title: "Interactive Tools",
  description:
    "Free assessment tools to help you evaluate automation opportunities and make better technology decisions.",
};

const tools = [
  {
    title: "FIVES Framework Assessment",
    description:
      "Evaluate your automation opportunities using five critical criteria: Frequency, Impact, Variability, Existing Data, and Stakeholder Readiness.",
    href: "/learn/tools/fives",
    icon: Target,
    features: [
      "Score opportunities from 1-5 on each criterion",
      "Compare multiple opportunities side by side",
      "Get clear prioritization recommendations",
      "Export results to CSV for sharing",
    ],
    color: "bg-blue-500/10 text-blue-600",
  },
  {
    title: "Build vs Buy Assessment",
    description:
      "Determine whether to build custom solutions, buy off-the-shelf software, or take a hybrid approach for your technology needs.",
    href: "/learn/tools/build-vs-buy",
    icon: Scale,
    features: [
      "Evaluate strategic importance and market maturity",
      "Assess change velocity and integration complexity",
      "Get build, buy, or hybrid recommendations",
      "Document reasoning for stakeholder discussions",
    ],
    color: "bg-purple-500/10 text-purple-600",
  },
];

const benefits = [
  {
    title: "Data-Driven Decisions",
    description:
      "Move beyond gut feelings with structured frameworks that capture the factors that matter.",
  },
  {
    title: "Stakeholder Alignment",
    description:
      "Create shared understanding by documenting your reasoning and scoring criteria.",
  },
  {
    title: "Save Your Work",
    description:
      "Sign in to save your assessments and come back to them anytime.",
  },
  {
    title: "Export & Share",
    description:
      "Download your results as CSV to share with your team or include in presentations.",
  },
];

export default function ToolsPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative py-16 md:py-20 min-h-[40vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/8 via-transparent to-transparent" />
          <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[400px] rounded-full bg-primary/10 blur-3xl" />
        </div>
        <PageHeroBackground />

        <Container className="relative">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
              <Sparkles className="mr-2 h-4 w-4" />
              Free Assessment Tools
            </div>
            <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
              Make Better Technology Decisions
            </h1>
            <p className="mt-6 text-lg text-muted-foreground">
              Interactive tools to help you evaluate automation opportunities,
              prioritize investments, and align your team on technology strategy.
            </p>
          </div>
        </Container>
      </section>

      {/* Tools Grid */}
      <section className="border-t border-border py-16 md:py-20">
        <Container>
          <div className="grid gap-8 lg:grid-cols-2">
            {tools.map((tool) => (
              <Card key={tool.title} className="flex flex-col">
                <CardHeader>
                  <div className={`flex h-12 w-12 items-center justify-center rounded-lg ${tool.color}`}>
                    <tool.icon className="h-6 w-6" />
                  </div>
                  <CardTitle className="mt-4 text-xl">{tool.title}</CardTitle>
                  <CardDescription className="text-base">
                    {tool.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                  <ul className="space-y-2">
                    {tool.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 mt-0.5 text-primary flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className="mt-6 w-full" asChild>
                    <Link href={tool.href}>
                      Start Assessment <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Additional Tools */}
      <section className="border-t border-border bg-muted/30 py-16 md:py-20">
        <Container>
          <div className="mx-auto max-w-2xl text-center mb-10">
            <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
              More Ways to Learn
            </h2>
            <p className="mt-3 text-muted-foreground">
              Additional resources to help you on your AI and automation journey.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <Card className="group hover:border-primary/50 transition-colors">
              <CardContent className="pt-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 mb-3">
                  <MessageSquare className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-medium">Ask Anything</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Chat with our AI about automation, AI strategy, and technology decisions.
                </p>
                <Button variant="outline" size="sm" className="mt-4 w-full" asChild>
                  <Link href="/thunkbox/ask">
                    Start Chat <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="group hover:border-primary/50 transition-colors">
              <CardContent className="pt-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 mb-3">
                  <Headphones className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-medium">Audio Library</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Listen to our reports in audio format while on the go.
                </p>
                <Button variant="outline" size="sm" className="mt-4 w-full" asChild>
                  <Link href="/thunkbox/audio">
                    Browse Audio <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="group hover:border-primary/50 transition-colors">
              <CardContent className="pt-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 mb-3">
                  <ClipboardList className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-medium">Pre-Meeting Worksheet</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Prepare for your diagnostic call by identifying top problems.
                </p>
                <Button variant="outline" size="sm" className="mt-4 w-full" asChild>
                  <Link href="/thunkbox/worksheet">
                    Start Worksheet <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="group hover:border-primary/50 transition-colors">
              <CardContent className="pt-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 mb-3">
                  <Send className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-medium">Submit a Request</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Have a specific question? Send us a detailed request.
                </p>
                <Button variant="outline" size="sm" className="mt-4 w-full" asChild>
                  <Link href="/thunkbox/request">
                    Submit Request <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </Container>
      </section>

      {/* Benefits */}
      <section className="border-t border-border bg-muted/50 py-16 md:py-20">
        <Container>
          <div className="mx-auto max-w-2xl text-center mb-12">
            <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
              Why Use These Tools?
            </h2>
            <p className="mt-3 text-muted-foreground">
              Built from years of helping mid-market companies navigate technology decisions.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map((benefit) => (
              <div
                key={benefit.title}
                className="rounded-lg border border-border bg-card p-5"
              >
                <h3 className="font-semibold">{benefit.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* How It Works */}
      <section className="border-t border-border py-16 md:py-20">
        <Container>
          <div className="mx-auto max-w-2xl text-center mb-12">
            <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
              How It Works
            </h2>
          </div>

          <div className="mx-auto max-w-3xl">
            <div className="space-y-8">
              {[
                {
                  step: "1",
                  title: "Choose Your Assessment",
                  description:
                    "Select the tool that matches your decision: FIVES for automation opportunities, Build vs Buy for technology choices.",
                },
                {
                  step: "2",
                  title: "Answer the Questions",
                  description:
                    "Work through each criterion, scoring based on your specific situation. Add notes to document your reasoning.",
                },
                {
                  step: "3",
                  title: "Review Recommendations",
                  description:
                    "See clear recommendations based on your scores. Compare multiple options side by side.",
                },
                {
                  step: "4",
                  title: "Save & Share",
                  description:
                    "Sign in to save your work, or export to CSV to share with stakeholders.",
                },
              ].map((item) => (
                <div key={item.step} className="flex gap-4">
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">
                    {item.step}
                  </div>
                  <div>
                    <h3 className="font-semibold">{item.title}</h3>
                    <p className="mt-1 text-muted-foreground">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="border-t border-border bg-primary/5 py-16 md:py-20">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
              Need Help With Your Assessment?
            </h2>
            <p className="mt-4 text-muted-foreground">
              Book a 17-minute diagnostic call and we&apos;ll walk through your
              specific situation together.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button size="lg" asChild>
                <Link href="/talk">
                  Book a Call <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/learn">
                  Read Our Reports
                </Link>
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
