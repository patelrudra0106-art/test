import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { LanguageSelector, Language } from './LanguageSelector';

export interface FooterProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  onNavigate: (sectionId: string) => void;
}

type FooterGroupId = 'about' | 'schemes' | 'support' | 'policies';
interface FooterLinkItem { id: string; en: string; gu: string; target?: string; href?: string; }
interface FooterGroup { id: FooterGroupId; en: string; gu: string; links: FooterLinkItem[]; }

function FooterBrandMark() {
  return (
    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-warm-ivory/15 bg-forest-green">
      <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" aria-hidden="true">
        <path d="M16 5C12.5 9.5 11 14 16 21C21 14 19.5 9.5 16 5Z" fill="#FA9231" />
        <path d="M15.2 21.2C10.2 19.5 7 15.8 6.5 11C10.8 11.8 13.8 14.8 15.2 21.2Z" fill="#E5EBDD" />
        <path d="M16.8 21.2C21.8 19.5 25 15.8 25.5 11C21.2 11.8 18.2 14.8 16.8 21.2Z" fill="#E5EBDD" />
        <path d="M8.5 24.5C11.2 23.2 13.8 23.2 16 24.5C18.2 23.2 20.8 23.2 23.5 24.5" stroke="#FFFCF7" strokeWidth="2" strokeLinecap="round" />
      </svg>
    </span>
  );
}

const policyLinks: FooterLinkItem[] = [
  { id: 'privacy-policy', en: 'Privacy Policy', gu: 'ગોપનીયતા નીતિ', href: '/policies/privacy-policy' },
  { id: 'terms-and-conditions', en: 'Terms and Conditions', gu: 'નિયમો અને શરતો', href: '/policies/terms-and-conditions' },
  { id: 'cookie-policy', en: 'Cookie Policy', gu: 'કૂકી નીતિ', href: '/policies/cookie-policy' },
  { id: 'disclaimer', en: 'Disclaimer', gu: 'અસ્વીકરણ', href: '/policies/disclaimer' },
  { id: 'hyperlink-policy', en: 'Hyperlink Policy', gu: 'હાઇપરલિંક નીતિ', href: '/policies/hyperlink-policy' },
  { id: 'content-archival-policy', en: 'Content Archival Policy', gu: 'સામગ્રી સંગ્રહ નીતિ', href: '/policies/content-archival-policy' },
];

