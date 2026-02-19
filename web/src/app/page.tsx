import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Zap,
  Goal,
  Rocket,
  XCircle,
  Shield,
  AlertTriangle,
  Users,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import { Container } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HeroBackground } from "@/components/hero-background";
import { getAllContent } from "@/lib/content";

const clientLogos = [
  { name: "Kroger", src: "/clients/kroger.svg", width: 120, height: 40 },
  { name: "Anaconda", src: "/clients/anaconda.svg", width: 140, height: 40 },
  { name: "CBTS", src: "/clients/cbts.webp", width: 100, height: 40, invert: true },
  { name: "Stacking Projects", src: "/clients/stacking-projects.png", width: 140, height: 40, invert: true },
  { name: "REPS", src: "/clients/reps.jpeg", width: 100, height: 40 },
];

export default function HomePage() {
  const caseStudies = getAllContent("case-studies");

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center py-20 md:py-32 overflow-hidden">
        <HeroBackground />

        <Container className="relative w-full">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl leading-tight">
              What if the <span className="text-primary">problems</span> you tolerate
              <br className="hidden sm:block" />
              are now <span className="text-primary">cheaper to fix</span> than
              to ignore?
            </h1>
            <p className="mt-8 text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Elite Software Architects + AI leverage =
              <br className="hidden sm:block" />
              Solutions in weeks + ~10x lower cost.
              <br />
              <span className="text-foreground font-medium">
                The math has changed.
              </span>
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button size="lg" asChild>
                <Link href="/talk">
                  Book 17-Minute Diagnostic{" "}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="#guarantee">See Our Guarantee</Link>
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* Client Logos Section */}
      <section className="border-t border-border py-12">
        <Container>
          <p className="text-center text-sm text-muted-foreground mb-8">
            Trusted by teams at
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 opacity-70">
            {clientLogos.map((logo) => (
              <div
                key={logo.name}
                className="relative grayscale hover:grayscale-0 transition-all duration-300"
              >
                <Image
                  src={logo.src}
                  alt={logo.name}
                  width={logo.width}
                  height={logo.height}
                  className={`h-8 md:h-10 w-auto object-contain ${"invert" in logo && logo.invert ? "invert" : ""}`}
                />
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* The Guarantee Section */}
      <section
        id="guarantee"
        className="border-t border-border bg-primary/5 py-16 md:py-20"
      >
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center justify-center h-14 w-14 rounded-full bg-primary/10 mb-5">
              <Shield className="h-7 w-7 text-primary" />
            </div>
            <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
              Our Guarantee
            </h2>
            <p className="mt-4 text-2xl md:text-3xl font-semibold text-primary">
              50% of annual cost — or we finish for free.
            </p>
            <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
              If the math doesn&apos;t work, we don&apos;t proceed.
              <br />
              If we can&apos;t deliver, you don&apos;t pay.
            </p>
          </div>
        </Container>
      </section>

      {/* Why Now Section - The 6 Bullets */}
      <section className="border-t border-border py-16 md:py-20">
        <Container>
          <div className="mx-auto max-w-2xl text-center mb-10">
            <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
              Why This Is Possible Now
            </h2>
            <p className="mt-3 text-muted-foreground">
              AI changed the economics of custom software.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "What We Do",
                text: "Elite architects + AI leverage = solutions in weeks at ~10x lower cost.",
              },
              {
                title: "Why Now",
                text: "The math flipped. Fixing problems now costs less than tolerating them.",
              },
              {
                title: "The Hidden Cost",
                text: "Manual work drains money. Bottlenecks cap growth. Workarounds become expensive mistakes.",
              },
              {
                title: "What This Means",
                text: "Every manual workaround is a mistake waiting to happen. Every bottleneck is a resignation waiting to happen.",
              },
              {
                title: "The Opportunity",
                text: "Fix one bottleneck. Free up capacity. Fix the next one. Repeat.",
              },
              {
                title: "The Next Step",
                text: "A 17-minute call to quantify what's worth fixing.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-lg border border-border bg-card p-5"
              >
                <h3 className="font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* What We Don't Do Section */}
      <section className="border-t border-border bg-muted/50 py-16 md:py-20">
        <Container>
          <div className="grid gap-10 md:grid-cols-2 md:items-center">
            <div>
              <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
                What We Don&apos;t Do
              </h2>
              <p className="mt-3 text-muted-foreground">
                We&apos;re not for everyone. That&apos;s intentional.
              </p>
              <ul className="mt-6 space-y-3">
                {[
                  "Build without talking to actual users",
                  "Proceed if the math doesn't work",
                  "Bill for projects that don't deliver",
                  "Speak in corporate buzzwords",
                  "Promise to be the cheapest",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <XCircle className="h-4 w-4 flex-shrink-0 text-destructive" />
                    <span className="text-sm">We don&apos;t {item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-lg border border-border bg-card p-6 md:p-8">
              <h3 className="text-lg font-semibold">Our Promise</h3>
              <p className="mt-3 text-sm text-muted-foreground">
                If the math doesn&apos;t work, we&apos;ll tell you.
                <br />
                If we can&apos;t help, we&apos;ll tell you that too.
              </p>
              <p className="mt-4 text-xl font-semibold text-primary">
                50% of annual cost — or free.
              </p>
              <Button className="mt-5" asChild>
                <Link href="/services">See How We Work</Link>
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* What We Actually Do Section */}
      <section className="border-t border-border py-16 md:py-20">
        <Container>
          <div className="mx-auto max-w-2xl text-center mb-10">
            <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
              What We Actually Do
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <Card className="border-2 border-transparent transition-colors hover:border-primary/20">
              <CardContent className="pt-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Goal className="h-5 w-5 text-primary" />
                </div>
                <h3 className="mt-4 font-semibold">Problem Identification</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  Identify your top problems and quantify what they cost. If the
                  math doesn&apos;t work, we tell you.
                </p>
                <Link
                  href="/services/research"
                  className="mt-4 inline-flex items-center text-sm font-medium text-primary hover:underline"
                >
                  Learn more <ArrowRight className="ml-1 h-3 w-3" />
                </Link>
              </CardContent>
            </Card>

            <Card className="border-2 border-transparent transition-colors hover:border-primary/20">
              <CardContent className="pt-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Zap className="h-5 w-5 text-primary" />
                </div>
                <h3 className="mt-4 font-semibold">Implementation</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  Senior engineers + AI tools = solutions at ~10x lower cost. We
                  build fast because we build right.
                </p>
                <Link
                  href="/services/implementation"
                  className="mt-4 inline-flex items-center text-sm font-medium text-primary hover:underline"
                >
                  Learn more <ArrowRight className="ml-1 h-3 w-3" />
                </Link>
              </CardContent>
            </Card>

            <Card className="border-2 border-transparent transition-colors hover:border-primary/20">
              <CardContent className="pt-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Rocket className="h-5 w-5 text-primary" />
                </div>
                <h3 className="mt-4 font-semibold">Ongoing Partnership</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  Long-term support to keep solutions running and evolving. We
                  become part of your team.
                </p>
                <Link
                  href="/services/partnership"
                  className="mt-4 inline-flex items-center text-sm font-medium text-primary hover:underline"
                >
                  Learn more <ArrowRight className="ml-1 h-3 w-3" />
                </Link>
              </CardContent>
            </Card>
          </div>
        </Container>
      </section>

      {/* Case Studies Section */}
      <section className="border-t border-border bg-muted/50 py-16 md:py-20">
        <Container>
          <div className="mx-auto max-w-2xl text-center mb-10">
            <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
              Real Results
            </h2>
            <p className="mt-3 text-muted-foreground">
              Not hypotheticals. Not projections. Here&apos;s what actually happened.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {caseStudies.map((study) => (
              <Card key={study.slug} className="flex flex-col">
                <CardHeader>
                  <p className="text-sm text-muted-foreground">
                    {study.meta.client || study.meta.industry}
                  </p>
                  <CardTitle className="mt-2">{study.meta.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-1 flex-col">
                  {study.meta.result && (
                    <div className="flex items-center gap-2 rounded-lg bg-primary/10 px-4 py-3">
                      <TrendingUp className="h-4 w-4 text-primary" />
                      <p className="text-sm font-semibold text-primary">
                        {study.meta.result}
                      </p>
                    </div>
                  )}
                  <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
                    {study.meta.description}
                  </p>
                  <div className="mt-auto pt-4">
                    <Link
                      href={`/proof/${study.slug}`}
                      className="inline-flex items-center text-sm font-medium text-primary hover:underline"
                    >
                      Read case study <ArrowRight className="ml-1 h-3 w-3" />
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Button variant="outline" asChild>
              <Link href="/proof">
                View All Case Studies <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </Container>
      </section>

      {/* The Three Risks Section */}
      <section className="border-t border-border bg-muted/50 py-16 md:py-20">
        <Container>
          <div className="mx-auto max-w-2xl text-center mb-10">
            <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
              What You&apos;re Risking Right Now
            </h2>
            <p className="mt-3 text-muted-foreground">
              Every day you tolerate these problems, you accept these risks.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-lg border border-border bg-card p-5">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-destructive/10 mb-3">
                <AlertTriangle className="h-5 w-5 text-destructive" />
              </div>
              <h3 className="font-semibold">Operational Risk</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                Manual errors and process failures that damage client
                relationships and cost real money.
              </p>
            </div>

            <div className="rounded-lg border border-border bg-card p-5">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-destructive/10 mb-3">
                <Users className="h-5 w-5 text-destructive" />
              </div>
              <h3 className="font-semibold">People Risk</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                Burnout and frustration from talented people doing mundane work.
                Resignations you don&apos;t see coming.
              </p>
            </div>

            <div className="rounded-lg border border-border bg-card p-5">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-destructive/10 mb-3">
                <TrendingDown className="h-5 w-5 text-destructive" />
              </div>
              <h3 className="font-semibold">Competitive Risk</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                Capacity constraints while competitors move faster. Stuck in
                spreadsheet hell.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20">
        <Container>
          <div className="mx-auto max-w-xl text-center">
            <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
              17 Minutes to Clarity
            </h2>
            <p className="mt-4 text-muted-foreground">
              15 minutes for us to listen. 2 minutes to talk next steps.
            </p>
            <p className="mt-3 text-sm text-muted-foreground">
              Walk away with a clear picture of your top problems, what
              they&apos;re costing you, and whether the math works.
            </p>
            <p className="mt-3 text-xs text-muted-foreground/80 italic">
              Whether we work together or not, you&apos;ll have what you need to
              act.
            </p>
            <Button size="lg" className="mt-6" asChild>
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
