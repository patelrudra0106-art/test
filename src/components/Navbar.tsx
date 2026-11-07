import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X, ChevronRight, Globe2, UserRound } from 'lucide-react';
import { LanguageSelector, Language } from './LanguageSelector';

export interface NavbarProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  onNavigate: (sectionId: string) => void;
  onOpenLogin: () => void;
}

interface MobileNavItem {
  id: string;
  labelEn: string;
  labelGu: string;
  target: string;
}

const MOBILE_NAV_ITEMS: MobileNavItem[] = [
  { id: 'home', labelEn: 'Home', labelGu: 'હોમ', target: 'home' },
  { id: 'schemes', labelEn: 'Schemes', labelGu: 'યોજનાઓ', target: 'schemes' },
  { id: 'eligibility', labelEn: 'Eligibility', labelGu: 'પાત્રતા', target: 'eligibility' },
  { id: 'track', labelEn: 'Track Application', labelGu: 'અરજી ટ્રેક કરો', target: 'track' },
  { id: 'resources', labelEn: 'Updates', labelGu: 'અપડેટ્સ', target: 'resources' },
  { id: 'about', labelEn: 'About', labelGu: 'અમારા વિશે', target: 'benefits' },
];

function BrandMark() {
  return (
    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-warm-ivory/25 bg-forest-green shadow-sm">
      <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" aria-hidden="true">
        <path d="M16 5C12.5 9.5 11 14 16 21C21 14 19.5 9.5 16 5Z" fill="#FA9231" />
        <path d="M15.2 21.2C10.2 19.5 7 15.8 6.5 11C10.8 11.8 13.8 14.8 15.2 21.2Z" fill="#E5EBDD" />
        <path d="M16.8 21.2C21.8 19.5 25 15.8 25.5 11C21.2 11.8 18.2 14.8 16.8 21.2Z" fill="#E5EBDD" />
        <path d="M8.5 24.5C11.2 23.2 13.8 23.2 16 24.5C18.2 23.2 20.8 23.2 23.5 24.5" stroke="#FFFCF7" strokeWidth="2" strokeLinecap="round" />
      </svg>
    </span>
  );
}

