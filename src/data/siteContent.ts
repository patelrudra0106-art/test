export interface UpdateItem {
  id: string;
  title: string;
  titleGu: string;
  statusLabel: string;
  statusLabelGu: string;
  statusTone: 'open' | 'updated';
  dateLabel: string;
  dateLabelGu: string;
  description: string;
  descriptionGu: string;
  details: string;
  detailsGu: string;
}


export interface BenefitCardItem {
  id: string;
  title: string;
  titleGu: string;
  description: string;
  descriptionGu: string;
  iconName: 'Layers3' | 'CheckCircle2' | 'UsersRound' | 'GraduationCap';
}

export interface ResourceItem {
  id: string;
  category: 'guides' | 'documents' | 'faqs';
  title: string;
  titleGu: string;
  subtitle: string;
  subtitleGu: string;
  iconName: 'BookOpen' | 'CircleHelp' | 'FileText' | 'Video' | 'PhoneCall';
  detailsHeader: string;
  detailsHeaderGu: string;
  contentPoints: string[];
  contentPointsGu: string[];
}


export const SITE_GUIDANCE_ITEMS: UpdateItem[] = [
  {
    id: 'guidance-official-notices',
    title: 'Check the latest official scheme notice',
    titleGu: 'યોજનાની નવીનતમ સત્તાવાર સૂચના તપાસો',
    statusLabel: 'Important',
    statusLabelGu: 'મહત્વપૂર્ણ',
    statusTone: 'updated',
    dateLabel: 'Before applying',
    dateLabelGu: 'અરજી કરતા પહેલાં',
    description: 'Application dates, benefit amounts and eligibility rules can change. Confirm every detail with the department that administers the scheme.',
    descriptionGu: 'અરજીની તારીખો, સહાયની રકમ અને પાત્રતાના નિયમો બદલાઈ શકે છે. દરેક વિગત સંબંધિત વિભાગની સત્તાવાર સૂચનામાંથી તપાસો.',
    details: 'Use this website as a starting point for general information. The current notice published by the responsible government department is the authoritative source for dates, eligibility, documents and application instructions.',
    detailsGu: 'આ વેબસાઇટનો ઉપયોગ સામાન્ય માહિતી માટે શરૂઆત તરીકે કરો. તારીખો, પાત્રતા, દસ્તાવેજો અને અરજીની સૂચનાઓ માટે સંબંધિત સરકારી વિભાગની હાલની સૂચના જ અધિકૃત સ્ત્રોત છે.',
  },
  {
    id: 'guidance-eligibility',
    title: 'Confirm eligibility for each scheme',
    titleGu: 'દરેક યોજના માટે પાત્રતા તપાસો',
    statusLabel: 'Eligibility',
    statusLabelGu: 'પાત્રતા',
    statusTone: 'open',
    dateLabel: 'Scheme-specific',
    dateLabelGu: 'યોજના મુજબ',
    description: 'A student may meet some general criteria but still be subject to additional conditions set by the scheme authority.',
    descriptionGu: 'વિદ્યાર્થી સામાન્ય માપદંડો પૂર્ણ કરતો હોય છતાં યોજના અધિકારી દ્વારા વધારાની શરતો લાગુ પડી શકે છે.',
    details: 'Review the applicable academic-year notification and all conditions, including domicile, course, institution, income, category and other scheme-specific requirements.',
    detailsGu: 'લાગુ શૈક્ષણિક વર્ષની સૂચના અને રહેઠાણ, અભ્યાસક્રમ, સંસ્થા, આવક, શ્રેણી તથા યોજનાની અન્ય ખાસ શરતો તપાસો.',
  },
  {
    id: 'guidance-documents',
    title: 'Prepare documents after checking the official list',
    titleGu: 'સત્તાવાર યાદી તપાસ્યા પછી દસ્તાવેજો તૈયાર કરો',
    statusLabel: 'Checklist',
    statusLabelGu: 'યાદી',
    statusTone: 'updated',
    dateLabel: 'May vary',
    dateLabelGu: 'બદલાઈ શકે છે',
    description: 'Document requirements differ by scheme, applicant category and academic year. Do not rely on a general checklist alone.',
    descriptionGu: 'દસ્તાવેજોની જરૂરિયાત યોજના, અરજદારની શ્રેણી અને શૈક્ષણિક વર્ષ પ્રમાણે બદલાય છે. માત્ર સામાન્ય યાદી પર આધાર ન રાખો.',
    details: 'Check document format, issuing authority, validity period, file-size limits and whether originals or self-attested copies are required in the official instructions.',
    detailsGu: 'સત્તાવાર સૂચનામાં દસ્તાવેજનું સ્વરૂપ, જારી કરનાર અધિકારી, માન્યતા સમયગાળો, ફાઇલ કદ અને મૂળ કે સ્વ-પ્રમાણિત નકલની જરૂરિયાત તપાસો.',
  },
  {
    id: 'guidance-account-safety',
    title: 'Keep personal and application details secure',
    titleGu: 'તમારી વ્યક્તિગત અને અરજીની વિગતો સુરક્ષિત રાખો',
    statusLabel: 'Safety',
    statusLabelGu: 'સુરક્ષા',
    statusTone: 'open',
    dateLabel: 'Always',
    dateLabelGu: 'હંમેશા',
    description: 'Enter personal details only on a verified official website. Never share passwords or one-time passcodes with another person.',
    descriptionGu: 'વ્યક્તિગત વિગતો માત્ર ચકાસેલી સત્તાવાર વેબસાઇટ પર જ દાખલ કરો. પાસવર્ડ અથવા OTP કોઈની સાથે શેર ન કરો.',
    details: 'Check the domain carefully before signing in or uploading documents. This information website does not accept applications, identity documents, passwords or payment details.',
    detailsGu: 'સાઇન ઇન અથવા દસ્તાવેજ અપલોડ કરતાં પહેલાં ડોમેન ચકાસો. આ માહિતી વેબસાઇટ અરજી, ઓળખ દસ્તાવેજો, પાસવર્ડ અથવા ચુકવણીની વિગતો સ્વીકારતી નથી.',
  },
];



