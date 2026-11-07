import React, { useState, useEffect } from 'react';
import {
  BookOpen,
  HelpCircle,
  FileText,
  Video,
  PhoneCall,
  ChevronRight,
  X,
  CheckCircle2,
} from 'lucide-react';
import { Skeleton } from './Skeleton';
import { Language } from './LanguageSelector';

export type ResourceCategory = 'all' | 'guides' | 'documents' | 'faqs';

export interface ResourceItem {
  id: string;
  category: Exclude<ResourceCategory, 'all'>;
  title: { en: string; gu: string };
  description: { en: string; gu: string };
  details: { en: string[]; gu: string[] };
  iconType: 'guides' | 'faqs' | 'documents' | 'video' | 'helpline';
}

export interface HelpSectionProps {
  language: Language;
  isLoading?: boolean;
  activeCategory?: ResourceCategory;
  onCategoryChange?: (category: ResourceCategory) => void;
  highlightedResourceId?: string | null;
}

const RESOURCES_DATA: ResourceItem[] = [
  {
    id: 'user-guides',
    category: 'guides',
    title: {
      en: 'User Guides',
      gu: 'વપરાશકર્તા માર્ગદર્શિકા (User Guides)',
    },
    description: {
      en: 'Guidance for reviewing official scheme requirements',
      gu: 'સત્તાવાર યોજનાની શરતો તપાસવા માટેનું માર્ગદર્શન',
    },
    details: {
      en: [
        'Read the current official notification for the relevant academic year and scheme.',
        'Review all conditions, including course, institution, income, category and residence requirements where applicable.',
        'Prepare the documents and file formats specified by the scheme authority.',
        'Submit and track your application only through the official process identified in the notification.',
      ],
      gu: [
        'સંબંધિત શૈક્ષણિક વર્ષ અને યોજના માટેની હાલની સત્તાવાર સૂચના વાંચો.',
        'અભ્યાસક્રમ, સંસ્થા, આવક, શ્રેણી અને લાગુ પડતી રહેઠાણની તમામ શરતો તપાસો.',
        'યોજના અધિકારી દ્વારા માંગવામાં આવેલા દસ્તાવેજો અને ફાઇલ સ્વરૂપ તૈયાર કરો.',
        'સૂચનામાં દર્શાવેલી સત્તાવાર પ્રક્રિયા દ્વારા જ અરજી કરો અને સ્થિતિ તપાસો.',
      ],
    },
    iconType: 'guides',
  },
  {
    id: 'faqs',
    category: 'faqs',
    title: {
      en: 'FAQs',
      gu: 'વારંવાર પૂછાતા પ્રશ્નો (FAQs)',
    },
    description: {
      en: 'Common questions and answers',
      gu: 'સામાન્ય પ્રશ્નો અને તેના જવાબો',
    },
    details: {
      en: [
        'Can I apply for more than one scheme? Check each scheme’s current notice; eligibility conditions and restrictions can differ.',
        'Who verifies an application? Follow the verification process published by the department administering the scheme.',
        'How do I check application status? Use the official portal or contact channel named by the responsible department.',
      ],
      gu: [
        'શું હું એકથી વધુ યોજનાઓ માટે અરજી કરી શકું? દરેક યોજનાની હાલની સૂચના તપાસો; પાત્રતા અને મર્યાદાઓ અલગ હોઈ શકે છે.',
        'અરજીની ચકાસણી કોણ કરે છે? સંબંધિત યોજના વિભાગ દ્વારા જાહેર કરેલી ચકાસણી પ્રક્રિયાનું અનુસરણ કરો.',
        'અરજીની સ્થિતિ કેવી રીતે તપાસવી? સંબંધિત વિભાગ દ્વારા દર્શાવેલા સત્તાવાર પોર્ટલ અથવા સંપર્ક માધ્યમનો ઉપયોગ કરો.',
      ],
    },
    iconType: 'faqs',
  },
  {
    id: 'important-documents',
    category: 'documents',
    title: {
      en: 'Important Documents',
      gu: 'મહત્વપૂર્ણ દસ્તાવેજો (Important Documents)',
    },
    description: {
      en: 'List of required documents',
      gu: 'અરજી અને ચકાસણી માટે જરૂરી દસ્તાવેજોની યાદી',
    },
    details: {
      en: [
        'Competent Authority Caste Certificate (SC / ST / OBC / SEBC / EWS).',
        'Valid Annual Family Income Certificate (issued by Mamlatdar / TDO).',
        'Academic records or current enrolment proof, where requested in the scheme notice.',
        'Bank account information only where the official scheme notice specifically requires it.',
        'Hostel certificate signed by the warden (if applying as a Hosteller).',
      ],
      gu: [
        'સક્ષમ અધિકારી દ્વારા અપાયેલ જાતિનું પ્રમાણપત્ર (SC / ST / OBC / SEBC / EWS).',
        'મામલતદાર / TDO દ્વારા પ્રમાણિત વાર્ષિક આવકનું પ્રમાણપત્ર.',
        'યોજના સૂચનામાં માંગવામાં આવે ત્યારે શૈક્ષણિક રેકોર્ડ અથવા ચાલુ વર્ષની નોંધણીનો પુરાવો.',
        'સત્તાવાર યોજના સૂચનામાં ખાસ માંગવામાં આવે ત્યારે જ બેંક ખાતાની વિગતો.',
        'છાત્રાલયમાં રહેતા વિદ્યાર્થીઓ માટે હોસ્ટેલ વોર્ડનનું પ્રમાણપત્ર.',
      ],
    },
    iconType: 'documents',
  },
  {
    id: 'video-tutorials',
    category: 'guides',
    title: {
      en: 'Application Preparation Guides',
      gu: 'અરજી તૈયારી માર્ગદર્શિકા',
    },
    description: {
      en: 'Guidance for reviewing official scheme requirements',
      gu: 'સત્તાવાર યોજનાની શરતો તપાસવા માટેનું માર્ગદર્શન',
    },
    details: {
      en: [
        'Guide 1: How to read the eligibility section of a scheme notification.',
        'Guide 2: How to prepare the documents listed by the scheme authority.',
        'Guide 3: Where to find the official application-status service.',
      ],
      gu: [
        'માર્ગદર્શન ૧: યોજનાની સૂચનામાં પાત્રતાનો વિભાગ કેવી રીતે વાંચવો.',
        'માર્ગદર્શન ૨: યોજના અધિકારી દ્વારા દર્શાવેલા દસ્તાવેજો કેવી રીતે તૈયાર કરવા.',
        'માર્ગદર્શન ૩: સત્તાવાર અરજી-સ્થિતિ સેવા ક્યાંથી મેળવવી.',
      ],
    },
    iconType: 'guides',
  },
  {
    id: 'helpline-support',
    category: 'faqs',
    title: {
      en: 'Helpline & Support',
      gu: 'હેલ્પલાઇન અને સહાય (Helpline & Support)',
    },
    description: {
      en: 'Get help and assistance',
      gu: 'મદદ અને માર્ગદર્શન મેળવો',
    },
    details: {
      en: [
        'For school-related questions, contact the designated representative at your school or institution.',
        'For scheme-specific questions, use the contact details published by the department administering that scheme.',
        'This website does not currently operate a separate helpline or support desk.',
      ],
      gu: [
        'વિદ્યા પ્રગતિ સેતુ પાસે હાલમાં અલગ હેલ્પલાઇન અથવા સહાય કેન્દ્ર નથી.',
        'શાળા સંબંધિત પ્રશ્નો માટે તમારી શાળા અથવા સંસ્થાનો સંપર્ક કરો.',
        'યોજનાની વિગતો માટે સંબંધિત વિભાગની સત્તાવાર વેબસાઇટ પર દર્શાવેલી સંપર્ક માહિતીનો ઉપયોગ કરો.',
      ],
    },
    iconType: 'helpline',
  },
];

