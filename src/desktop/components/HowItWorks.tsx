import React from 'react';
import {
  Search,
  FileText,
  ShieldCheck,
  Clock3,
  ArrowRight,
} from 'lucide-react';
import { Language } from '../../data/schemes';
import { HOW_IT_WORKS_STEPS, ProcessStepItem } from '../data/siteLayoutData';

export interface HowItWorksProps {
  language: Language;
  onSelectStep?: (step: ProcessStepItem) => void;
}

export const HowItWorks: React.FC<HowItWorksProps> = ({
  language,
  onSelectStep,
}) => {
  const renderStepIcon = (iconName: ProcessStepItem['iconName']) => {
    switch (iconName) {
      case 'Search':
        return <Search aria-hidden="true" className="w-5 h-5 text-saffron" />;
      case 'FileText':
        return <FileText aria-hidden="true" className="w-5 h-5 text-saffron" />;
      case 'ShieldCheck':
        return <ShieldCheck aria-hidden="true" className="w-5 h-5 text-saffron" />;
      case 'Clock3':
        return <Clock3 aria-hidden="true" className="w-5 h-5 text-saffron" />;
    }
  };

  return (
    <section
      id="how-it-works"
      aria-labelledby="how-it-works-heading"
      className="scroll-mt-28 mx-auto w-full max-w-desktop px-4 sm:px-6 lg:px-8 xl:px-8 2xl:px-10 py-6"
    >
      <div className="relative overflow-hidden rounded-glass-lg bg-forest-green text-warm-ivory px-5 sm:px-8 xl:px-10 2xl:px-14 py-10 lg:py-12 2xl:py-14 shadow-card border border-forest-green">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 -right-24 w-96 h-96 rounded-full bg-saffron/10 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-sage-green/10 blur-3xl"
        />

        <div className="relative z-10 text-center max-w-2xl mx-auto mb-10 lg:mb-12">
          <h2
            id="how-it-works-heading"
            className="text-[26px] sm:text-[32px] font-bold text-warm-ivory tracking-tight"
          >
            {language === 'gu' ? (
              <span lang="gu" className="font-gujarati">
                દરેક વિદ્યાર્થી માટે સરળ પ્રક્રિયા
              </span>
            ) : (
              'A Simple Process for Every Student'
            )}
          </h2>
          <p className="mt-2 text-[15px] sm:text-[16px] text-sage-green/90 font-normal">
            {language === 'gu' ? (
              <span lang="gu" className="font-gujarati">
                દરેક વિદ્યાર્થી માટે સ્પષ્ટ અને પારદર્શક પ્રક્રિયા.
              </span>
            ) : (
              'A clear and transparent journey for every student.'
            )}
          </p>
        </div>

        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 xl:gap-5 2xl:gap-6">
          {HOW_IT_WORKS_STEPS.map((step, index) => {
            const isLast = index === HOW_IT_WORKS_STEPS.length - 1;

            return (
              <div key={step.number} className="relative flex items-stretch">
                <div
                  role={onSelectStep ? 'button' : undefined}
                  tabIndex={onSelectStep ? 0 : undefined}
                  onClick={() => onSelectStep && onSelectStep(step)}
                  onKeyDown={(e) => {
                    if (
                      onSelectStep &&
                      (e.key === 'Enter' || e.key === ' ')
                    ) {
                      e.preventDefault();
                      onSelectStep(step);
                    }
                  }}
                  className="group relative isolate w-full overflow-hidden rounded-glass bg-warm-ivory/[0.08] hover:bg-warm-ivory/[0.13] hover:border-saffron/50 hover:shadow-glass-hover border border-warm-ivory/20 p-4.5 xl:p-5 2xl:p-6 flex flex-col justify-between transition-all duration-normal ease-smooth cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron"
                >
                  <span aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 rounded-glass bg-gradient-to-br from-warm-ivory/0 via-saffron/5 to-warm-ivory/10 opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100" />
                  <div className="relative z-10">
                    <div className="flex items-center justify-between gap-3 mb-4 xl:mb-5">
                      <span className="inline-flex items-center justify-center px-2.5 2xl:px-3 py-1 rounded-pill bg-saffron text-charcoal text-[12px] 2xl:text-[13px] font-extrabold tracking-wider">
                        {language === 'gu' ? (
                          <span lang="gu" className="font-gujarati">
                            {step.numberGu}
                          </span>
                        ) : (
                          step.number
                        )}
                      </span>

                      <div className="w-9 h-9 2xl:w-10 2xl:h-10 rounded-glass-sm bg-warm-ivory/10 border border-warm-ivory/15 flex items-center justify-center group-hover:scale-105 transition-transform duration-fast">
                        {renderStepIcon(step.iconName)}
                      </div>
                    </div>

                    <h3 className="text-[16px] xl:text-[17px] 2xl:text-[18px] font-bold text-warm-ivory tracking-tight">
                      {language === 'gu' ? (
                        <span lang="gu" className="font-gujarati">
                          {step.numberGu} — {step.titleGu}
                        </span>
                      ) : (
                        step.number + ' — ' + step.title
                      )}
                    </h3>

                    <p className="mt-2 text-[13px] xl:text-[13.5px] 2xl:text-[14px] text-sage-green/90 leading-relaxed">
                      {language === 'gu' ? (
                        <span lang="gu" className="font-gujarati">
                          {step.descriptionGu}
                        </span>
                      ) : (
                        step.description
                      )}
                    </p>
                  </div>

                  <div className="relative z-10 mt-5 pt-3 border-t border-warm-ivory/15 flex items-center justify-between text-[12px] text-sage-green/80">
                    <span>
                      {language === 'gu' ? (
                        <span lang="gu" className="font-gujarati">
                          પગલું {step.numberGu}
                        </span>
                      ) : (
                        'Step ' + step.number + ' of 04'
                      )}
                    </span>
                    <ArrowRight aria-hidden="true" className="w-3.5 h-3.5 text-saffron group-hover:translate-x-1 transition-transform duration-fast" />
                  </div>
                </div>

                {!isLast && (
                  <div
                    aria-hidden="true"
                    className="hidden lg:flex items-center justify-center -right-2.5 xl:-right-3 2xl:-right-3.5 top-1/2 -translate-y-1/2 absolute z-20 w-6 h-6 xl:w-6.5 xl:h-6.5 2xl:w-7 2xl:h-7 rounded-full bg-forest-green border border-warm-ivory/30 text-saffron shadow-sm"
                  >
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
