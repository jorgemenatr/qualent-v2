import { Suspense } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Container } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { BuildVsBuyAssessment } from "@/components/tools/build-vs-buy";

export const metadata = {
  title: "Build vs Buy Assessment",
  description:
    "Evaluate whether to build custom solutions, buy off-the-shelf, or take a hybrid approach for your technology needs.",
};

export default function BuildVsBuyToolPage() {
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
          <h1 className="text-3xl font-bold tracking-tight">Build vs Buy Assessment</h1>
          <p className="mt-2 text-muted-foreground max-w-2xl">
            Evaluate each capability against key factors to determine whether to build custom,
            buy off-the-shelf, or take a hybrid approach.
          </p>
          <div className="mt-4 flex flex-wrap gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-blue-500" />
              <span>Build Custom</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-green-500" />
              <span>Buy SaaS</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-purple-500" />
              <span>Hybrid Approach</span>
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
            <BuildVsBuyAssessment />
          </Suspense>
        </Container>
      </section>

      {/* Help Section */}
      <section className="border-t border-border bg-muted/50 py-12">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-xl font-bold">Not sure about your assessment?</h2>
            <p className="mt-2 text-muted-foreground">
              We can help you evaluate your technology decisions with a fresh perspective.
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
