import React from 'react';
import { Globe } from 'lucide-react';
import { Dropdown, DropdownOption } from './Dropdown';

export type Language = 'en' | 'gu';

export interface LanguageSelectorProps {
  language: Language;
  onChange: (lang: Language) => void;
  variant?: 'light' | 'dark';
  direction?: 'down' | 'up';
  align?: 'left' | 'right';
  className?: string;
  compact?: boolean;
}

const LANGUAGE_OPTIONS: DropdownOption[] = [
  { value: 'en', label: 'English (EN)' },
  { value: 'gu', label: 'ગુજરાતી (GU)' },
];

const COMPACT_LANGUAGE_OPTIONS: DropdownOption[] = [
  { value: 'en', label: 'EN' },
  { value: 'gu', label: 'ગુ' },
];

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  language,
  onChange,
  variant = 'light',
  direction = 'down',
  align = 'right',
  className = 'w-40',
  compact = false,
}) => {
  return (
    <div className={className}>
      <Dropdown
        value={language}
        options={compact ? COMPACT_LANGUAGE_OPTIONS : LANGUAGE_OPTIONS}
        onChange={(val) => onChange(val as Language)}
        size="sm"
        variant={variant}
        direction={direction}
        align={align}
        ariaLabel={language === 'gu' ? 'ભાષા પસંદ કરો' : 'Select language'}
        icon={
          compact ? undefined : <Globe
            className={`w-4 h-4 ${
              variant === 'dark' ? 'text-saffron' : 'text-forest-green'
            }`}
            aria-hidden="true"
          />
        }
      />
    </div>
  );
};

export default LanguageSelector;