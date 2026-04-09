import { Link } from "@/i18n/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import {
  ArrowRight,
  FileText,
  Target,
  CheckCircle,
  Shield,
  ClipboardList,
  MessageSquare,
  Headphones,
  Wrench,
  Send,
} from "lucide-react";
import { Container } from "@/components/layout";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PageHeroBackground } from "@/components/page-hero-background";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Thunkbox" });
  return { title: t("metaTitle"), description: t("metaDescription") };
}

const reports = [
  {
    title: "The Pilot-to-Production Gap",
    description: "Why 80% of AI projects fail to reach production—and how to be in the 20% that succeed.",
  },
  {
    title: "Selecting the Right Problems: The FIVES Framework",
    description: "A practical framework for evaluating which automation opportunities are worth pursuing.",
  },
  {
    title: "The ROI of AI Automation",
    description: "Learn how to calculate and maximize the return on investment from AI initiatives.",
  },
  {
    title: "Build, Buy, or Both",
    description: "Practitioner decision frameworks for determining when to build custom vs. buy off-the-shelf.",
  },
  {
    title: "AI & LLM Fundamentals for Business Leaders",
    description: "Demystifying AI: what models do, what they cost, and when they're appropriate.",
  },
  {
    title: "Data Readiness in the LLM Era",
    description: "Challenging the outdated 'clean data first' narrative with modern approaches.",
  },
];

