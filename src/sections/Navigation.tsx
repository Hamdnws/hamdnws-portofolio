import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Menu, X } from 'lucide-react';
import LanguageSwitcher from '../components/LanguageSwitcher';

const Navigation = () => {
  const { t } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: t('nav.home'), href: '#hero' },
    { label: t('nav.about'), href: '#about' },
    { label: t('nav.skills'), href: '#skills' },
    { label: t('nav.portfolio'), href: '#portfolio' },
    { label: t('nav.journey'), href: '#journey' },
    { label: t('nav.contact'), href: '#contact' },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'nav-blur py-4'
            : 'py-6 bg-transparent'
        }`}
      >
        <div className="section-padding">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            {/* Logo */}
            <a
              href="#hero"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('#hero');
              }}
              className="text-xl font-bold text-white hover:text-neon-blue transition-colors"
            >
              Hamdnws<span className="text-neon-blue">.</span>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(link.href);
                  }}
                  className="px-4 py-2 text-sm text-white/70 hover:text-white rounded-full hover:bg-white/5 transition-all"
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* Right Side */}
            <div className="hidden md:flex items-center gap-3">
              <LanguageSwitcher />
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('#contact');
                }}
                className="px-6 py-2.5 rounded-full bg-neon-blue text-white text-sm font-medium hover:shadow-neon transition-all"
              >
                {t('nav.startProject')}
              </a>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center gap-2 md:hidden">
              <LanguageSwitcher />
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="w-10 h-10 rounded-xl glass flex items-center justify-center text-white"
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-all duration-500 ${
          isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-dark/95 backdrop-blur-xl"
          onClick={() => setIsMobileMenuOpen(false)}
        />

        {/* Menu Content */}
        <div className="relative h-full flex flex-col items-center justify-center gap-6">
          {navLinks.map((link, index) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(link.href);
              }}
              className="text-2xl font-medium text-white/70 hover:text-white transition-colors"
              style={{
                animationDelay: `${index * 0.1}s`,
              }}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('#contact');
            }}
            className="mt-6 px-8 py-3 rounded-full bg-neon-blue text-white font-medium"
          >
            {t('nav.startProject')}
          </a>
        </div>
      </div>
    </>
  );
};

export default Navigation;
