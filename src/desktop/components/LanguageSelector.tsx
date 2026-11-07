import React from 'react';
import { Language } from '../../data/schemes';
import { Dropdown, DropdownOption } from './Dropdown';

export interface LanguageSelectorProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  menuAlign?: 'left' | 'right';
  className?: string;
}

const LANGUAGE_OPTIONS: DropdownOption[] = [
  {
    value: 'en',
    label: 'English (EN)',
    sublabel: 'Default Interface',
    lang: 'en',
  },
  {
    value: 'gu',
    label: 'ગુજરાતી (GU)',
    sublabel: 'ગુજરાતી ભાષા',
    lang: 'gu',
  },
];

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  language,
  onLanguageChange,
  menuAlign = 'right',
  className,
}) => {
  const handleSelect = (val: string) => {
    onLanguageChange(val as Language);
  };

  return (
    <Dropdown
      value={language}
      options={LANGUAGE_OPTIONS}
      onChange={handleSelect}
      ariaLabel="Switch language between English and Gujarati"
      menuAlign={menuAlign}
      className={className}
    />
  );
};

export default LanguageSelector;
