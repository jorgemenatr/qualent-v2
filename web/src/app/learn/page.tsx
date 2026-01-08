import Link from "next/link";
import { ArrowRight, FileText, Calendar, Clock } from "lucide-react";
import { Container } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getAllContent } from "@/lib/content";
import { PageHeroBackground } from "@/components/page-hero-background";

export const metadata = {
  title: "Learn",
  description:
    "Frameworks for identifying which problems cost more to tolerate than to fix—and how to prove the math works before you invest.",
};

export default function LearnPage() {
  const reports = getAllContent("reports");
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
              Everything We Know About Solving Problems for 50% of the Annual Cost
            </h1>
            <p className="mt-6 text-lg text-muted-foreground">
              The frameworks, thinking, and hard-won lessons behind our guarantee. Learn how we identify which problems are worth fixing—and prove the math works before you invest.
            </p>
          </div>
        </Container>
      </section>

      {/* Reports */}
      <section className="border-t border-border py-20">
        <Container>
          <h2 className="text-2xl font-bold">Reports & Frameworks</h2>
          {reports.length > 0 ? (
            <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {reports.map((report) => (
                <Card key={report.slug}>
                  <CardHeader>
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      <FileText className="h-5 w-5 text-primary" />
                    </div>
                    <CardTitle className="mt-4">{report.meta.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      {report.meta.description}
                    </p>
                    <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {new Date(report.meta.date).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {report.readingTime}
                      </span>
                    </div>
                    <Button variant="link" className="mt-4 h-auto p-0" asChild>
                      <Link href={`/learn/reports/${report.slug}`}>
                        Read more <ArrowRight className="ml-1 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="mt-8 rounded-lg border border-dashed border-border bg-muted/30 p-8 text-center">
              <p className="text-muted-foreground">
                Reports coming soon. Check back later for insights and frameworks.
              </p>
            </div>
          )}

          {/* Placeholder for more content */}
          {reports.length > 0 && (
            <div className="mt-12 rounded-lg border border-dashed border-border bg-muted/30 p-8 text-center">
              <p className="text-muted-foreground">
                More reports coming soon. Sign up to be notified when new content
                is available.
              </p>
            </div>
          )}
        </Container>
      </section>

      {/* CTA */}
      <section className="bg-muted/50 py-20">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-bold">Have questions about what you&apos;ve read?</h2>
            <p className="mt-4 text-muted-foreground">
              17 minutes to discuss how these frameworks apply to your situation.
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
