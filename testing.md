# Testing & Quality Assurance (QA) Plan

## Project: Vidya Pragati Setu
**Document Type:** Comprehensive Testing & Verification Specification  
**Quality Focus:** Dual-Tree Viewport Responsiveness, Bilingual Accuracy, Accessibility & Privacy  

---

## 1. Testing Strategy Overview

The testing strategy for Vidya Pragati Setu ensures uncompromising stability across two distinct responsive component trees, complete bilingual fidelity, strict WCAG 2.1 AA accessibility, and total elimination of layout breaks—especially across the sensitive **1280px–1323px** viewport range.

```
       ▲
      / \        [Manual Visual & User Testing]
     /   \       - Screen reader audits (NVDA / VoiceOver)
    /     \      - Cross-device validation (Pixel, iPhone, iPad, Mac, PC)
   /-------\
  /         \    [Automated Component & Layout Verification]
 /           \   - Responsive breakpoint stress testing
/             \  - Eligibility rule regression testing
/---------------\
| Static Checks | [Typecheck & Build Validation]
| & Linters     | - TypeScript compiler (`tsc -b`)
|               | - Vite production bundling with zero warnings
\---------------/
```

---

## 2. Static Analysis & Build Verification

Before any commit or release, the project must cleanly pass:

### 2.1 TypeScript Typecheck
```bash
npm run typecheck
```
- Validates both root and node TypeScript project references (`tsconfig.app.json`, `tsconfig.node.json`).
- Checks strict null checks, prop interfaces, Lucide icon names, and bilingual scheme schemas.
- Must exit with return code `0` and `0` errors.

### 2.2 Production Build Verification
```bash
npm run build
```
- Executes `tsc -b && vite build`.
- Generates minified, tree-shaken static assets in `dist/`.
- Verifies that all dynamic imports, CSS modules, and SVG icon bundles compile within strict budget limits.

---

## 3. Viewport & Device Validation Matrix

The platform must be tested across the following specific viewport categories:

| Target Category | Viewport Width | Mounted Tree | Verification Focus |
|---|---|---|---|
| **Compact Android** | 360px - 390px | `MobileApp.tsx` | Touch target heights (min 44px), drawer animation, single-metric card fit |
| **Standard Mobile** | 390px - 414px | `MobileApp.tsx` | Scheme card padding, search input focus, Gujarati conjunct rendering |
| **Tablet Portrait** | 768px | `MobileApp.tsx` | 2-column mobile grid balance, drawer width constraint |
| **Desktop Switch** | **1023px vs 1024px** | **Switch Point** | Boundary verification: 1023px loads mobile; 1024px cleanly mounts desktop |
| **Narrow Desktop** | **1280px - 1323px** | `desktop/app.tsx` | **Critical check:** Header pill fit, brand subtitle suppression, zero horizontal scroll, metric strip border alignment |
| **Full Desktop** | 1366px - 1440px | `desktop/app.tsx` | 4-column scheme cards, side-by-side eligibility checker |
| **Widescreen** | 1536px - 1920px | `desktop/app.tsx` | Max-width containment (`max-w-desktop`), brand subtitle reappearance |

---

## 4. Functional Test Matrix

### 4.1 Language Switching (`en` <-> `gu`)
- [ ] Toggling language switches `document.documentElement.lang` between `"en"` and `"gu"`.
- [ ] Gujarati typography immediately switches to `'Anek Gujarati'` font with appropriate line-height (`1.65`).
- [ ] Notification toast appears indicating language switch and auto-dismisses after 4.8 seconds.
- [ ] All scheme titles, benefit summaries, eligibility bullets, and document checklists render localized text.
- [ ] Search input placeholders and category tabs update instantaneously.

### 4.2 Search & Scheme Filtering
- [ ] Searching "Scholarship" filters the list to matching grant cards.
- [ ] Searching in Gujarati ("શિષ્યવૃત્તિ" or "સાયકલ") retrieves relevant schemes.
- [ ] Category tabs (`All`, `Scholarships`, `Bicycles`, `Textbooks`, `Other Support`) update card count.
- [ ] Empty state renders when search yields no matches with a working "Reset Filters" CTA.
- [ ] Search dropdown suggestions open on focus, display matching mini-cards, and navigate on click.

### 4.3 3-Step Eligibility Checker
- [ ] **Step 1 (Basic Info):** Select Category, State Domicile, and Family Income. "Continue" advances to Step 2.
- [ ] **Step 2 (Education):** Select Education Level, Institution Type, and Hostel Status. "Check Eligibility" triggers evaluation.
- [ ] **Calculation State:** Displays smooth shimmer skeleton for 400ms.
- [ ] **Step 3 (Results):** Displays qualifying schemes with green badges and non-qualifying schemes with rationale.
- [ ] "Reset" or "Edit Criteria" returns to Step 1 preserving previously selected values.

### 4.4 Modals & Dialogs
- [ ] Clicking "Learn More" on a Scheme Card opens the Scheme Detail Dialog.
- [ ] Clicking "Login" in the header opens the informational Account Access Dialog.
- [ ] Clicking any resource item (e.g., "Document Checklist") opens the Resource Detail Modal.
- [ ] Backdrop click, close button `(X)`, and pressing `Escape` cleanly dismiss the modal.
- [ ] Background body scroll is locked while any modal is active.

