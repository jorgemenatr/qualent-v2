import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import { Header, Footer } from "@/components/layout";
import { Providers } from "@/components/providers";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "PickleLlama | AI & Automation Consulting",
    template: "%s | PickleLlama",
  },
  description:
    "Prototype in days, launch in weeks. AI and automation consulting for mid-market companies.",
  keywords: [
    "AI consulting",
    "automation",
    "custom software",
    "prototyping",
    "mid-market",
  ],
  authors: [{ name: "PickleLlama" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://picklellama.studio",
    siteName: "PickleLlama",
    title: "PickleLlama | AI & Automation Consulting",
    description:
      "Prototype in days, launch in weeks. AI and automation consulting for mid-market companies.",
  },
  twitter: {
    card: "summary_large_image",
    title: "PickleLlama | AI & Automation Consulting",
    description:
      "Prototype in days, launch in weeks. AI and automation consulting for mid-market companies.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning style={{ colorScheme: "light" }}>
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-L5F4GWF2JN"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-L5F4GWF2JN');
          `}
        </Script>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <Providers>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
