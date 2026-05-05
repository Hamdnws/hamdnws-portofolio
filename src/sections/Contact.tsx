import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, Phone, Instagram, Send, MapPin, ArrowUpRight } from 'lucide-react';
import { toast } from 'sonner';
import emailjs from '@emailjs/browser';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(
        sectionRef.current?.querySelectorAll('.header-reveal') || [],
        {
          opacity: 0,
          y: 30,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Form animation
      gsap.fromTo(
        formRef.current,
        {
          opacity: 0,
          y: 50,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: formRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Social buttons animation
      gsap.fromTo(
        sectionRef.current?.querySelectorAll('.social-btn') || [],
        {
          opacity: 0,
          scale: 0.8,
        },
        {
          opacity: 1,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    await emailjs.send(
      'service_0dqpfun',
      'template_qzh4jvg',
      {
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message,
      },
      'M4V6U2l9nmLSMaudl'
    );

    toast.success('Pesan berhasil dikirim!');
    setFormData({ name: '', email: '', message: '' });
  } catch (error) {
    toast.error('Gagal mengirim pesan.');
  }
};

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const socialLinks = [
    {
      icon: Mail,
      label: 'Email',
      value: 'hamadaniwashofi15@gmail.com',
      href: 'mailto:hamadaniwashofi15@gmail.com',
      color: 'hover:bg-red-500/20 hover:text-red-400',
    },
    {
      icon: Phone,
      label: 'WhatsApp',
      value: '+62 815-1563-4492',
      href: 'https://wa.me/6281515634492',
      color: 'hover:bg-green-500/20 hover:text-green-400',
    },
    {
      icon: Instagram,
      label: 'Instagram',
      value: '@hamdnws',
      href: 'https://instagram.com/hamdnws',
      color: 'hover:bg-pink-500/20 hover:text-pink-400',
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative w-full py-24 lg:py-32 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-neon-blue/5 to-transparent">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-neon-blue/15 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-neon-purple/15 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 section-padding">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <span className="header-reveal inline-block text-neon-blue text-sm font-medium tracking-wider uppercase mb-4">
              {t('contact.title')}
            </span>
            <h2 className="header-reveal heading-section text-white mb-4">
              {t('contact.heading')} <span className="text-neon-blue">{t('contact.headingHighlight')}</span>
            </h2>
            <p className="header-reveal text-body max-w-2xl mx-auto">
              {t('contact.description')}
            </p>
          </div>

          <div className="grid lg:grid-cols-5 gap-12">
            {/* Left - Contact Info */}
            <div className="lg:col-span-2 space-y-8">
              {/* Contact Cards */}
              <div className="space-y-4">
                {socialLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`social-btn group flex items-center gap-4 p-4 rounded-2xl glass transition-all duration-300 ${link.color}`}
                  >
                    <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <link.icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm text-white/50">{link.label}</div>
                      <div className="text-white font-medium">{link.value}</div>
                    </div>
                    <ArrowUpRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                ))}
              </div>

              {/* Location */}
              <div className="glass rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <MapPin className="w-5 h-5 text-neon-blue" />
                  <span className="text-white font-medium">{t('contact.info.location')}</span>
                </div>
                <p className="text-white/60 text-sm">
                  {t('contact.info.locationValue')}<br />
                  {t('contact.info.locationDetail')}
                </p>
              </div>

              {/* Availability */}
              <div className="glass rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-white font-medium">{t('contact.info.availability')}</span>
                </div>
                <p className="text-white/60 text-sm">
                  {t('contact.info.availabilityDetail')}
                </p>
              </div>
            </div>

            {/* Right - Contact Form */}
            <div className="lg:col-span-3">
              <form
                ref={formRef}
                onSubmit={handleSubmit}
                className="glass rounded-3xl p-8 space-y-6"
              >
                <div className="grid sm:grid-cols-2 gap-6">
                  {/* Name Input */}
                  <div className="space-y-2">
                    <label className="text-sm text-white/60">{t('contact.form.name')}</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder={t('contact.form.namePlaceholder')}
                      className="w-full px-4 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:border-neon-blue focus:ring-2 focus:ring-neon-blue/20 transition-all outline-none"
                    />
                  </div>

                  {/* Email Input */}
                  <div className="space-y-2">
                    <label className="text-sm text-white/60">{t('contact.form.email')}</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder={t('contact.form.emailPlaceholder')}
                      className="w-full px-4 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:border-neon-blue focus:ring-2 focus:ring-neon-blue/20 transition-all outline-none"
                    />
                  </div>
                </div>

                {/* Message Input */}
                <div className="space-y-2">
                  <label className="text-sm text-white/60">{t('contact.form.message')}</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    placeholder={t('contact.form.messagePlaceholder')}
                    className="w-full px-4 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:border-neon-blue focus:ring-2 focus:ring-neon-blue/20 transition-all outline-none resize-none"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full btn-primary flex items-center justify-center gap-2 group"
                >
                  <span>{t('contact.form.submit')}</span>
                  <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
