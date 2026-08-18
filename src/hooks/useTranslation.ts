"use client";

import { useLanguage } from "@/context/LanguageContext";

/**
 * Provides access to the active locale's dictionary along with helpers to
 * read and change the current language. All copy in the app must be sourced
 * from this hook (backed by the JSON dictionaries in `src/locales`) instead
 * of hardcoded strings, so the entire application stays translatable.
 */
export function useTranslation() {
  const { locale, dictionary, setLocale } = useLanguage();

  return {
    t: dictionary,
    locale,
    setLocale,
  };
}
