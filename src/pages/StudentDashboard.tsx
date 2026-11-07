import React, { useState, useEffect } from 'react';
import {
  GraduationCap,
  ArrowLeft,
  LogOut,
  FileText,
  CheckCircle2,
  Clock,
  Landmark,
  ShieldCheck,
  CreditCard,
  PlusCircle,
  Award,
  Upload,
  Trash2,
  Eye,
  X,
} from 'lucide-react';
import { Language, SchemeItem, getStoredSchemes } from '../data/schemes';
import { PortalApplication, getStoredApplications, saveStoredApplications } from '../data/portalData';
import { StudentDocument, getStoredDocuments, deleteStoredDocument } from '../data/documentData';
import { DocumentUploadModal } from '../components/DocumentUploadModal';

interface StudentDashboardProps {
  initialLanguage?: Language;
  onNavigateHome?: () => void;
  onSignOut?: () => void;
}

export const StudentDashboard: React.FC<StudentDashboardProps> = ({
  initialLanguage = 'en',
  onNavigateHome,
  onSignOut,
}) => {
  const [language, setLanguage] = useState<Language>(initialLanguage);
  const isGu = language === 'gu';

  const [activeTab, setActiveTab] = useState<'applications' | 'schemes' | 'documents' | 'dbt'>('applications');
  const [applications, setApplications] = useState<PortalApplication[]>([]);
  const [selectedApp, setSelectedApp] = useState<PortalApplication | null>(null);
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [applyScheme, setApplyScheme] = useState<SchemeItem | null>(null);
  const [applyCourse, setApplyCourse] = useState('B.E. Computer Engineering');
  const [applyIncome, setApplyIncome] = useState('180000');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Dynamic Documents & Schemes
  const [documents, setDocuments] = useState<StudentDocument[]>(() => getStoredDocuments());
  const [schemes, setSchemes] = useState<SchemeItem[]>(() => getStoredSchemes());
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [previewDoc, setPreviewDoc] = useState<StudentDocument | null>(null);

  useEffect(() => {
    const all = getStoredApplications();
    // Default to student user-student-priya
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

  const handleApplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!applyScheme) return;

    const all = getStoredApplications();
    const newApp: PortalApplication = {
      id: `app-${Date.now()}`,
      applicationNumber: `VPS-2026-${applyScheme.code.replace('VPS-', '')}-${Math.floor(1000 + Math.random() * 9000)}`,
      studentId: 'user-student-priya',
      studentName: 'Priya Rajeshbhai Patel',
      studentCategory: 'SEBC',
      schemeId: applyScheme.id,
      schemeTitleEn: applyScheme.title,
      schemeTitleGu: applyScheme.titleGu,
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
      {/* Toast */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 bg-forest-green text-warm-ivory px-5 py-3 rounded-2xl shadow-glass-hover flex items-center gap-2.5 text-xs sm:text-sm font-semibold">
          <CheckCircle2 className="w-4 h-4 text-saffron shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Bar */}
      <header className="sticky top-0 z-40 bg-warm-ivory/85 backdrop-blur-md border-b border-warm-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={handleHomeClick}
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-charcoal hover:text-forest-green px-3 py-1.5 rounded-pill border border-warm-border bg-warm-ivory hover:bg-sage-green/60 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 text-forest-green" />
              <span>{isGu ? 'મુખ્ય પૃષ્ઠ' : 'Website'}</span>
            </button>
            <div className="hidden md:flex items-center gap-2 pl-2 border-l border-warm-border">
              <span className="font-bold text-sm text-charcoal">Vidya Pragati Setu</span>
              <span className="px-2 py-0.5 rounded-pill bg-sage-green/70 text-[10px] font-bold text-forest-green uppercase">
                {isGu ? 'વિદ્યાર્થી ખાતું' : 'Student Portal'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
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
              <span>{isGu ? 'બહાર નીકળો' : 'Sign Out'}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6">
        {/* Student Profile Card Banner */}
        <div className="bg-gradient-to-r from-forest-green via-[#1E4A35] to-[#163828] text-warm-ivory rounded-3xl p-6 sm:p-8 shadow-card relative overflow-hidden">
          <div className="absolute right-0 top-0 translate-x-12 -translate-y-12 w-64 h-64 rounded-full bg-saffron/15 blur-3xl pointer-events-none" />
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-warm-ivory/15 border border-warm-ivory/25 flex items-center justify-center shrink-0 shadow-inner">
                <GraduationCap className="w-8 h-8 text-saffron" />
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight">Priya Rajeshbhai Patel</h1>
                  <span className="px-2.5 py-0.5 rounded-pill bg-warm-ivory/20 border border-warm-ivory/30 text-[11px] font-semibold">
                    {isGu ? 'ઓબીસી / SEBC વર્ગ' : 'SEBC Category'}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-pill bg-saffron/30 border border-saffron/40 text-[11px] font-bold text-warm-ivory">
                    {isGu ? 'સુરત જિલ્લો' : 'Surat District'}
                  </span>
                </div>
                <p className="mt-1 text-xs sm:text-sm text-warm-ivory/80">
                  Government Engineering College, Surat · B.E. Computer Engineering (Sem 5)
                </p>
                <div className="mt-3 flex items-center gap-4 flex-wrap text-xs text-warm-ivory/70">
                  <span>Reg ID: STU-2026-SUR-001</span>
                  <span>•</span>
                  <span>Aadhaar Verified</span>
                  <span>•</span>
                  <span className="inline-flex items-center gap-1 text-emerald-300">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>PFMS DBT Bank Linked: SBI (••••4829)</span>
                  </span>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                if (schemes.length > 0) {
                  setApplyScheme(schemes[0]);
                  setShowApplyModal(true);
                }
              }}
              className="inline-flex items-center justify-center gap-2 btn-secondary px-5 py-2.5 rounded-pill text-xs sm:text-sm font-bold shrink-0 self-start md:self-center cursor-pointer shadow-sm"
            >
              <PlusCircle className="w-4 h-4 text-forest-green" />
              <span>{isGu ? 'નવી યોજના માટે અરજી કરો' : 'Apply for New Scheme'}</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-warm-border gap-2 sm:gap-6 overflow-x-auto text-xs sm:text-sm font-bold">
          <button
            type="button"
            onClick={() => setActiveTab('applications')}
            className={`pb-3 border-b-2 transition-colors whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'applications'
                ? 'border-forest-green text-forest-green'
                : 'border-transparent text-muted-text hover:text-charcoal'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>{isGu ? `મારી અરજીઓ (${applications.length})` : `My Applications (${applications.length})`}</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('schemes')}
            className={`pb-3 border-b-2 transition-colors whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'schemes'
                ? 'border-forest-green text-forest-green'
                : 'border-transparent text-muted-text hover:text-charcoal'
            }`}
          >
            <Award className="w-4 h-4" />
            <span>{isGu ? 'પાત્ર યોજનાઓ (Eligible Schemes)' : 'Eligible Schemes'}</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('documents')}
            className={`pb-3 border-b-2 transition-colors whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'documents'
                ? 'border-forest-green text-forest-green'
                : 'border-transparent text-muted-text hover:text-charcoal'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>{isGu ? 'દસ્તાવેજ વૉલ્ટ (Documents)' : 'Document Vault'}</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('dbt')}
            className={`pb-3 border-b-2 transition-colors whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'dbt'
                ? 'border-forest-green text-forest-green'
                : 'border-transparent text-muted-text hover:text-charcoal'
            }`}
          >
            <CreditCard className="w-4 h-4" />
            <span>{isGu ? 'PFMS ડીબીટી ખાતું (DBT Status)' : 'PFMS DBT Ledger'}</span>
          </button>
        </div>

        {/* Tab 1: Applications */}
        {activeTab === 'applications' && (
          <div className="space-y-4">
            {applications.length === 0 ? (
              <div className="text-center py-12 bg-warm-ivory rounded-3xl border border-warm-border p-8">
                <FileText className="w-10 h-10 text-muted-text mx-auto mb-3" />
                <h3 className="font-bold text-base text-charcoal">{isGu ? 'કોઈ અરજી મળેલ નથી' : 'No applications found'}</h3>
                <p className="text-xs text-muted-text mt-1">{isGu ? 'નવી યોજના પસંદ કરી અરજી સબમિટ કરો.' : 'Select an eligible scheme and submit your first application.'}</p>
              </div>
            ) : (
              applications.map((app) => (
                <div
                  key={app.id}
                  className="bg-warm-ivory rounded-3xl border border-warm-border shadow-card p-5 sm:p-6 transition-all hover:border-forest-green/40"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-warm-border/70">
                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-muted-text">
                        {app.applicationNumber} · {app.academicYear}
                      </span>
                      <h2 className="text-base sm:text-lg font-extrabold text-charcoal">
                        {isGu ? app.schemeTitleGu : app.schemeTitleEn}
                      </h2>
                      <p className="text-xs text-muted-text mt-0.5">
                        {app.instituteName} · {app.courseName}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <span
                        className={`px-3 py-1 rounded-pill text-xs font-bold inline-flex items-center gap-1.5 ${
                          app.status === 'PFMS_Disbursed'
                            ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                            : app.status === 'Officer_Approved'
                            ? 'bg-blue-100 text-blue-900 border border-blue-300'
                            : app.status === 'Institute_Verified'
                            ? 'bg-amber-100 text-amber-900 border border-amber-300'
                            : 'bg-stone-200 text-stone-800'
                        }`}
                      >
                        <span className="w-2 h-2 rounded-full bg-current" />
                        <span>
                          {app.status === 'PFMS_Disbursed'
                            ? isGu ? '₹ સહાય ચુકવણી પૂર્ણ (PFMS Disbursed)' : 'PFMS DBT Disbursed'
                            : app.status === 'Officer_Approved'
                            ? isGu ? 'જિલ્લા અધિકારી મંજૂર' : 'District Officer Approved'
                            : app.status === 'Institute_Verified'
                            ? isGu ? 'સંસ્થા દ્વારા ચકાસાયેલ' : 'Institute Verified'
                            : isGu ? 'અરજી સબમિટ કરેલ' : 'Submitted'}
                        </span>
                      </span>

                      <button
                        type="button"
                        onClick={() => setSelectedApp(app)}
                        className="btn-secondary px-3 py-1 rounded-pill text-xs font-semibold"
                      >
                        {isGu ? 'વિગતો' : 'Details'}
                      </button>
                    </div>
                  </div>

                  {/* 4-Step Tracking Stepper */}
                  <div className="pt-5">
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-muted-text mb-3">
                      {isGu ? 'જીવંત અરજી સ્થિતિ (Application Lifecycle)' : 'Live Pipeline Tracking'}
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {/* Step 1 */}
                      <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs">
                        <div className="flex items-center gap-1.5 text-emerald-800 font-bold mb-1">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                          <span>1. {isGu ? 'અરજી સબમિટ' : 'Submitted'}</span>
                        </div>
                        <p className="text-[11px] text-emerald-700">
                          {new Date(app.submittedAt).toLocaleDateString()}
                        </p>
                      </div>

                      {/* Step 2 */}
                      <div
                        className={`p-3 rounded-2xl border text-xs ${
                          app.instituteVerifiedAt || app.status === 'PFMS_Disbursed' || app.status === 'Officer_Approved'
                            ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                            : 'bg-stone-50 border-warm-border text-muted-text'
                        }`}
                      >
                        <div className="flex items-center gap-1.5 font-bold mb-1">
                          {app.instituteVerifiedAt || app.status === 'PFMS_Disbursed' || app.status === 'Officer_Approved' ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                          ) : (
                            <Clock className="w-4 h-4 text-amber-600 shrink-0" />
                          )}
                          <span>2. {isGu ? 'સંસ્થા ચકાસણી' : 'Institute Verified'}</span>
                        </div>
                        <p className="text-[11px]">
                          {app.instituteVerifiedAt ? new Date(app.instituteVerifiedAt).toLocaleDateString() : isGu ? 'પ્રક્રિયા ચાલુ' : 'In review'}
                        </p>
                      </div>

                      {/* Step 3 */}
                      <div
                        className={`p-3 rounded-2xl border text-xs ${
                          app.officerApprovedAt || app.status === 'PFMS_Disbursed'
                            ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                            : 'bg-stone-50 border-warm-border text-muted-text'
                        }`}
                      >
                        <div className="flex items-center gap-1.5 font-bold mb-1">
                          {app.officerApprovedAt || app.status === 'PFMS_Disbursed' ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                          ) : (
                            <Clock className="w-4 h-4 text-muted-text shrink-0" />
                          )}
                          <span>3. {isGu ? 'અધિકારી મંજૂરી' : 'Officer Approved'}</span>
                        </div>
                        <p className="text-[11px]">
                          {app.officerApprovedAt ? new Date(app.officerApprovedAt).toLocaleDateString() : isGu ? 'બાકી' : 'Pending'}
                        </p>
                      </div>

                      {/* Step 4 */}
                      <div
                        className={`p-3 rounded-2xl border text-xs ${
                          app.status === 'PFMS_Disbursed'
                            ? 'bg-emerald-100 border-emerald-300 text-emerald-950 font-bold shadow-sm'
                            : 'bg-stone-50 border-warm-border text-muted-text'
                        }`}
                      >
                        <div className="flex items-center gap-1.5 mb-1">
                          {app.status === 'PFMS_Disbursed' ? (
                            <Landmark className="w-4 h-4 text-forest-green shrink-0" />
                          ) : (
                            <Clock className="w-4 h-4 text-muted-text shrink-0" />
                          )}
                          <span>4. {isGu ? 'PFMS ડીબીટી જમા' : 'PFMS Disbursed'}</span>
                        </div>
                        <p className="text-[11px]">
                          {app.status === 'PFMS_Disbursed'
                            ? `₹${app.grantAmountInr.toLocaleString('en-IN')}`
                            : isGu ? 'ચુકવણી બાકી' : 'Awaiting payment'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Tab 2: Eligible Schemes */}
        {activeTab === 'schemes' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {schemes.map((scheme) => (
              <div key={scheme.id} className="bg-warm-ivory rounded-3xl border border-warm-border shadow-card p-5 sm:p-6 flex flex-col justify-between">
                <div>
                  <span className="px-2.5 py-0.5 rounded-pill bg-sage-green/70 text-[11px] font-bold text-forest-green uppercase">
                    {isGu ? scheme.categoryTagGu : scheme.categoryTag}
                  </span>
                  <h3 className="text-base sm:text-lg font-bold text-charcoal mt-2">
                    {isGu ? scheme.titleGu : scheme.title}
                  </h3>
                  <p className="text-xs text-muted-text mt-1.5 leading-relaxed">
                    {isGu ? scheme.descriptionGu : scheme.description}
                  </p>
                  <div className="mt-3 p-3 bg-sage-green/30 rounded-2xl border border-warm-border/60 text-xs">
                    <span className="font-bold text-forest-green">{isGu ? 'લાભ:' : 'Benefit:'} </span>
                    <span className="text-charcoal">{isGu ? scheme.benefitSummaryGu : scheme.benefitSummary}</span>
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-warm-border/60 flex items-center justify-between">
                  <span className="text-xs text-muted-text">{scheme.applicationWindow}</span>
                  <button
                    type="button"
                    onClick={() => {
                      setApplyScheme(scheme);
                      setShowApplyModal(true);
                    }}
                    className="btn-primary px-4 py-1.5 rounded-pill text-xs font-semibold cursor-pointer"
                  >
                    {isGu ? 'અરજી કરો' : 'Apply Now'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 3: Documents Vault */}
        {activeTab === 'documents' && (
          <div className="bg-warm-ivory rounded-3xl border border-warm-border shadow-card p-6 space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-warm-border/70">
              <div>
                <h3 className="font-extrabold text-base sm:text-lg text-charcoal">
                  {isGu
                    ? `ચકાસાયેલ ઓળખ અને દસ્તાવેજ વૉલ્ટ (${documents.length} ફાઇલો ઉપલબ્ધ)`
                    : `Verified Student Credentials Vault (${documents.length} Files Ready)`}
                </h3>
                <p className="text-xs text-muted-text mt-0.5">
                  {isGu
                    ? 'મોબાઇલ ફોન, લેપટોપ અથવા ડ્રેગ એન્ડ ડ્રોપ દ્વારા તમારા નવા પ્રમાણપત્રો અપલોડ કરો.'
                    : 'Upload certificates from your mobile phone, laptop, or drag & drop files directly.'}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowUploadModal(true)}
                className="btn-primary px-4 py-2.5 rounded-pill text-xs font-bold inline-flex items-center gap-2 shadow-sm shrink-0 cursor-pointer"
              >
                <Upload className="w-4 h-4 text-saffron" />
                <span>{isGu ? 'નવો દસ્તાવેજ અપલોડ કરો' : 'Upload Document (Drag & Drop)'}</span>
              </button>
            </div>

            {documents.length === 0 ? (
              <div className="text-center py-10 bg-sage-green/20 rounded-2xl p-6">
                <FileText className="w-10 h-10 text-muted-text mx-auto mb-2" />
                <p className="font-bold text-xs text-charcoal">{isGu ? 'કોઈ દસ્તાવેજ નથી' : 'No documents in vault'}</p>
                <button
                  type="button"
                  onClick={() => setShowUploadModal(true)}
                  className="btn-secondary px-4 py-1.5 rounded-pill text-xs font-bold mt-3"
                >
                  Upload First Document
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
                {documents.map((doc) => (
                  <div
                    key={doc.id}
                    className="p-4 rounded-2xl border border-warm-border bg-sage-green/20 flex flex-col justify-between gap-3 hover:border-forest-green/40 transition-all shadow-sm"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3 min-w-0">
                        <div className="w-9 h-9 rounded-xl bg-forest-green text-warm-ivory flex items-center justify-center shrink-0 mt-0.5">
                          <FileText className="w-5 h-5 text-saffron" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs font-extrabold text-charcoal truncate">
                            {isGu ? doc.titleGu : doc.title}
                          </p>
                          <p className="text-[11px] text-muted-text font-mono truncate">{doc.fileName}</p>
                          <p className="text-[10px] text-muted-text mt-0.5">
                            {doc.fileSizeFormatted} · {new Date(doc.uploadedAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>

                      <span className="px-2 py-0.5 rounded-pill bg-emerald-100 text-emerald-800 text-[10px] font-bold flex items-center gap-1 shrink-0">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        <span>Verified</span>
                      </span>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-warm-border/50 text-[11px]">
                      <span className="text-muted-text italic truncate max-w-[150px]">
                        {doc.verificationBadge}
                      </span>
                      <div className="flex items-center gap-1.5 shrink-0">
                        <button
                          type="button"
                          onClick={() => setPreviewDoc(doc)}
                          className="px-2.5 py-1 rounded-pill bg-warm-ivory hover:bg-sage-green/70 text-forest-green font-bold text-[11px] border border-warm-border inline-flex items-center gap-1"
                        >
                          <Eye className="w-3 h-3" />
                          <span>{isGu ? 'જુઓ' : 'Preview'}</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            if (window.confirm(isGu ? 'શું તમે આ દસ્તાવેજ કાઢી નાખવા માંગો છો?' : 'Delete this document from your vault?')) {
                              deleteStoredDocument(doc.id);
                              setDocuments(getStoredDocuments());
                              setToastMessage(isGu ? 'દસ્તાવેજ કાઢી નાખવામાં આવ્યો.' : 'Document deleted from vault.');
                              setTimeout(() => setToastMessage(null), 3500);
                            }
                          }}
                          className="p-1 rounded-pill text-red-600 hover:bg-red-50 border border-red-200"
                          title="Delete document"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 4: PFMS DBT Ledger */}
        {activeTab === 'dbt' && (
          <div className="bg-warm-ivory rounded-3xl border border-warm-border shadow-card p-6 space-y-5">
            <div>
              <h3 className="font-extrabold text-base text-charcoal">{isGu ? 'PFMS ડાયરેક્ટ બેનિફિટ ટ્રાન્સફર (DBT) રેકોર્ડ' : 'PFMS Direct Benefit Transfer (DBT) Ledger'}</h3>
              <p className="text-xs text-muted-text mt-0.5">
                {isGu
                  ? 'સરકારી શિક્ષણ સહાય સીધી વિદ્યાર્થીના આધાર-સીડેડ બેંક ખાતામાં જમા થાય છે.'
                  : 'Official government subsidies credited directly into the student’s Aadhaar-seeded bank account.'}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider">Aadhaar Enabled Payment System (AePS)</span>
                <p className="text-sm font-extrabold text-emerald-950 mt-0.5">State Bank of India · A/C No: ••••••••4829</p>
                <p className="text-xs text-emerald-700">IFSC: SBIN0001234 · PFMS Beneficiary Code: PFMS-BEN-SUR-84920</p>
              </div>
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-pill bg-emerald-600 text-warm-ivory text-xs font-bold shrink-0">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>DBT Active & Verified</span>
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-warm-border text-muted-text uppercase font-bold text-[11px]">
                    <th className="py-2.5 px-3">PFMS Transaction ID</th>
                    <th className="py-2.5 px-3">Scheme Name</th>
                    <th className="py-2.5 px-3">Disbursed Amount</th>
                    <th className="py-2.5 px-3">Date</th>
                    <th className="py-2.5 px-3">RBI Ack Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-warm-border/60">
                  <tr>
                    <td className="py-3 px-3 font-mono font-bold text-forest-green">PFMS-GUJ-2026-TXN-849201</td>
                    <td className="py-3 px-3">MYSY Higher Education Tuition Grant</td>
                    <td className="py-3 px-3 font-extrabold text-emerald-700">₹ 50,000.00</td>
                    <td className="py-3 px-3 text-muted-text">22 Sep 2026</td>
                    <td className="py-3 px-3">
                      <span className="px-2 py-0.5 rounded-pill bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                        ACK-RBI-SUR-994821 (SUCCESS)
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>

      {/* Modal: Application Details */}
      {selectedApp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-charcoal/45 p-4 backdrop-blur-sm">
          <div className="bg-warm-ivory rounded-3xl border border-warm-border p-6 max-w-lg w-full shadow-glass-hover space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-warm-border">
              <div>
                <span className="text-[11px] font-bold text-muted-text">{selectedApp.applicationNumber}</span>
                <h3 className="font-extrabold text-base text-charcoal">{selectedApp.schemeTitleEn}</h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedApp(null)}
                className="text-xs font-semibold text-muted-text hover:text-charcoal px-2 py-1 rounded-pill"
              >
                ✕ Close
              </button>
            </div>

            <div className="space-y-2.5 text-xs text-charcoal">
              <div className="flex justify-between py-1 border-b border-warm-border/50">
                <span className="text-muted-text">Status</span>
                <span className="font-bold text-forest-green">{selectedApp.status}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-warm-border/50">
                <span className="text-muted-text">Grant Amount</span>
                <span className="font-bold">₹{selectedApp.grantAmountInr.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-warm-border/50">
                <span className="text-muted-text">Institute Verification Remarks</span>
                <span className="max-w-xs text-right font-medium">{selectedApp.instituteRemarks || 'Pending'}</span>
              </div>
              {selectedApp.officerRemarks && (
                <div className="flex justify-between py-1 border-b border-warm-border/50">
                  <span className="text-muted-text">Officer Remarks</span>
                  <span className="max-w-xs text-right font-medium">{selectedApp.officerRemarks}</span>
                </div>
              )}
              {selectedApp.pfmsTransactionId && (
                <div className="flex justify-between py-1 border-b border-warm-border/50">
                  <span className="text-muted-text">PFMS Transaction ID</span>
                  <span className="font-mono font-bold text-forest-green">{selectedApp.pfmsTransactionId}</span>
                </div>
              )}
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setSelectedApp(null)}
                className="btn-primary px-4 py-2 rounded-xl text-xs font-bold"
              >
                Close Window
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Apply New Scheme */}
      {showApplyModal && applyScheme && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-charcoal/45 p-4 backdrop-blur-sm">
          <div className="bg-warm-ivory rounded-3xl border border-warm-border p-6 max-w-lg w-full shadow-glass-hover space-y-4">
            <div className="pb-3 border-b border-warm-border">
              <span className="text-[11px] font-bold text-forest-green uppercase tracking-wider">{applyScheme.code}</span>
              <h3 className="font-extrabold text-base text-charcoal">{isGu ? applyScheme.titleGu : applyScheme.title}</h3>
            </div>

            <form onSubmit={handleApplySubmit} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-bold text-charcoal mb-1">Student Name</label>
                <input
                  type="text"
                  disabled
                  value="Priya Rajeshbhai Patel"
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
                Your linked documents (Income Certificate, Marksheet, and Bank A/C) will be attached automatically to this application for institute verification.
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
                  Submit Application
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Document Upload (Mobile / Laptop / Drag & Drop) */}
      <DocumentUploadModal
        isOpen={showUploadModal}
        onClose={() => setShowUploadModal(false)}
        language={language}
        onUploadSuccess={(newDoc) => {
          setDocuments(getStoredDocuments());
          setToastMessage(
            isGu
              ? `દસ્તાવેજ "${newDoc.fileName}" સફળતાપૂર્વક અપલોડ થઈ ગયો છે!`
              : `Document "${newDoc.fileName}" successfully uploaded to vault!`
          );
          setTimeout(() => setToastMessage(null), 4000);
        }}
      />

      {/* Modal: Document Preview */}
      {previewDoc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-charcoal/50 p-4 backdrop-blur-sm">
          <div className="bg-warm-ivory rounded-3xl border border-warm-border p-6 max-w-lg w-full shadow-glass-hover space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-warm-border">
              <div>
                <span className="text-[11px] font-bold text-forest-green uppercase tracking-wider">{previewDoc.documentType}</span>
                <h3 className="font-extrabold text-base text-charcoal">{isGu ? previewDoc.titleGu : previewDoc.title}</h3>
              </div>
              <button
                type="button"
                onClick={() => setPreviewDoc(null)}
                className="p-1 rounded-full text-muted-text hover:text-charcoal"
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
          <span>{isGu ? 'વિદ્યા પ્રગતિ સેતુ · ગુજરાત સરકાર સહાય પોર્ટલ' : 'Vidya Pragati Setu · Government of Gujarat Education Portal'}</span>
          <span>© {new Date().getFullYear()}</span>
        </div>
      </footer>
    </div>
  );
};

export default StudentDashboard;
