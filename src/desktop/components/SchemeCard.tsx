import React from 'react';
import {
  GraduationCap,
  Bike,
  BookOpen,
  UsersRound,
  ArrowRight,
} from 'lucide-react';
import { Language, SchemeItem } from '../../data/schemes';

export interface SchemeCardProps {
  scheme: SchemeItem;
  language: Language;
  onSelect: (scheme: SchemeItem) => void;
}

export const SchemeCard: React.FC<SchemeCardProps> = ({
  scheme,
  language,
  onSelect,
}) => {
  const renderIcon = (className: string) => {
    switch (scheme.icon) {
      case 'GraduationCap':
        return <GraduationCap className={className} aria-hidden="true" />;
      case 'Bike':
        return <Bike className={className} aria-hidden="true" />;
      case 'BookOpen':
        return <BookOpen className={className} aria-hidden="true" />;
      case 'UsersRound':
        return <UsersRound className={className} aria-hidden="true" />;
    }
  };

  return (
    <article className="scheme-card-surface relative overflow-hidden p-5 xl:p-5 2xl:p-6 flex flex-col justify-between h-full group">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-5 -right-5 text-sage-green/80 group-hover:text-sage-green transition-colors duration-normal"
      >
        {renderIcon('w-28 h-28 stroke-[1.25] opacity-55')}
      </div>

      <div className="relative z-10">
        <div className="flex items-center justify-between gap-2 mb-4 xl:mb-4.5 2xl:mb-5">
          <div className="w-11 h-11 xl:w-11 xl:h-11 2xl:w-12 2xl:h-12 rounded-glass-sm bg-sage-green text-forest-green border border-warm-border/70 flex items-center justify-center shadow-sm group-hover:bg-forest-green group-hover:text-warm-ivory transition-colors duration-normal ease-smooth">
            {renderIcon('w-5 h-5 2xl:w-6 2xl:h-6')}
          </div>

          <span className="px-2.5 py-1 rounded-pill bg-vanilla-cream text-[10.5px] 2xl:text-[11px] font-semibold text-muted-text border border-warm-border/70">
            {language === 'gu' ? (
              <span lang="gu" className="font-gujarati">
                {scheme.categoryTagGu}
              </span>
            ) : (
              scheme.categoryTag
            )}
          </span>
        </div>

        <h3 className="text-[15.5px] xl:text-[16px] 2xl:text-[17px] font-bold text-charcoal tracking-tight group-hover:text-forest-green transition-colors duration-fast">
          {language === 'gu' ? (
            <span lang="gu" className="font-gujarati">
              {scheme.titleGu}
            </span>
          ) : (
            scheme.title
          )}
        </h3>

        <p className="mt-2 text-[13px] xl:text-[13.5px] 2xl:text-[14px] text-muted-text leading-relaxed">
          {language === 'gu' ? (
            <span lang="gu" className="font-gujarati">
              {scheme.descriptionGu}
            </span>
          ) : (
            scheme.description
          )}
        </p>
      </div>

      <div className="relative z-10 mt-6 pt-4 border-t border-warm-border/70 flex items-center justify-between">
        <button
          type="button"
          onClick={() => onSelect(scheme)}
          className="text-[13.5px] font-bold text-forest-green group-hover:text-saffron transition-colors duration-fast inline-flex items-center gap-1.5 focus-visible:rounded"
        >
          <span>
            {language === 'gu' ? (
              <span lang="gu" className="font-gujarati">
                વધુ જાણો
              </span>
            ) : (
              'Learn More'
            )}
          </span>
        </button>

        <button
          type="button"
          onClick={() => onSelect(scheme)}
          aria-label={'View details for ' + scheme.shortTitle}
          className="w-8 h-8 rounded-full bg-vanilla-cream border border-warm-border text-forest-green flex items-center justify-center group-hover:bg-forest-green group-hover:text-warm-ivory group-hover:border-forest-green transition-all duration-fast ease-smooth"
        >
          <ArrowRight className="w-4 h-4" aria-hidden="true" />
        </button>
      </div>
    </article>
  );
};

export default SchemeCard;
