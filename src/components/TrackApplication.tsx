import React from 'react';
import { ExternalLink, ShieldCheck } from 'lucide-react';
import { Language } from './LanguageSelector';

export interface TrackApplicationProps { language: Language; }

export const TrackApplication: React.FC<TrackApplicationProps> = ({ language }) => {
  const isGujarati = language === 'gu';
  return (
    <section id="track" className="py-12 lg:py-16">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-warm-border bg-warm-ivory p-6 shadow-card sm:p-8 lg:p-10">
          <div className="flex items-start gap-4">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-sage-green text-forest-green"><ShieldCheck className="h-5 w-5" aria-hidden="true" /></span>
            <div className="min-w-0">
              <h2 className="text-2xl font-extrabold tracking-tight text-charcoal sm:text-3xl">{isGujarati ? 'અરજીની સ્થિતિ' : 'Application Status'}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-text sm:text-base">
                {isGujarati ? 'અરજીની વાસ્તવિક સ્થિતિ માત્ર સંબંધિત સરકારી વિભાગ અથવા સત્તાવાર પોર્ટલ જ બતાવી શકે છે. આ વેબસાઇટ સરકારી અરજી રેકોર્ડ સાથે જોડાયેલી નથી.' : 'Only the responsible department or its official portal can show the live status of an application. This website is not connected to government application records.'}
              </p>
            </div>
          </div>
          <div className="mt-6 rounded-2xl border border-warm-border bg-vanilla-cream/75 p-4 sm:p-5">
            <h3 className="text-sm font-bold text-charcoal sm:text-base">{isGujarati ? 'તમારી અરજી કેવી રીતે તપાસવી' : 'How to check your application'}</h3>
            <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm leading-relaxed text-muted-text marker:font-bold marker:text-forest-green">
              {isGujarati ? <><li>તમે અરજી સબમિટ કરી હોય તે સત્તાવાર પોર્ટલ ખોલો.</li><li>વિભાગ દ્વારા આપેલો અરજી નંબર અથવા સંદર્ભ નંબર દાખલ કરો.</li><li>સ્થિતિ અથવા ચુકવણી અંગે પ્રશ્ન હોય તો સંબંધિત વિભાગનો સંપર્ક કરો.</li></> : <><li>Open the official portal where you submitted the application.</li><li>Enter the application or reference number issued by that department.</li><li>Contact the responsible department if you have a status or payment query.</li></>}
            </ol>
          </div>
          <p className="mt-4 inline-flex items-start gap-2 text-xs leading-relaxed text-muted-text"><ExternalLink className="mt-0.5 h-4 w-4 shrink-0 text-forest-green" aria-hidden="true" /><span>{isGujarati ? 'તમારો આધાર નંબર, બેંક વિગતો, પાસવર્ડ અથવા OTP અહીં દાખલ કરશો નહીં.' : 'Do not enter your Aadhaar number, bank details, password or OTP on this website.'}</span></p>
        </div>
      </div>
    </section>
  );
};

export default TrackApplication;
