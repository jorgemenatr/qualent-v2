import Link from "next/link";
import { ArrowRight, Search, CheckCircle } from "lucide-react";
import { Container } from "@/components/layout";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Research Report - Finding Solutions Without Us",
  description:
    "Before we build anything, we exhaustively research options for solving your problems without hiring us.",
};

export default function ResearchPage() {
  return (
    <>
      {/* Hero */}
      <section className="py-20 md:py-28">
        <Container size="small">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
            <Search className="h-6 w-6 text-primary" />
          </div>
          <h1 className="mt-6 text-4xl font-bold tracking-tight md:text-5xl">
            Research Report
          </h1>
          <p className="mt-2 text-xl text-primary font-medium">
            Finding Solutions Without Us
          </p>
          <p className="mt-6 text-lg text-muted-foreground">
            Before we build anything, we exhaustively research options for
            solving your problems <em>without</em> hiring us.
          </p>
          <p className="mt-4 text-lg font-medium text-foreground">
            $5,000 | Rolled into project budget if you proceed
          </p>
        </Container>
      </section>

      {/* What We Research */}
      <section className="border-t border-border py-20">
        <Container size="small">
          <h2 className="text-2xl font-bold">What We Research</h2>
          <div className="mt-8 space-y-4">
            {[
              "Every relevant off-the-shelf tool we can find",
              "How well each tool solves your specific problem (percentage fit)",
              "Integration options to make existing tools work together",
              "Total cost of ownership comparisons (buy vs. build)",
              "Our honest recommendation—even if that's \"don't hire us\"",
            ].map((item) => (
              <div key={item} className="flex items-start gap-3">
                <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                <span className="text-muted-foreground">{item}</span>
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
              "Comprehensive written report (typically 15-30 pages)",
              "Tool-by-tool analysis with pros and cons",
              "Cost comparison over 1, 3, and 5 years",
              "Integration architecture recommendations",
              "Clear recommendation with reasoning you can share with stakeholders",
            ].map((item) => (
              <div key={item} className="flex items-start gap-3">
                <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                <span className="text-muted-foreground">{item}</span>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* When We Recommend Building */}
      <section className="py-20">
        <Container size="small">
          <h2 className="text-2xl font-bold">When We Recommend Building</h2>
          <p className="mt-4 text-muted-foreground">
            Custom software is the right answer when:
          </p>
          <div className="mt-8 space-y-6">
            {[
              {
                title: "Your process is genuinely unique",
                description:
                  "No existing tool fits your workflow. This is rarer than you might think—but it does happen.",
              },
              {
                title: "Integration requirements are too complex",
                description:
                  "Off-the-shelf solutions can't handle the connections you need between systems.",
              },
              {
                title: "The software IS the competitive advantage",
                description:
                  "It's core to your business, not just supporting it. The software is what makes you different.",
              },
              {
                title: "Scale requirements exceed what SaaS can handle",
                description:
                  "Volume or performance requirements make off-the-shelf tools cost-prohibitive.",
              },
              {
                title: "Security or compliance requirements",
                description:
                  "Third-party tools can't meet your regulatory or security obligations.",
              },
              {
                title: "You've outgrown the tools",
                description:
                  "You started with off-the-shelf, it worked, and now you've genuinely reached its limits.",
              },
            ].map((item) => (
              <div key={item.title} className="flex gap-4">
                <div className="h-1.5 w-1.5 mt-2.5 flex-shrink-0 rounded-full bg-primary" />
                <div>
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="mt-1 text-muted-foreground">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-8 text-foreground font-medium">
            When we recommend building, you&apos;ll know exactly why—and you&apos;ll have
            documentation showing we tried to find a cheaper path first.
          </p>
        </Container>
      </section>

      {/* Pricing Note */}
      <section className="bg-muted/50 py-16">
        <Container size="small">
          <div className="rounded-lg border border-border bg-card/80 p-6 md:p-8">
            <h3 className="text-xl font-semibold mb-4">About the $5,000</h3>
            <div className="space-y-4 text-muted-foreground">
              <p>
                This isn&apos;t a deposit or a commitment. It&apos;s payment for real work:
                thorough research, analysis, and a report you can use regardless
                of what you decide to do next.
              </p>
              <p>
                If you do proceed to implementation with us, we credit the full
                $5,000 toward your project budget.
              </p>
              <p className="text-foreground font-medium">
                Either way, you walk away with a clear picture of your options.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="border-t border-border py-20">
        <Container size="small">
          <div className="text-center">
            <h2 className="text-2xl font-bold">Ready to find out what&apos;s possible?</h2>
            <p className="mt-4 text-muted-foreground">
              Start with a free diagnostic to see if research makes sense for your
              situation.
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
