import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { gsap } from 'gsap';
import { ArrowDown, Sparkles } from 'lucide-react';

const Hero = () => {
  const { t } = useTranslation();
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const publicAsset = (path: string) => `${import.meta.env.BASE_URL}${path}`;

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial setup
      gsap.set([titleRef.current, subtitleRef.current, taglineRef.current, ctaRef.current], {
        opacity: 0,
        y: 50,
      });
      gsap.set(imageRef.current, {
        opacity: 0,
        scale: 1.2,
      });
      gsap.set(glowRef.current, {
        opacity: 0,
        scale: 0.8,
      });

      // Animation timeline
      const tl = gsap.timeline({ delay: 0.3 });

      tl.to(glowRef.current, {
        opacity: 1,
        scale: 1,
        duration: 1.5,
        ease: 'power3.out',
      })
      .to(imageRef.current, {
        opacity: 1,
        scale: 1,
        duration: 1.2,
        ease: 'power3.out',
      }, '-=1')
      .to(titleRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
      }, '-=0.8')
      .to(subtitleRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
      }, '-=0.6')
      .to(taglineRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
      }, '-=0.5')
      .to(ctaRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'back.out(1.7)',
      }, '-=0.4');

      // Continuous floating animation for image
      gsap.to(imageRef.current, {
        y: -15,
        duration: 4,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
      });

      // Glow pulse animation
      gsap.to(glowRef.current, {
        scale: 1.1,
        opacity: 0.6,
        duration: 3,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
      });

    }, heroRef);

    return () => ctx.revert();
  }, []);

  const scrollToPortfolio = () => {
    const portfolioSection = document.getElementById('portfolio');
    if (portfolioSection) {
      portfolioSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden"
    >
      {/* Animated Background */}
      <div className="absolute inset-0 animated-bg">
        {/* Gradient Orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-neon-blue/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-neon-purple/15 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-neon-blue/10 rounded-full blur-[150px]" />
      </div>

      {/* Grid Pattern Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(61, 76, 245, 0.5) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(61, 76, 245, 0.5) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Main Content */}
      <div className="relative z-10 w-full section-padding py-20">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Left Content */}
          <div className="order-2 lg:order-1 text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6">
              <Sparkles className="w-4 h-4 text-neon-blue" />
              <span className="text-sm text-white/80">{t('hero.available')}</span>
            </div>

            {/* Main Title */}
            <h1
              ref={titleRef}
              className="heading-hero text-white mb-4"
            >
              <span className="block">Hamadani</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-neon-blue via-neon-purple to-neon-blue">
                Wa Shofi
              </span>
            </h1>

            {/* Subtitle */}
            <p
              ref={subtitleRef}
              className="text-lg sm:text-xl text-white/60 mb-4 font-light tracking-wide"
            >
              {t('hero.subtitle')}
            </p>

            {/* Tagline */}
            <p
              ref={taglineRef}
              className="text-base sm:text-lg text-white/40 mb-8 max-w-lg mx-auto lg:mx-0"
            >
              {t('hero.tagline')}
            </p>

            {/* CTA Buttons */}
            <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button
                onClick={scrollToPortfolio}
                className="btn-primary flex items-center justify-center gap-2 group"
              >
                <span>{t('hero.viewPortfolio')}</span>
                <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
              </button>
              <a
                href="#contact"
                className="btn-outline"
              >
                {t('hero.contactMe')}
              </a>
            </div>
          </div>

          {/* Right Content - Hero Image */}
          <div className="order-1 lg:order-2 relative flex justify-center">
            {/* Glow Effect Behind Image */}
            <div
              ref={glowRef}
              className="absolute inset-0 flex items-center justify-center"
            >
              <div className="w-80 h-80 sm:w-96 sm:h-96 bg-neon-blue/30 rounded-full blur-[80px]" />
            </div>

            {/* Hero Image */}
            <div
              ref={imageRef}
              className="relative w-72 h-72 sm:w-96 sm:h-96 lg:w-[500px] lg:h-[500px]"
            >
              <div className="absolute inset-0 rounded-3xl overflow-hidden glass glow-blue-soft">
                <img
                  src={publicAsset('hero-image.jpg')}
                  alt="Hamdnws Creative Design"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Decorative Elements */}
              <div className="absolute -top-4 -right-4 w-20 h-20 border-2 border-neon-blue/30 rounded-2xl animate-float" />
              <div className="absolute -bottom-6 -left-6 w-16 h-16 bg-neon-blue/20 rounded-xl animate-float" style={{ animationDelay: '1s' }} />
              
              {/* Floating Stats Card */}
              <div className="absolute -bottom-4 -right-4 sm:-bottom-6 sm:-right-6 glass rounded-2xl p-4 animate-float" style={{ animationDelay: '2s' }}>
                <div className="text-2xl sm:text-3xl font-bold text-neon-blue">5+</div>
                <div className="text-xs text-white/60">{t('hero.yearsExperience')}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-dark to-transparent" />
    </section>
  );
};

export default Hero;
