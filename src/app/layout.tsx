import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { cookies } from "next/headers";

import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

import { Layout } from "@/components/layout/Layout";
import { Providers } from "@/components/providers/Providers";
import en from "@/locales/en.json";
import es from "@/locales/es.json";
import { DEFAULT_LOCALE, isLocale, type Locale } from "@/types/i18n";

const DICTIONARIES: Record<Locale, typeof en> = { en, es };
const LOCALE_COOKIE_NAME = "NEXT_LOCALE";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getInitialLocale();
  const { title, description } = DICTIONARIES[locale].pages.home.meta;

  return { title, description };
}

async function getInitialLocale(): Promise<Locale> {
  const cookieStore = await cookies();
  const cookieValue = cookieStore.get(LOCALE_COOKIE_NAME)?.value;
  return isLocale(cookieValue) ? cookieValue : DEFAULT_LOCALE;
}

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const initialLocale = await getInitialLocale();

  return (
    <html
      lang={initialLocale}
      suppressHydrationWarning
      className={`${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full">
        <Providers initialLocale={initialLocale}>
          <Layout>{children}</Layout>
        </Providers>
      </body>
    </html>
  );
}
