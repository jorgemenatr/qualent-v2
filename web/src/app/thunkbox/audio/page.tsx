import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Headphones } from "lucide-react";
import { Container } from "@/components/layout";
import { getAllContent } from "@/lib/content";
import { AudioLibraryClient } from "./audio-library-client";

export const metadata: Metadata = {
  title: "Audio Library | Thunk Box",
  description:
    "Listen to PickleLlama reports in audio format. Learn about AI and automation while on the go.",
};

// Map report slugs to audio file info
const audioMetadata: Record<string, { duration: string; available: boolean }> = {
  "ai-automation-roi-guide": { duration: "12:34", available: true },
  "selecting-the-right-problems": { duration: "15:22", available: true },
  "pilot-to-production-gap": { duration: "11:45", available: true },
  "requirements-problem": { duration: "10:18", available: true },
  "build-buy-or-both": { duration: "14:56", available: true },
  "data-readiness": { duration: "13:08", available: true },
};

export default function AudioLibraryPage() {
  const reports = getAllContent("reports");

  const audioReports = reports.map((report) => ({
    slug: report.slug,
    title: report.meta.title,
    description: report.meta.description,
    duration: audioMetadata[report.slug]?.duration || "TBD",
    available: audioMetadata[report.slug]?.available || false,
    audioUrl: `/api/audio/${report.slug}`, // Will use presigned S3 URLs
  }));

  return (
    <>
      {/* Header */}
      <section className="py-12 md:py-16">
        <Container>
          <Link
            href="/thunkbox"
            className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Thunk Box
          </Link>

          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-primary/10">
              <Headphones className="h-7 w-7 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">
                Audio Library
              </h1>
              <p className="mt-1 text-muted-foreground">
                Listen to our reports while you&apos;re on the go
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Audio List */}
      <section className="border-t border-border py-12">
        <Container>
          <AudioLibraryClient audioReports={audioReports} />
        </Container>
      </section>

      {/* Info */}
      <section className="bg-muted/50 py-12">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-xl font-semibold">About Our Audio Reports</h2>
            <p className="mt-4 text-muted-foreground">
              Each audio report is a narrated version of our written content,
              produced with AI voice technology. Perfect for learning during
              your commute, workout, or while doing chores.
            </p>
            <p className="mt-4 text-sm text-muted-foreground">
              Prefer reading?{" "}
              <Link href="/learn" className="text-primary hover:underline">
                Browse our written reports
              </Link>
            </p>
          </div>
        </Container>
      </section>
    </>
  );
}
