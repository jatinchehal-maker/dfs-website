import type { Metadata, Viewport } from "next";
import { Archivo, Big_Shoulders } from "next/font/google";
import "./globals.css";
import Header from "@/components/sections/Header";
import Footer from "@/components/sections/Footer";
import { SITE } from "@/content/site";
import Translator from "@/components/Translator";
import { LANG_BOOT_SCRIPT } from "@/i18n/language";

const archivo = Archivo({ variable: "--font-archivo", subsets: ["latin"], weight: ["400", "500", "600", "700"] });
const bigShoulders = Big_Shoulders({ variable: "--font-big-shoulders", subsets: ["latin"], weight: ["700", "800", "900"] });

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: `${SITE.name} | Warehouse, packaging & distribution crews in Laval and Montreal`, template: `%s — ${SITE.shortName}` },
  description: SITE.description,
  openGraph: {
    type: "website", siteName: SITE.name, title: SITE.name, description: SITE.description,
    url: "/", locale: "en_CA", images: [{ url: "/brand/flyer.jpg", alt: "Delta Facilities Solutions flyer" }],
  },
  twitter: { card: "summary_large_image", title: SITE.name, description: SITE.description, images: ["/brand/flyer.jpg"] },
};

export const viewport: Viewport = { themeColor: "#000000" };

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" suppressHydrationWarning className={`${archivo.variable} ${bigShoulders.variable} h-full antialiased`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: LANG_BOOT_SCRIPT }} />
      </head>
      <body className="flex min-h-full flex-col font-sans">
        <Translator />
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded focus:bg-white focus:px-4 focus:py-2 focus:font-semibold">Skip to content</a>
        <Header />
        <main id="main" className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
