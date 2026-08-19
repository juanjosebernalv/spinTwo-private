import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Inter } from "next/font/google";
import localFont from "next/font/local";

import "./globals.css";

import { Layout } from "@/components/layout/Layout";
import { Providers } from "@/components/providers/Providers";
import en from "@/locales/en.json";
import { DEFAULT_LOCALE } from "@/types/i18n";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const impact = localFont({
  src: "./fonts/impact.woff",
  variable: "--font-impact",
  display: "swap",
  weight: "400",
});

export const metadata: Metadata = {
  title: en.pages.home.meta.title,
  description: en.pages.home.meta.description,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang={DEFAULT_LOCALE}
      suppressHydrationWarning
      className={`${inter.variable} ${impact.variable} h-full antialiased`}
    >
      <body className="min-h-full">
        <Providers initialLocale={DEFAULT_LOCALE}>
          <Layout>{children}</Layout>
        </Providers>
      </body>
    </html>
  );
}
