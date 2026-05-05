import { useTranslation } from 'react-i18next';
import { Heart, Instagram, Twitter, Linkedin, Github } from 'lucide-react';

const Footer = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Instagram, href: 'https://instagram.com/hamdnws', label: 'Instagram' },
    { icon: Twitter, href: 'https://twitter.com/hamdnws', label: 'Twitter' },
    { icon: Linkedin, href: 'https://linkedin.com/in/hamdnws', label: 'LinkedIn' },
    { icon: Github, href: 'https://github.com/hamdnws', label: 'GitHub' },
  ];

  const quickLinks = [
    { label: t('nav.home'), href: '#hero' },
    { label: t('nav.about'), href: '#about' },
    { label: t('nav.skills'), href: '#skills' },
    { label: t('nav.portfolio'), href: '#portfolio' },
    { label: t('nav.contact'), href: '#contact' },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="relative w-full py-16 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-t from-dark to-transparent" />
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-[600px] h-[300px] bg-neon-blue/10 rounded-full blur-[150px]" />

      <div className="relative z-10 section-padding">
        <div className="max-w-7xl mx-auto">
          {/* Main Footer Content */}
          <div className="grid md:grid-cols-3 gap-12 mb-12">
            {/* Brand */}
            <div className="md:col-span-1">
              <a
                href="#hero"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('#hero');
                }}
                className="text-2xl font-bold text-white hover:text-neon-blue transition-colors inline-block mb-4"
              >
                Hamdnws<span className="text-neon-blue">.</span>
              </a>
              <p className="text-white/60 text-sm mb-6 max-w-xs">
                {t('footer.description')}
              </p>
              {/* Social Links */}
              <div className="flex gap-3">
                {socialLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-xl glass flex items-center justify-center text-white/60 hover:text-neon-blue hover:bg-neon-blue/10 transition-all"
                    aria-label={link.label}
                  >
                    <link.icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-white font-semibold mb-4">{t('footer.quickLinks')}</h4>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToSection(link.href);
                      }}
                      className="text-white/60 hover:text-neon-blue transition-colors text-sm"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-white font-semibold mb-4">{t('footer.contact')}</h4>
              <ul className="space-y-3 text-sm">
                <li className="text-white/60">
                  <span className="block text-white/40 text-xs mb-1">Email</span>
                  <a href="mailto:hamadaniwashofi15@gmail.com" className="hover:text-neon-blue transition-colors">
                    hamadaniwashofi15@gmail.com
                  </a>
                </li>
                <li className="text-white/60">
                  <span className="block text-white/40 text-xs mb-1">WhatsApp</span>
                  <a href="https://wa.me/6281515634492" className="hover:text-neon-blue transition-colors">
                    +62 815-1563-4492
                  </a>
                </li>
                <li className="text-white/60">
                  <span className="block text-white/40 text-xs mb-1">{t('contact.info.location')}</span>
                  {t('contact.info.locationValue')}
                </li>
              </ul>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-white/10 mb-8" />

          {/* Bottom Footer */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-white/40 text-sm text-center sm:text-left">
              {t('footer.copyright', { year: currentYear })}
            </p>
            <p className="text-white/40 text-sm flex items-center gap-1">
              {t('footer.madeWith')} <Heart className="w-4 h-4 text-red-400 fill-red-400" />
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
