"use client";

import { useTranslation } from "@/hooks/useTranslation";
import { SUPPORTED_LOCALES, type Locale } from "@/types/i18n";

/**
 * Lets the user switch the active language. Backed entirely by the
 * dictionaries in `src/locales` - no UI copy is hardcoded here.
 */
export function LanguageToggle() {
  const { locale, setLocale, t } = useTranslation();

  return (
    <label className="inline-flex items-center gap-2 text-sm">
      <span className="sr-only">{t.common.languageToggle.label}</span>
      <select
        value={locale}
        onChange={(event) => setLocale(event.target.value as Locale)}
        aria-label={t.common.languageToggle.label}
        className="cursor-pointer rounded-full border border-black/10 bg-transparent px-3 py-1.5 text-sm text-current outline-none transition-colors hover:bg-black/5 dark:border-white/15 dark:hover:bg-white/10"
      >
        {SUPPORTED_LOCALES.map((code) => (
          <option key={code} value={code}>
            {t.common.languageToggle[
              code as keyof typeof t.common.languageToggle
            ] ?? code.toUpperCase()}
          </option>
        ))}
      </select>
    </label>
  );
}
