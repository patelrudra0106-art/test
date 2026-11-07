import React, { useState } from 'react';
import {
  ArrowLeft,
  Eye,
  EyeOff,
  Lock,
  Mail,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Building2,
  GraduationCap,
  Sparkles,
  RefreshCw,
  KeyRound,
  FileCheck,
  Landmark,
} from 'lucide-react';
import { Language } from '../data/schemes';

export type UserRole = 'Student' | 'Institute' | 'District Officer' | 'Admin';

interface LoginPageProps {
  initialLanguage?: Language;
  onNavigateHome?: () => void;
  onNavigateSignUp?: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({
  initialLanguage = 'en',
  onNavigateHome,
  onNavigateSignUp,
}) => {
  const [language, setLanguage] = useState<Language>(initialLanguage);
  const isGu = language === 'gu';

  const [activeRole, setActiveRole] = useState<UserRole>('Student');
  const [loginMethod, setLoginMethod] = useState<'password' | 'otp'>('password');

  // Form states
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [otpCode, setOtpCode] = useState(['', '', '', '', '', '']);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [otpCountdown, setOtpCountdown] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  // Status & feedback
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotSubmitted, setForgotSubmitted] = useState(false);

  // Handle Home Navigation
  const handleHomeClick = () => {
    if (onNavigateHome) {
      onNavigateHome();
    } else {
      window.history.pushState({}, '', '/');
      window.dispatchEvent(new PopStateEvent('popstate'));
    }
  };

  // Handle SignUp Navigation
  const handleSignUpClick = () => {
    if (onNavigateSignUp) {
      onNavigateSignUp();
    } else {
      window.history.pushState({}, '', '/signup');
      window.dispatchEvent(new PopStateEvent('popstate'));
    }
  };

  // Demo autofill
  const handleAutofill = (role: UserRole) => {
    setActiveRole(role);
    setLoginMethod('password');
    setErrorMsg(null);
    setSuccessMsg(null);

    switch (role) {
      case 'Student':
        setIdentifier('priya.patel@gujarat.edu');
        setPassword('VidyaPass@2026');
        break;
      case 'Institute':
        setIdentifier('AISHE-GJ-48291@ldce.ac.in');
        setPassword('CollegePortal#2026');
        break;
      case 'District Officer':
        setIdentifier('officer.surat@gujarat.gov.in');
        setPassword('DistOfficer$2026');
        break;
      case 'Admin':
        setIdentifier('admin.vps@gujarat.gov.in');
        setPassword('SuperAdmin@VPS2026');
        break;
    }
  };

