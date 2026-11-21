import {useEffect, useRef, type MouseEvent} from 'react';
import {
  ArrowRight,
  Compass,
  MapPin,
  MessageCircle,
  Navigation,
  Plane,
  Repeat,
  Sparkles,
  Users,
} from 'lucide-react';
import {buildWhatsAppUrl, SERVICES, type ServiceItem} from '../data/travelData';
import {gsap, prefersReducedMotion} from '../utils/gsapSetup';

const ICON_MAP: Record<ServiceItem['iconName'], typeof MapPin> = {
  MapPin,
  Navigation,
  ArrowRight,
  Repeat,
  Users,
  Plane,
  Compass,
  Sparkles,
};

export function ServicesSection() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.from('.services-header-item', {
        y: 22,
        opacity: 0,
        duration: 0.65,
        stagger: 0.08,
        ease: 'power3.out',
        immediateRender: false,
        clearProps: 'transform,opacity',
        scrollTrigger: {
          trigger: '.services-header',
          start: 'top 95%',
          once: true,
        },
      });

      gsap.from('.service-card-gsap', {
        y: 28,
        opacity: 0,
        duration: 0.65,
        stagger: {
          amount: 0.35,
          from: 'start',
        },
        ease: 'power3.out',
        immediateRender: false,
        clearProps: 'transform,opacity',
        scrollTrigger: {
          trigger: '.services-grid',
          start: 'top 95%',
          once: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleCardMouseMove = (e: MouseEvent<HTMLElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    card.style.setProperty('--mx', `${e.clientX - rect.left}px`);
    card.style.setProperty('--my', `${e.clientY - rect.top}px`);
  };

  return (
    <section
      ref={sectionRef}
      id="services"
      className="bg-[#07111F] text-[#F7F4EE] py-16 sm:py-22 lg:py-28"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="services-header flex flex-col lg:flex-row lg:items-end justify-between gap-4 sm:gap-6 mb-10 sm:mb-14">
          <div className="max-w-2xl">
            <p className="services-header-item text-xs font-semibold tracking-[0.18em] uppercase text-[#D6B77A] mb-3">
              Curated Travel Solutions
            </p>
            <h2 className="services-header-item font-serif text-[clamp(1.85rem,5.5vw,3.1rem)] leading-[1.12] font-medium text-[#F7F4EE]">
              Services Designed Around Every Mile
            </h2>
          </div>
          <p className="services-header-item text-[15px] sm:text-base text-[#F7F4EE]/70 max-w-md leading-relaxed dark-optical">
            Proposed travel service categories from Meerut. Reach out directly on WhatsApp to
            confirm route availability and tailor your trip details.
          </p>
        </div>

        {/* 8 Service Cards Grid */}
        <div className="services-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {SERVICES.map((service) => {
            const Icon = ICON_MAP[service.iconName];
            return (
              <article
                key={service.id}
                onMouseMove={handleCardMouseMove}
                className="service-card-gsap group relative flex flex-col justify-between p-5 sm:p-6 rounded-sm bg-[#0D1B2E]/95 border border-white/10 hover:border-[#D6B77A]/55 transition-colors duration-300 overflow-hidden"
              >
                {/* Interactive Cursor Spotlight Glint (Desktop Pointer) */}
                <div
                  aria-hidden="true"
                  className="hidden lg:block pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background:
                      'radial-gradient(280px circle at var(--mx, 50%) var(--my, 50%), rgba(214, 183, 122, 0.11), transparent 70%)',
                  }}
                />

                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4 sm:mb-5">
                    <span className="font-serif text-lg text-[#D6B77A] tabular-nums">
                      {service.index}
                    </span>
                    <div className="w-10 h-10 rounded-sm bg-[#13253D] border border-white/10 flex items-center justify-center text-[#D6B77A] group-hover:bg-[#D6B77A] group-hover:text-[#07111F] transition-colors duration-300">
                      <Icon className="w-4 h-4 stroke-[1.75]" aria-hidden="true" />
                    </div>
                  </div>

                  <p className="text-xs text-[#D6B77A]/80 tracking-wide mb-1">
                    {service.subtitle}
                  </p>
                  <h3 className="font-serif text-2xl font-medium text-[#F7F4EE] mb-2.5 leading-snug">
                    {service.title}
                  </h3>
                  <p className="text-[15px] sm:text-sm text-[#F7F4EE]/72 leading-relaxed dark-optical">
                    {service.description}
                  </p>
                </div>

                <div className="relative z-10 mt-5 sm:mt-7 pt-3.5 sm:pt-4 border-t border-white/10">
                  <a
                    href={buildWhatsAppUrl(service.enquiryMessage)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="min-h-[44px] inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#D6B77A] hover:text-[#E8D2A3] transition-colors whitespace-nowrap"
                  >
                    <MessageCircle className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>Enquire Now</span>
                    <ArrowRight
                      className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </a>
                </div>
              </article>
            );
          })}
        </div>

        <p className="mt-7 sm:mt-8 text-xs text-[#F7F4EE]/55 leading-relaxed">
          Note: The service categories above represent proposed travel offerings—exact route
          coverage, schedule options, and terms are confirmed directly with Nishchay Tours &amp;
          Travels at the time of enquiry.
        </p>
      </div>
    </section>
  );
}
