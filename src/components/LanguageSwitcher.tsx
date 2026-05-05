import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Globe, Check } from 'lucide-react';

const LanguageSwitcher = () => {
  const { i18n, t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const languages = [
    { code: 'id', label: t('language.id'), flag: '🇮🇩' },
    { code: 'en', label: t('language.en'), flag: '🇬🇧' },
  ];

  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLanguageChange = (code: string) => {
    i18n.changeLanguage(code);
    setIsOpen(false);
  };

  return (
    <div ref={dropdownRef} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-xl glass text-white/70 hover:text-white hover:bg-white/10 transition-all"
        aria-label={t('language.title')}
      >
        <Globe className="w-4 h-4" />
        <span className="text-sm hidden sm:inline">{currentLanguage.code.toUpperCase()}</span>
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 py-2 rounded-xl glass min-w-[140px] z-50">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleLanguageChange(lang.code)}
              className={`w-full flex items-center justify-between px-4 py-2 text-sm transition-colors ${
                i18n.language === lang.code
                  ? 'text-neon-blue bg-neon-blue/10'
                  : 'text-white/70 hover:text-white hover:bg-white/5'
              }`}
            >
              <span className="flex items-center gap-2">
                <span>{lang.flag}</span>
                <span>{lang.label}</span>
              </span>
              {i18n.language === lang.code && <Check className="w-4 h-4" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;
