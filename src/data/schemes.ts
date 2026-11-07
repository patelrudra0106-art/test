export type Language = 'en' | 'gu';

export type SchemeIconName = 'GraduationCap' | 'Bike' | 'BookOpen' | 'UsersRound';

export type MetricIconName = 'UsersRound' | 'GraduationCap' | 'Building2' | 'ShieldCheck';

export interface SchemeItem {
  id: string;
  code: string;
  title: string;
  titleGu: string;
  shortTitle: string;
  shortTitleGu: string;
  description: string;
  descriptionGu: string;
  icon: SchemeIconName;
  categoryTag: string;
  categoryTagGu: string;
  statusLabel: string;
  statusLabelGu: string;
  targetGroup: string;
  targetGroupGu: string;
  benefitSummary: string;
  benefitSummaryGu: string;
  eligibilityBullets: string[];
  eligibilityBulletsGu: string[];
  requiredDocuments: string[];
  requiredDocumentsGu: string[];
  applicationWindow: string;
  departmentName: string;
}

export interface MetricItem {
  id: string;
  value: string;
  valueGu: string;
  label: string;
  labelGu: string;
  icon: MetricIconName;
}

export const HERO_METRICS: MetricItem[] = [
  {
    id: 'schemes-on-platform',
    value: '8+',
    valueGu: '૮+',
    label: 'Schemes on One Platform',
    labelGu: 'એક જ પ્લેટફોર્મ પર યોજનાઓ',
    icon: 'UsersRound',
  },
  {
    id: 'languages',
    value: '2',
    valueGu: '૨',
    label: 'Languages',
    labelGu: 'ભાષાઓ',
    icon: 'GraduationCap',
  },
  {
    id: 'free-access',
    value: 'Free',
    valueGu: 'મફત',
    label: 'Access',
    labelGu: 'ઉપયોગ',
    icon: 'Building2',
  },
  {
    id: 'transparent-process',
    value: '100%',
    valueGu: '૧૦૦%',
    label: 'Transparent Process',
    labelGu: 'પારદર્શક પ્રક્રિયા',
    icon: 'ShieldCheck',
  },
];

