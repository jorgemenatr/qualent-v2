import Link from "next/link";
import { ArrowRight, FileText, Search, Zap, Handshake } from "lucide-react";
import { Container } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PageHeroBackground } from "@/components/page-hero-background";

export const metadata = {
  title: "Our Process",
  description:
    "How PickleLlama works: understanding first, buy before build, and AI-powered implementation when custom software is the right answer.",
};

const steps = [
  {
    title: "First Meeting",
    description: "We listen and produce a report on what we understood",
    cost: "Free",
    icon: FileText,
    href: "/services/understanding",
  },
  {
    title: "Research Report",
    description: "We find solutions that don't require hiring us",
    cost: "$5,000 (credited if you proceed)",
    icon: Search,
    href: "/services/research",
  },
  {
    title: "Implementation",
    description: "We build, prototype-first, validated with real users",
    cost: "50% of annual problem cost",
    icon: Zap,
    href: "/services/implementation",
  },
  {
    title: "Partnership",
    description: "Ongoing support and evolution",
    cost: "Custom based on needs",
    icon: Handshake,
    href: "/services/partnership",
  },
];

export default function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative py-16 md:py-20 min-h-[40vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-20 -left-20 w-[400px] h-[300px] rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute -bottom-20 -right-20 w-[400px] h-[300px] rounded-full bg-[rgba(132,204,22,0.08)] blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full bg-primary/5 blur-3xl" />
        </div>
        <PageHeroBackground />

        <Container className="relative">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mx-auto w-12 h-1 bg-primary rounded-full mb-6" />
            <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
              Our Process
            </h1>
            <p className="mt-6 text-lg text-muted-foreground">
              Over the years, we have watched projects crash and burn. Learning
              from failure has led us to develop a process we&apos;re proud to share.
              There is a <strong>story and a reason</strong> behind each step.
            </p>
            <p className="mt-4 text-lg font-medium text-foreground">
              These are the steps we find essential for an enjoyable long-term
              relationship.
            </p>
          </div>
        </Container>
      </section>

      {/* Section 1: Why Understanding Comes First */}
      <section className="border-t border-border py-16 md:py-20">
        <Container size="small">
          <div className="w-12 h-1 bg-primary rounded-full mb-6" />
          <h2 className="text-2xl md:text-3xl font-bold">
            Why Understanding Comes First
          </h2>
          <div className="mt-8 space-y-6 text-muted-foreground leading-relaxed">
            <p>
              For the first year after starting PickleLlama, we pretty much
              exclusively worked as subcontractors for other agencies. Probably
              the most painful lesson we learned in that time was what happens
              when no one checks with the end user to make sure that the software
              being built is actually what they need.
            </p>
            <p>
              One of our projects came to a very sad and frustrating end when, in
              the last two weeks of the project, we were presented with a
              checklist of &quot;must haves&quot; from the client that we had never seen
              before. We tried our best, but in the end, what we built could only
              do 20% of what we set out to build.
            </p>
            <p>
              The happy note is that it still recovered hundreds of hours of time
              every month and allowed their team to focus on more important
              things. But it could have been so much more if we had only known
              what the client actually needed.
            </p>
            <p className="text-foreground font-medium">
              This story is a big reason why we don&apos;t do subcontracting anymore.
              Client relationships matter too much, and good outcomes are too
              important.
            </p>
            <p>
              <strong className="text-foreground">
                That&apos;s why every engagement starts with understanding.
              </strong>{" "}
              We produce a detailed report on what we heard you say—so we&apos;re on
              the same page before anything else happens.
            </p>
          </div>
          <div className="mt-8">
            <Button variant="outline" asChild>
              <Link href="/services/understanding">
                Learn more about our first meeting
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </Container>
      </section>

      {/* Section 2: Why We Try to Convince You Not to Hire Us */}
      <section className="relative bg-muted/50 py-16 md:py-20 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute right-0 top-0 w-[400px] h-[300px] rounded-full bg-primary/5 blur-3xl" />
        </div>

        <Container size="small" className="relative">
          <div className="w-12 h-1 bg-primary rounded-full mb-6" />
          <h2 className="text-2xl md:text-3xl font-bold">
            Why We Try to Convince You Not to Hire Us
          </h2>
          <div className="mt-8 space-y-6 text-muted-foreground leading-relaxed">
            <p>
              There aren&apos;t many new ideas. That&apos;s the crushing reality of
              building a business. With 8 billion people on the planet, it&apos;s
              almost guaranteed that someone else already thought of it. That
              means you probably shouldn&apos;t build it yourself.
            </p>
            <p>
              Now, you might say, &quot;but you are in the software building
              business...&quot;
            </p>
            <p className="text-foreground font-medium">
              Yes. And here&apos;s why we still try to convince you to buy something
              else first.
            </p>
          </div>

          {/* The Math */}
          <div className="mt-10 rounded-lg border border-border bg-card/80 p-6 md:p-8">
            <h3 className="text-xl font-semibold mb-4">
              The Math Usually Favors Buying
            </h3>
            <div className="space-y-4 text-muted-foreground">
              <p>
                <strong className="text-foreground">
                  Custom software is expensive.
                </strong>{" "}
                Not just to build, but to maintain. A custom solution might cost
                $50,000-$200,000 to build, plus ongoing maintenance, hosting,
                security updates, and the inevitable &quot;can you just add this one
                feature&quot; requests.
              </p>
              <p>
                <strong className="text-foreground">
                  Off-the-shelf software is cheap.
                </strong>{" "}
                A SaaS tool might cost $200-$2,000/month. That&apos;s $2,400-$24,000/year.
                Even at the high end, you&apos;d need to run that tool for 8+ years
                before you&apos;d have spent what a custom build costs—and you get
                updates, support, and new features included.
              </p>
            </div>
          </div>

          {/* We've Watched Companies Waste Money */}
          <div className="mt-10">
            <h3 className="text-xl font-semibold mb-4">
              We&apos;ve Watched Companies Waste Money
            </h3>
            <div className="space-y-4 text-muted-foreground">
              <p>
                We&apos;ve seen a company spend $150,000 on a custom inventory
                management system when NetSuite would have done 95% of what they
                needed for $1,500/month. They spent three years building and
                maintaining something that a product team of 50 people was
                already improving every month.
              </p>
              <p>
                We&apos;ve watched startups burn six months building internal tools
                that Airtable or Notion could have handled in an afternoon.
              </p>
              <p className="text-foreground font-medium">
                We don&apos;t want to be part of that story. It&apos;s bad for you, and
                honestly, it&apos;s not the kind of work we find fulfilling.
              </p>
            </div>
          </div>

          {/* But Doesn't This Hurt Your Business? */}
          <div className="mt-10">
            <h3 className="text-xl font-semibold mb-4">
              &quot;But Doesn&apos;t This Hurt Your Business?&quot;
            </h3>
            <div className="space-y-4 text-muted-foreground">
              <p>
                Actually, no. Here&apos;s what happens when we tell someone they don&apos;t
                need custom software:
              </p>
              <div className="grid gap-4 mt-6">
                {[
                  {
                    title: "They trust us.",
                    description:
                      "When we eventually do recommend building, they know it's because we genuinely believe it's the right call—not because we're trying to generate billable work.",
                  },
                  {
                    title: "They come back.",
                    description:
                      "Maybe they don't need custom software today. But when they do have a problem that genuinely requires it, guess who they call?",
                  },
                  {
                    title: "They refer others.",
                    description:
                      '"These are the people who told me NOT to hire them" is a surprisingly effective endorsement.',
                  },
                  {
                    title: "We work on interesting problems.",
                    description:
                      "When we filter out the projects that shouldn't be custom, what's left are the genuinely interesting, high-impact projects where custom software is the right answer. That's the work we want to do.",
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex gap-4 p-4 rounded-lg border border-border bg-background/50"
                  >
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                      {index + 1}
                    </span>
                    <div>
                      <span className="font-semibold text-foreground">
                        {item.title}
                      </span>{" "}
                      <span>{item.description}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <p className="mt-10 text-lg font-medium text-foreground">
            We always recommend buying and integrating first, building second.
            Before we build anything, we exhaustively research options for
            solving your problems without hiring us.
          </p>

          <div className="mt-8">
            <Button variant="outline" asChild>
              <Link href="/services/research">
                Learn more about our research report
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </Container>
      </section>

      {/* Section 3: When We Build, We Do It Differently */}
      <section className="border-t border-border py-16 md:py-20">
        <Container size="small">
          <div className="w-12 h-1 bg-primary rounded-full mb-6" />
          <h2 className="text-2xl md:text-3xl font-bold">
            When We Build, We Do It Differently
          </h2>
          <div className="mt-8 space-y-6 text-muted-foreground leading-relaxed">
            <p>
              Traditionally, building software has been extremely expensive and
              time-consuming. Building things in an exploratory fashion to see if
              they work has been a luxury that even large enterprises frequently
              couldn&apos;t afford.
            </p>
            <p className="text-foreground font-medium">
              AI has changed the economics, especially when it comes to
              prototyping.
            </p>
          </div>

          {/* The Value of Code */}
          <div className="mt-10">
            <h3 className="text-xl font-semibold mb-4">
              The Value of Code: From Caviar to Canned Tuna
            </h3>
            <div className="space-y-4 text-muted-foreground">
              <p>
                Code used to be precious. Every line was expensive to write,
                expensive to maintain, expensive to change. Companies hoarded
                code and protected it like treasure.
              </p>
              <p>
                That&apos;s changing. AI makes it possible to generate working
                prototypes in hours instead of weeks. The value isn&apos;t in the code
                itself anymore—it&apos;s in understanding{" "}
                <em className="text-foreground">what to build</em> and making
                sure it actually solves the problem.
              </p>
            </div>
          </div>

          {/* The Real Vulnerability */}
          <div className="mt-10">
            <h3 className="text-xl font-semibold mb-4">
              The Real Vulnerability of Custom Software
            </h3>
            <div className="space-y-4 text-muted-foreground">
              <p>
                Building production-quality software still takes time and
                effort—less than even two years ago, but it&apos;s not trivial.
                Production systems still have to be reliable, scalable, secure,
                and usable.
              </p>
              <p>
                But the most pressing vulnerability of custom software is
                actually building the{" "}
                <em className="text-foreground">right</em> software.
              </p>
              <p>
                We&apos;ve seen projects where the engineering team delivered
                extremely high-quality software, only to find out in the last
                weeks of the project that the software solved the wrong
                problem—albeit very well.
              </p>
            </div>
          </div>

          {/* How AI Changes Our Approach */}
          <div className="mt-10">
            <h3 className="text-xl font-semibold mb-4">
              How AI Changes Our Approach
            </h3>
            <div className="space-y-4 text-muted-foreground">
              <p>
                AI doesn&apos;t just accelerate building production systems. It
                allows us to very quickly bootstrap ideas into test articles that
                prove or disprove our beliefs about the world.
              </p>
              <p className="text-foreground font-medium">
                We prototype in days. We test with real users. We validate before
                we invest in production-quality code. This means fewer expensive
                mistakes and faster time to value.
              </p>
            </div>
          </div>

          <div className="mt-8">
            <Button variant="outline" asChild>
              <Link href="/services/implementation">
                Learn more about our implementation process
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </Container>
      </section>

      {/* Section 4: The Offer Summary */}
      <section className="relative bg-muted/50 py-16 md:py-20 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full bg-primary/3 blur-3xl" />
        </div>

        <Container className="relative">
          <div className="text-center mb-12">
            <div className="mx-auto w-12 h-1 bg-primary rounded-full mb-6" />
            <h2 className="text-2xl md:text-3xl font-bold">The Offer</h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((step) => (
              <Card
                key={step.title}
                className="flex flex-col border-2 border-transparent bg-card/80 backdrop-blur-sm transition-all hover:border-primary/20 hover:shadow-lg"
              >
                <CardContent className="flex flex-1 flex-col p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <step.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold">{step.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground flex-1">
                    {step.description}
                  </p>
                  <p className="mt-4 text-sm font-medium text-primary">
                    {step.cost}
                  </p>
                  <Button variant="ghost" size="sm" asChild className="mt-4 -ml-2">
                    <Link href={step.href}>
                      Details <ArrowRight className="ml-1 h-3 w-3" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Pricing Summary */}
          <div className="mt-16 max-w-2xl mx-auto">
            <div className="rounded-lg border border-primary/20 bg-card/90 p-8 text-center">
              <h3 className="text-xl font-semibold mb-4">How Our Pricing Works</h3>
              <p className="text-muted-foreground">
                We don&apos;t bill by the hour. We don&apos;t do complex estimates.
              </p>
              <p className="mt-4 text-lg font-semibold text-foreground">
                You pay <span className="text-primary">50%</span> of the annual
                cost of the problem we solve for you.
              </p>
              <ul className="mt-6 text-sm text-muted-foreground space-y-2">
                <li>You always know how long it takes to recoup your investment (2 years)</li>
                <li>We only work on problems where ROI is measurable</li>
                <li>We guarantee quality and completion—at no extra charge if necessary</li>
              </ul>
              <p className="mt-6 text-muted-foreground">
                <strong className="text-foreground">Example:</strong> $100,000
                annual problem = $50,000 to fix it. Simple as that.
              </p>
              <Button variant="outline" size="sm" asChild className="mt-6">
                <Link href="/pricing">
                  More on pricing <ArrowRight className="ml-1 h-3 w-3" />
                </Link>
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="relative border-t border-border py-20 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(34,197,94,0.08),transparent_70%)]" />
        </div>

        <Container className="relative">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl md:text-3xl font-bold">
              Ready to start with understanding?
            </h2>
            <p className="mt-4 text-muted-foreground">
              17 minutes to identify your top problems and see if the math works.
            </p>
            <Button size="lg" className="mt-8" asChild>
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
