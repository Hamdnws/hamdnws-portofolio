import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Eye, X, ChevronLeft, ChevronRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface PortfolioItem {
  id: number;
  title: string;
  badge: string;
  image: string;
  description: string;
  details?: string;
  technologies?: string[];
}

const Portfolio = () => {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [displayCount, setDisplayCount] = useState(6);
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const publicAsset = (path: string) => `${import.meta.env.BASE_URL}${path}`;

  const portfolioItems: PortfolioItem[] = [
    {
      id: 1,
      title: t('portfolio.items.adidasSamba.title'),
      badge: t('portfolio.items.adidasSamba.badge'),
      image: publicAsset('img%20portofolio/Adidas%20Samba%20copy.jpg'),
      description: t('portfolio.items.adidasSamba.description'),
      details: t('portfolio.items.adidasSamba.details'),
      technologies: ['Product Poster', 'Photo Editing', 'Layout Design'],
    },
    {
      id: 2,
      title: t('portfolio.items.burgerDaily.title'),
      badge: t('portfolio.items.burgerDaily.badge'),
      image: publicAsset('img%20portofolio/Burger%20Daily%20copy.jpg'),
      description: t('portfolio.items.burgerDaily.description'),
      details: t('portfolio.items.burgerDaily.details'),
      technologies: ['F&B Promotion', 'Social Media Design', 'Typography'],
    },
    {
      id: 3,
      title: t('portfolio.items.elanNoir.title'),
      badge: t('portfolio.items.elanNoir.badge'),
      image: publicAsset('img%20portofolio/elan%20noir%20copy.jpg'),
      description: t('portfolio.items.elanNoir.description'),
      details: t('portfolio.items.elanNoir.details'),
      technologies: ['Luxury Branding', 'Product Visual', 'Typography'],
    },
    {
      id: 4,
      title: t('portfolio.items.goldenArka.title'),
      badge: t('portfolio.items.goldenArka.badge'),
      image: publicAsset('img%20portofolio/Golden%20Arka%20Residence%20copy.jpg'),
      description: t('portfolio.items.goldenArka.description'),
      details: t('portfolio.items.goldenArka.details'),
      technologies: ['Property Poster', 'Editorial Layout', 'Marketing Design'],
    },
    {
      id: 5,
      title: t('portfolio.items.kebabRev.title'),
      badge: t('portfolio.items.kebabRev.badge'),
      image: publicAsset('img%20portofolio/Kebab%20Rev%20copy.jpg'),
      description: t('portfolio.items.kebabRev.description'),
      details: t('portfolio.items.kebabRev.details'),
      technologies: ['F&B Promotion', 'Arabic Layout', 'Social Media Design'],
    },
  ];

  const displayedItems = portfolioItems.slice(0, displayCount);
  const hasMore = displayCount < portfolioItems.length;

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

      // Cards animation
      animateCards();
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    animateCards();
  }, [displayedItems]);

  const animateCards = () => {
    const cards = gridRef.current?.querySelectorAll('.portfolio-card') || [];
    
    gsap.fromTo(
      cards,
      {
        opacity: 0,
        y: 50,
        scale: 0.95,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power3.out',
      }
    );
  };

  const handleViewMore = () => {
    if (hasMore) {
      setDisplayCount(prev => prev + 3);
    } else {
      setDisplayCount(6);
    }
  };

  const openModal = (item: PortfolioItem) => {
    setSelectedItem(item);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = 'auto';
  };

  const navigateModal = (direction: 'prev' | 'next') => {
    if (!selectedItem) return;
    const currentIndex = displayedItems.findIndex(item => item.id === selectedItem.id);
    let newIndex: number;
    
    if (direction === 'prev') {
      newIndex = currentIndex > 0 ? currentIndex - 1 : displayedItems.length - 1;
    } else {
      newIndex = currentIndex < displayedItems.length - 1 ? currentIndex + 1 : 0;
    }
    
    setSelectedItem(displayedItems[newIndex]);
  };

  return (
    <>
      <section
        ref={sectionRef}
        id="portfolio"
        className="relative w-full py-24 lg:py-32 overflow-hidden"
      >
        {/* Background */}
        <div className="absolute inset-0">
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-neon-blue/10 rounded-full blur-[150px]" />
          <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-neon-purple/10 rounded-full blur-[120px]" />
        </div>

        <div className="relative z-10 section-padding">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <span className="header-reveal inline-block text-neon-blue text-sm font-medium tracking-wider uppercase mb-4">
                {t('portfolio.title')}
              </span>
              <h2 className="header-reveal heading-section text-white mb-4">
                {t('portfolio.heading')} <span className="text-neon-blue">{t('portfolio.headingHighlight')}</span>
              </h2>
              <p className="header-reveal text-body max-w-2xl mx-auto">
                {t('portfolio.description')}
              </p>
            </div>

            {/* Portfolio Grid */}
            <div
              ref={gridRef}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {displayedItems.map((item) => (
                <div
                  key={item.id}
                  className="portfolio-card group relative rounded-3xl overflow-hidden glass card-hover"
                >
                  {/* Image */}
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-dark/95 via-dark/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    {/* Hover Content */}
                    <div className="absolute inset-0 flex flex-col justify-end p-6 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                      <span className="inline-block px-3 py-1 rounded-full bg-neon-blue/20 text-neon-blue text-xs font-medium mb-3 w-fit">
                        {item.badge}
                      </span>
                      <h3 className="text-xl font-semibold text-white mb-2">
                        {item.title}
                      </h3>
                      <p className="text-sm text-white/70 mb-4 line-clamp-2">
                        {item.description}
                      </p>
                      <div className="flex gap-3">
                        <button 
                          onClick={() => openModal(item)}
                          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-neon-blue text-white text-sm font-medium hover:bg-neon-blue/80 transition-colors"
                        >
                          <Eye className="w-4 h-4" />
                          <span>{t('portfolio.buttons.detail')}</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Category Badge (Visible when not hovered) */}
                  <div className="absolute top-4 right-4 px-3 py-1 rounded-full glass text-white/80 text-xs font-medium group-hover:opacity-0 transition-opacity">
                    {item.badge}
                  </div>
                </div>
              ))}
            </div>

            {/* View More Button */}
            {portfolioItems.length > 6 && (
              <div className="text-center mt-12">
                <button 
                  onClick={handleViewMore}
                  className="btn-outline"
                >
                  {hasMore ? t('portfolio.buttons.viewMore') : t('portfolio.buttons.viewLess')}
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Detail Modal */}
      {isModalOpen && selectedItem && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={closeModal}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-dark/95 backdrop-blur-xl" />
          
          {/* Modal Content */}
          <div 
            className="relative w-full max-w-4xl max-h-[90vh] overflow-auto glass rounded-3xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full glass flex items-center justify-center text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Navigation Buttons */}
            <button
              onClick={() => navigateModal('prev')}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full glass flex items-center justify-center text-white hover:bg-white/10 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => navigateModal('next')}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full glass flex items-center justify-center text-white hover:bg-white/10 transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            <div className="grid md:grid-cols-2">
              {/* Image */}
              <div className="relative aspect-[4/5] md:aspect-auto bg-dark/60">
                <img
                  src={selectedItem.image}
                  alt={selectedItem.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Content */}
              <div className="p-8">
                <span className="inline-block px-3 py-1 rounded-full bg-neon-blue/20 text-neon-blue text-xs font-medium mb-4">
                  {selectedItem.badge}
                </span>
                
                <h3 className="text-2xl font-bold text-white mb-4">
                  {selectedItem.title}
                </h3>
                
                <p className="text-white/70 mb-6">
                  {selectedItem.details || selectedItem.description}
                </p>

                {/* Technologies */}
                {selectedItem.technologies && (
                  <div className="mb-6">
                    <h4 className="text-sm font-medium text-white/50 mb-3">Technologies</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedItem.technologies.map((tech, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 rounded-full glass text-white/80 text-sm"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Portfolio;