export const HelpSection: React.FC<HelpSectionProps> = ({
  language,
  isLoading = false,
  activeCategory: controlledCategory,
  onCategoryChange,
  highlightedResourceId,
}) => {
  const [internalCategory, setInternalCategory] = useState<ResourceCategory>('all');
  const [selectedResource, setSelectedResource] = useState<ResourceItem | null>(null);

  const currentCategory = controlledCategory ?? internalCategory;

  const handleCategorySelect = (cat: ResourceCategory) => {
    setInternalCategory(cat);
    onCategoryChange?.(cat);
  };

  useEffect(() => {
    if (highlightedResourceId) {
      const found = RESOURCES_DATA.find((item) => item.id === highlightedResourceId);
      if (found) {
        setSelectedResource(found);
      }
    }
  }, [highlightedResourceId]);

  const filterTabs: Array<{ id: ResourceCategory; label: string }> = [
    { id: 'all', label: language === 'gu' ? 'બધા (All)' : 'All' },
    { id: 'guides', label: language === 'gu' ? 'માર્ગદર્શિકા' : 'Guides' },
    { id: 'documents', label: language === 'gu' ? 'દસ્તાવેજો' : 'Documents' },
    { id: 'faqs', label: language === 'gu' ? 'પ્રશ્નો (FAQs)' : 'FAQs' },
  ];

  const filteredResources = RESOURCES_DATA.filter((item) =>
    currentCategory === 'all' ? true : item.category === currentCategory
  );

  // Uses text-current so the icon always contrasts with its container in normal, hover, and focus states
  const renderResourceIcon = (iconType: ResourceItem['iconType']) => {
    const iconProps = {
      className: 'w-5 h-5 text-current transition-colors duration-200',
      'aria-hidden': true as const,
    };
    switch (iconType) {
      case 'guides':
        return <BookOpen {...iconProps} />;
      case 'faqs':
        return <HelpCircle {...iconProps} />;
      case 'documents':
        return <FileText {...iconProps} />;
      case 'video':
        return <Video {...iconProps} />;
      case 'helpline':
        return <PhoneCall {...iconProps} />;
    }
  };

  return (
    <section id="resources" className="py-12 lg:py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-charcoal tracking-tight">
            {language === 'gu' ? 'સંસાધનો' : 'Resources'}
          </h2>
          <p className="mt-1.5 text-sm sm:text-base text-muted-text">
            {language === 'gu'
              ? 'વિદ્યાર્થીઓ, વાલીઓ અને શિક્ષકો માટે ઉપયોગી માહિતી અને દસ્તાવેજ યાદી.'
              : 'Helpful resources for students, parents and educators.'}
          </p>
        </div>

        {/* Filter Pills */}
        <div
          role="tablist"
          aria-label="Resource categories"
          className="flex flex-wrap items-center gap-2.5 mb-6"
        >
          {filterTabs.map((tab) => {
            const isActive = currentCategory === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => handleCategorySelect(tab.id)}
                className={`px-4 py-2 rounded-full text-sm font-semibold border transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest-green ${
                  isActive
                    ? 'bg-forest-green text-warm-ivory border-forest-green shadow-sm'
                    : 'bg-sage-green/65 text-charcoal border-warm-border hover:border-forest-green/50'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Resource Cards List or Skeletons */}
        {isLoading ? (
          <div className="space-y-3.5" aria-label="Loading resources">
            {[1, 2, 3, 4, 5].map((item) => (
              <div
                key={item}
                className="flex items-center justify-between gap-4 p-4 sm:p-5 rounded-2xl bg-warm-ivory border border-warm-border"
              >
                <div className="flex items-center gap-4 min-w-0 flex-1">
                  <Skeleton className="w-12 h-12 shrink-0" rounded="xl" />
                  <div className="space-y-2 flex-1 max-w-md">
                    <Skeleton className="h-5 w-48" rounded="md" />
                    <Skeleton className="h-4 w-64" rounded="md" />
                  </div>
                </div>
                <Skeleton className="w-5 h-5 shrink-0" rounded="full" />
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-3.5">
            {filteredResources.map((resource) => (
              <button
                key={resource.id}
                type="button"
                onClick={() => setSelectedResource(resource)}
                className="group w-full flex items-center justify-between gap-4 p-4 sm:p-5 rounded-2xl bg-warm-ivory border border-warm-border hover:border-forest-green/70 focus-visible:border-forest-green focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest-green/30 shadow-sm hover:shadow-card transition-all duration-200 text-left"
              >
                <div className="flex items-center gap-4 min-w-0">
                  {/* Icon Container: Sage Green default + Forest Green icon; Forest Green on hover/focus + Warm Ivory icon */}
                  <div className="w-12 h-12 rounded-xl bg-sage-green text-forest-green group-hover:bg-forest-green group-hover:text-warm-ivory group-focus-visible:bg-forest-green group-focus-visible:text-warm-ivory flex items-center justify-center shrink-0 transition-colors duration-200">
                    {renderResourceIcon(resource.iconType)}
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-base sm:text-lg font-bold text-charcoal group-hover:text-forest-green group-focus-visible:text-forest-green transition-colors truncate">
                      {resource.title[language]}
                    </h3>
                    <p className="text-xs sm:text-sm text-muted-text truncate mt-0.5">
                      {resource.description[language]}
                    </p>
                  </div>
                </div>

                <ChevronRight
                  className="w-5 h-5 text-muted-text group-hover:text-forest-green group-focus-visible:text-forest-green group-hover:translate-x-0.5 transition-all shrink-0"
                  aria-hidden="true"
                />
              </button>
            ))}
          </div>
        )}

        {/* Resource Detail Modal */}
        {selectedResource && (
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="resource-modal-title"
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal/60 backdrop-blur-sm"
            onClick={() => setSelectedResource(null)}
          >
            <div
              className="w-full max-w-lg rounded-3xl bg-warm-ivory border border-warm-border p-6 sm:p-8 shadow-dropdown"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between gap-4 mb-5">
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-xl bg-forest-green text-warm-ivory flex items-center justify-center shrink-0">
                    {renderResourceIcon(selectedResource.iconType)}
                  </div>
                  <div>
                    <h3
                      id="resource-modal-title"
                      className="text-xl font-extrabold text-charcoal"
                    >
                      {selectedResource.title[language]}
                    </h3>
                    <p className="text-xs sm:text-sm text-muted-text">
                      {selectedResource.description[language]}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedResource(null)}
                  aria-label="Close dialog"
                  className="p-2 rounded-xl border border-warm-border text-muted-text hover:text-charcoal hover:border-forest-green"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <ul className="space-y-3 mb-6">
                {selectedResource.details[language].map((point, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2.5 text-sm text-charcoal leading-relaxed"
                  >
                    <CheckCircle2
                      className="w-4 h-4 text-forest-green shrink-0 mt-1"
                      aria-hidden="true"
                    />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setSelectedResource(null)}
                  className="px-5 py-2.5 rounded-xl bg-forest-green text-warm-ivory text-sm font-semibold hover:bg-forest-green/90 transition-colors"
                >
                  {language === 'gu' ? 'બંધ કરો' : 'Got It'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default HelpSection;
