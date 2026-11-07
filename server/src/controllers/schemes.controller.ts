import { Request, Response } from 'express';
import { Scheme } from '../types/index.js';

const SEED_SCHEMES: Scheme[] = [
  {
    id: 'scholarship-schemes',
    code: 'VPS-SCH-01',
    titleEn: 'Scholarship Schemes',
    titleGu: 'શિષ્યવૃત્તિ યોજનાઓ',
    shortTitleEn: 'Scholarships',
    shortTitleGu: 'શિષ્યવૃત્તિ',
    descriptionEn: 'Financial assistance for meritorious and needy students in Gujarat.',
    descriptionGu: 'તેજસ્વી અને જરૂરિયાતમંદ વિદ્યાર્થીઓ માટે નાણાકીય સહાય.',
    iconName: 'GraduationCap',
    categoryTagEn: 'Financial Grant',
    categoryTagGu: 'નાણાકીય સહાય',
    statusLabelEn: 'Active for AY 2026-27',
    statusLabelGu: 'શૈક્ષણિક વર્ષ ૨૦૨૬-૨૭ માટે સક્રિય',
    targetGroupEn: 'Class 9–12, Diploma & Undergraduate Students',
    targetGroupGu: 'ધોરણ ૯ થી ૧૨, ડિપ્લોમા અને સ્નાતક વિદ્યાર્થીઓ',
    benefitSummaryEn: 'Direct tuition grant up to ₹50,000 disbursed via PFMS DBT transfer.',
    benefitSummaryGu: 'PFMS DBT ટ્રાન્સફર દ્વારા ₹૫૦,૦૦૦ સુધી સીધી સહાય.',
    applicationWindow: 'Academic Year 2026–27',
    departmentName: 'Department of Social Justice and Empowerment, Gujarat',
    isActive: true,
  },
  {
    id: 'bicycle-assistance',
    code: 'VPS-BIC-02',
    titleEn: 'Bicycle Assistance (Saraswati Sadhana Yojana)',
    titleGu: 'સરસ્વતી સાધના સાયકલ સહાય યોજના',
    shortTitleEn: 'Bicycle Assistance',
    shortTitleGu: 'સાયકલ સહાય',
    descriptionEn: 'Mobility support to encourage female students to continue secondary schooling.',
    descriptionGu: 'કન્યા કેળવણીને પ્રોત્સાહન આપવા માટે સાયકલ સહાય.',
    iconName: 'Bike',
    categoryTagEn: 'Mobility Support',
    categoryTagGu: 'વાહન સહાય',
    statusLabelEn: 'Active for AY 2026-27',
    statusLabelGu: 'શૈક્ષણિક વર્ષ ૨૦૨૬-૨૭ માટે સક્રિય',
    targetGroupEn: 'Female students entering Class 9 in rural and semi-urban Gujarat',
    targetGroupGu: 'ગ્રામીણ અને અર્ધ-શહેરી ગુજરાતની ધોરણ ૯ ની વિદ્યાર્થિનીઓ',
    benefitSummaryEn: '100% free brand-new road safety certified bicycle.',
    benefitSummaryGu: '૧૦૦% નિઃશુલ્ક નવી સાયકલ સહાય.',
    applicationWindow: 'Academic Year 2026–27',
    departmentName: 'Education Department, Government of Gujarat',
    isActive: true,
  },
  {
    id: 'free-textbooks',
    code: 'VPS-TBK-03',
    titleEn: 'Free Textbooks Scheme',
    titleGu: 'વિનામૂલ્યે પાઠ્યપુસ્તક યોજના',
    shortTitleEn: 'Free Textbooks',
    shortTitleGu: 'પાઠ્યપુસ્તકો',
    descriptionEn: 'Distribution of curriculum books to all government school students.',
    descriptionGu: 'તમામ સરકારી શાળાઓમાં અભ્યાસક્રમના પુસ્તકોનું વિતરણ.',
    iconName: 'BookOpen',
    categoryTagEn: 'Learning Material',
    categoryTagGu: 'શિક્ષણ સામગ્રી',
    statusLabelEn: 'Ongoing Distribution',
    statusLabelGu: 'સતત વિતરણ',
    targetGroupEn: 'Class 1 through 12 government school pupils',
    targetGroupGu: 'સરકારી શાળાઓના ધોરણ ૧ થી ૧૨ ના વિદ્યાર્થીઓ',
    benefitSummaryEn: '100% free state board textbooks for all subjects.',
    benefitSummaryGu: 'બધા વિષયોના તમામ પુસ્તકો વિનામૂલ્યે.',
    applicationWindow: 'Annual Academic Cycle',
    departmentName: 'Gujarat State Board of School Textbooks (GSSTB)',
    isActive: true,
  },
  {
    id: 'other-assistance',
    code: 'VPS-OTH-04',
    titleEn: 'Other Educational & Hostel Support',
    titleGu: 'અન્ય શૈક્ષણિક અને હોસ્ટેલ સહાય',
    shortTitleEn: 'Other Support',
    shortTitleGu: 'અન્ય સહાય',
    descriptionEn: 'Hostel fee grants, special coaching subsidies, and educational supplies.',
    descriptionGu: 'હોસ્ટેલ ફી સહાય, વિશેષ કોચિંગ સબસિડી અને શૈક્ષણિક સાધનો.',
    iconName: 'UsersRound',
    categoryTagEn: 'Special Grants',
    categoryTagGu: 'વિશેષ સહાય',
    statusLabelEn: 'Notice Published',
    statusLabelGu: 'સૂચના પ્રસિદ્ધ',
    targetGroupEn: 'Hostellers, technical diploma students, and economically weaker sections',
    targetGroupGu: 'હોસ્ટેલિયર્સ, ટેકનિકલ ડિપ્લોમા વિદ્યાર્થીઓ અને આર્થિક રીતે નબળા વર્ગો',
    benefitSummaryEn: 'Hostel food bill subsidies and competitive exam coaching vouchers.',
    benefitSummaryGu: 'હોસ્ટેલ ભોજન બિલ સબસિડી અને સ્પર્ધાત્મક પરીક્ષા કોચિંગ સહાય.',
    applicationWindow: 'Academic Year 2026–27',
    departmentName: 'Directorate of Developing Castes Welfare, Gujarat',
    isActive: true,
  },
];

export class SchemesController {
  static async getAll(req: Request, res: Response): Promise<void> {
    const { category, search, lang = 'en' } = req.query;

    let filtered = [...SEED_SCHEMES];

    if (category && category !== 'ALL') {
      filtered = filtered.filter((s) => s.id === category);
    }

    if (search && typeof search === 'string') {
      const q = search.trim().toLowerCase();
      filtered = filtered.filter(
        (s) =>
          s.titleEn.toLowerCase().includes(q) ||
          s.titleGu.includes(q) ||
          s.descriptionEn.toLowerCase().includes(q) ||
          s.descriptionGu.includes(q) ||
          s.code.toLowerCase().includes(q)
      );
    }

    res.json({
      success: true,
      data: filtered,
      total: filtered.length,
      language: lang,
    });
  }

  static async getById(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const scheme = SEED_SCHEMES.find((s) => s.id === id || s.code === id);

    if (!scheme) {
      res.status(404).json({
        success: false,
        error: 'Not Found',
        message: `Scheme with ID or code '${id}' not found.`,
      });
      return;
    }

    res.json({
      success: true,
      data: scheme,
    });
  }
}

