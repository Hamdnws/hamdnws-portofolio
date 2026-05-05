import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Palette, Monitor, Lightbulb } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Text reveal animation
      gsap.fromTo(
        textRef.current?.querySelectorAll('.reveal-item') || [],
        {
          opacity: 0,
          y: 40,
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

      // Images orbital entry animation
      const images = imagesRef.current?.querySelectorAll('.about-image') || [];
      images.forEach((img, index) => {
        gsap.fromTo(
          img,
          {
            opacity: 0,
            scale: 0.8,
            rotation: index % 2 === 0 ? -15 : 15,
          },
          {
            opacity: 1,
            scale: 1,
            rotation: 0,
            duration: 1,
            delay: index * 0.1,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 60%',
              toggleActions: 'play none none reverse',
            },
          }
        );

        // Parallax effect on scroll
        gsap.to(img, {
          y: index % 2 === 0 ? -30 : 30,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const highlights = [
  { icon: Palette, text: t('about.highlights.creativity') },
  { icon: Monitor, text: t('about.highlights.digitalDesign') },
  { icon: Lightbulb, text: t('about.highlights.brandStrategy') },
  { icon: Palette, text: t('about.highlights.visualIdentity') },
];


  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative w-full py-24 lg:py-32 overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-neon-blue/5 to-transparent" />
      
      <div className="relative z-10 section-padding">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left - Text Content */}
            <div ref={textRef} className="order-2 lg:order-1">
              <span className="reveal-item inline-block text-neon-blue text-sm font-medium tracking-wider uppercase mb-4">
                {t('about.title')}
              </span>
              
              <h2 className="reveal-item heading-section text-white mb-6">
                {t('about.heading')}
                <span className="text-neon-blue"> {t('about.headingHighlight')}</span>{' '}
                {t('about.headingEnd')}
              </h2>
              
              <p className="reveal-item text-body mb-6">
                {t('about.description1')}
              </p>
              
              <p className="reveal-item text-body mb-8">
                {t('about.description2')}
              </p>

              {/* Highlights Grid */}
              <div className="reveal-item grid grid-cols-2 gap-4">
                {highlights.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-4 rounded-2xl glass hover:bg-white/5 transition-colors group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-neon-blue/10 flex items-center justify-center group-hover:bg-neon-blue/20 transition-colors">
                      <item.icon className="w-5 h-5 text-neon-blue" />
                    </div>
                    <span className="text-sm text-white/80">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right - Floating Images */}
            <div ref={imagesRef} className="order-1 lg:order-2 relative h-[500px] lg:h-[600px]">
              {/* Image 1 - Top Left */}
              <div className="about-image absolute top-0 left-0 w-48 h-48 sm:w-56 sm:h-56 rounded-3xl overflow-hidden glass glow-blue-soft z-20 hover:z-50 transition-all duration-500 hover:scale-105">
                <img
                  src="/about-1.jpg"
                  alt="Design Work 1"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Image 2 - Top Right */}
              <div className="about-image absolute top-8 right-0 w-44 h-44 sm:w-52 sm:h-52 rounded-3xl overflow-hidden glass glow-blue-soft z-10 hover:z-50 transition-all duration-500 hover:scale-105">
                <img
                  src="/about-2.jpg"
                  alt="Design Work 2"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Image 3 - Bottom Left */}
              <div className="about-image absolute bottom-16 left-8 w-40 h-40 sm:w-48 sm:h-48 rounded-3xl overflow-hidden glass glow-blue-soft z-30 hover:z-50 transition-all duration-500 hover:scale-105">
                <img
                  src="/about-3.jpg"
                  alt="Design Work 3"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Image 4 - Bottom Right */}
              <div className="about-image absolute bottom-0 right-8 w-52 h-52 sm:w-60 sm:h-60 rounded-3xl overflow-hidden glass glow-blue-soft z-40 hover:z-50 transition-all duration-500 hover:scale-105">
                <img
                  src="/about-4.jpg"
                  alt="Design Work 4"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Decorative Elements */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 border border-neon-blue/20 rounded-full" />
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 border border-neon-blue/10 rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