export default async function ThunkBoxPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Thunkbox");
  return (
    <>
      {/* Hero */}
      <section className="relative py-16 md:py-20 min-h-[40vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/8 via-transparent to-transparent" />
          <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[400px] rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute bottom-0 right-0 w-[300px] h-[250px] rounded-full bg-[rgba(132,204,22,0.08)] blur-3xl" />
        </div>
        <PageHeroBackground />

        <Container className="relative">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
              {t("aiReadinessCollection")}
            </div>
            <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
              {t("theThunkBox")}
            </h1>
            <p className="mt-6 text-lg text-muted-foreground">
              {t("heroDescriptionPrefix")} <span className="text-foreground font-medium">{t("heroDescriptionHighlight")}</span>.
              {t("heroDescriptionSuffix")}
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button size="lg" asChild>
                <Link href="#book-diagnostic">
                  {t("bookDiagnostic")} <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/thunkbox/worksheet">
                  {t("completeWorksheet")} <ClipboardList className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* The Offer */}
      <section className="border-t border-border bg-primary/5 py-16 md:py-20">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center justify-center h-14 w-14 rounded-full bg-primary/10 mb-5">
              <Target className="h-7 w-7 text-primary" />
            </div>
            <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
              {t("theOffer")}
            </h2>
            <p className="mt-4 text-xl md:text-2xl text-foreground">
              {t("offerDescription")}
            </p>
            <p className="mt-4 text-muted-foreground">
              {t("offerCaveat")}
            </p>
          </div>
        </Container>
      </section>

      {/* The 5 Bullets */}
      <section className="border-t border-border py-16 md:py-20">
        <Container>
          <div className="mx-auto max-w-2xl text-center mb-10">
            <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
              {t("whyThisWorksNow")}
            </h2>
            <p className="mt-3 text-muted-foreground">
              {t("whyThisWorksNowDescription")}
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "What We Do",
                text: "Elite Software Architects + AI leverage = Solutions in weeks at ~10x lower cost.",
              },
              {
                title: "Why Now",
                text: "The math flipped. Fixing problems now costs less than tolerating them.",
              },
              {
                title: "The Hidden Cost",
                text: "Manual work, workarounds, and bottlenecks quietly drain money and growth.",
              },
              {
                title: "What This Means",
                text: "Every manual workaround is a mistake waiting to happen. Every bottleneck is a resignation waiting to happen.",
              },
              {
                title: "The Opportunity",
                text: "Fix one bottleneck. Free up capacity. Use that capacity to fix the next one. Repeat.",
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

      {/* What's Inside */}
      <section className="border-t border-border bg-muted/50 py-16 md:py-20">
        <Container>
          <div className="mx-auto max-w-2xl text-center mb-10">
            <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
              {t("whatsInside")}
            </h2>
            <p className="mt-3 text-muted-foreground">
              {t("whatsInsideDescription")}
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {reports.map((report) => (
              <Card key={report.title} className="flex flex-col">
                <CardHeader>
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <FileText className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle className="mt-4 text-base">{report.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-1">
                  <CardDescription>{report.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-10 text-center">
            <p className="text-sm text-muted-foreground">
              {t("plusWorksheets")}
            </p>
          </div>
        </Container>
      </section>

      {/* Interactive Tools */}
      <section className="border-t border-border py-16 md:py-20">
        <Container>
          <div className="mx-auto max-w-2xl text-center mb-10">
            <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
              {t("interactiveTools")}
            </h2>
            <p className="mt-3 text-muted-foreground">
              {t("interactiveToolsDescription")}
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card className="flex flex-col group hover:border-primary/50 transition-colors">
              <CardHeader>
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <MessageSquare className="h-5 w-5 text-primary" />
                </div>
                <CardTitle className="mt-4 text-base">{t("askAnything")}</CardTitle>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col">
                <CardDescription className="flex-1">
                  {t("askAnythingDescription")}
                </CardDescription>
                <Button variant="outline" size="sm" className="mt-4 w-full" asChild>
                  <Link href="/thunkbox/ask">
                    {t("startChat")} <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="flex flex-col group hover:border-primary/50 transition-colors">
              <CardHeader>
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Headphones className="h-5 w-5 text-primary" />
                </div>
                <CardTitle className="mt-4 text-base">{t("audioLibrary")}</CardTitle>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col">
                <CardDescription className="flex-1">
                  {t("audioLibraryDescription")}
                </CardDescription>
                <Button variant="outline" size="sm" className="mt-4 w-full" asChild>
                  <Link href="/thunkbox/audio">
                    {t("browseAudio")} <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="flex flex-col group hover:border-primary/50 transition-colors">
              <CardHeader>
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Wrench className="h-5 w-5 text-primary" />
                </div>
                <CardTitle className="mt-4 text-base">{t("assessmentTools")}</CardTitle>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col">
                <CardDescription className="flex-1">
                  {t("assessmentToolsDescription")}
                </CardDescription>
                <Button variant="outline" size="sm" className="mt-4 w-full" asChild>
                  <Link href="/learn/tools">
                    {t("exploreTools")} <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="flex flex-col group hover:border-primary/50 transition-colors">
              <CardHeader>
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Send className="h-5 w-5 text-primary" />
                </div>
                <CardTitle className="mt-4 text-base">{t("submitARequest")}</CardTitle>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col">
                <CardDescription className="flex-1">
                  {t("submitRequestDescription")}
                </CardDescription>
                <Button variant="outline" size="sm" className="mt-4 w-full" asChild>
                  <Link href="/thunkbox/request">
                    {t("submitRequest")} <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </Container>
      </section>

      {/* Guarantee */}
      <section className="border-t border-border py-16 md:py-20">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center justify-center h-14 w-14 rounded-full bg-primary/10 mb-5">
              <Shield className="h-7 w-7 text-primary" />
            </div>
            <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
              {t("ourGuarantee")}
            </h2>
            <p className="mt-4 text-2xl md:text-3xl font-semibold text-primary">
              {t("guaranteeHeadline")}
            </p>
            <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
              {t("guaranteeLine1")}
              <br />
              {t("guaranteeLine2")}
            </p>
          </div>
        </Container>
      </section>

      {/* Pre-Meeting Worksheet CTA */}
      <section className="border-t border-border bg-muted/50 py-16 md:py-20">
        <Container>
          <div className="grid gap-10 md:grid-cols-2 md:items-center">
            <div>
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 mb-4">
                <ClipboardList className="h-6 w-6 text-primary" />
              </div>
              <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
                {t("prepareForDiagnostic")}
              </h2>
              <p className="mt-4 text-muted-foreground">
                {t("prepareDescription")}
              </p>
              <Button className="mt-6" asChild>
                <Link href="/thunkbox/worksheet">
                  {t("completeWorksheetBtn")} <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="rounded-lg border border-border bg-card p-6">
              <h3 className="font-semibold mb-4">{t("whatYouCover")}</h3>
              <ul className="space-y-3">
                {[
                  "Your top 3-5 operational problems",
                  "Estimated cost of each problem",
                  "What you've already tried",
                  "What success would look like",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <CheckCircle className="h-4 w-4 flex-shrink-0 text-primary" />
                    <span className="text-sm text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      {/* Booking Calendar */}
      <section id="book-diagnostic" className="border-t border-border py-16 md:py-20">
        <Container>
          <div className="mx-auto max-w-3xl text-center mb-10">
            <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
              {t("minutesToClarity")}
            </h2>
            <p className="mt-4 text-muted-foreground">
              {t("minutesClarityDescription")}
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              {t("minutesClaritySubdescription")}
            </p>
          </div>

          <div className="rounded-lg border border-border bg-card/80 backdrop-blur-sm p-4 md:p-8 shadow-sm overflow-hidden">
            <iframe
              src="https://calendar.google.com/calendar/appointments/schedules/AcZssZ3W1-onS8oPLIGAhf0t7uCrUScrUMlKcEfR-UBBlnpfI_B6N6HSPX49X_skh9vnwUHEH77Kkfq8?gv=true"
              className="w-full rounded-lg"
              style={{ border: 0, minHeight: "600px" }}
              title="Book your 17-minute diagnostic with PickleLlama"
            />
          </div>

          <div className="mt-8 text-center">
            <p className="text-sm text-muted-foreground/80 italic">
              {t("closingNote")}
            </p>
          </div>
        </Container>
      </section>
    </>
  );
}
