import { Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";
import { Mascot } from "@/components/brand";

export async function Footer() {
  const t = await getTranslations("Footer");

  const footerLinks = {
    process: [
      { name: t("processFirstMeeting"), href: "/services/understanding" },
      { name: t("processResearchReport"), href: "/services/research" },
      { name: t("processProblemIdentification"), href: "/services/problem-identification" },
      { name: t("processImplementation"), href: "/services/implementation" },
      { name: t("processPartnership"), href: "/services/partnership" },
    ],
    resources: [
      { name: t("resourcesLearn"), href: "/learn" },
      { name: t("resourcesPricing"), href: "/pricing" },
      { name: t("resourcesOpinions"), href: "/controversial-opinions" },
      { name: t("resourcesProof"), href: "/proof" },
      { name: t("resourcesThunkBox"), href: "/thunkbox" },
    ],
    company: [
      { name: t("companyAbout"), href: "/about" },
      { name: t("companyWhoWeWorkWith"), href: "/who-we-work-with" },
      { name: t("companyCareers"), href: "/careers" },
      { name: t("companyContact"), href: "/talk" },
      { name: t("companyPrivacy"), href: "/privacy" },
      { name: t("companyTerms"), href: "/terms" },
    ],
  };

  const columns = [
    { title: t("processSectionTitle"), links: footerLinks.process },
    { title: t("resourcesSectionTitle"), links: footerLinks.resources },
    { title: t("companySectionTitle"), links: footerLinks.company },
  ];

  return (
    <footer className="border-t border-border bg-paper-deep">
      <div className="pl-container grid gap-10 pb-8 pt-14 md:grid-cols-[1.2fr_1fr_1fr_1fr]">
        <div>
          <Link href="/" className="inline-block" aria-label={t("logoAlt")}>
            <Mascot variant="full" size={150} />
          </Link>
        </div>

        {columns.map((col) => (
          <div key={col.title}>
            <h3 className="mb-3.5 text-sm font-bold text-ink">{col.title}</h3>
            <ul className="grid gap-2.5">
              {col.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-ink-muted transition-colors hover:text-ink hover:underline"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="pl-container">
        <div className="flex flex-wrap items-center justify-between gap-2 border-t border-border py-6 text-[13px] text-ink-muted">
          <span>
            &copy; {new Date().getFullYear()} {t("copyright")}
          </span>
          <span>{t("tagline")}</span>
        </div>
      </div>
    </footer>
  );
}
