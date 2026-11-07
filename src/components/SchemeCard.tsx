import React from 'react';
import {
  GraduationCap,
  Bike,
  BookOpen,
  UsersRound,
  ArrowRight,
} from 'lucide-react';
import { Language, SchemeItem } from '../data/schemes';

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
    <article className="scheme-card-surface relative overflow-hidden p-4 sm:p-5 lg:p-6 flex flex-col justify-between h-full group">
      {/* Subdued decorative watermark on desktop */}
      <div
        aria-hidden="true"
        className="hidden lg:block pointer-events-none absolute -bottom-5 -right-5 text-sage-green/80 group-hover:text-sage-green transition-colors duration-normal"
      >
        {renderIcon('w-28 h-28 stroke-[1.25] opacity-55')}
      </div>

      <div className="relative z-10">
        {/* Icon + Category Badge Row (Compact inline pairing on mobile per Screen 03, justified on desktop) */}
        <div className="flex items-center lg:justify-between gap-3 mb-3.5 lg:mb-5">
          <div className="w-11 h-11 lg:w-12 lg:h-12 rounded-xl lg:rounded-glass-sm bg-sage-green text-forest-green border border-warm-border/70 flex items-center justify-center shadow-sm group-hover:bg-forest-green group-hover:text-warm-ivory transition-colors duration-normal ease-smooth shrink-0">
            {renderIcon('w-5 h-5 lg:w-6 lg:h-6')}
          </div>

          <span className="px-2.5 py-1 rounded-pill bg-sage-green/65 lg:bg-vanilla-cream text-[11px] font-semibold text-forest-green lg:text-muted-text border border-warm-border/70">
            {language === 'gu' ? (
              <span lang="gu" className="font-gujarati">
                {scheme.categoryTagGu}
              </span>
            ) : (
              scheme.categoryTag
            )}
          </span>
        </div>

        {/* Title: Clean readable shortTitle on mobile (Screen 03) and uppercase title on desktop */}
        <h3 className="text-[16.5px] lg:text-[17px] font-bold text-charcoal tracking-tight group-hover:text-forest-green transition-colors duration-fast">
          {language === 'gu' ? (
            <span lang="gu" className="font-gujarati">
              {scheme.titleGu}
            </span>
          ) : (
            <>
              <span className="lg:hidden">{scheme.shortTitle}</span>
              <span className="hidden lg:inline">{scheme.title}</span>
            </>
          )}
        </h3>

        {/* Description */}
        <p className="mt-1.5 lg:mt-2 text-[13.5px] lg:text-[14px] text-muted-text leading-relaxed">
          {language === 'gu' ? (
            <span lang="gu" className="font-gujarati">
              {scheme.descriptionGu}
            </span>
          ) : (
            scheme.description
          )}
        </p>
      </div>

      {/* Mobile Action Footer: "View Details ->" matching Screen 03 */}
      <div className="relative z-10 mt-3.5 pt-2.5 border-t border-warm-border/50 flex lg:hidden items-center justify-between">
        <button
          type="button"
          onClick={() => onSelect(scheme)}
          className="min-h-[38px] text-[13.5px] font-bold text-forest-green hover:text-saffron transition-colors duration-fast inline-flex items-center gap-1.5"
        >
          <span>
            {language === 'gu' ? (
              <span lang="gu" className="font-gujarati">
                વિગતો જુઓ
              </span>
            ) : (
              'View Details'
            )}
          </span>
          <ArrowRight className="w-4 h-4" aria-hidden="true" />
        </button>
      </div>

      {/* Desktop Action Footer: Preserved intact */}
      <div className="hidden lg:flex relative z-10 mt-6 pt-4 border-t border-warm-border/70 items-center justify-between">
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
