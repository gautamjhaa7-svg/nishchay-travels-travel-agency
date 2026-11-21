import {useEffect, useRef, type ReactNode} from 'react';
import {gsap, prefersReducedMotion} from '../utils/gsapSetup';

interface MagneticWrapperProps {
  children: ReactNode;
  strength?: number;
  className?: string;
}

export function MagneticWrapper({
  children,
  strength = 0.24,
  className = 'inline-block',
}: MagneticWrapperProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;

    const isFinePointer = window.matchMedia?.('(pointer: fine)').matches;
    if (!isFinePointer) return;

    const xTo = gsap.quickTo(el, 'x', {duration: 0.45, ease: 'power3.out'});
    const yTo = gsap.quickTo(el, 'y', {duration: 0.45, ease: 'power3.out'});

    const handleMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const relX = e.clientX - (rect.left + rect.width / 2);
      const relY = e.clientY - (rect.top + rect.height / 2);
      xTo(relX * strength);
      yTo(relY * strength);
    };

    const handleLeave = () => {
      gsap.to(el, {
        x: 0,
        y: 0,
        duration: 0.65,
        ease: 'elastic.out(1, 0.45)',
      });
    };

    el.addEventListener('mousemove', handleMove);
    el.addEventListener('mouseleave', handleLeave);

    return () => {
      el.removeEventListener('mousemove', handleMove);
      el.removeEventListener('mouseleave', handleLeave);
    };
  }, [strength]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
