import {useEffect, useRef} from 'react';
import {ArrowUpRight} from 'lucide-react';
import {BUSINESS_INFO} from '../data/travelData';
import {gsap, prefersReducedMotion} from '../utils/gsapSetup';
import {MagneticWrapper} from './MagneticWrapper';
import {ShaderImageCanvas} from './ShaderImageCanvas';

const COMMITMENTS = [
  {
    label: 'Origin',
    value: 'Jagriti Vihar, Meerut',
    note: 'Serving Meerut & surrounding NCR routes',
  },
  {
    label: 'Approach',
    value: 'Tailored Route Planning',
    note: 'Built around your schedule & family comfort',
  },
  {
    label: 'Enquiries',
    value: 'Direct Personal Response',
    note: 'Clear communication via call or WhatsApp',
  },
];

export function AboutSection() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      // Curtain mask wipe + inner scale settle on editorial image
      gsap.fromTo(
        '.about-image-frame',
        {clipPath: 'inset(12% 0% 0% 0%)'},
        {
          clipPath: 'inset(0% 0% 0% 0%)',
          duration: 0.9,
          ease: 'power3.out',
          immediateRender: false,
          clearProps: 'clipPath',
          scrollTrigger: {
            trigger: '.about-image-frame',
            start: 'top 94%',
            once: true,
          },
        },
      );

      gsap.fromTo(
        '.about-image-inner',
        {scale: 1.1},
        {
          scale: 1,
          duration: 1.1,
          ease: 'power3.out',
          immediateRender: false,
          clearProps: 'transform',
          scrollTrigger: {
            trigger: '.about-image-frame',
            start: 'top 94%',
            once: true,
          },
        },
      );

      // Editorial copy stagger
      gsap.from('.about-reveal', {
        y: 22,
        opacity: 0,
        duration: 0.65,
        stagger: 0.08,
        ease: 'power3.out',
        immediateRender: false,
        clearProps: 'transform,opacity',
        scrollTrigger: {
          trigger: '.about-copy-col',
          start: 'top 94%',
          once: true,
        },
      });

      // Commitment strip stagger
      gsap.from('.about-commitment-item', {
        y: 20,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power3.out',
        immediateRender: false,
        clearProps: 'transform,opacity',
        scrollTrigger: {
          trigger: '.about-commitment-row',
          start: 'top 94%',
          once: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="about" className="bg-[#FAF8F4] text-[#07111F] py-16 sm:py-22 lg:py-28">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        {/* Balanced 2-Column Editorial Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-16 items-stretch">
          <div className="lg:col-span-5">
            <div className="about-image-frame h-[270px] sm:h-[380px] lg:h-full lg:min-h-[520px] overflow-hidden rounded-sm bg-[#0D1B2E]">
              <div className="about-image-inner h-full w-full will-change-transform">
                <ShaderImageCanvas
                  src="/src/assets/images/about_editorial_journey_1795253404090.jpg"
                  alt="Sunrise mountain road overlooking Himalayan valley pines"
                  className="w-full h-full"
                />
              </div>
            </div>
          </div>

          <div className="about-copy-col lg:col-span-7 flex flex-col justify-center py-1 sm:py-2">
            <p className="about-reveal text-xs font-semibold tracking-[0.18em] uppercase text-[#8A6D3B] mb-3 sm:mb-4">
              About {BUSINESS_INFO.name}
            </p>

            <h2 className="about-reveal font-serif text-[clamp(1.85rem,5.5vw,3.1rem)] leading-[1.12] font-medium text-[#07111F]">
              Travel With Comfort. Travel With Confidence.
            </h2>

            <div className="about-reveal w-14 sm:w-16 h-px bg-[#D6B77A] my-5 sm:my-7" aria-hidden="true" />

            <div className="about-reveal space-y-4 sm:space-y-5 text-[15px] sm:text-[17px] leading-[1.7] text-[#334155] max-w-2xl">
              <p>
                Based in Jagriti Vihar, Meerut, Nishchay Tours &amp; Travels is built around a
                simple belief: memorable travel depends on unhurried preparation, attentive
                service, and the assurance that every mile is thoughtfully looked after.
              </p>
              <p>
                Whether you are heading from Meerut to an airport terminal, planning a quiet
                hill-station retreat with family, or arranging a multi-day heritage circuit across
                North India, our team listens carefully to your route preferences and coordinates a
                comfortable journey tailored to your needs.
              </p>
              <p>
                We prioritize clear, direct conversations—helping you choose the right vehicle
                category and departure plan with zero guesswork before your trip begins.
              </p>
            </div>

            <div className="about-reveal mt-7 sm:mt-9 flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-4 sm:gap-6">
              <MagneticWrapper strength={0.2} className="w-full sm:w-auto">
                <a
                  href="#enquiry"
                  className="w-full sm:w-auto min-h-[48px] inline-flex items-center justify-center gap-2 px-6 py-3 rounded-sm bg-[#07111F] text-[#F7F4EE] text-sm font-medium tracking-wide hover:bg-[#13253D] transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#07111F]"
                >
                  <span>Start a Travel Enquiry</span>
                  <ArrowUpRight className="w-4 h-4 text-[#D6B77A]" aria-hidden="true" />
                </a>
              </MagneticWrapper>

              <a
                href="#services"
                className="inline-flex items-center justify-center sm:justify-start min-h-[44px] text-sm font-medium text-[#07111F] hover:text-[#8A6D3B] underline underline-offset-4 decoration-[#07111F]/25 transition-colors whitespace-nowrap shrink-0"
              >
                Explore Our Services
              </a>
            </div>
          </div>
        </div>

        {/* Full-Width 3-Column Commitment Strip Below Split */}
        <div className="about-commitment-row mt-12 sm:mt-16 pt-9 sm:pt-12 border-t border-[#07111F]/12 grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {COMMITMENTS.map((item) => (
            <div key={item.label} className="about-commitment-item space-y-1">
              <p className="text-xs font-semibold tracking-[0.14em] uppercase text-[#8A6D3B]">
                {item.label}
              </p>
              <p className="font-serif text-xl sm:text-2xl font-medium text-[#07111F]">
                {item.value}
              </p>
              <p className="text-sm text-[#475569]">{item.note}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
