import React, { useState, useEffect } from 'react';
import {
  ShieldCheck,
  ArrowLeft,
  LogOut,
  Users,
  Layers,
  Search,
  Database,
  TrendingUp,
  PlusCircle,
  CheckCircle2,
} from 'lucide-react';
import { Language, SchemeItem, getStoredSchemes } from '../data/schemes';
import { getStoredApplications } from '../data/portalData';
import { AdminAddSchemeModal } from '../components/AdminAddSchemeModal';

interface AdminDashboardProps {
  initialLanguage?: Language;
  onNavigateHome?: () => void;
  onSignOut?: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  initialLanguage = 'en',
  onNavigateHome,
  onSignOut,
}) => {
  const [language, setLanguage] = useState<Language>(initialLanguage);
  const isGu = language === 'gu';

  const [activeTab, setActiveTab] = useState<'overview' | 'districts' | 'schemes' | 'users' | 'audit'>('overview');
  const [userSearch, setUserSearch] = useState('');
  const [schemes, setSchemes] = useState<SchemeItem[]>(() => getStoredSchemes());
  const [showAddSchemeModal, setShowAddSchemeModal] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    const handleUpdate = () => setSchemes(getStoredSchemes());
    window.addEventListener('vps_schemes_updated', handleUpdate);
    return () => window.removeEventListener('vps_schemes_updated', handleUpdate);
  }, []);

  const applications = getStoredApplications();

  // District analytics mock
  const districtData = [
    { name: 'Ahmedabad', applicants: 4890, disbursedCr: 21.4, sanctionRate: '94.2%' },
    { name: 'Surat', applicants: 4120, disbursedCr: 18.2, sanctionRate: '92.8%' },
    { name: 'Vadodara', applicants: 2840, disbursedCr: 12.6, sanctionRate: '91.5%' },
    { name: 'Rajkot', applicants: 2310, disbursedCr: 10.1, sanctionRate: '89.4%' },
    { name: 'Bhavnagar', applicants: 1420, disbursedCr: 6.8, sanctionRate: '88.1%' },
    { name: 'Dahod', applicants: 1680, disbursedCr: 7.9, sanctionRate: '96.2%' },
    { name: 'Banaskantha', applicants: 1190, disbursedCr: 5.4, sanctionRate: '87.5%' },
    { name: 'Kutch', applicants: 920, disbursedCr: 4.1, sanctionRate: '86.0%' },
  ];

  const registeredUsers = [
    { name: 'Priya Rajeshbhai Patel', email: 'priya.patel@gujarat.edu', role: 'Student', district: 'Surat', status: 'Active' },
    { name: 'Aarav Vinodbhai Solanki', email: 'aarav.solanki@gujarat.edu', role: 'Student', district: 'Ahmedabad', status: 'Active' },
    { name: 'L.D. College of Engineering', email: 'admin.office@ldce.ac.in', role: 'Institute', district: 'Ahmedabad', status: 'Verified' },
    { name: 'Government Engineering College, Surat', email: 'principal@gecsurat.ac.in', role: 'Institute', district: 'Surat', status: 'Verified' },
    { name: 'Sanjaykumar D. Mehta, GAS', email: 'officer.surat@gujarat.gov.in', role: 'District Officer', district: 'Surat', status: 'Active' },
    { name: 'Dr. Minaxiben R. Trivedi, GAS', email: 'officer.ahmedabad@gujarat.gov.in', role: 'District Officer', district: 'Ahmedabad', status: 'Active' },
    { name: 'State IT & Welfare Administrator', email: 'admin.vps@gujarat.gov.in', role: 'Admin', district: 'Gandhinagar', status: 'Active' },
  ];

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
              <span className="px-2 py-0.5 rounded-pill bg-forest-green text-[10px] font-bold text-warm-ivory uppercase">
                {isGu ? 'સંચાલક ડેશબોર્ડ' : 'Master Admin Console'}
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
                <ShieldCheck className="w-8 h-8 text-saffron" />
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight">State IT & Welfare Administration</h1>
                  <span className="px-2.5 py-0.5 rounded-pill bg-warm-ivory/20 border border-warm-ivory/30 text-[11px] font-semibold">
                    SuperAdmin
                  </span>
                  <span className="px-2.5 py-0.5 rounded-pill bg-saffron/30 border border-saffron/40 text-[11px] font-bold text-warm-ivory">
                    Swarnim Sankul · Gandhinagar
                  </span>
                </div>
                <p className="mt-1 text-xs sm:text-sm text-warm-ivory/80">
                  Government of Gujarat · Unified Student Financial Assistance & PFMS DBT Gateway
                </p>
                <div className="mt-2.5 flex items-center gap-3 text-xs text-warm-ivory/70">
                  <span>Database: PostgreSQL (Supabase Connected)</span>
                  <span>•</span>
                  <span>Oracle Studio Sync: Synchronized</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Master State Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div className="bg-warm-ivory p-5 rounded-3xl border border-warm-border shadow-card">
            <span className="text-[11px] font-bold uppercase tracking-wider text-muted-text">Total Applications</span>
            <p className="text-2xl font-extrabold text-charcoal mt-1">
              {(18870 + applications.length).toLocaleString('en-IN')}
            </p>
            <p className="text-[11px] text-emerald-700 font-semibold mt-1 flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>+14.2% this academic year</span>
            </p>
          </div>

          <div className="bg-warm-ivory p-5 rounded-3xl border border-warm-border shadow-card">
            <span className="text-[11px] font-bold uppercase tracking-wider text-muted-text">Total DBT Disbursed</span>
            <p className="text-2xl font-extrabold text-forest-green mt-1">₹ 84.60 Cr</p>
            <p className="text-[11px] text-muted-text mt-1">Directly into student bank accounts</p>
          </div>

          <div className="bg-warm-ivory p-5 rounded-3xl border border-warm-border shadow-card">
            <span className="text-[11px] font-bold uppercase tracking-wider text-muted-text">Verified Institutes</span>
            <p className="text-2xl font-extrabold text-charcoal mt-1">1,248</p>
            <p className="text-[11px] text-muted-text mt-1">AISHE & DISE registered</p>
          </div>

          <div className="bg-warm-ivory p-5 rounded-3xl border border-warm-border shadow-card">
            <span className="text-[11px] font-bold uppercase tracking-wider text-muted-text">Districts Covered</span>
            <p className="text-2xl font-extrabold text-charcoal mt-1">33 / 33</p>
            <p className="text-[11px] text-emerald-700 font-semibold mt-1">100% Gujarat Coverage</p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-warm-border gap-6 overflow-x-auto text-xs sm:text-sm font-bold">
          <button
            type="button"
            onClick={() => setActiveTab('overview')}
            className={`pb-3 border-b-2 transition-colors whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'overview' ? 'border-forest-green text-forest-green' : 'border-transparent text-muted-text hover:text-charcoal'
            }`}
          >
            <TrendingUp className="w-4 h-4" />
            <span>{isGu ? 'જિલ્લાવાર વિહંગાવલોકન (Districts)' : 'District Performance'}</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('schemes')}
            className={`pb-3 border-b-2 transition-colors whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'schemes' ? 'border-forest-green text-forest-green' : 'border-transparent text-muted-text hover:text-charcoal'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>{isGu ? 'યોજના બજેટ મેનેજમેન્ટ (Schemes)' : 'Scheme Master Catalog'}</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('users')}
            className={`pb-3 border-b-2 transition-colors whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'users' ? 'border-forest-green text-forest-green' : 'border-transparent text-muted-text hover:text-charcoal'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>{isGu ? 'વપરાશકર્તા નિર્દેશિકા (Users & Roles)' : 'User Directory'}</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('audit')}
            className={`pb-3 border-b-2 transition-colors whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'audit' ? 'border-forest-green text-forest-green' : 'border-transparent text-muted-text hover:text-charcoal'
            }`}
          >
            <Database className="w-4 h-4" />
            <span>{isGu ? 'ઓડિટ અને સિસ્ટમ સ્થિતિ (Audit Logs)' : 'Audit Logs & DB Sync'}</span>
          </button>
        </div>

        {/* TAB 1: District Performance */}
        {activeTab === 'overview' && (
          <div className="bg-warm-ivory rounded-3xl border border-warm-border shadow-card overflow-hidden">
            <div className="p-5 border-b border-warm-border">
              <h3 className="font-extrabold text-base text-charcoal">
                {isGu ? 'ગુજરાતના તમામ જિલ્લાઓમાં શિક્ષણ સહાય વિતરણ સ્થિતિ' : 'Statewide District Performance & Fund Utilization'}
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-warm-border bg-sage-green/30 text-muted-text uppercase font-bold text-[11px]">
                    <th className="py-3 px-4">District</th>
                    <th className="py-3 px-4">Total Applicants</th>
                    <th className="py-3 px-4">Disbursed Amount</th>
                    <th className="py-3 px-4">Approval Rate</th>
                    <th className="py-3 px-4">PFMS Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-warm-border/60">
                  {districtData.map((d) => (
                    <tr key={d.name} className="hover:bg-sage-green/15 transition-colors">
                      <td className="py-3 px-4 font-bold text-charcoal">{d.name}</td>
                      <td className="py-3 px-4">{d.applicants.toLocaleString('en-IN')}</td>
                      <td className="py-3 px-4 font-bold text-forest-green">₹ {d.disbursedCr} Cr</td>
                      <td className="py-3 px-4 font-semibold text-emerald-800">{d.sanctionRate}</td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-0.5 rounded-pill bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                          Active & Synchronized
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 2: Schemes Management */}
        {activeTab === 'schemes' && (
          <div className="space-y-4">
            <div className="bg-warm-ivory rounded-3xl border border-warm-border p-5 shadow-card flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="font-extrabold text-base text-charcoal">
                  {isGu ? `રાજ્ય કલ્યાણકારી યોજના નિર્દેશિકા (${schemes.length} સક્રિય)` : `State Welfare Schemes Directory (${schemes.length} Active)`}
                </h3>
                <p className="text-xs text-muted-text mt-0.5">
                  {isGu
                    ? 'નવી યોજનાઓ ઉમેરો અથવા ચાલુ યોજનાઓની વિગતો અને બજેટનું સંચાલન કરો.'
                    : 'Create and publish new government welfare initiatives live to the website.'}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowAddSchemeModal(true)}
                className="btn-primary px-4 py-2 rounded-pill text-xs font-bold inline-flex items-center gap-1.5 shadow-sm shrink-0 cursor-pointer"
              >
                <PlusCircle className="w-4 h-4 text-saffron" />
                <span>{isGu ? 'નવી યોજના ઉમેરો (Add Scheme)' : 'Add New Scheme'}</span>
              </button>
            </div>

            {schemes.map((scheme) => (
              <div key={scheme.id} className="bg-warm-ivory rounded-3xl border border-warm-border shadow-card p-5 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-mono text-xs font-bold text-forest-green px-2 py-0.5 rounded-lg bg-sage-green/50">
                      {scheme.code}
                    </span>
                    <span className="text-xs text-muted-text">· {scheme.departmentName}</span>
                    <span className="px-2 py-0.5 rounded-pill bg-sage-green/70 text-[10px] font-bold text-forest-green uppercase">
                      {isGu ? scheme.categoryTagGu : scheme.categoryTag}
                    </span>
                  </div>
                  <h4 className="font-extrabold text-base text-charcoal mt-1.5">
                    {isGu ? scheme.titleGu : scheme.title}
                  </h4>
                  <p className="text-xs text-muted-text mt-0.5">
                    {isGu ? scheme.descriptionGu : scheme.description}
                  </p>
                  <p className="text-[11px] text-forest-green font-semibold mt-1">
                    {isGu ? 'લાભ:' : 'Benefit:'} {isGu ? scheme.benefitSummaryGu : scheme.benefitSummary}
                  </p>
                </div>

                <div className="flex items-center gap-4 shrink-0">
                  <div className="text-right">
                    <span className="text-[11px] font-bold text-muted-text uppercase block">Status</span>
                    <span className="text-xs font-bold text-emerald-800">Published</span>
                  </div>
                  <span className="px-3 py-1 rounded-pill bg-emerald-100 text-emerald-900 text-xs font-bold border border-emerald-300">
                    Active
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 3: Users */}
        {activeTab === 'users' && (
          <div className="bg-warm-ivory rounded-3xl border border-warm-border shadow-card overflow-hidden">
            <div className="p-5 border-b border-warm-border flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <h3 className="font-extrabold text-base text-charcoal">Registered User Accounts & Access Control</h3>
              <div className="relative w-full sm:w-64">
                <Search className="w-4 h-4 text-muted-text absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={userSearch}
                  onChange={(e) => setUserSearch(e.target.value)}
                  placeholder="Search user..."
                  className="w-full pl-9 pr-3 py-1.5 rounded-xl border border-warm-border text-xs focus:outline-none"
                />
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-warm-border bg-sage-green/30 text-muted-text uppercase font-bold text-[11px]">
                    <th className="py-3 px-4">User Name</th>
                    <th className="py-3 px-4">Email</th>
                    <th className="py-3 px-4">Role</th>
                    <th className="py-3 px-4">District</th>
                    <th className="py-3 px-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-warm-border/60">
                  {registeredUsers
                    .filter((u) => u.name.toLowerCase().includes(userSearch.toLowerCase()) || u.role.toLowerCase().includes(userSearch.toLowerCase()))
                    .map((user, idx) => (
                      <tr key={idx} className="hover:bg-sage-green/15 transition-colors">
                        <td className="py-3 px-4 font-bold text-charcoal">{user.name}</td>
                        <td className="py-3 px-4 font-mono text-muted-text">{user.email}</td>
                        <td className="py-3 px-4">
                          <span className="px-2 py-0.5 rounded-pill bg-sage-green/70 text-forest-green font-bold text-[10px]">
                            {user.role}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-muted-text">{user.district}</td>
                        <td className="py-3 px-4">
                          <span className="px-2 py-0.5 rounded-pill bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                            {user.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 4: Audit Logs */}
        {activeTab === 'audit' && (
          <div className="bg-warm-ivory rounded-3xl border border-warm-border shadow-card p-6 space-y-4">
            <h3 className="font-extrabold text-base text-charcoal">System Audit Trail & Database Health</h3>
            <div className="p-4 rounded-2xl bg-stone-900 text-stone-200 font-mono text-xs space-y-2 overflow-x-auto">
              <p className="text-emerald-400">[2026-11-05 10:14:02 UTC] [AUTH] Clerk JWT Bearer Token verified for admin.vps@gujarat.gov.in</p>
              <p className="text-sky-400">[2026-11-05 10:15:30 UTC] [DB_SYNC] PostgreSQL Supabase synchronized: 4 tables, 18492 rows validated</p>
              <p className="text-amber-300">[2026-11-05 10:18:12 UTC] [PFMS_GATEWAY] RBI Settlement Batch ACK-RBI-SUR-994821 received (Status: RECONCILED)</p>
              <p className="text-stone-400">[2026-11-05 10:20:45 UTC] [SECURITY] Content Security Policy (CSP) & Rate Limiter active (0 violations)</p>
            </div>
          </div>
        )}
      </main>

      {/* Toast */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 bg-forest-green text-warm-ivory px-5 py-3 rounded-2xl shadow-glass-hover flex items-center gap-2.5 text-xs sm:text-sm font-semibold">
          <CheckCircle2 className="w-4 h-4 text-saffron shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Add Scheme Modal */}
      <AdminAddSchemeModal
        isOpen={showAddSchemeModal}
        onClose={() => setShowAddSchemeModal(false)}
        language={language}
        onSchemeAdded={(newScheme) => {
          setSchemes((prev) => [newScheme, ...prev.filter((s) => s.id !== newScheme.id)]);
          setToastMessage(
            isGu
              ? `નવી યોજના "${newScheme.titleGu}" સફળતાપૂર્વક વેબસાઇટ પર પ્રકાશિત કરવામાં આવી છે!`
              : `New scheme "${newScheme.title}" published live across the website!`
          );
          setTimeout(() => setToastMessage(null), 4500);
        }}
      />

      {/* Footer */}
      <footer className="border-t border-warm-border bg-warm-ivory/60 py-3 text-center text-xs text-muted-text">
        <div className="mx-auto max-w-7xl px-4 flex flex-col sm:flex-row items-center justify-between gap-1">
          <span>{isGu ? 'વિદ્યા પ્રગતિ સેતુ · રાજ્ય સરકાર કેન્દ્રીય નિયંત્રણ મંચ' : 'Vidya Pragati Setu · State Government Administration System'}</span>
          <span>© {new Date().getFullYear()}</span>
        </div>
      </footer>
    </div>
  );
};

export default AdminDashboard;
