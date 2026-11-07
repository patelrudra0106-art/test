# Design System & User Experience (UX) Specification

## Project: Vidya Pragati Setu
**Document Type:** UX/UI Design System Specification  
**Design Philosophy:** Culturally Grounded, High-Legibility, Hybrid Material Glassmorphism  
**Visual Composition Ratio:** ~70% Clean Flat UI / ~20% Soft Neumorphic Depth / ~10% Liquid Glass Accents

---

## 1. Visual Identity & Aesthetic Principles

Vidya Pragati Setu's visual language reflects the educational pride and warm cultural heritage of Gujarat, combining state government administrative sobriety with modern, welcoming digital design patterns.

### 1.1 The Tri-Part Design Ratio
1. **70% Clean Flat Surfaces:** High-contrast, glare-free warm ivory and vanilla cream canvases ensuring maximum readability for dense text, criteria lists, and tables.
2. **20% Soft Neumorphic Elements:** Subtle, tactile inset and outset shadows on interactive cards, filters, and dropdown surfaces providing gentle physical affordance.
3. **10% Liquid Glass Accents:** Focused blur and translucency applied selectively to the primary navigation bar, floating toasts, and active modal overlays to indicate elevated context.

---

## 2. Color Palette & Semantic Tokens

All colors are systematically defined in CSS custom properties and mapped to Tailwind CSS tokens:

```css
:root {
  --color-forest-green: #24523F;
  --color-sage-green:   #E5EBDD;
  --color-vanilla-cream: #F6F1E7;
  --color-saffron:      #FA9231;
  --color-charcoal:     #302F28;
  --color-warm-ivory:   #FFFCF7;
  --color-muted-text:   #57564F;
  --color-warm-border:  #DCD2C1;
}
```

### Color Mapping Table

| Token Name | Hex Code | RGB | Semantic Role |
|---|---|---|---|
| `forest-green` | `#24523F` | `36, 82, 63` | Primary brand tone, header background, primary CTAs, active pills |
| `sage-green` | `#E5EBDD` | `229, 235, 221` | Soft secondary tint, icon background, status highlight, active tab hover |
| `vanilla-cream`| `#F6F1E7` | `246, 241, 231` | Global body background, sub-panel fill |
| `saffron` | `#FA9231` | `250, 146, 49` | Energetic Gujarat accent, notification badges, active icons, focus rings |
| `charcoal` | `#302F28` | `48, 47, 40` | Primary typography, deep contrast footer, dark contrast borders |
| `warm-ivory` | `#FFFCF7` | `255, 252, 247` | Card surface, modal surface, high-legibility canvas |
| `muted-text` | `#57564F` | `87, 86, 79` | Secondary captions, helper descriptions, breadcrumb text |
| `warm-border` | `#DCD2C1` | `220, 210, 193` | Structural dividers, card borders, input borders |

---

## 3. Typography System

### 3.1 Dual-Font Architecture
- **English Typography:** `Manrope` (Clean geometric sans-serif with open apertures and high legibility).
- **Gujarati Typography:** `Anek Gujarati` (Modern Gujarati font with balanced ascenders and clear conjuncts).

```css
font-family: 'Manrope', system-ui, -apple-system, sans-serif;

:lang(gu), .font-gujarati {
  font-family: 'Anek Gujarati', 'Manrope', system-ui, sans-serif;
  line-height: 1.65;
  letter-spacing: 0;
}
```

### 3.2 Type Scale

| Scale Role | Font Size (px / rem) | Line Height | Weight | Usage |
|---|---|---|---|---|
| **Hero Display** | 46px - 52px / 3.25rem | 1.12 | 800 (Extrabold) | Hero headline ("Every Student...") |
| **Section Heading** | 26px - 32px / 1.875rem | 1.22 | 700 (Bold) | "Popular Schemes", "How It Works" |
| **Card Heading** | 17px - 18px / 1.125rem | 1.35 | 700 (Bold) | Scheme titles, process step headers |
| **Body Large** | 16px - 17px / 1.05rem | 1.60 | 400 (Regular) | Hero subtext, feature intros |
| **Body Standard**| 14px - 15px / 0.95rem | 1.60 | 400 (Regular) | Card descriptions, policy text |
| **Caption / Meta**| 12px - 13px / 0.8rem | 1.45 | 500 (Medium) | Category tags, metric labels, steps |
| **Micro Utility** | 10.5px - 11px / 0.7rem | 1.40 | 600 (Semibold) | Brand subtitles, status labels |

