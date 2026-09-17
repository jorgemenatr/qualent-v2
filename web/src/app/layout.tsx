import { Source_Sans_3, Oswald, IBM_Plex_Mono, Archivo } from "next/font/google";
import Script from "next/script";
import "./globals.css";

/* Source Sans 3 stands in for the Myriad Pro used in the label artwork,
   Oswald for its condensed caps. Swap for licensed faces when they arrive. */
const sourceSans = Source_Sans_3({
  variable: "--font-source-sans",
  subsets: ["latin"],
  weight: ["400", "600", "700", "900"],
  style: ["normal", "italic"],
  display: "swap",
});

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

/* The Daily Llama's reporting register. Archivo is a variable face with a
   width axis, so the nameplate and headlines condense without a second
   typeface — the newspaper look comes from stretch, not from a serif. */
const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  axes: ["wdth"],
  style: ["normal", "italic"],
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    /* The font variables have to land on <html>, not <body>: the --type-*
       tokens in globals.css are declared on :root and a var() inside a custom
       property is substituted where it is declared, not where it is used. On
       <body> they resolve to the generic fallbacks. */
    <html
      suppressHydrationWarning
      style={{ colorScheme: "light" }}
      className={`${sourceSans.variable} ${oswald.variable} ${plexMono.variable} ${archivo.variable}`}
    >
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
        className="antialiased min-h-screen flex flex-col"
      >
        {children}
      </body>
    </html>
  );
}
