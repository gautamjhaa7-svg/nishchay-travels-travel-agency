import {useEffect, useRef, useState} from 'react';
import {WHY_CHOOSE_PILLARS} from '../data/travelData';
import {gsap, prefersReducedMotion, ScrollTrigger} from '../utils/gsapSetup';

export function WhyChooseSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const progressRailRef = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      // Scrubbed vertical progress rail alongside pinned editorial lead
      if (progressRailRef.current) {
        gsap.fromTo(
          progressRailRef.current,
          {scaleY: 0.15},
          {
            scaleY: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: '.pillars-list',
              start: 'top 65%',
              end: 'bottom 65%',
              scrub: 0.5,
            },
          },
        );
      }

      const items = gsap.utils.toArray<HTMLElement>('.pillar-row-gsap', section);
      items.forEach((item, index) => {
        gsap.from(item, {
          y: 22,
          opacity: 0,
          duration: 0.6,
          ease: 'power3.out',
          immediateRender: false,
          clearProps: 'transform,opacity',
          scrollTrigger: {
            trigger: item,
            start: 'top 94%',
            once: true,
          },
        });

        ScrollTrigger.create({
          trigger: item,
          start: 'top 62%',
          end: 'bottom 38%',
          onEnter: () => setActiveIndex(index),
          onEnterBack: () => setActiveIndex(index),
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-[#FAF8F4] text-[#07111F] py-16 sm:py-22 lg:py-28">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-16 items-start">
          {/* Left Sticky Editorial Lead + Live GSAP Step Readout */}
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <p className="text-xs font-semibold tracking-[0.18em] uppercase text-[#8A6D3B] mb-3">
              The Nishchay Standard
            </p>
            <h2 className="font-serif text-[clamp(1.85rem,5.5vw,3.1rem)] leading-[1.12] font-medium text-[#07111F]">
              Why Discerning Travellers Choose Us
            </h2>
            <div className="w-14 sm:w-16 h-px bg-[#D6B77A] my-5 sm:my-6" aria-hidden="true" />
            <p className="text-[15px] sm:text-base text-[#475569] leading-relaxed">
              Great hospitality on the road rests on thoughtful details—clear answers before you
              depart, respectful service throughout the trip, and vehicles matched sensibly to your
              itinerary.
            </p>

            {/* Synchronized Scroll Progress Step Rail (Desktop) */}
            <div className="hidden lg:flex items-center gap-4 mt-10 pt-6 border-t border-[#07111F]/10">
              <div className="relative w-px h-14 bg-[#07111F]/15 overflow-hidden">
                <div
                  ref={progressRailRef}
                  className="absolute inset-0 bg-[#8A6D3B] origin-top will-change-transform"
                />
              </div>
              <div>
                <p className="text-xs tracking-[0.15em] uppercase text-[#64748B]">
                  Active Principle
                </p>
                <p className="font-serif text-2xl font-medium text-[#07111F] tabular-nums mt-0.5">
                  0{activeIndex + 1} <span className="text-[#8A6D3B]/60">/ 05</span>
                </p>
              </div>
            </div>
          </div>

          {/* Right Editorial Numbered List */}
          <div className="pillars-list lg:col-span-7 divide-y divide-[#07111F]/12 border-t border-b border-[#07111F]/12">
            {WHY_CHOOSE_PILLARS.map((pillar, idx) => {
              const isActive = activeIndex === idx;
              return (
                <div
                  key={pillar.index}
                  className={`pillar-row-gsap py-5 sm:py-7 lg:py-8 grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-6 items-baseline transition-opacity duration-300 ${
                    isActive ? 'opacity-100' : 'opacity-100 lg:opacity-75 lg:hover:opacity-100'
                  }`}
                >
                  <span
                    className={`sm:col-span-2 font-serif text-xl sm:text-2xl tabular-nums transition-colors duration-300 ${
                      isActive ? 'text-[#8A6D3B] font-semibold' : 'text-[#8A6D3B]/70'
                    }`}
                  >
                    {pillar.index}
                  </span>
                  <div className="sm:col-span-10">
                    <h3 className="font-serif text-xl sm:text-2xl font-medium text-[#07111F] mb-1.5 sm:mb-2">
                      {pillar.title}
                    </h3>
                    <p className="text-[15px] sm:text-base text-[#475569] leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
