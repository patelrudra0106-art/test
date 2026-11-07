import React, { useState, useRef, useEffect } from 'react';
import {
  Search,
  ChevronDown,
  Menu,
  X,
  ArrowRight,
  GraduationCap,
  Bike,
  BookOpen,
  UsersRound,
  CheckCircle2,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Language, SchemeItem, getStoredSchemes } from '../../data/schemes';
import { cn, scrollToSection } from '../lib/utils';

export interface NavbarProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  activeSection?: string;
  onNavigate?: (id: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onSelectScheme?: (scheme: SchemeItem) => void;
  onOpenLogin: () => void;
}

interface NavLinkItem {
  id: string;
  labelEn: string;
  labelGu: string;
  href: string;
}

const NAV_LINKS: NavLinkItem[] = [
  { id: 'home', labelEn: 'Home', labelGu: 'હોમ', href: '#home' },
  { id: 'schemes', labelEn: 'Schemes', labelGu: 'યોજનાઓ', href: '#schemes' },
  { id: 'eligibility', labelEn: 'Eligibility', labelGu: 'પાત્રતા', href: '#eligibility' },
  { id: 'track', labelEn: 'Track', labelGu: 'ટ્રેક કરો', href: '#how-it-works' },
  { id: 'about', labelEn: 'About', labelGu: 'અમારા વિશે', href: '#benefits' },
  { id: 'resources', labelEn: 'Updates', labelGu: 'અપડેટ્સ', href: '#resources' },
];

