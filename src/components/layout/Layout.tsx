import type { ReactNode } from "react";

import { ProductAlternatives } from "@/components/ProductAlternatives/ProductAlternatives";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";

interface LayoutProps {
  children: ReactNode;
}

/**
 * Shared page shell composed of the Header (with Navbar) and Footer.
 * Every route renders through this component so navigation, branding,
 * and the theme/language controls stay consistent across the app.
 */
export function Layout({ children }: LayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
