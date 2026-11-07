import { useEffect } from 'react';
import { ArrowLeft, ExternalLink, FileText, ShieldCheck } from 'lucide-react';

type PolicySlug =
  | 'privacy-policy'
  | 'terms-and-conditions'
  | 'cookie-policy'
  | 'disclaimer'
  | 'hyperlink-policy'
  | 'content-archival-policy';

interface PolicySection {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
}

interface PolicyDocument {
  slug: PolicySlug;
  title: string;
  subtitle: string;
  summary: string;
  sections: PolicySection[];
}

const POLICY_DOCUMENTS: PolicyDocument[] = [
  {
    slug: 'privacy-policy',
    title: 'Privacy Policy',
    subtitle: 'How this website handles information about visitors.',
    summary:
      'This policy describes the current static website. It does not describe a future login, application, payment or tracking service that has not been connected.',
    sections: [
      {
        heading: '1. Who operates this website',
        paragraphs: [
          'Vidya Pragati Setu is an independent student-information project. It is not operated by, authorised by, or affiliated with the Government of India or the Government of Gujarat. The person or organisation responsible for the domain and its deployment is the website operator.',
          'No separate legal-entity name, postal address or dedicated privacy email was supplied with this website release. Those details must be published by the operator before the website begins collecting personal information or offering account-based services.',
        ],
      },
      {
        heading: '2. Information collected by this release',
        paragraphs: [
          'The current website is a static front-end. Its search, language selection, filters and interface controls run in the visitor’s browser. The application code in this release does not submit those values to a Vidya Pragati Setu application server, create user accounts, accept applications, process payments, receive document uploads or query government application records.',
          'The website code does not set first-party analytics or advertising cookies and does not use local storage or session storage to build visitor profiles. Temporary interface state is held in browser memory and is cleared when the page is reloaded or closed.',
        ],
        bullets: [
          'Do not enter Aadhaar numbers, bank details, passwords, one-time passcodes, student IDs, application reference numbers, marksheets, certificates or other sensitive information into this website.',
          'Do not submit a child’s personal information through this website. Use only the official government service identified by the relevant department.',
        ],
      },
      {
        heading: '3. Hosting and third-party resources',
        paragraphs: [
          'When the website is deployed, the hosting, content-delivery and security providers may process technical request information such as IP address, browser and device details, request time, referring page and security logs. If the site is hosted on Vercel, the operator should review the provider’s current privacy terms and deployment settings to understand the exact data, locations and retention periods involved.',
          'This release requests font files from Google Fonts and image assets from Unsplash. Those requests are made by the visitor’s browser to the relevant third-party service. Those providers may receive technical request information and apply their own privacy and cookie practices. Their policies, rather than this website’s policy, govern their independent processing.',
        ],
      },
      {
        heading: '4. Purposes and sharing',
        paragraphs: [
          'The site code does not sell visitor information, run behavioural advertising or create marketing profiles. Technical information processed by hosting, delivery or security providers may be used by those providers to deliver, protect and troubleshoot their services under their applicable terms.',
          'The operator does not intentionally collect personal information through the current front-end. If a contact form, registration, analytics, application, document-upload or other data-processing feature is introduced, this policy and the relevant notices must be updated before that feature is enabled.',
        ],
      },
      {
        heading: '5. Children and sensitive information',
        paragraphs: [
          'This website is intended to provide general information that may be useful to students and parents. It is not designed to collect children’s personal data. Parents and guardians should supervise children’s use of the internet and ensure that applications and personal documents are submitted only through the appropriate official service.',
          'Any future processing of a child’s personal data must be designed and reviewed against the applicable Indian legal requirements, including the requirements for verifiable parental consent when they become applicable. The website must not enable such processing merely by adding a form or account screen.',
        ],
      },
      {
        heading: '6. Your choices and privacy requests',
        paragraphs: [
          'Because this release does not create a Vidya Pragati Setu user account or maintain a visitor profile, it has no account dashboard from which a visitor can view, correct or delete profile information. A visitor can stop using the site and can block third-party font or image requests through browser settings, although this may affect page appearance.',
          'A dedicated privacy/grievance contact has not yet been provided for this release. The operator must publish a monitored contact route and its legal identity before enabling collection of personal data or representing that formal privacy requests can be handled through this website.',
        ],
      },
      {
        heading: '7. Indian data-protection framework',
        paragraphs: [
          'The Information Technology Act, 2000 and, where applicable, the Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011 are relevant to the handling of information in India. The Digital Personal Data Protection Act, 2023 and the Digital Personal Data Protection Rules, 2025 have a phased commencement schedule. The Government of India notifications published in November 2025 set out provisions commencing on publication, one year later (13 November 2026) and eighteen months later (13 May 2027). This policy is dated 2 November 2026 and must be reviewed as further provisions commence or the law changes.',
          'This summary is informational and is not a legal opinion or a statement that the website has been certified or audited for compliance. The operator should obtain legal advice on the facts of its deployment and any future data processing.',
        ],
      },
      {
        heading: '8. Changes to this policy',
        paragraphs: [
          'The operator may revise this policy when the website, hosting arrangements, third-party resources, applicable law or data practices change. The “Last updated” date at the top of the page should be changed whenever a substantive revision is published.',
        ],
      },
    ],
  },
  {
    slug: 'terms-and-conditions',
    title: 'Terms and Conditions',
    subtitle: 'Rules for accessing and using Vidya Pragati Setu.',
    summary:
      'By using this website, you agree to these terms. Please also read the Privacy Policy and Disclaimer.',
    sections: [
      {
        heading: '1. Website status and ownership',
        paragraphs: [
          'Vidya Pragati Setu is an independent student-information project. It is not an official government website, public authority, scholarship administrator or government application portal. It is not affiliated with or endorsed by the Government of India, the Government of Gujarat, or any government department.',
          'The website operator should publish its legal name and contact details before offering any service that requires a formal customer, applicant or grievance relationship. No such legal-entity details were supplied with this release.',
        ],
      },
      {
        heading: '2. Permitted use',
        paragraphs: [
          'You may browse the information for personal, non-commercial educational purposes. You agree not to misuse the website, interfere with its operation, attempt unauthorised access, introduce malicious code, scrape it in a manner that disrupts service, or use its content to mislead or impersonate a government authority.',
          'You are responsible for deciding whether information is appropriate for your circumstances and for checking current requirements with the department that administers a scheme.',
        ],
      },
      {
        heading: '3. No application, account or government-status service',
        paragraphs: [
          'This release does not create a real user account, authenticate government credentials, accept or submit a scholarship application, process a payment, or retrieve an application’s status from a government database. Do not enter real passwords, OTPs, student identifiers, application references or documents into an interface unless a future release explicitly identifies a secure and authorised service.',
          'Any eligibility guidance is preliminary and informational. Only the relevant scheme authority can determine eligibility, approve an application, set benefit amounts or publish binding dates and conditions.',
        ],
      },
      {
        heading: '4. Accuracy and changes',
        paragraphs: [
          'The operator aims to keep published information understandable and useful but does not warrant that all content is complete, current, error-free or suitable for every applicant. Scheme conditions, funding, eligibility, application windows and required documents can change without notice. Verify the latest official notification before acting.',
        ],
      },
      {
        heading: '5. Intellectual property',
        paragraphs: [
          'Unless a page states otherwise, the site’s original text, layout, graphics and code are owned by or used under permission by the relevant rights holder. You may quote short extracts for lawful purposes with clear attribution and a link to the source. You must not reproduce the site in a misleading way, remove attribution, or imply government endorsement.',
          'Names, logos, marks and materials belonging to government departments or other third parties remain the property of their respective owners. Their appearance does not imply affiliation or permission to use them.',
        ],
      },
      {
        heading: '6. External websites',
        paragraphs: [
          'Links to external websites, if provided, are for convenience and further verification. The operator does not control third-party content, availability, security, privacy practices or terms. Visiting an external site is at your discretion and is governed by that site’s own policies.',
        ],
      },
      {
        heading: '7. Liability',
        paragraphs: [
          'To the extent permitted by applicable law, the website is provided on an “as available” and informational basis. The operator is not responsible for decisions made solely on the basis of this site, missed deadlines, a department’s decision, or the content or operation of a third-party website. Nothing in these terms excludes liability or a consumer or other statutory right that cannot lawfully be excluded under Indian law.',
        ],
      },
      {
        heading: '8. Governing law and jurisdiction',
        paragraphs: [
          'These terms are governed by the laws of India. Disputes are subject to the jurisdiction of courts and forums that are competent under applicable Indian law. Nothing in this clause removes a right to approach a statutory authority or forum where the law permits it.',
        ],
      },
      {
        heading: '9. Updates to these terms',
        paragraphs: [
          'The operator may revise these terms when the website or applicable law changes. Continued use after a revised version is published constitutes acceptance only to the extent recognised by applicable law.',
        ],
      },
    ],
  },
  {
    slug: 'cookie-policy',
    title: 'Cookie Policy',
    subtitle: 'Cookies, browser storage and similar technologies used by this release.',
    summary:
      'The current application code does not set first-party analytics or advertising cookies. Third-party infrastructure and resources operate independently.',
    sections: [
      {
        heading: '1. Cookies used by this website',
        paragraphs: [
          'The current front-end code does not intentionally set first-party cookies for analytics, advertising, cross-site tracking or visitor profiling. It also does not use local storage or session storage to retain a visitor profile or application record.',
          'The website may rely on essential technical functions of the hosting or content-delivery provider. Any cookies or similar technologies used by that infrastructure are controlled by the relevant provider and depend on the actual deployment configuration.',
        ],
      },
      {
        heading: '2. Third-party resources',
        paragraphs: [
          'The website requests fonts from Google Fonts and image assets from Unsplash. These services are contacted directly by your browser. They may process IP addresses, browser information, request metadata or use their own cookies and similar technologies under their respective policies. The website operator does not control those third-party practices.',
        ],
      },
      {
        heading: '3. Managing cookies',
        paragraphs: [
          'You can use your browser settings to block, delete or restrict cookies and third-party requests. Blocking external fonts or images may change how the website looks. Browser controls do not necessarily stop technical logs that a hosting or network provider must create to deliver and secure a website.',
        ],
      },
      {
        heading: '4. Future changes',
        paragraphs: [
          'If analytics, advertising, embedded media, chat tools, account services or other non-essential technologies are introduced, this policy must be updated and any notice or consent required by applicable law must be presented before the relevant technology is activated.',
        ],
      },
    ],
  },
  {
    slug: 'disclaimer',
    title: 'Disclaimer',
    subtitle: 'Important limits on scheme information and website functionality.',
    summary:
      'Read this page before relying on any scheme, eligibility, document or application information shown on this website.',
    sections: [
      {
        heading: '1. Independent information website',
        paragraphs: [
          'Vidya Pragati Setu is an independent student-information project. It is not an official government website and is not owned, operated, sponsored, approved or endorsed by the Government of India, the Government of Gujarat, or any government department, school board or scholarship authority. The site name and visual identity must not be interpreted as a government affiliation.',
        ],
      },
      {
        heading: '2. Scheme information must be verified',
        paragraphs: [
          'Scheme descriptions, eligibility points, document lists, benefit summaries, categories and other guidance on this website are general informational material. They may be incomplete, simplified, outdated or not applicable to a particular scheme, academic year, district or applicant. They are not an official notification, legal interpretation, guarantee of entitlement or approval.',
          'Before applying or sharing documents, check the latest notification and instructions published by the department or authority responsible for the specific scheme. The official authority’s rules and decision prevail over any summary on this website.',
        ],
      },
      {
        heading: '3. Eligibility guidance and applications',
        paragraphs: [
          'Any eligibility matching shown on the website is a preliminary guide based on information selected in the browser. It is not a government eligibility determination and does not guarantee approval or payment. This release does not submit an application, create an authenticated account, process a payment or connect to government application records.',
          'Application submission, verification, approval, benefit disbursement and status tracking must be completed through the official service or process identified by the relevant authority. Do not enter real passwords, OTPs, Aadhaar details, bank details, student IDs, application references or certificates into this website.',
        ],
      },
      {
        heading: '4. Dates, statistics and availability',
        paragraphs: [
          'Any dates, counts, illustrations, examples or descriptions shown on this website should not be treated as live government data unless the page provides a verifiable source and publication date. The operator does not guarantee that a scheme is open, funded, available in a particular area or accepting applications.',
        ],
      },
      {
        heading: '5. External links',
        paragraphs: [
          'External links, if present, are provided for convenience. The operator does not control or warrant the accuracy, security, accessibility, privacy practices or availability of third-party websites. Users should confirm that they are on the genuine official domain before entering personal information.',
        ],
      },
      {
        heading: '6. No professional advice or guarantee',
        paragraphs: [
          'Website content is not legal, financial, tax, education-department or professional advice. You should contact the relevant authority or a qualified adviser for a decision about your circumstances. To the extent permitted by Indian law, the operator disclaims responsibility for loss resulting from reliance on incomplete or outdated information. Non-excludable statutory rights remain unaffected.',
        ],
      },
    ],
  },
  {
    slug: 'hyperlink-policy',
    title: 'Hyperlink Policy',
    subtitle: 'How this website links to external websites and how others may link here.',
    summary:
      'External links are intended to help visitors reach the original source. A link does not mean endorsement or government affiliation.',
    sections: [
      {
        heading: '1. Links from Vidya Pragati Setu',
        paragraphs: [
          'Where an external link is published, the content team should verify that it is relevant, functional and points to the intended organisation or original document. Links to government services should identify the responsible department and use its official domain wherever that can be confirmed.',
          'A clear indication should be provided when a link takes a visitor away from this website. External links should open in a separate browser tab where appropriate, using safe link attributes. The operator may remove or replace a link if it becomes broken, unsafe, misleading, irrelevant or outdated.',
        ],
      },
      {
        heading: '2. Third-party responsibility',
        paragraphs: [
          'The operator does not control external websites and is not responsible for their content, privacy practices, security, accessibility, availability or changes. Visitors should read the external website’s own terms and privacy notices before using it or submitting information.',
          'A link is provided only for convenience or source verification. It does not amount to sponsorship, approval, recommendation or a claim that the external organisation is connected with Vidya Pragati Setu.',
        ],
      },
      {
        heading: '3. Linking to this website',
        paragraphs: [
          'You may create a direct link to a publicly accessible page of this website, provided that the link is lawful, accurate and does not misrepresent the relationship between the linking website and Vidya Pragati Setu. Do not reproduce this website inside a frame, alter its content, use its logo without permission, or imply that the website endorses another organisation or service.',
          'If a link to this website is misleading, unsafe or unlawful, the operator may request that it be corrected or removed. Requests can be sent through the contact route published by the website operator once that route is made available.',
        ],
      },
      {
        heading: '4. Government website guidance',
        paragraphs: [
          'The Guidelines for Indian Government Websites and Apps (GIGW) are used as a reference for clear external-link notices and responsible link management. Vidya Pragati Setu is an independent project; this reference does not mean that the website is a government website, has GIGW certification or is endorsed by a government body.',
        ],
      },
    ],
  },
  {
    slug: 'content-archival-policy',
    title: 'Content Archival Policy',
    subtitle: 'How scheme information, updates and other published content are reviewed and retired.',
    summary:
      'This policy covers website content only. The current release does not accept user uploads or maintain personal application records.',
    sections: [
      {
        heading: '1. Scope',
        paragraphs: [
          'This policy applies to scheme summaries, eligibility guidance, document checklists, student resources, announcements, update cards and policy pages published on Vidya Pragati Setu. It does not apply to the internal records or archives of a government department or scheme authority.',
          'The current website is a static front-end. It does not accept public document uploads, user-generated posts or application records, and it does not provide a public document-archive service.',
        ],
      },
      {
        heading: '2. Review of active content',
        paragraphs: [
          'The website maintainer should review time-sensitive scheme and announcement content at least once every 90 days and whenever a relevant official notification or source page changes. Each time-sensitive item should, where practical, identify its source and the date on which it was last checked.',
          'Content that cannot be verified, has expired, has been withdrawn or is superseded should be corrected, clearly marked as no longer current, or removed from the active information areas. The website must not present an expired announcement as an open application window.',
        ],
      },
      {
        heading: '3. Archival and retention approach',
        paragraphs: [
          'Where historical value justifies retention, the maintainer may move expired content out of the active pages and retain an archived copy for up to three years from the date it is withdrawn. Archived material must be labelled with its original publication date, withdrawal or expiry status, and source where available. Archived material must not be presented as current instructions.',
          'After the archival period, the maintainer should review whether the item is still required for reference, accountability or a legal obligation. Content may then be deleted or retained for a longer period where a lawful requirement or documented business need applies.',
        ],
      },
      {
        heading: '4. Corrections and removal',
        paragraphs: [
          'The maintainer should investigate credible reports of inaccurate, outdated, infringing or harmful content and correct or remove the affected material as appropriate. Where a correction materially changes scheme guidance, the revised content should identify the updated review date.',
          'A public correction or archival-request contact route has not yet been supplied for this release. The operator should publish a monitored contact channel before inviting formal content or rights-management requests.',
        ],
      },
      {
        heading: '5. Legal preservation',
        paragraphs: [
          'Nothing in this policy requires deletion of material that must be preserved under applicable Indian law, a lawful direction, court order or legal hold. If a legal preservation duty applies, it takes priority over the ordinary archival period.',
          'This policy is informed by the content-life-cycle and archival principles in the Guidelines for Indian Government Websites and Apps (GIGW). Those guidelines are referenced as good practice and do not make this independent website a government portal or a GIGW-certified service.',
        ],
      },
    ],
  },
];

