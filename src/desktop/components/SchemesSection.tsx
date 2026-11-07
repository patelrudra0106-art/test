import React, { useState, useEffect } from 'react';
import {
  ArrowRight,
  CheckCircle2,
  FileText,
  X,
  Sparkles,
  Clock3,
  Building2,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Language, SchemeItem, getStoredSchemes } from '../../data/schemes';
import { SchemeCard } from './SchemeCard';
import { cn, scrollToSection } from '../lib/utils';

export interface SchemesSectionProps {
  language: Language;
  searchQuery?: string;
  onClearSearch?: () => void;
  selectedScheme: SchemeItem | null;
  onSelectScheme: (scheme: SchemeItem | null) => void;
  onTriggerToast?: (message: string) => void;
  isLoading?: boolean;
}

export const SchemesSection: React.FC<SchemesSectionProps> = ({
  language,
  searchQuery = '',
  onClearSearch,
  selectedScheme,
  onSelectScheme,
  onTriggerToast,
  isLoading = false,
}) => {
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>('ALL');
  const [schemes, setSchemes] = useState<SchemeItem[]>(() => getStoredSchemes());

  useEffect(() => {
    const handleUpdate = () => setSchemes(getStoredSchemes());
    window.addEventListener('vps_schemes_updated', handleUpdate);
    return () => window.removeEventListener('vps_schemes_updated', handleUpdate);
  }, []);

  const categories = [
    { id: 'ALL', labelEn: 'All Schemes', labelGu: 'તમામ યોજનાઓ' },
    { id: 'scholarship-schemes', labelEn: 'Scholarships', labelGu: 'શિષ્યવૃત્તિ' },
    { id: 'bicycle-assistance', labelEn: 'Bicycles', labelGu: 'સાયકલ સહાય' },
    { id: 'free-textbooks', labelEn: 'Textbooks', labelGu: 'પાઠ્યપુસ્તકો' },
    { id: 'other-assistance', labelEn: 'Other Support', labelGu: 'અન્ય સહાય' },
  ];

  const displayedSchemes = schemes.filter((scheme) => {
    const matchesCategory =
      activeCategoryFilter === 'ALL' || scheme.id === activeCategoryFilter;
    const q = searchQuery.trim().toLowerCase();
    const matchesQuery =
      !q ||
      scheme.title.toLowerCase().includes(q) ||
      scheme.description.toLowerCase().includes(q) ||
      scheme.categoryTag.toLowerCase().includes(q) ||
      scheme.targetGroup.toLowerCase().includes(q) ||
      scheme.titleGu.includes(q) ||
      scheme.descriptionGu.includes(q);

    return matchesCategory && matchesQuery;
  });

  const handleViewAll = () => {
    setActiveCategoryFilter('ALL');
    if (onClearSearch) {
      onClearSearch();
    }
    if (onTriggerToast) {
      onTriggerToast(
        language === 'gu'
          ? 'તમામ ૪ મુખ્ય યોજના શ્રેણીઓ દર્શાવવામાં આવી છે.'
          : 'Showing all 4 primary student assistance categories.'
      );
    }
  };

  return (
    <section
      id="schemes"
      aria-labelledby="popular-schemes-heading"
      className="mx-auto w-full max-w-desktop px-4 sm:px-6 lg:px-8 xl:px-8 2xl:px-10 pt-12 xl:pt-14 pb-12"
    >
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-7">
        <div>
          <h2
            id="popular-schemes-heading"
            className="text-[26px] sm:text-[30px] font-bold text-charcoal tracking-tight"
          >
            {language === 'gu' ? (
              <span lang="gu" className="font-gujarati">
                લોકપ્રિય યોજનાઓ
              </span>
            ) : (
              'Popular Schemes'
            )}
          </h2>
          <p className="text-[15px] text-muted-text mt-1">
            {language === 'gu' ? (
              <span lang="gu" className="font-gujarati">
                તમારી શૈક્ષણિક યાત્રા માટે યોગ્ય યોજના શોધો.
              </span>
            ) : (
              'Discover the right scheme for your education journey.'
            )}
          </p>
        </div>

        <button
          type="button"
          onClick={handleViewAll}
          className="inline-flex items-center gap-2 text-[14px] font-bold text-forest-green hover:text-saffron transition-colors duration-fast self-start sm:self-auto group"
        >
          <span>
            {language === 'gu' ? (
              <span lang="gu" className="font-gujarati">
                તમામ યોજનાઓ જુઓ
              </span>
            ) : (
              'View All Schemes'
            )}
          </span>
          <ArrowRight
            className="w-4 h-4 transition-transform duration-fast group-hover:translate-x-1"
            aria-hidden="true"
          />
        </button>
      </div>

      <div
        id="scheme-category-filters"
        className="scroll-mt-28 flex flex-wrap items-center justify-between gap-3 mb-6"
      >
        <div
          role="tablist"
          aria-label="Filter schemes by category"
          className="inline-flex flex-wrap items-center gap-1.5 p-1 rounded-pill glass-style-d"
        >
          {categories.map((cat) => {
            const active = activeCategoryFilter === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setActiveCategoryFilter(cat.id)}
                className={cn(
                  'px-3.5 py-1.5 rounded-pill text-[12.5px] font-semibold transition-all duration-fast',
                  active
                    ? 'bg-forest-green text-warm-ivory shadow-sm'
                    : 'text-charcoal/85 hover:text-forest-green hover:bg-sage-green/60'
                )}
              >
                {language === 'gu' ? (
                  <span lang="gu" className="font-gujarati">
                    {cat.labelGu}
                  </span>
                ) : (
                  cat.labelEn
                )}
              </button>
            );
          })}
        </div>

        {searchQuery.trim() !== '' && (
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-pill bg-warm-ivory border border-warm-border text-[12.5px] text-charcoal">
            <span>
              Filtered by: <strong className="text-forest-green">&ldquo;{searchQuery}&rdquo;</strong>
            </span>
            {onClearSearch && (
              <button
                type="button"
                onClick={onClearSearch}
                className="text-muted-text hover:text-charcoal font-bold"
                aria-label="Clear active search filter"
              >
                <X className="w-3.5 h-3.5" aria-hidden="true" />
              </button>
            )}
          </div>
        )}
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 xl:gap-5 2xl:gap-6">
          {Array.from({ length: 4 }).map((_, idx) => (
            <div
              key={idx}
              className="scheme-card-surface p-5 xl:p-5 2xl:p-6 h-64 flex flex-col justify-between"
              aria-hidden="true"
            >
              <div>
                <div className="w-12 h-12 rounded-glass-sm skeleton-shimmer mb-5" />
                <div className="h-5 w-3/4 rounded skeleton-shimmer mb-3" />
                <div className="h-4 w-full rounded skeleton-shimmer mb-2" />
                <div className="h-4 w-2/3 rounded skeleton-shimmer" />
              </div>
              <div className="pt-4 border-t border-warm-border/60 flex items-center justify-between">
                <div className="h-4 w-24 rounded skeleton-shimmer" />
                <div className="w-8 h-8 rounded-full skeleton-shimmer" />
              </div>
            </div>
          ))}
        </div>
      ) : displayedSchemes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 xl:gap-5 2xl:gap-6">
          {displayedSchemes.map((scheme) => (
            <SchemeCard
              key={scheme.id}
              scheme={scheme}
              language={language}
              onSelect={(item) => onSelectScheme(item)}
            />
          ))}
        </div>
      ) : (
        <div className="glass-style-b rounded-glass p-10 text-center max-w-lg mx-auto my-4">
          <p className="text-card-heading font-bold text-charcoal">
            No schemes match your current filter
          </p>
          <p className="text-body-sm text-muted-text mt-1">
            Try clearing your search term or switching back to &ldquo;All Schemes&rdquo; to explore all available assistance categories.
          </p>
          <button
            type="button"
            onClick={handleViewAll}
            className="btn-primary mt-4 px-5 py-2.5 rounded-pill text-body-sm font-semibold"
          >
            Reset Filters
          </button>
        </div>
      )}

      <AnimatePresence>
        {selectedScheme && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-charcoal/45 backdrop-blur-sm"
            role="dialog"
            aria-modal="true"
            aria-labelledby="scheme-detail-modal-title"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 12 }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="glass-style-c w-full max-w-2xl rounded-glass-lg border border-warm-border shadow-glass-hover overflow-hidden bg-warm-ivory"
            >
              <div className="px-6 py-5 bg-forest-green text-warm-ivory flex items-start justify-between gap-4">
                <div>
                  <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-pill bg-warm-ivory/15 text-warm-ivory text-[11px] font-semibold mb-2">
                    <Sparkles className="w-3 h-3 text-saffron" aria-hidden="true" />
                    <span>{selectedScheme.categoryTag}</span>
                  </div>
                  <h3
                    id="scheme-detail-modal-title"
                    className="text-xl sm:text-2xl font-bold leading-snug"
                  >
                    {language === 'gu' ? (
                      <span lang="gu" className="font-gujarati">
                        {selectedScheme.titleGu}
                      </span>
                    ) : (
                      selectedScheme.shortTitle
                    )}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => onSelectScheme(null)}
                  aria-label="Close scheme details"
                  className="p-2 rounded-full bg-warm-ivory/10 hover:bg-warm-ivory/20 text-warm-ivory transition-colors"
                >
                  <X className="w-5 h-5" aria-hidden="true" />
                </button>
              </div>

              <div className="p-6 max-h-[75vh] overflow-y-auto space-y-5 text-left">
                <div className="p-4 rounded-glass-sm bg-sage-green/75 border border-warm-border">
                  <p className="text-utility uppercase tracking-wider font-bold text-forest-green">
                    {language === 'gu' ? (
                      <span lang="gu" className="font-gujarati">
                        મુખ્ય લાભ
                      </span>
                    ) : (
                      'Benefit Summary'
                    )}
                  </p>
                  <p className="text-body-sm font-semibold text-charcoal mt-1">
                    {language === 'gu' ? (
                      <span lang="gu" className="font-gujarati">
                        {selectedScheme.benefitSummaryGu}
                      </span>
                    ) : (
                      selectedScheme.benefitSummary
                    )}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-3.5 rounded-glass-sm bg-vanilla-cream/70 border border-warm-border/80 flex items-start gap-3">
                    <Clock3 className="w-4 h-4 text-forest-green shrink-0 mt-0.5" aria-hidden="true" />
                    <div>
                      <span className="text-utility text-muted-text block">Schedule</span>
                      <span className="text-body-sm font-semibold text-charcoal">
                        {selectedScheme.applicationWindow}
                      </span>
                    </div>
                  </div>
                  <div className="p-3.5 rounded-glass-sm bg-vanilla-cream/70 border border-warm-border/80 flex items-start gap-3">
                    <Building2 className="w-4 h-4 text-forest-green shrink-0 mt-0.5" aria-hidden="true" />
                    <div>
                      <span className="text-utility text-muted-text block">Target Students</span>
                      <span className="text-body-sm font-semibold text-charcoal">
                        {language === 'gu' ? (
                          <span lang="gu" className="font-gujarati">
                            {selectedScheme.targetGroupGu}
                          </span>
                        ) : (
                          selectedScheme.targetGroup
                        )}
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-body-sm font-bold uppercase tracking-wider text-charcoal mb-2.5 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-forest-green" aria-hidden="true" />
                    <span>
                      {language === 'gu' ? (
                        <span lang="gu" className="font-gujarati">
                          પાત્રતાના માપદંડો
                        </span>
                      ) : (
                        'Eligibility Criteria'
                      )}
                    </span>
                  </h4>
                  <ul className="space-y-2">
                    {(language === 'gu'
                      ? selectedScheme.eligibilityBulletsGu
                      : selectedScheme.eligibilityBullets
                    ).map((bullet, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-2.5 text-body-sm text-charcoal/90"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-saffron mt-2 shrink-0" />
                        <span lang={language === 'gu' ? 'gu' : undefined}>
                          {bullet}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-body-sm font-bold uppercase tracking-wider text-charcoal mb-2.5 flex items-center gap-2">
                    <FileText className="w-4 h-4 text-forest-green" aria-hidden="true" />
                    <span>
                      {language === 'gu' ? (
                        <span lang="gu" className="font-gujarati">
                          જરૂરી દસ્તાવેજો
                        </span>
                      ) : (
                        'Indicative Documents Required'
                      )}
                    </span>
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {(language === 'gu'
                      ? selectedScheme.requiredDocumentsGu
                      : selectedScheme.requiredDocuments
                    ).map((doc, idx) => (
                      <div
                        key={idx}
                        className="px-3 py-2 rounded-lg bg-warm-ivory border border-warm-border text-[13px] font-medium text-charcoal flex items-center gap-2"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-forest-green shrink-0" aria-hidden="true" />
                        <span lang={language === 'gu' ? 'gu' : undefined}>{doc}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="px-6 py-4 bg-vanilla-cream border-t border-warm-border flex flex-wrap items-center justify-between gap-3">
                <span className="text-utility text-muted-text">
                  Confirm current eligibility, benefits, dates and application instructions with the responsible scheme authority.
                </span>
                <div className="flex items-center gap-2.5">
                  <button
                    type="button"
                    onClick={() => onSelectScheme(null)}
                    className="btn-secondary px-4 py-2 rounded-pill text-body-sm font-semibold"
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      const title = selectedScheme.shortTitle;
                      onSelectScheme(null);
                      scrollToSection('eligibility');
                      onTriggerToast?.(
                        'Review the eligibility guidance for ' + title + ' and confirm the current requirements with the responsible authority.'
                      );
                    }}
                    className="btn-primary px-5 py-2 rounded-pill text-body-sm font-semibold inline-flex items-center gap-1.5"
                  >
                    <span>Check Eligibility</span>
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default SchemesSection;
