import Link from "next/link";
import { ArrowRight, Check, Calculator, Shield, Target } from "lucide-react";
import { Container } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PageHeroBackground } from "@/components/page-hero-background";

export const metadata = {
  title: "Pricing",
  description:
    "How PickleLlama pricing works: You pay 50% of the annual cost of the problem we solve for you.",
};

const benefits = [
  {
    icon: Calculator,
    title: "Predictable ROI",
    description:
      "You always know exactly how long it will take to recoup your investment—2 years, guaranteed.",
  },
  {
    icon: Target,
    title: "Well-Defined Problems Only",
    description:
      "We only work on problems where the ROI is actually measurable. No vague consulting exercises.",
  },
  {
    icon: Shield,
    title: "Quality & Completion Guaranteed",
    description:
      "We guarantee we finish the project to your satisfaction, at no extra charge if necessary.",
  },
];

export default function PricingPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative py-16 md:py-24 min-h-[50vh] flex items-center overflow-hidden">
        {/* Background styling */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Gradient from center */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(34,197,94,0.06),transparent_60%)]" />
          {/* Left accent */}
          <div className="absolute -left-32 top-1/3 w-[400px] h-[400px] rounded-full bg-primary/8 blur-3xl" />
          {/* Right accent */}
          <div className="absolute -right-32 bottom-1/3 w-[400px] h-[400px] rounded-full bg-[rgba(132,204,22,0.06)] blur-3xl" />
        </div>
        <PageHeroBackground />

        <Container className="relative">
          <div className="mx-auto max-w-3xl text-center">
            {/* Accent line */}
            <div className="mx-auto w-12 h-1 bg-primary rounded-full mb-6" />
            <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
              How Our Pricing Works
            </h1>
            <p className="mt-8 text-xl text-muted-foreground leading-relaxed">
              We don&apos;t bill by the hour. We don&apos;t do complex estimates.
            </p>
            <p className="mt-4 text-2xl font-semibold text-foreground">
              You pay <span className="text-primary">50%</span> of the annual cost of the problem we solve for you.
            </p>
          </div>
        </Container>
      </section>

      {/* Example Calculation */}
      <section className="relative border-t border-border py-20 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full bg-primary/5 blur-3xl" />
        </div>

        <Container className="relative">
          <div className="mx-auto max-w-2xl">
            <Card className="border-2 border-primary/20 bg-card/90 backdrop-blur-sm overflow-hidden">
              <div className="bg-primary/5 px-6 py-4 border-b border-primary/10">
                <p className="text-sm font-medium text-primary uppercase tracking-wide">
                  Simple Example
                </p>
              </div>
              <CardContent className="p-8">
                <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12">
                  {/* Problem */}
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground mb-2">Your annual problem</p>
                    <p className="text-4xl md:text-5xl font-bold text-foreground">$100,000</p>
                  </div>

                  {/* Arrow */}
                  <div className="flex items-center justify-center">
                    <ArrowRight className="h-8 w-8 text-primary rotate-90 md:rotate-0" />
                  </div>

                  {/* Solution */}
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground mb-2">Our price to fix it</p>
                    <p className="text-4xl md:text-5xl font-bold text-primary">$50,000</p>
                  </div>
                </div>

                <p className="mt-8 text-center text-muted-foreground">
                  Simple as that. No hidden fees. No hourly surprises.
                </p>
              </CardContent>
            </Card>
          </div>
        </Container>
      </section>

      {/* Benefits */}
      <section className="relative bg-muted/50 py-20 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-20 right-0 w-[350px] h-[300px] rounded-full bg-primary/6 blur-3xl" />
          <div className="absolute -bottom-20 left-0 w-[350px] h-[300px] rounded-full bg-[rgba(132,204,22,0.05)] blur-3xl" />
        </div>

        <Container className="relative">
          <div className="mx-auto max-w-3xl">
            <div className="text-center mb-12">
              <div className="mx-auto w-12 h-1 bg-primary rounded-full mb-6" />
              <h2 className="text-2xl md:text-3xl font-bold">Why This Works</h2>
            </div>

            <div className="grid gap-6 md:gap-8">
              {benefits.map((benefit) => (
                <div
                  key={benefit.title}
                  className="flex gap-4 md:gap-6 p-6 rounded-lg border border-border bg-card/80 transition-colors hover:border-primary/30"
                >
                  <div className="flex-shrink-0">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                      <benefit.icon className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">{benefit.title}</h3>
                    <p className="mt-2 text-muted-foreground">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Honest Disclaimer */}
      <section className="border-t border-border py-16">
        <Container size="small">
          <div className="rounded-lg border border-border bg-card/50 p-8 md:p-10">
            <h3 className="text-xl font-semibold mb-4">A Note on Honesty</h3>
            <p className="text-muted-foreground leading-relaxed">
              Does this mean we&apos;re always the cheapest option? <strong className="text-foreground">Nope.</strong>
            </p>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              But we <em>do</em> guarantee quality and completion. If we agree to solve your problem,
              we&apos;ll solve it—or we&apos;ll keep working until it&apos;s done, at no additional cost to you.
            </p>
            <div className="mt-6 flex items-center gap-2 text-primary">
              <Check className="h-5 w-5" />
              <span className="font-medium">Quality guaranteed</span>
            </div>
            <div className="flex items-center gap-2 text-primary">
              <Check className="h-5 w-5" />
              <span className="font-medium">Completion guaranteed</span>
            </div>
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="relative bg-muted/50 py-20 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(34,197,94,0.08),transparent_70%)]" />
        </div>

        <Container className="relative">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl md:text-3xl font-bold">Ready to talk numbers?</h2>
            <p className="mt-4 text-muted-foreground">
              17 minutes to identify your biggest problem and see if the math works.
            </p>
            <Button size="lg" className="mt-8" asChild>
              <Link href="/talk">
                Schedule a Conversation <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
