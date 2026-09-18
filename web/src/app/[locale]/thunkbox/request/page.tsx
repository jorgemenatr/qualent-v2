import { Link } from "@/i18n/navigation";
import { ArrowLeft, FileText } from "lucide-react";
import { Container } from "@/components/layout";
import { ContactFallback } from "@/components/contact-fallback";
import { getTranslations, setRequestLocale } from "next-intl/server";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "ThunkboxRequest" });
  return { title: t("metaTitle"), description: t("metaDescription") };
}

export default async function ThunkBoxRequestPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("ThunkboxRequest");
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
              <FileText className="h-7 w-7 text-primary" />
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

      {/* Form */}
      <section className="border-t border-border py-12">
        <Container size="small">
          <div className="mx-auto max-w-xl">
            <div className="mb-8">
              <h2 className="text-lg font-semibold">{t("howThisWorks")}</h2>
              <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
                <li className="flex gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-medium text-primary">
                    1
                  </span>
                  <span>
                    {t("step1")}
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-medium text-primary">
                    2
                  </span>
                  <span>
                    {t("step2")}
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-medium text-primary">
                    3
                  </span>
                  <span>
                    {t("step3")}
                  </span>
                </li>
              </ul>
            </div>

            <ContactFallback
              body={t("requestFallback")}
              cta={t("requestFallbackCta")}
              subject={t("requestFallbackSubject")}
            />
          </div>
        </Container>
      </section>

      {/* Info */}
      <section className="bg-muted/50 py-12">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-xl font-semibold">
              {t("whatMakesGoodRequest")}
            </h2>
            <div className="mt-6 grid gap-6 text-left md:grid-cols-2">
              <div className="rounded-lg border border-border bg-background p-4">
                <h3 className="font-medium text-primary">{t("goodExamples")}</h3>
                <ul className="mt-2 space-y-2 text-sm text-muted-foreground">
                  <li>
                    &quot;How should we evaluate RPA vs. custom automation for
                    invoice processing?&quot;
                  </li>
                  <li>
                    &quot;What are the key considerations for AI adoption in
                    regulated industries?&quot;
                  </li>
                  <li>
                    &quot;Help us understand build vs. buy for a customer support
                    chatbot&quot;
                  </li>
                </ul>
              </div>
              <div className="rounded-lg border border-border bg-background p-4">
                <h3 className="font-medium text-muted-foreground">
                  {t("lessIdeal")}
                </h3>
                <ul className="mt-2 space-y-2 text-sm text-muted-foreground">
                  <li>&quot;Tell me about AI&quot; (too broad)</li>
                  <li>&quot;Build me a chatbot&quot; (implementation, not research)</li>
                  <li>
                    &quot;Compare all CRM platforms&quot; (vendor comparison, not
                    strategic insight)
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
