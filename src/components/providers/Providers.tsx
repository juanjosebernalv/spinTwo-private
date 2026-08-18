"use client";

import { ThemeProvider } from "next-themes";
import type { ReactNode } from "react";

import { LanguageProvider } from "@/context/LanguageContext";
import type { Locale } from "@/types/i18n";

interface ProvidersProps {
  children: ReactNode;
  initialLocale: Locale;
}

export function Providers({ children, initialLocale }: ProvidersProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <LanguageProvider initialLocale={initialLocale}>
        {children}
      </LanguageProvider>
    </ThemeProvider>
  );
}
