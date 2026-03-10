import Link from "next/link";
import {
  ArrowRight,
  Handshake,
  Compass,
  FlaskConical,
  Heart,
  Zap,
  Building2,
  Check,
  Minus,
} from "lucide-react";
import { Container } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { PageHeroBackground } from "@/components/page-hero-background";

export const metadata = {
  title: "Who We Work With",
  description:
    "We're selective about who we work with. Learn about the mid-market companies we partner with and whether we're a good fit for your business.",
};

const values = [
  {
    icon: Handshake,
    title: "Genuine & Direct",
    description:
      "We want honest conversations. If something isn't working, say so. If you're not interested, tell us. We'll do the same. The best partnerships are built on trust, not polite fiction.",
  },
  {
    icon: Compass,
    title: "Strategically Minded",
    description:
      "You think about how your business runs, not just whether it runs. You're considering where you need to be in two to five years and what it takes to get there.",
  },
  {
    icon: FlaskConical,
    title: "Curious & Open",
    description:
      "You're interested in new ideas and willing to experiment. Not recklessly — you're practical and grounded — but you're open to the possibility that there's a better way.",
  },
  {
    icon: Heart,
    title: "People-First",
    description:
      "You care about your team. You want to give them better tools, not just cut costs. When we take a painful process off someone's plate, that matters to you as much as the efficiency gain.",
  },
  {
    icon: Zap,
    title: "Ready to Invest",
    description:
      "You understand that meaningful improvement requires commitment — your time, attention, and budget alongside ours. The best projects are genuine partnerships where both sides show up.",
  },
  {
    icon: Building2,
    title: "Built to Last",
    description:
      "You've been around. You're not a startup chasing product-market fit — you're an established business looking to modernize, streamline, and prepare for what's next.",
  },
];

const goodFit = [
  "Your team is still managing important processes with spreadsheets, paper forms, or email chains",
  "You've been meaning to \"do something about technology\" but haven't found the right partner",
  "You've tried a software project before that didn't go well, and you want to try again — smarter this time",
  "You can point to specific processes in your business that feel unnecessarily manual or painful",
  "Your company is growing or changing, and the tools that got you here won't get you there",
  "You want your team to spend their time on work that actually uses their expertise, not data entry and coordination",
];

const notFit = [
  "You already have a strong internal development team handling your technology needs",
  "You're looking for the cheapest possible option rather than the right solution",
  "You need a vendor to execute a predefined spec with no input on approach",
  "Technology decisions require approval from a parent company or external board",
  "You're not in a position to commit time, feedback, and budget to a collaborative process",
];

const industries = [
  "Manufacturing",
  "Construction",
  "Engineering",
  "Transportation & Logistics",
  "Wholesale & Distribution",
  "Professional Services",
  "Industrial Trades",
  "Mechanical Contracting",
];