export const POPULAR_SCHEMES: SchemeItem[] = [
  {
    id: 'scholarship-schemes',
    code: 'VPS-SCH-01',
    title: 'SCHOLARSHIP SCHEMES',
    titleGu: 'શિષ્યવૃત્તિ યોજનાઓ',
    shortTitle: 'Scholarship Schemes',
    shortTitleGu: 'શિષ્યવૃત્તિ યોજનાઓ',
    description: 'Financial support for meritorious and needy students.',
    descriptionGu: 'તેજસ્વી અને જરૂરિયાતમંદ વિદ્યાર્થીઓ માટે નાણાકીય સહાય.',
    icon: 'GraduationCap',
    categoryTag: 'Financial Grant',
    categoryTagGu: 'નાણાકીય સહાય',
    statusLabel: 'Check official notice',
    statusLabelGu: 'સત્તાવાર સૂચના તપાસો',
    targetGroup: 'Class 9–12, Diploma & Undergraduate Students',
    targetGroupGu: 'ધોરણ ૯ થી ૧૨, ડિપ્લોમા અને સ્નાતક વિદ્યાર્થીઓ',
    benefitSummary: 'Financial assistance may be available. Amounts and conditions are set by the official scheme notification.',
    benefitSummaryGu: 'નાણાકીય સહાય ઉપલબ્ધ હોઈ શકે છે. રકમ અને શરતો સત્તાવાર યોજના સૂચનામાં નક્કી થાય છે.',
    eligibilityBullets: [
      'Domicile student enrolled in a recognized school or college in Gujarat',
      'Academic performance requirements, where applicable, as stated in the official notification',
      'Income and category requirements, where applicable, as stated in the official notification',
      'Regular attendance verified by institution principal',
    ],
    eligibilityBulletsGu: [
      'ગુજરાતની માન્ય શાળા કે કોલેજમાં અભ્યાસ કરતા વિદ્યાર્થી',
      'લાગુ પડતા શૈક્ષણિક ગુણ અથવા મેરિટના માપદંડ, સત્તાવાર સૂચના મુજબ',
      'સત્તાવાર સૂચનામાં દર્શાવેલી આવક મર્યાદા, જ્યાં લાગુ પડે ત્યાં',
      'સત્તાવાર સૂચનામાં જરૂરી ગણાવેલી સંસ્થાકીય ચકાસણી',
    ],
    requiredDocuments: [
      'School / College Bonafide Certificate',
      'Previous Academic Year Marksheet',
      'Family Income Certificate issued by competent authority',
      'Student Bank Passbook Copy (Direct Benefit Transfer enabled)',
    ],
    requiredDocumentsGu: [
      'શાળા / કોલેજનું બોનાફાઇડ પ્રમાણપત્ર',
      'છેલ્લા વર્ષની માર્કશીટની નકલ',
      'સક્ષમ અધિકારી દ્વારા અપાયેલ આવકનું પ્રમાણપત્ર',
      'વિદ્યાર્થીની બેંક પાસબુકની નકલ',
    ],
    applicationWindow: 'Refer to the current official notification.',
    departmentName: 'Relevant scheme authority',
  },
  {
    id: 'bicycle-assistance',
    code: 'VPS-BIC-02',
    title: 'BICYCLE ASSISTANCE',
    titleGu: 'સાયકલ સહાય યોજના',
    shortTitle: 'Bicycle Assistance',
    shortTitleGu: 'સાયકલ સહાય',
    description: 'Free bicycles for eligible school students.',
    descriptionGu: 'પાત્રતા ધરાવતા શાળાના વિદ્યાર્થીઓ માટે વિનામૂલ્યે સાયકલ.',
    icon: 'Bike',
    categoryTag: 'Mobility Support',
    categoryTagGu: 'પરિવહન સહાય',
    statusLabel: 'Check with scheme authority',
    statusLabelGu: 'યોજના અધિકારી પાસે તપાસો',
    targetGroup: 'Class 9 Students Commuting to Secondary Schools',
    targetGroupGu: 'માધ્યમિક શાળામાં અભ્યાસ કરતા ધોરણ ૯ ના વિદ્યાર્થીઓ',
    benefitSummary: 'Bicycle assistance may be offered under applicable programmes. Confirm availability and conditions with the responsible authority.',
    benefitSummaryGu: 'લાગુ કાર્યક્રમો હેઠળ સાયકલ સહાય ઉપલબ્ધ હોઈ શકે છે. ઉપલબ્ધતા અને શરતો સંબંધિત અધિકારી પાસે તપાસો.',
    eligibilityBullets: [
      'Enrolled in Class 9 at a government or grant-in-aid secondary school',
      'Any distance or residence condition stated in the official notification',
      'Any restriction on previous receipt of similar assistance stated by the authority',
      'Application endorsed by the school headmaster',
    ],
    eligibilityBulletsGu: [
      'સરકારી અથવા ગ્રાન્ટેડ માધ્યમિક શાળામાં ધોરણ ૯ માં પ્રવેશ',
      'સત્તાવાર સૂચનામાં દર્શાવેલી રહેઠાણ અથવા અંતરની શરત, જ્યાં લાગુ પડે ત્યાં',
      'અગાઉ સમાન સહાય મેળવવા અંગેની કોઈ મર્યાદા, સત્તાવાર સૂચના મુજબ',
      'સત્તાવાર સૂચનામાં જરૂરી ગણાવેલી શાળાની ભલામણ અથવા ચકાસણી',
    ],
    requiredDocuments: [
      'Class 8 Passing Marksheet & Class 9 Admission Proof',
      'Residence / Distance Verification Note from School',
      'Parent / Guardian Consent Form',
      'School Student ID Card',
    ],
    requiredDocumentsGu: [
      'ધોરણ ૮ ની માર્કશીટ અને ધોરણ ૯ નો પ્રવેશ પુરાવો',
      'રહેઠાણ અને શાળા વચ્ચેના અંતરનું પ્રમાણપત્ર',
      'વાલીનું સંમતિ પત્રક',
      'શાળાનું વિદ્યાર્થી ઓળખપત્ર',
    ],
    applicationWindow: 'Refer to the current official notification.',
    departmentName: 'Relevant education authority',
  },
  {
    id: 'free-textbooks',
    code: 'VPS-TXT-03',
    title: 'FREE TEXTBOOKS',
    titleGu: 'વિનામૂલ્યે પાઠ્યપુસ્તકો',
    shortTitle: 'Free Textbooks',
    shortTitleGu: 'વિનામૂલ્યે પાઠ્યપુસ્તકો',
    description: 'Access to textbooks and learning materials.',
    descriptionGu: 'પાઠ્યપુસ્તકો અને શૈક્ષણિક સાહિત્યની સરળ ઉપલબ્ધતા.',
    icon: 'BookOpen',
    categoryTag: 'Learning Material',
    categoryTagGu: 'શૈક્ષણિક સાહિત્ય',
    statusLabel: 'Availability varies',
    statusLabelGu: 'ઉપલબ્ધતા બદલાઈ શકે છે',
    targetGroup: 'Class 1–12 Students in Eligible Schools',
    targetGroupGu: 'ધોરણ ૧ થી ૧૨ ના પાત્ર વિદ્યાર્થીઓ',
    benefitSummary: 'Textbook assistance may be provided under applicable education programmes. Confirm the current distribution rules with the school or department.',
    benefitSummaryGu: 'લાગુ શિક્ષણ કાર્યક્રમો હેઠળ પાઠ્યપુસ્તક સહાય મળી શકે છે. હાલના વિતરણના નિયમો શાળા અથવા વિભાગ પાસે તપાસો.',
    eligibilityBullets: [
      'Active enrollment in Class 1 to 12 in government or aided schools',
      'Medium of instruction registered in school portal (Gujarati / English / Hindi)',
      'Any school registration or verification requirement stated in the official notification',
    ],
    eligibilityBulletsGu: [
      'સરકારી અથવા અનુદાનિત શાળામાં ધોરણ ૧ થી ૧૨ માં નોંધણી',
      'શાળા પોર્ટલ પર નોંધાયેલ અભ્યાસનું માધ્યમ (ગુજરાતી / અંગ્રેજી / હિન્દી)',
      'શાળાના વિદ્યાર્થી રજીસ્ટર મારફતે સીધી નોંધણી',
    ],
    requiredDocuments: [
      'Current Academic Year School Enrollment Confirmation',
      'Student Roll Number & Class Section Verification',
    ],
    requiredDocumentsGu: [
      'ચાલુ શૈક્ષણિક વર્ષની શાળા નોંધણી વિગત',
      'વિદ્યાર્થીનો રોલ નંબર અને ધોરણની વિગત',
    ],
    applicationWindow: 'Confirm the current distribution schedule with the school or department.',
    departmentName: 'Relevant education authority',
  },
  {
    id: 'other-assistance',
    code: 'VPS-OTH-04',
    title: 'OTHER ASSISTANCE',
    titleGu: 'અન્ય શૈક્ષણિક સહાય',
    shortTitle: 'Other Assistance',
    shortTitleGu: 'અન્ય સહાય',
    description: 'Additional support programs for students.',
    descriptionGu: 'વિદ્યાર્થીઓ માટે વધારાની સહાયક યોજનાઓ અને સુવિધાઓ.',
    icon: 'UsersRound',
    categoryTag: 'Holistic Welfare',
    categoryTagGu: 'સર્વાંગી સહાય',
    statusLabel: 'Check official notice',
    statusLabelGu: 'સત્તાવાર સૂચના તપાસો',
    targetGroup: 'Primary, Secondary & Hostel Resident Students',
    targetGroupGu: 'પ્રાથમિક, માધ્યમિક અને છાત્રાલયના વિદ્યાર્થીઓ',
    benefitSummary: 'Other forms of student assistance may be available under separate programmes. Benefits depend on the relevant official notification.',
    benefitSummaryGu: 'અલગ કાર્યક્રમો હેઠળ અન્ય વિદ્યાર્થી સહાય ઉપલબ્ધ હોઈ શકે છે. લાભ સંબંધિત સત્તાવાર સૂચના પર આધારિત છે.',
    eligibilityBullets: [
      'Students enrolled in full-time courses in recognized institutions',
      'Specific criteria vary by sub-scheme (Hostel / Uniform / Exam Fee Support)',
      'Verified by school nodal teacher and district education office',
    ],
    eligibilityBulletsGu: [
      'માન્ય સંસ્થામાં પૂર્ણ-સમયના અભ્યાસક્રમમાં નોંધાયેલા વિદ્યાર્થીઓ',
      'પેટા-યોજના મુજબ પાત્રતાના ધોરણો (છાત્રાલય / ગણવેશ / પરીક્ષા ફી)',
      'શાળા નોડલ શિક્ષક અને જિલ્લા કચેરી દ્વારા ચકાસણી',
    ],
    requiredDocuments: [
      'School Bonafide & Attendance Certificate',
      'Hostel Admission Letter (for hostel stipend track)',
      'Category / Income Certificate where applicable',
      'Student Bank Account Details for grant disbursement',
    ],
    requiredDocumentsGu: [
      'શાળાનું બોનાફાઇડ અને હાજરી પ્રમાણપત્ર',
      'છાત્રાલય પ્રવેશ પત્ર (હોસ્ટેલ સહાય માટે)',
      'લાગુ પડતું આવક કે શ્રેણી પ્રમાણપત્ર',
      'સહાય જમા કરવા માટે બેંક ખાતાની વિગત',
    ],
    applicationWindow: 'Refer to the current official notification.',
    departmentName: 'Relevant scheme authority',
  },
];

