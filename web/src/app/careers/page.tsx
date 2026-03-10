import Link from "next/link";
import { ArrowRight, Zap, Brain, Users, Clock } from "lucide-react";
import { Container } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { PageHeroBackground } from "@/components/page-hero-background";

export const metadata = {
  title: "Careers",
  description:
    "Join PickleLlama — work on real problems with senior engineers, AI tools, and zero corporate theater.",
};

const values = [
  {
    icon: Zap,
    title: "Ship Fast, Learn Faster",
    description:
      "We prototype in days and launch in weeks. You'll see your work in production quickly, not buried in a backlog.",
  },
  {
    icon: Brain,
    title: "AI-Native Workflow",
    description:
      "We use AI tools daily — not as a gimmick, but as a genuine force multiplier. You'll work at the frontier.",
  },
  {
    icon: Users,
    title: "Small Team, Big Impact",
    description:
      "No layers of management. Everyone here is senior, everyone ships, and everyone's opinion matters.",
  },
  {
    icon: Clock,
    title: "Outcomes Over Hours",
    description:
      "We care about what you deliver, not when you're online. Flexible schedule, async-first communication.",
  },
];

export default function CareersPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative py-16 md:py-20 min-h-[40vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/8 via-transparent to-transparent" />
          <div className="absolute -left-32 top-1/3 w-[500px] h-[400px] rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute -right-20 bottom-0 w-[300px] h-[250px] rounded-full bg-[rgba(132,204,22,0.08)] blur-3xl" />
        </div>
        <PageHeroBackground />

        <Container size="small" className="relative">
          <div className="w-12 h-1 bg-primary rounded-full mb-6" />
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
            Join PickleLlama
          </h1>
          <div className="mt-6 space-y-4 text-lg text-muted-foreground">
            <p>
              We&apos;re a small team that punches way above its weight. If you
              want to solve real problems with smart people and zero corporate
              theater, you might be a good fit.
            </p>
          </div>
        </Container>
      </section>

      {/* What It's Like */}
      <section className="border-t border-border py-20">
        <Container size="small">
          <div className="w-12 h-1 bg-primary rounded-full mb-6" />
          <h2 className="text-2xl font-bold">What It&apos;s Like Here</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {values.map((value) => (
              <div
                key={value.title}
                className="rounded-lg border border-border bg-card/80 p-6 transition-colors hover:border-primary/30"
              >
                <value.icon className="h-6 w-6 text-primary mb-3" />
                <h3 className="text-lg font-semibold">{value.title}</h3>
                <p className="mt-2 text-muted-foreground">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Who We're Looking For */}
      <section className="relative bg-muted/50 py-20 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute right-0 top-0 w-[400px] h-[300px] rounded-full bg-primary/5 blur-3xl" />
        </div>

        <Container size="small" className="relative">
          <div className="w-12 h-1 bg-primary rounded-full mb-6" />
          <h2 className="text-2xl font-bold">Who We&apos;re Looking For</h2>
          <div className="mt-6 space-y-4 text-muted-foreground">
            <p>
              We don&apos;t hire for specific roles very often — we&apos;re
              intentionally small. But when we do, we look for people who:
            </p>
            <ul className="space-y-3 ml-1">
              <li className="flex items-start gap-3">
                <ArrowRight className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                <span>
                  Have deep experience in software engineering, AI/ML, or
                  automation
                </span>
              </li>
              <li className="flex items-start gap-3">
                <ArrowRight className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                <span>
                  Can talk to clients as comfortably as they write code
                </span>
              </li>
              <li className="flex items-start gap-3">
                <ArrowRight className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                <span>
                  Prefer shipping over debating, and simplicity over cleverness
                </span>
              </li>
              <li className="flex items-start gap-3">
                <ArrowRight className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                <span>
                  Are honest — even when it&apos;s uncomfortable
                </span>
              </li>
              <li className="flex items-start gap-3">
                <ArrowRight className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                <span>
                  Want to build cool things and make a good living doing it
                </span>
              </li>
            </ul>
          </div>
        </Container>
      </section>

      {/* Open Positions */}
      <section className="border-t border-border py-20">
        <Container size="small">
          <div className="w-12 h-1 bg-primary rounded-full mb-6" />
          <h2 className="text-2xl font-bold">Open Positions</h2>
          <div className="mt-8 rounded-lg border border-dashed border-border bg-muted/30 p-12 text-center">
            <p className="text-muted-foreground">
              No open positions right now — but we&apos;re always interested in
              hearing from exceptional people. If you think you&apos;d be a
              great fit, reach out anyway.
            </p>
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="relative border-t border-border py-20 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(34,197,94,0.08),transparent_70%)]" />
        </div>

        <Container size="small" className="relative">
          <div className="text-center">
            <h2 className="text-2xl font-bold">Interested?</h2>
            <p className="mt-4 text-muted-foreground">
              Drop us a line. Tell us what you&apos;re good at and what
              you&apos;d want to work on.
            </p>
            <Button className="mt-6" asChild>
              <Link href="/talk">
                Get in Touch <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
