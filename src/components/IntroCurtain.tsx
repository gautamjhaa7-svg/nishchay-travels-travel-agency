import {useEffect, useRef, useState} from 'react';
import {gsap, prefersReducedMotion} from '../utils/gsapSetup';

export function IntroCurtain() {
  const curtainRef = useRef<HTMLDivElement | null>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    // Keep mobile initial paint immediate; run architectural curtain on desktop
    if (prefersReducedMotion() || window.innerWidth < 768) {
      setDone(true);
      return;
    }

    const curtain = curtainRef.current;
    if (!curtain) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => setDone(true),
      });

      tl.fromTo(
        '.curtain-line',
        {scaleX: 0},
        {scaleX: 1, duration: 0.35, ease: 'power3.inOut'},
      ).to(curtain, {
        yPercent: -100,
        duration: 0.65,
        ease: 'power4.inOut',
      });
    }, curtainRef);

    return () => ctx.revert();
  }, []);

  if (done) return null;

  return (
    <div
      ref={curtainRef}
      aria-hidden="true"
      className="hidden md:flex fixed inset-0 z-[80] bg-[#07111F] flex-col items-center justify-center pointer-events-none will-change-transform"
    >
      <p className="font-serif text-xl sm:text-2xl tracking-[0.22em] uppercase text-[#F7F4EE]">
        Nishchay Tours &amp; Travels
      </p>
      <div className="curtain-line w-32 h-px bg-[#D6B77A] mt-4 origin-center scale-x-0" />
    </div>
  );
}
