import Link from "next/link";
import { ArrowRight, Zap, CheckCircle } from "lucide-react";
import { Container } from "@/components/layout";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Implementation - Building the Right Thing",
  description:
    "Fast, focused work that turns your biggest pain points into working solutions. We prototype in days and validate before we invest.",
};

export default function ImplementationPage() {
  return (
    <>
      {/* Hero */}
      <section className="py-20 md:py-28">
        <Container size="small">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
            <Zap className="h-6 w-6 text-primary" />
          </div>
          <h1 className="mt-6 text-4xl font-bold tracking-tight md:text-5xl">
            Implementation
          </h1>
          <p className="mt-2 text-xl text-primary font-medium">
            Building the Right Thing
          </p>
          <p className="mt-6 text-lg text-muted-foreground">
            Fast, focused work that turns your biggest pain points into working
            solutions. We prototype in days and validate before we invest in
            production code.
          </p>
          <p className="mt-4 text-lg font-medium text-foreground">
            Priced at 50% of the annual problem cost
          </p>
        </Container>
      </section>

      {/* How It Works */}
      <section className="border-t border-border py-20">
        <Container size="small">
          <h2 className="text-2xl font-bold">How It Works</h2>
          <div className="mt-8 space-y-8">
            {[
              {
                step: "1",
                title: "Define",
                duration: "1-2 days",
                description:
                  "Focused kickoff on the specific problem we're solving. No endless discovery—just enough to get moving with confidence.",
              },
              {
                step: "2",
                title: "Prototype",
                duration: "3-5 days",
                description:
                  "We build a working prototype you can actually use. Not wireframes or mockups—real, functional software you can test.",
              },
              {
                step: "3",
                title: "Validate",
                duration: "1-2 weeks",
                description:
                  "Test with real users. Iterate based on feedback. Make sure we're building the right thing before we invest in production quality.",
              },
              {
                step: "4",
                title: "Production",
                duration: "2-4 weeks",
                description:
                  "Build the real thing, properly. Reliable, secure, scalable, maintainable. The stuff that matters for long-term success.",
              },
              {
                step: "5",
                title: "Launch",
                duration: "1 week",
                description:
                  "Deploy and ensure it works in the real world. We don't disappear after launch—we stick around until it's actually working.",
              },
            ].map((phase) => (
              <div key={phase.step} className="flex gap-4">
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                  {phase.step}
                </div>
                <div>
                  <div className="flex items-center gap-3">
                    <h3 className="font-semibold">{phase.title}</h3>
                    <span className="text-xs text-muted-foreground">
                      {phase.duration}
                    </span>
                  </div>
                  <p className="mt-1 text-muted-foreground">{phase.description}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Why Prototype First */}
      <section className="bg-muted/50 py-20">
        <Container size="small">
          <h2 className="text-2xl font-bold">Why Prototype First</h2>
          <div className="mt-6 space-y-4 text-muted-foreground">
            <p>
              The most pressing vulnerability of custom software is building the{" "}
              <em className="text-foreground">wrong</em> software.
            </p>
            <p>
              We&apos;ve seen projects where the engineering team delivered extremely
              high-quality software, only to find out in the last weeks that it
              solved the wrong problem—albeit very well.
            </p>
            <p>
              AI allows us to bootstrap ideas into working test articles in days.
              We prove or disprove our assumptions before investing in production
              code.
            </p>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {[
              "Fewer expensive mistakes",
              "Faster time to value",
              "Confidence we're building the right thing",
            ].map((item) => (
              <div
                key={item}
                className="rounded-lg border border-border bg-card/80 p-4 text-center"
              >
                <CheckCircle className="mx-auto h-6 w-6 text-primary" />
                <p className="mt-2 text-sm font-medium">{item}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* What We Build */}
      <section className="py-20">
        <Container size="small">
          <h2 className="text-2xl font-bold">What We Build</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {[
              "Custom AI assistants and chatbots",
              "Process automation workflows",
              "Data pipelines and integrations",
              "Internal tools and dashboards",
              "Document processing systems",
              "Reporting and analytics solutions",
            ].map((item) => (
              <div key={item} className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 flex-shrink-0 text-primary" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Pricing */}
      <section className="bg-muted/50 py-16">
        <Container size="small">
          <div className="rounded-lg border border-primary/20 bg-card/90 p-8 text-center">
            <h3 className="text-xl font-semibold mb-4">Pricing</h3>
            <p className="text-3xl font-bold text-primary">
              50% of the annual problem cost
            </p>
            <p className="mt-4 text-muted-foreground">
              $100,000 annual problem = $50,000 to fix it.
            </p>
            <p className="mt-6 text-sm text-muted-foreground">
              We guarantee quality and completion—at no extra charge if necessary.
            </p>
            <Button variant="outline" size="sm" asChild className="mt-6">
              <Link href="/pricing">
                More on how our pricing works{" "}
                <ArrowRight className="ml-1 h-3 w-3" />
              </Link>
            </Button>
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="border-t border-border py-20">
        <Container size="small">
          <div className="text-center">
            <h2 className="text-2xl font-bold">Ready to build?</h2>
            <p className="mt-4 text-muted-foreground">
              Start with a free diagnostic to discuss your project and see if the
              math works.
            </p>
            <Button className="mt-6" asChild>
              <Link href="/talk">
                Book Your Diagnostic <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
