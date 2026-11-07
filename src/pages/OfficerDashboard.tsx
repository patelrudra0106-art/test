import React, { useState, useEffect } from 'react';
import {
  Landmark,
  ArrowLeft,
  LogOut,
  CheckCircle2,
  Clock,
  FileCheck,
  Search,
  ShieldCheck,
  Send,
  CreditCard,
  Check,
} from 'lucide-react';
import { Language } from '../data/schemes';
import { PortalApplication, getStoredApplications, saveStoredApplications } from '../data/portalData';
import { GUJARAT_DISTRICTS } from '../data/authData';

interface OfficerDashboardProps {
  initialLanguage?: Language;
  onNavigateHome?: () => void;
  onSignOut?: () => void;
}

export const OfficerDashboard: React.FC<OfficerDashboardProps> = ({
  initialLanguage = 'en',
  onNavigateHome,
  onSignOut,
}) => {
  const [language, setLanguage] = useState<Language>(initialLanguage);
  const isGu = language === 'gu';

  const [activeDistrict, setActiveDistrict] = useState('Surat');
  const [applications, setApplications] = useState<PortalApplication[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'queue' | 'pfms_release'>('queue');
  const [selectedApp, setSelectedApp] = useState<PortalApplication | null>(null);
  const [officerRemarks, setOfficerRemarks] = useState('Income certificate and domicile validated against Revenue e-Dhara records. Sanctioned.');
  const [showSanctionModal, setShowSanctionModal] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isPfmsDispatching, setIsPfmsDispatching] = useState(false);

  useEffect(() => {
    loadApps();
  }, []);

  const loadApps = () => {
    const all = getStoredApplications();
    setApplications(all);
  };

  const handleApprove = (app: PortalApplication) => {
    setSelectedApp(app);
    setOfficerRemarks('Income certificate and domicile validated against Revenue e-Dhara records. Sanctioned.');
    setShowSanctionModal(true);
  };

  const confirmSanction = () => {
    if (!selectedApp) return;

    const all = getStoredApplications();
    const updated = all.map((a) => {
      if (a.id === selectedApp.id) {
        return {
          ...a,
          status: 'Officer_Approved' as const,
          officerApprovedAt: new Date().toISOString(),
          officerRemarks: officerRemarks,
        };
      }
      return a;
    });

    saveStoredApplications(updated);
    setApplications(updated);
    setShowSanctionModal(false);
    setSelectedApp(null);
    setToastMessage(isGu ? 'અરજી મંજૂર થઈ અને PFMS ડીબીટી રિલીઝ કતારમાં મોકલાઈ ગઈ છે.' : 'Application approved and queued for PFMS DBT batch release.');
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleTriggerBatchDisbursement = () => {
    setIsPfmsDispatching(true);

    setTimeout(() => {
      const all = getStoredApplications();
      const updated = all.map((a) => {
        if (a.status === 'Officer_Approved') {
          return {
            ...a,
            status: 'PFMS_Disbursed' as const,
            pfmsTransactionId: `PFMS-GUJ-2026-TXN-${Math.floor(100000 + Math.random() * 900000)}`,
            disbursedAt: new Date().toISOString(),
          };
        }
        return a;
      });

      saveStoredApplications(updated);
      setApplications(updated);
      setIsPfmsDispatching(false);
      setToastMessage(isGu ? 'PFMS ડીબીટી બેચ સફળતાપૂર્વક રિલીઝ થઈ ગઈ છે. સહાય વિદ્યાર્થીઓના બેંક ખાતામાં જમા થઈ!' : 'PFMS DBT Batch Dispatched! Subsidies transferred to bank accounts.');
      setTimeout(() => setToastMessage(null), 5000);
    }, 1200);
  };

  const filteredApps = applications.filter((app) => {
    const matchesSearch =
      app.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.applicationNumber.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  const pendingOfficerCount = applications.filter((a) => a.status === 'Institute_Verified').length;
  const approvedQueueCount = applications.filter((a) => a.status === 'Officer_Approved').length;
  const disbursedCount = applications.filter((a) => a.status === 'PFMS_Disbursed').length;

  const totalDisbursedInr = applications
    .filter((a) => a.status === 'PFMS_Disbursed')
    .reduce((sum, item) => sum + item.grantAmountInr, 0);

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
                {isGu ? 'જિલ્લા અધિકારી મંચ' : 'District Officer Portal'}
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
                <Landmark className="w-8 h-8 text-saffron" />
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight">Sanjaykumar D. Mehta, GAS</h1>
                  <span className="px-2.5 py-0.5 rounded-pill bg-warm-ivory/20 border border-warm-ivory/30 text-[11px] font-semibold">
                    GOV-GJ-SUR-4821
                  </span>
                  <span className="px-2.5 py-0.5 rounded-pill bg-saffron/30 border border-saffron/40 text-[11px] font-bold text-warm-ivory">
                    {activeDistrict} District Jurisdiction
                  </span>
                </div>
                <p className="mt-1 text-xs sm:text-sm text-warm-ivory/80">
                  District Social Welfare Officer (DSWO) · Department of Social Justice & Empowerment
                </p>
                <div className="mt-2.5 flex items-center gap-3 text-xs text-warm-ivory/70">
                  <span>Authorized PFMS DBT Disbursing Officer</span>
                  <span>•</span>
                  <span>Digital Gujarat Sanction Authority</span>
                </div>
              </div>
            </div>

            {/* District jurisdiction switcher */}
            <div className="bg-warm-ivory/10 border border-warm-ivory/20 p-2.5 rounded-2xl flex items-center gap-2 self-start md:self-center">
              <span className="text-xs text-warm-ivory/80 font-bold whitespace-nowrap">District:</span>
              <select
                value={activeDistrict}
                onChange={(e) => setActiveDistrict(e.target.value)}
                className="bg-forest-green text-warm-ivory text-xs font-bold rounded-xl px-2.5 py-1.5 border border-warm-ivory/30 focus:outline-none"
              >
                {GUJARAT_DISTRICTS.slice(0, 8).map((d) => (
                  <option key={d.en} value={d.en}>
                    {d.en} ({d.gu})
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div className="bg-warm-ivory p-5 rounded-3xl border border-warm-border shadow-card flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-muted-text">
                {isGu ? 'મંજૂરી બાકી' : 'Awaiting Sanction'}
              </span>
              <p className="text-xl font-extrabold text-amber-800">{pendingOfficerCount}</p>
            </div>
          </div>

          <div className="bg-warm-ivory p-5 rounded-3xl border border-warm-border shadow-card flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-blue-100 text-blue-800 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-muted-text">
                {isGu ? 'PFMS કતારમાં' : 'Queued for PFMS'}
              </span>
              <p className="text-xl font-extrabold text-blue-800">{approvedQueueCount}</p>
            </div>
          </div>

          <div className="bg-warm-ivory p-5 rounded-3xl border border-warm-border shadow-card flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-muted-text">
                {isGu ? 'સહાય જમા થયેલ' : 'DBT Disbursed'}
              </span>
              <p className="text-xl font-extrabold text-emerald-800">{disbursedCount}</p>
            </div>
          </div>

          <div className="bg-warm-ivory p-5 rounded-3xl border border-warm-border shadow-card flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-forest-green text-warm-ivory flex items-center justify-center shrink-0">
              <CreditCard className="w-5 h-5 text-saffron" />
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-muted-text">
                {isGu ? 'કુલ ફાળવાયેલ સહાય' : 'Total Disbursed'}
              </span>
              <p className="text-xl font-extrabold text-forest-green">₹{(totalDisbursedInr / 100000).toFixed(2)} L</p>
            </div>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-warm-border gap-6 text-xs sm:text-sm font-bold">
          <button
            type="button"
            onClick={() => setActiveTab('queue')}
            className={`pb-3 border-b-2 transition-colors flex items-center gap-1.5 ${
              activeTab === 'queue'
                ? 'border-forest-green text-forest-green'
                : 'border-transparent text-muted-text hover:text-charcoal'
            }`}
          >
            <FileCheck className="w-4 h-4" />
            <span>{isGu ? `અરજી ચકાસણી અને મંજૂરી (${pendingOfficerCount})` : `Application Scrutiny & Sanction (${pendingOfficerCount})`}</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('pfms_release')}
            className={`pb-3 border-b-2 transition-colors flex items-center gap-1.5 ${
              activeTab === 'pfms_release'
                ? 'border-forest-green text-forest-green'
                : 'border-transparent text-muted-text hover:text-charcoal'
            }`}
          >
            <Send className="w-4 h-4" />
            <span>{isGu ? `PFMS ડીબીટી બેચ રિલીઝ (${approvedQueueCount})` : `PFMS DBT Batch Release Gateway (${approvedQueueCount})`}</span>
          </button>
        </div>

        {/* TAB 1: Queue */}
        {activeTab === 'queue' && (
          <div className="bg-warm-ivory rounded-3xl border border-warm-border shadow-card overflow-hidden">
            <div className="p-5 border-b border-warm-border flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <h3 className="font-extrabold text-base text-charcoal">
                {isGu ? 'સંસ્થા દ્વારા ચકાસાયેલ અરજીઓ (Awaiting District Officer Sanction)' : 'Institute-Endorsed Applications Requiring Sanction'}
              </h3>
              <div className="relative w-full sm:w-64">
                <Search className="w-4 h-4 text-muted-text absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Filter student..."
                  className="w-full pl-9 pr-3 py-1.5 rounded-xl border border-warm-border text-xs focus:outline-none"
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-warm-border bg-sage-green/30 text-muted-text uppercase font-bold text-[11px]">
                    <th className="py-3 px-4">Application #</th>
                    <th className="py-3 px-4">Student & Domicile</th>
                    <th className="py-3 px-4">Scheme & Sanction Amount</th>
                    <th className="py-3 px-4">Endorsing Institute</th>
                    <th className="py-3 px-4">Institute Remarks</th>
                    <th className="py-3 px-4 text-right">Officer Sanction</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-warm-border/60">
                  {filteredApps.map((app) => (
                    <tr key={app.id} className="hover:bg-sage-green/15 transition-colors">
                      <td className="py-3 px-4 font-mono font-bold text-forest-green">
                        {app.applicationNumber}
                      </td>
                      <td className="py-3 px-4">
                        <span className="font-bold text-charcoal block">{app.studentName}</span>
                        <span className="text-[11px] text-muted-text">{app.studentCategory} · {app.district}</span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="font-semibold text-charcoal block">{app.schemeTitleEn}</span>
                        <span className="text-forest-green font-extrabold text-xs">
                          ₹{app.grantAmountInr.toLocaleString('en-IN')}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-muted-text">
                        {app.instituteName}
                      </td>
                      <td className="py-3 px-4 text-[11px] text-muted-text max-w-xs truncate">
                        {app.instituteRemarks || 'Endorsed by Principal'}
                      </td>
                      <td className="py-3 px-4 text-right">
                        {app.status === 'Institute_Verified' ? (
                          <button
                            type="button"
                            onClick={() => handleApprove(app)}
                            className="btn-primary px-3 py-1.5 rounded-pill text-xs font-bold inline-flex items-center gap-1"
                          >
                            <Check className="w-3.5 h-3.5" />
                            <span>Sanction</span>
                          </button>
                        ) : (
                          <span className="px-2.5 py-0.5 rounded-pill text-[10px] font-bold bg-stone-100 text-stone-700">
                            {app.status.replace('_', ' ')}
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 2: PFMS DBT Gateway Release */}
        {activeTab === 'pfms_release' && (
          <div className="bg-warm-ivory rounded-3xl border border-warm-border shadow-card p-6 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-warm-border">
              <div>
                <h3 className="font-extrabold text-base text-charcoal">Public Financial Management System (PFMS) Gateway</h3>
                <p className="text-xs text-muted-text mt-0.5">
                  Execute Direct Benefit Transfer (DBT) release batches for all officer-sanctioned student welfare grants.
                </p>
              </div>

              <button
                type="button"
                disabled={isPfmsDispatching || approvedQueueCount === 0}
                onClick={handleTriggerBatchDisbursement}
                className="btn-primary px-5 py-2.5 rounded-pill text-xs font-bold inline-flex items-center gap-2 disabled:opacity-50"
              >
                {isPfmsDispatching ? (
                  <>
                    <div className="w-4 h-4 border-2 border-warm-ivory border-t-transparent rounded-full animate-spin" />
                    <span>Transmitting to RBI...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 text-saffron" />
                    <span>Dispatch PFMS Batch ({approvedQueueCount} Students)</span>
                  </>
                )}
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-sage-green/30 border border-warm-border">
                <span className="text-[11px] font-bold uppercase tracking-wider text-muted-text block mb-1">
                  PFMS Integration Parameters
                </span>
                <ul className="text-xs space-y-1 text-charcoal">
                  <li><strong>Gateway Protocol:</strong> HTTPS / SFTP / PFMS-RBI Direct Connect</li>
                  <li><strong>Active Bank Server:</strong> State Bank of India & Bank of Baroda DBT Switch</li>
                  <li><strong>Encryption Standard:</strong> 2048-bit Digital Signature (DSC) Class-3</li>
                  <li><strong>Reconciliation Mode:</strong> Automated RBI Clearance Acknowledgement</li>
                </ul>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200">
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 block mb-1">
                  Ready for Disbursement Batch
                </span>
                <p className="text-xl font-extrabold text-emerald-950">
                  {approvedQueueCount} Applications Sanctioned
                </p>
                <p className="text-xs text-emerald-800 mt-1">
                  Clicking &ldquo;Dispatch PFMS Batch&rdquo; will debit the state scholarship allocation and transfer funds directly into students&rsquo; bank accounts.
                </p>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Modal: Sanction Dialog */}
      {showSanctionModal && selectedApp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-charcoal/45 p-4 backdrop-blur-sm">
          <div className="bg-warm-ivory rounded-3xl border border-warm-border p-6 max-w-lg w-full shadow-glass-hover space-y-4">
            <div className="pb-3 border-b border-warm-border">
              <span className="text-[11px] font-bold text-forest-green uppercase">Government Welfare Sanction</span>
              <h3 className="font-extrabold text-base text-charcoal">{selectedApp.studentName}</h3>
              <p className="text-xs text-muted-text">{selectedApp.applicationNumber} · {selectedApp.district}</p>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 bg-sage-green/30 rounded-2xl border border-warm-border/60">
                <span className="font-bold text-charcoal block mb-1">Sanction Summary:</span>
                <div className="space-y-1 text-muted-text">
                  <p><strong>Scheme:</strong> {selectedApp.schemeTitleEn}</p>
                  <p><strong>Approved Grant:</strong> ₹{selectedApp.grantAmountInr.toLocaleString('en-IN')}</p>
                  <p><strong>Beneficiary Bank:</strong> {selectedApp.bankIfsc || 'SBIN0001234'} ({selectedApp.bankAccountMasked || '••••4829'})</p>
                </div>
              </div>

              <div>
                <label className="block font-bold text-charcoal mb-1">Official Sanction Endorsement Remarks</label>
                <textarea
                  rows={3}
                  value={officerRemarks}
                  onChange={(e) => setOfficerRemarks(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-warm-border bg-warm-ivory text-xs focus:ring-2 focus:ring-forest-green/20"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowSanctionModal(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-charcoal hover:bg-sage-green/60"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmSanction}
                className="btn-primary px-5 py-2 rounded-xl text-xs font-bold"
              >
                Sign & Authorize Grant
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-warm-border bg-warm-ivory/60 py-3 text-center text-xs text-muted-text">
        <div className="mx-auto max-w-7xl px-4 flex flex-col sm:flex-row items-center justify-between gap-1">
          <span>{isGu ? 'વિદ્યા પ્રગતિ સેતુ · સરકારી કલ્યાણ મંજૂરી પોર્ટલ' : 'Vidya Pragati Setu · District Officer Welfare Gateway'}</span>
          <span>© {new Date().getFullYear()}</span>
        </div>
      </footer>
    </div>
  );
};

export default OfficerDashboard;
