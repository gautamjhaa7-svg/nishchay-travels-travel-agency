import {useEffect, useMemo, useRef, useState} from 'react';
import {ArrowUpRight, MessageCircle} from 'lucide-react';
import {
  buildWhatsAppUrl,
  TOUR_PACKAGES,
  type PackageCategory,
} from '../data/travelData';
import {gsap, prefersReducedMotion, ScrollTrigger} from '../utils/gsapSetup';
import {EditorialImage} from './EditorialImage';

const CATEGORIES: PackageCategory[] = [
  'All',
  'Himalayan Hills',
  'Spiritual Trails',
  'Heritage & Wildlife',
];

interface PackagesSectionProps {
  onSelectDestinationForForm: (destination: string) => void;
}

export function PackagesSection({onSelectDestinationForForm}: PackagesSectionProps) {
  const [activeCategory, setActiveCategory] = useState<PackageCategory>('All');
  const sectionRef = useRef<HTMLElement | null>(null);
  const gridRef = useRef<HTMLDivElement | null>(null);
  const hasInteracted = useRef(false);

  const filteredPackages = useMemo(() => {
    if (activeCategory === 'All') return TOUR_PACKAGES;
    return TOUR_PACKAGES.filter((pkg) => pkg.category === activeCategory);
  }, [activeCategory]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.from('.pkg-header-reveal', {
        y: 22,
        opacity: 0,
        duration: 0.65,
        stagger: 0.08,
        ease: 'power3.out',
        immediateRender: false,
        clearProps: 'transform,opacity',
        scrollTrigger: {
          trigger: '.pkg-header',
          start: 'top 94%',
          once: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>('.pkg-card-gsap', grid);
      if (hasInteracted.current) {
        gsap.fromTo(
          cards,
          {y: 24, opacity: 0, scale: 0.97},
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.5,
            stagger: 0.05,
            ease: 'power3.out',
            clearProps: 'transform,opacity',
          },
        );
      } else {
        gsap.from(cards, {
          y: 28,
          opacity: 0,
          duration: 0.65,
          stagger: {amount: 0.35, from: 'start'},
          ease: 'power3.out',
          immediateRender: false,
          clearProps: 'transform,opacity',
          scrollTrigger: {
            trigger: grid,
            start: 'top 94%',
            once: true,
          },
        });
      }
    }, gridRef);

    ScrollTrigger.refresh();
    return () => ctx.revert();
  }, [activeCategory]);

  const handleCategoryChange = (category: PackageCategory) => {
    hasInteracted.current = true;
    setActiveCategory(category);
  };

  return (
    <section ref={sectionRef} id="packages" className="bg-[#FAF8F4] text-[#07111F] py-16 sm:py-22 lg:py-28">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        {/* Header + Segmented Category Filter */}
        <div className="pkg-header flex flex-col lg:flex-row lg:items-end justify-between gap-6 sm:gap-8 mb-9 sm:mb-12">
          <div className="max-w-2xl">
            <p className="pkg-header-reveal text-xs font-semibold tracking-[0.18em] uppercase text-[#8A6D3B] mb-3">
              Signature Destinations
            </p>
            <h2 className="pkg-header-reveal font-serif text-[clamp(1.85rem,5.5vw,3.1rem)] leading-[1.12] font-medium text-[#07111F]">
              Curated Journeys Across North India
            </h2>
            <p className="pkg-header-reveal mt-3 text-[15px] sm:text-base text-[#475569] leading-relaxed">
              From misty Himalayan ridges to timeless heritage cities—every itinerary is quoted
              and customized around your travel dates and preferred vehicle.
            </p>
          </div>

          <div
            role="tablist"
            aria-label="Filter destinations by travel style"
            className="pkg-header-reveal grid grid-cols-2 sm:inline-flex items-center gap-1 p-1 bg-[#EFECE6] rounded-sm border border-[#07111F]/10 w-full sm:w-auto"
          >
            {CATEGORIES.map((category) => {
              const active = activeCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => handleCategoryChange(category)}
                  className={`min-h-[44px] sm:min-h-0 px-3 sm:px-3.5 py-2 text-xs font-medium rounded-sm transition-colors duration-200 text-center whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#07111F] ${
                    active
                      ? 'bg-[#07111F] text-[#F7F4EE]'
                      : 'text-[#334155] hover:text-[#07111F]'
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>

        {/* Destination Cards Grid */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {filteredPackages.map((pkg) => {
            const whatsappHref = buildWhatsAppUrl(
              `Hello Nishchay Tours & Travels, I would like to request the package price and itinerary options for ${pkg.destination} (${pkg.region}).`,
            );

            return (
              <article
                key={pkg.id}
                className="pkg-card-gsap group flex flex-col bg-white border border-[#07111F]/10 rounded-sm overflow-hidden hover:-translate-y-1 transition-transform duration-300"
              >
                <div
                  data-cursor="view"
                  data-cursor-label="Explore"
                  className="relative aspect-[16/10] sm:aspect-[4/3] overflow-hidden bg-[#0D1B2E]"
                >
                  <EditorialImage
                    src={pkg.image}
                    alt={pkg.imageAlt}
                    fallbackTitle={pkg.destination}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-[#07111F]/65 via-transparent to-transparent"
                  />
                  <p className="absolute bottom-3 left-4 text-[11px] font-medium tracking-[0.14em] uppercase text-[#F7F4EE]/90">
                    {pkg.region}
                  </p>
                </div>

                <div className="flex-1 flex flex-col justify-between p-5">
                  <div>
                    <div className="flex flex-wrap items-center gap-2 text-xs text-[#64748B] mb-1.5">
                      <span>{pkg.category}</span>
                      <span aria-hidden="true">·</span>
                      <span>{pkg.tagline}</span>
                    </div>
                    <h3 className="font-serif text-2xl font-medium text-[#07111F] mb-2">
                      {pkg.destination}
                    </h3>
                    <p className="text-[15px] sm:text-sm text-[#475569] leading-relaxed">
                      {pkg.description}
                    </p>
                  </div>

                  <div className="mt-5 sm:mt-6 pt-4 border-t border-[#07111F]/10 flex flex-col gap-2">
                    <a
                      href={whatsappHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full min-h-[46px] inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-sm bg-[#07111F] text-[#F7F4EE] text-xs font-semibold tracking-wider uppercase hover:bg-[#13253D] transition-colors whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#07111F]"
                    >
                      <MessageCircle className="w-3.5 h-3.5 text-[#D6B77A]" aria-hidden="true" />
                      <span>Request Package Price</span>
                    </a>
                    <button
                      type="button"
                      onClick={() => onSelectDestinationForForm(pkg.destination)}
                      className="w-full min-h-[44px] inline-flex items-center justify-center gap-1.5 py-2 text-xs font-medium text-[#475569] hover:text-[#07111F] transition-colors cursor-pointer"
                    >
                      <span>Pre-fill in Enquiry Form</span>
                      <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
