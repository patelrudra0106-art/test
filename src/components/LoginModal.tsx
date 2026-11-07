import React, { useEffect } from 'react';
import { X, ShieldCheck } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { Language } from '../data/schemes';

export interface LoginModalProps { isOpen: boolean; onClose: () => void; language: Language; }

export const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, language }) => {
  const isGujarati = language === 'gu';
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => { if (event.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-charcoal/45 p-4 backdrop-blur-sm sm:p-6" role="dialog" aria-modal="true" aria-labelledby="login-modal-title">
          <motion.section initial={{ opacity: 0, scale: 0.96, y: 12 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.96, y: 12 }} transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }} className="glass-style-c w-full max-w-lg overflow-hidden rounded-glass-lg border border-warm-border bg-warm-ivory shadow-glass-hover">
            <div className="flex items-start justify-between gap-4 bg-forest-green px-6 py-5 text-warm-ivory">
              <div className="flex items-start gap-3"><ShieldCheck className="mt-1 h-5 w-5 shrink-0 text-saffron" aria-hidden="true" /><div><h2 id="login-modal-title" className="text-xl font-bold leading-snug">{isGujarati ? 'ખાતામાં પ્રવેશ' : 'Account Access'}</h2><p className="mt-1 text-xs text-warm-ivory/75">{isGujarati ? 'સત્તાવાર અરજી સેવાઓ' : 'Official application services'}</p></div></div>
              <button type="button" onClick={onClose} aria-label={isGujarati ? 'બંધ કરો' : 'Close'} className="rounded-full bg-warm-ivory/10 p-2 text-warm-ivory transition-colors hover:bg-warm-ivory/20"><X className="h-5 w-5" aria-hidden="true" /></button>
            </div>
            <div className="space-y-4 p-6">
              <p className="text-sm leading-relaxed text-charcoal">
                {isGujarati
                  ? 'વિદ્યા પ્રગતિ સેતુ એકીકૃત શિક્ષણ સહાય પોર્ટલ પર આપનું સ્વાગત છે. આપ વિદ્યાર્થી, શિક્ષણ સંસ્થા અથવા જિલ્લા અધિકારી તરીકે પ્રવેશ કરી શકો છો.'
                  : 'Welcome to the Vidya Pragati Setu unified education assistance portal. You can sign in as a Student, Institute, or District Officer.'}
              </p>
              <div className="rounded-2xl border border-warm-border bg-sage-green/60 p-4 text-xs sm:text-sm leading-relaxed text-charcoal">
                {isGujarati
                  ? 'યોજનાઓમાં સીધી અરજી કરવા, દસ્તાવેજ અપલોડ કરવા અને ડીબીટી ચુકવણી સ્થિતિ તપાસવા માટે અધિકૃત ઓળખપત્રો વડે પ્રવેશ કરો.'
                  : 'Sign in with your verified credentials to discover schemes, apply directly, and monitor your DBT payment status.'}
              </div>
              <div className="flex flex-col sm:flex-row items-center justify-end gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    window.history.pushState({}, '', '/signup');
                    window.dispatchEvent(new PopStateEvent('popstate'));
                  }}
                  className="w-full sm:w-auto btn-secondary rounded-pill px-4 py-2 text-xs font-semibold"
                >
                  {isGujarati ? 'નવું ખાતું બનાવો (Sign Up)' : 'Create Account (Sign Up)'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    window.history.pushState({}, '', '/login');
                    window.dispatchEvent(new PopStateEvent('popstate'));
                  }}
                  className="w-full sm:w-auto btn-primary rounded-pill px-5 py-2 text-xs font-semibold"
                >
                  {isGujarati ? 'લૉગિન પેજ પર જાઓ' : 'Go to Login Page'}
                </button>
              </div>
            </div>
          </motion.section>
        </div>
      )}
    </AnimatePresence>
  );
};

export default LoginModal;
