import React from 'react';
import { Globe2 } from 'lucide-react';
import { Language } from '../../data/schemes';
import { LanguageSelector } from './LanguageSelector';
import { scrollToSection } from '../lib/utils';

export interface FooterProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
}

type FooterLink = {
  id: string;
  labelEn: string;
  labelGu: string;
  target?: string;
  href?: string;
};

type FooterColumn = {
  titleEn: string;
  titleGu: string;
  links: FooterLink[];
};

const policyLinks: FooterLink[] = [
  { id: 'privacy-policy', labelEn: 'Privacy Policy', labelGu: 'ગોપનીયતા નીતિ', href: '/policies/privacy-policy' },
  { id: 'terms-and-conditions', labelEn: 'Terms and Conditions', labelGu: 'નિયમો અને શરતો', href: '/policies/terms-and-conditions' },
  { id: 'cookie-policy', labelEn: 'Cookie Policy', labelGu: 'કૂકી નીતિ', href: '/policies/cookie-policy' },
  { id: 'disclaimer', labelEn: 'Disclaimer', labelGu: 'અસ્વીકરણ', href: '/policies/disclaimer' },
  { id: 'hyperlink-policy', labelEn: 'Hyperlink Policy', labelGu: 'હાઇપરલિંક નીતિ', href: '/policies/hyperlink-policy' },
  { id: 'content-archival-policy', labelEn: 'Content Archival Policy', labelGu: 'સામગ્રી સંગ્રહ નીતિ', href: '/policies/content-archival-policy' },
];

const footerColumns: FooterColumn[] = [
  {
    titleEn: 'About', titleGu: 'અમારા વિશે',
    links: [
      { id: 'about-us', labelEn: 'About Us', labelGu: 'અમારા વિશે', target: '#benefits' },
      { id: 'contact', labelEn: 'Contact & Help', labelGu: 'સંપર્ક અને સહાય', target: '#resources' },
      { id: 'sitemap', labelEn: 'Sitemap', labelGu: 'સાઇટમેપ', target: '#home' },
    ],
  },
  {
    titleEn: 'Schemes', titleGu: 'યોજનાઓ',
    links: [
      { id: 'scholarships', labelEn: 'Scholarships', labelGu: 'શિષ્યવૃત્તિ', target: '#schemes' },
      { id: 'bicycle', labelEn: 'Bicycle Assistance', labelGu: 'સાયકલ સહાય', target: '#schemes' },
      { id: 'textbooks', labelEn: 'Free Textbooks', labelGu: 'વિનામૂલ્યે પાઠ્યપુસ્તકો', target: '#schemes' },
      { id: 'assistance', labelEn: 'Other Assistance', labelGu: 'અન્ય સહાય', target: '#schemes' },
      { id: 'all-schemes', labelEn: 'All Schemes', labelGu: 'બધી યોજનાઓ', target: '#schemes' },
    ],
  },
  {
    titleEn: 'Support', titleGu: 'સહાય',
    links: [
      { id: 'faqs', labelEn: 'FAQs', labelGu: 'વારંવાર પૂછાતા પ્રશ્નો', target: '#resources' },
      { id: 'guides', labelEn: 'User Guides', labelGu: 'વપરાશકર્તા માર્ગદર્શિકા', target: '#how-it-works' },
      { id: 'eligibility-checker', labelEn: 'Eligibility Checker', labelGu: 'પાત્રતા તપાસો', target: '#eligibility' },
      { id: 'track-application', labelEn: 'Application Guidance', labelGu: 'અરજી માર્ગદર્શન', target: '#how-it-works' },
      { id: 'help-center', labelEn: 'Help Center', labelGu: 'મદદ કેન્દ્ર', target: '#resources' },
    ],
  },
  { titleEn: 'Policies', titleGu: 'નીતિઓ', links: policyLinks },
];

