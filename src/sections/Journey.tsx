import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Briefcase, GraduationCap, Users, Rocket } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface JourneyItem {
  year: string;
  titleKey: string;
  descriptionKey: string;
  icon: React.ElementType;
}

const Journey = () => {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  const journeyItems: JourneyItem[] = [
    {
      year: '2018',
      titleKey: 'journey.milestones.2018.title',
      descriptionKey: 'journey.milestones.2018.description',
      icon: GraduationCap,
    },
    {
      year: '2021',
      titleKey: 'journey.milestones.2021.title',
      descriptionKey: 'journey.milestones.2021.description',
      icon: Briefcase,
    },
    {
      year: '2023',
      titleKey: 'journey.milestones.2023.title',
      descriptionKey: 'journey.milestones.2023.description',
      icon: Users,
    },
    {
      year: '2025',
      titleKey: 'journey.milestones.2025.title',
      descriptionKey: 'journey.milestones.2025.description',
      icon: Rocket,
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        sectionRef.current?.querySelectorAll('.header-reveal') || [],
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          },
        }
      );

      // Line animation
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0, transformOrigin: 'top center' },
        {
          scaleY: 1,
          duration: 1.5,
          ease: 'power2.inOut',
          scrollTrigger: {
            trigger: timelineRef.current,
            start: 'top 70%',
          },
        }
      );

      const items = timelineRef.current?.querySelectorAll('.journey-item') || [];

      items.forEach((item, index) => {
        const isLeft = index % 2 === 0;

        gsap.fromTo(
          item,
          { opacity: 0, x: window.innerWidth >= 768 ? (isLeft ? -50 : 50) : 30 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            delay: index * 0.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 80%',
            },
          }
        );

        const dot = item.querySelector('.timeline-dot-inner');
        if (dot) {
          gsap.fromTo(
            dot,
            { scale: 0 },
            {
              scale: 1,
              duration: 0.5,
              delay: index * 0.2 + 0.3,
              ease: 'elastic.out(1, 0.5)',
              scrollTrigger: {
                trigger: item,
                start: 'top 80%',
              },
            }
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="journey"
      className="relative w-full py-24 lg:py-32 overflow-hidden"
    >
      <div className="relative z-10 section-padding">
        <div className="max-w-5xl mx-auto">
          
          {/* HEADER */}
          <div className="text-center mb-16">
            <span className="header-reveal inline-block text-neon-blue text-sm font-medium tracking-wider uppercase mb-4">
              {t('journey.title')}
            </span>
            <h2 className="header-reveal heading-section text-white mb-4">
              {t('journey.heading')}{' '}
              <span className="text-neon-blue">
                {t('journey.headingHighlight')}
              </span>
            </h2>
            <p className="header-reveal text-body max-w-2xl mx-auto">
              {t('journey.description')}
            </p>
          </div>

          {/* TIMELINE */}
          <div ref={timelineRef} className="relative">

            {/* Desktop Line */}
            <div
              ref={lineRef}
              className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[2px] -translate-x-1/2 bg-gradient-to-b from-neon-blue via-neon-purple to-transparent"
            />

            {/* Mobile Line */}
            <div className="md:hidden absolute left-4 top-0 bottom-0 w-[2px] bg-gradient-to-b from-neon-blue via-neon-purple to-transparent" />

            <div className="space-y-12">
              {journeyItems.map((item, index) => {
                const isLeft = index % 2 === 0;
                const Icon = item.icon;

                return (
                  <div
                    key={item.year}
                    className="journey-item relative md:grid md:grid-cols-2 md:gap-8"
                  >
                    {/* DOT DESKTOP (center) */}
                    <div className="hidden md:flex absolute left-1/2 top-6 -translate-x-1/2 z-10">
                      <div className="timeline-dot-inner relative w-5 h-5">
                        <div className="absolute inset-0 rounded-full bg-neon-blue border-4 border-dark" />
                        <div className="absolute inset-0 rounded-full bg-neon-blue animate-ping opacity-40" />
                      </div>
                    </div>

                    {/* DOT MOBILE (rata kiri, tidak center) */}
                    <div className="md:hidden absolute left-1.5 top-6 z-10">
                      <div className="timeline-dot-inner relative w-5 h-5">
                        <div className="absolute inset-0 rounded-full bg-neon-blue border-4 border-dark" />
                        <div className="absolute inset-0 rounded-full bg-neon-blue animate-ping opacity-40" />
                      </div>
                    </div>

                    {/* CONTENT */}
                    <div
                      className={`pl-16 md:pl-0 ${
                        isLeft
                          ? 'md:pr-12 md:text-right'
                          : 'md:col-start-2 md:pl-12'
                      }`}
                    >
                      <div
                        className={`glass rounded-3xl p-6 hover:bg-white/5 transition-all duration-300 ${
                          isLeft ? 'md:ml-auto' : ''
                        }`}
                        style={{ maxWidth: '420px' }}
                      >
                        <div
                          className={`flex items-center gap-2 mb-4 ${
                            isLeft ? 'md:flex-row-reverse' : ''
                          }`}
                        >
                          <span className="px-4 py-1 rounded-full bg-neon-blue/20 text-neon-blue text-sm font-bold">
                            {item.year}
                          </span>
                          <div className="w-10 h-10 rounded-xl bg-neon-blue/10 flex items-center justify-center">
                            <Icon className="w-5 h-5 text-neon-blue" />
                          </div>
                        </div>

                        <h3 className="text-xl font-semibold text-white mb-2">
                          {t(item.titleKey)}
                        </h3>

                        <p className="text-sm text-white/60 leading-relaxed">
                          {t(item.descriptionKey)}
                        </p>
                      </div>
                    </div>

                    {isLeft && <div className="hidden md:block" />}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Journey;
