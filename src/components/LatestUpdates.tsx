import React from 'react';
import { Calendar, Bell, ArrowUpRight } from 'lucide-react';
import { Skeleton } from './Skeleton';
import { Language } from './LanguageSelector';
import type { UpdateItem } from '../data/siteContent';

export interface LatestUpdatesProps {
  language: Language;
  updates: UpdateItem[];
  isLoading?: boolean;
  onSelectUpdate?: (update: UpdateItem) => void;
}

export const LatestUpdates: React.FC<LatestUpdatesProps> = ({
  language,
  updates,
  isLoading = false,
  onSelectUpdate,
}) => {
  return (
    <section id="updates" className="py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-sage-green text-forest-green mb-2.5">
              <Bell className="w-3.5 h-3.5" aria-hidden="true" />
              <span>{language === 'gu' ? 'સૂચના બોર્ડ' : 'Announcements'}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-charcoal tracking-tight">
              {language === 'gu' ? 'નવીનતમ અપડેટ્સ અને સમયમર્યાદા' : 'Latest Updates & Deadlines'}
            </h2>
          </div>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5" aria-label="Loading updates">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="p-6 rounded-3xl bg-warm-ivory border border-warm-border space-y-4"
              >
                <div className="flex items-center justify-between">
                  <Skeleton className="h-6 w-24" rounded="full" />
                  <Skeleton className="h-4 w-20" rounded="md" />
                </div>
                <Skeleton className="h-6 w-full" rounded="md" />
                <Skeleton className="h-4 w-5/6" rounded="md" />
                <Skeleton className="h-4 w-28" rounded="md" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {updates.map((update) => (
              <article
                key={update.id}
                className="flex flex-col justify-between p-6 rounded-3xl bg-warm-ivory border border-warm-border shadow-card hover:border-forest-green/60 transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-sage-green text-forest-green">
                      {language === 'gu' ? update.statusLabelGu : update.statusLabel}
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs text-muted-text">
                      <Calendar className="w-3.5 h-3.5" aria-hidden="true" />
                      {language === 'gu' ? update.dateLabelGu : update.dateLabel}
                    </span>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-charcoal mb-2">
                    {language === 'gu' ? update.titleGu : update.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-text leading-relaxed">
                    {language === 'gu' ? update.descriptionGu : update.description}
                  </p>
                </div>

                {onSelectUpdate && (
                  <button
                    type="button"
                    onClick={() => onSelectUpdate(update)}
                    className="mt-5 inline-flex items-center gap-1 text-xs sm:text-sm font-bold text-forest-green hover:underline"
                  >
                    <span>{language === 'gu' ? 'વધુ વાંચો' : 'Read Notice'}</span>
                    <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                  </button>
                )}
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default LatestUpdates;