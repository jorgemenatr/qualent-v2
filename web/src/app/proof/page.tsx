import Link from "next/link";
import { ArrowRight, TrendingUp } from "lucide-react";
import { Container } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getAllContent } from "@/lib/content";
import { PageHeroBackground } from "@/components/page-hero-background";

export const metadata = {
  title: "Proof",
  description:
    "Case studies and results from PickleLlama's work with mid-market companies.",
};

export default function ProofPage() {
  const caseStudies = getAllContent("case-studies");

  return (
    <>
      {/* Hero */}
      <section className="relative py-16 md:py-20 min-h-[40vh] flex items-center overflow-hidden">
        {/* Background styling */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full bg-primary/8 blur-3xl" />
        </div>
        <PageHeroBackground />
        <Container className="relative">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
              Proof and Pain Stories
            </h1>
            <p className="mt-6 text-lg text-muted-foreground">
              Real results from real projects. Successes and failure; here&apos;s what we&apos;ve built and
              the impact it&apos;s had, and what we learned on the way.
            </p>
          </div>
        </Container>
      </section>

      {/* Case Studies */}
      <section className="border-t border-border py-20">
        <Container>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
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
                      <p className="text-lg font-semibold text-primary">
                        {study.meta.result}
                      </p>
                    </div>
                  )}
                  <p className="mt-4 text-muted-foreground">
                    {study.meta.description}
                  </p>
                  <div className="mt-auto pt-4">
                    <Button variant="link" className="h-auto p-0" asChild>
                      <Link href={`/proof/${study.slug}`}>
                        Read case study <ArrowRight className="ml-1 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="bg-muted/50 py-20">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-bold">Want similar results?</h2>
            <p className="mt-4 text-muted-foreground">
              Let&apos;s discuss your challenges and see what&apos;s possible.
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
