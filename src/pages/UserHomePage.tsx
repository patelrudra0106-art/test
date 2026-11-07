import React, { useState, useEffect } from 'react';
import {
  GraduationCap,
  ArrowLeft,
  LogOut,
  FileText,
  CheckCircle2,
  Landmark,
  ShieldCheck,
  CreditCard,
  PlusCircle,
  Award,
  ChevronRight,
  Sparkles,
  PhoneCall,
  Bell,
  BookOpen,
  MapPin,
  Calendar,
  AlertCircle,
  FileCheck,
  Upload,
  X,
} from 'lucide-react';
import { Language, SchemeItem, getStoredSchemes } from '../data/schemes';
import { PortalApplication, getStoredApplications, saveStoredApplications } from '../data/portalData';
import { StudentDocument, getStoredDocuments } from '../data/documentData';
import { DocumentUploadModal } from '../components/DocumentUploadModal';

interface UserHomePageProps {
  initialLanguage?: Language;
  onNavigateHome?: () => void;
  onNavigateDashboard?: () => void;
  onSignOut?: () => void;
}

export const UserHomePage: React.FC<UserHomePageProps> = ({
  initialLanguage = 'en',
  onNavigateHome,
  onNavigateDashboard,
  onSignOut,
}) => {
  const [language, setLanguage] = useState<Language>(initialLanguage);
  const isGu = language === 'gu';

  const [applications, setApplications] = useState<PortalApplication[]>([]);
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [selectedScheme, setSelectedScheme] = useState<SchemeItem | null>(null);
  const [showReceiptModal, setShowReceiptModal] = useState(false);
  const [applyCourse, setApplyCourse] = useState('B.E. Computer Engineering (Sem 5)');
  const [applyIncome, setApplyIncome] = useState('180000');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Dynamic schemes & documents
  const [schemes, setSchemes] = useState<SchemeItem[]>(() => getStoredSchemes());
  const [documents, setDocuments] = useState<StudentDocument[]>(() => getStoredDocuments());
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [previewDoc, setPreviewDoc] = useState<StudentDocument | null>(null);

  useEffect(() => {
    const all = getStoredApplications();
    setApplications(all.filter((a) => a.studentId === 'user-student-priya' || a.studentId.includes('priya')));

    const handleDocsUpdate = () => setDocuments(getStoredDocuments());
    const handleSchemesUpdate = () => setSchemes(getStoredSchemes());

    window.addEventListener('vps_documents_updated', handleDocsUpdate);
    window.addEventListener('vps_schemes_updated', handleSchemesUpdate);

    return () => {
      window.removeEventListener('vps_documents_updated', handleDocsUpdate);
      window.removeEventListener('vps_schemes_updated', handleSchemesUpdate);
    };
  }, []);

  const activeApp = applications[0] || null;

  const handleApplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedScheme) return;

    const all = getStoredApplications();
    const newApp: PortalApplication = {
      id: `app-${Date.now()}`,
      applicationNumber: `VPS-2026-${selectedScheme.code.replace('VPS-', '')}-${Math.floor(1000 + Math.random() * 9000)}`,
      studentId: 'user-student-priya',
      studentName: 'Priya Rajeshbhai Patel',
      studentCategory: 'SEBC',
      schemeId: selectedScheme.id,
      schemeTitleEn: selectedScheme.title,
      schemeTitleGu: selectedScheme.titleGu,
      instituteId: 'user-inst-gecs',
      instituteName: 'Government Engineering College, Surat',
      district: 'Surat',
      courseName: applyCourse,
      grantAmountInr: 50000,
      status: 'Submitted',
      academicYear: '2026-27',
      submittedAt: new Date().toISOString(),
      bankAccountMasked: '••••••••4829',
      bankIfsc: 'SBIN0001234',
    };

    const updated = [newApp, ...all];
    saveStoredApplications(updated);
    setApplications(updated.filter((a) => a.studentId === 'user-student-priya'));
    setShowApplyModal(false);
    setToastMessage(isGu ? 'અરજી સફળતાપૂર્વક સબમિટ થઈ ગઈ છે!' : 'Application successfully submitted!');
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleHomeClick = () => {
    if (onNavigateHome) onNavigateHome();
    else {
      window.history.pushState({}, '', '/');
      window.dispatchEvent(new PopStateEvent('popstate'));
    }
  };

  const handleDashboardClick = () => {
    if (onNavigateDashboard) onNavigateDashboard();
    else {
      window.history.pushState({}, '', '/dashboard/student');
      window.dispatchEvent(new PopStateEvent('popstate'));
    }
  };

  const handleSignOutClick = () => {
    localStorage.removeItem('vps_authenticated_user');
    if (onSignOut) onSignOut();
    else {
      window.history.pushState({}, '', '/login');
      window.dispatchEvent(new PopStateEvent('popstate'));
    }
  };

  return (
    <div className="min-h-screen bg-vanilla-cream flex flex-col justify-between selection:bg-forest-green selection:text-warm-ivory">
      {/* Toast Feedback */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 bg-forest-green text-warm-ivory px-5 py-3 rounded-2xl shadow-glass-hover flex items-center gap-2.5 text-xs sm:text-sm font-semibold">
          <CheckCircle2 className="w-4 h-4 text-saffron shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Navbar */}
      <header className="sticky top-0 z-40 bg-warm-ivory/85 backdrop-blur-md border-b border-warm-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={handleHomeClick}
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-charcoal hover:text-forest-green px-3 py-1.5 rounded-pill border border-warm-border bg-warm-ivory hover:bg-sage-green/60 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 text-forest-green" />
              <span>{isGu ? 'મુખ્ય પોર્ટલ' : 'Public Portal'}</span>
            </button>
            <div className="hidden sm:flex items-center gap-2 pl-2 border-l border-warm-border">
              <span className="font-bold text-sm text-charcoal">Vidya Pragati Setu</span>
              <span className="px-2 py-0.5 rounded-pill bg-sage-green/70 text-[10px] font-bold text-forest-green uppercase">
                {isGu ? 'વિદ્યાર્થી હોમ પેજ' : 'Student Home'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={handleDashboardClick}
              className="btn-secondary px-3.5 py-1.5 rounded-pill text-xs font-bold inline-flex items-center gap-1.5"
            >
              <FileCheck className="w-3.5 h-3.5 text-forest-green" />
              <span>{isGu ? 'મારું ડેશબોર્ડ' : 'My Dashboard'}</span>
            </button>

            {/* Language Switcher */}
            <div className="flex items-center gap-1 p-0.5 rounded-pill bg-warm-ivory border border-warm-border text-xs font-semibold">
              <button
                type="button"
                onClick={() => setLanguage('en')}
                className={`px-2 py-1 rounded-pill ${language === 'en' ? 'bg-forest-green text-warm-ivory' : 'text-charcoal'}`}
              >
                EN
              </button>
              <button
                type="button"
                onClick={() => setLanguage('gu')}
                className={`px-2 py-1 rounded-pill font-gujarati ${language === 'gu' ? 'bg-forest-green text-warm-ivory' : 'text-charcoal'}`}
              >
                ગુજરાતી
              </button>
            </div>

            <button
              type="button"
              onClick={handleSignOutClick}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-red-700 hover:text-red-800 bg-red-50 hover:bg-red-100/70 border border-red-200 px-3 py-1.5 rounded-pill transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{isGu ? 'બહાર નીકળો' : 'Sign Out'}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Home Content */}
      <main className="flex-1 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6">
        {/* Personalized Welcome Banner */}
        <section className="bg-gradient-to-r from-forest-green via-[#1E4A35] to-[#163828] text-warm-ivory rounded-3xl p-6 sm:p-8 shadow-card relative overflow-hidden">
          <div className="absolute right-0 top-0 translate-x-12 -translate-y-12 w-72 h-72 rounded-full bg-saffron/15 blur-3xl pointer-events-none" />
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-warm-ivory/15 border border-warm-ivory/25 flex items-center justify-center shrink-0 shadow-inner">
                <GraduationCap className="w-8 h-8 text-saffron" />
              </div>
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-pill bg-warm-ivory/15 border border-warm-ivory/20 text-[11px] font-semibold text-warm-ivory tracking-wider uppercase mb-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-saffron" />
                  <span>{isGu ? 'વિદ્યાર્થી સ્વાગત પેનલ' : 'Student Welfare Portal'}</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                  {isGu ? 'નમસ્તે, પ્રિયા રાજેશભાઈ પટેલ!' : 'Namaste, Priya Rajeshbhai Patel!'}
                </h1>
                <p className="mt-1 text-xs sm:text-sm text-warm-ivory/80 leading-relaxed max-w-2xl">
                  {isGu
                    ? 'ગુજરાત સરકારની શિષ્યવૃત્તિ, સાધન સહાય અને ડીબીટી ચુકવણી સ્થિતિ તપાસવા માટે આપનું સ્વાગત છે.'
                    : 'Your personalized home for government scholarships, education mobility assistance, and direct bank disbursement tracking.'}
                </p>

                {/* Identity & Institutional Tags */}
                <div className="mt-4 flex items-center gap-2 flex-wrap text-xs">
                  <span className="px-3 py-1 rounded-pill bg-warm-ivory/20 border border-warm-ivory/30 font-semibold flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-saffron" />
                    <span>Surat District</span>
                  </span>
                  <span className="px-3 py-1 rounded-pill bg-warm-ivory/20 border border-warm-ivory/30 font-semibold flex items-center gap-1">
                    <BookOpen className="w-3 h-3 text-saffron" />
                    <span>SEBC / OBC Category</span>
                  </span>
                  <span className="px-3 py-1 rounded-pill bg-warm-ivory/20 border border-warm-ivory/30 font-semibold flex items-center gap-1">
                    <GraduationCap className="w-3 h-3 text-saffron" />
                    <span>GEC Surat (B.E. Computer Engineering)</span>
                  </span>
                  <span className="px-3 py-1 rounded-pill bg-emerald-500/25 border border-emerald-400/40 text-emerald-200 font-semibold flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3" />
                    <span>Aadhaar PFMS DBT Active</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Action Button */}
            <div className="flex flex-col sm:flex-row gap-2.5 shrink-0 self-start md:self-center">
              <button
                type="button"
                onClick={() => {
                  if (schemes.length > 0) {
                    setSelectedScheme(schemes[0]);
                    setShowApplyModal(true);
                  }
                }}
                className="btn-secondary px-5 py-2.5 rounded-pill text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-sm cursor-pointer"
              >
                <PlusCircle className="w-4 h-4 text-forest-green" />
                <span>{isGu ? 'નવી યોજના માટે અરજી કરો' : 'Apply for New Scheme'}</span>
              </button>
            </div>
          </div>
        </section>

        {/* 4 Quick Stat Summary Cards */}
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
          <div className="bg-warm-ivory p-4 sm:p-5 rounded-3xl border border-warm-border shadow-card flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-sage-green/60 text-forest-green flex items-center justify-center shrink-0">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-muted-text">
                {isGu ? 'સક્રિય અરજીઓ' : 'Active Applications'}
              </span>
              <p className="text-xl font-extrabold text-charcoal">{applications.length}</p>
            </div>
          </div>

          <div className="bg-warm-ivory p-4 sm:p-5 rounded-3xl border border-warm-border shadow-card flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
              <CreditCard className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-muted-text">
                {isGu ? 'જમા થયેલ સહાય (DBT)' : 'DBT Funds Disbursed'}
              </span>
              <p className="text-xl font-extrabold text-forest-green">₹ 50,000</p>
            </div>
          </div>

          <div className="bg-warm-ivory p-4 sm:p-5 rounded-3xl border border-warm-border shadow-card flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-blue-100 text-blue-800 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-muted-text">
                {isGu ? 'ચકાસાયેલ દસ્તાવેજ' : 'Verified Documents'}
              </span>
              <p className="text-xl font-extrabold text-blue-900">{documents.length} / {documents.length} Ready</p>
            </div>
          </div>

          <div className="bg-warm-ivory p-4 sm:p-5 rounded-3xl border border-warm-border shadow-card flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-muted-text">
                {isGu ? 'પાત્ર સરકારી યોજનાઓ' : 'Matched Schemes'}
              </span>
              <p className="text-xl font-extrabold text-amber-900">3 Eligible</p>
            </div>
          </div>
        </section>

        {/* Live Active Scholarship Status Progress Card */}
        {activeApp && (
          <section className="bg-warm-ivory rounded-3xl border border-warm-border shadow-card p-5 sm:p-7 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-warm-border/70">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-forest-green font-mono">
                  {activeApp.applicationNumber} · Academic Year {activeApp.academicYear}
                </span>
                <h2 className="text-lg sm:text-xl font-extrabold text-charcoal mt-0.5">
                  {isGu ? activeApp.schemeTitleGu : activeApp.schemeTitleEn}
                </h2>
                <p className="text-xs text-muted-text mt-0.5">
                  {activeApp.instituteName} · {activeApp.courseName}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="px-3.5 py-1 rounded-pill text-xs font-extrabold bg-emerald-100 text-emerald-900 border border-emerald-300 inline-flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
                  <span>PFMS DBT Disbursed (₹50,000)</span>
                </span>
                <button
                  type="button"
                  onClick={() => setShowReceiptModal(true)}
                  className="btn-secondary px-3 py-1 rounded-pill text-xs font-semibold"
                >
                  {isGu ? 'રસીદ જુઓ' : 'View Receipt'}
                </button>
              </div>
            </div>

            {/* Stepper */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-muted-text mb-3">
                {isGu ? 'જીવંત અરજી સ્થિતિ ટ્રેકર (Real-Time Stepper)' : 'Live Pipeline Tracking'}
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs">
                  <div className="flex items-center gap-1.5 text-emerald-800 font-bold mb-1">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>1. {isGu ? 'અરજી સબમિટ' : 'Submitted'}</span>
                  </div>
                  <p className="text-[11px] text-emerald-700">02 Sep 2026</p>
                </div>

                <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs">
                  <div className="flex items-center gap-1.5 text-emerald-800 font-bold mb-1">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>2. {isGu ? 'સંસ્થા ચકાસણી' : 'Institute Endorsed'}</span>
                  </div>
                  <p className="text-[11px] text-emerald-700">GEC Surat (12 Sep 2026)</p>
                </div>

                <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs">
                  <div className="flex items-center gap-1.5 text-emerald-800 font-bold mb-1">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>3. {isGu ? 'અધિકારી મંજૂરી' : 'Officer Sanctioned'}</span>
                  </div>
                  <p className="text-[11px] text-emerald-700">Surat DSWO (18 Sep 2026)</p>
                </div>

                <div className="p-3 rounded-2xl bg-emerald-100 border border-emerald-300 text-xs font-bold text-emerald-950 shadow-sm">
                  <div className="flex items-center gap-1.5 text-forest-green mb-1">
                    <Landmark className="w-4 h-4 shrink-0" />
                    <span>4. {isGu ? 'PFMS ડીબીટી જમા' : 'PFMS Disbursed'}</span>
                  </div>
                  <p className="text-[11px] text-forest-green font-mono">TXN-849201 · ₹50,000</p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Personalized Matched Schemes For You */}
        <section className="space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div>
              <div className="inline-flex items-center gap-1 text-[11px] font-bold text-forest-green uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-saffron" />
                <span>{isGu ? 'તમારી પ્રોફાઇલ મુજબ ભલામણ કરેલ' : 'Matched For Your Profile'}</span>
              </div>
              <h2 className="text-xl font-extrabold text-charcoal">
                {isGu ? 'આપના માટે ઉપલબ્ધ સરકારી યોજનાઓ' : 'Recommended Schemes for Priya'}
              </h2>
            </div>
            <span className="text-xs text-muted-text">
              Filtered for: <strong className="text-charcoal">SEBC Category · Surat · Higher Education</strong>
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {schemes.slice(0, 3).map((scheme, idx) => (
              <div
                key={scheme.id}
                className="bg-warm-ivory rounded-3xl border border-warm-border shadow-card p-5 flex flex-col justify-between hover:border-forest-green/50 transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="px-2.5 py-0.5 rounded-pill bg-sage-green/70 text-[10px] font-bold text-forest-green uppercase">
                      {isGu ? scheme.categoryTagGu : scheme.categoryTag}
                    </span>
                    <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-pill">
                      100% Match
                    </span>
                  </div>

                  <h3 className="font-extrabold text-base text-charcoal mt-1">
                    {isGu ? scheme.titleGu : scheme.title}
                  </h3>
                  <p className="text-xs text-muted-text mt-1 line-clamp-2">
                    {isGu ? scheme.descriptionGu : scheme.description}
                  </p>

                  <div className="mt-3 p-2.5 rounded-xl bg-sage-green/30 text-xs">
                    <span className="font-bold text-forest-green">{isGu ? 'સહાય:' : 'Grant:'} </span>
                    <span className="text-charcoal">{isGu ? scheme.benefitSummaryGu : scheme.benefitSummary}</span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-warm-border/60 flex items-center justify-between">
                  <span className="text-[11px] text-muted-text font-mono">{scheme.code}</span>
                  {idx === 0 ? (
                    <span className="px-3 py-1 rounded-pill bg-emerald-100 text-emerald-900 text-xs font-bold">
                      Already Applied
                    </span>
                  ) : (
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedScheme(scheme);
                        setShowApplyModal(true);
                      }}
                      className="btn-primary px-3.5 py-1.5 rounded-pill text-xs font-semibold cursor-pointer"
                    >
                      {isGu ? 'અરજી કરો' : 'Apply Now'}
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Quick Tools & Support Strip */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-warm-ivory p-5 rounded-3xl border border-warm-border shadow-card flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-2xl bg-forest-green text-warm-ivory flex items-center justify-center shrink-0">
              <FileCheck className="w-5 h-5 text-saffron" />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-bold text-sm text-charcoal">{isGu ? 'દસ્તાવેજ ચકાસણી વૉલ્ટ' : 'Document Vault'}</h4>
              <p className="text-xs text-muted-text mt-0.5 leading-relaxed">
                {documents.length} {isGu ? 'દસ્તાવેજ અપલોડ કરેલ અને ડિજિટલ ગુજરાત દ્વારા ચકાસાયેલ.' : 'documents uploaded and verified with Digital Gujarat records.'}
              </p>
              <div className="flex flex-wrap items-center gap-2 mt-2.5">
                <button
                  type="button"
                  onClick={() => setShowUploadModal(true)}
                  className="px-2.5 py-1 rounded-pill bg-forest-green text-warm-ivory text-xs font-semibold hover:bg-forest-green/90 inline-flex items-center gap-1 cursor-pointer"
                >
                  <Upload className="w-3 h-3" />
                  <span>{isGu ? 'અપલોડ (Drag & Drop)' : 'Upload (Drag & Drop)'}</span>
                </button>
                <button
                  type="button"
                  onClick={handleDashboardClick}
                  className="text-xs font-bold text-forest-green hover:underline inline-flex items-center gap-1 cursor-pointer"
                >
                  <span>{isGu ? 'વૉલ્ટ જુઓ' : 'View Vault'}</span>
                  <ChevronRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>

          <div className="bg-warm-ivory p-5 rounded-3xl border border-warm-border shadow-card flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-2xl bg-forest-green text-warm-ivory flex items-center justify-center shrink-0">
              <Landmark className="w-5 h-5 text-saffron" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-charcoal">{isGu ? 'PFMS બેંક ખાતું' : 'Bank & DBT Account'}</h4>
              <p className="text-xs text-muted-text mt-0.5 leading-relaxed">
                State Bank of India (••••4829) is active for direct government fund transfers.
              </p>
              <button
                type="button"
                onClick={() => setShowReceiptModal(true)}
                className="mt-2 text-xs font-bold text-forest-green hover:underline inline-flex items-center gap-1"
              >
                <span>Check DBT Ledger</span>
                <ChevronRight className="w-3 h-3" />
              </button>
            </div>
          </div>

          <div className="bg-warm-ivory p-5 rounded-3xl border border-warm-border shadow-card flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-2xl bg-forest-green text-warm-ivory flex items-center justify-center shrink-0">
              <PhoneCall className="w-5 h-5 text-saffron" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-charcoal">{isGu ? 'સુરત જિલ્લા સહાયતા હેલ્પલાઇન' : 'Surat Welfare Helpline'}</h4>
              <p className="text-xs text-muted-text mt-0.5 leading-relaxed">
                Call toll-free 1800-233-5500 or contact Surat District Social Welfare Officer.
              </p>
              <a
                href="tel:18002335500"
                className="mt-2 text-xs font-bold text-forest-green hover:underline inline-flex items-center gap-1"
              >
                <span>1800-233-5500 (Free)</span>
              </a>
            </div>
          </div>
        </section>

        {/* Student Notice Board */}
        <section className="bg-warm-ivory rounded-3xl border border-warm-border shadow-card p-5 sm:p-6 space-y-3">
          <div className="flex items-center gap-2">
            <Bell className="w-4 h-4 text-saffron" />
            <h3 className="font-extrabold text-base text-charcoal">
              {isGu ? 'વિદ્યાર્થીઓ માટે મહત્વપૂર્ણ સૂચનાઓ' : 'Official Student Bulletin & Academic Notices'}
            </h3>
          </div>
          <div className="divide-y divide-warm-border/60 text-xs">
            <div className="py-2.5 flex items-start gap-2.5">
              <Calendar className="w-4 h-4 text-forest-green mt-0.5 shrink-0" />
              <div>
                <p className="font-bold text-charcoal">MYSY Academic Year 2026-27 Renewal Cycle</p>
                <p className="text-muted-text">Students with 50%+ marks in current semester can submit renewals through the portal.</p>
              </div>
            </div>
            <div className="py-2.5 flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
              <div>
                <p className="font-bold text-charcoal">Bank Account NPCI Aadhaar Mapping Verification</p>
                <p className="text-muted-text">Ensure your bank account remains Aadhaar-enabled to avoid delays in Direct Benefit Transfer (DBT).</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Modal: Receipt Details */}
      {showReceiptModal && activeApp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-charcoal/45 p-4 backdrop-blur-sm">
          <div className="bg-warm-ivory rounded-3xl border border-warm-border p-6 max-w-md w-full shadow-glass-hover space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-warm-border">
              <div>
                <span className="text-[11px] font-bold text-forest-green uppercase">Official Sanction Receipt</span>
                <h3 className="font-extrabold text-base text-charcoal">{activeApp.applicationNumber}</h3>
              </div>
              <button
                type="button"
                onClick={() => setShowReceiptModal(false)}
                className="text-xs font-semibold text-muted-text hover:text-charcoal"
              >
                ✕
              </button>
            </div>

            <div className="space-y-2 text-xs text-charcoal">
              <div className="flex justify-between py-1 border-b border-warm-border/50">
                <span className="text-muted-text">Beneficiary Name</span>
                <span className="font-bold">{activeApp.studentName}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-warm-border/50">
                <span className="text-muted-text">Scheme</span>
                <span className="font-semibold text-right">{activeApp.schemeTitleEn}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-warm-border/50">
                <span className="text-muted-text">PFMS Disbursed Amount</span>
                <span className="font-extrabold text-forest-green text-sm">₹{activeApp.grantAmountInr.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-warm-border/50">
                <span className="text-muted-text">Bank Account</span>
                <span className="font-mono">SBI ({activeApp.bankAccountMasked})</span>
              </div>
              <div className="flex justify-between py-1 border-b border-warm-border/50">
                <span className="text-muted-text">PFMS Transaction ID</span>
                <span className="font-mono text-forest-green font-bold">{activeApp.pfmsTransactionId}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-warm-border/50">
                <span className="text-muted-text">RBI Settlement Ack</span>
                <span className="font-mono text-emerald-800">ACK-RBI-SUR-994821</span>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowReceiptModal(false)}
                className="btn-primary px-4 py-2 rounded-xl text-xs font-bold"
              >
                Close Receipt
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Apply New Scheme */}
      {showApplyModal && selectedScheme && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-charcoal/45 p-4 backdrop-blur-sm">
          <div className="bg-warm-ivory rounded-3xl border border-warm-border p-6 max-w-lg w-full shadow-glass-hover space-y-4">
            <div className="pb-3 border-b border-warm-border">
              <span className="text-[11px] font-bold text-forest-green uppercase">{selectedScheme.code}</span>
              <h3 className="font-extrabold text-base text-charcoal">{isGu ? selectedScheme.titleGu : selectedScheme.title}</h3>
            </div>

            <form onSubmit={handleApplySubmit} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-bold text-charcoal mb-1">Student Beneficiary</label>
                <input
                  type="text"
                  disabled
                  value="Priya Rajeshbhai Patel (SEBC · Surat)"
                  className="w-full px-3 py-2 rounded-xl border border-warm-border bg-stone-100 text-muted-text"
                />
              </div>

              <div>
                <label className="block font-bold text-charcoal mb-1">Enrolled Course & Semester</label>
                <input
                  type="text"
                  required
                  value={applyCourse}
                  onChange={(e) => setApplyCourse(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-warm-border bg-warm-ivory"
                />
              </div>

              <div>
                <label className="block font-bold text-charcoal mb-1">Annual Family Income (INR)</label>
                <input
                  type="number"
                  required
                  value={applyIncome}
                  onChange={(e) => setApplyIncome(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-warm-border bg-warm-ivory"
                />
              </div>

              <div className="p-3 bg-sage-green/30 rounded-2xl border border-warm-border/60 text-[11px] text-muted-text">
                Your verified credentials in the Document Vault will be submitted to Government Engineering College, Surat for initial verification.
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowApplyModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-charcoal hover:bg-sage-green/60"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary px-5 py-2 rounded-xl text-xs font-bold"
                >
                  Confirm & Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Document Upload Modal (Mobile / Laptop / Drag & Drop) */}
      <DocumentUploadModal
        isOpen={showUploadModal}
        language={language}
        onClose={() => setShowUploadModal(false)}
        onUploadSuccess={(doc: StudentDocument) => {
          setDocuments(getStoredDocuments());
          setToastMessage(isGu ? `દસ્તાવેજ સફળતાપૂર્વક અપલોડ થયો: ${doc.titleGu}` : `Document uploaded successfully: ${doc.title}`);
          setTimeout(() => setToastMessage(null), 3500);
        }}
      />

      {/* Document Preview Modal */}
      {previewDoc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-charcoal/50 p-4 backdrop-blur-sm">
          <div className="bg-warm-ivory rounded-3xl border border-warm-border p-6 max-w-lg w-full shadow-glass-hover space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-warm-border">
              <div>
                <span className="text-[10px] font-bold text-forest-green uppercase tracking-wider">
                  {isGu ? 'દસ્તાવેજ ચકાસણી પૂર્વાવલોકન' : 'Document Verification Preview'}
                </span>
                <h3 className="font-extrabold text-base text-charcoal">
                  {isGu ? previewDoc.titleGu : previewDoc.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setPreviewDoc(null)}
                className="p-1 rounded-full text-muted-text hover:bg-stone-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2.5 text-xs">
              {previewDoc.dataUrl && previewDoc.mimeType.startsWith('image/') ? (
                <div className="max-h-60 overflow-hidden rounded-2xl border border-warm-border flex items-center justify-center bg-stone-100">
                  <img src={previewDoc.dataUrl} alt={previewDoc.fileName} className="max-h-60 object-contain" />
                </div>
              ) : (
                <div className="p-6 rounded-2xl border border-warm-border bg-sage-green/20 text-center space-y-2">
                  <FileText className="w-12 h-12 text-forest-green mx-auto" />
                  <p className="font-mono font-bold text-charcoal">{previewDoc.fileName}</p>
                  <p className="text-[11px] text-muted-text">{previewDoc.fileSizeFormatted} · {previewDoc.mimeType}</p>
                </div>
              )}

              <div className="p-3 bg-sage-green/30 rounded-2xl border border-warm-border/60 text-[11px] text-muted-text space-y-1">
                <p><strong>Verified Authority:</strong> {previewDoc.verifiedBy || 'Digital Gujarat State Node'}</p>
                <p><strong>Upload Timestamp:</strong> {new Date(previewDoc.uploadedAt).toLocaleString()}</p>
                <p><strong>Security Standard:</strong> AES-256 encrypted under DPDP Act 2025</p>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setPreviewDoc(null)}
                className="btn-primary px-4 py-2 rounded-xl text-xs font-bold"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-warm-border bg-warm-ivory/60 py-3 text-center text-xs text-muted-text">
        <div className="mx-auto max-w-7xl px-4 flex flex-col sm:flex-row items-center justify-between gap-1">
          <span>{isGu ? 'વિદ્યા પ્રગતિ સેતુ · વિદ્યાર્થી કલ્યાણ મંચ' : 'Vidya Pragati Setu · Student Welfare & Assistance Gateway'}</span>
          <span>© {new Date().getFullYear()} Government of Gujarat</span>
        </div>
      </footer>
    </div>
  );
};

export default UserHomePage;