export const Navbar: React.FC<NavbarProps> = ({
  language,
  onLanguageChange,
  activeSection = 'home',
  onNavigate,
  searchQuery,
  onSearchChange,
  onSelectScheme,
  onOpenLogin,
}) => {
  const [currentNav, setCurrentNav] = useState<string>(activeSection);
  const [isSearchFocused, setIsSearchFocused] = useState<boolean>(false);
  const [isLangOpen, setIsLangOpen] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  const searchContainerRef = useRef<HTMLDivElement>(null);
  const langContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setCurrentNav(activeSection);
  }, [activeSection]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        setIsSearchFocused(false);
      }
      if (
        langContainerRef.current &&
        !langContainerRef.current.contains(event.target as Node)
      ) {
        setIsLangOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsSearchFocused(false);
        setIsLangOpen(false);
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const filteredSchemes = getStoredSchemes().filter((scheme) => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return true;
    return (
      scheme.shortTitle.toLowerCase().includes(q) ||
      scheme.description.toLowerCase().includes(q) ||
      scheme.categoryTag.toLowerCase().includes(q) ||
      scheme.titleGu.includes(q) ||
      scheme.descriptionGu.includes(q)
    );
  });

  const renderSchemeMiniIcon = (iconName: SchemeItem['icon']) => {
    switch (iconName) {
      case 'GraduationCap':
        return <GraduationCap className="w-4 h-4 text-forest-green" aria-hidden="true" />;
      case 'Bike':
        return <Bike className="w-4 h-4 text-forest-green" aria-hidden="true" />;
      case 'BookOpen':
        return <BookOpen className="w-4 h-4 text-forest-green" aria-hidden="true" />;
      case 'UsersRound':
        return <UsersRound className="w-4 h-4 text-forest-green" aria-hidden="true" />;
    }
  };

  const handleNavClick = (id: string, href: string) => {
    setCurrentNav(id);
    onNavigate?.(id);
    setIsMobileMenuOpen(false);
    scrollToSection(href);
  };

  return (
    <header data-site-navbar="true" className="sticky top-4 z-50 mx-auto w-full max-w-desktop px-3 sm:px-5 lg:px-6 xl:px-6 2xl:px-10">
      <nav
        aria-label="Primary Navigation"
        className="glass-navbar rounded-pill px-3.5 sm:px-4.5 xl:px-5 2xl:px-6 py-2.5 sm:py-3 flex items-center justify-between gap-2 xl:gap-2.5 2xl:gap-4 transition-all duration-normal ease-smooth"
      >
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('home', '#home');
          }}
          className="flex items-center gap-2.5 xl:gap-2.5 2xl:gap-3 group shrink-0 focus-visible:rounded-pill"
        >
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-forest-green flex items-center justify-center shadow-sm border border-warm-ivory/25 group-hover:scale-[1.03] transition-transform duration-fast ease-smooth shrink-0">
            <svg
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 sm:w-6 sm:h-6"
              aria-hidden="true"
            >
              <path
                d="M16 5C12.5 9.5 11 14 16 21C21 14 19.5 9.5 16 5Z"
                fill="#FA9231"
              />
              <path
                d="M15.2 21.2C10.2 19.5 7 15.8 6.5 11C10.8 11.8 13.8 14.8 15.2 21.2Z"
                fill="#E5EBDD"
              />
              <path
                d="M16.8 21.2C21.8 19.5 25 15.8 25.5 11C21.2 11.8 18.2 14.8 16.8 21.2Z"
                fill="#E5EBDD"
              />
              <path
                d="M8.5 24.5C11.2 23.2 13.8 23.2 16 24.5C18.2 23.2 20.8 23.2 23.5 24.5"
                stroke="#FFFCF7"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-charcoal text-[15px] sm:text-[16px] xl:text-[16px] 2xl:text-[17px] leading-tight tracking-tight whitespace-nowrap">
              Vidya Pragati Setu
            </span>
            <span className="text-[10.5px] sm:text-[11px] font-medium text-muted-text tracking-normal leading-tight hidden sm:block whitespace-nowrap">
              {language === 'gu' ? (
                <span lang="gu" className="font-gujarati">
                  શિક્ષણ · તક · સશક્તિકરણ
                </span>
              ) : (
                'Education · Opportunity · Empowerment'
              )}
            </span>
          </div>
        </a>

        <ul className="hidden xl:flex items-center gap-1 2xl:gap-1.5 bg-warm-ivory/60 border border-warm-border/70 rounded-pill p-1.5 shrink-0">
          {NAV_LINKS.map((link) => {
            const isActive = currentNav === link.id;
            return (
              <li key={link.id}>
                <a
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.id, link.href);
                  }}
                  aria-current={isActive ? 'page' : undefined}
                  className={cn(
                    'px-3.5 xl:px-3.5 2xl:px-4.5 py-1.5 rounded-pill text-[12.5px] 2xl:text-[13px] font-semibold transition-all duration-fast ease-smooth inline-block whitespace-nowrap',
                    isActive
                      ? 'bg-forest-green text-warm-ivory shadow-sm'
                      : 'text-charcoal/85 hover:text-forest-green hover:bg-sage-green/60'
                  )}
                >
                  {language === 'gu' ? (
                    <span lang="gu" className="font-gujarati">
                      {link.labelGu}
                    </span>
                  ) : (
                    link.labelEn
                  )}
                </a>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2 xl:gap-2.5 2xl:gap-3 shrink-0">
          <div ref={searchContainerRef} className="relative hidden md:block">
            <div
              className={cn(
                'glass-style-b rounded-pill flex items-center gap-2 px-3 xl:px-3.5 py-1.5 xl:py-2 transition-all duration-fast ease-smooth',
                isSearchFocused
                  ? 'w-48 md:w-52 xl:w-52 2xl:w-64 border-forest-green ring-2 ring-forest-green/15'
                  : 'w-38 md:w-40 xl:w-44 2xl:w-56'
              )}
            >
              <Search className="w-4 h-4 text-muted-text shrink-0" aria-hidden="true" />
              <input
                type="search"
                value={searchQuery}
                onFocus={() => setIsSearchFocused(true)}
                onChange={(e) => {
                  onSearchChange(e.target.value);
                  setIsSearchFocused(true);
                }}
                placeholder={
                  language === 'gu' ? 'યોજના શોધો...' : 'Search schemes...'
                }
                aria-label="Search student schemes"
                className="w-full bg-transparent text-[12.5px] 2xl:text-[13px] text-charcoal placeholder:text-muted-text/80 focus:outline-none"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => onSearchChange('')}
                  aria-label="Clear search query"
                  className="text-muted-text hover:text-charcoal p-0.5 rounded-full"
                >
                  <X className="w-3.5 h-3.5" aria-hidden="true" />
                </button>
              )}
            </div>

            <AnimatePresence>
              {isSearchFocused && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 6 }}
                  transition={{ duration: 0.16 }}
                  className="glass-style-d absolute right-0 mt-2 w-80 rounded-glass p-2.5 z-50 border border-warm-border shadow-glass-hover"
                  role="region"
                  aria-label="Scheme search suggestions"
                >
                  <div className="px-2.5 py-1 flex items-center justify-between text-[11px] font-semibold uppercase tracking-wider text-muted-text">
                    <span>
                      {searchQuery.trim()
                        ? 'Matching Schemes'
                        : 'Popular Scheme Categories'}
                    </span>
                    <span>{filteredSchemes.length} found</span>
                  </div>

                  {filteredSchemes.length > 0 ? (
                    <ul className="mt-1 space-y-1">
                      {filteredSchemes.map((scheme) => (
                        <li key={scheme.id}>
                          <button
                            type="button"
                            onClick={() => {
                              setIsSearchFocused(false);
                              if (onSelectScheme) {
                                onSelectScheme(scheme);
                              } else {
                                handleNavClick('schemes', '#schemes');
                              }
                            }}
                            className="w-full text-left px-2.5 py-2 rounded-glass-sm hover:bg-sage-green/75 transition-colors duration-fast flex items-start gap-2.5 group"
                          >
                            <div className="w-8 h-8 rounded-lg bg-sage-green flex items-center justify-center shrink-0 mt-0.5">
                              {renderSchemeMiniIcon(scheme.icon)}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-[13px] font-semibold text-charcoal group-hover:text-forest-green truncate">
                                {language === 'gu' ? (
                                  <span lang="gu" className="font-gujarati">
                                    {scheme.shortTitleGu}
                                  </span>
                                ) : (
                                  scheme.shortTitle
                                )}
                              </p>
                              <p className="text-[11.5px] text-muted-text truncate">
                                {language === 'gu' ? (
                                  <span lang="gu" className="font-gujarati">
                                    {scheme.descriptionGu}
                                  </span>
                                ) : (
                                  scheme.description
                                )}
                              </p>
                            </div>
                            <ArrowRight
                              className="w-3.5 h-3.5 text-muted-text group-hover:text-forest-green group-hover:translate-x-0.5 transition-all shrink-0 mt-2"
                              aria-hidden="true"
                            />
                          </button>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="px-3 py-4 text-center">
                      <p className="text-body-sm font-medium text-charcoal">
                        No matching schemes found
                      </p>
                      <p className="text-utility text-muted-text mt-0.5">
                        Try searching for &ldquo;Scholarship&rdquo;, &ldquo;Bicycle&rdquo;, or &ldquo;Textbooks&rdquo;.
                      </p>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div ref={langContainerRef} className="relative shrink-0">
            <button
              type="button"
              onClick={() => setIsLangOpen((prev) => !prev)}
              aria-expanded={isLangOpen}
              aria-haspopup="listbox"
              aria-label="Select website language"
              className="glass-style-d px-2.5 2xl:px-3.5 py-1.5 2xl:py-2 rounded-pill text-[12px] 2xl:text-[13px] font-semibold text-charcoal flex items-center gap-1 xl:gap-1.5 hover:border-forest-green/50 whitespace-nowrap shrink-0"
            >
              <span className={language === 'en' ? 'text-forest-green font-bold' : 'text-charcoal/80'}>
                EN
              </span>
              <span className="text-warm-border">|</span>
              <span
                lang="gu"
                className={cn(
                  'font-gujarati',
                  language === 'gu' ? 'text-forest-green font-bold' : 'text-charcoal/80'
                )}
              >
                ગુજરાતી
              </span>
              <ChevronDown
                className={cn(
                  'w-3.5 h-3.5 text-muted-text transition-transform duration-fast',
                  isLangOpen && 'rotate-180 text-forest-green'
                )}
                aria-hidden="true"
              />
            </button>

            <AnimatePresence>
              {isLangOpen && (
                <motion.ul
                  initial={{ opacity: 0, y: 6, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 6, scale: 0.98 }}
                  transition={{ duration: 0.16 }}
                  role="listbox"
                  aria-label="Language options"
                  className="glass-style-d absolute right-0 mt-2 w-44 rounded-glass-sm p-1.5 z-50 border border-warm-border shadow-glass-hover"
                >
                  <li role="option" aria-selected={language === 'en'}>
                    <button
                      type="button"
                      onClick={() => {
                        onLanguageChange('en');
                        setIsLangOpen(false);
                      }}
                      className={cn(
                        'w-full px-3 py-2 rounded-lg text-left text-[13px] flex items-center justify-between transition-colors duration-fast',
                        language === 'en'
                          ? 'bg-forest-green text-warm-ivory font-semibold'
                          : 'text-charcoal hover:bg-sage-green/70 font-medium'
                      )}
                    >
                      <span>English (EN)</span>
                      {language === 'en' && (
                        <CheckCircle2 className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                      )}
                    </button>
                  </li>
                  <li role="option" aria-selected={language === 'gu'} className="mt-1">
                    <button
                      type="button"
                      onClick={() => {
                        onLanguageChange('gu');
                        setIsLangOpen(false);
                      }}
                      className={cn(
                        'w-full px-3 py-2 rounded-lg text-left text-[13px] flex items-center justify-between transition-colors duration-fast',
                        language === 'gu'
                          ? 'bg-forest-green text-warm-ivory font-semibold'
                          : 'text-charcoal hover:bg-sage-green/70 font-medium'
                      )}
                    >
                      <span lang="gu" className="font-gujarati">
                        ગુજરાતી (GU)
                      </span>
                      {language === 'gu' && (
                        <CheckCircle2 className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                      )}
                    </button>
                  </li>
                </motion.ul>
              )}
            </AnimatePresence>
          </div>

          <button
            type="button"
            onClick={onOpenLogin}
            className="btn-primary px-3.5 2xl:px-5 py-1.5 2xl:py-2 rounded-pill text-[12.5px] 2xl:text-[13.5px] font-semibold shrink-0"
          >
            {language === 'gu' ? (
              <span lang="gu" className="font-gujarati">
                લૉગિન
              </span>
            ) : (
              'Login'
            )}
          </button>

          <button
            type="button"
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            aria-expanded={isMobileMenuOpen}
            aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="xl:hidden glass-style-b p-2 rounded-full text-charcoal hover:text-forest-green"
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5" aria-hidden="true" />
            ) : (
              <Menu className="w-5 h-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
            className="xl:hidden glass-style-a mt-2 rounded-glass p-4 border border-warm-border shadow-glass"
          >
            <div className="mb-3 md:hidden">
              <div className="glass-style-b rounded-pill flex items-center gap-2 px-3.5 py-2">
                <Search className="w-4 h-4 text-muted-text shrink-0" aria-hidden="true" />
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  placeholder="Search schemes..."
                  aria-label="Search student schemes"
                  className="w-full bg-transparent text-body-sm text-charcoal placeholder:text-muted-text focus:outline-none"
                />
              </div>
            </div>
            <ul className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {NAV_LINKS.map((link) => {
                const isActive = currentNav === link.id;
                return (
                  <li key={link.id}>
                    <a
                      href={link.href}
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavClick(link.id, link.href);
                      }}
                      className={cn(
                        'block px-3.5 py-2 rounded-glass-sm text-body-sm font-semibold text-center transition-colors',
                        isActive
                          ? 'bg-forest-green text-warm-ivory'
                          : 'bg-warm-ivory/80 text-charcoal hover:bg-sage-green'
                      )}
                    >
                      {language === 'gu' ? (
                        <span lang="gu" className="font-gujarati">
                          {link.labelGu}
                        </span>
                      ) : (
                        link.labelEn
                      )}
                    </a>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
