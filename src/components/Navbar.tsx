import {useEffect, useRef, useState} from 'react';
import {AnimatePresence, motion} from 'motion/react';
import {ArrowUpRight, Menu, MessageCircle, Phone, X} from 'lucide-react';
import {buildWhatsAppUrl, BUSINESS_INFO} from '../data/travelData';
import {gsap, prefersReducedMotion, ScrollTrigger} from '../utils/gsapSetup';
import {MagneticWrapper} from './MagneticWrapper';

const NAV_ITEMS = [
  {label: 'Home', href: '#home'},
  {label: 'About', href: '#about'},
  {label: 'Services', href: '#services'},
  {label: 'Tour Packages', href: '#packages'},
  {label: 'Our Fleet', href: '#fleet'},
  {label: 'Gallery', href: '#gallery'},
  {label: 'Contact', href: '#contact'},
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const progressRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 36);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, {passive: true});
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const progressEl = progressRef.current;
    if (!progressEl || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        progressEl,
        {scaleX: 0},
        {
          scaleX: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: document.documentElement,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 0.25,
          },
        },
      );
    });

    return () => {
      ctx.revert();
      ScrollTrigger.refresh();
    };
  }, []);

  // Lock background scroll & handle Escape when mobile drawer is open
  useEffect(() => {
    if (!mobileOpen) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [mobileOpen]);

  const directWhatsAppUrl = buildWhatsAppUrl(
    `Hello ${BUSINESS_INFO.name}, I would like to plan a journey from Meerut.`,
  );

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled || mobileOpen
          ? 'bg-[#07111F]/95 backdrop-blur-md border-b border-white/10 py-3'
          : 'bg-gradient-to-b from-[#07111F]/85 to-transparent py-4 sm:py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 flex items-center justify-between gap-3 sm:gap-8">
        {/* Zone 1: Responsive Single-line Brand Wordmark (safe down to 320px) */}
        <a
          href="#home"
          onClick={() => setMobileOpen(false)}
          className="font-serif text-[clamp(0.9rem,4.1vw,1.25rem)] font-semibold tracking-[0.08em] sm:tracking-[0.12em] text-[#F7F4EE] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D6B77A]"
        >
          {BUSINESS_INFO.shortName}
        </a>

        {/* Zone 2: Clean Single-Line Navigation Links (Desktop) */}
        <nav aria-label="Primary Navigation" className="hidden xl:flex items-center gap-7">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="group relative text-[13px] font-medium tracking-wide text-[#F7F4EE]/85 hover:text-[#D6B77A] transition-colors duration-200 whitespace-nowrap shrink-0 py-1 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D6B77A]"
            >
              <span>{item.label}</span>
              <span
                aria-hidden="true"
                className="absolute inset-x-0 bottom-0 h-px bg-[#D6B77A] scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left"
              />
            </a>
          ))}
        </nav>

        {/* Zone 3: Single Primary Action + Accessible Mobile Trigger */}
        <div className="flex items-center gap-3 shrink-0">
          <MagneticWrapper strength={0.2} className="hidden sm:inline-block">
            <a
              href="#enquiry"
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-sm bg-[#D6B77A] text-[#07111F] text-xs font-semibold tracking-wider uppercase hover:bg-[#E8D2A3] transition-colors duration-200 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F7F4EE]"
            >
              <span>Plan Your Trip</span>
              <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
            </a>
          </MagneticWrapper>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation-drawer"
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="xl:hidden inline-flex items-center justify-center w-11 h-11 rounded-sm border border-white/15 bg-[#07111F]/70 text-[#F7F4EE] hover:border-[#D6B77A]/60 transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D6B77A]"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* GSAP Scroll-Scrubbed Progress Hairline */}
      <div
        ref={progressRef}
        aria-hidden="true"
        className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#D6B77A] origin-left scale-x-0 pointer-events-none"
      />

      {/* Full-Height Mobile & Tablet Navigation Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            id="mobile-navigation-drawer"
            aria-label="Mobile Navigation"
            initial={{opacity: 0, y: -10}}
            animate={{opacity: 1, y: 0}}
            exit={{opacity: 0, y: -10}}
            transition={{duration: 0.22, ease: [0.16, 1, 0.3, 1]}}
            className="xl:hidden fixed inset-x-0 top-[68px] bottom-0 bg-[#07111F]/98 backdrop-blur-xl border-t border-white/10 overflow-y-auto"
          >
            <div className="max-w-lg mx-auto px-5 sm:px-6 py-6 pb-12 flex flex-col justify-between min-h-full gap-8">
              <div className="flex flex-col">
                {NAV_ITEMS.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="min-h-[48px] flex items-center justify-between py-3 px-1 text-lg font-serif tracking-wide text-[#F7F4EE]/95 hover:text-[#D6B77A] border-b border-white/10 transition-colors"
                  >
                    <span>{item.label}</span>
                    <ArrowUpRight className="w-4 h-4 text-[#D6B77A]/70" aria-hidden="true" />
                  </a>
                ))}
              </div>

              <div className="space-y-3 pt-2">
                <a
                  href="#enquiry"
                  onClick={() => setMobileOpen(false)}
                  className="w-full min-h-[48px] inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-sm bg-[#D6B77A] text-[#07111F] text-sm font-semibold tracking-wider uppercase hover:bg-[#E8D2A3] transition-colors"
                >
                  <span>Plan Your Trip</span>
                  <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                </a>

                <div className="grid grid-cols-2 gap-3">
                  <a
                    href={BUSINESS_INFO.phoneTel}
                    onClick={() => setMobileOpen(false)}
                    className="min-h-[46px] inline-flex items-center justify-center gap-2 px-4 py-3 rounded-sm border border-white/20 text-[#F7F4EE] text-xs font-semibold tracking-wider uppercase"
                  >
                    <Phone className="w-4 h-4 text-[#D6B77A]" aria-hidden="true" />
                    <span>Call Desk</span>
                  </a>
                  <a
                    href={directWhatsAppUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setMobileOpen(false)}
                    className="min-h-[46px] inline-flex items-center justify-center gap-2 px-4 py-3 rounded-sm border border-[#D6B77A]/40 text-[#D6B77A] text-xs font-semibold tracking-wider uppercase"
                  >
                    <MessageCircle className="w-4 h-4" aria-hidden="true" />
                    <span>WhatsApp</span>
                  </a>
                </div>

                <p className="text-center text-xs text-[#F7F4EE]/55 pt-2">
                  {BUSINESS_INFO.fullAddress} · {BUSINESS_INFO.phoneDisplay}
                </p>
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
