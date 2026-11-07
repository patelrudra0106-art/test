import React, { useState, useEffect } from 'react';
import {
  Building2,
  ArrowLeft,
  LogOut,
  CheckCircle2,
  Clock,
  Search,
  Users,
  Check,
  X,
} from 'lucide-react';
import { Language } from '../data/schemes';
import { PortalApplication, getStoredApplications, saveStoredApplications } from '../data/portalData';

interface InstituteDashboardProps {
  initialLanguage?: Language;
  onNavigateHome?: () => void;
  onSignOut?: () => void;
}

export const InstituteDashboard: React.FC<InstituteDashboardProps> = ({
  initialLanguage = 'en',
  onNavigateHome,
  onSignOut,
}) => {
  const [language, setLanguage] = useState<Language>(initialLanguage);
  const isGu = language === 'gu';

  const [applications, setApplications] = useState<PortalApplication[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<'ALL' | 'Submitted' | 'Institute_Verified' | 'Officer_Approved' | 'PFMS_Disbursed'>('ALL');
  const [selectedApp, setSelectedApp] = useState<PortalApplication | null>(null);
  const [verifyModalOpen, setVerifyModalOpen] = useState(false);
  const [verificationRemarks, setVerificationRemarks] = useState('Enrollment and marksheet validated against college admission register.');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    loadApps();
  }, []);

  const loadApps = () => {
    const all = getStoredApplications();
    setApplications(all);
  };

  const handleVerify = (app: PortalApplication) => {
    setSelectedApp(app);
    setVerificationRemarks('Enrollment and marksheet validated against college admission register.');
    setVerifyModalOpen(true);
  };

  const confirmVerification = () => {
    if (!selectedApp) return;

    const all = getStoredApplications();
    const updated = all.map((a) => {
      if (a.id === selectedApp.id) {
        return {
          ...a,
          status: 'Institute_Verified' as const,
          instituteVerifiedAt: new Date().toISOString(),
          instituteRemarks: verificationRemarks,
        };
      }
      return a;
    });

    saveStoredApplications(updated);
    setApplications(updated);
    setVerifyModalOpen(false);
    setSelectedApp(null);
    setToastMessage(isGu ? 'વિદ્યાર્થી અરજી સફળતાપૂર્વક ચકાસાઈ અને જિલ્લા અધિકારીને મોકલી દેવાઈ.' : 'Application verified and forwarded to District Officer.');
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleReject = (app: PortalApplication) => {
    const reason = window.prompt(isGu ? 'નામંજૂરીનું કારણ દાખલ કરો:' : 'Enter rejection or discrepancy reason:');
    if (!reason) return;

    const all = getStoredApplications();
    const updated = all.map((a) => {
      if (a.id === app.id) {
        return {
          ...a,
          status: 'Rejected' as const,
          instituteRemarks: `Rejected by Institute: ${reason}`,
        };
      }
      return a;
    });

    saveStoredApplications(updated);
    setApplications(updated);
    setToastMessage(isGu ? 'અરજી નામંજૂર કરવામાં આવી છે.' : 'Application returned/rejected.');
    setTimeout(() => setToastMessage(null), 4000);
  };

  const filteredApps = applications.filter((app) => {
    const matchesSearch =
      app.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.applicationNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.schemeTitleEn.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === 'ALL' || app.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const totalSubmitted = applications.length;
  const pendingVerify = applications.filter((a) => a.status === 'Submitted').length;
  const verifiedCount = applications.filter((a) => a.status !== 'Submitted' && a.status !== 'Rejected').length;

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

      {/* Header */}
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
                {isGu ? 'શિક્ષણ સંસ્થા પોર્ટલ' : 'Institute Portal'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
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

      {/* Main Container */}
      <main className="flex-1 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6">
        {/* Banner */}
        <div className="bg-gradient-to-r from-forest-green via-[#1E4A35] to-[#163828] text-warm-ivory rounded-3xl p-6 sm:p-8 shadow-card relative overflow-hidden">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-warm-ivory/15 border border-warm-ivory/25 flex items-center justify-center shrink-0 shadow-inner">
                <Building2 className="w-8 h-8 text-saffron" />
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight">L.D. College of Engineering</h1>
                  <span className="px-2.5 py-0.5 rounded-pill bg-warm-ivory/20 border border-warm-ivory/30 text-[11px] font-semibold">
                    AISHE-C-24891
                  </span>
                  <span className="px-2.5 py-0.5 rounded-pill bg-saffron/30 border border-saffron/40 text-[11px] font-bold text-warm-ivory">
                    Ahmedabad District
                  </span>
                </div>
                <p className="mt-1 text-xs sm:text-sm text-warm-ivory/80">
                  Gujarat Technological University (GTU) Affiliated · Government Institute
                </p>
                <div className="mt-2.5 flex items-center gap-3 text-xs text-warm-ivory/70">
                  <span>Principal: Dr. Rajendrasinh Vaghela</span>
                  <span>•</span>
                  <span>Nodal Verification Officer: Prof. M. K. Shah</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-warm-ivory p-5 rounded-3xl border border-warm-border shadow-card flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-sage-green/60 flex items-center justify-center text-forest-green shrink-0">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-muted-text">
                {isGu ? 'કુલ વિદ્યાર્થી અરજીઓ' : 'Total Applications'}
              </span>
              <p className="text-2xl font-extrabold text-charcoal">{totalSubmitted}</p>
            </div>
          </div>

          <div className="bg-warm-ivory p-5 rounded-3xl border border-warm-border shadow-card flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-muted-text">
                {isGu ? 'ચકાસણી બાકી' : 'Pending Verification'}
              </span>
              <p className="text-2xl font-extrabold text-amber-800">{pendingVerify}</p>
            </div>
          </div>

          <div className="bg-warm-ivory p-5 rounded-3xl border border-warm-border shadow-card flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-muted-text">
                {isGu ? 'ચકાસાયેલ અને અગ્રેસરિત' : 'Verified & Forwarded'}
              </span>
              <p className="text-2xl font-extrabold text-emerald-800">{verifiedCount}</p>
            </div>
          </div>
        </div>

        {/* Search & Filter Toolbar */}
        <div className="bg-warm-ivory p-4 rounded-3xl border border-warm-border shadow-card flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-muted-text absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={isGu ? 'વિદ્યાર્થી અથવા અરજી નંબર શોધો...' : 'Search student or application #...'}
              className="w-full pl-10 pr-4 py-2 rounded-2xl border border-warm-border bg-warm-ivory text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-forest-green/20"
            />
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto text-xs font-bold">
            {(
              [
                { id: 'ALL', en: 'All Applications', gu: 'બધી અરજીઓ' },
                { id: 'Submitted', en: 'Pending Verification', gu: 'ચકાસણી બાકી' },
                { id: 'Institute_Verified', en: 'Institute Verified', gu: 'ચકાસાયેલ' },
                { id: 'PFMS_Disbursed', en: 'PFMS Disbursed', gu: 'ચુકવાયેલ' },
              ] as const
            ).map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setFilterStatus(tab.id)}
                className={`px-3 py-1.5 rounded-pill transition-colors whitespace-nowrap ${
                  filterStatus === tab.id
                    ? 'bg-forest-green text-warm-ivory'
                    : 'bg-warm-ivory text-charcoal border border-warm-border hover:bg-sage-green/60'
                }`}
              >
                {isGu ? tab.gu : tab.en}
              </button>
            ))}
          </div>
        </div>

        {/* Verification Queue Table */}
        <div className="bg-warm-ivory rounded-3xl border border-warm-border shadow-card overflow-hidden">
          <div className="p-5 border-b border-warm-border flex items-center justify-between">
            <h3 className="font-extrabold text-base text-charcoal">
              {isGu ? 'વિદ્યાર્થી અરજી ચકાસણી કતાર (Verification Queue)' : 'Enrolled Student Scholarship Verification Queue'}
            </h3>
            <span className="text-xs text-muted-text">{filteredApps.length} records</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-warm-border bg-sage-green/30 text-muted-text uppercase font-bold text-[11px]">
                  <th className="py-3 px-4">Application Number</th>
                  <th className="py-3 px-4">Student Name & Category</th>
                  <th className="py-3 px-4">Scheme</th>
                  <th className="py-3 px-4">Course & Sem</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-warm-border/60">
                {filteredApps.map((app) => (
                  <tr key={app.id} className="hover:bg-sage-green/15 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-forest-green">
                      {app.applicationNumber}
                      <span className="block font-normal text-[10px] text-muted-text">
                        {new Date(app.submittedAt).toLocaleDateString()}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="font-extrabold text-charcoal block">{app.studentName}</span>
                      <span className="text-[11px] text-muted-text">{app.studentCategory} · {app.district}</span>
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-charcoal">
                      {isGu ? app.schemeTitleGu : app.schemeTitleEn}
                      <span className="block text-[11px] text-forest-green font-bold">
                        ₹{app.grantAmountInr.toLocaleString('en-IN')}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-muted-text">
                      {app.courseName}
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`px-2.5 py-0.5 rounded-pill text-[11px] font-bold inline-flex items-center gap-1 ${
                          app.status === 'PFMS_Disbursed'
                            ? 'bg-emerald-100 text-emerald-900'
                            : app.status === 'Officer_Approved'
                            ? 'bg-blue-100 text-blue-900'
                            : app.status === 'Institute_Verified'
                            ? 'bg-amber-100 text-amber-900'
                            : app.status === 'Rejected'
                            ? 'bg-red-100 text-red-900'
                            : 'bg-stone-200 text-stone-800'
                        }`}
                      >
                        {app.status === 'Submitted' ? 'Pending Review' : app.status.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      {app.status === 'Submitted' ? (
                        <div className="inline-flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => handleVerify(app)}
                            className="btn-primary px-3 py-1.5 rounded-pill text-xs font-bold inline-flex items-center gap-1"
                          >
                            <Check className="w-3.5 h-3.5" />
                            <span>{isGu ? 'ચકાસો' : 'Verify'}</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => handleReject(app)}
                            className="px-2.5 py-1.5 rounded-pill text-xs font-semibold text-red-700 hover:bg-red-50 border border-red-200 inline-flex items-center gap-1"
                          >
                            <X className="w-3.5 h-3.5" />
                            <span>{isGu ? 'નામંજૂર' : 'Reject'}</span>
                          </button>
                        </div>
                      ) : (
                        <span className="text-[11px] text-muted-text italic">
                          {app.instituteVerifiedAt ? `Verified on ${new Date(app.instituteVerifiedAt).toLocaleDateString()}` : 'Completed'}
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Verify Confirmation Modal */}
      {verifyModalOpen && selectedApp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-charcoal/45 p-4 backdrop-blur-sm">
          <div className="bg-warm-ivory rounded-3xl border border-warm-border p-6 max-w-lg w-full shadow-glass-hover space-y-4">
            <div className="pb-3 border-b border-warm-border">
              <span className="text-[11px] font-bold text-forest-green uppercase">Institute Scrutiny & Approval</span>
              <h3 className="font-extrabold text-base text-charcoal">{selectedApp.studentName}</h3>
              <p className="text-xs text-muted-text">{selectedApp.applicationNumber} · {selectedApp.courseName}</p>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 bg-sage-green/30 rounded-2xl border border-warm-border/60">
                <span className="font-bold text-charcoal block mb-1">Attached Verification Documents:</span>
                <ul className="list-disc pl-5 space-y-0.5 text-muted-text">
                  <li>GTU Previous Semester Marksheet (Pass with 82.4%)</li>
                  <li>Income Certificate Mamlatdar Office Verified</li>
                  <li>Fee Payment Receipt for Academic Year 2026-27</li>
                </ul>
              </div>

              <div>
                <label className="block font-bold text-charcoal mb-1">Verification Remarks / Endorsement</label>
                <textarea
                  rows={3}
                  value={verificationRemarks}
                  onChange={(e) => setVerificationRemarks(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-warm-border bg-warm-ivory text-xs focus:ring-2 focus:ring-forest-green/20"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setVerifyModalOpen(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-charcoal hover:bg-sage-green/60"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmVerification}
                className="btn-primary px-5 py-2 rounded-xl text-xs font-bold"
              >
                Endorse & Forward to District Officer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-warm-border bg-warm-ivory/60 py-3 text-center text-xs text-muted-text">
        <div className="mx-auto max-w-7xl px-4 flex flex-col sm:flex-row items-center justify-between gap-1">
          <span>{isGu ? 'વિદ્યા પ્રગતિ સેતુ · શિક્ષણ સંસ્થા મંચ' : 'Vidya Pragati Setu · Institutional Welfare Verification Module'}</span>
          <span>© {new Date().getFullYear()}</span>
        </div>
      </footer>
    </div>
  );
};

export default InstituteDashboard;