export default function WhoWeWorkWithPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative py-16 md:py-20 min-h-[40vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/8 via-transparent to-transparent" />
          <div className="absolute -left-32 top-1/3 w-[500px] h-[400px] rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute -right-20 bottom-0 w-[300px] h-[250px] rounded-full bg-[rgba(132,204,22,0.08)] blur-3xl" />
        </div>
        <PageHeroBackground />

        <Container size="small" className="relative text-center">
          <div className="inline-block rounded-full border border-primary px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary mb-6">
            Our Approach to Partnerships
          </div>
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
            We&apos;re selective about who we work with. Here&apos;s why
            that&apos;s good for you.
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
            We don&apos;t take on every project that comes through the door. We
            build long-term technology partnerships with companies whose values
            align with ours — because the best software comes from genuine
            collaboration between people who give a damn.
          </p>
        </Container>
      </section>

      {/* Pull Quote */}
      <section className="border-t border-border py-16">
        <Container size="small">
          <div className="text-center">
            <div className="w-10 h-0.5 bg-primary rounded-full mx-auto mb-8" />
            <blockquote className="text-2xl md:text-3xl font-bold tracking-tight leading-snug max-w-3xl mx-auto">
              We believe the primary purpose of great software is to make the
              people doing the work happier, more effective, and more able to
              focus on what they do best.
            </blockquote>
          </div>
        </Container>
      </section>

      {/* Built for the Underserved Middle */}
      <section className="border-t border-border py-20">
        <Container size="small">
          <div className="w-12 h-1 bg-primary rounded-full mb-6" />
          <h2 className="text-2xl font-bold">Built for the Underserved Middle</h2>
          <div className="mt-6 space-y-4 text-muted-foreground">
            <p>
              Mid-market companies — typically between $10M and $100M in revenue
              — occupy a unique position. You&apos;re large enough to have
              genuinely complex operational challenges, but not so large that you
              have a 50-person IT department to throw at them. You&apos;ve
              outgrown spreadsheets and workarounds, but enterprise software
              vendors treat you like an afterthought.
            </p>
            <p>
              That&apos;s exactly where we work. We specialize in companies
              where real operational problems have gone unsolved — not because
              leadership doesn&apos;t care, but because the right solution
              didn&apos;t exist at a reasonable cost. Until recently. Modern
              AI-augmented development has fundamentally changed what&apos;s
              possible, and problems that used to be too expensive to solve are
              now very much within reach.
            </p>
          </div>
        </Container>
      </section>

      {/* What We Value in a Partner */}
      <section className="relative bg-muted/50 py-20 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute right-0 top-0 w-[400px] h-[300px] rounded-full bg-primary/5 blur-3xl" />
        </div>

        <Container className="relative">
          <div className="text-center mb-12">
            <div className="w-12 h-1 bg-primary rounded-full mb-6 mx-auto" />
            <h2 className="text-2xl font-bold">What We Value in a Partner</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
            {values.map((value) => (
              <div
                key={value.title}
                className="rounded-lg border border-border bg-card/80 p-6 transition-colors hover:border-primary/30"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 mb-4">
                  <value.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-lg font-semibold">{value.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Are We a Good Fit? */}
      <section className="border-t border-border py-20">
        <Container size="small">
          <div className="text-center mb-12">
            <div className="w-12 h-1 bg-primary rounded-full mb-6 mx-auto" />
            <h2 className="text-2xl font-bold">Are We a Good Fit?</h2>
            <p className="mt-3 text-muted-foreground">
              A quick self-assessment to save us both time
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {/* Good fit */}
            <div>
              <h3 className="flex items-center gap-2 text-base font-bold text-primary pb-3 mb-5 border-b-2 border-primary">
                <Check className="h-4 w-4" />
                We&apos;re probably a great fit if&hellip;
              </h3>
              <ul className="space-y-0">
                {goodFit.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 py-3 border-b border-border last:border-0"
                  >
                    <Check className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                    <span className="text-sm text-muted-foreground">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Not a fit */}
            <div>
              <h3 className="flex items-center gap-2 text-base font-bold text-muted-foreground pb-3 mb-5 border-b-2 border-border">
                <Minus className="h-4 w-4" />
                We&apos;re probably not the right fit if&hellip;
              </h3>
              <ul className="space-y-0">
                {notFit.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 py-3 border-b border-border last:border-0"
                  >
                    <Minus className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                    <span className="text-sm text-muted-foreground">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      {/* Industries */}
      <section className="bg-foreground py-20">
        <Container size="small">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-background">
              Industries We Serve
            </h2>
            <p className="mt-3 text-background/50">
              Software-shaped problems exist everywhere. We&apos;ve found them
              most often in these sectors.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            {industries.map((industry) => (
              <span
                key={industry}
                className="rounded-full border border-background/20 px-5 py-2.5 text-sm text-background/80 transition-colors hover:border-primary hover:text-background hover:bg-primary/15"
              >
                {industry}
              </span>
            ))}
          </div>

          <p className="text-center mt-8 text-sm text-background/40 italic">
            Don&apos;t see your industry? If you&apos;re a mid-market company
            with operational complexity, we should talk.
          </p>
        </Container>
      </section>

      {/* CTA */}
      <section className="relative border-t border-border py-20 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(34,197,94,0.08),transparent_70%)]" />
        </div>

        <Container size="small" className="relative">
          <div className="text-center">
            <h2 className="text-2xl font-bold">Sound like you?</h2>
            <p className="mt-4 text-muted-foreground max-w-lg mx-auto">
              We&apos;d love to have a conversation. No pitch deck, no hard sell
              — just an honest discussion about your business and whether we can
              help.
            </p>
            <Button className="mt-6" asChild>
              <Link href="/talk">
                Start a Conversation{" "}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <p className="mt-4 text-sm text-muted-foreground">
              Typically responds within one business day
            </p>
          </div>
        </Container>
      </section>
    </>
  );
}
