import { render, type RenderOptions } from "@testing-library/react";
import { ThemeProvider } from "next-themes";
import type { ReactElement, ReactNode } from "react";

import { LanguageProvider } from "@/context/LanguageContext";

function AllProviders({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider attribute="class" enableSystem>
      <LanguageProvider initialLocale="en">{children}</LanguageProvider>
    </ThemeProvider>
  );
}

/**
 * Custom render that wraps components under test with the app's
 * LanguageProvider, so any component relying on `useTranslation` works
 * out of the box in tests.
 */
function customRender(
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">,
) {
  return render(ui, { wrapper: AllProviders, ...options });
}

export * from "@testing-library/react";
export { customRender as render };