### 4.5 Policy Page Navigation
- [ ] Direct navigation to `/policies/privacy-policy` mounts `PolicyPage.tsx` with sidebar links.
- [ ] Browser forward and back buttons navigate between policies via `popstate`.
- [ ] "Back to Home" button returns to the main platform view.

---

## 5. Backend API & Integration Testing (Postman Suite)

Automated and manual backend test collections executed via **Postman**:

### 5.1 Authentication & RBAC Boundary Tests
- [ ] **Clerk JWT Verification:** Request with missing `Authorization: Bearer <token>` header returns `HTTP 401 Unauthorized`.
- [ ] **Expired Token:** Request with an expired or malformed Clerk token returns `HTTP 401`.
- [ ] **RBAC Role Gate - Student:** A student user attempting to call `/api/v1/admin/*` or `/api/v1/institutes/verify` receives `HTTP 403 Forbidden`.
- [ ] **RBAC Role Gate - Institute:** Institute account can endorse applications belonging to its institution; cannot access District Officer approval endpoints.
- [ ] **RBAC Role Gate - Admin:** Full access to CRUD endpoints for scheme catalog and user management.

### 5.2 Zod Validation & Request Sanitization Tests
- [ ] **Payload Sanitization:** POST to `/api/v1/eligibility/check` with unexpected fields rejects extra parameters or strips them cleanly.
- [ ] **Type Boundaries:** Invalid caste category (e.g. `"UnknownCategory"`) returns `HTTP 400 Bad Request` with detailed Zod error paths.
- [ ] **Negative Income:** Negative annual income values return `HTTP 400`.

### 5.3 Multer File Upload Security Tests
- [ ] **File Size Limit:** Uploading a marksheet > 5MB returns `HTTP 413 Payload Too Large` from Multer.
- [ ] **MIME-Type Whitelist:** Uploading executable or script files (`.exe`, `.sh`, `.php`) disguised as `.jpg` is rejected by magic byte header verification.
- [ ] **Supabase Storage Path:** Verified that successfully uploaded documents receive a valid encrypted UUID key in Supabase Storage.

### 5.4 Rate Limiting & Security Header Tests
- [ ] **Rate Limiter:** Exceeding 100 requests in 15 minutes triggers `HTTP 429 Too Many Requests`.
- [ ] **Security Headers:** Response headers include `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`, and strict CSP headers.
- [ ] **SQL Injection Defense:** Malicious SQL strings in search queries (e.g. `' OR '1'='1`) are treated as literal text with zero syntax errors.

### 5.5 PFMS Government Payment Integration Tests
- [ ] **Bank Account Validation:** Valid IFSC + Account number responds with PFMS verification status.
- [ ] **Mocking & Fallback:** When PFMS sandbox gateway is unavailable, the backend gracefully queues reconciliation with retry backoff.

---

## 6. Accessibility (a11y) Verification

- **Screen Reader Compatibility:**
  - Tested with NVDA (Windows) and VoiceOver (macOS / iOS).
  - Landmark navigation (`header`, `nav`, `main`, `aside`, `footer`) announced correctly.
  - Interactive buttons have descriptive labels or `aria-label`.
- **Keyboard Navigation:**
  - Tab order moves logically from top to bottom, left to right.
  - Visible focus ring (`outline: 2px solid #24523F; outline-offset: 2px`) on all interactive controls.
  - Focus is trapped within modal dialogs while open and restored to triggering element upon close.
- **Color Contrast:**
  - Tested using WCAG Contrast Checker.
  - Charcoal `#302F28` on Warm Ivory `#FFFCF7`: Contrast ratio **12.4:1** (Passes AAA).
  - Forest Green `#24523F` on Vanilla Cream `#F6F1E7`: Contrast ratio **6.8:1** (Passes AAA).
  - Muted Text `#57564F` on Warm Ivory `#FFFCF7`: Contrast ratio **6.1:1** (Passes AA).
- **Reduced Motion:**
  - Enabling `prefers-reduced-motion` in OS settings stops skeleton shimmer animations and sets transition durations to `0.01ms`.

---

## 7. Pre-Deployment Release Checklist

1. [ ] Clean git working tree with no uncommitted debug files.
2. [ ] `npm run typecheck` exits with 0 errors.
3. [ ] `npm run build` generates production bundle in `dist/`.
4. [ ] Verified 1280px width: zero navbar overflow, zero horizontal scrollbar.
5. [ ] Verified 390px mobile width: all tap targets ≥ 44px, drawer opens smoothly.
6. [ ] Verified Gujarati characters render without missing glyphs or boxes.
7. [ ] All 6 statutory policies load and display correct update dates.
8. [ ] Postman API test collection passes with 100% assertions for Clerk auth, Zod validation, and Multer uploads.
9. [ ] Supabase PostgreSQL database migrations and RLS policies verified in Supabase Studio / Oracle Studio.

