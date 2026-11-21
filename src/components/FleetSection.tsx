import {useEffect, useRef} from 'react';
import {ArrowRight, MessageCircle} from 'lucide-react';
import {buildWhatsAppUrl, FLEET_CATEGORIES} from '../data/travelData';
import {gsap, prefersReducedMotion} from '../utils/gsapSetup';
import {EditorialImage} from './EditorialImage';
import {MagneticWrapper} from './MagneticWrapper';

export function FleetSection() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.from('.fleet-header-reveal', {
        y: 22,
        opacity: 0,
        duration: 0.65,
        stagger: 0.08,
        ease: 'power3.out',
        immediateRender: false,
        clearProps: 'transform,opacity',
        scrollTrigger: {
          trigger: '.fleet-header',
          start: 'top 94%',
          once: true,
        },
      });

      const isDesktop = window.innerWidth >= 768;
      const cards = gsap.utils.toArray<HTMLElement>('.fleet-card-gsap', section);
      cards.forEach((card, idx) => {
        gsap.from(card, {
          x: isDesktop ? (idx % 2 === 0 ? -24 : 24) : 0,
          y: 24,
          opacity: 0,
          duration: 0.7,
          ease: 'power3.out',
          immediateRender: false,
          clearProps: 'transform,opacity',
          scrollTrigger: {
            trigger: card,
            start: 'top 94%',
            once: true,
          },
        });

        const imgWrap = card.querySelector('.fleet-parallax-img');
        if (imgWrap && window.innerWidth >= 1024) {
          gsap.fromTo(
            imgWrap,
            {yPercent: -5, scale: 1.1},
            {
              yPercent: 5,
              scale: 1.1,
              ease: 'none',
              scrollTrigger: {
                trigger: card,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 0.9,
              },
            },
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="fleet" className="bg-[#07111F] text-[#F7F4EE] py-16 sm:py-22 lg:py-28">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="fleet-header flex flex-col lg:flex-row lg:items-end justify-between gap-4 sm:gap-6 mb-10 sm:mb-14">
          <div className="max-w-2xl">
            <p className="fleet-header-reveal text-xs font-semibold tracking-[0.18em] uppercase text-[#D6B77A] mb-3">
              Our Fleet Categories
            </p>
            <h2 className="fleet-header-reveal font-serif text-[clamp(1.85rem,5.5vw,3.1rem)] leading-[1.12] font-medium text-[#F7F4EE]">
              Vehicles Tailored to Your Party Size
            </h2>
          </div>
          <p className="fleet-header-reveal text-[15px] sm:text-base text-[#F7F4EE]/70 max-w-md leading-relaxed dark-optical">
            Representative vehicle categories available for enquiry. Exact vehicle model, seating
            capacity, luggage allowance, and tariff are confirmed directly with our team.
          </p>
        </div>

        {/* 4 Vehicle Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-7">
          {FLEET_CATEGORIES.map((vehicle) => {
            const whatsappHref = buildWhatsAppUrl(
              `Hello Nishchay Tours & Travels, I would like to check availability and tariff details for a ${vehicle.name} (${vehicle.categoryLabel}).`,
            );

            return (
              <article
                key={vehicle.id}
                className="fleet-card-gsap group flex flex-col sm:flex-row bg-[#0D1B2E] border border-white/10 rounded-sm overflow-hidden hover:border-[#D6B77A]/50 transition-colors duration-300"
              >
                <div className="sm:w-5/12 aspect-[16/10] sm:aspect-auto relative overflow-hidden bg-[#13253D]">
                  <div className="fleet-parallax-img w-full h-full will-change-transform">
                    <EditorialImage
                      src={vehicle.image}
                      alt={vehicle.imageAlt}
                      fallbackTitle={vehicle.name}
                      className="w-full h-full object-cover object-center"
                    />
                  </div>
                </div>

                <div className="sm:w-7/12 p-5 sm:p-7 flex flex-col justify-between">
                  <div>
                    <p className="text-xs font-medium tracking-[0.12em] uppercase text-[#D6B77A] mb-1">
                      {vehicle.categoryLabel}
                    </p>
                    <h3 className="font-serif text-2xl sm:text-3xl font-medium text-[#F7F4EE] mb-1.5 sm:mb-2">
                      {vehicle.name}
                    </h3>
                    <p className="text-xs text-[#F7F4EE]/65 mb-3 sm:mb-4">{vehicle.idealFor}</p>
                    <p className="text-[15px] sm:text-sm text-[#F7F4EE]/80 leading-relaxed dark-optical">
                      {vehicle.description}
                    </p>
                  </div>

                  <div className="mt-5 sm:mt-6 pt-4 border-t border-white/10 space-y-3.5 sm:space-y-4">
                    <p className="text-xs text-[#F7F4EE]/60">{vehicle.availabilityNote}</p>
                    <MagneticWrapper strength={0.18} className="w-full sm:w-auto">
                      <a
                        href={whatsappHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full sm:w-auto min-h-[46px] inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-sm bg-[#D6B77A] text-[#07111F] text-xs font-semibold tracking-wider uppercase hover:bg-[#E8D2A3] transition-colors whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F7F4EE]"
                      >
                        <MessageCircle className="w-3.5 h-3.5" aria-hidden="true" />
                        <span>Check Availability</span>
                        <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                      </a>
                    </MagneticWrapper>
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
