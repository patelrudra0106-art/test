import React, { useState } from 'react';
import {
  ArrowLeft,
  Eye,
  EyeOff,
  Lock,
  Mail,
  Phone,
  User,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Building2,
  GraduationCap,
  Sparkles,
  RefreshCw,
  Landmark,
  FileCheck,
} from 'lucide-react';
import { Language } from '../data/schemes';
import { GUJARAT_DISTRICTS, CASTE_CATEGORIES, EDUCATION_LEVELS, GOV_DEPARTMENTS } from '../data/authData';

export type SignUpRole = 'Student' | 'Institute' | 'District Officer';

interface SignUpPageProps {
  initialLanguage?: Language;
  onNavigateHome?: () => void;
  onNavigateLogin?: () => void;
}

export const SignUpPage: React.FC<SignUpPageProps> = ({
  initialLanguage = 'en',
  onNavigateHome,
  onNavigateLogin,
}) => {
  const [language, setLanguage] = useState<Language>(initialLanguage);
  const isGu = language === 'gu';

  const [activeRole, setActiveRole] = useState<SignUpRole>('Student');

  // Common fields
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [district, setDistrict] = useState(GUJARAT_DISTRICTS[0].en);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);

  // Student specific
  const [casteCategory, setCasteCategory] = useState(CASTE_CATEGORIES[0].code);
  const [educationLevel, setEducationLevel] = useState(EDUCATION_LEVELS[0].code);
  const [annualFamilyIncome, setAnnualFamilyIncome] = useState('below-2.5');

  // Institute specific
  const [institutionName, setInstitutionName] = useState('');
  const [aisheDiseCode, setAisheDiseCode] = useState('');
  const [affiliation, setAffiliation] = useState('Gujarat Technological University (GTU)');
  const [principalName, setPrincipalName] = useState('');

  // Officer specific
  const [department, setDepartment] = useState(GOV_DEPARTMENTS[0].code);
  const [employeeId, setEmployeeId] = useState('');
  const [designation, setDesignation] = useState('District Social Welfare Officer');

  // Status & feedback
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Home Navigation
  const handleHomeClick = () => {
    if (onNavigateHome) {
      onNavigateHome();
    } else {
      window.history.pushState({}, '', '/');
      window.dispatchEvent(new PopStateEvent('popstate'));
    }
  };

  // Login Navigation
  const handleLoginClick = () => {
    if (onNavigateLogin) {
      onNavigateLogin();
    } else {
      window.history.pushState({}, '', '/login');
      window.dispatchEvent(new PopStateEvent('popstate'));
    }
  };

  // Quick fill demo data
  const handleAutofill = (role: SignUpRole) => {
    setActiveRole(role);
    setErrorMsg(null);
    setSuccessMsg(null);

    if (role === 'Student') {
      setFullName('Kavya Rajeshbhai Parmar');
      setEmail('kavya.parmar@gujarat.edu');
      setPhone('9876543210');
      setDistrict('Surat');
      setCasteCategory('SEBC');
      setEducationLevel('undergraduate');
      setAnnualFamilyIncome('below-2.5');
      setPassword('P@rmar#2026!');
      setConfirmPassword('P@rmar#2026!');
      setAgreeTerms(true);
    } else if (role === 'Institute') {
      setInstitutionName('L.D. College of Engineering');
      setAisheDiseCode('AISHE-C-24891');
      setPrincipalName('Dr. Rajendrasinh Vaghela');
      setEmail('admin.office@ldce.ac.in');
      setPhone('9824012345');
      setDistrict('Ahmedabad');
      setAffiliation('Gujarat Technological University (GTU)');
      setPassword('LdceInst@2026!');
      setConfirmPassword('LdceInst@2026!');
      setAgreeTerms(true);
    } else if (role === 'District Officer') {
      setFullName('Sanjaykumar D. Mehta, GAS');
      setDepartment('sjep');
      setEmail('officer.vadodara@gujarat.gov.in');
      setEmployeeId('GOV-GJ-VAD-4821');
      setDesignation('District Social Welfare Officer (DSWO)');
      setDistrict('Vadodara');
      setPhone('9428098765');
      setPassword('GujaratGov@2026!');
      setConfirmPassword('GujaratGov@2026!');
      setAgreeTerms(true);
    }
  };

  // Password strength calculation
  const getPasswordStrength = (pwd: string) => {
    if (!pwd) return 0;
    let score = 0;
    if (pwd.length >= 8) score += 1;
    if (/[A-Z]/.test(pwd)) score += 1;
    if (/[0-9]/.test(pwd)) score += 1;
    if (/[^A-Za-z0-9]/.test(pwd)) score += 1;
    return score;
  };

  const strength = getPasswordStrength(password);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    // Basic Validation
    if (!agreeTerms) {
      setErrorMsg(isGu ? 'કૃપા કરીને નિયમો અને શરતો સ્વીકારો.' : 'Please agree to the Terms of Service and Privacy Policy.');
      return;
    }

    if (password.length < 8) {
      setErrorMsg(isGu ? 'પાસવર્ડ ઓછામાં ઓછો ૮ અક્ષરનો હોવો જોઈએ.' : 'Password must be at least 8 characters long.');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMsg(isGu ? 'પાસવર્ડ અને કન્ફર્મ પાસવર્ડ સરખા નથી.' : 'Passwords do not match.');
      return;
    }

    if (phone.replace(/\D/g, '').length !== 10) {
      setErrorMsg(isGu ? 'કૃપા કરીને માન્ય ૧૦-અંકનો મોબાઇલ નંબર દાખલ કરો.' : 'Please enter a valid 10-digit mobile number.');
      return;
    }

    setIsLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 900));

      const newUserData = {
        role: activeRole,
        fullName: activeRole === 'Institute' ? institutionName : fullName,
        email,
        phone,
        district,
        createdAt: new Date().toISOString(),
      };

      localStorage.setItem('vps_registered_user', JSON.stringify(newUserData));
      localStorage.setItem('vps_authenticated_user', JSON.stringify(newUserData));

      setSuccessMsg(
        isGu
          ? `નોંધણી સફળતાપૂર્વક પૂર્ણ થઈ ગઈ છે! (${activeRole}). લૉગિન પેજ પર જઈ રહ્યાં છીએ...`
          : `Registration successful as ${activeRole}! Redirecting to login portal...`
      );

      setTimeout(() => {
        handleLoginClick();
      }, 1600);
    } catch {
      setErrorMsg(isGu ? 'નોંધણી કરવામાં ભૂલ આવી. કૃપા કરીને ફરી પ્રયાસ કરો.' : 'Registration error. Please check your details.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-vanilla-cream flex flex-col justify-between selection:bg-forest-green selection:text-warm-ivory">
      {/* Top Header */}
      <header className="sticky top-0 z-40 bg-warm-ivory/80 backdrop-blur-md border-b border-warm-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleHomeClick}
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-charcoal hover:text-forest-green px-3 py-1.5 rounded-pill border border-warm-border bg-warm-ivory hover:bg-sage-green/60 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 text-forest-green" aria-hidden="true" />
              <span>{isGu ? 'મુખ્ય પૃષ્ઠ પર પાછા જાઓ' : 'Back to Home'}</span>
            </button>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-8 h-8 rounded-full bg-forest-green flex items-center justify-center shrink-0 shadow-sm border border-warm-ivory/25">
              <svg viewBox="0 0 32 32" fill="none" className="w-5 h-5" aria-hidden="true">
                <path d="M16 5C12.5 9.5 11 14 16 21C21 14 19.5 9.5 16 5Z" fill="#FA9231" />
                <path d="M15.2 21.2C10.2 19.5 7 15.8 6.5 11C10.8 11.8 13.8 14.8 15.2 21.2Z" fill="#E5EBDD" />
                <path d="M16.8 21.2C21.8 19.5 25 15.8 25.5 11C21.2 11.8 18.2 14.8 16.8 21.2Z" fill="#E5EBDD" />
                <circle cx="16" cy="23" r="2.5" fill="#FA9231" />
              </svg>
            </div>
            <div className="hidden sm:block">
              <span className="font-bold text-sm text-charcoal tracking-tight block">Vidya Pragati Setu</span>
              <span className="text-[11px] text-muted-text -mt-0.5 block">{isGu ? 'શિક્ષણ · તક · સશક્તિકરણ' : 'Education · Opportunity · Empowerment'}</span>
            </div>
          </div>

          {/* Language Switcher */}
          <div className="flex items-center gap-1.5 p-1 rounded-pill bg-warm-ivory border border-warm-border text-xs font-semibold">
            <button
              type="button"
              onClick={() => setLanguage('en')}
              className={`px-2.5 py-1 rounded-pill transition-colors ${
                language === 'en' ? 'bg-forest-green text-warm-ivory' : 'text-charcoal hover:bg-sage-green/60'
              }`}
            >
              EN
            </button>
            <button
              type="button"
              onClick={() => setLanguage('gu')}
              className={`px-2.5 py-1 rounded-pill font-gujarati transition-colors ${
                language === 'gu' ? 'bg-forest-green text-warm-ivory' : 'text-charcoal hover:bg-sage-green/60'
              }`}
            >
              ગુજરાતી
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-2xl">
          <div className="bg-warm-ivory rounded-3xl border border-warm-border shadow-card overflow-hidden">
            {/* Header Banner */}
            <div className="bg-gradient-to-r from-forest-green via-[#1E4A35] to-[#163828] text-warm-ivory p-6 sm:p-7 relative overflow-hidden">
              <div className="absolute right-0 top-0 translate-x-6 -translate-y-6 w-36 h-36 rounded-full bg-saffron/15 blur-2xl pointer-events-none" />
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-pill bg-warm-ivory/15 border border-warm-ivory/20 text-[11px] font-semibold text-warm-ivory tracking-wider uppercase mb-3">
                <ShieldCheck className="w-3.5 h-3.5 text-saffron" aria-hidden="true" />
                <span>{isGu ? 'સત્તાવાર પોર્ટલ નોંધણી' : 'Official Portal Registration'}</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                {isGu ? 'નવું ખાતું બનાવો' : 'Create an Account'}
              </h1>
              <p className="mt-1.5 text-xs sm:text-sm text-warm-ivory/80 leading-relaxed">
                {isGu
                  ? 'યોજનાઓમાં સીધી અરજી કરવા, દસ્તાવેજ ચકાસણી અને ડીબીટી સ્ટેટસ માટે નોંધણી કરો.'
                  : 'Register to discover matching schemes, submit applications, and track DBT disbursements.'}
              </p>
            </div>

            {/* Role Selection Tabs */}
            <div className="p-4 sm:p-6 bg-sage-green/30 border-b border-warm-border">
              <label className="block text-[11px] font-bold uppercase tracking-wider text-muted-text mb-2.5">
                {isGu ? 'આપનો ખાતાનો પ્રકાર પસંદ કરો' : 'Select Registration Role'}
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(
                  [
                    { id: 'Student', en: 'Student', gu: 'વિદ્યાર્થી', icon: GraduationCap },
                    { id: 'Institute', en: 'Institute', gu: 'શિક્ષણ સંસ્થા', icon: Building2 },
                    { id: 'District Officer', en: 'District Officer', gu: 'જિલ્લા અધિકારી', icon: Landmark },
                  ] as const
                ).map((roleItem) => {
                  const Icon = roleItem.icon;
                  const isSelected = activeRole === roleItem.id;
                  return (
                    <button
                      key={roleItem.id}
                      type="button"
                      onClick={() => {
                        setActiveRole(roleItem.id);
                        setErrorMsg(null);
                        setSuccessMsg(null);
                      }}
                      className={`flex flex-col items-center justify-center gap-1.5 py-3 px-2 rounded-2xl border text-center transition-all ${
                        isSelected
                          ? 'bg-forest-green text-warm-ivory border-forest-green shadow-sm font-bold scale-[1.02]'
                          : 'bg-warm-ivory text-charcoal border-warm-border hover:bg-sage-green/60 font-semibold'
                      }`}
                    >
                      <Icon className={`w-4 h-4 ${isSelected ? 'text-saffron' : 'text-forest-green'}`} aria-hidden="true" />
                      <span className="text-xs truncate w-full">
                        {isGu ? roleItem.gu : roleItem.en}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Demo Helper */}
              <div className="mt-3.5 flex items-center justify-between flex-wrap gap-2 pt-2 border-t border-warm-border/60 text-xs">
                <span className="text-[11px] text-muted-text flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-saffron" aria-hidden="true" />
                  <span>{isGu ? 'ઝડપી ટેસ્ટિંગ માટે:' : 'Quick demo autofill:'}</span>
                </span>
                <button
                  type="button"
                  onClick={() => handleAutofill(activeRole)}
                  className="inline-flex items-center gap-1 text-[11px] font-semibold text-forest-green hover:underline decoration-forest-green/50"
                >
                  <RefreshCw className="w-3 h-3" aria-hidden="true" />
                  <span>{isGu ? `ડેમો ${activeRole} વિગતો ભરો` : `Autofill ${activeRole}`}</span>
                </button>
              </div>
            </div>

            {/* Form */}
            <div className="p-6 sm:p-7">
              {/* Feedback messages */}
              {errorMsg && (
                <div className="mb-5 rounded-2xl border border-red-200 bg-red-50 p-3.5 flex items-start gap-2.5 text-red-800 text-xs sm:text-sm">
                  <AlertCircle className="w-4 h-4 text-red-600 mt-0.5 shrink-0" aria-hidden="true" />
                  <p className="leading-snug">{errorMsg}</p>
                </div>
              )}

              {successMsg && (
                <div className="mb-5 rounded-2xl border border-emerald-200 bg-emerald-50 p-3.5 flex items-start gap-2.5 text-emerald-800 text-xs sm:text-sm">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" aria-hidden="true" />
                  <p className="leading-snug font-medium">{successMsg}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* ROLE: STUDENT */}
                {activeRole === 'Student' && (
                  <>
                    <div>
                      <label className="block text-xs font-bold text-charcoal mb-1.5">
                        {isGu ? 'વિદ્યાર્થીનું પૂરું નામ (આધાર / માર્કશીટ મુજબ)' : 'Full Name (as per Aadhaar / Marksheet)'}
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-muted-text">
                          <User className="w-4 h-4" aria-hidden="true" />
                        </div>
                        <input
                          type="text"
                          required
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          placeholder="e.g. Kavya Rajeshbhai Parmar"
                          className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-warm-border bg-warm-ivory text-sm text-charcoal focus:ring-2 focus:ring-forest-green/20 focus:border-forest-green"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      <div>
                        <label className="block text-xs font-bold text-charcoal mb-1.5">
                          {isGu ? 'ઇમેઇલ એડ્રેસ' : 'Email Address'}
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-muted-text">
                            <Mail className="w-4 h-4" aria-hidden="true" />
                          </div>
                          <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="student@gujarat.edu"
                            className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-warm-border bg-warm-ivory text-sm text-charcoal focus:ring-2 focus:ring-forest-green/20 focus:border-forest-green"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-charcoal mb-1.5">
                          {isGu ? 'મોબાઇલ નંબર (+91)' : 'Mobile Number (+91)'}
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-muted-text">
                            <Phone className="w-4 h-4" aria-hidden="true" />
                          </div>
                          <input
                            type="tel"
                            maxLength={10}
                            required
                            value={phone}
                            onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                            placeholder="9876543210"
                            className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-warm-border bg-warm-ivory text-sm text-charcoal focus:ring-2 focus:ring-forest-green/20 focus:border-forest-green"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      <div>
                        <label className="block text-xs font-bold text-charcoal mb-1.5">
                          {isGu ? 'સામાજિક અનામત વર્ગ' : 'Social Category'}
                        </label>
                        <select
                          value={casteCategory}
                          onChange={(e) => setCasteCategory(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-2xl border border-warm-border bg-warm-ivory text-xs sm:text-sm text-charcoal focus:ring-2 focus:ring-forest-green/20 focus:border-forest-green"
                        >
                          {CASTE_CATEGORIES.map((c) => (
                            <option key={c.code} value={c.code}>
                              {isGu ? c.gu : c.en}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-charcoal mb-1.5">
                          {isGu ? 'ગુજરાત જિલ્લો' : 'Home District (Gujarat)'}
                        </label>
                        <div className="relative">
                          <select
                            value={district}
                            onChange={(e) => setDistrict(e.target.value)}
                            className="w-full px-3.5 py-2.5 rounded-2xl border border-warm-border bg-warm-ivory text-xs sm:text-sm text-charcoal focus:ring-2 focus:ring-forest-green/20 focus:border-forest-green"
                          >
                            {GUJARAT_DISTRICTS.map((d) => (
                              <option key={d.en} value={d.en}>
                                {isGu ? d.gu : d.en}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      <div>
                        <label className="block text-xs font-bold text-charcoal mb-1.5">
                          {isGu ? 'હાલનું શિક્ષણ સ્તર' : 'Current Education Level'}
                        </label>
                        <select
                          value={educationLevel}
                          onChange={(e) => setEducationLevel(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-2xl border border-warm-border bg-warm-ivory text-xs sm:text-sm text-charcoal focus:ring-2 focus:ring-forest-green/20 focus:border-forest-green"
                        >
                          {EDUCATION_LEVELS.map((ed) => (
                            <option key={ed.code} value={ed.code}>
                              {isGu ? ed.gu : ed.en}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-charcoal mb-1.5">
                          {isGu ? 'વાર્ષિક કૌટુંબિક આવક' : 'Annual Household Income'}
                        </label>
                        <select
                          value={annualFamilyIncome}
                          onChange={(e) => setAnnualFamilyIncome(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-2xl border border-warm-border bg-warm-ivory text-xs sm:text-sm text-charcoal focus:ring-2 focus:ring-forest-green/20 focus:border-forest-green"
                        >
                          <option value="below-2.5">{isGu ? '₹ ૨.૫ લાખથી ઓછી (Below ₹2.5 Lakh)' : 'Below ₹2.5 Lakh / year'}</option>
                          <option value="2.5-to-6">{isGu ? '₹ ૨.૫ લાખથી ₹ ૬.૦ લાખ' : '₹2.5 Lakh to ₹6.0 Lakh'}</option>
                          <option value="above-6">{isGu ? '₹ ૬.૦ લાખથી વધુ' : 'Above ₹6.0 Lakh / year'}</option>
                        </select>
                      </div>
                    </div>
                  </>
                )}

                {/* ROLE: INSTITUTE */}
                {activeRole === 'Institute' && (
                  <>
                    <div>
                      <label className="block text-xs font-bold text-charcoal mb-1.5">
                        {isGu ? 'શિક્ષણ સંસ્થાનું સત્તાવાર નામ' : 'Institution Official Name'}
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-muted-text">
                          <Building2 className="w-4 h-4" aria-hidden="true" />
                        </div>
                        <input
                          type="text"
                          required
                          value={institutionName}
                          onChange={(e) => setInstitutionName(e.target.value)}
                          placeholder="e.g. L.D. College of Engineering"
                          className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-warm-border bg-warm-ivory text-sm text-charcoal focus:ring-2 focus:ring-forest-green/20 focus:border-forest-green"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      <div>
                        <label className="block text-xs font-bold text-charcoal mb-1.5">
                          {isGu ? 'AISHE / DISE કોડ' : 'AISHE / DISE Code'}
                        </label>
                        <input
                          type="text"
                          required
                          value={aisheDiseCode}
                          onChange={(e) => setAisheDiseCode(e.target.value)}
                          placeholder="AISHE-C-24891"
                          className="w-full px-3.5 py-2.5 rounded-2xl border border-warm-border bg-warm-ivory text-sm text-charcoal focus:ring-2 focus:ring-forest-green/20 focus:border-forest-green"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-charcoal mb-1.5">
                          {isGu ? 'જોડાણ ધરાવતી યુનિવર્સિટી / બોર્ડ' : 'Affiliation University / Board'}
                        </label>
                        <input
                          type="text"
                          required
                          value={affiliation}
                          onChange={(e) => setAffiliation(e.target.value)}
                          placeholder="GTU / Gujarat University / GSEB"
                          className="w-full px-3.5 py-2.5 rounded-2xl border border-warm-border bg-warm-ivory text-sm text-charcoal focus:ring-2 focus:ring-forest-green/20 focus:border-forest-green"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      <div>
                        <label className="block text-xs font-bold text-charcoal mb-1.5">
                          {isGu ? 'આચાર્ય / નોડલ અધિકારીનું નામ' : 'Principal / Nodal Officer Name'}
                        </label>
                        <input
                          type="text"
                          required
                          value={principalName}
                          onChange={(e) => setPrincipalName(e.target.value)}
                          placeholder="Dr. Rajendrasinh Vaghela"
                          className="w-full px-3.5 py-2.5 rounded-2xl border border-warm-border bg-warm-ivory text-sm text-charcoal focus:ring-2 focus:ring-forest-green/20 focus:border-forest-green"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-charcoal mb-1.5">
                          {isGu ? 'જિલ્લો' : 'District'}
                        </label>
                        <select
                          value={district}
                          onChange={(e) => setDistrict(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-2xl border border-warm-border bg-warm-ivory text-sm text-charcoal focus:ring-2 focus:ring-forest-green/20 focus:border-forest-green"
                        >
                          {GUJARAT_DISTRICTS.map((d) => (
                            <option key={d.en} value={d.en}>
                              {isGu ? d.gu : d.en}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      <div>
                        <label className="block text-xs font-bold text-charcoal mb-1.5">
                          {isGu ? 'સંસ્થાનું સત્તાવાર ઇમેઇલ' : 'Official Institute Email'}
                        </label>
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="admin.office@ldce.ac.in"
                          className="w-full px-3.5 py-2.5 rounded-2xl border border-warm-border bg-warm-ivory text-sm text-charcoal focus:ring-2 focus:ring-forest-green/20 focus:border-forest-green"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-charcoal mb-1.5">
                          {isGu ? 'સંપર્ક નંબર' : 'Official Contact Number'}
                        </label>
                        <input
                          type="tel"
                          maxLength={10}
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                          placeholder="9824012345"
                          className="w-full px-3.5 py-2.5 rounded-2xl border border-warm-border bg-warm-ivory text-sm text-charcoal focus:ring-2 focus:ring-forest-green/20 focus:border-forest-green"
                        />
                      </div>
                    </div>
                  </>
                )}

                {/* ROLE: DISTRICT OFFICER */}
                {activeRole === 'District Officer' && (
                  <>
                    <div>
                      <label className="block text-xs font-bold text-charcoal mb-1.5">
                        {isGu ? 'અધિકારીનું પૂરું નામ' : 'Officer Full Name'}
                      </label>
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Sanjaykumar D. Mehta, GAS"
                        className="w-full px-3.5 py-2.5 rounded-2xl border border-warm-border bg-warm-ivory text-sm text-charcoal focus:ring-2 focus:ring-forest-green/20 focus:border-forest-green"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      <div>
                        <label className="block text-xs font-bold text-charcoal mb-1.5">
                          {isGu ? 'સરકારી વિભાગ' : 'Government Department'}
                        </label>
                        <select
                          value={department}
                          onChange={(e) => setDepartment(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-2xl border border-warm-border bg-warm-ivory text-xs sm:text-sm text-charcoal focus:ring-2 focus:ring-forest-green/20 focus:border-forest-green"
                        >
                          {GOV_DEPARTMENTS.map((dept) => (
                            <option key={dept.code} value={dept.code}>
                              {isGu ? dept.gu : dept.en}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-charcoal mb-1.5">
                          {isGu ? 'અધિકારક્ષેત્ર જિલ્લો' : 'Jurisdiction District'}
                        </label>
                        <select
                          value={district}
                          onChange={(e) => setDistrict(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-2xl border border-warm-border bg-warm-ivory text-sm text-charcoal focus:ring-2 focus:ring-forest-green/20 focus:border-forest-green"
                        >
                          {GUJARAT_DISTRICTS.map((d) => (
                            <option key={d.en} value={d.en}>
                              {isGu ? d.gu : d.en}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      <div>
                        <label className="block text-xs font-bold text-charcoal mb-1.5">
                          {isGu ? 'સરકારી ઇમેઇલ (@gujarat.gov.in)' : 'Official Email (@gujarat.gov.in)'}
                        </label>
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="officer.surat@gujarat.gov.in"
                          className="w-full px-3.5 py-2.5 rounded-2xl border border-warm-border bg-warm-ivory text-sm text-charcoal focus:ring-2 focus:ring-forest-green/20 focus:border-forest-green"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-charcoal mb-1.5">
                          {isGu ? 'કર્મચારી ક્રમાંક (Gov Employee ID)' : 'Government Employee ID'}
                        </label>
                        <input
                          type="text"
                          required
                          value={employeeId}
                          onChange={(e) => setEmployeeId(e.target.value)}
                          placeholder="GOV-GJ-SUR-4821"
                          className="w-full px-3.5 py-2.5 rounded-2xl border border-warm-border bg-warm-ivory text-sm text-charcoal focus:ring-2 focus:ring-forest-green/20 focus:border-forest-green"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-charcoal mb-1.5">
                        {isGu ? 'હોદ્દો / પદનામ (Designation)' : 'Designation / Post'}
                      </label>
                      <input
                        type="text"
                        required
                        value={designation}
                        onChange={(e) => setDesignation(e.target.value)}
                        placeholder="District Social Welfare Officer (DSWO)"
                        className="w-full px-3.5 py-2.5 rounded-2xl border border-warm-border bg-warm-ivory text-sm text-charcoal focus:ring-2 focus:ring-forest-green/20 focus:border-forest-green"
                      />
                    </div>
                  </>
                )}

                {/* PASSWORDS */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                  <div>
                    <label className="block text-xs font-bold text-charcoal mb-1.5">
                      {isGu ? 'પાસવર્ડ બનાવો' : 'Create Password'}
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-muted-text">
                        <Lock className="w-4 h-4" aria-hidden="true" />
                      </div>
                      <input
                        type={showPassword ? 'text' : 'password'}
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••••••"
                        className="w-full pl-10 pr-10 py-2.5 rounded-2xl border border-warm-border bg-warm-ivory text-sm text-charcoal focus:ring-2 focus:ring-forest-green/20 focus:border-forest-green"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-muted-text hover:text-charcoal"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-charcoal mb-1.5">
                      {isGu ? 'પાસવર્ડ કન્ફર્મ કરો' : 'Confirm Password'}
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-muted-text">
                        <Lock className="w-4 h-4" aria-hidden="true" />
                      </div>
                      <input
                        type={showPassword ? 'text' : 'password'}
                        required
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="••••••••••••"
                        className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-warm-border bg-warm-ivory text-sm text-charcoal focus:ring-2 focus:ring-forest-green/20 focus:border-forest-green"
                      />
                    </div>
                  </div>
                </div>

                {/* Password Strength Indicator */}
                {password && (
                  <div className="pt-1">
                    <div className="flex items-center justify-between text-[11px] mb-1 text-muted-text">
                      <span>{isGu ? 'પાસવર્ડ મજબૂતી:' : 'Password strength:'}</span>
                      <span className="font-bold">
                        {strength <= 1 ? (
                          <span className="text-red-600">{isGu ? 'નબળો (Weak)' : 'Weak'}</span>
                        ) : strength <= 3 ? (
                          <span className="text-amber-600">{isGu ? 'મધ્યમ (Moderate)' : 'Moderate'}</span>
                        ) : (
                          <span className="text-emerald-600">{isGu ? 'મજબૂત (Strong)' : 'Strong'}</span>
                        )}
                      </span>
                    </div>
                    <div className="w-full h-1.5 bg-warm-border/50 rounded-full overflow-hidden flex gap-1">
                      <div className={`h-full flex-1 rounded-full ${strength >= 1 ? 'bg-red-500' : 'bg-transparent'}`} />
                      <div className={`h-full flex-1 rounded-full ${strength >= 2 ? 'bg-amber-500' : 'bg-transparent'}`} />
                      <div className={`h-full flex-1 rounded-full ${strength >= 3 ? 'bg-emerald-500' : 'bg-transparent'}`} />
                      <div className={`h-full flex-1 rounded-full ${strength >= 4 ? 'bg-forest-green' : 'bg-transparent'}`} />
                    </div>
                  </div>
                )}

                {/* Terms and DPDP consent */}
                <div className="pt-2">
                  <label className="flex items-start gap-2.5 cursor-pointer">
                    <input
                      type="checkbox"
                      required
                      checked={agreeTerms}
                      onChange={(e) => setAgreeTerms(e.target.checked)}
                      className="mt-0.5 w-4 h-4 rounded text-forest-green focus:ring-forest-green border-warm-border shrink-0"
                    />
                    <span className="text-xs text-charcoal leading-relaxed">
                      {isGu ? (
                        <>
                          હું Vidya Pragati Setu ની{' '}
                          <a href="/terms-and-conditions" className="font-bold text-forest-green underline">
                            નિયમો અને શરતો
                          </a>{' '}
                          અને{' '}
                          <a href="/privacy-policy" className="font-bold text-forest-green underline">
                            ગોપનીયતા નીતિ (DPDP Act)
                          </a>{' '}
                          સાથે સંમત છું.
                        </>
                      ) : (
                        <>
                          I agree to the{' '}
                          <a href="/terms-and-conditions" className="font-bold text-forest-green underline">
                            Terms of Service
                          </a>{' '}
                          and{' '}
                          <a href="/privacy-policy" className="font-bold text-forest-green underline">
                            Privacy Policy (DPDP Act 2025)
                          </a>
                          .
                        </>
                      )}
                    </span>
                  </label>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full btn-primary py-3 rounded-2xl text-sm font-bold flex items-center justify-center gap-2 mt-5 cursor-pointer"
                >
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-warm-ivory border-t-transparent rounded-full animate-spin" />
                      <span>{isGu ? 'ખાતું બની રહ્યું છે...' : 'Creating your account...'}</span>
                    </>
                  ) : (
                    <>
                      <FileCheck className="w-4 h-4" aria-hidden="true" />
                      <span>{isGu ? 'નોંધણી પૂર્ણ કરો (Sign Up)' : 'Complete Registration (Sign Up)'}</span>
                    </>
                  )}
                </button>
              </form>

              {/* Already registered */}
              <div className="mt-6 pt-5 border-t border-warm-border/70 text-center">
                <p className="text-xs sm:text-sm text-charcoal">
                  {isGu ? 'પહેલાથી નોંધાયેલા છો? ' : 'Already have an account? '}
                  <button
                    type="button"
                    onClick={handleLoginClick}
                    className="font-bold text-forest-green hover:underline decoration-forest-green decoration-2 underline-offset-2 ml-1"
                  >
                    {isGu ? 'પોર્ટલમાં પ્રવેશ કરો (Sign In)' : 'Sign In to Portal'}
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Minimal Footer */}
      <footer className="border-t border-warm-border bg-warm-ivory/60 py-3 text-center text-xs text-muted-text">
        <div className="mx-auto max-w-7xl px-4 flex flex-col sm:flex-row items-center justify-between gap-1">
          <span>{isGu ? 'ગુજરાતના વિદ્યાર્થીઓ માટે તૈયાર કરેલ' : 'Crafted for Gujarat students & institutions'}</span>
          <span>© {new Date().getFullYear()} Vidya Pragati Setu</span>
        </div>
      </footer>
    </div>
  );
};

export default SignUpPage;