const SCHEMES_STORAGE_KEY = 'vps_schemes_db';

export function getStoredSchemes(): SchemeItem[] {
  if (typeof window === 'undefined') return POPULAR_SCHEMES;
  try {
    const raw = localStorage.getItem(SCHEMES_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(SCHEMES_STORAGE_KEY, JSON.stringify(POPULAR_SCHEMES));
      return POPULAR_SCHEMES;
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      // Merge in any default schemes that might be missing
      const existingIds = new Set(parsed.map((s: SchemeItem) => s.id));
      const merged = [...parsed];
      for (const def of POPULAR_SCHEMES) {
        if (!existingIds.has(def.id)) {
          merged.push(def);
        }
      }
      return merged;
    }
    return POPULAR_SCHEMES;
  } catch {
    return POPULAR_SCHEMES;
  }
}

export function saveStoredScheme(newScheme: SchemeItem): SchemeItem[] {
  if (typeof window === 'undefined') return [newScheme, ...POPULAR_SCHEMES];
  try {
    const current = getStoredSchemes();
    const updated = [newScheme, ...current.filter((s) => s.id !== newScheme.id)];
    localStorage.setItem(SCHEMES_STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event('vps_schemes_updated'));
    return updated;
  } catch (err) {
    console.error('Failed to save scheme:', err);
    return POPULAR_SCHEMES;
  }
}

