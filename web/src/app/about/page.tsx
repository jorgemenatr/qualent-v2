import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { PageHeroBackground } from "@/components/page-hero-background";

export const metadata = {
  title: "About",
  description:
    "Learn about PickleLlama and our approach to AI and automation consulting.",
};

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative py-16 md:py-20 min-h-[40vh] flex items-center overflow-hidden">
        {/* Background styling - side gradient for distinction from homepage */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Gradient from left */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary/8 via-transparent to-transparent" />
          {/* Decorative blur - positioned left */}
          <div className="absolute -left-32 top-1/2 -translate-y-1/2 w-[500px] h-[400px] rounded-full bg-primary/10 blur-3xl" />
          {/* Subtle lime accent - bottom right */}
          <div className="absolute -right-20 bottom-0 w-[300px] h-[250px] rounded-full bg-[rgba(132,204,22,0.08)] blur-3xl" />
        </div>
        <PageHeroBackground />

        <Container size="small" className="relative">
          {/* Accent line */}
          <div className="w-12 h-1 bg-primary rounded-full mb-6" />
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
            About PickleLlama
          </h1>
          <div className="mt-6 space-y-4 text-lg text-muted-foreground">
            <p>
              We&apos;re intentionally small, proudly unconventional (see our mascot), and allergic to corporate theater.
            </p>
          </div>
        </Container>
      </section>

      {/* Story */}
      <section className="border-t border-border py-20">
        <Container size="small">
          <div className="w-12 h-1 bg-primary rounded-full mb-6" />
          <h2 className="text-2xl font-bold">Our Story</h2>
          <div className="mt-6 space-y-4 text-muted-foreground">
            <p>
              We started PickleLlama because we wanted to build some cool stuff and make a living. We didn&apos;t start out with a grand vision or a plan to change the world. Really, we still don&apos;t. 
            </p>
            <p>
              Most of our early existance as a company was spent working on projects for other companies. We learned a lot about what works and what doesn&apos;t. We have some war stories from that era. 
            </p>
            <p>
              Since then, we have worked for companies of a lot of different sizes and in a lot of different industries from startups to 100 billion dollar giants. Sometimes we even do small projects for friends and family because they have fun ideas.
            </p>
            <p>We are optimizing for working with <i>genuine, strategically minded people</i> and building cool things that solve real problems.
              <br />
              <br />
              <strong>Ideally, we all make a good living.</strong>
            </p>
          </div>
        </Container>
      </section>

      {/* How We Work */}
      <section className="relative bg-muted/50 py-20 overflow-hidden">
        {/* Subtle background accent */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute right-0 top-0 w-[400px] h-[300px] rounded-full bg-primary/5 blur-3xl" />
        </div>

        <Container size="small" className="relative">
          <div className="w-12 h-1 bg-primary rounded-full mb-6" />
          <h2 className="text-2xl font-bold">How We Work</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div className="rounded-lg border border-border bg-card/80 p-6 transition-colors hover:border-primary/30">
              <h3 className="text-lg font-semibold">Speed Over Perfection</h3>
              <p className="mt-2 text-muted-foreground">
                We&apos;d rather ship something good in two weeks than something
                perfect in six months. Perfect is the enemy of done.
              </p>
            </div>
            <div className="rounded-lg border border-border bg-card/80 p-6 transition-colors hover:border-primary/30">
              <h3 className="text-lg font-semibold">Outcomes Over Hours</h3>
              <p className="mt-2 text-muted-foreground">
                We price based on value delivered, not time spent. Your success
                is our success.
              </p>
            </div>
            <div className="rounded-lg border border-border bg-card/80 p-6 transition-colors hover:border-primary/30">
              <h3 className="text-lg font-semibold">Honesty Over Sales</h3>
              <p className="mt-2 text-muted-foreground">
                If we can&apos;t help you, we&apos;ll tell you. We&apos;d rather say no than
                waste your time and money.
              </p>
            </div>
            <div className="rounded-lg border border-border bg-card/80 p-6 transition-colors hover:border-primary/30">
              <h3 className="text-lg font-semibold">Simplicity Over Complexity</h3>
              <p className="mt-2 text-muted-foreground">
                We build the simplest thing that could possibly work. Complexity
                is a liability, not an asset.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Team section - hidden for now
      <section className="py-20">
        <Container size="small">
          <h2 className="text-2xl font-bold">The Team</h2>
          <p className="mt-4 text-muted-foreground">
            We&apos;re a small, senior team. Everyone who works on your project has
            been doing this for years. No junior developers learning on your
            dime, no offshore teams you&apos;ll never meet.
          </p>
          <div className="mt-8 rounded-lg border border-dashed border-border bg-muted/30 p-12 text-center">
            <p className="text-sm text-muted-foreground">
              Team photos coming soon
            </p>
          </div>
        </Container>
      </section>
      */}

      {/* CTA */}
      <section className="relative border-t border-border py-20 overflow-hidden">
        {/* Subtle centered glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(34,197,94,0.08),transparent_70%)]" />
        </div>

        <Container size="small" className="relative">
          <div className="text-center">
            <h2 className="text-2xl font-bold">Want to work with us?</h2>
            <p className="mt-4 text-muted-foreground">
              17 minutes to see if the math works for your challenges.
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
