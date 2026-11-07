# Vidya Pragati Setu — Responsive Desktop + Android Website

This project keeps the approved desktop experience and the approved Android-mobile experience in one Vite/React project, with separate component trees selected by the CSS viewport width.

## Responsive composition

- **Desktop (1024 CSS px and wider):** `src/desktop/app.tsx` and the matching `src/desktop/components/`, `src/desktop/data/`, and `src/desktop/lib/` preserve the desktop source project, including its rounded pill-style sticky navbar, original hero, single frosted-glass metrics strip, desktop sections, and footer.
- **Mobile/tablet (below 1024 CSS px):** `src/MobileApp.tsx` uses the mobile-specific components in `src/components/`, including the compact rounded sticky header, drawer navigation, mobile hero with a single floating metric, schemes/detail flow, eligibility checker, process steps, application-status guidance, resources, and dark accordion footer.
- **Viewport switch:** `src/app.tsx` listens to `(min-width: 1024px)` and mounts only one tree at a time. This avoids duplicate page IDs and prevents the mobile layout from replacing desktop markup at a wide viewport.

The approved palette remains forest green `#24523F`, sage `#E5EBDD`, vanilla cream `#F6F1E7`, saffron `#FA9231`, charcoal `#302F28`, warm ivory `#FFFCF7`, muted text `#57564F`, and warm border `#DCD2C1`. English uses Manrope; Gujarati uses Anek Gujarati.

## Install and run

Use Node.js 24 LTS or another currently supported LTS release. From the project root:

```bash
npm ci
npm run typecheck
npm run build
npm run dev
```

Vite prints the local URL after startup. Resize the browser viewport or use DevTools device emulation to check the responsive switch. At 390px, the mobile tree should appear. At 1280px or wider, the desktop tree should appear.

## Production validation

Before deploying to Vercel, run `npm ci`, `npm run typecheck`, and `npm run build`. The `typecheck` command checks both TypeScript project references; `build` runs the type check before producing the Vite `dist/` output.


Vidya Pragati Setu is an independent student-information website. The eligibility checker provides preliminary guidance only. The website does not authenticate users, submit applications, process payments, upload documents or retrieve live application status from government systems. Users must verify scheme details and complete official application processes through the responsible government department.

Six policy pages are available at `/policies/privacy-policy`, `/policies/terms-and-conditions`, `/policies/cookie-policy`, `/policies/disclaimer`, `/policies/hyperlink-policy`, and `/policies/content-archival-policy`. Before enabling personal-data collection or account services, the operator must publish its legal identity and monitored privacy/grievance contact details and review the policies against the actual deployment and applicable law.
