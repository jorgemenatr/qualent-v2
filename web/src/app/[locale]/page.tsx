import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Section, SectionHead } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Eyebrow, Figure, Stamp, MascotWatermark } from "@/components/brand";
import { getAllContent } from "@/lib/content";
import { getTranslations, setRequestLocale } from "next-intl/server";

const clientLogos = [
  { name: "Kroger", src: "/clients/kroger.svg", width: 120, height: 40 },
  { name: "Anaconda", src: "/clients/anaconda.svg", width: 140, height: 40 },
  { name: "CBTS", src: "/clients/cbts.webp", width: 100, height: 40, invert: true },
  { name: "Stacking Projects", src: "/clients/stacking-projects.png", width: 140, height: 40, invert: true },
  { name: "REPS", src: "/clients/reps.jpeg", width: 100, height: 40 },
  { name: "Torq Logistics", src: "/clients/torq-logistics.svg", width: 120, height: 40 },
  { name: "Buffalo Rail", src: "/clients/buffalo-rail.svg", width: 160, height: 40 },
];

const serviceLinks = [
  "/services/research",
  "/services/implementation",
  "/services/partnership",
];

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("HomePage");
  const caseStudies = getAllContent("case-studies").slice(0, 3);

  const whyNow = [1, 2, 3, 4, 5, 6].map((n) => ({
    title: t(`whyNowCard${n}Title` as "whyNowCard1Title"),
    text: t(`whyNowCard${n}Text` as "whyNowCard1Text"),
  }));

  const dontDo = [1, 2, 3, 4, 5].map((n) =>
    t(`whatWeDontDoItem${n}` as "whatWeDontDoItem1")
  );

  const actuallyDo = [1, 2, 3].map((n) => ({
    title: t(`whatWeActuallyDoCard${n}Title` as "whatWeActuallyDoCard1Title"),
    text: t(`whatWeActuallyDoCard${n}Text` as "whatWeActuallyDoCard1Text"),
    href: serviceLinks[n - 1],
  }));

  const risks = [
    { title: t("riskOperationalTitle"), text: t("riskOperationalText") },
    { title: t("riskPeopleTitle"), text: t("riskPeopleText") },
    { title: t("riskCompetitiveTitle"), text: t("riskCompetitiveText") },
  ];

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border py-[clamp(64px,10vw,128px)]">
        <MascotWatermark />
        <div className="pl-container relative grid justify-items-center gap-7 text-center">
          <Eyebrow>{t("heroEyebrow")}</Eyebrow>
          <h1 className="pl-display max-w-[900px]">
            {t("heroLine1")}{" "}
            <span className="text-pickle">{t("heroProblems")} {t("heroLine2")}</span>{" "}
            {t("heroLine3")}{" "}
            <span className="text-pickle">{t("heroCheaperToFix")}</span>{" "}
            {t("heroLine4")}
          </h1>
          <p className="pl-lede max-w-[560px] text-ink-muted">{t("heroSubLine1")}</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button size="lg" asChild>
              <Link href="/talk">
                {t("heroCtaPrimary")} <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="#guarantee">{t("heroCtaSecondary")}</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Client logos */}
      <section className="border-t border-border py-10">
        <div className="pl-container">
          <p className="mb-6 text-center text-[13px] text-ink-muted">
            {t("clientLogosLabelShort")}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-11 gap-y-6">
            {clientLogos.map((logo) => (
              <Image
                key={logo.name}
                src={logo.src}
                alt={logo.name}
                width={logo.width}
                height={logo.height}
                className={`h-8 w-auto object-contain opacity-70 grayscale transition duration-[var(--dur-base)] hover:opacity-100 hover:grayscale-0 ${
                  logo.invert ? "invert" : ""
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* The guarantee — the one loud lime band on the page */}
      <Section id="guarantee" tone="loud">
        <div className="grid justify-items-center gap-3 text-center">
          <Eyebrow className="text-pickle-deep">{t("guaranteeTitle")}</Eyebrow>
          <p className="max-w-[760px] text-[clamp(2rem,4vw,3.25rem)] font-black leading-[1.05] tracking-[-0.02em] text-pickle-deep text-balance">
            {t("guaranteeHeadline")}
          </p>
          <p className="max-w-[520px] text-[17px] text-pickle-deep">
            {t("guaranteeLine1")} {t("guaranteeLine2")}
          </p>
        </div>
      </Section>

      {/* Why this is possible now */}
      <Section>
        <SectionHead eyebrow={t("whyNowTitle")} title={t("whyNowSubtitle")} />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {whyNow.map((item, i) => (
            <div
              key={item.title}
              className="flex flex-col gap-3 rounded-xl border border-border bg-white p-6"
            >
              <Eyebrow tone="muted">{String(i + 1).padStart(2, "0")}</Eyebrow>
              <h3 className="pl-h3">{item.title}</h3>
              <p className="text-[15px] leading-normal text-ink-muted">{item.text}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* What we don't do + the promise label */}
      <Section tone="subtle">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div className="grid gap-4">
            <Eyebrow>{t("whatWeDontDoTitle")}</Eyebrow>
            <h2 className="pl-h2">{t("whatWeDontDoSubtitle")}</h2>
            <ul className="grid gap-2.5">
              {dontDo.map((item) => (
                <li key={item} className="flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
                  <Eyebrow className="text-coral">{t("whatWeDontDoPrefix")}</Eyebrow>
                  <span className="text-base">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="pl-label-card p-8">
            <div className="grid gap-3">
              <Eyebrow>{t("ourPromiseTitle")}</Eyebrow>
              <p className="text-base text-ink-muted">
                {t("ourPromiseLine1")} {t("ourPromiseLine2")}
              </p>
              <p className="text-2xl font-bold text-pickle">{t("ourPromisePrice")}</p>
              <div>
                <Button variant="secondary" asChild>
                  <Link href="/services">{t("ourPromiseCta")}</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Three ways in */}
      <Section>
        <SectionHead
          eyebrow={t("whatWeActuallyDoTitle")}
          title={t("whatWeActuallyDoHeadline")}
        />
        <div className="grid gap-4 md:grid-cols-3">
          {actuallyDo.map((item) => (
            <div
              key={item.title}
              className="flex flex-col gap-3 rounded-xl bg-lime-soft p-6"
            >
              <h3 className="pl-h3">{item.title}</h3>
              <p className="text-[15px] leading-normal text-ink-muted">{item.text}</p>
              <Link
                href={item.href}
                className="mt-auto inline-flex items-center gap-1.5 pt-2 text-sm font-semibold text-pickle-deep hover:underline"
              >
                {t("learnMore")} <ArrowRight className="size-4" />
              </Link>
            </div>
          ))}
        </div>
      </Section>

      {/* Real results */}
      <Section tone="subtle">
        <SectionHead
          eyebrow={t("realResultsTitle")}
          title={t("realResultsHeadline")}
          sub={t("realResultsSub")}
        />
        <div className="grid gap-4 md:grid-cols-3">
          {caseStudies.map((study) => {
            const headline = study.meta.metrics?.[0];
            return (
              <div
                key={study.slug}
                className="flex flex-col gap-4 rounded-xl border border-border bg-white p-6"
              >
                <Eyebrow tone="muted">
                  {study.meta.client || study.meta.industry}
                </Eyebrow>
                <h3 className="pl-h3">{study.meta.title}</h3>
                {headline ? (
                  <Figure
                    value={headline.value}
                    label={headline.label}
                    valueClassName="text-[2.125rem]"
                  />
                ) : null}
                <p className="text-[15px] leading-normal text-ink-muted">
                  {study.meta.result || study.meta.description}
                </p>
                <Link
                  href={`/proof/${study.slug}`}
                  className="mt-auto inline-flex items-center gap-1.5 pt-2 text-sm font-semibold text-pickle-deep hover:underline"
                >
                  {t("readCaseStudy")} <ArrowRight className="size-4" />
                </Link>
              </div>
            );
          })}
        </div>
        <div className="mt-8 text-center">
          <Button variant="outline" asChild>
            <Link href="/proof">
              {t("viewAllCaseStudies")} <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
      </Section>

      {/* What you're risking */}
      <Section>
        <SectionHead eyebrow={t("risksTitle")} title={t("risksSubtitle")} />
        <div className="grid gap-4 md:grid-cols-3">
          {risks.map((risk) => (
            <div
              key={risk.title}
              className="flex flex-col items-start gap-3 rounded-xl border border-border bg-white p-6"
            >
              <Stamp>{t("riskStamp")}</Stamp>
              <h3 className="pl-h3">{risk.title}</h3>
              <p className="text-[15px] leading-normal text-ink-muted">{risk.text}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Closing CTA */}
      <Section tone="inverse">
        <div className="mx-auto grid max-w-[600px] justify-items-center gap-4 text-center">
          <Eyebrow tone="lime">{t("ctaTitle")}</Eyebrow>
          <h2 className="text-[clamp(1.75rem,1.2rem+2vw,2.25rem)] font-bold leading-snug tracking-[-0.015em] text-white text-balance">
            {t("ctaLine1")}
          </h2>
          <p className="text-[17px] leading-relaxed text-llama">
            {t("ctaLine2")} {t("ctaLine3")}
          </p>
          <Button size="lg" variant="secondary" asChild>
            <Link href="/talk">
              {t("ctaButton")} <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
      </Section>
    </>
  );
}
