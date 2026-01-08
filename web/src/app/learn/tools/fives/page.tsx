import { Suspense } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Container } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { FivesAssessment } from "@/components/tools/fives-assessment";

export const metadata = {
  title: "FIVES Framework Assessment",
  description:
    "Evaluate your automation opportunities using the FIVES framework: Frequency, Impact, Variability, Existing Data, and Stakeholder Readiness.",
};

export default function FivesToolPage() {
  return (
    <>
      {/* Header */}
      <section className="border-b border-border py-12">
        <Container>
          <Button variant="ghost" size="sm" asChild className="mb-4">
            <Link href="/learn">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Learn
            </Link>
          </Button>
          <h1 className="text-3xl font-bold tracking-tight">FIVES Framework Assessment</h1>
          <p className="mt-2 text-muted-foreground max-w-2xl">
            Evaluate your automation opportunities systematically. Score each criterion from 1-5,
            then compare total scores to prioritize where to invest.
          </p>
          <div className="mt-4 flex flex-wrap gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-green-500" />
              <span>20-25: Strong Candidate</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-yellow-500" />
              <span>15-19: Worth Evaluating</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-red-500" />
              <span>Below 15: Lower Priority</span>
            </div>
          </div>
        </Container>
      </section>

      {/* Tool */}
      <section className="py-12">
        <Container>
          <Suspense
            fallback={
              <div className="flex items-center justify-center py-12">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
              </div>
            }
          >
            <FivesAssessment />
          </Suspense>
        </Container>
      </section>

      {/* Help Section */}
      <section className="border-t border-border bg-muted/50 py-12">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-xl font-bold">Need help with your assessment?</h2>
            <p className="mt-2 text-muted-foreground">
              Book a 17-minute diagnostic call and we&apos;ll walk through your opportunities together.
            </p>
            <Button className="mt-4" asChild>
              <Link href="/talk">Book a Call</Link>
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