export const BENEFIT_CARDS: BenefitCardItem[] = [
  {
    id: 'all-schemes-one-place',
    title: 'All Schemes in One Place',
    titleGu: 'તમામ યોજનાઓ એક જ સ્થળે',
    description: 'No more confusion. Everything is here.',
    descriptionGu: 'કોઈ મૂંઝવણ નહીં. બધી માહિતી અહીં ઉપલબ્ધ છે.',
    iconName: 'Layers3',
  },
  {
    id: 'easy-transparent-process',
    title: 'Easy & Transparent Process',
    titleGu: 'સરળ અને પારદર્શક પ્રક્રિયા',
    description: 'Simple steps with clear updates.',
    descriptionGu: 'સ્પષ્ટ અપડેટ્સ સાથે સરળ પગલાં.',
    iconName: 'CheckCircle2',
  },
  {
    id: 'accessible-for-all',
    title: 'Accessible for All',
    titleGu: 'સૌના માટે સુલભ',
    description: 'Designed for students, parents and schools.',
    descriptionGu: 'વિદ્યાર્થીઓ, વાલીઓ અને શાળાઓ માટે ખાસ તૈયાર કરેલ.',
    iconName: 'UsersRound',
  },
  {
    id: 'brighter-gujarat',
    title: 'Building a Brighter Gujarat',
    titleGu: 'ઉજ્જવળ ગુજરાતનું નિર્માણ',
    description: 'Empowering students today for a better tomorrow.',
    descriptionGu: 'આવતીકાલના ઉજ્જવળ ભવિષ્ય માટે આજે વિદ્યાર્થીઓનું સશક્તિકરણ.',
    iconName: 'GraduationCap',
  },
];

/**
 * Screen 7 Resources Data matching reference screen 07
 */
