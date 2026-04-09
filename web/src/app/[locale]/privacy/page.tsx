import { getTranslations, setRequestLocale } from "next-intl/server";
import { Container } from "@/components/layout";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Privacy" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  };
}

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Privacy");

  return (
    <section className="py-20">
      <Container size="small">
        <h1 className="text-4xl font-bold tracking-tight">{t("heading")}</h1>
        <p className="mt-4 text-muted-foreground">{t("lastUpdated")}</p>

        <div className="prose prose-neutral mt-12 max-w-none dark:prose-invert">
          <p>{t("intro")}</p>

          <h2>{t("infoCollectHeading")}</h2>

          <h3>{t("infoProvideHeading")}</h3>
          <p>{t("infoProvideDescription")}</p>
          <ul>
            <li>
              <strong>{t("accountInfoLabel")}</strong> {t("accountInfoDescription")}
            </li>
            <li>
              <strong>{t("contactInfoLabel")}</strong> {t("contactInfoDescription")}
            </li>
            <li>
              <strong>{t("userContentLabel")}</strong> {t("userContentDescription")}
            </li>
          </ul>

          <h3>{t("autoCollectHeading")}</h3>
          <p>{t("autoCollectDescription")}</p>
          <ul>
            <li>{t("autoCollectBrowser")}</li>
            <li>{t("autoCollectOS")}</li>
            <li>{t("autoCollectPages")}</li>
            <li>{t("autoCollectReferring")}</li>
            <li>{t("autoCollectIP")}</li>
          </ul>

          <h2>{t("howWeUseHeading")}</h2>
          <p>{t("howWeUseDescription")}</p>
          <ul>
            <li>{t("howWeUse1")}</li>
            <li>{t("howWeUse2")}</li>
            <li>{t("howWeUse3")}</li>
            <li>{t("howWeUse4")}</li>
            <li>{t("howWeUse5")}</li>
            <li>{t("howWeUse6")}</li>
          </ul>

          <h2>{t("googleOAuthHeading")}</h2>
          <p>{t("googleOAuthDescription")}</p>
          <ul>
            <li>{t("googleOAuth1")}</li>
            <li>{t("googleOAuth2")}</li>
            <li>{t("googleOAuth3")}</li>
            <li>
              {t("googleOAuth4")}{" "}
              <a
                href="https://myaccount.google.com/permissions"
                target="_blank"
                rel="noopener noreferrer"
              >
                {t("googleOAuth4Link")}
              </a>
            </li>
          </ul>

          <h2>{t("sharingHeading")}</h2>
          <p>{t("sharingDescription")}</p>
          <ul>
            <li>
              <strong>{t("sharingProvidersLabel")}</strong> {t("sharingProvidersDescription")}
            </li>
            <li>
              <strong>{t("sharingLegalLabel")}</strong> {t("sharingLegalDescription")}
            </li>
            <li>
              <strong>{t("sharingTransfersLabel")}</strong> {t("sharingTransfersDescription")}
            </li>
          </ul>

          <h2>{t("retentionHeading")}</h2>
          <p>{t("retentionDescription")}</p>

          <h2>{t("securityHeading")}</h2>
          <p>{t("securityDescription")}</p>
          <ul>
            <li>{t("security1")}</li>
            <li>{t("security2")}</li>
            <li>{t("security3")}</li>
            <li>{t("security4")}</li>
          </ul>
          <p>{t("securityDisclaimer")}</p>

          <h2>{t("rightsHeading")}</h2>
          <p>{t("rightsDescription")}</p>
          <ul>
            <li>{t("rights1")}</li>
            <li>{t("rights2")}</li>
            <li>{t("rights3")}</li>
            <li>{t("rights4")}</li>
            <li>{t("rights5")}</li>
          </ul>
          <p>{t("rightsContact")}</p>

          <h2>{t("cookiesHeading")}</h2>
          <p>{t("cookiesDescription")}</p>

          <h2>{t("childrenHeading")}</h2>
          <p>{t("childrenDescription")}</p>

          <h2>{t("internationalHeading")}</h2>
          <p>{t("internationalDescription")}</p>

          <h2>{t("changesHeading")}</h2>
          <p>{t("changesDescription")}</p>

          <h2>{t("contactHeading")}</h2>
          <p>{t("contactDescription")}</p>
          <p>
            <strong>{t("emailLabel")}</strong>{" "}
            <a href="mailto:privacy@picklellama.studio">
              privacy@picklellama.studio
            </a>
          </p>
          <p>
            <strong>{t("websiteLabel")}</strong>{" "}
            <a href="https://picklellama.studio">picklellama.studio</a>
          </p>
        </div>
      </Container>
    </section>
  );
}
