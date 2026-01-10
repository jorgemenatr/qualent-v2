import Link from "next/link";
import { ArrowRight, Goal, CheckCircle } from "lucide-react";
import { Container } from "@/components/layout";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Problem Identification as a Service (PIaaS)",
  description:
    "Before building, we help you figure out which problems are worth solving and prioritize them by ROI.",
};

export default function ProblemIdentificationPage() {
  return (
    <>
      {/* Hero */}
      <section className="py-20 md:py-28">
        <Container size="small">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
            <Goal className="h-6 w-6 text-primary" />
          </div>
          <h1 className="mt-6 text-4xl font-bold tracking-tight md:text-5xl">
            Problem Identification as a Service
          </h1>
          <p className="mt-2 text-xl text-primary font-medium">PIaaS</p>
          <p className="mt-6 text-lg text-muted-foreground">
            Before we build anything, we help you figure out what&apos;s actually
            worth building. Not every problem needs a custom solution—we help
            you prioritize the ones that do.
          </p>
          <p className="mt-4 text-lg font-medium text-foreground">
            Included in the research phase
          </p>
        </Container>
      </section>

      {/* The Challenge */}
      <section className="border-t border-border py-20">
        <Container size="small">
          <h2 className="text-2xl font-bold">The Challenge</h2>
          <div className="mt-6 space-y-4 text-muted-foreground">
            <p>
              Most companies have dozens of problems they could throw technology
              at. The hard part isn&apos;t building solutions—it&apos;s knowing which
              problems are worth solving.
            </p>
            <p>
              We&apos;ve seen too many companies waste months (and millions) building
              the wrong thing because they jumped straight to &quot;solution mode&quot;
              without properly understanding the problem.
            </p>
            <p className="text-foreground font-medium">
              The most expensive software is software that solves the wrong
              problem—no matter how well it&apos;s built.
            </p>
          </div>
        </Container>
      </section>

      {/* What We Do */}
      <section className="bg-muted/50 py-20">
        <Container size="small">
          <h2 className="text-2xl font-bold">What We Do</h2>
          <div className="mt-8 space-y-6">
            {[
              {
                title: "Process Mapping",
                description:
                  "We map your current processes to understand where time and money are being wasted. We talk to the people who actually do the work.",
              },
              {
                title: "Problem Quantification",
                description:
                  "We don't just identify problems—we quantify them. How much is this costing you per month? Per year? In money? In time? In frustration?",
              },
              {
                title: "Opportunity Prioritization",
                description:
                  "We evaluate and rank automation opportunities using clear criteria: impact, complexity, risk, and dependencies.",
              },
              {
                title: "ROI Assessment",
                description:
                  "We estimate the real return on investment for each opportunity, accounting for hidden costs like training, integration, and maintenance.",
              },
              {
                title: "Roadmap Development",
                description:
                  "We create a prioritized action plan based on impact, effort, and dependencies—so you know what to tackle first.",
              },
            ].map((item) => (
              <div key={item.title} className="flex gap-4">
                <CheckCircle className="mt-1 h-5 w-5 flex-shrink-0 text-primary" />
                <div>
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="mt-1 text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* What You Get */}
      <section className="py-20">
        <Container size="small">
          <h2 className="text-2xl font-bold">What You Get</h2>
          <div className="mt-8 space-y-4">
            {[
              "Detailed assessment of your current operational challenges",
              "Prioritized list of automation opportunities with ROI estimates",
              "Clear cost/benefit analysis for each problem",
              "Recommendations for build vs. buy decisions",
              "Sequenced roadmap with implementation phases",
              "Executive summary for stakeholder alignment",
            ].map((item) => (
              <div key={item} className="flex items-start gap-3">
                <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                <span className="text-muted-foreground">{item}</span>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Why This Matters */}
      <section className="bg-muted/50 py-16">
        <Container size="small">
          <div className="rounded-lg border border-border bg-card/80 p-6 md:p-8">
            <h3 className="text-xl font-semibold mb-4">Why This Matters</h3>
            <div className="space-y-4 text-muted-foreground">
              <p>
                Without proper problem identification, you might build a perfect
                solution to the wrong problem. Or worse—you might build
                something that solves a $10,000/year problem for $50,000.
              </p>
              <p>
                This process ensures we&apos;re focused on problems where the math
                actually works. If we can&apos;t find a problem worth solving, we&apos;ll
                tell you—and you&apos;ll have documentation proving it.
              </p>
              <p className="text-foreground font-medium">
                The goal isn&apos;t to generate work. The goal is to find the highest-impact
                opportunities where custom software genuinely makes sense.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="border-t border-border py-20">
        <Container size="small">
          <div className="text-center">
            <h2 className="text-2xl font-bold">Ready to identify what&apos;s worth fixing?</h2>
            <p className="mt-4 text-muted-foreground">
              Start with a free diagnostic to understand your situation.
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