export const RESOURCE_ITEMS: ResourceItem[] = [
  {
    id: 'user-guides',
    category: 'guides',
    title: 'User Guides',
    titleGu: 'વપરાશકર્તા માર્ગદર્શિકા',
    subtitle: 'Step-by-step guides to apply for schemes',
    subtitleGu: 'યોજનાઓમાં અરજી કરવા માટે તબક્કાવાર માર્ગદર્શિકા',
    iconName: 'BookOpen',
    detailsHeader: 'Preparing an application',
    detailsHeaderGu: 'અરજી માટેની તૈયારી',
    contentPoints: [
      'Step 1: Read the current official notification for the scheme.',
      'Step 2: Confirm the eligibility conditions for your academic year and applicant category.',
      'Step 3: Prepare only the documents listed by the scheme authority.',
      'Step 4: Submit and track your application through the official portal or process named in the notification.',
    ],
    contentPointsGu: [
      'પગલું ૧: યોજનાની હાલની સત્તાવાર સૂચના વાંચો.',
      'પગલું ૨: શૈક્ષણિક વર્ષ અને અરજદારની શ્રેણી માટેની પાત્રતા તપાસો.',
      'પગલું ૩: યોજના અધિકારી દ્વારા દર્શાવેલા દસ્તાવેજો જ તૈયાર કરો.',
      'પગલું ૪: સૂચનામાં દર્શાવેલી સત્તાવાર પ્રક્રિયા દ્વારા અરજી કરો અને સ્થિતિ તપાસો.',
    ],
  },
  {
    id: 'faqs',
    category: 'faqs',
    title: 'FAQs',
    titleGu: 'વારંવાર પૂછાતા પ્રશ્નો (FAQs)',
    subtitle: 'Common questions and answers',
    subtitleGu: 'સામાન્ય પ્રશ્નો અને તેના સરળ જવાબો',
    iconName: 'CircleHelp',
    detailsHeader: 'Frequently Asked Questions',
    detailsHeaderGu: 'વારંવાર પૂછાતા પ્રશ્નો',
    contentPoints: [
      'Q: Can I apply for more than one scheme? — Check each scheme notice. Some schemes may have independent or overlapping conditions.',
      'Q: Does this website accept applications? — No. Applications must be submitted through the official authority or portal named in the scheme notice.',
      'Q: How long does verification take? — The administering authority sets the timeline. Refer to its current instructions.',
    ],
    contentPointsGu: [
      'પ્રશ્ન: શું હું એકથી વધુ યોજનાઓ માટે અરજી કરી શકું? — દરેક યોજનાની સત્તાવાર સૂચના તપાસો; શરતો અલગ હોઈ શકે છે.',
      'પ્રશ્ન: શું આ વેબસાઇટ અરજી સ્વીકારે છે? — ના. અરજી યોજનાની સૂચનામાં દર્શાવેલી સત્તાવાર કચેરી અથવા પોર્ટલ મારફતે કરો.',
      'પ્રશ્ન: ચકાસણીમાં કેટલો સમય લાગે છે? — સમયમર્યાદા સંબંધિત વિભાગ નક્કી કરે છે. તેની હાલની સૂચનાઓ જુઓ.',
    ],
  },
  {
    id: 'important-documents',
    category: 'documents',
    title: 'Important Documents',
    titleGu: 'મહત્વપૂર્ણ દસ્તાવેજો',
    subtitle: 'List of required documents',
    subtitleGu: 'જરૂરી દસ્તાવેજો અને પ્રમાણપત્રોની યાદી',
    iconName: 'FileText',
    detailsHeader: 'Document checklist to verify',
    detailsHeaderGu: 'તપાસવાની દસ્તાવેજ યાદી',
    contentPoints: [
      'School / College Bonafide Certificate with student roll number.',
      'Previous academic year marksheet (minimum required percentage varies by scheme).',
      'Valid Family Income Certificate issued by competent revenue authority.',
      'Student bank passbook copy with active Direct Benefit Transfer (DBT).',
    ],
    contentPointsGu: [
      'વિદ્યાર્થી રોલ નંબર દર્શાવતું શાળા/કોલેજનું બોનાફાઇડ પ્રમાણપત્ર.',
      'અગાઉના શૈક્ષણિક વર્ષની ગુણપત્રક (માર્કશીટ) ની નકલ.',
      'સક્ષમ મહેસૂલી અધિકારી દ્વારા જારી કરાયેલ આવકનું પ્રમાણપત્ર.',
      'વિદ્યાર્થીના બેંક ખાતાની પાસબુક (DBT સક્ષમ).',
    ],
  },
  {
    id: 'video-tutorials',
    category: 'guides',
    title: 'Video Tutorials',
    titleGu: 'વિડિયો ટ્યુટોરિયલ્સ',
    subtitle: 'Watch and learn',
    subtitleGu: 'સરળ વિડિયો દ્વારા માહિતી મેળવો',
    iconName: 'Video',
    detailsHeader: 'Application preparation guidance',
    detailsHeaderGu: 'અરજીની તૈયારી માટે માર્ગદર્શન',
    contentPoints: [
      'Review the official scheme notification and confirm the administering department.',
      'Check the document list, format requirements and submission deadline.',
      'Use the official portal or process to submit and track an application.',
    ],
    contentPointsGu: [
      'સત્તાવાર યોજના સૂચના વાંચો અને સંબંધિત વિભાગની ખાતરી કરો.',
      'દસ્તાવેજોની યાદી, જરૂરી સ્વરૂપ અને અંતિમ તારીખ તપાસો.',
      'અરજી સબમિટ કરવા અને સ્થિતિ તપાસવા સત્તાવાર પોર્ટલ અથવા પ્રક્રિયાનો ઉપયોગ કરો.',
    ],
  },
  {
    id: 'helpline-support',
    category: 'faqs',
    title: 'Helpline & Support',
    titleGu: 'હેલ્પલાઇન અને સહાય',
    subtitle: 'Get help and assistance',
    subtitleGu: 'મદદ અને માર્ગદર્શન મેળવો',
    iconName: 'PhoneCall',
    detailsHeader: 'Where to get scheme-specific help',
    detailsHeaderGu: 'યોજના સંબંધિત મદદ ક્યાંથી મેળવવી',
    contentPoints: [
      'For school-related questions, contact the designated school or institution representative.',
      'For scheme-specific questions, use the contact details published by the department administering that scheme.',
      'This website does not currently operate a separate helpline or support email.',
    ],
    contentPointsGu: [
      'શાળા સંબંધિત પ્રશ્નો માટે શાળા અથવા સંસ્થાના નિયુક્ત પ્રતિનિધિનો સંપર્ક કરો.',
      'યોજના સંબંધિત પ્રશ્નો માટે સંબંધિત વિભાગ દ્વારા પ્રકાશિત સંપર્ક વિગતોનો ઉપયોગ કરો.',
      'આ વેબસાઇટ હાલમાં અલગ હેલ્પલાઇન અથવા સહાય ઇમેઇલ ચલાવતી નથી.',
    ],
  },
];

