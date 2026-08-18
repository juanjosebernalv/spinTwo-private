# Static Images

Place all static image assets used across the application in this folder
(or in subfolders here, e.g. `images/icons`, `images/team`,
`images/case-studies`).

Everything under `public/` is served from the site root, so any file placed
here is reachable from anywhere in the app via an absolute path:

```
public/images/hero-banner.png  ->  /images/hero-banner.png
```

## Usage in components

Prefer the Next.js `Image` component for automatic optimization:

```tsx
import Image from "next/image";

<Image
  src="/images/hero-banner.png"
  alt="Description of the image"
  width={1200}
  height={600}
/>;
```

## Conventions

- Use lowercase, kebab-case file names (e.g. `team-photo.jpg`).
- Prefer modern formats (`webp`, `avif`) where possible for smaller payloads.
- Group related assets in subfolders instead of dumping everything at the
  top level (e.g. `images/logos`, `images/backgrounds`).
