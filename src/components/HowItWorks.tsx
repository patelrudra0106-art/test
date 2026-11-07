import React from 'react';
import { Search, FileText, ShieldCheck, Clock, ArrowRight } from 'lucide-react';
import { Language } from './LanguageSelector';

export type ProcessStepId = 'discover' | 'apply' | 'verify' | 'track';

export interface HowItWorksProps {
  language: Language;
  onSelectStep: (stepId: ProcessStepId) => void;
}

export const HowItWorks: React.FC<HowItWorksProps> = ({ language, onSelectStep }) => {
  const steps: Array<{
    id: ProcessStepId;
    number: string;
    title: string;
    description: string;
    footer: string;
    icon: React.ReactNode;
  }> = [
    {
      id: 'discover',
      number: '01',
      title: language === 'gu' ? '01 — શોધો (Discover)' : '01 — Discover',
      description:
        language === 'gu'
          ? 'તમે કઈ યોજનાઓ માટે પાત્ર છો તે શોધો.'
          : 'Explore scheme categories and review the published requirements.',
      footer: language === 'gu' ? 'પગલું ૦૧ / ૦૪' : 'Step 01 of 04',
      icon: <Search className="w-5 h-5 text-saffron" aria-hidden="true" />,
    },
    {
      id: 'apply',
      number: '02',
      title: language === 'gu' ? '02 — અરજી કરો (Apply)' : '02 — Apply',
      description:
        language === 'gu'
          ? 'હાલની સત્તાવાર સૂચનામાં આપેલી અરજી પ્રક્રિયાનું અનુસરણ કરો.'
          : 'Follow the application instructions in the current official notice.',
      footer: language === 'gu' ? 'પગલું ૦૨ / ૦૪' : 'Step 02 of 04',
      icon: <FileText className="w-5 h-5 text-saffron" aria-hidden="true" />,
    },
    {
      id: 'verify',
      number: '03',
      title: language === 'gu' ? '03 — ચકાસણી (Verify)' : '03 — Verify',
      description:
        language === 'gu'
          ? 'સંબંધિત અધિકારી દ્વારા નક્કી કરેલા દસ્તાવેજ અને ચકાસણીના પગલાં અનુસરો.'
          : 'Follow the document and verification steps set by the responsible authority.',
      footer: language === 'gu' ? 'પગલું ૦૩ / ૦૪' : 'Step 03 of 04',
      icon: <ShieldCheck className="w-5 h-5 text-saffron" aria-hidden="true" />,
    },
    {
      id: 'track',
      number: '04',
      title: language === 'gu' ? '04 — ટ્રેક કરો (Track)' : '04 — Track',
      description:
        language === 'gu'
          ? 'સત્તાવાર વિભાગની સેવા દ્વારા અરજીની સ્થિતિ તપાસો.'
          : 'Check application status through the official department service.',
      footer: language === 'gu' ? 'પગલું ૦૪ / ૦૪' : 'Step 04 of 04',
      icon: <Clock className="w-5 h-5 text-saffron" aria-hidden="true" />,
    },
  ];

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLDivElement>,
    stepId: ProcessStepId
  ) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onSelectStep(stepId);
    }
  };

  return (
    <section
      id="how-it-works"
      className="py-14 lg:py-20 bg-forest-green text-warm-ivory"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-10 lg:mb-12">
          <span className="inline-block px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-warm-ivory/10 text-saffron border border-warm-ivory/15 mb-3">
            {language === 'gu' ? 'સરળ માર્ગદર્શિકા' : 'How It Works'}
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-warm-ivory">
            {language === 'gu'
              ? 'દરેક વિદ્યાર્થી માટે સરળ પ્રક્રિયા'
              : 'A Simple Process for Every Student'}
          </h2>
          <p className="mt-2.5 text-sm sm:text-base text-warm-ivory/80">
            {language === 'gu'
              ? 'યોજનાઓની માહિતીથી લઈને સત્તાવાર અરજી પ્રક્રિયા સુધીના ચાર માર્ગદર્શક પગલાં.'
              : 'Four guided stages for exploring schemes and following the official application process.'}
          </p>
        </div>

        {/* 1 col on mobile, 2 cols on tablet, 4 cols on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {steps.map((step) => (
            <div
              key={step.id}
              role="button"
              tabIndex={0}
              aria-label={`${step.title}: ${step.description}`}
              onClick={() => onSelectStep(step.id)}
              onKeyDown={(e) => handleKeyDown(e, step.id)}
              className="group relative flex flex-col justify-between rounded-3xl p-6 bg-warm-ivory/10 hover:bg-warm-ivory/15 border border-warm-ivory/15 hover:border-saffron/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron transition-all duration-200 cursor-pointer select-none text-left"
            >
              <div>
                <div className="flex items-center justify-between gap-3 mb-6">
                  <span className="inline-flex items-center justify-center px-3.5 py-1 rounded-full text-xs font-extrabold bg-saffron text-charcoal">
                    {step.number}
                  </span>
                  <div className="w-10 h-10 rounded-xl bg-warm-ivory/10 border border-warm-ivory/15 flex items-center justify-center group-hover:border-saffron/50 transition-colors">
                    {step.icon}
                  </div>
                </div>

                <h3 className="text-lg sm:text-xl font-extrabold text-warm-ivory mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-warm-ivory/80 leading-relaxed">
                  {step.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-warm-ivory/15 flex items-center justify-between text-xs font-medium text-warm-ivory/75">
                <span>{step.footer}</span>
                <ArrowRight
                  className="w-4 h-4 text-saffron group-hover:translate-x-1 transition-transform"
                  aria-hidden="true"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;