export const Footer: React.FC<FooterProps> = ({ language, onLanguageChange, onNavigate }) => {
  const [expandedGroup, setExpandedGroup] = useState<FooterGroupId | null>(null);
  const isGujarati = language === 'gu';

  const groups: FooterGroup[] = [
    { id: 'about', en: 'About', gu: 'અમારા વિશે', links: [
      { id: 'about-us', en: 'About Us', gu: 'અમારા વિશે', target: 'top' },
      { id: 'contact', en: 'Contact', gu: 'સંપર્ક', target: 'resources' },
      { id: 'sitemap', en: 'Sitemap', gu: 'સાઇટમેપ', target: 'schemes' },
    ] },
    { id: 'schemes', en: 'Schemes', gu: 'યોજનાઓ', links: [
      { id: 'scholarship-schemes', en: 'Scholarships', gu: 'શિષ્યવૃત્તિઓ', target: 'schemes' },
      { id: 'bicycle-assistance', en: 'Bicycle Assistance', gu: 'સાયકલ સહાય', target: 'schemes' },
      { id: 'free-textbooks', en: 'Free Textbooks', gu: 'વિનામૂલ્યે પાઠ્યપુસ્તકો', target: 'schemes' },
      { id: 'other-assistance', en: 'Other Assistance', gu: 'અન્ય સહાય', target: 'schemes' },
    ] },
    { id: 'support', en: 'Support', gu: 'સહાય', links: [
      { id: 'faqs', en: 'FAQs', gu: 'વારંવાર પૂછાતા પ્રશ્નો', target: 'resources' },
      { id: 'user-guides', en: 'User Guides', gu: 'વપરાશકર્તા માર્ગદર્શિકા', target: 'resources' },
      { id: 'eligibility-checker', en: 'Eligibility Checker', gu: 'પાત્રતા તપાસો', target: 'eligibility' },
      { id: 'track-application', en: 'Application Guidance', gu: 'અરજી માર્ગદર્શન', target: 'track' },
      { id: 'help-center', en: 'Help Center', gu: 'સહાય કેન્દ્ર', target: 'resources' },
    ] },
    { id: 'policies', en: 'Policies', gu: 'નીતિઓ', links: policyLinks },
  ];

  return (
    <footer className="mt-auto border-t border-warm-ivory/10 bg-charcoal text-warm-ivory">
      <div className="mx-auto w-full max-w-desktop px-4 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-8 sm:px-6 sm:pt-10 lg:px-10">
        <div className="space-y-5 border-b border-warm-ivory/15 pb-6">
          <div className="flex items-center gap-3">
            <FooterBrandMark />
            <div className="min-w-0">
              <h2 className="text-[16px] font-bold leading-tight tracking-tight text-warm-ivory sm:text-lg">{isGujarati ? 'વિદ્યા પ્રગતિ સેતુ' : 'Vidya Pragati Setu'}</h2>
              <p className="mt-0.5 text-[10.5px] leading-4 text-warm-ivory/70 sm:text-xs">{isGujarati ? <span lang="gu" className="font-gujarati">શિક્ષણ · તક · સશક્તિકરણ</span> : 'Education · Opportunity · Empowerment'}</p>
            </div>
          </div>
          <p className="max-w-md text-[12.5px] leading-[1.65] text-warm-ivory/75 sm:text-sm">{isGujarati ? <span lang="gu" className="font-gujarati">ગુજરાતના વિદ્યાર્થીઓને શિષ્યવૃત્તિ, સહાય યોજનાઓ અને શૈક્ષણિક માહિતી શોધવામાં મદદ.</span> : 'Helping students in Gujarat find scholarship, assistance-scheme and education information.'}</p>
          <div className="flex items-center gap-2.5">
            <LanguageSelector language={language} onChange={onLanguageChange} compact variant="light" direction="up" align="left" className="w-[126px]" />
          </div>
        </div>

        <div className="border-b border-warm-ivory/15 py-2">
          {groups.map((group) => {
            const expanded = expandedGroup === group.id;
            const panelId = `mobile-footer-${group.id}`;
            return (
              <section key={group.id} className="border-b border-warm-ivory/10 last:border-b-0">
                <h3>
                  <button type="button" aria-expanded={expanded} aria-controls={panelId} onClick={() => setExpandedGroup(expanded ? null : group.id)} className="flex min-h-11 w-full items-center justify-between gap-3 py-2 text-left text-[13px] font-semibold text-warm-ivory transition-colors hover:text-saffron focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron/70">
                    <span lang={isGujarati ? 'gu' : 'en'} className={isGujarati ? 'font-gujarati' : ''}>{isGujarati ? group.gu : group.en}</span>
                    <ChevronDown className={`h-4 w-4 shrink-0 text-warm-ivory/70 transition-transform duration-200 ${expanded ? 'rotate-180 text-saffron' : ''}`} aria-hidden="true" />
                  </button>
                </h3>
                {expanded && <div id={panelId} className="pb-3 pl-1"><ul className="space-y-1">
                  {group.links.map((link) => <li key={link.id}>
                    {link.href ? (
                      <a href={link.href} className="flex min-h-9 w-full items-center rounded-lg px-2 py-1.5 text-left text-[12px] leading-relaxed text-warm-ivory/75 transition-colors hover:bg-warm-ivory/5 hover:text-saffron focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron/70">
                        {isGujarati ? <span lang="gu" className="font-gujarati">{link.gu}</span> : link.en}
                      </a>
                    ) : (
                      <button type="button" onClick={() => onNavigate(link.target || 'top')} className="min-h-9 w-full rounded-lg px-2 py-1.5 text-left text-[12px] leading-relaxed text-warm-ivory/75 transition-colors hover:bg-warm-ivory/5 hover:text-saffron focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron/70">
                        {isGujarati ? <span lang="gu" className="font-gujarati">{link.gu}</span> : link.en}
                      </button>
                    )}
                  </li>)}
                </ul></div>}
              </section>
            );
          })}
        </div>

        <div className="flex flex-col gap-2 pt-4 text-[10.5px] leading-[1.6] text-warm-ivory/65 sm:flex-row sm:items-center sm:justify-between sm:text-[11px]">
          <p>{isGujarati ? <span lang="gu" className="font-gujarati">ગુજરાતના વિદ્યાર્થીઓ માટે</span> : 'Made for Gujarat students'}</p>
          <p>© {new Date().getFullYear()} Vidya Pragati Setu</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
