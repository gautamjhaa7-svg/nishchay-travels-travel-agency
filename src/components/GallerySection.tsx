import {useEffect, useMemo, useRef, useState} from 'react';
import {AnimatePresence, motion} from 'motion/react';
import {ChevronLeft, ChevronRight, Maximize2, X} from 'lucide-react';
import {GALLERY_ITEMS, type GalleryCategory} from '../data/travelData';
import {gsap, prefersReducedMotion, ScrollTrigger} from '../utils/gsapSetup';
import {EditorialImage} from './EditorialImage';

const GALLERY_CATEGORIES: GalleryCategory[] = [
  'All',
  'Mountain Roads',
  'Destinations',
  'Landscapes',
  'Vehicles',
];

export function GallerySection() {
  const [activeCategory, setActiveCategory] = useState<GalleryCategory>('All');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const gridRef = useRef<HTMLDivElement | null>(null);
  const hasInteracted = useRef(false);

  const visibleItems = useMemo(() => {
    if (activeCategory === 'All') return GALLERY_ITEMS;
    return GALLERY_ITEMS.filter((item) => item.category === activeCategory);
  }, [activeCategory]);

  const activeLightboxItem =
    lightboxIndex !== null && visibleItems[lightboxIndex] ? visibleItems[lightboxIndex] : null;

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      const tiles = gsap.utils.toArray<HTMLElement>('.gallery-tile-gsap', grid);
      if (hasInteracted.current) {
        gsap.fromTo(
          tiles,
          {y: 24, opacity: 0, scale: 0.96},
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.5,
            stagger: 0.05,
            ease: 'power3.out',
            clearProps: 'transform',
          },
        );
      } else {
        gsap.from(tiles, {
          y: 26,
          opacity: 0,
          duration: 0.65,
          stagger: {amount: 0.35, from: 'start'},
          ease: 'power3.out',
          immediateRender: false,
          clearProps: 'transform,opacity',
          scrollTrigger: {
            trigger: grid,
            start: 'top 94%',
            once: true,
          },
        });
      }
    }, gridRef);

    ScrollTrigger.refresh();
    return () => ctx.revert();
  }, [activeCategory]);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setLightboxIndex(null);
      } else if (e.key === 'ArrowRight') {
        setLightboxIndex((prev) =>
          prev === null ? null : (prev + 1) % visibleItems.length,
        );
      } else if (e.key === 'ArrowLeft') {
        setLightboxIndex((prev) =>
          prev === null ? null : (prev - 1 + visibleItems.length) % visibleItems.length,
        );
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [lightboxIndex, visibleItems.length]);

  const handleFilterChange = (category: GalleryCategory) => {
    hasInteracted.current = true;
    setActiveCategory(category);
    setLightboxIndex(null);
  };

  return (
    <section id="gallery" className="bg-[#FAF8F4] text-[#07111F] py-16 sm:py-22 lg:py-28">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        {/* Header + Filter Controls */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 sm:gap-8 mb-9 sm:mb-12">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold tracking-[0.18em] uppercase text-[#8A6D3B] mb-3">
              Visual Inspiration
            </p>
            <h2 className="font-serif text-[clamp(1.85rem,5.5vw,3.1rem)] leading-[1.12] font-medium text-[#07111F]">
              The Spirit of Northern Routes
            </h2>
            <p className="mt-3 text-[15px] sm:text-base text-[#475569] leading-relaxed">
              Representative landscapes, mountain highways, heritage gateways, and touring
              vehicles illustrating the routes we curate from Meerut.
            </p>
          </div>

          <div
            role="tablist"
            aria-label="Filter gallery images"
            className="grid grid-cols-2 sm:inline-flex items-center gap-1 p-1 bg-[#EFECE6] rounded-sm border border-[#07111F]/10 w-full sm:w-auto"
          >
            {GALLERY_CATEGORIES.map((category, idx) => {
              const active = activeCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => handleFilterChange(category)}
                  className={`min-h-[44px] sm:min-h-0 px-3 sm:px-3.5 py-2 text-xs font-medium rounded-sm transition-colors duration-200 text-center whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#07111F] ${
                    idx === 0 ? 'col-span-2 sm:col-span-1' : ''
                  } ${
                    active
                      ? 'bg-[#07111F] text-[#F7F4EE]'
                      : 'text-[#334155] hover:text-[#07111F]'
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>

        {/* Responsive Editorial Grid */}
        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {visibleItems.map((item, idx) => (
            <button
              key={item.id}
              type="button"
              data-cursor="view"
              data-cursor-label="View"
              onClick={() => setLightboxIndex(idx)}
              aria-label={`View full photo: ${item.title}`}
              className={`gallery-tile-gsap group relative text-left overflow-hidden rounded-sm bg-[#0D1B2E] aspect-[16/10] sm:aspect-[4/3] cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#07111F] ${
                item.featured && activeCategory === 'All' ? 'sm:col-span-2 sm:aspect-[16/9]' : ''
              }`}
            >
              <EditorialImage
                src={item.image}
                alt={item.alt}
                fallbackTitle={item.title}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-[#07111F]/85 via-[#07111F]/20 to-transparent opacity-80 group-hover:opacity-95 transition-opacity"
              />
              <div className="absolute top-3 right-3 w-9 h-9 rounded-sm bg-[#07111F]/65 backdrop-blur-sm border border-white/15 flex items-center justify-center text-[#F7F4EE] opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <Maximize2 className="w-4 h-4" aria-hidden="true" />
              </div>
              <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
                <p className="text-[11px] font-medium tracking-[0.14em] uppercase text-[#D6B77A]">
                  {item.category}
                </p>
                <p className="font-serif text-xl font-medium text-[#F7F4EE] mt-0.5">
                  {item.title}
                </p>
              </div>
            </button>
          ))}
        </div>

        <p className="mt-7 text-xs text-[#64748B]">
          Representative editorial visuals shown for route and vehicle-category inspiration.
        </p>
      </div>

      {/* Full-Screen Accessible Lightbox */}
      <AnimatePresence>
        {activeLightboxItem && lightboxIndex !== null && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={activeLightboxItem.title}
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            transition={{duration: 0.2}}
            className="fixed inset-0 z-50 bg-[#07111F]/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
            onClick={() => setLightboxIndex(null)}
          >
            <div
              className="relative max-w-5xl w-full flex flex-col gap-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between gap-3 text-[#F7F4EE]">
                <div className="min-w-0">
                  <p className="text-xs font-medium tracking-[0.15em] uppercase text-[#D6B77A]">
                    {activeLightboxItem.category}
                  </p>
                  <h3 className="font-serif text-xl sm:text-3xl font-medium leading-tight">
                    {activeLightboxItem.title}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setLightboxIndex(null)}
                  aria-label="Close image lightbox"
                  className="shrink-0 w-11 h-11 rounded-sm border border-white/15 bg-[#0D1B2E] text-[#F7F4EE] hover:border-[#D6B77A] hover:text-[#D6B77A] flex items-center justify-center cursor-pointer transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-sm bg-[#0D1B2E] border border-white/10">
                <EditorialImage
                  src={activeLightboxItem.image}
                  alt={activeLightboxItem.alt}
                  fallbackTitle={activeLightboxItem.title}
                  className="w-full h-full object-contain bg-[#07111F]"
                />
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 text-sm text-[#F7F4EE]/80">
                <p className="text-[13px] sm:text-sm leading-relaxed">
                  {activeLightboxItem.caption}
                </p>
                <div className="flex items-center justify-between sm:justify-end gap-2 w-full sm:w-auto shrink-0">
                  <button
                    type="button"
                    onClick={() =>
                      setLightboxIndex(
                        (lightboxIndex - 1 + visibleItems.length) % visibleItems.length,
                      )
                    }
                    aria-label="Previous image"
                    className="inline-flex items-center justify-center gap-1.5 min-h-[44px] px-4 py-2 rounded-sm border border-white/15 bg-[#0D1B2E] text-xs font-medium hover:border-[#D6B77A] hover:text-[#D6B77A] cursor-pointer transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Prev</span>
                  </button>
                  <span className="text-xs text-[#F7F4EE]/60 tabular-nums px-2">
                    {lightboxIndex + 1} / {visibleItems.length}
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      setLightboxIndex((lightboxIndex + 1) % visibleItems.length)
                    }
                    aria-label="Next image"
                    className="inline-flex items-center justify-center gap-1.5 min-h-[44px] px-4 py-2 rounded-sm border border-white/15 bg-[#0D1B2E] text-xs font-medium hover:border-[#D6B77A] hover:text-[#D6B77A] cursor-pointer transition-colors"
                  >
                    <span>Next</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
