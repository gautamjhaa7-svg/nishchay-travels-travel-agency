import {useEffect, useRef, useState} from 'react';
import Lenis from 'lenis';
import {MotionConfig} from 'motion/react';
import {gsap, prefersReducedMotion, ScrollTrigger} from './utils/gsapSetup';
import {IntroCurtain} from './components/IntroCurtain';
import {CustomCursor} from './components/CustomCursor';
import {Navbar} from './components/Navbar';
import {HeroSection} from './components/HeroSection';
import {RouteMarquee} from './components/RouteMarquee';
import {AboutSection} from './components/AboutSection';
import {ServicesSection} from './components/ServicesSection';
import {PackagesSection} from './components/PackagesSection';
import {RouteStorySection} from './components/RouteStorySection';
import {FleetSection} from './components/FleetSection';
import {WhyChooseSection} from './components/WhyChooseSection';
import {ReviewsSection} from './components/ReviewsSection';
import {GallerySection} from './components/GallerySection';
import {EnquiryFormSection} from './components/EnquiryFormSection';
import {ContactSection} from './components/ContactSection';
import {Footer} from './components/Footer';
import {MobileFloatingActions} from './components/MobileFloatingActions';

export default function App() {
  const [selectedDestination, setSelectedDestination] = useState('');
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined' || prefersReducedMotion()) return;

    // Enable Lenis smooth wheel scrolling on desktop fine-pointer viewports;
    // keep native touch/mobile scrolling unobstructed on mobile and tablet devices.
    const useLenis =
      window.innerWidth >= 1024 &&
      Boolean(window.matchMedia?.('(pointer: fine)').matches);

    let tick: ((time: number) => void) | null = null;
    let lenis: Lenis | null = null;

    if (useLenis) {
      lenis = new Lenis({
        duration: 1.15,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
      });
      lenisRef.current = lenis;

      lenis.on('scroll', ScrollTrigger.update);

      tick = (time: number) => {
        lenis?.raf(time * 1000);
      };
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
    }

    // Smooth anchor navigation across both desktop (Lenis) and mobile (native)
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const anchor = target?.closest('a[href^="#"]') as HTMLAnchorElement | null;
      if (!anchor) return;
      const hash = anchor.getAttribute('href');
      if (!hash || hash === '#') return;
      const el = document.querySelector(hash) as HTMLElement | null;
      if (el) {
        e.preventDefault();
        if (lenisRef.current) {
          lenisRef.current.scrollTo(el, {offset: -12});
        } else {
          el.scrollIntoView({behavior: 'smooth', block: 'start'});
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);

    const refreshTriggers = () => ScrollTrigger.refresh();
    window.addEventListener('load', refreshTriggers);
    document.fonts?.ready?.then(refreshTriggers);

    return () => {
      document.removeEventListener('click', handleAnchorClick);
      window.removeEventListener('load', refreshTriggers);
      if (tick) gsap.ticker.remove(tick);
      lenis?.destroy();
      lenisRef.current = null;
    };
  }, []);

  const handleSelectDestinationForForm = (destination: string) => {
    setSelectedDestination(destination);
    const enquiryEl = document.getElementById('enquiry');
    if (enquiryEl) {
      if (lenisRef.current) {
        lenisRef.current.scrollTo(enquiryEl, {offset: -12});
      } else {
        enquiryEl.scrollIntoView({behavior: 'smooth', block: 'start'});
      }
    }
  };

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen bg-[#07111F] text-[#F7F4EE]">
        <IntroCurtain />
        <CustomCursor />

        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[90] focus:px-4 focus:py-2 focus:bg-[#D6B77A] focus:text-[#07111F] focus:text-xs focus:font-semibold focus:rounded-sm"
        >
          Skip to main content
        </a>

        <Navbar />

        <main id="main-content">
          <HeroSection />
          <RouteMarquee />
          <AboutSection />
          <ServicesSection />
          <PackagesSection onSelectDestinationForForm={handleSelectDestinationForForm} />
          <RouteStorySection />
          <WhyChooseSection />
          <FleetSection />
          <GallerySection />
          <ReviewsSection />
          <EnquiryFormSection prefilledDestination={selectedDestination} />
          <ContactSection />
        </main>

        <Footer />
        <MobileFloatingActions />
      </div>
    </MotionConfig>
  );
}
