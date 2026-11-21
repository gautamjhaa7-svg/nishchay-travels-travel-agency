import {useEffect, useRef} from 'react';
import {ArrowRight, ExternalLink, MapPin} from 'lucide-react';
import {BUSINESS_INFO} from '../data/travelData';
import {gsap, prefersReducedMotion} from '../utils/gsapSetup';
import {EditorialImage} from './EditorialImage';
import {MagneticWrapper} from './MagneticWrapper';

const HERO_HEADLINE_WORDS = ['Every', 'Journey', 'Begins', 'With', 'Nishchay.'];

export function HeroSection() {
  const heroRef = useRef<HTMLElement | null>(null);
  const bgRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero || prefersReducedMotion()) return;

    const mm = gsap.matchMedia();

    // Desktop: choreographed after IntroCurtain + scrubbed parallax
    mm.add('(min-width: 1024px)', () => {
      const tl = gsap.timeline({delay: 0.45, defaults: {ease: 'power4.out'}});

      tl.from('.hero-kicker', {y: 18, opacity: 0, duration: 0.7})
        .from('.hero-line-draw', {scaleX: 0, duration: 0.85, ease: 'power3.inOut'}, '-=0.45')
        .from(
          '.hero-word-inner',
          {yPercent: 115, rotateZ: 1.5, duration: 0.95, stagger: 0.07},
          '-=0.55',
        )
        .from('.hero-stagger-fade', {y: 22, opacity: 0, duration: 0.75, stagger: 0.1}, '-=0.45');

      gsap.fromTo(
        bgRef.current,
        {scale: 1.03, yPercent: 0},
        {
          scale: 1.16,
          yPercent: 12,
          ease: 'none',
          scrollTrigger: {
            trigger: hero,
            start: 'top top',
            end: 'bottom top',
            scrub: 1.1,
          },
        },
      );

      gsap.to(contentRef.current, {
        yPercent: -10,
        opacity: 0.35,
        ease: 'none',
        scrollTrigger: {
          trigger: hero,
          start: '35% top',
          end: 'bottom top',
          scrub: 1,
        },
      });
    });

    // Mobile & Tablet: fast, crisp entrance with zero scroll parallax distortion
    mm.add('(max-width: 1023px)', () => {
      const tl = gsap.timeline({defaults: {ease: 'power3.out'}});

      tl.from('.hero-kicker', {y: 12, opacity: 0, duration: 0.5, clearProps: 'transform,opacity'})
        .from('.hero-line-draw', {scaleX: 0, duration: 0.6, ease: 'power2.inOut'}, '-=0.35')
        .from(
          '.hero-word-inner',
          {yPercent: 105, duration: 0.65, stagger: 0.045, clearProps: 'transform'},
          '-=0.4',
        )
        .from(
          '.hero-stagger-fade',
          {y: 14, opacity: 0, duration: 0.55, stagger: 0.07, clearProps: 'transform,opacity'},
          '-=0.35',
        );
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative min-h-[86svh] lg:min-h-[94vh] flex items-end pb-12 sm:pb-16 lg:pb-20 pt-24 sm:pt-28 overflow-hidden bg-[#07111F]"
    >
      {/* Hero Image Backdrop */}
      <div
        ref={bgRef}
        className="absolute inset-0 will-change-transform origin-center"
        aria-hidden="true"
      >
        <EditorialImage
          src="/src/assets/images/hero_mountain_suv_1795253403401.jpg"
          alt="Luxury dark SUV travelling along a sunlit Himalayan mountain road"
          priority
          className="w-full h-full object-cover object-[58%_center] sm:object-center"
        />
      </div>

      {/* Measured Contrast Scrims for WCAG AA Legibility across Mobile & Desktop */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-[#07111F] via-[#07111F]/70 sm:via-[#07111F]/55 to-[#07111F]/45"
      />
      <div
        aria-hidden="true"
        className="hidden lg:block absolute inset-0 bg-gradient-to-r from-[#07111F]/88 via-[#07111F]/35 to-transparent"
      />

      <div
        ref={contentRef}
        className="relative z-10 max-w-7xl mx-auto w-full px-5 sm:px-6 lg:px-8 will-change-transform flex items-end justify-between gap-8"
      >
        <div className="max-w-3xl w-full">
          {/* Quiet Unboxed Editorial Kicker */}
          <div className="hero-kicker flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs sm:text-sm text-[#D6B77A] tracking-[0.12em] sm:tracking-[0.14em] uppercase font-medium mb-4 sm:mb-5">
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
              {BUSINESS_INFO.locationShort}
            </span>
            <span aria-hidden="true" className="text-[#D6B77A]/50">
              ·
            </span>
            <span>Private Chauffeur &amp; Bespoke Tours</span>
          </div>

          {/* Animated Gold Accent Hairline */}
          <div
            className="hero-line-draw w-20 sm:w-24 h-px bg-[#D6B77A] origin-left mb-5 sm:mb-6"
            aria-hidden="true"
          />

          {/* Masked Word-by-Word Kinetic Display Headline */}
          <h1 className="font-serif text-[clamp(2.15rem,8.5vw,4.65rem)] leading-[1.08] font-medium text-[#F7F4EE] tracking-tight">
            {HERO_HEADLINE_WORDS.map((word, idx) => (
              <span
                key={`${word}-${idx}`}
                className="inline-block overflow-hidden align-bottom mr-[0.22em] pb-[0.06em]"
              >
                <span className="hero-word-inner inline-block will-change-transform">
                  {word}
                </span>
              </span>
            ))}
          </h1>

          {/* Supporting Narrative */}
          <p className="hero-stagger-fade mt-4 sm:mt-5 text-[15px] sm:text-lg text-[#F7F4EE]/85 max-w-xl leading-relaxed dark-optical">
            Discover comfortable journeys, memorable destinations and travel experiences planned
            around you.
          </p>

          {/* Full-Width Mobile / Inline Desktop Action Buttons */}
          <div className="hero-stagger-fade mt-7 sm:mt-9 flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-3 sm:gap-4">
            <MagneticWrapper strength={0.22} className="w-full sm:w-auto">
              <a
                href="#packages"
                className="w-full sm:w-auto min-h-[48px] inline-flex items-center justify-center gap-2.5 px-6 sm:px-7 py-3.5 rounded-sm bg-[#D6B77A] text-[#07111F] text-sm font-semibold tracking-wide hover:bg-[#E8D2A3] transition-colors duration-200 whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F7F4EE]"
              >
                <span>Explore Our Packages</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </a>
            </MagneticWrapper>

            <MagneticWrapper strength={0.18} className="w-full sm:w-auto">
              <a
                href="#enquiry"
                className="w-full sm:w-auto min-h-[48px] inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3.5 rounded-sm border border-[#F7F4EE]/30 bg-[#07111F]/55 backdrop-blur-sm text-[#F7F4EE] text-sm font-medium tracking-wide hover:border-[#D6B77A] hover:text-[#D6B77A] transition-colors duration-200 whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D6B77A]"
              >
                <span>Plan Your Journey</span>
              </a>
            </MagneticWrapper>
          </div>

          {/* Transparent Trust Indicator with Direct Google Maps Verification */}
          <div className="hero-stagger-fade mt-8 sm:mt-10 pt-5 sm:pt-6 border-t border-white/15 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs sm:text-sm text-[#F7F4EE]/75">
            <span>
              Business-referenced rating:{' '}
              <strong className="font-semibold text-[#D6B77A] tabular-nums">
                {BUSINESS_INFO.referencedRating}/5
              </strong>{' '}
              ({BUSINESS_INFO.referencedReviewCount} reviews)
            </span>
            <span aria-hidden="true" className="hidden sm:inline text-white/30">
              ·
            </span>
            <a
              href={BUSINESS_INFO.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[#F7F4EE]/90 hover:text-[#D6B77A] underline underline-offset-4 decoration-white/25 hover:decoration-[#D6B77A] transition-colors"
            >
              <span>Verify live reviews on Google Maps</span>
              <ExternalLink className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
            </a>
          </div>
        </div>

        {/* Subtle Editorial Scroll Cue (Desktop Only) */}
        <a
          href="#about"
          aria-label="Scroll down to discover our story"
          className="hero-stagger-fade hidden lg:flex flex-col items-center gap-3 text-[11px] tracking-[0.2em] uppercase text-[#F7F4EE]/60 hover:text-[#D6B77A] transition-colors pb-1"
        >
          <span className="[writing-mode:vertical-rl]">Scroll</span>
          <svg width="16" height="44" viewBox="0 0 16 44" fill="none" aria-hidden="true">
            <line x1="8" y1="0" x2="8" y2="38" stroke="currentColor" strokeOpacity="0.4" />
            <circle cx="8" cy="10" r="2.2" fill="#D6B77A" className="motion-safe:animate-bounce" />
          </svg>
        </a>
      </div>
    </section>
  );
}