export const Navbar: React.FC<NavbarProps> = ({
  language,
  onLanguageChange,
  onNavigate,
  onOpenLogin,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!mobileMenuOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMobileMenuOpen(false);
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [mobileMenuOpen]);

  const handleNavClick = (target: string) => {
    setMobileMenuOpen(false);
    onNavigate(target);
  };

  const labels = {
    brand: language === 'gu' ? 'વિદ્યા પ્રગતિ સેતુ' : 'Vidya Pragati Setu',
    tagline: language === 'gu' ? 'શિક્ષણ · તક · સશક્તિકરણ' : 'Education · Opportunity · Empowerment',
    openMenu: language === 'gu' ? 'મેનુ ખોલો' : 'Open navigation menu',
    closeMenu: language === 'gu' ? 'મેનુ બંધ કરો' : 'Close navigation menu',
    login: language === 'gu' ? 'લોગિન / સાઇન અપ' : 'Login / Sign Up',
    language: language === 'gu' ? 'ભાષા' : 'Language',
  };

  return (
    <>
      <header className="sticky top-2 z-50 mx-auto w-full max-w-desktop px-3 sm:px-4">
        <div
          className="glass-navbar rounded-pill px-2.5 sm:px-4 transition-all duration-200"
        >
          <div className="mx-auto flex h-14 items-center justify-between gap-2">
            <button
              type="button"
              onClick={() => handleNavClick('top')}
              className="flex min-w-0 items-center gap-2 rounded-pill p-1 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest-green"
              aria-label={labels.brand}
            >
              <BrandMark />
              <span className="min-w-0">
                <span className="block truncate text-[12.5px] font-extrabold leading-tight tracking-tight text-charcoal sm:text-sm">
                  {labels.brand}
                </span>
                <span className="mt-0.5 block truncate text-[9px] leading-tight text-muted-text sm:text-[10px]">
                  {labels.tagline}
                </span>
              </span>
            </button>

            <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
              <LanguageSelector
                language={language}
                onChange={onLanguageChange}
                compact
                variant="light"
                align="right"
                className="w-[72px] sm:w-[78px]"
              />
              <button
                type="button"
                onClick={() => setMobileMenuOpen((previous) => !previous)}
                aria-expanded={mobileMenuOpen}
                aria-controls="mobile-nav-drawer"
                aria-label={mobileMenuOpen ? labels.closeMenu : labels.openMenu}
                className="touch-target inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-warm-border/80 bg-warm-ivory/80 text-charcoal transition-colors hover:border-forest-green/50 hover:bg-sage-green/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest-green"
              >
                {mobileMenuOpen ? <X className="h-4 w-4" aria-hidden="true" /> : <Menu className="h-4 w-4" aria-hidden="true" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-[60] lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.16 }}
          >
            <button
              type="button"
              aria-label={labels.closeMenu}
              onClick={() => setMobileMenuOpen(false)}
              className="absolute inset-0 h-full w-full cursor-default bg-charcoal/40 backdrop-blur-[2px]"
            />
            <motion.aside
              id="mobile-nav-drawer"
              role="dialog"
              aria-modal="true"
              aria-label={language === 'gu' ? 'મુખ્ય મેનુ' : 'Main menu'}
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-y-0 left-0 flex w-[min(84vw,320px)] flex-col overflow-y-auto rounded-r-3xl border-r border-warm-border bg-warm-ivory/95 px-4 pb-5 pt-[max(1.25rem,env(safe-area-inset-top))] shadow-glass-hover backdrop-blur-xl"
            >
              <div className="flex items-center justify-between gap-3 border-b border-warm-border/70 pb-4">
                <div className="flex min-w-0 items-center gap-2.5">
                  <BrandMark />
                  <div className="min-w-0">
                    <p className="truncate text-[13px] font-extrabold leading-tight text-charcoal">{labels.brand}</p>
                    <p className="mt-0.5 text-[9px] leading-tight text-muted-text">{labels.tagline}</p>
                  </div>
                </div>
                <button
                  ref={closeButtonRef}
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="touch-target inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-charcoal transition-colors hover:bg-sage-green/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest-green"
                  aria-label={labels.closeMenu}
                >
                  <X className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>

              <nav aria-label={language === 'gu' ? 'મુખ્ય મેનુ' : 'Main menu'} className="mt-4 space-y-1">
                {MOBILE_NAV_ITEMS.map((item, index) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleNavClick(item.target)}
                    className={`touch-target group flex w-full items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-left text-[13px] font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest-green ${
                      index === 0
                        ? 'bg-sage-green/75 text-charcoal'
                        : 'text-charcoal hover:bg-sage-green/60 hover:text-forest-green'
                    }`}
                  >
                    <span lang={language === 'gu' ? 'gu' : 'en'} className={language === 'gu' ? 'font-gujarati' : ''}>
                      {language === 'gu' ? item.labelGu : item.labelEn}
                    </span>
                    <ChevronRight className="h-4 w-4 shrink-0 text-muted-text transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                  </button>
                ))}
              </nav>

              <div className="mt-auto space-y-4 pt-6">
                <div className="border-t border-warm-border/70 pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onOpenLogin();
                    }}
                    className="btn-primary touch-target flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-[13px] font-semibold"
                  >
                    <UserRound className="h-4 w-4 text-saffron" aria-hidden="true" />
                    {labels.login}
                  </button>
                </div>

                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2 text-[12px] font-medium text-charcoal">
                    <Globe2 className="h-4 w-4 text-muted-text" aria-hidden="true" />
                    {labels.language}
                  </div>
                  <LanguageSelector
                    language={language}
                    onChange={onLanguageChange}
                    variant="light"
                    align="right"
                    className="w-[150px]"
                  />
                </div>

              </div>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
