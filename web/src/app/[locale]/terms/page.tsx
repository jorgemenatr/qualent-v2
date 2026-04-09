import { getTranslations, setRequestLocale } from "next-intl/server";
import { Container } from "@/components/layout";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Terms" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  };
}

export default async function TermsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Terms");

  return (
    <section className="py-20">
      <Container size="small">
        <h1 className="text-4xl font-bold tracking-tight">{t("heading")}</h1>
        <p className="mt-4 text-muted-foreground">{t("lastUpdated")}</p>

        <div className="prose prose-neutral mt-12 max-w-none dark:prose-invert">
          <p>{t("intro")}</p>

          <h2>{t("acceptanceHeading")}</h2>
          <p>{t("acceptanceDescription")}</p>

          <h2>{t("descriptionHeading")}</h2>
          <p>{t("descriptionDescription")}</p>

          <h2>{t("accountsHeading")}</h2>
          <h3>{t("accountCreationHeading")}</h3>
          <p>{t("accountCreationDescription")}</p>
          <ul>
            <li>{t("accountCreation1")}</li>
            <li>{t("accountCreation2")}</li>
            <li>{t("accountCreation3")}</li>
            <li>{t("accountCreation4")}</li>
          </ul>

          <h3>{t("accountTerminationHeading")}</h3>
          <p>{t("accountTerminationDescription")}</p>

          <h2>{t("acceptableUseHeading")}</h2>
          <p>{t("acceptableUseDescription")}</p>
          <ul>
            <li>{t("acceptableUse1")}</li>
            <li>{t("acceptableUse2")}</li>
            <li>{t("acceptableUse3")}</li>
            <li>{t("acceptableUse4")}</li>
            <li>{t("acceptableUse5")}</li>
            <li>{t("acceptableUse6")}</li>
            <li>{t("acceptableUse7")}</li>
            <li>{t("acceptableUse8")}</li>
          </ul>

          <h2>{t("ipHeading")}</h2>
          <h3>{t("ourContentHeading")}</h3>
          <p>{t("ourContentDescription")}</p>

          <h3>{t("yourContentHeading")}</h3>
          <p>{t("yourContentDescription")}</p>

          <h3>{t("feedbackHeading")}</h3>
          <p>{t("feedbackDescription")}</p>

          <h2>{t("thirdPartyHeading")}</h2>
          <p>{t("thirdPartyDescription")}</p>

          <h2>{t("consultingHeading")}</h2>
          <p>{t("consultingDescription")}</p>

          <h2>{t("feesHeading")}</h2>
          <p>{t("feesDescription")}</p>

          <h2>{t("disclaimerHeading")}</h2>
          <p>{t("disclaimerDescription1")}</p>
          <p>{t("disclaimerDescription2")}</p>

          <h2>{t("liabilityHeading")}</h2>
          <p>{t("liabilityDescription")}</p>
          <ul>
            <li>{t("liability1")}</li>
            <li>{t("liability2")}</li>
            <li>{t("liability3")}</li>
            <li>{t("liability4")}</li>
          </ul>
          <p>{t("liabilityTotal")}</p>

          <h2>{t("indemnificationHeading")}</h2>
          <p>{t("indemnificationDescription")}</p>

          <h2>{t("governingLawHeading")}</h2>
          <p>{t("governingLawDescription")}</p>

          <h2>{t("disputeHeading")}</h2>
          <p>{t("disputeDescription")}</p>

          <h2>{t("changesToTermsHeading")}</h2>
          <p>{t("changesToTermsDescription")}</p>

          <h2>{t("severabilityHeading")}</h2>
          <p>{t("severabilityDescription")}</p>

          <h2>{t("entireAgreementHeading")}</h2>
          <p>{t("entireAgreementDescription")}</p>

          <h2>{t("contactHeading")}</h2>
          <p>{t("contactDescription")}</p>
          <p>
            <strong>{t("emailLabel")}</strong>{" "}
            <a href="mailto:legal@picklellama.studio">legal@picklellama.studio</a>
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
