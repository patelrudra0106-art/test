import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    // Explicitly pin the standard breakpoints used by the separate desktop/mobile trees.
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
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
        sans: ['Manrope', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        gujarati: ['"Anek Gujarati"', 'Manrope', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'hero-heading': [
          '3.25rem',
          { lineHeight: '1.12', letterSpacing: '-0.02em', fontWeight: '700' },
        ],
        'section-heading': [
          '1.875rem',
          { lineHeight: '1.22', letterSpacing: '-0.015em', fontWeight: '700' },
        ],
        'card-heading': ['1.125rem', { lineHeight: '1.35', fontWeight: '600' }],
        body: ['1rem', { lineHeight: '1.6', fontWeight: '400' }],
        'body-sm': ['0.875rem', { lineHeight: '1.5', fontWeight: '400' }],
        utility: ['0.75rem', { lineHeight: '1.4', fontWeight: '500' }],
      },
      backdropBlur: {
        glass: '30px',
        'glass-sm': '16px',
      },
      boxShadow: {
        glass:
          '0 12px 32px -8px rgba(48, 47, 40, 0.08), 0 2px 6px -1px rgba(48, 47, 40, 0.04), inset 0 1px 0 0 rgba(255, 252, 247, 0.65)',
        'glass-hover':
          '0 18px 40px -10px rgba(36, 82, 63, 0.14), 0 4px 12px -2px rgba(48, 47, 40, 0.06), inset 0 1px 0 0 rgba(255, 252, 247, 0.85)',
        'glass-pressed':
          '0 4px 12px -2px rgba(48, 47, 40, 0.08), inset 0 2px 4px 0 rgba(48, 47, 40, 0.06)',
        card: '0 8px 24px -6px rgba(48, 47, 40, 0.06), 0 2px 6px -1px rgba(48, 47, 40, 0.03)',
        'card-hover':
          '0 16px 36px -8px rgba(36, 82, 63, 0.12), 0 4px 10px -2px rgba(48, 47, 40, 0.05)',
        dropdown: '0 12px 32px rgba(48, 47, 40, 0.14)',
      },
      borderRadius: {
        glass: '1.25rem',
        'glass-sm': '0.875rem',
        'glass-lg': '1.75rem',
        pill: '9999px',
      },
      transitionDuration: {
        fast: '160ms',
        normal: '220ms',
        slow: '320ms',
      },
      transitionTimingFunction: {
        smooth: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      maxWidth: {
        desktop: '1440px',
      },
    },
  },
  plugins: [],
};

export default config;
