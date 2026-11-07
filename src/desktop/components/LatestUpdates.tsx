import React, { useState } from 'react';
import { Bell, Clock3, ArrowRight, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Language } from '../../data/schemes';
import { SITE_GUIDANCE_ITEMS, UpdateItem } from '../../data/siteContent';
import { Skeleton } from './Skeleton';
import { cn } from '../lib/utils';

export interface LatestUpdatesProps {
  language: Language;
  updates?: UpdateItem[];
  isLoading?: boolean;
}

export const LatestUpdates: React.FC<LatestUpdatesProps> = ({
  language,
  updates = SITE_GUIDANCE_ITEMS,
  isLoading = false,
}) => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <div id="updates" className="scroll-mt-28 flex flex-col h-full justify-between">
      <div>
        <div className="flex items-center justify-between gap-3 mb-5">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-glass-sm bg-sage-green text-forest-green flex items-center justify-center border border-warm-border/70">
              <Bell className="w-4 h-4" aria-hidden="true" />
            </div>
            <h2 className="text-[24px] sm:text-[26px] font-bold text-charcoal tracking-tight">
              {language === 'gu' ? (
                <span lang="gu" className="font-gujarati">
                  નવીનતમ અપડેટ્સ
                </span>
              ) : (
                'Latest Updates'
              )}
            </h2>
          </div>

        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <Skeleton variant="update-row" />
            <Skeleton variant="update-row" />
            <Skeleton variant="update-row" />
            <Skeleton variant="update-row" />
          </div>
        ) : (
          <div className="grid grid-cols-1 items-stretch gap-4 lg:grid-cols-2">
            {updates.map((update) => {
              const isExpanded = expandedId === update.id;
              const arrowClass = isExpanded
                ? 'w-3.5 h-3.5 transition-transform duration-fast rotate-90'
                : 'w-3.5 h-3.5 transition-transform duration-fast';

              return (
                <article
                  key={update.id}
                  className="glass-style-b flex h-full flex-col rounded-glass border border-warm-border p-5 transition-all duration-fast hover:border-forest-green/40"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2.5">
                    <span
                      className={cn(
                        'inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-pill text-[11.5px] font-bold',
                        update.statusTone === 'open'
                          ? 'bg-sage-green text-forest-green'
                          : 'bg-saffron/15 text-charcoal'
                      )}
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-forest-green" aria-hidden="true" />
                      <span lang={language === 'gu' ? 'gu' : undefined}>
                        {language === 'gu'
                          ? update.statusLabelGu
                          : update.statusLabel}
                      </span>
                    </span>

                    <span className="inline-flex items-center gap-1 text-[12px] font-medium text-muted-text">
                      <Clock3 className="w-3.5 h-3.5" aria-hidden="true" />
                      <span lang={language === 'gu' ? 'gu' : undefined}>
                        {language === 'gu' ? update.dateLabelGu : update.dateLabel}
                      </span>
                    </span>
                  </div>

                  <h3 className="text-[16.5px] font-bold text-charcoal leading-snug">
                    {language === 'gu' ? (
                      <span lang="gu" className="font-gujarati">
                        {update.titleGu}
                      </span>
                    ) : (
                      update.title
                    )}
                  </h3>

                  <p className="mt-1.5 text-[14px] text-muted-text leading-relaxed">
                    {language === 'gu' ? (
                      <span lang="gu" className="font-gujarati">
                        {update.descriptionGu}
                      </span>
                    ) : (
                      update.description
                    )}
                  </p>

                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.18 }}
                        className="overflow-hidden"
                      >
                        <div className="mt-3 pt-3 border-t border-warm-border/80 text-[13px] text-charcoal/90 bg-vanilla-cream/60 p-3 rounded-lg">
                          <span lang={language === 'gu' ? 'gu' : undefined}>
                            {language === 'gu' ? update.detailsGu : update.details}
                          </span>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="mt-3 pt-2 flex items-center justify-end">
                    <button
                      type="button"
                      onClick={() => toggleExpand(update.id)}
                      aria-expanded={isExpanded}
                      className="text-[12.5px] font-bold text-forest-green hover:text-saffron inline-flex items-center gap-1 transition-colors"
                    >
                      <span>
                        {isExpanded
                          ? language === 'gu'
                            ? 'ઓછું જુઓ'
                            : 'Hide Details'
                          : language === 'gu'
                          ? 'વિગત જુઓ'
                          : 'Read Summary'}
                      </span>
                      <ArrowRight className={arrowClass} aria-hidden="true" />
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default LatestUpdates;
