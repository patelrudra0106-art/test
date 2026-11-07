# Product Requirements Document (PRD)

## Project: Vidya Pragati Setu (વિદ્યા પ્રગતિ સેતુ)
**Version:** 1.0.0  
**Status:** Approved & Released  
**Target Release:** Production Release  
**Platform:** Web (Responsive Desktop & Android Mobile)  
**Primary Locales:** English (`en`), Gujarati (`gu`)

---

## 1. Executive Summary & Vision

**Vidya Pragati Setu** is an independent, bilingual student scholarship and educational assistance information platform designed specifically for students, parents, and educators in Gujarat.

The mission of Vidya Pragati Setu is:
> *"Every Student, a Brighter Gujarat — દરેક વિદ્યાર્થી, ઉજ્જવળ ગુજરાત"*

The platform aggregates disparate educational welfare initiatives—such as post-matric scholarships, bicycle assistance schemes (e.g., Saraswati Sadhana Yojana), free textbooks, and special educational grants—into a single, unified, easily discoverable digital experience. 

Vidya Pragati Setu operates as a **pure informational bridge**:
- It provides discovery, transparent eligibility criteria, document checklists, and guidance on how and where to apply through official government channels.
- It strictly respects user privacy by operating as a static client-side platform with **zero tracking, zero personal data harvesting, and zero mock logins**.

---

## 2. Problem Statement & User Personas

### 2.1 The Problem
1. **Fragmented Schemes:** Government educational assistance programs are spread across multiple departmental websites (Digital Gujarat, Department of Social Justice & Empowerment, Tribal Development Department, Education Department).
2. **Language Barrier:** Official notifications are often published in dense administrative jargon, preventing vernacular students and rural parents from identifying schemes they qualify for.
3. **Complex Eligibility:** Students often do not know whether their specific caste category, family income bracket, institution type, or course level qualifies them for benefits.
4. **Device Disparities:** Rural students primarily access the web via Android mobile devices, while school counselors and college cyber-cafes access portals on desktop computers with specific monitor resolutions (including 1280px–1323px laptops).

### 2.2 Target User Personas

| Persona | Description | Primary Goal | Key Frustration |
|---|---|---|---|
| **Bhavik (Student, Class 11)** | Rural high school student in Mehsana using an Android smartphone. | Discover scholarships and bicycle assistance for continuing secondary education. | Heavy desktop-first portals that don't load or navigate well on budget Android phones. |
| **Kailasben (Parent/Guardian)** | Mother from Rajkot with limited digital literacy, prefers Gujarati language. | Understand eligibility requirements and required documents for her college-bound daughter. | Complex government portals written only in English with confusing legal terminology. |
| **Pravinbhai (School Counselor)** | High school teacher in Ahmedabad helping 50+ students apply for welfare programs using a 1366×768 or 1280px laptop. | Quickly cross-reference student eligibility against multiple state schemes. | Unresponsive web pages that overflow, clip text, or break between 1280px and 1366px screen widths. |

---

## 3. Product Goals & Non-Goals

### 3.1 Core Goals
- **Unified Discovery:** Present primary educational assistance categories (Scholarships, Bicycles, Textbooks, Higher Education grants) in a structured format.
- **Bilingual Parity:** Provide complete language switching between English (Manrope font) and Gujarati (Anek Gujarati font) across all user-facing content.
- **Interactive Eligibility Evaluation:** Provide an intuitive 3-step wizard that evaluates basic student criteria and matches them against schemes with clear rationale.
- **Dedicated Dual-Tree Responsiveness:** Ensure tailored UX by mounting dedicated component trees for Android mobile (<1024px) and Desktop (≥1024px), with hardened layout stability in the 1280px–1323px range.
- **Compliance & Transparency:** Strictly adhere to Indian DPDP Act 2023 / Rules 2025 frameworks and Guidelines for Indian Government Websites (GIGW) with 6 comprehensive statutory policy documents.

