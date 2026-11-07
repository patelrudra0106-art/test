import React, { useState } from 'react';
import {
  PlusCircle,
  X,
  GraduationCap,
  Bike,
  BookOpen,
  UsersRound,
  CheckCircle2,
  AlertCircle,
  Sparkles,
} from 'lucide-react';
import { Language, SchemeIconName, SchemeItem, saveStoredScheme } from '../data/schemes';

interface AdminAddSchemeModalProps {
  isOpen: boolean;
  onClose: () => void;
  language?: Language;
  onSchemeAdded: (newScheme: SchemeItem) => void;
}

const DEPARTMENT_OPTIONS = [
  'Education Department (Higher Education)',
  'Primary & Secondary Education Directorate',
  'Department of Social Justice & Empowerment',
  'Tribal Development Department',
  'Gujarat State Board of School Textbooks (GSSTB)',
  'Directorate of Developing Castes Welfare',
  'Technical Education Directorate',
];

const CATEGORY_OPTIONS = [
  { en: 'Financial Grant', gu: 'નાણાકીય સહાય' },
  { en: 'Mobility Support', gu: 'સાધન સહાય' },
  { en: 'Learning Material', gu: 'શિક્ષણ સામગ્રી' },
  { en: 'Direct Tuition Support', gu: 'સીધી ટ્યુશન સહાય' },
  { en: 'Hostel & Food Subsidy', gu: 'છાત્રાલય અને ભોજન સહાય' },
  { en: 'Merit Award & Coaching', gu: 'મેરિટ એવોર્ડ અને કોચિંગ' },
];

