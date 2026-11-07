import React, { useState, useEffect } from 'react';
import {
  ArrowRight,
  ChevronLeft,
  CheckCircle2,
  FileText,
  X,
  Sparkles,
  Calendar,
  Monitor,
  UsersRound,
  GraduationCap,
  Bike,
  BookOpen,
  Search,
  SlidersHorizontal,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Language, POPULAR_SCHEMES, SchemeItem } from '../data/schemes';
import { SchemeCard } from './SchemeCard';
import { cn } from '../lib/utils';

export interface SchemesSectionProps {
  language: Language;
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
  onClearSearch?: () => void;
  selectedCategory?: string;
  onCategoryChange?: (categoryId: string) => void;
  selectedScheme: SchemeItem | null;
  onSelectScheme: (scheme: SchemeItem | null) => void;
  onApplyScheme?: (scheme: SchemeItem) => void;
  onCheckEligibilityFromScheme?: (scheme: SchemeItem) => void;
  onTriggerToast?: (message: string) => void;
  isLoading?: boolean;
}

type DetailTab = 'overview' | 'eligibility' | 'documents';

export const SchemesSection: React.FC<SchemesSectionProps> = ({
  language,
  searchQuery = '',
  onSearchChange,
  onClearSearch,
  selectedCategory,
  onCategoryChange,
  selectedScheme,
  onSelectScheme,
  onApplyScheme,
  onCheckEligibilityFromScheme,
  onTriggerToast,
  isLoading = false,
}) => {
  const [internalCategoryFilter, setInternalCategoryFilter] = useState<string>('ALL');
  const [activeDetailTab, setActiveDetailTab] = useState<DetailTab>('overview');

  const activeCategoryFilter = selectedCategory ?? internalCategoryFilter;

  // Reset detail tab to 'overview' whenever a new scheme is opened
  useEffect(() => {
    if (selectedScheme) {
      setActiveDetailTab('overview');
    }
  }, [selectedScheme]);

  // Allow Escape key to close the scheme detail sheet/modal
  useEffect(() => {
    if (!selectedScheme) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onSelectScheme(null);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [selectedScheme, onSelectScheme]);

  const setActiveCategoryFilter = (catId: string) => {
    if (onCategoryChange) {
      onCategoryChange(catId);
    } else {
      setInternalCategoryFilter(catId);
    }
  };

  const categories = [
    { id: 'ALL', labelEn: 'All', desktopLabelEn: 'All Schemes', labelGu: 'તમામ' },
    { id: 'scholarship-schemes', labelEn: 'Scholarships', desktopLabelEn: 'Scholarships', labelGu: 'શિષ્યવૃત્તિ' },
    { id: 'bicycle-assistance', labelEn: 'Bicycle', desktopLabelEn: 'Bicycles', labelGu: 'સાયકલ સહાય' },
    { id: 'free-textbooks', labelEn: 'Textbooks', desktopLabelEn: 'Textbooks', labelGu: 'પાઠ્યપુસ્તકો' },
    { id: 'other-assistance', labelEn: 'Other Support', desktopLabelEn: 'Other Support', labelGu: 'અન્ય સહાય' },
  ];

  const displayedSchemes = POPULAR_SCHEMES.filter((scheme) => {
    const matchesCategory =
      activeCategoryFilter === 'ALL' || scheme.id === activeCategoryFilter;
    const q = searchQuery.trim().toLowerCase();
    const matchesQuery =
      !q ||
      scheme.title.toLowerCase().includes(q) ||
      scheme.shortTitle.toLowerCase().includes(q) ||
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
    } else if (onSearchChange) {
      onSearchChange('');
    }
    if (onTriggerToast) {
      onTriggerToast(
        language === 'gu'
          ? 'તમામ ૪ મુખ્ય યોજના શ્રેણીઓ દર્શાવવામાં આવી છે.'
          : 'Showing all 4 primary student assistance categories.'
      );
    }
  };

  const renderSchemeDetailIcon = (iconName: SchemeItem['icon']) => {
    switch (iconName) {
      case 'GraduationCap':
        return <GraduationCap className="w-6 h-6 text-saffron" aria-hidden="true" />;
      case 'Bike':
        return <Bike className="w-6 h-6 text-saffron" aria-hidden="true" />;
      case 'BookOpen':
        return <BookOpen className="w-6 h-6 text-saffron" aria-hidden="true" />;
      case 'UsersRound':
        return <UsersRound className="w-6 h-6 text-saffron" aria-hidden="true" />;
    }
  };

  const handleApplyAction = (scheme: SchemeItem) => {
    const schemeTitle = language === 'gu' ? scheme.shortTitleGu : scheme.shortTitle;
    onSelectScheme(null);
    if (onApplyScheme) {
      onApplyScheme(scheme);
    } else if (onTriggerToast) {
      onTriggerToast(
        language === 'gu'
          ? schemeTitle + ' માટે પાત્રતા માર્ગદર્શન તપાસો અને અરજી માટે સત્તાવાર સૂચનાનું અનુસરણ કરો.'
          : 'Review the eligibility guidance for ' + schemeTitle + ' and follow the official scheme notice to apply.'
      );
    }
  };

  return (
    <section
      id="schemes"
      aria-labelledby="popular-schemes-heading"
      className="mx-auto w-full max-w-desktop px-4 sm:px-5 lg:px-10 pt-10 lg:pt-14 pb-8 lg:pb-12"
    >
      {/* Section Heading & Description */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 sm:gap-4 mb-4 lg:mb-7">
        <div>
          <h2
            id="popular-schemes-heading"
            className="text-[24px] sm:text-[30px] font-bold text-charcoal tracking-tight"
          >
            {language === 'gu' ? (
              <span lang="gu" className="font-gujarati">
                લોકપ્રિય યોજનાઓ
              </span>
            ) : (
              <>
                <span className="lg:hidden">Schemes</span>
                <span className="hidden lg:inline">Popular Schemes</span>
              </>
            )}
          </h2>
          <p className="text-[14px] sm:text-[15px] text-muted-text mt-1 leading-relaxed">
            {language === 'gu' ? (
              <span lang="gu" className="font-gujarati">
                તમારી શૈક્ષણિક યાત્રા અને વિકાસ માટે યોગ્ય સરકારી યોજના શોધો.
              </span>
            ) : (
              <>
                <span className="lg:hidden">
                  Explore government schemes designed for your education and growth.
                </span>
                <span className="hidden lg:inline">
                  Discover the right scheme for your education journey.
                </span>
              </>
            )}
          </p>
        </div>

        <button
          type="button"
          onClick={handleViewAll}
          className="hidden sm:inline-flex items-center gap-2 text-[14px] font-bold text-forest-green hover:text-saffron transition-colors duration-fast self-start sm:self-auto group"
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

      {/* SCREEN 03: Mobile Search Input + Filter Button Row (< lg) */}
      <div className="lg:hidden mb-3.5 flex items-center gap-2">
        <div className="glass-style-b flex-1 min-h-[44px] rounded-xl px-3.5 py-2 flex items-center gap-2.5 border border-warm-border focus-within:border-forest-green">
          <Search className="w-4 h-4 text-muted-text shrink-0" aria-hidden="true" />
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => onSearchChange && onSearchChange(e.target.value)}
            placeholder={language === 'gu' ? 'યોજના શોધો...' : 'Search schemes...'}
            aria-label="Filter schemes by keyword"
            className="w-full bg-transparent text-[14px] text-charcoal placeholder:text-muted-text/80 focus:outline-none"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => {
                if (onClearSearch) onClearSearch();
                else if (onSearchChange) onSearchChange('');
              }}
              aria-label="Clear search query"
              className="text-muted-text hover:text-charcoal p-1 rounded-full"
            >
              <X className="w-3.5 h-3.5" aria-hidden="true" />
            </button>
          )}
        </div>

        <button
          type="button"
          onClick={handleViewAll}
          aria-label="Reset scheme category filters"
          title="Reset filters"
          className="glass-style-b w-[44px] h-[44px] rounded-xl border border-warm-border flex items-center justify-center text-charcoal hover:text-forest-green shrink-0"
        >
          <SlidersHorizontal className="w-4 h-4" aria-hidden="true" />
        </button>
      </div>

      {/* Category Filter Chips */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5 lg:mb-6">
        <div
          role="tablist"
          aria-label="Filter schemes by category"
          className="w-full lg:w-auto flex items-center gap-2 lg:gap-1.5 overflow-x-auto no-scrollbar py-0.5 lg:p-1 rounded-pill lg:glass-style-d"
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
                  'min-h-[38px] lg:min-h-0 px-4 lg:px-3.5 py-1.5 rounded-pill text-[13px] lg:text-[12.5px] font-semibold transition-all duration-fast shrink-0',
                  active
                    ? 'bg-forest-green text-warm-ivory shadow-sm'
                    : 'bg-sage-green/70 lg:bg-transparent text-charcoal/85 border border-warm-border/70 lg:border-transparent hover:text-forest-green hover:bg-sage-green/60'
                )}
              >
                {language === 'gu' ? (
                  <span lang="gu" className="font-gujarati">
                    {cat.labelGu}
                  </span>
                ) : (
                  <>
                    <span className="lg:hidden">{cat.labelEn}</span>
                    <span className="hidden lg:inline">{cat.desktopLabelEn}</span>
                  </>
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

      {/* Scheme Cards Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {Array.from({ length: 4 }).map((_, idx) => (
            <div
              key={idx}
              className="scheme-card-surface p-5 lg:p-6 h-56 lg:h-64 flex flex-col justify-between"
              aria-hidden="true"
            >
              <div>
                <div className="w-11 h-11 lg:w-12 lg:h-12 rounded-glass-sm skeleton-shimmer mb-4" />
                <div className="h-5 w-3/4 rounded skeleton-shimmer mb-3" />
                <div className="h-4 w-full rounded skeleton-shimmer mb-2" />
                <div className="h-4 w-2/3 rounded skeleton-shimmer" />
              </div>
              <div className="pt-3 border-t border-warm-border/60 flex items-center justify-between">
                <div className="h-4 w-24 rounded skeleton-shimmer" />
                <div className="w-7 h-7 rounded-full skeleton-shimmer" />
              </div>
            </div>
          ))}
        </div>
      ) : displayedSchemes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
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
        <div className="glass-style-b rounded-glass p-8 sm:p-10 text-center max-w-lg mx-auto my-4">
          <p className="text-card-heading font-bold text-charcoal">
            {language === 'gu' ? (
              <span lang="gu" className="font-gujarati">
                તમારી શોધને અનુરૂપ કોઈ યોજના મળી નથી
              </span>
            ) : (
              'No schemes match your current filter'
            )}
          </p>
          <p className="text-body-sm text-muted-text mt-1">
            {language === 'gu' ? (
              <span lang="gu" className="font-gujarati">
                કૃપા કરીને તમારો સર્ચ શબ્દ બદલો અથવા તમામ યોજનાઓ જોવા માટે ફિલ્ટર રીસેટ કરો.
              </span>
            ) : (
              'Try clearing your search term or switching back to "All" to explore all available assistance categories.'
            )}
          </p>
          <button
            type="button"
            onClick={handleViewAll}
            className="btn-primary mt-4 min-h-[44px] px-5 py-2.5 rounded-pill text-body-sm font-semibold"
          >
            {language === 'gu' ? (
              <span lang="gu" className="font-gujarati">
                ફિલ્ટર રીસેટ કરો
              </span>
            ) : (
              'Reset Filters'
            )}
          </button>
        </div>
      )}

      {/* =====================================================================
          SCREEN 04: SCHEME DETAILS DIALOG / MOBILE SHEET
          Follows 04. Scheme Details with Overview, Eligibility & Documents Tabs
          ===================================================================== */}
      <AnimatePresence>
        {selectedScheme && (
          <div
            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-6 bg-charcoal/50 backdrop-blur-sm"
            role="dialog"
            aria-modal="true"
            aria-labelledby="scheme-detail-modal-title"
            onClick={() => onSelectScheme(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 24, scale: 0.98 }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="w-full sm:max-w-2xl max-h-[92dvh] sm:max-h-[86vh] rounded-t-3xl sm:rounded-glass-lg border border-warm-border shadow-glass-hover overflow-hidden bg-vanilla-cream flex flex-col"
            >
              {/* Top Navigation Bar matching Screen 04 on Mobile & Clean Header on Desktop */}
              <div className="px-4 sm:px-6 py-3.5 bg-warm-ivory border-b border-warm-border/80 flex items-center justify-between gap-3 shrink-0">
                <div className="flex items-center gap-2.5 min-w-0">
                  <button
                    type="button"
                    onClick={() => onSelectScheme(null)}
                    aria-label="Back to schemes list"
                    className="w-9 h-9 rounded-full hover:bg-sage-green/70 flex items-center justify-center text-charcoal transition-colors shrink-0"
                  >
                    <ChevronLeft className="w-5 h-5" aria-hidden="true" />
                  </button>

                  <div className="w-8 h-8 rounded-full bg-forest-green flex items-center justify-center shrink-0">
                    <svg
                      viewBox="0 0 32 32"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5"
                      aria-hidden="true"
                    >
                      <path
                        d="M16 5C12.5 9.5 11 14 16 21C21 14 19.5 9.5 16 5Z"
                        fill="#FA9231"
                      />
                      <path
                        d="M15.2 21.2C10.2 19.5 7 15.8 6.5 11C10.8 11.8 13.8 14.8 15.2 21.2Z"
                        fill="#E5EBDD"
                      />
                      <path
                        d="M16.8 21.2C21.8 19.5 25 15.8 25.5 11C21.2 11.8 18.2 14.8 16.8 21.2Z"
                        fill="#E5EBDD"
                      />
                      <path
                        d="M8.5 24.5C11.2 23.2 13.8 23.2 16 24.5C18.2 23.2 20.8 23.2 23.5 24.5"
                        stroke="#FFFCF7"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>

                  <span className="font-bold text-charcoal text-[15px] truncate">
                    Vidya Pragati Setu
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-pill bg-sage-green text-forest-green text-[11px] font-semibold">
                    {selectedScheme.categoryTag}
                  </span>
                  <button
                    type="button"
                    onClick={() => onSelectScheme(null)}
                    aria-label="Close scheme details"
                    className="w-9 h-9 rounded-full hover:bg-sage-green/70 text-charcoal flex items-center justify-center transition-colors"
                  >
                    <X className="w-5 h-5" aria-hidden="true" />
                  </button>
                </div>
              </div>

              {/* Scrollable Content Area */}
              <div className="p-4 sm:p-6 overflow-y-auto space-y-5 text-left flex-1">
                {/* Scheme Header Block: Icon Tile + Category Pill + Title + Description */}
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 rounded-2xl bg-saffron/15 border border-saffron/30 flex items-center justify-center shrink-0">
                      {renderSchemeDetailIcon(selectedScheme.icon)}
                    </div>

                    <span className="px-3 py-1 rounded-pill bg-sage-green text-[12px] font-semibold text-forest-green border border-warm-border/70">
                      {language === 'gu' ? (
                        <span lang="gu" className="font-gujarati">
                          {selectedScheme.categoryTagGu}
                        </span>
                      ) : (
                        selectedScheme.categoryTag
                      )}
                    </span>
                  </div>

                  <h3
                    id="scheme-detail-modal-title"
                    className="text-[22px] sm:text-[26px] font-extrabold text-charcoal leading-tight tracking-tight"
                  >
                    {language === 'gu' ? (
                      <span lang="gu" className="font-gujarati">
                        {selectedScheme.titleGu}
                      </span>
                    ) : (
                      selectedScheme.shortTitle
                    )}
                  </h3>

                  <p className="mt-2 text-[14px] sm:text-[15px] text-muted-text leading-relaxed">
                    {language === 'gu' ? (
                      <span lang="gu" className="font-gujarati">
                        {selectedScheme.descriptionGu}
                      </span>
                    ) : (
                      selectedScheme.description
                    )}
                  </p>

                  {/* Full-Width Primary CTA: Apply Now -> */}
                  <button
                    type="button"
                    onClick={() => handleApplyAction(selectedScheme)}
                    className="btn-primary w-full min-h-[48px] mt-4 px-5 py-3 rounded-xl text-[15px] font-semibold flex items-center justify-center gap-2"
                  >
                    <span>
                      {language === 'gu' ? (
                        <span lang="gu" className="font-gujarati">
                          અરજી પ્રક્રિયા જુઓ
                        </span>
                      ) : (
                        'Apply Now'
                      )}
                    </span>
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </button>
                </div>

                {/* Working 3-Tab Navigation Bar: Overview | Eligibility | Documents */}
                <div
                  role="tablist"
                  aria-label="Scheme details sections"
                  className="flex items-center gap-6 border-b border-warm-border"
                >
                  {(
                    [
                      { id: 'overview', labelEn: 'Overview', labelGu: 'સારાંશ' },
                      { id: 'eligibility', labelEn: 'Eligibility', labelGu: 'પાત્રતા' },
                      { id: 'documents', labelEn: 'Documents', labelGu: 'દસ્તાવેજો' },
                    ] as Array<{ id: DetailTab; labelEn: string; labelGu: string }>
                  ).map((tab) => {
                    const isSelected = activeDetailTab === tab.id;
                    return (
                      <button
                        key={tab.id}
                        type="button"
                        role="tab"
                        aria-selected={isSelected}
                        onClick={() => setActiveDetailTab(tab.id)}
                        className={cn(
                          'pb-2.5 text-[14px] font-semibold border-b-2 transition-colors duration-fast -mb-px min-h-[40px]',
                          isSelected
                            ? 'border-forest-green text-charcoal font-bold'
                            : 'border-transparent text-muted-text hover:text-charcoal'
                        )}
                      >
                        {language === 'gu' ? (
                          <span lang="gu" className="font-gujarati">
                            {tab.labelGu}
                          </span>
                        ) : (
                          tab.labelEn
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* TAB 1: OVERVIEW (Matches Screen 04 card structure) */}
                {activeDetailTab === 'overview' && (
                  <div className="space-y-3" role="tabpanel">
                    {/* About Scheme Card */}
                    <div className="p-4 rounded-2xl bg-warm-ivory border border-warm-border/90 shadow-sm">
                      <h4 className="text-[15.5px] font-bold text-charcoal mb-1.5">
                        {language === 'gu' ? (
                          <span lang="gu" className="font-gujarati">
                            યોજના વિશે
                          </span>
                        ) : (
                          'About Scheme'
                        )}
                      </h4>
                      <p className="text-[13.5px] text-muted-text leading-relaxed">
                        {language === 'gu' ? (
                          <span lang="gu" className="font-gujarati">
                            {selectedScheme.benefitSummaryGu}
                          </span>
                        ) : (
                          selectedScheme.benefitSummary
                        )}
                      </p>
                    </div>

                    {/* 4 Stacked Info Cards matching Screen 04 */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {/* Card 1: Eligible Categories / Target Group */}
                      <div className="p-3.5 rounded-2xl bg-warm-ivory border border-warm-border/90 flex items-center gap-3.5">
                        <div className="w-10 h-10 rounded-xl bg-sage-green text-forest-green flex items-center justify-center shrink-0">
                          <UsersRound className="w-5 h-5" aria-hidden="true" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-[13px] font-bold text-charcoal">
                            {language === 'gu' ? (
                              <span lang="gu" className="font-gujarati">
                                પાત્ર વિદ્યાર્થીઓ
                              </span>
                            ) : (
                              'Eligible Categories'
                            )}
                          </p>
                          <p className="text-[12.5px] text-muted-text leading-snug mt-0.5">
                            {language === 'gu' ? (
                              <span lang="gu" className="font-gujarati">
                                {selectedScheme.targetGroupGu}
                              </span>
                            ) : (
                              selectedScheme.targetGroup
                            )}
                          </p>
                        </div>
                      </div>

                      {/* Card 2: Benefit Status / Summary */}
                      <div className="p-3.5 rounded-2xl bg-warm-ivory border border-warm-border/90 flex items-center gap-3.5">
                        <div className="w-10 h-10 rounded-xl bg-sage-green text-forest-green flex items-center justify-center shrink-0">
                          <Sparkles className="w-5 h-5" aria-hidden="true" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-[13px] font-bold text-charcoal">
                            {language === 'gu' ? (
                              <span lang="gu" className="font-gujarati">
                                સહાયનો પ્રકાર
                              </span>
                            ) : (
                              'Benefit Type'
                            )}
                          </p>
                          <p className="text-[12.5px] text-muted-text leading-snug mt-0.5">
                            {language === 'gu' ? (
                              <span lang="gu" className="font-gujarati">
                                {selectedScheme.categoryTagGu} · {selectedScheme.statusLabelGu}
                              </span>
                            ) : (
                              selectedScheme.categoryTag + ' · ' + selectedScheme.statusLabel
                            )}
                          </p>
                        </div>
                      </div>

                      {/* Card 3: Application Mode */}
                      <div className="p-3.5 rounded-2xl bg-warm-ivory border border-warm-border/90 flex items-center gap-3.5">
                        <div className="w-10 h-10 rounded-xl bg-sage-green text-forest-green flex items-center justify-center shrink-0">
                          <Monitor className="w-5 h-5" aria-hidden="true" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-[13px] font-bold text-charcoal">
                            {language === 'gu' ? (
                              <span lang="gu" className="font-gujarati">
                                અરજીની રીત
                              </span>
                            ) : (
                              'Application Mode'
                            )}
                          </p>
                          <p className="text-[12.5px] text-muted-text leading-snug mt-0.5">
                            {language === 'gu' ? (
                              <span lang="gu" className="font-gujarati">
                                સત્તાવાર અરજી પ્રક્રિયાનું અનુસરણ કરો
                              </span>
                            ) : (
                              'Follow the official application process'
                            )}
                          </p>
                        </div>
                      </div>

                      {/* Card 4: Application Window / Last Date */}
                      <div className="p-3.5 rounded-2xl bg-warm-ivory border border-warm-border/90 flex items-center gap-3.5">
                        <div className="w-10 h-10 rounded-xl bg-sage-green text-forest-green flex items-center justify-center shrink-0">
                          <Calendar className="w-5 h-5" aria-hidden="true" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-[13px] font-bold text-charcoal">
                            {language === 'gu' ? (
                              <span lang="gu" className="font-gujarati">
                                અરજીનો સમયગાળો
                              </span>
                            ) : (
                              'Application Window'
                            )}
                          </p>
                          <p className="text-[12.5px] text-muted-text leading-snug mt-0.5">
                            {selectedScheme.applicationWindow}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* TAB 2: ELIGIBILITY */}
                {activeDetailTab === 'eligibility' && (
                  <div className="space-y-4" role="tabpanel">
                    <div className="p-4 rounded-2xl bg-warm-ivory border border-warm-border/90 space-y-3">
                      <h4 className="text-[15px] font-bold text-charcoal flex items-center gap-2">
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

                      <ul className="space-y-2.5">
                        {(language === 'gu'
                          ? selectedScheme.eligibilityBulletsGu
                          : selectedScheme.eligibilityBullets
                        ).map((bullet, idx) => (
                          <li
                            key={idx}
                            className="flex items-start gap-2.5 text-[13.5px] text-charcoal/90 leading-relaxed"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-saffron mt-2 shrink-0" />
                            <span lang={language === 'gu' ? 'gu' : undefined}>
                              {bullet}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {onCheckEligibilityFromScheme && (
                      <button
                        type="button"
                        onClick={() => {
                          const current = selectedScheme;
                          onSelectScheme(null);
                          onCheckEligibilityFromScheme(current);
                        }}
                        className="btn-secondary w-full min-h-[44px] px-4 py-2.5 rounded-xl text-[13.5px] font-semibold flex items-center justify-center gap-2"
                      >
                        <span>
                          {language === 'gu' ? (
                            <span lang="gu" className="font-gujarati">
                              ઇન્ટરેક્ટિવ પાત્રતા ચેકર ખોલો
                            </span>
                          ) : (
                            'Open Interactive Eligibility Checker'
                          )}
                        </span>
                        <ArrowRight className="w-4 h-4" aria-hidden="true" />
                      </button>
                    )}
                  </div>
                )}

                {/* TAB 3: DOCUMENTS */}
                {activeDetailTab === 'documents' && (
                  <div className="space-y-3" role="tabpanel">
                    <div className="p-4 rounded-2xl bg-warm-ivory border border-warm-border/90 space-y-3">
                      <h4 className="text-[15px] font-bold text-charcoal flex items-center gap-2">
                        <FileText className="w-4 h-4 text-forest-green" aria-hidden="true" />
                        <span>
                          {language === 'gu' ? (
                            <span lang="gu" className="font-gujarati">
                              જરૂરી દસ્તાવેજોની યાદી
                            </span>
                          ) : (
                            'Indicative Documents Required'
                          )}
                        </span>
                      </h4>

                      <div className="grid grid-cols-1 gap-2">
                        {(language === 'gu'
                          ? selectedScheme.requiredDocumentsGu
                          : selectedScheme.requiredDocuments
                        ).map((doc, idx) => (
                          <div
                            key={idx}
                            className="p-3 rounded-xl bg-vanilla-cream/70 border border-warm-border text-[13.5px] font-medium text-charcoal flex items-center gap-2.5"
                          >
                            <CheckCircle2
                              className="w-4 h-4 text-forest-green shrink-0"
                              aria-hidden="true"
                            />
                            <span lang={language === 'gu' ? 'gu' : undefined}>{doc}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                <p className="text-[11.5px] text-muted-text text-center pt-1">
                  {language === 'gu' ? (
                    <span lang="gu" className="font-gujarati">
                      નોંધ: પાત્રતા, લાભ, તારીખો અને દસ્તાવેજો માટે હાલની સત્તાવાર સૂચના તપાસો.
                    </span>
                  ) : (
                    'Eligibility, benefits, dates and documents are subject to the current official notification.'
                  )}
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default SchemesSection;