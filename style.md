# Styling & CSS Specification

## Project: Vidya Pragati Setu
**Document Type:** Technical Styling Specification  
**CSS Architecture:** Tailwind CSS 3.4 + PostCSS with Layered Custom Components  
**Primary CSS Entry:** `src/index.css`  
**Configuration File:** `tailwind.config.ts`  

---

## 1. Tailwind Configuration System

The project extends the standard Tailwind theme with custom design tokens specifically calibrated for the Gujarat education theme:

```typescript
// tailwind.config.ts
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',   // Dual-tree switch breakpoint
      xl: '1280px',   // Standard desktop laptop
      '2xl': '1536px' // High-resolution display
    },
    extend: {
      colors: {
        'forest-green': '#24523F',
        'sage-green': '#E5EBDD',
        'vanilla-cream': '#F6F1E7',
        saffron: '#FA9231',
        charcoal: '#302F28',
        'warm-ivory': '#FFFCF7',
        'muted-text': '#57564F',
        'warm-border': '#DCD2C1',
      },
      fontFamily: {
        sans: ['Manrope', 'system-ui', '-apple-system', 'sans-serif'],
        gujarati: ['"Anek Gujarati"', 'Manrope', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        desktop: '1440px',
      },
      borderRadius: {
        glass: '1.25rem',
        'glass-sm': '0.875rem',
        'glass-lg': '1.75rem',
        pill: '9999px',
      },
      transitionTimingFunction: {
        smooth: 'cubic-bezier(0.22, 1, 0.36, 1)',
      }
    }
  }
}
```

---

## 2. Glassmorphism Design Tokens

The application defines specialized utility classes for distinct glass surface tiers:

### 2.1 Shared Desktop Glass Navbar (`.glass-navbar`)
```css
.glass-navbar {
  background:
    linear-gradient(
      135deg,
      rgba(255, 252, 247, 0.08) 0%,
      rgba(255, 252, 247, 0.025) 45%,
      rgba(229, 222, 208, 0.07) 100%
    ),
    linear-gradient(
      135deg,
      rgba(229, 222, 208, 0.87) 0%,
      rgba(241, 235, 223, 0.84) 54%,
      rgba(235, 229, 216, 0.86) 100%
    );
  -webkit-backdrop-filter: blur(30px) saturate(1.2);
  backdrop-filter: blur(30px) saturate(1.2);
  border: 1px solid rgba(190, 178, 157, 0.56);
  box-shadow:
    0 12px 32px -12px rgba(48, 47, 40, 0.17),
    0 3px 10px -4px rgba(48, 47, 40, 0.08),
    inset 0 1px 0 rgba(255, 252, 247, 0.9),
    inset 0 -1px 0 rgba(220, 210, 193, 0.32);
  background-clip: padding-box;
  isolation: isolate;
}
```

### 2.2 Glass Style Tiers

| Class Name | Surface Treatment | Backdrop Blur | Border & Shadow | Typical Usage |
|---|---|---|---|---|
| `.glass-style-a` | Linear gradient warm ivory (88% to 84%) | `blur(30px)` | Border `rgba(220, 210, 193, 0.85)` + `shadow-glass` | Metrics strip, hero badges |
| `.glass-style-b` | Clean warm ivory (96% solid) | `blur(16px)` | Inset depth shadow + `border-warm-border` | Search inputs, updates cards |
| `.glass-style-c` | Layered floating ivory (92% to 87%) | `blur(30px)` | Border `rgba(220, 210, 193, 0.9)` + `shadow-glass` | Scheme detail modals, login dialog |
| `.glass-style-d` | Interactive ivory to sage (93% to 65%) | `blur(30px)` | Light border + hover saturation boost | Category tabs, language switcher |
| `.glass-notification` | High-visibility ivory to sage tint | `blur(30px)` | Border `var(--color-warm-border)` + hover shadow | Toast alerts |

---

## 3. Neumorphic Card Specifications (`.scheme-card-surface`)

Combines a warm ivory core with subtle light and shadow bevels:

```css
.scheme-card-surface {
  background-color: var(--color-warm-ivory);
  border: 1px solid var(--color-warm-border);
  border-radius: 1.25rem;
  box-shadow:
    4px 4px 10px rgba(48, 47, 40, 0.055),
    -4px -4px 10px rgba(255, 252, 247, 0.72),
    inset 0 1px 0 rgba(255, 252, 247, 0.82);
  transition: all 220ms cubic-bezier(0.22, 1, 0.36, 1);
}

.scheme-card-surface:hover {
  border-color: rgba(36, 82, 63, 0.35);
  transform: translateY(-4px);
  box-shadow:
    0 16px 36px -8px rgba(36, 82, 63, 0.12),
    0 4px 10px -2px rgba(48, 47, 40, 0.05);
}
```

---

## 4. Button & Control Treatments

### 4.1 Primary Button (`.btn-primary`)
- **Normal:** Solid `forest-green` with crisp ivory text and 1px border.
- **Hover:** Darkens to `#1c4232`, translates `-2px` upwards with glass hover shadow.
- **Active:** Translates to `0px` with inset pressed shadow.

```css
.btn-primary {
  @apply bg-forest-green text-warm-ivory border border-forest-green shadow-sm transition-all duration-fast ease-smooth;
}
.btn-primary:hover:not(:disabled) {
  background-color: #1c4232;
  @apply shadow-glass-hover -translate-y-0.5;
}
.btn-primary:active:not(:disabled) {
  @apply translate-y-0 shadow-glass-pressed;
}
```

### 4.2 Secondary Button (`.btn-secondary`)
- **Normal:** Warm ivory background with forest green text and border.
- **Hover:** Soft sage green fill (`rgba(229, 235, 221, 0.7)`), translates `-2px`.

---

## 5. Shimmer Skeleton Animation

For loading states, a hardware-accelerated CSS gradient pulse is applied:

```css
@keyframes shimmerPulse {
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
}

.skeleton-shimmer {
  background: linear-gradient(
    90deg,
    rgba(220, 210, 193, 0.35) 25%,
    rgba(229, 235, 221, 0.65) 50%,
    rgba(220, 210, 193, 0.35) 75%
  );
  background-size: 200% 100%;
  animation: shimmerPulse 1.8s infinite ease-in-out;
}
```

---

## 6. Accessibility & Utility Classes

### 6.1 Gujarati Typography Compensation
```css
:lang(gu),
.font-gujarati {
  font-family: 'Anek Gujarati', 'Manrope', system-ui, sans-serif;
  line-height: 1.65;
  letter-spacing: 0;
}
```

### 6.2 Horizontal Clipping Protection
To prevent horizontal overflow from disrupting sticky headers:
```css
@supports (overflow: clip) {
  html,
  body {
    overflow-x: clip;
  }
}
```

### 6.3 Reduced Motion Accessibility
```css
@media (prefers-reduced-motion: reduce) {
  *,
  ::before,
  ::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }

  .skeleton-shimmer {
    animation: none !important;
    background: rgba(220, 210, 193, 0.45);
  }
}
```

