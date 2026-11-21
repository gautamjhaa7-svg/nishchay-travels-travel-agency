import {useEffect, useRef, useState} from 'react';
import {gsap, prefersReducedMotion} from '../utils/gsapSetup';

export function CustomCursor() {
  const outerRef = useRef<HTMLDivElement | null>(null);
  const dotRef = useRef<HTMLDivElement | null>(null);
  const [label, setLabel] = useState<string>('');
  const [mode, setMode] = useState<'default' | 'pointer' | 'view'>('default');
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined' || prefersReducedMotion()) return;
    const isFinePointer = window.matchMedia?.('(pointer: fine)').matches;
    if (!isFinePointer) return;

    const outer = outerRef.current;
    const dot = dotRef.current;
    if (!outer || !dot) return;

    const xOuter = gsap.quickTo(outer, 'x', {duration: 0.35, ease: 'power3.out'});
    const yOuter = gsap.quickTo(outer, 'y', {duration: 0.35, ease: 'power3.out'});
    const xDot = gsap.quickTo(dot, 'x', {duration: 0.12, ease: 'power3.out'});
    const yDot = gsap.quickTo(dot, 'y', {duration: 0.12, ease: 'power3.out'});

    const onMove = (e: MouseEvent) => {
      setVisible(true);
      xOuter(e.clientX);
      yOuter(e.clientY);
      xDot(e.clientX);
      yDot(e.clientY);

      const target = e.target as HTMLElement | null;
      if (!target) return;

      const viewTarget = target.closest('[data-cursor="view"]') as HTMLElement | null;
      if (viewTarget) {
        setMode('view');
        setLabel(viewTarget.dataset.cursorLabel || 'View');
        return;
      }

      const interactiveTarget = target.closest('a, button, input, select, textarea');
      if (interactiveTarget) {
        setMode('pointer');
        setLabel('');
        return;
      }

      setMode('default');
      setLabel('');
    };

    const onLeave = () => setVisible(false);

    window.addEventListener('mousemove', onMove, {passive: true});
    document.addEventListener('mouseleave', onLeave);

    return () => {
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  const ringClasses =
    mode === 'view'
      ? 'w-20 h-20 -ml-10 -mt-10 bg-[#D6B77A] text-[#07111F] border-transparent'
      : mode === 'pointer'
        ? 'w-11 h-11 -ml-[22px] -mt-[22px] border-[#D6B77A]/85 bg-[#D6B77A]/10'
        : 'w-8 h-8 -ml-4 -mt-4 border-[#D6B77A]/55 bg-transparent';

  return (
    <div aria-hidden="true" className="hidden lg:block pointer-events-none fixed inset-0 z-[70]">
      <div
        ref={outerRef}
        className={`fixed top-0 left-0 rounded-full border flex items-center justify-center transition-[width,height,margin,background-color,border-color,opacity] duration-200 ease-out will-change-transform ${ringClasses} ${
          visible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {mode === 'view' && (
          <span className="text-[10px] font-semibold tracking-[0.16em] uppercase select-none">
            {label}
          </span>
        )}
      </div>

      <div
        ref={dotRef}
        className={`fixed top-0 left-0 w-1.5 h-1.5 -ml-[3px] -mt-[3px] rounded-full bg-[#D6B77A] transition-opacity duration-150 will-change-transform ${
          visible && mode !== 'view' ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </div>
  );
}
