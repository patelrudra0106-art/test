import React, { useEffect, useMemo, useState } from 'react';
import {
  ArrowUpRight,
  BookOpenCheck,
  CheckCircle2,
  ChevronRight,
  CircleHelp,
  ExternalLink,
  FileCheck2,
  GraduationCap,
  Headset,
  X,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { EligibilityChecker } from '../../components/EligibilityChecker';
import { RESOURCE_ITEMS } from '../../data/siteContent';
import type { Language, SchemeItem } from '../../data/schemes';

interface EligibilityResourcesPanelProps {
  language: Language;
  schemes: SchemeItem[];
  isLoading?: boolean;
  onSelectScheme?: (scheme: SchemeItem) => void;
}

interface PanelResource {
  id: string;
  titleEn: string;
  titleGu: string;
  descriptionEn: string;
  descriptionGu: string;
  icon: LucideIcon;
  sourceId?: string;
  detailsEn?: string[];
  detailsGu?: string[];
}

const PANEL_RESOURCES: PanelResource[] = [
  {
    id: 'document-checklist',
    sourceId: 'important-documents',
    titleEn: 'Document Checklist',
    titleGu: 'દસ્તાવેજોની યાદી',
    descriptionEn: 'Prepare required documents',
    descriptionGu: 'જરૂરી દસ્તાવેજો તૈયાર રાખો',
    icon: FileCheck2,
  },
  {
    id: 'scheme-guidelines',
    sourceId: 'user-guides',
    titleEn: 'Scheme Guidelines',
    titleGu: 'યોજનાની માર્ગદર્શિકા',
    descriptionEn: 'Understand eligibility rules',
    descriptionGu: 'પાત્રતાના નિયમો સમજો',
    icon: BookOpenCheck,
  },
  {
    id: 'faqs',
    sourceId: 'faqs',
    titleEn: 'FAQs',
    titleGu: 'વારંવાર પૂછાતા પ્રશ્નો',
    descriptionEn: 'Find answers to common questions',
    descriptionGu: 'સામાન્ય પ્રશ્નોના જવાબો મેળવો',
    icon: CircleHelp,
  },
  {
    id: 'official-portals',
    titleEn: 'Official Portals',
    titleGu: 'સત્તાવાર પોર્ટલ',
    descriptionEn: 'Access government resources',
    descriptionGu: 'સરકારી માહિતી મેળવો',
    icon: ExternalLink,
    detailsEn: [
      'Use the official government website named in the relevant scheme notification.',
      'Verify the website domain before submitting information to a government department.',
      'Check the responsible department’s official website for the current application process.',
    ],
    detailsGu: [
      'સંબંધિત યોજના સૂચનામાં દર્શાવેલી સત્તાવાર સરકારી વેબસાઇટનો ઉપયોગ કરો.',
      'સત્તાવાર માહિતી આપતા પહેલાં સંબંધિત યોજનાની ચકાસેલી સરકારી વેબસાઇટનો ઉપયોગ કરો.',
      'સરકારી માહિતી આપતાં પહેલાં વેબસાઇટનું ડોમેન ચકાસો.',
    ],
  },
  {
    id: 'help-support',
    sourceId: 'helpline-support',
    titleEn: 'Help & Support',
    titleGu: 'મદદ અને સહાય',
    descriptionEn: 'Get application assistance',
    descriptionGu: 'અરજી માટે સહાય મેળવો',
    icon: Headset,
  },
];

export const EligibilityResourcesPanel: React.FC<EligibilityResourcesPanelProps> = ({
  language,
  schemes,
  isLoading = false,
  onSelectScheme,
}) => {
  const [activeResourceId, setActiveResourceId] = useState<string | null>(null);
  const isGujarati = language === 'gu';

  const activeResource = useMemo(
    () => PANEL_RESOURCES.find((item) => item.id === activeResourceId) ?? null,
    [activeResourceId],
  );
  const sourceResource = activeResource?.sourceId
    ? RESOURCE_ITEMS.find((item) => item.id === activeResource.sourceId)
    : undefined;
  const detailTitle = activeResource
    ? (isGujarati ? activeResource.titleGu : activeResource.titleEn)
    : '';
  const detailSubtitle = sourceResource
    ? (isGujarati ? sourceResource.subtitleGu : sourceResource.subtitle)
    : (isGujarati ? activeResource?.descriptionGu : activeResource?.descriptionEn) ?? '';
  const detailPoints = activeResource?.detailsEn
    ? (isGujarati ? activeResource.detailsGu ?? [] : activeResource.detailsEn)
    : sourceResource
      ? (isGujarati ? sourceResource.contentPointsGu : sourceResource.contentPoints)
      : [];

  useEffect(() => {
    if (!activeResourceId) return;
    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setActiveResourceId(null);
    };
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeResourceId]);

  return (
    <section
      id="resources"
      aria-labelledby="eligibility-resources-heading"
      className="mx-auto w-full max-w-desktop scroll-mt-28 px-4 py-8 sm:px-6 lg:px-8 xl:px-8 2xl:px-10 lg:py-12"
    >
      <div className="rounded-[1.65rem] border border-warm-border/80 bg-warm-ivory/70 p-3.5 shadow-card sm:p-5 lg:p-5 2xl:p-6">
        <header className="mb-4 flex items-center justify-between gap-4 border-b border-warm-border/80 px-1 pb-4 sm:mb-5 sm:pb-5">
          <div className="flex min-w-0 items-center gap-3">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-warm-ivory/25 bg-forest-green shadow-sm">
              <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" aria-hidden="true">
                <path d="M16 5C12.5 9.5 11 14 16 21C21 14 19.5 9.5 16 5Z" fill="#FA9231" />
                <path d="M15.2 21.2C10.2 19.5 7 15.8 6.5 11C10.8 11.8 13.8 14.8 15.2 21.2Z" fill="#E5EBDD" />
                <path d="M16.8 21.2C21.8 19.5 25 15.8 25.5 11C21.2 11.8 18.2 14.8 16.8 21.2Z" fill="#E5EBDD" />
                <path d="M8.5 24.5C11.2 23.2 13.8 23.2 16 24.5C18.2 23.2 20.8 23.2 23.5 24.5" stroke="#FFFCF7" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </span>
            <div className="min-w-0">
              <p className="truncate text-sm font-extrabold tracking-tight text-charcoal sm:text-base">Vidya Pragati Setu</p>
              <h2 id="eligibility-resources-heading" className="mt-0.5 text-[13px] font-medium text-muted-text sm:text-sm">
                {isGujarati ? <span lang="gu" className="font-gujarati">પાત્રતા મૂલ્યાંકન</span> : 'Eligibility Assessment'}
              </h2>
            </div>
          </div>
          <GraduationCap className="h-7 w-7 shrink-0 text-forest-green sm:h-8 sm:w-8" strokeWidth={1.8} aria-hidden="true" />
        </header>

        <div className="grid min-w-0 grid-cols-1 items-stretch gap-4 lg:grid-cols-[minmax(0,1.25fr)_minmax(270px,0.75fr)] xl:grid-cols-[minmax(0,1.2fr)_minmax(280px,0.8fr)] lg:gap-4 xl:gap-5">
          <div id="eligibility" className="min-w-0 scroll-mt-28">
            <EligibilityChecker
              language={language}
              schemes={schemes}
              isLoading={isLoading}
              onSelectScheme={onSelectScheme}
              layout="panel"
              sectionId="eligibility-form"
            />
          </div>

          <aside
            aria-labelledby="eligibility-resource-list-heading"
            className="flex min-w-0 flex-col rounded-2xl border border-warm-border/90 bg-gradient-to-br from-warm-ivory via-vanilla-cream to-sage-green/45 p-4 text-charcoal shadow-card sm:p-5 lg:p-5 2xl:p-6"
          >
            <div className="mb-4 border-b border-warm-border/80 pb-4">
              <div className="flex items-center gap-2.5">
                <BookOpenCheck className="h-5 w-5 shrink-0 text-saffron" aria-hidden="true" />
                <h3 id="eligibility-resource-list-heading" className="text-lg font-extrabold tracking-tight text-forest-green sm:text-xl">
                  {isGujarati ? <span lang="gu" className="font-gujarati">સંસાધનો</span> : 'Resources'}
                </h3>
              </div>
              <p className="mt-2 text-[13px] leading-relaxed text-muted-text sm:text-sm">
                {isGujarati
                  ? 'અરજી શરૂ કરવા માટે જરૂરી માર્ગદર્શન અને સહાય મેળવો.'
                  : 'Everything you need to get started.'}
              </p>
            </div>

            <div className="divide-y divide-warm-border/75">
              {PANEL_RESOURCES.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setActiveResourceId(item.id)}
                    className="group flex w-full min-w-0 items-start gap-3 rounded-xl px-2.5 py-3.5 text-left transition-all duration-150 hover:bg-sage-green/45 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest-green"
                    aria-haspopup="dialog"
                  >
                    <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-warm-border bg-sage-green text-forest-green transition-all duration-150 group-hover:border-forest-green group-hover:bg-forest-green group-hover:text-warm-ivory">
                      <Icon className="h-[18px] w-[18px]" aria-hidden="true" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-[13px] font-bold leading-snug text-charcoal transition-colors group-hover:text-forest-green sm:text-sm">
                        {isGujarati ? <span lang="gu" className="font-gujarati">{item.titleGu}</span> : item.titleEn}
                      </span>
                      <span className="mt-1 block text-[12px] leading-relaxed text-muted-text sm:text-[12.5px]">
                        {isGujarati ? <span lang="gu" className="font-gujarati">{item.descriptionGu}</span> : item.descriptionEn}
                      </span>
                    </span>
                    <ChevronRight className="mt-1 h-4 w-4 shrink-0 text-muted-text transition-all duration-150 group-hover:translate-x-0.5 group-hover:text-saffron" aria-hidden="true" />
                  </button>
                );
              })}
            </div>
            <p className="mt-auto pt-4 text-[10.5px] leading-relaxed text-muted-text/80">
              {isGujarati
                ? 'અહીં આપેલી માર્ગદર્શિકા સામાન્ય માહિતી માટે છે. સત્તાવાર સૂચનાને પ્રાથમિકતા આપો.'
                : 'The guidance here is general information. Refer to the official scheme notice.'}
            </p>
          </aside>
        </div>
      </div>

      <AnimatePresence>
        {activeResource && (
          <motion.div
            className="fixed inset-0 z-[80] flex items-center justify-center bg-charcoal/45 p-4 backdrop-blur-sm sm:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) setActiveResourceId(null);
            }}
          >
            <motion.section
              role="dialog"
              aria-modal="true"
              aria-labelledby="eligibility-resource-dialog-title"
              initial={{ opacity: 0, y: 12, scale: 0.985 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.985 }}
              transition={{ duration: 0.18 }}
              className="max-h-[min(84vh,720px)] w-full max-w-xl overflow-y-auto rounded-2xl border border-warm-border bg-warm-ivory shadow-glass-hover"
            >
              <div className="flex items-start justify-between gap-3 bg-forest-green px-5 py-4 text-warm-ivory sm:px-6">
                <div className="min-w-0">
                  <h3 id="eligibility-resource-dialog-title" className="text-base font-bold sm:text-lg">{detailTitle}</h3>
                  <p className="mt-1 text-[12px] leading-relaxed text-warm-ivory/75 sm:text-sm">{detailSubtitle}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveResourceId(null)}
                  aria-label={isGujarati ? 'બંધ કરો' : 'Close resource details'}
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-warm-ivory/10 text-warm-ivory transition-colors hover:bg-warm-ivory/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron"
                >
                  <X className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
              <div className="space-y-3 p-5 sm:p-6">
                {detailPoints.map((point, index) => (
                  <div key={`${activeResource.id}-${index}`} className="flex items-start gap-2.5 rounded-xl border border-warm-border bg-vanilla-cream/65 p-3.5 text-[13px] leading-relaxed text-charcoal sm:text-sm">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-forest-green" aria-hidden="true" />
                    <span lang={isGujarati ? 'gu' : undefined}>{point}</span>
                  </div>
                ))}
                {activeResource.id === 'official-portals' && (
                  <p className="text-[11px] leading-relaxed text-muted-text">
                    {isGujarati
                      ? 'સંબંધિત વિભાગની સત્તાવાર વેબસાઇટની ખાતરી કરીને જ માહિતી સબમિટ કરો.'
                      : 'Verify the department’s official website before submitting information.'}
                  </p>
                )}
              </div>
              <div className="flex justify-end border-t border-warm-border bg-vanilla-cream/70 px-5 py-3 sm:px-6">
                <button type="button" onClick={() => setActiveResourceId(null)} className="btn-primary inline-flex items-center gap-2 rounded-pill px-5 py-2.5 text-[13px] font-semibold">
                  {isGujarati ? 'સમજાયું' : 'Got it'}
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
            </motion.section>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default EligibilityResourcesPanel;
