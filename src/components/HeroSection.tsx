import React, { useState } from 'react';
import {
  ArrowRight,
  PlayCircle,
  Sparkles,
  CheckCircle2,
  Search,
  UsersRound,
  SquareCheckBig,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { HERO_METRICS, Language } from '../data/schemes';

export interface HeroSectionProps {
  language: Language;
  onExploreSchemes: () => void;
  onHowItWorks: () => void;
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
  onSelectCategoryChip?: (categoryId: string) => void;
  onCheckEligibility?: () => void;
}

const PRIMARY_STUDENT_IMAGE =
  'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1200&q=85';

const BACKUP_STUDENT_IMAGE =
  'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=85';

export const HeroSection: React.FC<HeroSectionProps> = ({
  language,
  onExploreSchemes,
  onHowItWorks,
  searchQuery = '',
  onSearchChange,
  onCheckEligibility,
}) => {
  const [imgSrc, setImgSrc] = useState<string>(PRIMARY_STUDENT_IMAGE);
  const [imgFailedAll, setImgFailedAll] = useState<boolean>(false);

  const primaryMetric = HERO_METRICS[0];

  const handleImageError = () => {
    if (imgSrc === PRIMARY_STUDENT_IMAGE) {
      setImgSrc(BACKUP_STUDENT_IMAGE);
    } else {
      setImgFailedAll(true);
    }
  };

  const handleMobileSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onExploreSchemes();
  };

  const handleEligibilityAction = () => {
    if (onCheckEligibility) {
      onCheckEligibility();
    } else {
      const target = document.getElementById('eligibility') || document.getElementById('schemes');
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return (
    <section
      id="home"
      aria-labelledby="hero-headline"
      className="relative mx-auto w-full max-w-desktop px-4 sm:px-5 lg:px-10 pt-3 lg:pt-5"
    >
      {/* =====================================================================
          SCREEN 01: MOBILE HERO LAYOUT (< lg)
          Follows 01. Home (Mobile) from the approved reference
          ===================================================================== */}
      <div className="lg:hidden">
        {/* Subtle Forest-Green Top Accent Line */}
        <div className="w-7 h-0.5 bg-forest-green rounded-full mb-3.5" aria-hidden="true" />

        {/* Headline: Forest Green + Saffron */}
        <h1 className="text-[31px] sm:text-[36px] font-extrabold leading-[1.15] tracking-tight">
          {language === 'gu' ? (
            <span lang="gu" className="font-gujarati block">
              <span className="text-forest-green block">દરેક વિદ્યાર્થી,</span>
              <span className="text-saffron block mt-0.5">ઉજ્જવળ ગુજરાત</span>
            </span>
          ) : (
            <>
              <span className="text-forest-green block">Every Student,</span>
              <span className="block mt-0.5">
                <span className="text-forest-green">A </span>
                <span className="text-saffron">Brighter Gujarat</span>
              </span>
            </>
          )}
        </h1>

        {/* Compact Supporting Copy */}
        <p className="mt-2.5 text-[14px] sm:text-[15px] text-muted-text leading-relaxed">
          {language === 'gu' ? (
            <span lang="gu" className="font-gujarati">
              શિષ્યવૃત્તિ, સહાય યોજનાઓ અને શૈક્ષણિક સંસાધનો માટેનું એકમાત્ર સંકલિત પ્લેટફોર્મ.
            </span>
          ) : (
            'Unified access to scholarships, assistance schemes and educational resources.'
          )}
        </p>

        {/* Scheme Search Input + Forest-Green Search Button */}
        <form onSubmit={handleMobileSearchSubmit} className="mt-4 flex items-center gap-2">
          <div className="glass-style-b flex-1 min-h-[46px] rounded-xl px-3.5 py-2 flex items-center gap-2.5 border border-warm-border focus-within:border-forest-green">
            <Search className="w-4 h-4 text-muted-text shrink-0" aria-hidden="true" />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => onSearchChange && onSearchChange(e.target.value)}
              placeholder={language === 'gu' ? 'યોજનાઓ શોધો...' : 'Search schemes...'}
              aria-label="Search student schemes"
              className="w-full bg-transparent text-[14px] text-charcoal placeholder:text-muted-text/80 focus:outline-none"
            />
          </div>
          <button
            type="submit"
            aria-label="Search schemes"
            className="btn-primary w-[46px] h-[46px] rounded-xl flex items-center justify-center shrink-0"
          >
            <Search className="w-4 h-4 text-warm-ivory" aria-hidden="true" />
          </button>
        </form>

        {/* Student Portrait Image with Heritage & Greenery Atmosphere */}
        <div className="mt-4 relative">
          <div className="relative w-full h-[270px] sm:h-[320px] rounded-2xl overflow-hidden border border-warm-border bg-gradient-to-b from-vanilla-cream via-sage-green/60 to-sage-green shadow-card">
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-charcoal/20 via-transparent to-transparent z-10 pointer-events-none"
            />
            {!imgFailedAll ? (
              <img
                src={imgSrc}
                alt="Smiling Indian school student holding textbooks in front of an educational campus with greenery"
                onError={handleImageError}
                className="w-full h-full object-cover object-top"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-sage-green via-vanilla-cream to-warm-ivory">
                <div className="w-12 h-12 rounded-full bg-forest-green/10 text-forest-green flex items-center justify-center mb-2">
                  <Sparkles className="w-6 h-6" aria-hidden="true" />
                </div>
                <p className="font-bold text-forest-green text-base">
                  Vidya Pragati Setu
                </p>
                <p className="text-body-sm text-muted-text mt-1">
                  Supporting students across Gujarat with scholarships, bicycles, and textbooks.
                </p>
              </div>
            )}
          </div>

          {/* Compact student-support metric card */}
          <div className="relative z-20 -mt-9 mx-1.5 glass-style-a bg-warm-ivory/95 rounded-2xl p-3.5 border border-warm-border shadow-card flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-sage-green border border-warm-border/60 text-forest-green flex items-center justify-center shrink-0">
              <UsersRound className="w-5 h-5" aria-hidden="true" />
            </div>
            <div className="min-w-0">
              <div className="text-[20px] font-extrabold text-charcoal leading-tight">
                {language === 'gu' ? (
                  <span lang="gu" className="font-gujarati">
                    {primaryMetric.valueGu}
                  </span>
                ) : (
                  primaryMetric.value
                )}
              </div>
              <div className="text-[12.5px] font-medium text-muted-text leading-snug">
                {language === 'gu' ? (
                  <span lang="gu" className="font-gujarati">
                    {primaryMetric.labelGu}
                  </span>
                ) : (
                  primaryMetric.label
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Full-Width Mobile Hero Actions: Explore Schemes + Check Eligibility */}
        <div className="mt-4 space-y-2.5">
          <button
            type="button"
            onClick={onExploreSchemes}
            className="btn-primary w-full min-h-[48px] px-5 py-3 rounded-xl text-[15px] font-semibold flex items-center justify-center gap-2"
          >
            <span>
              {language === 'gu' ? (
                <span lang="gu" className="font-gujarati">
                  યોજનાઓ જુઓ
                </span>
              ) : (
                'Explore Schemes'
              )}
            </span>
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </button>

          <button
            type="button"
            onClick={handleEligibilityAction}
            className="glass-style-b w-full min-h-[48px] px-5 py-3 rounded-xl text-[15px] font-semibold text-charcoal hover:text-forest-green hover:border-forest-green flex items-center justify-center gap-2"
          >
            <SquareCheckBig className="w-4 h-4 text-forest-green" aria-hidden="true" />
            <span>
              {language === 'gu' ? (
                <span lang="gu" className="font-gujarati">
                  પાત્રતા તપાસો
                </span>
              ) : (
                'Check Eligibility'
              )}
            </span>
          </button>
        </div>
      </div>

      {/* =====================================================================
          DESKTOP HERO LAYOUT (lg:block) — Preserved Intact
          ===================================================================== */}
      <div className="hidden lg:block relative overflow-hidden rounded-glass-lg border border-warm-border bg-gradient-to-br from-warm-ivory via-vanilla-cream to-sage-green/55 shadow-card">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 -left-24 h-80 w-80 rounded-full bg-saffron/10 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-1/4 right-1/3 h-72 w-72 rounded-full bg-sage-green/70 blur-3xl"
        />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 items-center gap-8 lg:gap-6 px-6 sm:px-10 lg:px-14 pt-8 lg:pt-12 pb-16 lg:pb-20">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7 flex flex-col items-start text-left space-y-5"
          >
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-pill bg-sage-green/85 border border-warm-border">
              <span
                className="w-2 h-2 rounded-full bg-saffron shrink-0"
                aria-hidden="true"
              />
              <span className="text-[11.5px] sm:text-[12px] font-bold uppercase tracking-[0.12em] text-forest-green">
                {language === 'gu' ? (
                  <span lang="gu" className="font-gujarati">
                    ગુજરાતના વિદ્યાર્થીઓ માટે સહાય માહિતી પોર્ટલ
                  </span>
                ) : (
                  'STUDENT ASSISTANCE INFORMATION'
                )}
              </span>
            </div>

            <h1
              id="hero-headline"
              className="text-[36px] sm:text-[46px] xl:text-[52px] font-extrabold leading-[1.12] tracking-tight"
            >
              {language === 'gu' ? (
                <span lang="gu" className="font-gujarati block space-y-1">
                  <span className="text-forest-green block">દરેક વિદ્યાર્થી,</span>
                  <span className="text-saffron block">ઉજ્જવળ ગુજરાત</span>
                </span>
              ) : (
                <>
                  <span className="text-forest-green block">Every Student, a</span>
                  <span className="text-saffron block mt-1">Brighter Gujarat</span>
                </>
              )}
            </h1>

            <p className="text-[16px] sm:text-[17px] text-charcoal/90 font-normal leading-relaxed max-w-xl">
              {language === 'gu' ? (
                <span lang="gu" className="font-gujarati">
                  શિષ્યવૃત્તિ, સાયકલ સહાય, વિનામૂલ્યે પાઠ્યપુસ્તકો અને વિદ્યાર્થી સહાય માટેનું એકમાત્ર સંકલિત પ્લેટફોર્મ.
                </span>
              ) : (
                'One platform for scholarships, bicycles, textbooks and student assistance.'
              )}
            </p>

            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <button
                type="button"
                onClick={onExploreSchemes}
                className="btn-primary px-6 py-3.5 rounded-pill text-[15px] font-semibold inline-flex items-center gap-2.5 group"
              >
                <span>
                  {language === 'gu' ? (
                    <span lang="gu" className="font-gujarati">
                      યોજનાઓ જુઓ
                    </span>
                  ) : (
                    'Explore Schemes'
                  )}
                </span>
                <ArrowRight
                  className="w-4 h-4 transition-transform duration-fast group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </button>

              <button
                type="button"
                onClick={onHowItWorks}
                className="btn-secondary px-6 py-3.5 rounded-pill text-[15px] font-semibold inline-flex items-center gap-2.5 group"
              >
                <PlayCircle
                  className="w-5 h-5 text-forest-green group-hover:text-saffron transition-colors duration-fast"
                  aria-hidden="true"
                />
                <span>
                  {language === 'gu' ? (
                    <span lang="gu" className="font-gujarati">
                      કેવી રીતે કાર્ય કરે છે
                    </span>
                  ) : (
                    'How It Works'
                  )}
                </span>
              </button>
            </div>

            <div className="pt-2 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-[13px] font-medium text-muted-text">
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-forest-green" aria-hidden="true" />
                {language === 'gu' ? (
                  <span lang="gu" className="font-gujarati">
                    યોજનાઓ શોધો
                  </span>
                ) : (
                  'Discover schemes'
                )}
              </span>
              <span aria-hidden="true" className="text-warm-border">
                ·
              </span>
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-forest-green" aria-hidden="true" />
                {language === 'gu' ? (
                  <span lang="gu" className="font-gujarati">
                    પાત્રતા તપાસો
                  </span>
                ) : (
                  'Check eligibility'
                )}
              </span>
              <span aria-hidden="true" className="text-warm-border">
                ·
              </span>
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-forest-green" aria-hidden="true" />
                {language === 'gu' ? (
                  <span lang="gu" className="font-gujarati">
                    લાભ ટ્રેક કરો
                  </span>
                ) : (
                  'Track benefits'
                )}
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.26, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5 relative flex justify-center lg:justify-end"
          >
            <div className="relative w-full max-w-[460px] h-[360px] sm:h-[410px] rounded-glass-lg overflow-hidden border-2 border-warm-ivory/90 shadow-glass bg-sage-green">
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-forest-green/35 via-transparent to-vanilla-cream/15 z-10 pointer-events-none"
              />

              {!imgFailedAll ? (
                <img
                  src={imgSrc}
                  alt="Smiling Indian school student holding textbooks in front of an educational campus with greenery"
                  onError={handleImageError}
                  className="w-full h-full object-cover object-top transition-transform duration-500 hover:scale-[1.02]"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center bg-gradient-to-br from-sage-green via-vanilla-cream to-warm-ivory">
                  <div className="w-16 h-16 rounded-full bg-forest-green/10 text-forest-green flex items-center justify-center mb-3">
                    <Sparkles className="w-8 h-8" aria-hidden="true" />
                  </div>
                  <p className="font-bold text-forest-green text-lg">
                    Vidya Pragati Setu
                  </p>
                  <p className="text-body-sm text-muted-text mt-1 max-w-xs">
                    Supporting students across all 33 districts of Gujarat with scholarships, bicycles, and textbooks.
                  </p>
                </div>
              )}

              <div className="absolute top-3.5 left-3.5 z-20 px-3 py-1 rounded-pill bg-warm-ivory/90 backdrop-blur-md border border-warm-border/80 text-[11px] font-semibold text-forest-green shadow-sm">
                {language === 'gu' ? (
                  <span lang="gu" className="font-gujarati">
                    ગુજરાત શિક્ષણ અભિયાન
                  </span>
                ) : (
                  'Gujarat Education Initiative'
                )}
              </div>

              <div className="glass-style-a absolute bottom-4 left-4 right-4 sm:right-auto sm:max-w-[245px] z-20 rounded-glass-sm px-4 py-3 border border-warm-ivory/80 shadow-glass">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-forest-green text-warm-ivory flex items-center justify-center shrink-0">
                    <Sparkles className="w-4 h-4 text-saffron" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-[13px] font-bold text-forest-green leading-snug">
                      {language === 'gu' ? (
                        <span lang="gu" className="font-gujarati">
                          વિદ્યાર્થીઓનું સશક્તિકરણ
                        </span>
                      ) : (
                        'Empowering Students'
                      )}
                    </p>
                    <p className="text-[12px] font-semibold text-saffron leading-snug">
                      {language === 'gu' ? (
                        <span lang="gu" className="font-gujarati">
                          ગુજરાતનું સશક્તિકરણ
                        </span>
                      ) : (
                        'Empowering Gujarat'
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
