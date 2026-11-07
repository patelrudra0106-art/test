export interface ProcessStepItem {
  number: string;
  numberGu: string;
  title: string;
  titleGu: string;
  description: string;
  descriptionGu: string;
  iconName: 'Search' | 'FileText' | 'ShieldCheck' | 'Clock3';
}



export const HOW_IT_WORKS_STEPS: ProcessStepItem[] = [
  {
    number: '01',
    numberGu: '૦૧',
    title: 'Discover',
    titleGu: 'શોધો',
    description: 'Explore scheme categories and review the published requirements.',
    descriptionGu: 'યોજનાની શ્રેણીઓ જુઓ અને જાહેર કરેલા માપદંડો તપાસો.',
    iconName: 'Search',
  },
  {
    number: '02',
    numberGu: '૦૨',
    title: 'Apply',
    titleGu: 'અરજી કરો',
    description: 'Follow the application instructions in the current official notice.',
    descriptionGu: 'હાલની સત્તાવાર સૂચનામાં આપેલી અરજી પ્રક્રિયાનું અનુસરણ કરો.',
    iconName: 'FileText',
  },
  {
    number: '03',
    numberGu: '૦૩',
    title: 'Verify',
    titleGu: 'ચકાસણી',
    description: 'Follow the document and verification steps set by the responsible authority.',
    descriptionGu: 'સંબંધિત અધિકારી દ્વારા નક્કી કરેલા દસ્તાવેજ અને ચકાસણીના પગલાં અનુસરો.',
    iconName: 'ShieldCheck',
  },
  {
    number: '04',
    numberGu: '૦૪',
    title: 'Track',
    titleGu: 'ટ્રેક કરો',
    description: 'Check application status through the official department service.',
    descriptionGu: 'સત્તાવાર વિભાગની સેવા દ્વારા અરજીની સ્થિતિ તપાસો.',
    iconName: 'Clock3',
  },
];
