import Link from "next/link";
import { ArrowRight, Rocket, CheckCircle } from "lucide-react";
import { Container } from "@/components/layout";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Ongoing Partnership",
  description:
    "Long-term support to keep your solutions running, evolving, and delivering value as your business grows.",
};

export default function PartnershipPage() {
  return (
    <>
      {/* Hero */}
      <section className="py-20 md:py-28">
        <Container size="small">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
            <Rocket className="h-6 w-6 text-primary" />
          </div>
          <h1 className="mt-6 text-4xl font-bold tracking-tight md:text-5xl">
            Ongoing Partnership
          </h1>
          <p className="mt-6 text-lg text-muted-foreground">
            Long-term support to keep your solutions running, evolving, and
            delivering value. We become an extension of your team.
          </p>
        </Container>
      </section>

      {/* Why Partnership */}
      <section className="border-t border-border py-20">
        <Container size="small">
          <h2 className="text-2xl font-bold">Why Ongoing Partnership?</h2>
          <div className="mt-6 space-y-4 text-muted-foreground">
            <p>
              Building software is just the beginning. The real value comes from
              continuously improving it based on how your team actually uses it.
            </p>
            <p>
              An ongoing partnership means you have a dedicated team that knows
              your systems inside and out—ready to fix issues, add features, and
              help you make the most of your technology investments.
            </p>
          </div>
        </Container>
      </section>

      {/* What's Included */}
      <section className="bg-muted/50 py-20">
        <Container size="small">
          <h2 className="text-2xl font-bold">What&apos;s Included</h2>
          <div className="mt-8 space-y-6">
            {[
              {
                title: "Maintenance & Support",
                description:
                  "Bug fixes, security updates, and performance monitoring. We keep things running smoothly.",
              },
              {
                title: "Continuous Improvement",
                description:
                  "Regular check-ins to identify optimization opportunities and enhance existing solutions.",
              },
              {
                title: "New Feature Development",
                description:
                  "Dedicated capacity for building new features and capabilities as your needs evolve.",
              },
              {
                title: "Strategic Guidance",
                description:
                  "Ongoing advice on technology decisions, vendor selection, and future roadmap planning.",
              },
              {
                title: "Priority Response",
                description:
                  "When something breaks, you go to the front of the line. We treat your problems as our problems.",
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

      {/* How It Works */}
      <section className="py-20">
        <Container size="small">
          <h2 className="text-2xl font-bold">How It Works</h2>
          <div className="mt-6 space-y-4 text-muted-foreground">
            <p>
              Partnership engagements are structured as monthly retainers. You
              get a set number of hours per month that can be used for any
              combination of support, improvements, and new development.
            </p>
            <p>
              We meet regularly (weekly or bi-weekly, depending on your needs)
              to review priorities and plan upcoming work. Unused hours can roll
              over to the next month.
            </p>
            <p>
              There&apos;s no long-term commitment required. We earn your business
              every month by delivering value. If it&apos;s not working, you can
              walk away with 30 days notice.
            </p>
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="border-t border-border py-20">
        <Container size="small">
          <div className="text-center">
            <h2 className="text-2xl font-bold">Ready for a long-term partner?</h2>
            <p className="mt-4 text-muted-foreground">
              17 minutes to discuss how we can support your ongoing technology needs.
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
