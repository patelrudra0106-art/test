import React from 'react';
import { UsersRound, GraduationCap, Building2, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import { HERO_METRICS, Language, MetricItem } from '../../data/schemes';

export interface MetricsStripProps {
  language: Language;
  isLoading?: boolean;
  metrics?: MetricItem[];
}

export const MetricsStrip: React.FC<MetricsStripProps> = ({
  language,
  isLoading = false,
  metrics = HERO_METRICS,
}) => {
  const renderMetricIcon = (iconName: MetricItem['icon']) => {
    switch (iconName) {
      case 'UsersRound':
        return <UsersRound className="w-5 h-5 text-forest-green" aria-hidden="true" />;
      case 'GraduationCap':
        return <GraduationCap className="w-5 h-5 text-forest-green" aria-hidden="true" />;
      case 'Building2':
        return <Building2 className="w-5 h-5 text-forest-green" aria-hidden="true" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-5 h-5 text-forest-green" aria-hidden="true" />;
    }
  };

  return (
    <section
      aria-label="Student information and assistance metrics"
      className="relative z-20 mx-auto w-full max-w-desktop px-4 sm:px-6 lg:px-8 xl:px-8 2xl:px-10 -mt-8 sm:-mt-9 lg:-mt-10 2xl:-mt-11"
    >
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.24, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        className="glass-style-a rounded-glass px-4 sm:px-6 xl:px-6 2xl:px-8 py-4 sm:py-5 border border-warm-border shadow-glass"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-0 lg:divide-x lg:divide-warm-border/80">
          {isLoading
            ? Array.from({ length: 4 }).map((_, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 xl:gap-3.5 2xl:gap-4 lg:px-3.5 xl:px-4 2xl:px-6 first:lg:pl-1.5 last:lg:pr-1.5"
                  aria-hidden="true"
                >
                  <div className="w-11 h-11 xl:w-12 xl:h-12 rounded-glass-sm skeleton-shimmer shrink-0" />
                  <div className="space-y-2 flex-1">
                    <div className="h-6 w-20 rounded skeleton-shimmer" />
                    <div className="h-4 w-32 rounded skeleton-shimmer" />
                  </div>
                </div>
              ))
            : metrics.map((metric) => (
                <div
                  key={metric.id}
                  className="flex items-center gap-3 xl:gap-3.5 2xl:gap-4 lg:px-3.5 xl:px-4 2xl:px-6 first:lg:pl-1.5 last:lg:pr-1.5"
                >
                  <div className="w-11 h-11 xl:w-12 xl:h-12 rounded-glass-sm bg-sage-green border border-warm-border/60 flex items-center justify-center shrink-0 shadow-sm">
                    {renderMetricIcon(metric.icon)}
                  </div>

                  <div className="min-w-0">
                    <div className="text-[20px] sm:text-[22px] xl:text-[22px] 2xl:text-[24px] font-extrabold text-charcoal leading-tight tracking-tight">
                      {language === 'gu' ? (
                        <span lang="gu" className="font-gujarati">
                          {metric.valueGu}
                        </span>
                      ) : (
                        metric.value
                      )}
                    </div>
                    <div className="text-[12px] xl:text-[12.5px] 2xl:text-[13px] font-medium text-muted-text leading-snug mt-0.5">
                      {language === 'gu' ? (
                        <span lang="gu" className="font-gujarati">
                          {metric.labelGu}
                        </span>
                      ) : (
                        metric.label
                      )}
                    </div>
                  </div>
                </div>
              ))}
        </div>
      </motion.div>
    </section>
  );
};

export default MetricsStrip;
