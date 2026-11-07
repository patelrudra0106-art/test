import React, { useState } from 'react';
import { ArrowRight, PlayCircle, Sparkles, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { Language } from '../../data/schemes';

export interface HeroSectionProps {
  language: Language;
  onExploreSchemes: () => void;
  onHowItWorks: () => void;
}

const PRIMARY_STUDENT_IMAGE =
  'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1200&q=85';

const BACKUP_STUDENT_IMAGE =
  'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=85';

export const HeroSection: React.FC<HeroSectionProps> = ({
  language,
  onExploreSchemes,
  onHowItWorks,
}) => {
  const [imgSrc, setImgSrc] = useState<string>(PRIMARY_STUDENT_IMAGE);
  const [imgFailedAll, setImgFailedAll] = useState<boolean>(false);

  const handleImageError = () => {
    if (imgSrc === PRIMARY_STUDENT_IMAGE) {
      setImgSrc(BACKUP_STUDENT_IMAGE);
    } else {
      setImgFailedAll(true);
    }
  };

  return (
    <section
      id="home"
      aria-labelledby="hero-headline"
      className="relative mx-auto w-full max-w-desktop px-4 sm:px-6 lg:px-8 xl:px-8 2xl:px-10 pt-5"
    >
      <div className="relative overflow-hidden rounded-glass-lg border border-warm-border bg-gradient-to-br from-warm-ivory via-vanilla-cream to-sage-green/55 shadow-card">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 -left-24 h-80 w-80 rounded-full bg-saffron/10 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-1/4 right-1/3 h-72 w-72 rounded-full bg-sage-green/70 blur-3xl"
        />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 items-center gap-6 xl:gap-6 2xl:gap-8 px-6 sm:px-8 xl:px-10 2xl:px-14 pt-8 lg:pt-10 2xl:pt-12 pb-12 lg:pb-14 2xl:pb-20">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7 flex flex-col items-start text-left space-y-4 xl:space-y-4.5 2xl:space-y-5"
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
              className="text-[34px] sm:text-[42px] xl:text-[46px] 2xl:text-[52px] font-extrabold leading-[1.12] tracking-tight"
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
            <div className="relative w-full max-w-[420px] xl:max-w-[430px] 2xl:max-w-[460px] h-[340px] sm:h-[390px] 2xl:h-[410px] rounded-glass-lg overflow-hidden border-2 border-warm-ivory/90 shadow-glass bg-sage-green">
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