  // OTP send handler
  const handleSendOtp = () => {
    if (!mobileNumber || mobileNumber.replace(/\D/g, '').length !== 10) {
      setErrorMsg(isGu ? 'કૃપા કરીને માન્ય ૧૦-અંકનો મોબાઇલ નંબર દાખલ કરો.' : 'Please enter a valid 10-digit mobile number.');
      return;
    }
    setErrorMsg(null);
    setIsOtpSent(true);
    setOtpCountdown(45);
    const interval = setInterval(() => {
      setOtpCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleOtpChange = (index: number, val: string) => {
    if (!/^\d*$/.test(val)) return;
    const newOtp = [...otpCode];
    newOtp[index] = val.slice(-1);
    setOtpCode(newOtp);

    // auto advance
    if (val && index < 5) {
      const nextInput = document.getElementById(`otp-box-${index + 1}`);
      nextInput?.focus();
    }
  };

  // Form submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    if (loginMethod === 'password') {
      if (!identifier.trim()) {
        setErrorMsg(isGu ? 'કૃપા કરીને ઇમેઇલ, મોબાઇલ અથવા યુઝર આઈડી દાખલ કરો.' : 'Please enter your email, mobile number or User ID.');
        return;
      }
      if (!password) {
        setErrorMsg(isGu ? 'કૃપા કરીને પાસવર્ડ દાખલ કરો.' : 'Please enter your password.');
        return;
      }
    } else {
      const fullOtp = otpCode.join('');
      if (!isOtpSent) {
        setErrorMsg(isGu ? 'પ્રથમ ઓટીપી મોકલો પર ક્લિક કરો.' : 'Please click "Send OTP" first.');
        return;
      }
      if (fullOtp.length !== 6) {
        setErrorMsg(isGu ? 'કૃપા કરીને ૬-અંકનો ઓટીપી દાખલ કરો.' : 'Please enter the 6-digit OTP code.');
        return;
      }
    }

    setIsLoading(true);

    try {
      // Simulation or backend endpoint
      await new Promise((resolve) => setTimeout(resolve, 800));

      const fakeUser = {
        role: activeRole,
        identifier: loginMethod === 'password' ? identifier : `+91 ${mobileNumber}`,
        loginTime: new Date().toISOString(),
      };
      localStorage.setItem('vps_authenticated_user', JSON.stringify(fakeUser));

      setSuccessMsg(
        isGu
          ? `સફળ પ્રવેશ! આપનું સ્વાગત છે (${activeRole}). પોર્ટલ તૈયાર થઈ રહ્યું છે...`
          : `Login successful! Welcome back, ${activeRole}. Redirecting to dashboard...`
      );

      const targetPath =
        activeRole === 'Admin'
          ? '/dashboard/admin'
          : activeRole === 'Institute'
          ? '/dashboard/institute'
          : activeRole === 'District Officer'
          ? '/dashboard/officer'
          : '/user-home';

      setTimeout(() => {
        window.history.pushState({}, '', targetPath);
        window.dispatchEvent(new PopStateEvent('popstate'));
      }, 1200);
    } catch {
      setErrorMsg(isGu ? 'પ્રવેશ કરવામાં ભૂલ આવી. કૃપા કરીને ફરી પ્રયાસ કરો.' : 'Login failed. Please verify credentials and try again.');
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

      {/* Main Content Area */}
      <main className="flex-1 flex items-center justify-center py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-xl">
          {/* Main Card */}
          <div className="bg-warm-ivory rounded-3xl border border-warm-border shadow-card overflow-hidden">
            {/* Header Banner */}
            <div className="bg-gradient-to-r from-forest-green via-[#1E4A35] to-[#163828] text-warm-ivory p-6 sm:p-7 relative overflow-hidden">
              <div className="absolute right-0 top-0 translate-x-6 -translate-y-6 w-36 h-36 rounded-full bg-saffron/15 blur-2xl pointer-events-none" />
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-pill bg-warm-ivory/15 border border-warm-ivory/20 text-[11px] font-semibold text-warm-ivory tracking-wider uppercase mb-3">
                <ShieldCheck className="w-3.5 h-3.5 text-saffron" aria-hidden="true" />
                <span>{isGu ? 'સત્તાવાર શિષ્યવૃત્તિ અને ડીબીટી પોર્ટલ' : 'Official Portal Access · DBT Gateway'}</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                {isGu ? 'ખાતામાં પ્રવેશ કરો' : 'Sign In to Your Account'}
              </h1>
              <p className="mt-1.5 text-xs sm:text-sm text-warm-ivory/80 leading-relaxed">
                {isGu
                  ? 'ગુજરાતના વિદ્યાર્થીઓ, સંસ્થાઓ અને અધિકારીઓ માટે એકીકૃત શિક્ષણ સહાય પોર્ટલ'
                  : 'Unified portal for Gujarat students, educational institutes, and district officers.'}
              </p>
            </div>

            {/* Role Tabs */}
            <div className="p-4 sm:p-6 bg-sage-green/30 border-b border-warm-border">
              <label className="block text-[11px] font-bold uppercase tracking-wider text-muted-text mb-2.5">
                {isGu ? 'આપનો વપરાશકર્તા પ્રકાર પસંદ કરો' : 'Select Account Role'}
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {(
                  [
                    { id: 'Student', en: 'Student', gu: 'વિદ્યાર્થી', icon: GraduationCap },
                    { id: 'Institute', en: 'Institute', gu: 'સંસ્થા', icon: Building2 },
                    { id: 'District Officer', en: 'Officer', gu: 'અધિકારી', icon: Landmark },
                    { id: 'Admin', en: 'Admin', gu: 'સંચાલક', icon: ShieldCheck },
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
                      className={`flex flex-col items-center justify-center gap-1.5 py-2.5 px-2 rounded-2xl border text-center transition-all ${
                        isSelected
                          ? 'bg-forest-green text-warm-ivory border-forest-green shadow-sm font-bold scale-[1.02]'
                          : 'bg-warm-ivory text-charcoal border-warm-border hover:bg-sage-green/60 font-semibold'
                      }`}
                    >
                      <Icon className={`w-4 h-4 ${isSelected ? 'text-saffron' : 'text-forest-green'}`} aria-hidden="true" />
                      <span className="text-[12px] truncate w-full">
                        {isGu ? roleItem.gu : roleItem.en}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Quick Fill Demo Helper Pill */}
              <div className="mt-3.5 flex items-center justify-between flex-wrap gap-2 pt-2 border-t border-warm-border/60 text-xs">
                <span className="text-[11px] text-muted-text flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-saffron" aria-hidden="true" />
                  <span>{isGu ? 'ટેસ્ટિંગ માટે ઝડપી ભરો:' : 'Quick demo autofill:'}</span>
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

            {/* Form Container */}
            <div className="p-6 sm:p-7">
              {/* Method Switcher for Student */}
              {activeRole === 'Student' && (
                <div className="flex rounded-pill bg-sage-green/45 p-1 mb-5 border border-warm-border">
                  <button
                    type="button"
                    onClick={() => {
                      setLoginMethod('password');
                      setErrorMsg(null);
                    }}
                    className={`flex-1 py-1.5 rounded-pill text-xs font-semibold transition-all ${
                      loginMethod === 'password'
                        ? 'bg-warm-ivory text-forest-green shadow-sm'
                        : 'text-muted-text hover:text-charcoal'
                    }`}
                  >
                    {isGu ? 'પાસવર્ડ દ્વારા પ્રવેશ' : 'Password Login'}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setLoginMethod('otp');
                      setErrorMsg(null);
                    }}
                    className={`flex-1 py-1.5 rounded-pill text-xs font-semibold transition-all ${
                      loginMethod === 'otp'
                        ? 'bg-warm-ivory text-forest-green shadow-sm'
                        : 'text-muted-text hover:text-charcoal'
                    }`}
                  >
                    {isGu ? 'મોબાઇલ ઓટીપી દ્વારા પ્રવેશ' : 'Mobile OTP Login'}
                  </button>
                </div>
              )}

              {/* Feedback Alert Messages */}
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

              {/* Actual Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {loginMethod === 'password' ? (
                  <>
                    {/* Identifier */}
                    <div>
                      <label htmlFor="login-id" className="block text-xs font-bold text-charcoal mb-1.5">
                        {activeRole === 'Student'
                          ? isGu
                            ? 'ઇમેઇલ / મોબાઇલ / વિદ્યાર્થી ઓળખપત્ર'
                            : 'Email, Mobile, or Student ID'
                          : activeRole === 'Institute'
                          ? isGu
                            ? 'AISHE / DISE કોડ અથવા અધિકૃત ઇમેઇલ'
                            : 'AISHE / DISE Code or Official Email'
                          : isGu
                          ? 'સરકારી ઇમેઇલ (@gujarat.gov.in)'
                          : 'Government Email (@gujarat.gov.in)'}
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-muted-text">
                          <Mail className="w-4 h-4" aria-hidden="true" />
                        </div>
                        <input
                          id="login-id"
                          type="text"
                          value={identifier}
                          onChange={(e) => setIdentifier(e.target.value)}
                          placeholder={
                            activeRole === 'Student'
                              ? isGu
                                ? 'દા.ત. priya.patel@gujarat.edu અથવા 9876543210'
                                : 'e.g. priya.patel@gujarat.edu or 9876543210'
                              : activeRole === 'Institute'
                              ? 'e.g. AISHE-GJ-48291@ldce.ac.in'
                              : 'e.g. officer.surat@gujarat.gov.in'
                          }
                          className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-warm-border bg-warm-ivory text-sm text-charcoal placeholder:text-muted-text/60 focus:outline-none focus:ring-2 focus:ring-forest-green/20 focus:border-forest-green"
                        />
                      </div>
                    </div>

                    {/* Password */}
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label htmlFor="login-password" className="block text-xs font-bold text-charcoal">
                          {isGu ? 'પાસવર્ડ' : 'Password'}
                        </label>
                        <button
                          type="button"
                          onClick={() => setShowForgotModal(true)}
                          className="text-[11px] font-semibold text-forest-green hover:underline decoration-forest-green/50"
                        >
                          {isGu ? 'પાસવર્ડ ભૂલી ગયા?' : 'Forgot password?'}
                        </button>
                      </div>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-muted-text">
                          <Lock className="w-4 h-4" aria-hidden="true" />
                        </div>
                        <input
                          id="login-password"
                          type={showPassword ? 'text' : 'password'}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="••••••••••••"
                          className="w-full pl-10 pr-11 py-2.5 rounded-2xl border border-warm-border bg-warm-ivory text-sm text-charcoal placeholder:text-muted-text/60 focus:outline-none focus:ring-2 focus:ring-forest-green/20 focus:border-forest-green"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-muted-text hover:text-charcoal"
                          aria-label={showPassword ? 'Hide password' : 'Show password'}
                        >
                          {showPassword ? (
                            <EyeOff className="w-4 h-4" aria-hidden="true" />
                          ) : (
                            <Eye className="w-4 h-4" aria-hidden="true" />
                          )}
                        </button>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    {/* Mobile Number for OTP */}
                    <div>
                      <label htmlFor="login-mobile" className="block text-xs font-bold text-charcoal mb-1.5">
                        {isGu ? 'નોંધાયેલ મોબાઇલ નંબર' : 'Registered Mobile Number'}
                      </label>
                      <div className="flex gap-2">
                        <div className="relative flex-1">
                          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-muted-text text-xs font-semibold">
                            <span>+91</span>
                          </div>
                          <input
                            id="login-mobile"
                            type="tel"
                            maxLength={10}
                            value={mobileNumber}
                            onChange={(e) => setMobileNumber(e.target.value.replace(/\D/g, ''))}
                            placeholder="9876543210"
                            className="w-full pl-12 pr-4 py-2.5 rounded-2xl border border-warm-border bg-warm-ivory text-sm text-charcoal placeholder:text-muted-text/60 focus:outline-none focus:ring-2 focus:ring-forest-green/20 focus:border-forest-green"
                          />
                        </div>
                        <button
                          type="button"
                          onClick={handleSendOtp}
                          disabled={otpCountdown > 0 || mobileNumber.length !== 10}
                          className="btn-secondary px-4 py-2.5 rounded-2xl text-xs font-semibold disabled:opacity-50 shrink-0"
                        >
                          {otpCountdown > 0 ? `${otpCountdown}s` : isGu ? 'ઓટીપી મોકલો' : 'Send OTP'}
                        </button>
                      </div>
                    </div>

                    {/* 6 Digit OTP input */}
                    {isOtpSent && (
                      <div className="pt-2">
                        <label className="block text-xs font-bold text-charcoal mb-2">
                          {isGu ? '૬-અંકનો ઓટીપી દાખલ કરો' : 'Enter 6-Digit OTP'}
                        </label>
                        <div className="flex justify-between gap-1.5 sm:gap-2">
                          {otpCode.map((digit, idx) => (
                            <input
                              key={idx}
                              id={`otp-box-${idx}`}
                              type="text"
                              inputMode="numeric"
                              maxLength={1}
                              value={digit}
                              onChange={(e) => handleOtpChange(idx, e.target.value)}
                              className="w-10 h-12 sm:w-12 sm:h-12 text-center text-lg font-bold rounded-xl border border-warm-border bg-warm-ivory text-charcoal focus:ring-2 focus:ring-forest-green focus:border-forest-green focus:outline-none"
                            />
                          ))}
                        </div>
                        <p className="mt-2 text-[11px] text-muted-text">
                          {isGu
                            ? 'ડેમો હેતુ: કોઈપણ ૬ અંક દાખલ કરો (દા.ત. 123456)'
                            : 'Demo mode: enter any 6 digits (e.g. 123456)'}
                        </p>
                      </div>
                    )}
                  </>
                )}

                {/* Remember Me */}
                <div className="flex items-center justify-between pt-1">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-4 h-4 rounded text-forest-green focus:ring-forest-green border-warm-border"
                    />
                    <span className="text-xs text-charcoal font-medium">
                      {isGu ? 'આ ઉપકરણ પર યાદ રાખો' : 'Remember me on this device'}
                    </span>
                  </label>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full btn-primary py-3 rounded-2xl text-sm font-bold flex items-center justify-center gap-2 mt-4 cursor-pointer"
                >
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-warm-ivory border-t-transparent rounded-full animate-spin" />
                      <span>{isGu ? 'પ્રમાણીકરણ ચાલુ છે...' : 'Authenticating...'}</span>
                    </>
                  ) : (
                    <>
                      <KeyRound className="w-4 h-4" aria-hidden="true" />
                      <span>{isGu ? 'પોર્ટલમાં પ્રવેશ કરો' : 'Sign In to Portal'}</span>
                    </>
                  )}
                </button>
              </form>

              {/* Bottom Sign-Up Link */}
              <div className="mt-6 pt-5 border-t border-warm-border/70 text-center">
                <p className="text-xs sm:text-sm text-charcoal">
                  {isGu ? 'ખાતું નથી? ' : "Don't have an account? "}
                  <button
                    type="button"
                    onClick={handleSignUpClick}
                    className="font-bold text-forest-green hover:underline decoration-forest-green decoration-2 underline-offset-2 ml-1"
                  >
                    {isGu ? 'નવું ખાતું બનાવો (Sign Up)' : 'Register Now (Sign Up)'}
                  </button>
                </p>
              </div>
            </div>
          </div>

          {/* Security & Regulatory Footer Note */}
          <div className="mt-6 text-center space-y-1.5 px-4 text-[11px] text-muted-text">
            <p className="flex items-center justify-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-forest-green" aria-hidden="true" />
              <span>
                {isGu
                  ? 'ડિજિટલ પર્સનલ ડેટા પ્રોટેક્શન (DPDP) એક્ટ ૨૦૨૫ અનુરૂપ અને એન્ક્રિપ્ટેડ'
                  : 'Secured via 256-bit encryption · DPDP Act 2025 compliant'}
              </span>
            </p>
            <p>
              {isGu
                ? 'કોઈપણ સંજોગોમાં આપનો પાસવર્ડ અથવા બેંક OTP કોઈની પણ સાથે શેર કરશો નહીં.'
                : 'Never share your password or bank OTP with anyone.'}
            </p>
          </div>
        </div>
      </main>

      {/* Forgot Password Modal */}
      {showForgotModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-charcoal/45 p-4 backdrop-blur-sm">
          <div className="bg-warm-ivory rounded-3xl border border-warm-border p-6 max-w-md w-full shadow-glass-hover">
            <div className="flex items-center gap-2.5 text-forest-green mb-3">
              <FileCheck className="w-5 h-5 text-saffron" aria-hidden="true" />
              <h3 className="font-extrabold text-base text-charcoal">
                {isGu ? 'પાસવર્ડ પુનઃપ્રાપ્તિ' : 'Reset Your Password'}
              </h3>
            </div>
            {forgotSubmitted ? (
              <div className="space-y-3">
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-2xl text-xs text-emerald-800">
                  {isGu
                    ? `પાસવર્ડ પુનઃપ્રાપ્તિ લિંક ${forgotEmail} પર મોકલી દેવામાં આવી છે.`
                    : `Password reset instructions have been dispatched to ${forgotEmail}.`}
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setShowForgotModal(false);
                    setForgotSubmitted(false);
                  }}
                  className="w-full btn-primary py-2 rounded-xl text-xs font-bold"
                >
                  {isGu ? 'બંધ કરો' : 'Close'}
                </button>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (forgotEmail) setForgotSubmitted(true);
                }}
                className="space-y-3"
              >
                <p className="text-xs text-muted-text leading-relaxed">
                  {isGu
                    ? 'આપનો નોંધાયેલ ઇમેઇલ દાખલ કરો. અમે ચકાસણી લિંક મોકલીશું.'
                    : 'Enter your registered email address and we will send you a reset link.'}
                </p>
                <input
                  type="email"
                  required
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                  placeholder="name@gujarat.edu"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-warm-border bg-warm-ivory text-xs text-charcoal focus:outline-none focus:ring-2 focus:ring-forest-green/20"
                />
                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowForgotModal(false)}
                    className="px-4 py-2 rounded-xl text-xs font-semibold text-charcoal hover:bg-sage-green/60"
                  >
                    {isGu ? 'રદ કરો' : 'Cancel'}
                  </button>
                  <button type="submit" className="btn-primary px-4 py-2 rounded-xl text-xs font-bold">
                    {isGu ? 'લિંક મોકલો' : 'Send Link'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

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

export default LoginPage;
