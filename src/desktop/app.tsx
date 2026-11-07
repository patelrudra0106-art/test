import { useState, useEffect, useCallback, useRef } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { MetricsStrip } from './components/MetricsStrip';
import { SchemesSection } from './components/SchemesSection';
import { HowItWorks } from './components/HowItWorks';
import { BenefitsSection } from './components/BenefitsSection';
import { LatestUpdates } from './components/LatestUpdates';
import { EligibilityResourcesPanel } from './components/EligibilityResourcesPanel';
import { Footer } from './components/Footer';
import { LoginModal } from '../components/LoginModal';
import { NotificationToast } from '../components/NotificationToast';
import { Language, SchemeItem, HERO_METRICS, POPULAR_SCHEMES } from '../data/schemes';
import { SITE_GUIDANCE_ITEMS } from '../data/siteContent';
import type { ProcessStepItem } from './data/siteLayoutData';
import { scrollToSection } from './lib/utils';

export function App() {
  const [language, setLanguage] = useState<Language>('en');
  const [activeSection, setActiveSection] = useState<string>('home');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedScheme, setSelectedScheme] = useState<SchemeItem | null>(null);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [currentUser, setCurrentUser] = useState<{ role: string; identifier: string } | null>(null);
  const isLoadingData = false;

  useEffect(() => {
    try {
      const raw = localStorage.getItem('vps_authenticated_user');
      if (raw) setCurrentUser(JSON.parse(raw));
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);


  useEffect(() => {
    if (!toastMessage) return;
    const timer = window.setTimeout(() => {
      setToastMessage(null);
    }, 4800);
    return () => window.clearTimeout(timer);
  }, [toastMessage]);

  const navigationIntentRef = useRef<string | null>(null);

  useEffect(() => {
    const orderedSections: Array<{ elementId: string; navId: string }> = [
      { elementId: 'home', navId: 'home' },
      { elementId: 'schemes', navId: 'schemes' },
      // The shared eligibility/resources panel is represented by Eligibility
      // during natural scrolling. The Resources nav item still jumps directly
      // to the same panel and remains active until the user resumes scrolling.
      { elementId: 'eligibility', navId: 'eligibility' },
      { elementId: 'how-it-works', navId: 'track' },
      { elementId: 'benefits', navId: 'about' },
      { elementId: 'updates-and-help', navId: 'resources' },
    ];

    let animationFrame = 0;

    const updateActiveSection = () => {
      animationFrame = 0;
      if (navigationIntentRef.current) return;

      const navbar = document.querySelector<HTMLElement>('[data-site-navbar]');
      const navbarBottom = navbar?.getBoundingClientRect().bottom ?? 88;
      const activationLine = Math.min(
        Math.max(navbarBottom + 28, 120),
        Math.max(160, window.innerHeight * 0.42),
      );
      const activationPosition = window.scrollY + activationLine;

      let nextActive = 'home';
      for (const section of orderedSections) {
        const element = document.getElementById(section.elementId);
        if (!element) continue;
        const sectionTop = window.scrollY + element.getBoundingClientRect().top;
        if (sectionTop <= activationPosition) nextActive = section.navId;
        else break;
      }

      setActiveSection((current) => (current === nextActive ? current : nextActive));
    };

    const scheduleUpdate = () => {
      if (animationFrame) return;
      animationFrame = window.requestAnimationFrame(updateActiveSection);
    };

    const clearNavigationIntent = () => {
      if (!navigationIntentRef.current) return;
      navigationIntentRef.current = null;
      scheduleUpdate();
    };

    const handlePointerDown = (event: PointerEvent) => {
      const navbar = document.querySelector('[data-site-navbar]');
      if (!navbar?.contains(event.target as Node)) clearNavigationIntent();
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (['ArrowDown', 'ArrowUp', 'PageDown', 'PageUp', 'Home', 'End', ' '].includes(event.key)) {
        clearNavigationIntent();
      }
    };

    window.addEventListener('scroll', scheduleUpdate, { passive: true });
    window.addEventListener('resize', scheduleUpdate);
    document.addEventListener('wheel', clearNavigationIntent, { passive: true });
    document.addEventListener('touchstart', clearNavigationIntent, { passive: true });
    document.addEventListener('pointerdown', handlePointerDown, true);
    document.addEventListener('keydown', handleKeyDown);
    scheduleUpdate();

    return () => {
      if (animationFrame) window.cancelAnimationFrame(animationFrame);
      window.removeEventListener('scroll', scheduleUpdate);
      window.removeEventListener('resize', scheduleUpdate);
      document.removeEventListener('wheel', clearNavigationIntent);
      document.removeEventListener('touchstart', clearNavigationIntent);
      document.removeEventListener('pointerdown', handlePointerDown, true);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const triggerToast = useCallback((msg: string) => {
    setToastMessage(msg);
  }, []);

  const handleLanguageChange = (newLang: Language) => {
    setLanguage(newLang);
    triggerToast(
      newLang === 'gu'
        ? 'ભાષા ગુજરાતી (Anek Gujarati) માં બદલાઈ ગઈ છે.'
        : 'Language switched to English (Manrope).'
    );
  };

  const handleExploreSchemes = () => {
    setActiveSection('schemes');
    scrollToSection('schemes');
  };

  const handleHowItWorks = () => {
    setActiveSection('track');
    scrollToSection('how-it-works');
  };

  const handleSelectSchemeFromSearch = (scheme: SchemeItem) => {
    setSelectedScheme(scheme);
    setActiveSection('schemes');
    scrollToSection('schemes');
  };

  const handleSelectProcessStep = (step: ProcessStepItem) => {
    if (step.number === '01') {
      scrollToSection('schemes');
      triggerToast(
        language === 'gu'
          ? 'પગલું ૦૧: નીચે આપેલ લોકપ્રિય યોજનાઓમાંથી તમારી પાત્રતા તપાસો.'
          : 'Step 01 — Discover: Browse scheme cards and filter by category below.'
      );
    } else if (step.number === '02') {
      setActiveSection('eligibility');
      scrollToSection('eligibility');
      triggerToast(
        language === 'gu'
          ? 'પગલું ૦૨: પાત્રતા માર્ગદર્શન તપાસો અને અરજી માટે હાલની સત્તાવાર સૂચનાનું અનુસરણ કરો.'
          : 'Step 02 — Apply: Review the eligibility guidance and follow the current official scheme notice to apply.'
      );
    } else if (step.number === '03') {
      setActiveSection('resources');
      scrollToSection('resources');
      triggerToast(
        language === 'gu'
          ? 'પગલું ૦૩: દસ્તાવેજોની ચકાસણી માટે જરૂરી માહિતી અને સહાય નીચે જુઓ.'
          : 'Step 03 — Verify: Review the document guidance and student help resources below.'
      );
    } else {
      setActiveSection('resources');
      scrollToSection('resources');
      triggerToast(
        language === 'gu'
          ? 'પગલું ૦૪: અરજીની સ્થિતિ માટે સંબંધિત વિભાગના સત્તાવાર પોર્ટલનો ઉપયોગ કરો.'
          : 'Step 04 — Track: Use the official department portal to check an application status.'
      );
    }
  };

  return (
    <div className="min-h-screen bg-vanilla-cream text-charcoal flex flex-col selection:bg-forest-green selection:text-warm-ivory">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:px-4 focus:py-2.5 focus:rounded-pill focus:bg-forest-green focus:text-warm-ivory focus:font-semibold focus:shadow-glass"
      >
        Skip to main content
      </a>

      {currentUser && (
        <aside
          aria-label="User session active"
          className="bg-forest-green text-warm-ivory px-4 py-2 text-xs text-center flex items-center justify-center gap-2 sm:gap-3 flex-wrap shadow-sm border-b border-warm-ivory/15"
        >
          <span>
            {language === 'gu' ? 'નમસ્તે' : 'Welcome back'}, <strong className="text-saffron">{currentUser.identifier}</strong> ({currentUser.role})
          </span>
          <span className="text-warm-ivory/50 hidden sm:inline">•</span>
          <button
            type="button"
            onClick={() => {
              window.history.pushState({}, '', '/user-home');
              window.dispatchEvent(new PopStateEvent('popstate'));
            }}
            className="font-bold underline text-saffron hover:text-warm-ivory transition-colors cursor-pointer"
          >
            {language === 'gu' ? 'વપરાશકર્તા હોમ પેજ ખોલો →' : 'Open Personalized User Home Page →'}
          </button>
        </aside>
      )}

      <Navbar
        language={language}
        onLanguageChange={handleLanguageChange}
        activeSection={activeSection}
        onNavigate={(id) => {
          navigationIntentRef.current = id;
          setActiveSection(id);
        }}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onSelectScheme={handleSelectSchemeFromSearch}
        onOpenLogin={() => {
          window.history.pushState({}, '', '/login');
          window.dispatchEvent(new PopStateEvent('popstate'));
        }}
      />

      <main id="main-content" className="flex-1">
        <HeroSection
          language={language}
          onExploreSchemes={handleExploreSchemes}
          onHowItWorks={handleHowItWorks}
        />

        <MetricsStrip
          language={language}
          isLoading={isLoadingData}
          metrics={HERO_METRICS}
        />

        <SchemesSection
          language={language}
          searchQuery={searchQuery}
          onClearSearch={() => setSearchQuery('')}
          selectedScheme={selectedScheme}
          onSelectScheme={setSelectedScheme}
          onTriggerToast={triggerToast}
          isLoading={isLoadingData}
        />

        <EligibilityResourcesPanel
          language={language}
          schemes={POPULAR_SCHEMES}
          isLoading={isLoadingData}
          onSelectScheme={setSelectedScheme}
        />

        <HowItWorks
          language={language}
          onSelectStep={handleSelectProcessStep}
        />

        <BenefitsSection language={language} />

        <section
          id="updates-and-help"
          aria-label="Latest Updates"
          className="scroll-mt-28 mx-auto w-full max-w-desktop px-4 py-8 sm:px-6 lg:px-8 xl:px-8 2xl:px-10 lg:py-10"
        >
          <LatestUpdates
            language={language}
            updates={SITE_GUIDANCE_ITEMS}
            isLoading={isLoadingData}
          />
        </section>

      </main>

      <Footer
        language={language}
        onLanguageChange={handleLanguageChange}
      />

      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        language={language}
      />

      <NotificationToast
        message={toastMessage}
        onDismiss={() => setToastMessage(null)}
      />
    </div>
  );
}

export default App;