export const AdminAddSchemeModal: React.FC<AdminAddSchemeModalProps> = ({
  isOpen,
  onClose,
  language = 'en',
  onSchemeAdded,
}) => {
  const isGu = language === 'gu';

  const [code, setCode] = useState('VPS-SCH-05');
  const [title, setTitle] = useState('');
  const [titleGu, setTitleGu] = useState('');
  const [shortTitle, setShortTitle] = useState('');
  const [shortTitleGu, setShortTitleGu] = useState('');
  const [department, setDepartment] = useState(DEPARTMENT_OPTIONS[0]);
  const [categoryIndex, setCategoryIndex] = useState(0);
  const [icon, setIcon] = useState<SchemeIconName>('GraduationCap');
  const [description, setDescription] = useState('');
  const [descriptionGu, setDescriptionGu] = useState('');
  const [targetGroup, setTargetGroup] = useState('');
  const [targetGroupGu, setTargetGroupGu] = useState('');
  const [benefitSummary, setBenefitSummary] = useState('');
  const [benefitSummaryGu, setBenefitSummaryGu] = useState('');
  const [applicationWindow, setApplicationWindow] = useState('Academic Year 2026–27');
  const [eligibilityText, setEligibilityText] = useState('Domicile student enrolled in recognized Gujarat institution\nFamily income within notification guidelines\nMinimum 50% marks in qualifying examination');
  const [documentsText, setDocumentsText] = useState('College Bonafide Certificate\nPrevious Year Marksheet\nIncome Certificate (Mamlatdar Office)\nBank Account Passbook (Aadhaar linked)');

  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  // Autofill sample data helper for quick testing
  const handleAutofillSample = () => {
    setCode(`VPS-TAB-0${Math.floor(5 + Math.random() * 5)}`);
    setTitle('Namami Saraswati Tablet Sahay Yojana for College Freshers');
    setTitleGu('નમામિ સરસ્વતી કોલેજ પ્રથમ વર્ષ ટેબ્લેટ સહાય યોજના');
    setShortTitle('Tablet Assistance Scheme');
    setShortTitleGu('ટેબ્લેટ સહાય યોજના');
    setDepartment('Education Department (Higher Education)');
    setCategoryIndex(1); // Mobility / Equipment
    setIcon('GraduationCap');
    setDescription('High-performance digital learning tablets provided at token fee of ₹1,000 to first-year higher education students in Gujarat.');
    setDescriptionGu('ગુજરાતના પ્રથમ વર્ષના કોલેજ વિદ્યાર્થીઓને ડિજિટલ શિક્ષણ માટે માત્ર ₹૧,૦૦૦ ટોકન દરે બ્રાન્ડેડ ટેબ્લેટ સહાય.');
    setTargetGroup('First Year Diploma, Degree & Professional College Students');
    setTargetGroupGu('પ્રથમ વર્ષ ડિપ્લોમા, સ્નાતક અને વ્યવસાયિક કોલેજના તમામ પાત્ર વિદ્યાર્થીઓ');
    setBenefitSummary('Branded 4G/WiFi Tablet with pre-loaded e-learning content or ₹12,000 direct purchase voucher.');
    setBenefitSummaryGu('ઈ-લર્નિંગ સામગ્રી સાથે બ્રાન્ડેડ ટેબ્લેટ અથવા ₹૧૨,૦૦૦ સીધી ખરીદી વાઉચર સહાય.');
    setApplicationWindow('Academic Year 2026–27 (Active Now)');
    setEligibilityText('Passed Class 12 from GSHSEB or equivalent board\nEnrolled in first-year recognized college in Gujarat\nGujarat state domicile certificate');
    setDocumentsText('Class 12 Passing Marksheet\nCollege Admission Letter & Fee Receipt\nAadhaar Card Copy\nIncome Certificate where applicable');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!title.trim() || !titleGu.trim()) {
      setErrorMsg(isGu ? 'કૃપા કરીને યોજનાનું અંગ્રેજી અને ગુજરાતી નામ દાખલ કરો.' : 'Please enter the scheme title in both English and Gujarati.');
      return;
    }

    if (!code.trim()) {
      setErrorMsg(isGu ? 'કૃપા કરીને યોજના કોડ દાખલ કરો.' : 'Please provide a valid Scheme Code.');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const selectedCategory = CATEGORY_OPTIONS[categoryIndex];
      const slugId = code.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + Date.now();

      const eligibilityBullets = eligibilityText
        .split('\n')
        .map((s) => s.trim())
        .filter(Boolean);
      const requiredDocuments = documentsText
        .split('\n')
        .map((s) => s.trim())
        .filter(Boolean);

      const newScheme: SchemeItem = {
        id: slugId,
        code: code.trim().toUpperCase(),
        title: title.trim().toUpperCase(),
        titleGu: titleGu.trim(),
        shortTitle: shortTitle.trim() || title.trim(),
        shortTitleGu: shortTitleGu.trim() || titleGu.trim(),
        description: description.trim() || 'Government education assistance initiative.',
        descriptionGu: descriptionGu.trim() || 'ગુજરાત સરકારની શૈક્ષણિક સહાય યોજના.',
        icon: icon,
        categoryTag: selectedCategory.en,
        categoryTagGu: selectedCategory.gu,
        statusLabel: 'Active on website',
        statusLabelGu: 'વેબસાઇટ પર સક્રિય',
        targetGroup: targetGroup.trim() || 'Eligible Gujarat Students',
        targetGroupGu: targetGroupGu.trim() || 'પાત્રતા ધરાવતા ગુજરાતના વિદ્યાર્થીઓ',
        benefitSummary: benefitSummary.trim() || 'Direct grant and assistance.',
        benefitSummaryGu: benefitSummaryGu.trim() || 'સીધી સરકારી સહાય.',
        eligibilityBullets: eligibilityBullets.length ? eligibilityBullets : ['Gujarat state resident student'],
        eligibilityBulletsGu: eligibilityBullets.length ? eligibilityBullets : ['ગુજરાત રાજ્યના વિદ્યાર્થી'],
        requiredDocuments: requiredDocuments.length ? requiredDocuments : ['Aadhaar Card', 'College Marksheet'],
        requiredDocumentsGu: requiredDocuments.length ? requiredDocuments : ['આધાર કાર્ડ', 'માર્કશીટ'],
        applicationWindow: applicationWindow.trim() || 'Academic Year 2026–27',
        departmentName: department,
      };

      saveStoredScheme(newScheme);
      setIsSubmitting(false);
      onSchemeAdded(newScheme);
      onClose();
    }, 600);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-charcoal/50 p-4 backdrop-blur-sm overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="add-scheme-title"
    >
      <div className="bg-warm-ivory rounded-3xl border border-warm-border p-6 max-w-2xl w-full shadow-glass-hover space-y-4 my-8 relative">
        {/* Header */}
        <div className="flex items-start justify-between gap-3 pb-3 border-b border-warm-border">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-forest-green text-warm-ivory flex items-center justify-center shrink-0">
              <PlusCircle className="w-5 h-5 text-saffron" />
            </div>
            <div>
              <h3 id="add-scheme-title" className="font-extrabold text-base sm:text-lg text-charcoal">
                {isGu ? 'નવી સરકારી કલ્યાણ યોજના ઉમેરો' : 'Add New Welfare Scheme to Website'}
              </h3>
              <p className="text-[11px] text-muted-text">
                {isGu
                  ? 'યોજના તુરંત વેબસાઇટ કેટલોગ, શોધ અને વિદ્યાર્થી પોર્ટલ પર લાઈવ થઈ જશે'
                  : 'Immediately published across homepage, search index, and student portals'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleAutofillSample}
              className="text-[11px] font-bold text-forest-green hover:underline flex items-center gap-1 bg-sage-green/60 px-2.5 py-1 rounded-pill"
              title="Autofill sample scheme"
            >
              <Sparkles className="w-3.5 h-3.5 text-saffron" />
              <span>Autofill Sample</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="p-1.5 rounded-full text-muted-text hover:text-charcoal hover:bg-sage-green/60"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Error alert */}
        {errorMsg && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-2xl text-xs text-red-800 flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {/* Top row: Code + Department */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block font-bold text-charcoal mb-1">
                Scheme Code * (e.g. VPS-TAB-05)
              </label>
              <input
                type="text"
                required
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-warm-border bg-warm-ivory text-xs font-mono font-bold text-forest-green focus:ring-2 focus:ring-forest-green/20"
              />
            </div>

            <div>
              <label className="block font-bold text-charcoal mb-1">
                Responsible Government Department *
              </label>
              <select
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-warm-border bg-warm-ivory text-xs text-charcoal focus:ring-2 focus:ring-forest-green/20"
              >
                {DEPARTMENT_OPTIONS.map((dept) => (
                  <option key={dept} value={dept}>
                    {dept}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Titles EN & GU */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block font-bold text-charcoal mb-1">
                Scheme Official Title (English) *
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Namami Saraswati Tablet Yojana"
                className="w-full px-3 py-2 rounded-xl border border-warm-border bg-warm-ivory text-xs text-charcoal focus:ring-2 focus:ring-forest-green/20"
              />
            </div>

            <div>
              <label className="block font-bold text-charcoal mb-1">
                Scheme Title (ગુજરાતી) *
              </label>
              <input
                type="text"
                required
                value={titleGu}
                onChange={(e) => setTitleGu(e.target.value)}
                placeholder="દા.ત. નમામિ સરસ્વતી ટેબ્લેટ સહાય યોજના"
                className="w-full px-3 py-2 rounded-xl border border-warm-border bg-warm-ivory text-xs font-gujarati text-charcoal focus:ring-2 focus:ring-forest-green/20"
              />
            </div>
          </div>

          {/* Short Titles */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block font-bold text-charcoal mb-1">
                Short Display Title (English)
              </label>
              <input
                type="text"
                value={shortTitle}
                onChange={(e) => setShortTitle(e.target.value)}
                placeholder="e.g. Tablet Assistance Scheme"
                className="w-full px-3 py-2 rounded-xl border border-warm-border bg-warm-ivory text-xs text-charcoal focus:ring-2 focus:ring-forest-green/20"
              />
            </div>

            <div>
              <label className="block font-bold text-charcoal mb-1">
                Short Display Title (ગુજરાતી)
              </label>
              <input
                type="text"
                value={shortTitleGu}
                onChange={(e) => setShortTitleGu(e.target.value)}
                placeholder="દા.ત. ટેબ્લેટ સહાય યોજના"
                className="w-full px-3 py-2 rounded-xl border border-warm-border bg-warm-ivory text-xs font-gujarati text-charcoal focus:ring-2 focus:ring-forest-green/20"
              />
            </div>
          </div>

          {/* Category & Icon */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block font-bold text-charcoal mb-1">
                Scheme Category *
              </label>
              <select
                value={categoryIndex}
                onChange={(e) => setCategoryIndex(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl border border-warm-border bg-warm-ivory text-xs text-charcoal focus:ring-2 focus:ring-forest-green/20"
              >
                {CATEGORY_OPTIONS.map((cat, idx) => (
                  <option key={cat.en} value={idx}>
                    {cat.en} ({cat.gu})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-bold text-charcoal mb-1">
                Card Icon Indicator *
              </label>
              <div className="flex items-center gap-2">
                {(
                  [
                    { id: 'GraduationCap', label: 'College', icon: GraduationCap },
                    { id: 'Bike', label: 'Mobility', icon: Bike },
                    { id: 'BookOpen', label: 'Books', icon: BookOpen },
                    { id: 'UsersRound', label: 'Welfare', icon: UsersRound },
                  ] as const
                ).map((ic) => {
                  const IconComp = ic.icon;
                  const isSelected = icon === ic.id;
                  return (
                    <button
                      key={ic.id}
                      type="button"
                      onClick={() => setIcon(ic.id)}
                      className={`flex-1 py-1.5 px-2 rounded-xl border flex items-center justify-center gap-1 transition-all ${
                        isSelected
                          ? 'bg-forest-green text-warm-ivory border-forest-green font-bold'
                          : 'bg-warm-ivory text-charcoal border-warm-border hover:bg-sage-green/60'
                      }`}
                    >
                      <IconComp className="w-4 h-4" />
                      <span className="text-[10px] hidden sm:inline">{ic.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Descriptions EN & GU */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block font-bold text-charcoal mb-1">
                Summary Description (English)
              </label>
              <textarea
                rows={2}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Short summary for scheme card..."
                className="w-full px-3 py-1.5 rounded-xl border border-warm-border bg-warm-ivory text-xs text-charcoal focus:ring-2 focus:ring-forest-green/20"
              />
            </div>

            <div>
              <label className="block font-bold text-charcoal mb-1">
                Summary Description (ગુજરાતી)
              </label>
              <textarea
                rows={2}
                value={descriptionGu}
                onChange={(e) => setDescriptionGu(e.target.value)}
                placeholder="યોજનાની ટૂંકી માહિતી..."
                className="w-full px-3 py-1.5 rounded-xl border border-warm-border bg-warm-ivory text-xs font-gujarati text-charcoal focus:ring-2 focus:ring-forest-green/20"
              />
            </div>
          </div>

          {/* Target Group & Benefit Summary */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block font-bold text-charcoal mb-1">
                Target Group / Beneficiaries (English)
              </label>
              <input
                type="text"
                value={targetGroup}
                onChange={(e) => setTargetGroup(e.target.value)}
                placeholder="e.g. Class 12 passed enrolling in Degree/Diploma"
                className="w-full px-3 py-2 rounded-xl border border-warm-border bg-warm-ivory text-xs text-charcoal focus:ring-2 focus:ring-forest-green/20"
              />
            </div>

            <div>
              <label className="block font-bold text-charcoal mb-1">
                Benefit Details / Amount (English)
              </label>
              <input
                type="text"
                value={benefitSummary}
                onChange={(e) => setBenefitSummary(e.target.value)}
                placeholder="e.g. ₹12,000 direct subsidy or branded tablet"
                className="w-full px-3 py-2 rounded-xl border border-warm-border bg-warm-ivory text-xs text-charcoal focus:ring-2 focus:ring-forest-green/20"
              />
            </div>
          </div>

          {/* Eligibility Bullets & Required Documents (Multiline) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block font-bold text-charcoal mb-1">
                Eligibility Criteria (1 per line)
              </label>
              <textarea
                rows={3}
                value={eligibilityText}
                onChange={(e) => setEligibilityText(e.target.value)}
                placeholder="Gujarat domicile student&#10;Income under ₹6.0 Lakh&#10;Regular attendance"
                className="w-full px-3 py-1.5 rounded-xl border border-warm-border bg-warm-ivory text-xs text-charcoal focus:ring-2 focus:ring-forest-green/20"
              />
            </div>

            <div>
              <label className="block font-bold text-charcoal mb-1">
                Required Documents (1 per line)
              </label>
              <textarea
                rows={3}
                value={documentsText}
                onChange={(e) => setDocumentsText(e.target.value)}
                placeholder="College Marksheet&#10;Income Certificate&#10;Bank Passbook"
                className="w-full px-3 py-1.5 rounded-xl border border-warm-border bg-warm-ivory text-xs text-charcoal focus:ring-2 focus:ring-forest-green/20"
              />
            </div>
          </div>

          {/* Application Window */}
          <div>
            <label className="block font-bold text-charcoal mb-1">
              Application Window / Schedule
            </label>
            <input
              type="text"
              value={applicationWindow}
              onChange={(e) => setApplicationWindow(e.target.value)}
              placeholder="e.g. Academic Year 2026–27"
              className="w-full px-3 py-2 rounded-xl border border-warm-border bg-warm-ivory text-xs text-charcoal focus:ring-2 focus:ring-forest-green/20"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-2 pt-3 border-t border-warm-border/60">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-charcoal hover:bg-sage-green/60"
            >
              {isGu ? 'રદ કરો' : 'Cancel'}
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary px-5 py-2.5 rounded-xl text-xs font-bold inline-flex items-center gap-1.5 disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-warm-ivory border-t-transparent rounded-full animate-spin" />
                  <span>{isGu ? 'પ્રકાશિત થઈ રહ્યું છે...' : 'Publishing...'}</span>
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{isGu ? 'વેબસાઇટ પર પ્રકાશિત કરો' : 'Publish Scheme on Website'}</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminAddSchemeModal;
