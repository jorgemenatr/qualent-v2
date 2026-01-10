import Link from "next/link";
import { ArrowRight, Handshake, CheckCircle } from "lucide-react";
import { Container } from "@/components/layout";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Ongoing Partnership",
  description:
    "We don't disappear after launch. Solutions need to evolve, and we become an extension of your team.",
};

export default function PartnershipPage() {
  return (
    <>
      {/* Hero */}
      <section className="py-20 md:py-28">
        <Container size="small">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
            <Handshake className="h-6 w-6 text-primary" />
          </div>
          <h1 className="mt-6 text-4xl font-bold tracking-tight md:text-5xl">
            Ongoing Partnership
          </h1>
          <p className="mt-2 text-xl text-primary font-medium">
            Long-term Support and Evolution
          </p>
          <p className="mt-6 text-lg text-muted-foreground">
            We don&apos;t disappear after launch. Solutions need to evolve, and we
            become an extension of your team.
          </p>
          <p className="mt-4 text-lg font-medium text-foreground">
            Custom arrangements based on your needs
          </p>
        </Container>
      </section>

      {/* What's Included */}
      <section className="border-t border-border py-20">
        <Container size="small">
          <h2 className="text-2xl font-bold">What&apos;s Included</h2>
          <div className="mt-8 space-y-6">
            {[
              {
                title: "Maintenance and support",
                description:
                  "Keeping things running smoothly. Bug fixes, security updates, and making sure nothing breaks.",
              },
              {
                title: "Continuous improvement",
                description:
                  "Optimizing based on real usage data. We watch how people actually use the software and make it better.",
              },
              {
                title: "New feature development",
                description:
                  "As your needs evolve, so does the software. We add capabilities as you discover new requirements.",
              },
              {
                title: "Strategic guidance",
                description:
                  "Technology decisions as your business grows. We help you think through what's next.",
              },
              {
                title: "Priority response",
                description:
                  "When something breaks, you go to the front of the line. We treat your problems as our problems.",
              },
            ].map((item) => (
              <div key={item.title} className="flex gap-4">
                <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                <div>
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="mt-1 text-muted-foreground">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* How It Works */}
      <section className="bg-muted/50 py-20">
        <Container size="small">
          <h2 className="text-2xl font-bold">How It Works</h2>
          <p className="mt-4 text-muted-foreground">
            Partnership arrangements are custom based on your needs. Typical
            engagements include:
          </p>
          <div className="mt-8 space-y-4">
            {[
              "Monthly retainer for ongoing development and support",
              "Quarterly strategy sessions to plan what's next",
              "Priority response for issues and urgent needs",
              "Proactive monitoring and optimization",
              "Regular check-ins to ensure alignment",
            ].map((item) => (
              <div key={item} className="flex items-start gap-3">
                <div className="h-1.5 w-1.5 mt-2.5 flex-shrink-0 rounded-full bg-primary" />
                <span className="text-muted-foreground">{item}</span>
              </div>
            ))}
          </div>
          <div className="mt-8 rounded-lg border border-border bg-card/80 p-6">
            <p className="text-muted-foreground">
              There&apos;s no long-term commitment required. We earn your business
              every month by delivering value. If it&apos;s not working, you can
              walk away with 30 days notice.
            </p>
          </div>
        </Container>
      </section>

      {/* Why Partnership Matters */}
      <section className="py-20">
        <Container size="small">
          <h2 className="text-2xl font-bold">Why Partnership Matters</h2>
          <div className="mt-6 space-y-4 text-muted-foreground">
            <p>
              Software isn&apos;t a one-time purchase. It&apos;s a living thing that needs
              care, attention, and evolution.
            </p>
            <p>
              The best software gets better over time because someone is watching
              how it&apos;s used, listening to feedback, and making improvements. The
              worst software gets abandoned and slowly becomes a liability.
            </p>
            <p className="text-foreground font-medium">
              We prefer to stick around and make sure what we built keeps
              delivering value.
            </p>
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="border-t border-border py-20">
        <Container size="small">
          <div className="text-center">
            <h2 className="text-2xl font-bold">Want to discuss ongoing support?</h2>
            <p className="mt-4 text-muted-foreground">
              Start with a conversation about your needs and what partnership
              might look like.
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
