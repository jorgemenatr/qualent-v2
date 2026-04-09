import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { Container } from "./container";
import { getTranslations } from "next-intl/server";

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

  return (
    <footer className="border-t border-border bg-muted/30">
      <Container className="py-12 md:py-16">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1 flex items-center justify-center md:justify-start">
            <Link href="/" className="inline-block">
              <Image
                src="/logo.png"
                alt={t("logoAlt")}
                width={200}
                height={200}
                className="h-40 w-auto"
              />
            </Link>
          </div>

          {/* Process */}
          <div>
            <h3 className="text-sm font-semibold">{t("processSectionTitle")}</h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.process.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-sm font-semibold">{t("resourcesSectionTitle")}</h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold">{t("companySectionTitle")}</h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 border-t border-border pt-8">
          <p className="text-center text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} {t("copyright")}
          </p>
        </div>
      </Container>
    </footer>
  );
}
