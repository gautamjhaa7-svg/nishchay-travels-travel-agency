import {useEffect, useRef} from 'react';
import {gsap, prefersReducedMotion, ScrollTrigger} from '../utils/gsapSetup';

const ROUTE_LABELS = [
  'Jagriti Vihar, Meerut',
  'Mussoorie',
  'Rishikesh',
  'Haridwar',
  'Nainital',
  'Dehradun',
  'Jim Corbett',
  'Agra',
  'Jaipur',
  'Delhi Airport Transfers',
];

export function RouteMarquee() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    const track = trackRef.current;
    if (!container || !track || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      const tween = gsap.to(track, {
        xPercent: -50,
        duration: 32,
        ease: 'none',
        repeat: -1,
      });

      // Subtle scroll-velocity timeScale boost inspired by GSAP showcase motion
      ScrollTrigger.create({
        trigger: document.body,
        start: 'top top',
        end: 'bottom bottom',
        onUpdate: (self) => {
          const velocity = Math.min(Math.abs(self.getVelocity()) / 400, 2.2);
          gsap.to(tween, {
            timeScale: 1 + velocity,
            duration: 0.35,
            overwrite: true,
          });
        },
      });

      const pause = () => gsap.to(tween, {timeScale: 0.2, duration: 0.35});
      const resume = () => gsap.to(tween, {timeScale: 1, duration: 0.45});

      container.addEventListener('mouseenter', pause);
      container.addEventListener('mouseleave', resume);

      return () => {
        container.removeEventListener('mouseenter', pause);
        container.removeEventListener('mouseleave', resume);
      };
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const repeatedItems = [...ROUTE_LABELS, ...ROUTE_LABELS];

  return (
    <div
      ref={containerRef}
      aria-label="Popular travel corridors from Meerut"
      className="bg-[#0D1B2E] border-y border-white/10 overflow-hidden py-3.5 select-none"
    >
      <div ref={trackRef} className="flex w-max items-center gap-8 will-change-transform">
        {repeatedItems.map((route, index) => (
          <div key={`${route}-${index}`} className="flex items-center gap-8 shrink-0">
            <span className="font-serif text-base sm:text-lg tracking-wide text-[#F7F4EE]/85 whitespace-nowrap">
              {route}
            </span>
            <span aria-hidden="true" className="text-[#D6B77A]/60 text-xs">
              ◆
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