### 3.2 Non-Goals (Explicit Boundaries)
- **No Direct Application Submissions:** The platform does *not* accept or process scholarship applications; users are directed to verified official government portals.
- **No User Account Creation / Database Auth:** The platform does *not* store passwords, Aadhaar numbers, or student PII.
- **No Mock API / Simulated Approvals:** The platform does *not* pretend to approve or disburse funds; it acts as an advisory information aggregator.

---

## 4. Functional Requirements

### 4.1 Responsive Dual-Tree Architecture
- **FR-01 Viewport Routing:** The system shall determine viewport width via CSS media query `(min-width: 1024px)`.
- **FR-02 Mobile Tree (<1024px):** Shall mount `MobileApp.tsx` featuring a sticky compact header, slide-out navigation drawer, quick category pill filters, and streamlined mobile card layouts.
- **FR-03 Desktop Tree (≥1024px):** Shall mount `desktop/app.tsx` featuring a floating glass-pill navbar, full metric strips, 4-column scheme cards, side-by-side eligibility resources panel, and an expanded 5-column footer.
- **FR-04 Narrow Desktop Optimization (1280px–1323px):** Sizing rules shall prevent navbar element overflow, maintain proportional card margins, and eliminate horizontal clipping.

### 4.2 Language & Localization
- **FR-05 Language Toggle:** The interface shall support instantaneous toggling between English (`en`) and Gujarati (`gu`) without reloading the page.
- **FR-06 Typography Switching:** Gujarati text shall be rendered using the `'Anek Gujarati'` font with appropriate line-height compensation (`1.65`), while English shall use `'Manrope'`.
- **FR-07 Notification Feedback:** Language switches shall trigger a temporary accessible notification toast informing the user of the active language.

### 4.3 Scheme Discovery & Catalog
- **FR-08 Real-Time Search:** Fast client-side search indexing scheme title, description, category, and target audience in both English and Gujarati.
- **FR-09 Category Filtering:** Quick-filter tabs for:
  - All Schemes (`ALL`)
  - Scholarships (`scholarship-schemes`)
  - Bicycle Assistance (`bicycle-assistance`)
  - Free Textbooks (`free-textbooks`)
  - Other Support (`other-assistance`)
- **FR-10 Scheme Detail Modal:** Clicking "Learn More" shall display an accessible modal showing:
  - Scheme code and department
  - Benefit summary
  - Bulleted eligibility criteria
  - Checklist of required verification documents
  - Application timeline guidance

### 4.4 3-Step Eligibility Checker
- **FR-11 Step 1 - Basic Info:** Dropdowns for Category (`OBC/SEBC`, `SC`, `ST`, `General/EWS`), State Domicile (`Gujarat`, `Outside Gujarat`), and Annual Family Income (`Up to ₹2,50,000`, `₹2,50,000 – ₹6,00,000`, `Above ₹6,00,000`).
- **FR-12 Step 2 - Education Details:** Dropdowns for Education Level (`Class 9-12`, `Diploma/ITI`, `Undergraduate`, `Postgraduate/PhD`), Institution Type (`Government`, `Grant-in-Aid`, `Self-Financed`), and Hostel Status (`Day Scholar`, `Hosteller`).
- **FR-13 Step 3 - Results Engine:** Instant evaluation providing matched schemes, confidence badges, direct links to scheme details, and guidance for non-qualifying criteria.

### 4.5 Resources & Help Hub
- **FR-14 Interactive Resource Modals:** Popups for Document Checklists, Scheme Guidelines, Frequently Asked Questions (FAQs), Official Portals, and Helpline Contacts.
- **FR-15 Process Steps:** 4-step clear walkthrough (`01 Discover`, `02 Apply`, `03 Verify`, `04 Track`).

### 4.6 Statutory Policy Pages
- **FR-16 Standalone Policy Routing:** Accessible URLs for:
  1. `/policies/privacy-policy`
  2. `/policies/terms-and-conditions`
  3. `/policies/cookie-policy`
  4. `/policies/disclaimer`
  5. `/policies/hyperlink-policy`
  6. `/policies/content-archival-policy`

