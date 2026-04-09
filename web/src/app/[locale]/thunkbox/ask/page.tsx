import { Link } from "@/i18n/navigation";
import { ArrowLeft, MessageSquare } from "lucide-react";
import { Container } from "@/components/layout";
import { ChatInterface } from "@/components/chat";
import { getTranslations, setRequestLocale } from "next-intl/server";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "ThunkboxAsk" });
  return { title: t("metaTitle"), description: t("metaDescription") };
}

export default async function ThunkBoxAskPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("ThunkboxAsk");
  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col">
      {/* Header */}
      <section className="border-b bg-background py-4">
        <Container>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                href="/thunkbox"
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
              >
                <ArrowLeft className="h-4 w-4" />
                {t("back")}
              </Link>
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                  <MessageSquare className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <h1 className="text-lg font-semibold">{t("title")}</h1>
                </div>
              </div>
            </div>
            <div className="text-xs text-muted-foreground">
              {t("poweredBy")}
            </div>
          </div>
        </Container>
      </section>

      {/* Chat Interface */}
      <div className="flex-1">
        <Container className="h-full py-0">
          <div className="mx-auto h-[calc(100vh-12rem)] max-w-3xl">
            <ChatInterface />
          </div>
        </Container>
      </div>
    </div>
  );
}
