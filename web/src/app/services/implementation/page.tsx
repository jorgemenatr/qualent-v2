import Link from "next/link";
import { ArrowRight, Zap, CheckCircle } from "lucide-react";
import { Container } from "@/components/layout";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Implementation",
  description:
    "Fast, focused implementation sprints that turn your biggest pain points into working solutions in weeks.",
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
          <p className="mt-6 text-lg text-muted-foreground">
            Fast, focused sprints that turn your biggest pain points into
            working solutions. We prototype in days and launch in weeks, not
            months.
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
                description:
                  "We start with a focused kickoff to understand the specific problem we're solving. No endless discovery—just enough to get moving.",
                duration: "1-2 days",
              },
              {
                step: "2",
                title: "Prototype",
                description:
                  "We build a working prototype quickly. You'll have something to test and provide feedback on within days, not weeks.",
                duration: "3-5 days",
              },
              {
                step: "3",
                title: "Iterate",
                description:
                  "Based on your feedback, we refine and improve. This rapid iteration ensures we're building exactly what you need.",
                duration: "1-2 weeks",
              },
              {
                step: "4",
                title: "Launch",
                description:
                  "We deploy your solution and ensure it's working properly in production. We don't disappear after launch.",
                duration: "1 week",
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
                  <p className="mt-1 text-muted-foreground">
                    {phase.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* What We Build */}
      <section className="bg-muted/50 py-20">
        <Container size="small">
          <h2 className="text-2xl font-bold">What We Build</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2">
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

      {/* Why Us */}
      <section className="py-20">
        <Container size="small">
          <h2 className="text-2xl font-bold">Why We&apos;re Different</h2>
          <div className="mt-6 space-y-4 text-muted-foreground">
            <p>
              We&apos;re not a body shop. We don&apos;t throw junior developers at your
              project and hope for the best. Every project is led by senior
              engineers who&apos;ve been doing this for years.
            </p>
            <p>
              We focus on outcomes, not hours. We price based on the value we
              deliver, not the time we spend. If we can solve your problem in
              two weeks, we won&apos;t stretch it to two months.
            </p>
            <p>
              We build things that work. We prioritize simplicity and
              maintainability. You won&apos;t be left with a mess that nobody
              understands six months later.
            </p>
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="border-t border-border py-20">
        <Container size="small">
          <div className="text-center">
            <h2 className="text-2xl font-bold">Ready to build?</h2>
            <p className="mt-4 text-muted-foreground">
              17 minutes to discuss your project and see if the math works.
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
