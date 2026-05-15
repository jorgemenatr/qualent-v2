import { setRequestLocale } from "next-intl/server";
import { PortfolioCompass } from "@/components/tools";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  await params;
  return {
    title: "AI Portfolio Compass",
    description:
      "Map your AI activity against your actual business objectives. A worksheet for leaders running AI portfolios.",
  };
}

const printStyles = `
  @media print {
    header, footer { display: none !important; }
    .no-print { display: none !important; }
    main { padding-bottom: 1rem !important; }
    body { background: white !important; }
  }
`;

export default async function CompassPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <>
      <style>{printStyles}</style>
      <PortfolioCompass />
    </>
  );
}