export const Footer: React.FC<FooterProps> = ({ language, onLanguageChange }) => {
  const isGujarati = language === 'gu';

  const handleLinkClick = (event: React.MouseEvent<HTMLAnchorElement>, target?: string, href?: string) => {
    if (href) return;
    event.preventDefault();
    if (target) scrollToSection(target);
  };

  return (
    <footer className="mt-8 bg-charcoal text-warm-ivory">
      <div className="mx-auto w-full max-w-desktop px-4 sm:px-6 lg:px-8 xl:px-8 2xl:px-10">
        <div className="grid grid-cols-2 gap-x-4 gap-y-7 py-8 sm:grid-cols-3 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-x-5 xl:gap-x-6 2xl:gap-x-7 lg:py-9">
          <div className="col-span-2 min-w-0 sm:col-span-1">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-forest-green bg-forest-green">
                <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" aria-hidden="true">
                  <path d="M16 5C12.5 9.5 11 14 16 21C21 14 19.5 9.5 16 5Z" fill="#FA9231" />
                  <path d="M15.2 21.2C10.2 19.5 7 15.8 6.5 11C10.8 11.8 13.8 14.8 15.2 21.2Z" fill="#E5EBDD" />
                  <path d="M16.8 21.2C21.8 19.5 25 15.8 25.5 11C21.2 11.8 18.2 14.8 16.8 21.2Z" fill="#E5EBDD" />
                  <path d="M8.5 24.5C11.2 23.2 13.8 23.2 16 24.5C18.2 23.2 20.8 23.2 23.5 24.5" stroke="#FFFCF7" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>
              <div className="min-w-0">
                <p className="text-[14px] font-semibold leading-5 tracking-[-0.01em] text-warm-ivory sm:text-[14.5px]">Vidya Pragati Setu</p>
                <p className="mt-0.5 text-[10.5px] leading-4 text-warm-ivory/65">{isGujarati ? <span lang="gu" className="font-gujarati">શિક્ષણ · તક · સશક્તિકરણ</span> : 'Education · Opportunity · Empowerment'}</p>
              </div>
            </div>
            <p className="mt-3 max-w-[18rem] text-[12px] leading-[1.65] text-warm-ivory/75 sm:text-[12.5px]">
              {isGujarati ? <span lang="gu" className="font-gujarati">ગુજરાતના વિદ્યાર્થીઓને શિષ્યવૃત્તિ, સહાય યોજનાઓ અને શૈક્ષણિક માહિતી શોધવામાં મદદ.</span> : 'Helping students in Gujarat find scholarship, assistance-scheme and education information.'}
            </p>
            <div className="mt-4 flex items-center gap-2.5">
              <Globe2 className="h-4 w-4 shrink-0 text-warm-ivory/60" aria-hidden="true" />
              <LanguageSelector language={language} onLanguageChange={onLanguageChange} menuAlign="left" className="[&>button]:min-w-[104px] [&>button]:px-3 [&>button]:py-1.5 [&>button]:text-[12px]" />
            </div>
          </div>

          {footerColumns.map((column) => (
            <nav key={column.titleEn} aria-label={isGujarati ? column.titleGu : column.titleEn} className="min-w-0">
              <h2 className="mb-3 text-[12.5px] font-semibold leading-5 text-warm-ivory sm:text-[13px]">
                {isGujarati ? <span lang="gu" className="font-gujarati">{column.titleGu}</span> : column.titleEn}
              </h2>
              <ul className="space-y-2">
                {column.links.map((item) => {
                  const label = isGujarati ? item.labelGu : item.labelEn;
                  return <li key={item.id}>
                    <a href={item.href || item.target || '#'} onClick={(event) => handleLinkClick(event, item.target, item.href)} className="inline-block max-w-full text-[12px] leading-[1.45] text-warm-ivory/70 transition-colors duration-150 hover:text-warm-ivory focus-visible:rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-saffron sm:text-[12.5px]">
                      {isGujarati ? <span lang="gu" className="font-gujarati">{label}</span> : label}
                    </a>
                  </li>;
                })}
              </ul>
            </nav>
          ))}
        </div>

        <div className="flex flex-col gap-2 border-t border-warm-ivory/15 py-4 text-[10.5px] leading-[1.55] text-warm-ivory/60 sm:flex-row sm:items-center sm:justify-between sm:text-[11px]">
          <p>{isGujarati ? <span lang="gu" className="font-gujarati">ગુજરાતના વિદ્યાર્થીઓ માટે</span> : 'Made for Gujarat students'}</p>
          <p>© {new Date().getFullYear()} Vidya Pragati Setu</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
