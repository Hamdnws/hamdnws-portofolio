import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Palette, Monitor, Layers, PenTool } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface Skill {
  name: string;
  level: number;
  icon: React.ElementType;
  category: string;
}

const Skills = () => {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const [animatedSkills, setAnimatedSkills] = useState<Set<string>>(new Set());

  const skills: Skill[] = [
    { name: 'Visual Identity System', level: 95, icon: Palette, category: 'Branding' },
    { name: 'Brand Strategy', level: 90, icon: Layers, category: 'Strategy' },
    { name: 'Social Media Design', level: 92, icon: Monitor, category: 'Marketing' },
    { name: 'Typography & Layout', level: 88, icon: PenTool, category: 'Design' },
    { name: 'Canva', level: 93, icon: Monitor, category: 'Tools' },
    { name: 'Adobe Photoshop', level: 90, icon: Palette, category: 'Tools' },
    { name: 'Content Design', level: 91, icon: PenTool, category: 'Design' },
    { name: 'Creative Direction', level: 87, icon: Layers, category: 'Leadership' },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = cardsRef.current?.querySelectorAll('.skill-card') || [];

      gsap.fromTo(
        cards,
        {
          opacity: 0,
          y: 60,
          rotationX: -15,
        },
        {
          opacity: 1,
          y: 0,
          rotationX: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
            toggleActions: 'play none none reverse',
            onEnter: () => {
              setTimeout(() => {
                setAnimatedSkills(new Set(skills.map(s => s.name)));
              }, 500);
            },
          },
        }
      );

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
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="relative w-full py-24 lg:py-32 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/3 left-0 w-96 h-96 bg-neon-blue/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/3 right-0 w-80 h-80 bg-neon-purple/10 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 section-padding">
        <div className="max-w-7xl mx-auto">

          {/* Header */}
          <div className="text-center mb-16">
            <span className="header-reveal inline-block text-neon-blue text-sm font-medium tracking-wider uppercase mb-4">
              {t('skills.title')}
            </span>
            <h2 className="header-reveal heading-section text-white mb-4">
              {t('skills.heading')}{" "}
              <span className="text-neon-blue">
                {t('skills.headingHighlight')}
              </span>
            </h2>
            <p className="header-reveal text-body max-w-2xl mx-auto">
              {t('skills.description')}
            </p>
          </div>

          {/* Skills Grid */}
          <div
            ref={cardsRef}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            style={{ perspective: '1000px' }}
          >
            {skills.map((skill, index) => (
              <div
                key={skill.name}
                className="skill-card group relative glass rounded-3xl p-6 transition-all duration-500 hover:translate-z-12 hover:shadow-neon-lg"
                style={{
                  transformStyle: 'preserve-3d',
                  animationDelay: `${index * 0.1}s`,
                }}
              >
                {/* Hover Glow */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-neon-blue/20 to-neon-purple/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative z-10">

                  {/* Icon */}
                  <div className="w-14 h-14 rounded-2xl bg-neon-blue/10 flex items-center justify-center mb-4 group-hover:bg-neon-blue/20 group-hover:scale-110 transition-all duration-300">
                    <skill.icon className="w-7 h-7 text-neon-blue" />
                  </div>

                  {/* Name */}
                  <h3 className="text-lg font-semibold text-white mb-3">
                    {skill.name}
                  </h3>

                  {/* Progress Bar */}
                  <div className="relative h-2 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="absolute inset-y-0 left-0 bg-gradient-to-r from-neon-blue to-neon-purple rounded-full transition-all duration-1500 ease-out"
                      style={{
                        width: animatedSkills.has(skill.name)
                          ? `${skill.level}%`
                          : '0%',
                      }}
                    />
                  </div>

                  {/* Footer */}
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-xs text-white/50">
                      {skill.category}
                    </span>
                    <span className="text-sm font-medium text-neon-blue">
                      {skill.level}%
                    </span>
                  </div>
                </div>

                {/* Corner Dot */}
                <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-neon-blue/30 group-hover:bg-neon-blue group-hover:shadow-neon transition-all duration-300" />
              </div>
            ))}
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: '25+', label: t('skills.stats.projects') },
              { value: '15+', label: t('skills.stats.clients') },
              { value: '5+', label: t('skills.stats.experience') },
              { value: '98%', label: t('skills.stats.satisfaction') },
            ].map((stat, index) => (
              <div
                key={index}
                className="text-center p-6 rounded-2xl glass hover:bg-white/5 transition-colors"
              >
                <div className="text-3xl sm:text-4xl font-bold text-neon-blue mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-white/60">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default Skills;
