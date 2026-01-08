import Link from "next/link";
import { ArrowRight, Goal, CheckCircle } from "lucide-react";
import { Container } from "@/components/layout";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Problem Identification as a Service (PIaaS)",
  description:
    "Our Problem Identification as a Service (PIaaS) helps you figure out which problems are worth solving with automation.",
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
            Problem Identification as a Service (PIaaS)
          </h1>
          <p className="mt-6 text-lg text-muted-foreground">
            Before we build anything, we help you figure out what&apos;s actually
            worth building. Not every problem needs a custom solution—we help
            you prioritize the ones that do.
          </p>
        </Container>
      </section>

      {/* The Problem */}
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
                title: "Process Analysis",
                description:
                  "We map your current processes to understand where time and money are being wasted.",
              },
              {
                title: "Opportunity Prioritization",
                description:
                  "We use our FIVES framework to evaluate and rank potential automation opportunities.",
              },
              {
                title: "ROI Assessment",
                description:
                  "We estimate the real return on investment for each opportunity, accounting for hidden costs.",
              },
              {
                title: "Build vs. Buy Analysis",
                description:
                  "We help you decide when to build custom solutions vs. when to use off-the-shelf tools.",
              },
              {
                title: "Roadmap Development",
                description:
                  "We create a prioritized action plan based on impact, effort, and dependencies.",
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

      {/* Deliverables */}
      <section className="py-20">
        <Container size="small">
          <h2 className="text-2xl font-bold">What You Get</h2>
          <ul className="mt-6 space-y-3">
            {[
              "Detailed assessment of your current operational challenges",
              "Prioritized list of automation opportunities with ROI estimates",
              "Recommendations for build vs. buy decisions",
              "Clear roadmap with sequenced implementation phases",
              "Executive summary for stakeholder alignment",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3">
                <div className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                <span className="text-muted-foreground">{item}</span>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* CTA */}
      <section className="border-t border-border py-20">
        <Container size="small">
          <div className="text-center">
            <h2 className="text-2xl font-bold">Ready to get clarity?</h2>
            <p className="mt-4 text-muted-foreground">
              17 minutes to identify your top problems and whether the math works.
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