---

## 5. Backend Infrastructure & Technical Stack Requirements

### 5.1 Backend Service Core
- **Language & Runtime:** TypeScript on Node.js (LTS).
- **Web Framework:** Express.js providing modular REST APIs.
- **Request Validation:** Zod schemas enforcing strict validation on all incoming payloads.
- **Security Middlewares:** Rate Limiting (`express-rate-limit`), SQL Injection Prevention (parameterized queries), and Content Security Policy (`helmet`).
- **File Upload Pipeline:** Multer multipart/form-data handler configured with strict MIME-type filters and 5MB size limits for student marksheets and certificates.

### 5.2 APIs & Integrations
- **REST API:** Standardized JSON endpoints under `/api/v1/` powering web frontend communication.
- **Clerk Authentication API:** User management, session issuance, and RS256 Bearer JWT verification.
- **PFMS API:** Government payment integration for official Direct Benefit Transfer (DBT) verification and scholarship disbursement tracking.

### 5.3 Database & Cloud Storage
- **SQL Database:** PostgreSQL hosted on Supabase; full DDL interoperability with enterprise Oracle (SQL).
- **File Storage:** Supabase Storage managing encrypted private buckets for student identity documents.
- **Database Tools:** Supabase Studio and Oracle Studio for querying, schema migrations, and index maintenance.

### 5.4 Authentication & Role-Based Access Control (RBAC)
- **Identity Provider:** Clerk.
- **4 Distinct Roles:**
  1. `Student`: Apply for schemes, upload verification documents, check PFMS disbursement status.
  2. `Institute`: Verify bona fide student admissions, course enrollments, and academic performance.
  3. `District Officer`: Scrutinize applications at the district level, approve, and sanction awards.
  4. `Admin`: Full system administration, catalog CRUD, policy management, and role assignments.

### 5.5 Hosting & Deployment
- **Frontend SPA:** Hosted on Vercel.
- **Backend Service:** Hosted on Render or Railway.
- **Database Hosting:** Supabase (PostgreSQL & Storage).
- **Version Control & CI/CD:** Git & GitHub with automated build verification.

---

## 6. Non-Functional Requirements

### 6.1 Performance & Responsiveness
- **First Contentful Paint (FCP):** < 1.0s on broadband; < 1.8s on 4G mobile.
- **Time to Interactive (TTI):** < 1.5s on mobile devices.
- **Bundle Size:** < 150 kB gzipped JS bundle.
- **Client Processing:** Search and filter updates must execute in < 16ms (60 fps animation frame budget).

### 6.2 Accessibility & Usability (WCAG 2.1 Level AA)
- **Keyboard Navigation:** Full focus trap inside modals; `Escape` key closes dialogs; logical tab index ordering.
- **Screen Reader Support:** Semantic HTML5 elements (`<header>`, `<nav>`, `<main>`, `<article>`, `<aside>`, `<footer>`), `aria-expanded`, `aria-selected`, and `role="dialog"`.
- **Contrast Ratios:** Minimum contrast ratio of 4.5:1 for body text and 3:1 for large headings against background surfaces.
- **Reduced Motion:** Full compliance with `prefers-reduced-motion` media queries, disabling shimmers and transitions.

### 6.3 Privacy & Data Security
- Zero client-side tracking cookies or analytics pixels.
- Zero external data leaks of user inputs.
- All information calculations performed purely in memory in the user's browser.

---

## 7. Success Metrics & Key Performance Indicators (KPIs)

1. **Information Velocity:** Time taken for a first-time student to check eligibility < 90 seconds.
2. **Vernacular Engagement:** > 50% usage rate of Gujarati language selection.
3. **Cross-Platform Compatibility:** 0% horizontal layout break reports on 360px–414px mobile devices and 1280px–1323px laptop screens.
4. **Accessibility Score:** Google Lighthouse Accessibility score of 98+ out of 100.

