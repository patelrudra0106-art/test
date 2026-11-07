import React from 'react';
import {
  Layers3,
  CheckCircle2,
  UsersRound,
  GraduationCap,
} from 'lucide-react';
import { Language } from '../data/schemes';
import { BENEFIT_CARDS, BenefitCardItem } from '../data/siteContent';

export interface BenefitsSectionProps {
  language: Language;
}

export const BenefitsSection: React.FC<BenefitsSectionProps> = ({
  language,
}) => {
  const renderBenefitIcon = (iconName: BenefitCardItem['iconName']) => {
    switch (iconName) {
      case 'Layers3':
        return <Layers3 aria-hidden="true" className="w-6 h-6 text-forest-green" />;
      case 'CheckCircle2':
        return <CheckCircle2 aria-hidden="true" className="w-6 h-6 text-forest-green" />;
      case 'UsersRound':
        return <UsersRound aria-hidden="true" className="w-6 h-6 text-forest-green" />;
      case 'GraduationCap':
        return <GraduationCap aria-hidden="true" className="w-6 h-6 text-forest-green" />;
    }
  };

  return (
    <section
      id="benefits"
      aria-labelledby="benefits-section-heading"
      className="mx-auto w-full max-w-desktop px-4 sm:px-6 lg:px-10 py-12"
    >
      <div className="mb-8">
        <h2
          id="benefits-section-heading"
          className="text-[26px] sm:text-[30px] font-bold text-charcoal tracking-tight"
        >
          {language === 'gu' ? (
            <span lang="gu" className="font-gujarati">
              શા માટે વિદ્યા પ્રગતિ સેતુ?
            </span>
          ) : (
            'Why Vidya Pragati Setu?'
          )}
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {BENEFIT_CARDS.map((card) => (
          <article
            key={card.id}
            className="scheme-card-surface p-6 flex flex-col justify-between h-full"
          >
            <div>
              <div className="w-12 h-12 rounded-glass-sm bg-sage-green border border-warm-border/70 flex items-center justify-center mb-5 shadow-sm">
                {renderBenefitIcon(card.iconName)}
              </div>

              <h3 className="text-[17px] font-bold text-charcoal leading-snug">
                {language === 'gu' ? (
                  <span lang="gu" className="font-gujarati">
                    {card.titleGu}
                  </span>
                ) : (
                  card.title
                )}
              </h3>

              <p className="mt-2 text-[14.5px] text-muted-text leading-relaxed">
                {language === 'gu' ? (
                  <span lang="gu" className="font-gujarati">
                    {card.descriptionGu}
                  </span>
                ) : (
                  card.description
                )}
              </p>
            </div>

            <div className="mt-5 pt-3 border-t border-warm-border/60 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-saffron" aria-hidden="true" />
              <span className="text-[11.5px] font-semibold text-forest-green">
                {language === 'gu' ? (
                  <span lang="gu" className="font-gujarati">
                    વિદ્યાર્થી કેન્દ્રિત ડિઝાઇન
                  </span>
                ) : (
                  'Student-First Design'
                )}
              </span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default BenefitsSection;
