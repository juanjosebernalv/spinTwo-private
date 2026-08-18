# SpinTwo Website

A responsive, multilingual, theme-aware marketing site built with
[Next.js](https://nextjs.org) (App Router) and TypeScript.

## Stack & Requirements Coverage

| Requirement | Implementation |
| --- | --- |
| Responsive | Tailwind CSS v4 utility classes throughout |
| Dark / light theme | [`next-themes`](https://github.com/pacocoursey/next-themes), toggle in the header, respects OS preference by default |
| ESLint + Prettier | `eslint.config.mjs` (Next.js core-web-vitals + TypeScript rules) with `eslint-config-prettier` to avoid rule conflicts; `.prettierrc.json` / `.prettierignore` |
| Multilanguage (JSON, no hardcoded content) | `src/locales/en.json` and `src/locales/es.json`, served via `LanguageContext` + `useTranslation()`; language persists via cookie + localStorage, no URL prefix |
| Static images folder | `public/images` (served from `/images/...` anywhere in the app) |
| TypeScript | Strict mode enabled in `tsconfig.json` |
| Shared components | `Header`, `Navbar`, `Footer`, `Layout`, `Hero`, `CTA` in `src/components` |
| Jest tests | `jest.config.ts` (via `next/jest`) + React Testing Library; every shared component and every page has a test file |
| Routes | `/`, `/about-us`, `/contact-us`, `/products`, `/services`, `/case-studies`, `/industries`, `/resources` |

## Getting Started

```bash
yarn install
yarn dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command | Description |
| --- | --- |
| `yarn dev` | Start the development server |
| `yarn build` | Production build |
| `yarn start` | Run the production build |
| `yarn lint` | Run ESLint |
| `yarn lint:fix` | Run ESLint with autofix |
| `yarn format` | Format the project with Prettier |
| `yarn format:check` | Check formatting without writing changes |
| `yarn test` | Run the Jest test suite |
| `yarn test:watch` | Run tests in watch mode |
| `yarn test:coverage` | Run tests with a coverage report |

## Project Structure

```
src/
  app/                  Route segments (App Router) - one folder per page
  components/
    layout/             Header, Navbar, Footer, Layout (shared shell)
    Hero/                Shared hero banner
    CTA/                 Shared call-to-action banner
    ItemGrid/            Shared card grid used by content pages
    ThemeToggle/         Dark/light theme switch
    LanguageToggle/      Language switch (en/es)
    providers/           App-wide context providers (theme + language)
  context/               LanguageContext (i18n state)
  hooks/                 useTranslation, useMounted
  locales/               en.json / es.json - all UI copy lives here
  types/                 Shared TypeScript types (e.g. Locale)
public/
  images/                Static image assets, served from `/images/...`
```

## Internationalization

All UI copy is sourced from `src/locales/en.json` and `src/locales/es.json`.
Components must never hardcode user-facing text - instead, read it from the
active dictionary via:

```tsx
import { useTranslation } from "@/hooks/useTranslation";

function Example() {
  const { t } = useTranslation();
  return <h1>{t.pages.home.hero.title}</h1>;
}
```

The language switch (top navigation) updates the active locale without
changing the URL. The chosen locale is stored in a cookie so the correct
language renders on the very first server-rendered response on subsequent
visits, and mirrored to `localStorage` as a fallback.

To add a new language:

1. Duplicate `src/locales/en.json` (e.g. to `fr.json`) and translate every
   value - keep the keys identical.
2. Register the new locale in `src/types/i18n.ts` (`SUPPORTED_LOCALES`).
3. Import and register the dictionary in `src/context/LanguageContext.tsx`
   and `src/app/layout.tsx`.

## Theming

Dark/light mode is powered by `next-themes` with the `class` strategy.
Color tokens are defined as CSS variables in `src/app/globals.css`
(`:root` for light, `.dark` for dark) and mapped into Tailwind's `@theme`
so `bg-background`, `text-foreground`, etc. automatically adapt.

## Images

Add static assets to `public/images` (see `public/images/README.md`).
Anything placed there is reachable from any component via an absolute path
such as `/images/your-file.png`, and should be rendered with
`next/image` for automatic optimization.

## Testing

Every shared component (`Hero`, `CTA`, `ItemGrid`, `ThemeToggle`,
`LanguageToggle`, `Navbar`, `Header`, `Footer`, `Layout`) and every route
page has a corresponding `*.test.tsx` file colocated next to it, using
Jest + React Testing Library. Run `yarn test` to execute the full suite.

## Notes

- The contact form on `/contact-us` currently only simulates a successful
  submission on the client. Wire its `handleSubmit` in
  `src/app/contact-us/page.tsx` up to your contact API endpoint when it is
  available.
- Fonts intentionally use the system font stack (no external Google Fonts
  request at build time) to keep builds fast and reliable in any network
  environment. Swap in `next/font` if you want a custom webfont.
