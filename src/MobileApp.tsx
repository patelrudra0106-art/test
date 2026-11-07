import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { SchemesSection } from './components/SchemesSection';
import { EligibilityChecker } from './components/EligibilityChecker';
import { HowItWorks, ProcessStepId } from './components/HowItWorks';
import { TrackApplication } from './components/TrackApplication';
import { LatestUpdates } from './components/LatestUpdates';
import { HelpSection, ResourceCategory } from './components/HelpSection';
import { BenefitsSection } from './components/BenefitsSection';
import { Footer } from './components/Footer';
import { LoginModal } from './components/LoginModal';
import { NotificationToast } from './components/NotificationToast';
import { Language } from './components/LanguageSelector';
import { POPULAR_SCHEMES as SCHEMES_DATA } from './data/schemes';
import type { SchemeItem as Scheme } from './data/schemes';
import { SITE_GUIDANCE_ITEMS } from './data/siteContent';

export function App() {
  const [language, setLanguage] = useState<Language>('en');
  const isLoadingData = false;
  const [resourceCategory, setResourceCategory] = useState<ResourceCategory>('all');
  const [highlightedResourceId, setHighlightedResourceId] = useState<string | null>(null);
  const [isLoginOpen, setIsLoginOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [selectedScheme, setSelectedScheme] = useState<Scheme | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [currentUser, setCurrentUser] = useState<{ role: string; identifier: string } | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem('vps_authenticated_user');
      if (raw) setCurrentUser(JSON.parse(raw));
    } catch {
      // ignore
    }
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
  };

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
    document.documentElement.lang = lang;
  };

  const scrollToSection = (sectionId: string) => {
    if (sectionId === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const target = document.getElementById(sectionId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Fixes Screenshot 2: All 4 process cards (01 Discover, 02 Apply, 03 Verify, 04 Track) perform clear actions
  const handleSelectProcessStep = (step: ProcessStepId | string) => {
    const normalized = step.toLowerCase();

    if (normalized === 'discover' || normalized === '01' || normalized === '1') {
      scrollToSection('schemes');
      showToast(
        language === 'gu'
          ? 'પગલું ૦૧ — શોધો: તમારા માટે ઉપલબ્ધ શિષ્યવૃત્તિ યોજનાઓ તપાસો.'
          : 'Step 01 — Discover: Browse available scholarship schemes below.'
      );
      return;
    }

    if (normalized === 'apply' || normalized === '02' || normalized === '2') {
      scrollToSection('eligibility');
      showToast(
        language === 'gu'
          ? 'પગલું ૦૨ — તપાસો: સત્તાવાર પ્રક્રિયા દ્વારા અરજી કરતા પહેલાં પાત્રતાની શરતો તપાસો.'
          : 'Step 02 — Review: Check the published eligibility conditions before applying through the official process.'
      );
      return;
    }

    if (normalized === 'verify' || normalized === '03' || normalized === '3') {
      setResourceCategory('documents');
      setHighlightedResourceId('important-documents');
      scrollToSection('resources');
      showToast(
        language === 'gu'
          ? 'પગલું ૦૩ — ચકાસણી: શાળા અને વિભાગની ચકાસણી માટે જરૂરી દસ્તાવેજોની યાદી જુઓ.'
          : 'Step 03 — Verify: Review the required documents & nodal verification checklist.'
      );
      return;
    }

    if (normalized === 'track' || normalized === '04' || normalized === '4') {
      scrollToSection('track');
      showToast(
        language === 'gu'
          ? 'પગલું ૦૪ — સ્થિતિ તપાસો: સત્તાવાર વિભાગના પોર્ટલનો ઉપયોગ કરો.'
          : 'Step 04 — Track: Use the official department portal to check your application status.'
      );
    }
  };

  const handleSelectScheme = (scheme: Scheme) => {
    setSelectedScheme(scheme);
  };

  const handleApplyScheme = (scheme: Scheme) => {
    setSelectedScheme(null);
    scrollToSection('eligibility');
    showToast(
      language === 'gu'
        ? `${scheme.shortTitleGu} માટેની પાત્રતા માર્ગદર્શિકા તપાસો અને અરજી માટે સત્તાવાર સૂચનાનું અનુસરણ કરો.`
        : `Review the eligibility guidance for ${scheme.shortTitle}, then follow the official scheme notice to apply.`
    );
  };

  const handleCheckSchemeEligibility = (scheme: Scheme) => {
    setSelectedScheme(null);
    scrollToSection('eligibility');
    showToast(
      language === 'gu'
        ? `${scheme.shortTitleGu}: તમારી પાત્રતા તપાસો.`
        : `Check your eligibility for ${scheme.shortTitle}.`
    );
  };

  return (
    <div id="top" className="min-h-screen flex flex-col bg-vanilla-cream text-charcoal">
      {currentUser && (
        <aside
          aria-label="User session active"
          className="bg-forest-green text-warm-ivory px-3 py-1.5 text-xs text-center flex items-center justify-center gap-2 flex-wrap shadow-sm border-b border-warm-ivory/15"
        >
          <span>
            {language === 'gu' ? 'નમસ્તે' : 'Welcome'}, <strong className="text-saffron">{currentUser.identifier}</strong>
          </span>
          <button
            type="button"
            onClick={() => {
              window.history.pushState({}, '', '/user-home');
              window.dispatchEvent(new PopStateEvent('popstate'));
            }}
            className="font-bold underline text-saffron hover:text-warm-ivory transition-colors cursor-pointer"
          >
            {language === 'gu' ? 'હોમ પેજ →' : 'User Home →'}
          </button>
        </aside>
      )}

      <Navbar
        language={language}
        onLanguageChange={handleLanguageChange}
        onNavigate={scrollToSection}
        onOpenLogin={() => {
          window.history.pushState({}, '', '/login');
          window.dispatchEvent(new PopStateEvent('popstate'));
        }}
      />

      <main className="flex-1">
        <HeroSection
          language={language}
          onExploreSchemes={() => scrollToSection('schemes')}
          onHowItWorks={() => scrollToSection('how-it-works')}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onSelectCategoryChip={(categoryId) => {
            setSelectedCategory(categoryId);
            scrollToSection('schemes');
          }}
          onCheckEligibility={() => scrollToSection('eligibility')}
        />

        <SchemesSection
          language={language}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onClearSearch={() => setSearchQuery('')}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          selectedScheme={selectedScheme}
          onSelectScheme={setSelectedScheme}
          onApplyScheme={handleApplyScheme}
          onCheckEligibilityFromScheme={handleCheckSchemeEligibility}
          onTriggerToast={showToast}
          isLoading={isLoadingData}
        />

        <EligibilityChecker
          language={language}
          schemes={SCHEMES_DATA}
          isLoading={isLoadingData}
          onSelectScheme={handleSelectScheme}
        />

        <HowItWorks
          language={language}
          onSelectStep={handleSelectProcessStep}
        />

        <TrackApplication language={language} />

        <BenefitsSection language={language} />

        <LatestUpdates
          language={language}
          updates={SITE_GUIDANCE_ITEMS}
          isLoading={isLoadingData}
        />

        <HelpSection
          language={language}
          isLoading={isLoadingData}
          activeCategory={resourceCategory}
          onCategoryChange={(cat) => {
            setResourceCategory(cat);
            setHighlightedResourceId(null);
          }}
          highlightedResourceId={highlightedResourceId}
        />
      </main>

      <Footer
        language={language}
        onLanguageChange={handleLanguageChange}
        onNavigate={scrollToSection}
      />

      <LoginModal
        isOpen={isLoginOpen}
        language={language}
        onClose={() => setIsLoginOpen(false)}
      />

      {toastMessage && (
        <NotificationToast
          message={toastMessage}
          onDismiss={() => setToastMessage(null)}
        />
      )}
    </div>
  );
}

export default App;