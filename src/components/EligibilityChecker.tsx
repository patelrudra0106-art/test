import React, { useState } from 'react';
import { CheckCircle2, ArrowRight, ArrowLeft, RotateCcw, Sparkles } from 'lucide-react';
import { Dropdown, DropdownOption } from './Dropdown';
import { Skeleton } from './Skeleton';
import { Language } from './LanguageSelector';
import type { SchemeItem } from '../data/schemes';

export interface EligibilityCheckerProps {
  language: Language;
  schemes: SchemeItem[];
  isLoading?: boolean;
  onSelectScheme?: (scheme: SchemeItem) => void;
  /** Compact layout used when the checker sits beside desktop resources. */
  layout?: 'standalone' | 'panel';
  /** Optional id override for a nested panel layout. */
  sectionId?: string;
}

export const EligibilityChecker: React.FC<EligibilityCheckerProps> = ({
  language,
  schemes,
  isLoading = false,
  onSelectScheme,
  layout = 'standalone',
  sectionId,
}) => {
  const isPanelLayout = layout === 'panel';
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [isCalculating, setIsCalculating] = useState(false);

  // Controlled form state
  const [category, setCategory] = useState<string>('OBC');
  const [state, setState] = useState<string>('Gujarat');
  const [income, setIncome] = useState<string>('below-2.5');
  const [educationLevel, setEducationLevel] = useState<string>('undergraduate');
  const [institutionType, setInstitutionType] = useState<string>('government');
  const [hostelStatus, setHostelStatus] = useState<string>('day-scholar');

  const categoryOptions: DropdownOption[] = [
    {
      value: 'OBC',
      label: language === 'gu' ? 'OBC / SEBC (સામાજિક અને શૈક્ષણિક રીતે પછાત)' : 'OBC / SEBC',
    },
    {
      value: 'SC',
      label: language === 'gu' ? 'અનુસૂચિત જાતિ (Scheduled Caste - SC)' : 'Scheduled Caste (SC)',
    },
    {
      value: 'ST',
      label: language === 'gu' ? 'અનુસૂચિત જનજાતિ (Scheduled Tribe - ST)' : 'Scheduled Tribe (ST)',
    },
    {
      value: 'General',
      label: language === 'gu' ? 'જનરલ / EWS (General / EWS)' : 'General / EWS',
    },
  ];

  const stateOptions: DropdownOption[] = [
    { value: 'Gujarat', label: language === 'gu' ? 'ગુજરાત (Gujarat)' : 'Gujarat' },
    {
      value: 'Other',
      label: language === 'gu' ? 'અન્ય રાજ્ય (Other State)' : 'Outside Gujarat (Central Schemes)',
    },
  ];

  const incomeOptions: DropdownOption[] = [
    {
      value: 'below-2.5',
      label: language === 'gu' ? '₹૨,૫૦,૦૦૦ થી ઓછી' : 'Up to ₹2,50,000 / year',
    },
    {
      value: '2.5-to-6',
      label: language === 'gu' ? '₹૨,૫૦,૦૦૦ – ₹૬,૦૦,૦૦૦' : '₹2,50,000 – ₹6,00,000 / year',
    },
    {
      value: 'above-6',
      label: language === 'gu' ? '₹૬,૦૦,૦૦૦ થી વધુ' : 'Above ₹6,00,000 / year',
    },
  ];

  const educationOptions: DropdownOption[] = [
    {
      value: 'school',
      label: language === 'gu' ? 'ધોરણ ૯ થી ૧૨ (Higher Secondary)' : 'Class 9 to 12 (Pre/Post-Matric)',
    },
    {
      value: 'diploma',
      label: language === 'gu' ? 'ડિપ્લોમા / ITI (Diploma / ITI)' : 'Diploma / Polytechnic / ITI',
    },
    {
      value: 'undergraduate',
      label: language === 'gu' ? 'સ્નાતક (Undergraduate Degree)' : 'Undergraduate (B.E., B.Sc., B.Com., MBBS)',
    },
    {
      value: 'postgraduate',
      label: language === 'gu' ? 'અનુસ્નાતક / Ph.D. (Postgraduate)' : 'Postgraduate / Doctoral (M.E., M.Sc., Ph.D.)',
    },
  ];

  const institutionOptions: DropdownOption[] = [
    {
      value: 'government',
      label: language === 'gu' ? 'સરકારી / ગ્રાન્ટેડ સંસ્થા' : 'Government / Grant-in-Aid Institution',
    },
    {
      value: 'private',
      label: language === 'gu' ? 'માન્ય ખાનગી / સેલ્ફ-ફાઇનાન્સ સંસ્થા' : 'Recognized Private / Self-Financed',
    },
  ];

  const hostelOptions: DropdownOption[] = [
    {
      value: 'day-scholar',
      label: language === 'gu' ? 'ડે સ્કોલર (ઘરેથી અપ-ડાઉન)' : 'Day Scholar (Commuting)',
    },
    {
      value: 'hosteller',
      label: language === 'gu' ? 'હોસ્ટેલર (છાત્રાલયમાં રહેતા)' : 'Hosteller (Staying in Hostel)',
    },
  ];

  // The source data intentionally does not claim authoritative category/income rules.
  // These are indicative matches based on the scheme category text and do not determine official eligibility.
  const matchedSchemes = schemes.filter((scheme) => {
    // The information shown is a limited category guide and is not a complete government scheme catalogue.
    if (state !== 'Gujarat') return false;
    const targetGroup = scheme.targetGroup.toLowerCase();
    if (educationLevel === 'school') {
      return /class\s*[1-9]|class\s*9|class\s*10|class\s*11|class\s*12|primary|secondary|school/i.test(targetGroup) || scheme.id === 'free-textbooks';
    }
    if (educationLevel === 'diploma') {
      return /diploma|polytechnic|iti/i.test(targetGroup) || scheme.id === 'scholarship-schemes' || scheme.id === 'other-assistance';
    }
    if (educationLevel === 'undergraduate') {
      return /undergraduate|diploma|class 9|class 9–12/i.test(targetGroup) || scheme.id === 'scholarship-schemes';
    }
    return /postgraduate|doctoral|undergraduate|class 9–12/i.test(targetGroup) || scheme.id === 'scholarship-schemes';
  });

  const handleCalculateResults = () => {
    setIsCalculating(true);
    setStep(3);
    window.setTimeout(() => {
      setIsCalculating(false);
    }, 350);
  };

  const handleReset = () => {
    setStep(1);
    setIsCalculating(false);
  };

  const steps = [
    { num: 1, label: language === 'gu' ? 'મૂળભૂત માહિતી' : 'Basic Info' },
    { num: 2, label: language === 'gu' ? 'શિક્ષણ વિગત' : 'Education' },
    { num: 3, label: language === 'gu' ? 'પરિણામો' : 'Results' },
  ];

  return (
    <section
      id={sectionId || 'eligibility'}
      className={`scroll-mt-28 ${isPanelLayout ? 'h-full py-0' : 'py-12 lg:py-16'}`}
    >
      <div className={isPanelLayout ? 'h-full min-w-0' : 'max-w-3xl mx-auto px-4 sm:px-6 lg:px-8'}>
        <div
          className={`bg-warm-ivory border border-warm-border shadow-card overflow-visible ${
            isPanelLayout
              ? 'h-full rounded-2xl p-4 sm:p-5 lg:p-6'
              : 'rounded-3xl p-6 sm:p-8 lg:p-10'
          }`}
        >
          <div className={isPanelLayout ? 'mb-4' : 'mb-6'}>
            <h2 className={`${isPanelLayout ? 'text-xl sm:text-2xl' : 'text-2xl sm:text-3xl'} font-extrabold text-charcoal tracking-tight`}>
              {language === 'gu'
                ? (isPanelLayout ? 'તમારી પાત્રતા તપાસો' : 'પાત્રતા તપાસો')
                : (isPanelLayout ? 'Check Your Eligibility' : 'Check Eligibility')}
            </h2>
            <p className="mt-1.5 text-sm sm:text-base text-muted-text">
              {language === 'gu'
                ? 'તમે કઈ શિષ્યવૃત્તિ યોજનાઓ માટે પાત્ર છો તે સરળતાથી જાણો.'
                : 'Find out which schemes you may be eligible for.'}
            </p>
          </div>

          {/* 3-Step Progress: compact bars in the desktop split-panel layout, numbered steps elsewhere. */}
          {isPanelLayout ? (
            <div className="mb-5" aria-label={language === 'gu' ? 'પાત્રતા ચકાસણી પ્રગતિ' : 'Eligibility progress'}>
              <div className="grid grid-cols-3 gap-1.5" role="presentation">
                {steps.map((s) => (
                  <span
                    key={s.num}
                    className={`h-1.5 rounded-full transition-colors duration-fast ${
                      step >= s.num ? 'bg-forest-green' : 'bg-warm-border'
                    }`}
                  />
                ))}
              </div>
              <div className="mt-2 grid grid-cols-3 gap-2 text-[11px] sm:text-xs">
                {steps.map((s) => (
                  <span
                    key={s.num}
                    className={`${step === s.num ? 'font-bold text-forest-green' : 'font-medium text-muted-text'} ${s.num === 2 ? 'text-center' : s.num === 3 ? 'text-right' : ''}`}
                    aria-current={step === s.num ? 'step' : undefined}
                  >
                    {s.label}
                  </span>
                ))}
              </div>
            </div>
          ) : (
            <div className="relative flex items-center justify-between mb-8">
              <div className="absolute left-6 right-6 top-5 h-0.5 bg-warm-border -z-0" aria-hidden="true" />
              {steps.map((s) => {
                const isActive = step === s.num;
                const isCompleted = step > s.num;
                return (
                  <div key={s.num} className="relative z-10 flex flex-col items-center gap-1.5 bg-warm-ivory px-2">
                    <button
                      type="button"
                      onClick={() => { if (s.num < step) setStep(s.num as 1 | 2 | 3); }}
                      disabled={s.num > step}
                      className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold border transition-all ${
                        isActive || isCompleted
                          ? 'bg-forest-green text-warm-ivory border-forest-green shadow-sm'
                          : 'bg-warm-ivory text-charcoal border-warm-border'
                      }`}
                      aria-current={isActive ? 'step' : undefined}
                    >
                      {isCompleted ? <CheckCircle2 className="w-5 h-5" aria-hidden="true" /> : s.num}
                    </button>
                    <span className={`text-xs font-semibold ${isActive ? 'text-charcoal' : 'text-muted-text'}`}>
                      {s.label}
                    </span>
                  </div>
                );
              })}
            </div>
          )}

          {/* Step 1: Basic Info (Custom Glass Dropdowns) */}
          {step === 1 && (
            <div className={`${isPanelLayout ? 'space-y-4' : 'space-y-5'} overflow-visible`}>
              <Dropdown
                id="eligibility-category"
                label={language === 'gu' ? 'કેટેગરી (Category)' : 'Category'}
                value={category}
                options={categoryOptions}
                onChange={setCategory}
              />

              <Dropdown
                id="eligibility-state"
                label={language === 'gu' ? 'રાજ્ય (State)' : 'State'}
                value={state}
                options={stateOptions}
                onChange={setState}
              />

              <Dropdown
                id="eligibility-income"
                label={
                  language === 'gu'
                    ? 'વાર્ષિક કૌટુંબિક આવક (Annual Family Income)'
                    : 'Annual Family Income'
                }
                value={income}
                options={incomeOptions}
                onChange={setIncome}
              />

              <div className={`${isPanelLayout ? 'pt-1' : 'pt-3'} flex justify-end`}>
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-forest-green text-warm-ivory font-semibold text-sm sm:text-base hover:bg-forest-green/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest-green focus-visible:ring-offset-2 transition-all"
                >
                  <span>{language === 'gu' ? 'આગળ વધો' : 'Continue to Education'}</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Education Info (Custom Glass Dropdowns) */}
          {step === 2 && (
            <div className={`${isPanelLayout ? 'space-y-4' : 'space-y-5'} overflow-visible`}>
              <Dropdown
                id="eligibility-education"
                label={
                  language === 'gu'
                    ? 'અભ્યાસનું સ્તર (Education Level)'
                    : 'Education Level'
                }
                value={educationLevel}
                options={educationOptions}
                onChange={setEducationLevel}
              />

              <Dropdown
                id="eligibility-institution"
                label={
                  language === 'gu'
                    ? 'સંસ્થાનો પ્રકાર (Institution Type)'
                    : 'Institution Type'
                }
                value={institutionType}
                options={institutionOptions}
                onChange={setInstitutionType}
              />

              <Dropdown
                id="eligibility-hostel"
                label={
                  language === 'gu'
                    ? 'રહેઠાણ / હોસ્ટેલ સ્થિતિ (Commute / Hostel Status)'
                    : 'Commute / Hostel Status'
                }
                value={hostelStatus}
                options={hostelOptions}
                onChange={setHostelStatus}
              />

              <div className={`${isPanelLayout ? 'pt-1' : 'pt-3'} flex flex-col-reverse sm:flex-row items-center justify-between gap-3`}>
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-warm-border bg-vanilla-cream text-charcoal font-semibold text-sm hover:border-forest-green transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" aria-hidden="true" />
                  <span>{language === 'gu' ? 'પાછળ' : 'Back'}</span>
                </button>

                <button
                  type="button"
                  onClick={handleCalculateResults}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-forest-green text-warm-ivory font-semibold text-sm sm:text-base hover:bg-forest-green/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest-green transition-all"
                >
                  <Sparkles className="w-4 h-4 text-saffron" aria-hidden="true" />
                  <span>{language === 'gu' ? 'યોજનાઓ શોધો' : 'View Matching Schemes'}</span>
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Results with Skeleton Loading Support */}
          {step === 3 && (
            <div className="space-y-5">
              {isLoading || isCalculating ? (
                <div className="space-y-3" aria-label="Calculating eligible schemes">
                  <Skeleton className="h-12 w-full" rounded="xl" />
                  <Skeleton className="h-24 w-full" rounded="2xl" />
                  <Skeleton className="h-24 w-full" rounded="2xl" />
                </div>
              ) : (
                <>
                  <div className="p-4 rounded-2xl bg-sage-green/70 border border-forest-green/20 flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <p className="text-sm font-bold text-forest-green">
                        {language === 'gu'
                          ? `${matchedSchemes.length} સંભવિત યોજના સૂચનો`
                          : `${matchedSchemes.length} Potential scheme matches`}
                      </p>
                      <p className="text-xs text-muted-text mt-0.5">
                        {language === 'gu'
                          ? `કેટેગરી: ${categoryOptions.find((c) => c.value === category)?.label || category} · આવક: ${incomeOptions.find((o) => o.value === income)?.label || income} · રાજ્ય: ${stateOptions.find((o) => o.value === state)?.label || state}`
                          : `Category: ${categoryOptions.find((c) => c.value === category)?.label || category} · Income: ${incomeOptions.find((o) => o.value === income)?.label || income} · ${stateOptions.find((o) => o.value === state)?.label || state}`}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={handleReset}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-forest-green hover:underline"
                    >
                      <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>{language === 'gu' ? 'ફરીથી તપાસો' : 'Modify Criteria'}</span>
                    </button>
                  </div>

                  <p className="text-xs text-muted-text leading-relaxed">
                    {language === 'gu'
                      ? 'આ પ્રાથમિક મેળ માત્ર પસંદ કરેલા રાજ્ય અને અભ્યાસના સ્તર પર આધારિત છે. કેટેગરી, આવક, સંસ્થાનો પ્રકાર અને હોસ્ટેલ સ્થિતિ અહીં માત્ર સંદર્ભ માટે છે; તેનો ઉપયોગ મેળ નક્કી કરવા થતો નથી. અંતિમ પાત્રતા માટે સત્તાવાર નિયમો તપાસો.'
                      : 'This preliminary match uses only your selected state and education level. Category, income, institution type and hostel status are shown for reference only and are not used to calculate these matches. Confirm all requirements with the official scheme authority.'}
                  </p>

                  <div className="space-y-3">
                    {matchedSchemes.length === 0 ? (
                      <div className="rounded-2xl border border-warm-border bg-vanilla-cream/70 p-5 text-sm text-muted-text" role="status">
                        {language === 'gu'
                          ? 'પસંદ કરેલા રાજ્ય અને અભ્યાસ સ્તર માટે કોઈ મેળ ખાતી શ્રેણી મળી નથી. બીજો વિકલ્પ પસંદ કરો.'
                          : 'No matching categories were found for these selections. Check the official scheme notifications for other options.'}
                      </div>
                    ) : (
                      matchedSchemes.map((scheme) => (
                        <div
                          key={scheme.id}
                          className="p-4 sm:p-5 rounded-2xl bg-vanilla-cream/70 border border-warm-border flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-forest-green/60 transition-colors"
                        >
                          <div className="min-w-0">
                            <span className="inline-block max-w-full px-2.5 py-0.5 rounded-full text-xs font-semibold bg-sage-green text-forest-green mb-1.5">
                              {language === 'gu' ? scheme.benefitSummaryGu : scheme.benefitSummary}
                            </span>
                            <h3 className="text-base font-bold text-charcoal">
                              {language === 'gu' ? scheme.shortTitleGu : scheme.shortTitle}
                            </h3>
                            <p className="text-xs sm:text-sm text-muted-text mt-0.5">
                              {language === 'gu' ? scheme.descriptionGu : scheme.description}
                            </p>
                          </div>
                          {onSelectScheme && (
                            <button
                              type="button"
                              onClick={() => onSelectScheme(scheme)}
                              className="shrink-0 inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-forest-green text-warm-ivory text-xs sm:text-sm font-semibold hover:bg-forest-green/90 transition-colors"
                            >
                              <span>{language === 'gu' ? 'વિગત જુઓ' : 'View Details'}</span>
                              <ArrowRight className="w-4 h-4" aria-hidden="true" />
                            </button>
                          )}
                        </div>
                      ))
                    )}
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default EligibilityChecker;