export function getPolicySlug(pathname: string): PolicySlug | null {
  const match = pathname.replace(/\/+$/, '').match(/^\/policies\/([^/]+)$/);
  if (!match) return null;
  const candidate = match[1] as PolicySlug;
  return POLICY_DOCUMENTS.some((document) => document.slug === candidate) ? candidate : null;
}

interface PolicyPageProps {
  slug: PolicySlug;
}

export default function PolicyPage({ slug }: PolicyPageProps) {
  const document = POLICY_DOCUMENTS.find((item) => item.slug === slug) ?? POLICY_DOCUMENTS[0];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
    window.document.title = `${document.title} | Vidya Pragati Setu`;
  }, [document.title]);

  return (
    <div className="min-h-screen bg-vanilla-cream text-charcoal">
      <header className="sticky top-0 z-30 border-b border-warm-border/80 bg-warm-ivory/90 backdrop-blur-xl">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <a href="/" className="flex min-w-0 items-center gap-3 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest-green">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-forest-green text-saffron">
              <ShieldCheck className="h-5 w-5" aria-hidden="true" />
            </span>
            <span className="min-w-0">
              <span className="block truncate text-sm font-extrabold text-charcoal sm:text-base">Vidya Pragati Setu</span>
              <span className="block text-[11px] text-muted-text">Policies and legal information</span>
            </span>
          </a>
          <a href="/" className="inline-flex min-h-10 shrink-0 items-center gap-2 rounded-full border border-forest-green/40 bg-warm-ivory px-4 text-xs font-semibold text-forest-green transition-colors hover:bg-sage-green/60 sm:text-sm">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Back to website
          </a>
        </div>
      </header>

      <main className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-6 px-4 py-8 sm:px-6 sm:py-10 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
        <aside className="h-fit rounded-2xl border border-warm-border bg-warm-ivory p-4 shadow-sm lg:sticky lg:top-24">
          <div className="mb-3 flex items-center gap-2 text-sm font-bold text-forest-green">
            <FileText className="h-4 w-4" aria-hidden="true" />
            Website policies
          </div>
          <nav aria-label="Website policies" className="grid grid-cols-2 gap-1.5 lg:grid-cols-1">
            {POLICY_DOCUMENTS.map((item) => (
              <a
                key={item.slug}
                href={`/policies/${item.slug}`}
                aria-current={item.slug === slug ? 'page' : undefined}
                className={`rounded-lg px-3 py-2 text-xs leading-snug transition-colors sm:text-sm ${
                  item.slug === slug
                    ? 'bg-forest-green text-warm-ivory'
                    : 'text-muted-text hover:bg-sage-green/70 hover:text-forest-green'
                }`}
              >
                {item.title}
              </a>
            ))}
          </nav>
        </aside>

        <article className="min-w-0 overflow-hidden rounded-3xl border border-warm-border bg-warm-ivory shadow-card">
          <div className="bg-gradient-to-br from-forest-green to-[#1D4434] px-5 py-7 text-warm-ivory sm:px-8 sm:py-9">
            <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.16em] text-sage-green">Vidya Pragati Setu · Website policy</p>
            <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl">{document.title}</h1>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-warm-ivory/80 sm:text-base">{document.subtitle}</p>
            <p className="mt-5 inline-flex rounded-full border border-warm-ivory/20 bg-warm-ivory/10 px-3 py-1 text-[11px] text-warm-ivory/90">
              Last updated: 2 November 2026
            </p>
          </div>

          <div className="space-y-7 px-5 py-6 sm:px-8 sm:py-8">
            <p className="rounded-2xl border border-warm-border bg-sage-green/55 px-4 py-3.5 text-sm leading-relaxed text-charcoal">
              {document.summary}
            </p>

            {document.sections.map((section) => (
              <section key={section.heading} className="space-y-2.5">
                <h2 className="text-base font-extrabold text-charcoal sm:text-lg">{section.heading}</h2>
                {section.paragraphs?.map((paragraph, index) => (
                  <p key={index} className="text-sm leading-[1.8] text-muted-text">{paragraph}</p>
                ))}
                {section.bullets && (
                  <ul className="list-disc space-y-2 pl-5 text-sm leading-[1.75] text-muted-text marker:text-saffron">
                    {section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}
                  </ul>
                )}
              </section>
            ))}

            <section className="border-t border-warm-border pt-5">
              <h2 className="mb-3 text-base font-extrabold text-charcoal">Official reference material</h2>
              <div className="flex flex-col gap-2.5 text-sm">
                <a className="inline-flex items-center gap-2 text-forest-green underline decoration-forest-green/30 underline-offset-4 hover:decoration-forest-green" href="https://www.meity.gov.in/static/uploads/2025/11/c56ceae6c383460ca69577428d36828b.pdf" target="_blank" rel="noopener noreferrer">
                  DPDP Act commencement notification · MeitY <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
                <a className="inline-flex items-center gap-2 text-forest-green underline decoration-forest-green/30 underline-offset-4 hover:decoration-forest-green" href="https://www.meity.gov.in/static/uploads/2025/11/53450e6e5dc0bfa85ebd78686cadad39.pdf" target="_blank" rel="noopener noreferrer">
                  Digital Personal Data Protection Rules, 2025 · MeitY <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
                <a className="inline-flex items-center gap-2 text-forest-green underline decoration-forest-green/30 underline-offset-4 hover:decoration-forest-green" href="https://guidelines.india.gov.in/website-policies/" target="_blank" rel="noopener noreferrer">
                  Guidelines for Indian Government Websites · Website policies <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
              </div>
            </section>
          </div>
        </article>
      </main>

      <footer className="border-t border-warm-border bg-warm-ivory/70">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-4 text-xs text-muted-text sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <span>Made for Gujarat students</span>
          <span>© {new Date().getFullYear()} Vidya Pragati Setu</span>
        </div>
      </footer>
    </div>
  );
}
