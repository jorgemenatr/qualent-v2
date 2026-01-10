import Link from "next/link";
import { ArrowRight, FileText, CheckCircle } from "lucide-react";
import { Container } from "@/components/layout";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "First Meeting - Getting on the Same Page",
  description:
    "Every engagement starts with understanding. We produce a detailed report on what we heard you say—so we're aligned before anything else happens.",
};

export default function UnderstandingPage() {
  return (
    <>
      {/* Hero */}
      <section className="py-20 md:py-28">
        <Container size="small">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
            <FileText className="h-6 w-6 text-primary" />
          </div>
          <h1 className="mt-6 text-4xl font-bold tracking-tight md:text-5xl">
            First Meeting
          </h1>
          <p className="mt-2 text-xl text-primary font-medium">
            Getting on the Same Page
          </p>
          <p className="mt-6 text-lg text-muted-foreground">
            Every engagement starts with understanding. We produce a detailed
            report on what we heard you say—so we&apos;re aligned before anything
            else happens.
          </p>
          <p className="mt-4 text-lg font-medium text-foreground">
            Free | 17-minute diagnostic call
          </p>
        </Container>
      </section>

      {/* What Happens */}
      <section className="border-t border-border py-20">
        <Container size="small">
          <h2 className="text-2xl font-bold">What Happens</h2>
          <div className="mt-8 space-y-6">
            {[
              {
                step: "1",
                title: "17-minute call",
                description:
                  "We ask about your biggest problems and what they're costing you. No small talk, no padding—just focused questions to understand your situation.",
              },
              {
                step: "2",
                title: "We listen",
                description:
                  "No pitching, no selling, just understanding. We're trying to figure out if we can actually help—not convince you to hire us.",
              },
              {
                step: "3",
                title: "Written report",
                description:
                  "Within 48 hours, you receive a summary of what we understood. This is your chance to correct us before we go any further.",
              },
            ].map((item) => (
              <div key={item.step} className="flex gap-4">
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                  {item.step}
                </div>
                <div>
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="mt-1 text-muted-foreground">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* What You Get */}
      <section className="bg-muted/50 py-20">
        <Container size="small">
          <h2 className="text-2xl font-bold">What You Get</h2>
          <div className="mt-8 space-y-4">
            {[
              "A written report summarizing what we heard",
              "Clarity on whether we're aligned on the problem",
              "Honest assessment of whether we can help",
              "Initial thoughts on approach (if relevant)",
              "No obligation—just understanding",
            ].map((item) => (
              <div key={item} className="flex items-start gap-3">
                <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                <span className="text-muted-foreground">{item}</span>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Why We Do This */}
      <section className="py-20">
        <Container size="small">
          <h2 className="text-2xl font-bold">Why We Do This</h2>
          <div className="mt-6 space-y-4 text-muted-foreground">
            <p>
              When expectations don&apos;t match reality, everyone loses. We learned
              this the hard way.
            </p>
            <p>
              Early in our history, we worked on a project where we didn&apos;t have
              direct access to the end client. In the last two weeks, we
              discovered a list of &quot;must haves&quot; we&apos;d never seen before. What we
              built only covered 20% of what was actually needed.
            </p>
            <p>
              It still helped—hundreds of hours saved every month. But it could
              have been so much more.
            </p>
            <p className="text-foreground font-medium">
              Now we make sure we&apos;re on the same page before any money changes
              hands.
            </p>
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="border-t border-border py-20">
        <Container size="small">
          <div className="text-center">
            <h2 className="text-2xl font-bold">Ready to start?</h2>
            <p className="mt-4 text-muted-foreground">
              17 minutes to identify your top problems and see if we can help.
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
