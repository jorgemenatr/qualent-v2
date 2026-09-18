import { Link } from "@/i18n/navigation";
import { ArrowLeft, Headphones } from "lucide-react";
import { Container } from "@/components/layout";
import { getAllContent } from "@/lib/content";
import { getPrisma } from "@/lib/db";
import { AudioLibraryClient } from "./audio-library-client";
import { getTranslations, setRequestLocale } from "next-intl/server";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "ThunkboxAudio" });
  return { title: t("metaTitle"), description: t("metaDescription") };
}

// Force dynamic rendering since we fetch from database
export const dynamic = "force-dynamic";

export default async function AudioLibraryPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("ThunkboxAudio");
  const reports = getAllContent("reports");

  // Audio metadata lived in Postgres, which this site no longer runs. Without
  // it every report simply reads as having no recording yet.
  let audioFiles: { slug: string; duration: string; available: boolean }[] = [];
  try {
    const prisma = await getPrisma();
    audioFiles = await prisma.audioFile.findMany({
      where: { available: true },
      select: {
        slug: true,
        duration: true,
        available: true,
      },
    });
  } catch {
    audioFiles = [];
  }

  // Create a map of slug to audio info for quick lookup
  const audioMetadata = new Map(
    audioFiles.map((audio) => [
      audio.slug,
      { duration: audio.duration, available: audio.available },
    ])
  );

  const audioReports = reports.map((report) => ({
    slug: report.slug,
    title: report.meta.title,
    description: report.meta.description,
    duration: audioMetadata.get(report.slug)?.duration || "TBD",
    available: audioMetadata.get(report.slug)?.available || false,
    audioUrl: `/api/audio/${report.slug}`,
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
            {t("backToThunkBox")}
          </Link>

          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-primary/10">
              <Headphones className="h-7 w-7 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">
                {t("title")}
              </h1>
              <p className="mt-1 text-muted-foreground">
                {t("subtitle")}
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
            <h2 className="text-xl font-semibold">{t("aboutTitle")}</h2>
            <p className="mt-4 text-muted-foreground">
              {t("aboutDescription")}
            </p>
            <p className="mt-4 text-sm text-muted-foreground">
              {t("preferReading")}{" "}
              <Link href="/learn" className="text-primary hover:underline">
                {t("browseWrittenReports")}
              </Link>
            </p>
          </div>
        </Container>
      </section>
    </>
  );
}