---

## 4. Surface Treatments & Glassmorphism

### 4.1 Liquid Glass Navigation (`.glass-navbar`)
Combines multi-layer gradients with hardware-accelerated backdrop blur:
- Backdrop Filter: `blur(30px) saturate(1.2)`
- Surface Gradient: `linear-gradient(135deg, rgba(229,222,208,0.87) 0%, rgba(241,235,223,0.84) 54%, rgba(235,229,216,0.86) 100%)`
- Border: `1px solid rgba(190, 178, 157, 0.56)`
- Highlight Inset: `inset 0 1px 0 rgba(255, 252, 247, 0.9)`

### 4.2 Neumorphic Card Surface (`.scheme-card-surface`)
Simulates soft raised depth without visual weight:
- Dual Shadow:
  `4px 4px 10px rgba(48, 47, 40, 0.055)` (soft drop shadow) +
  `-4px -4px 10px rgba(255, 252, 247, 0.72)` (warm highlight)
- Inner Bevel: `inset 0 1px 0 rgba(255, 252, 247, 0.82)`
- Hover Elevation: Translate `-4px` with enhanced green-tinted shadow.

---

## 5. Viewport Strategy & 1280px–1323px Optimization

### 5.1 Breakpoint Grid
- `sm`: 640px (Large phones / landscape)
- `md`: 768px (Tablets)
- `lg`: 1024px (Desktop Switch Point)
- `xl`: 1280px (Standard Laptops & High-DPI screens)
- `2xl`: 1536px (Widescreen Desktop Monitors)

### 5.2 The 1280px–1323px Narrow Desktop Solution
At 1280px, the viewport transitions into the full desktop layout while container width remains constrained:
- **Available Inner Width:** $1280\text{px} - 64\text{px} \text{ (padding)} - 32\text{px} \text{ (navbar)} = 1184\text{px}$.
- **Brand Subtitle Suppression:** The long brand subtitle (`Education · Opportunity · Empowerment`) is styled with `hidden sm:block xl:hidden 2xl:block`, freeing $215\text{px}$ of horizontal header space.
- **Compact Nav Pills:** Sized at `px-2.5 2xl:px-3.5` with `text-[12.5px] 2xl:text-[13.5px]`.
- **Search Pill Sizing:** Set to `w-38 2xl:w-52` (expanding to `w-48 2xl:w-64` on focus).
- **Metric Strip Alignment:** Harmonized from `lg:px-16` to `px-4 sm:px-6 lg:px-8 xl:px-8 2xl:px-10` to perfectly line up with the Hero and Schemes borders.
- **Connecting Arrows Centering:** How-It-Works arrow badge positioned at `-right-3 xl:-right-3.5` to sit exactly in the column gap without overlapping card borders.

---

## 6. Component Anatomy & Design Patterns

### 6.1 Scheme Cards
- **Top Row:** Left-aligned category icon container (forest green on sage), right-aligned rounded category pill tag.
- **Center:** Bold heading in charcoal (transitions to forest green on hover), followed by 2-line clamped summary.
- **Background Watermark:** 112px stroke watermark of the scheme icon set in the bottom-right corner at 55% opacity.
- **Bottom Footer:** "Learn More" text button with arrow transition on hover.

### 6.2 3-Step Eligibility Wizard
- **Progress Indicator:** 3 segmented rounded bars indicating current step (`01 Basic Info`, `02 Education`, `03 Results`).
- **Form Controls:** Custom neumorphic glass dropdowns with clean focus rings, accessible listbox popups, and keyboard navigation.
- **Calculation State:** Smooth skeleton loader state before displaying matched scheme cards.

---

## 7. Motion & Micro-Interactions

- **Animation Library:** Framer Motion (`framer-motion`).
- **Standard Easing Curve:** `cubic-bezier(0.22, 1, 0.36, 1)` (Swift acceleration, gentle deceleration).
- **Durations:**
  - Fast (Dropdowns, hover transitions): `160ms`
  - Normal (Card shifts, modal entrance): `220ms`
  - Slow (Page section fades): `320ms`
- **Reduced Motion Support:** All animations immediately collapse to `0.01ms` when `prefers-reduced-motion: reduce` is detected.

