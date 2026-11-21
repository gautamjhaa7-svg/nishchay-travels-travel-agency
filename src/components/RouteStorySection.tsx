import {useEffect, useRef} from 'react';
import {ArrowRight, MessageCircle} from 'lucide-react';
import {buildWhatsAppUrl} from '../data/travelData';
import {gsap, prefersReducedMotion} from '../utils/gsapSetup';
import {EditorialImage} from './EditorialImage';

interface StoryChapter {
  chapter: string;
  title: string;
  corridor: string;
  description: string;
  image: string;
  alt: string;
  enquiryText: string;
}

const STORY_CHAPTERS: StoryChapter[] = [
  {
    chapter: 'Chapter 01',
    title: 'Departure From Jagriti Vihar',
    corridor: 'Meerut · Delhi NCR · Expressways',
    description:
      'Every journey begins smoothly at your doorstep in Meerut—whether heading to an early morning terminal transfer or setting out onto the highway.',
    image: '/src/assets/images/fleet_executive_suv_1795253403735.jpg',
    alt: 'Representative executive SUV ready for morning departure',
    enquiryText: 'Hello Nishchay Tours & Travels, I would like to enquire about an executive pickup from Jagriti Vihar, Meerut.',
  },
  {
    chapter: 'Chapter 02',
    title: 'Riverfront & Foothill Calm',
    corridor: 'Haridwar · Rishikesh · Ganga Corridor',
    description:
      'Follow the northern plains into sacred river towns where twilight prayers and emerald foothill waters welcome unhurried family trips.',
    image: '/src/assets/images/dest_ganga_spiritual_1795253404633.jpg',
    alt: 'Evening twilight over the emerald Ganga river and suspension bridge in Rishikesh',
    enquiryText: 'Hello Nishchay Tours & Travels, I would like to enquire about a Haridwar & Rishikesh trip from Meerut.',
  },
  {
    chapter: 'Chapter 03',
    title: 'Into the Himalayan Pines',
    corridor: 'Dehradun · Mussoorie · Nainital',
    description:
      'Ascend scenic cedar-lined mountain roads at a comfortable pace, taking in valley vistas and crisp hill-station air.',
    image: '/src/assets/images/dest_mussoorie_ridge_1795253420367.jpg',
    alt: 'Golden morning light over misty Himalayan ridges in Mussoorie',
    enquiryText: 'Hello Nishchay Tours & Travels, I would like to enquire about a Himalayan hill-station trip from Meerut.',
  },
  {
    chapter: 'Chapter 04',
    title: 'Royal Heritage & Forest Trails',
    corridor: 'Agra · Jaipur · Jim Corbett',
    description:
      'Explore monumental sandstone courtyards or dawn sal-forest drives in tailored multi-day circuits designed around your schedule.',
    image: '/src/assets/images/dest_heritage_palace_1795253403678.jpg',
    alt: 'Carved sandstone palace archways and reflecting pool in Rajasthan',
    enquiryText: 'Hello Nishchay Tours & Travels, I would like to enquire about a heritage or wildlife circuit from Meerut.',
  },
];

export function RouteStorySection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const svgPathRef = useRef<SVGPathElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track || prefersReducedMotion()) return;

    const mm = gsap.matchMedia();

    mm.add('(min-width: 1024px)', () => {
      const getScrollAmount = () => Math.max(track.scrollWidth - window.innerWidth + 96, 0);

      const horizontalTween = gsap.to(track, {
        x: () => -getScrollAmount(),
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          pin: true,
          scrub: 1,
          end: () => `+=${Math.max(getScrollAmount(), 900)}`,
          invalidateOnRefresh: true,
        },
      });

      // Animated SVG topographic path drawn in sync with horizontal progress
      if (svgPathRef.current) {
        const totalLen = svgPathRef.current.getTotalLength();
        gsap.set(svgPathRef.current, {
          strokeDasharray: totalLen,
          strokeDashoffset: totalLen,
        });

        gsap.to(svgPathRef.current, {
          strokeDashoffset: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: () => `+=${Math.max(getScrollAmount(), 900)}`,
            scrub: 0.8,
            invalidateOnRefresh: true,
          },
        });
      }

      // ContainerAnimation parallax on each horizontal slide image
      const cards = gsap.utils.toArray<HTMLElement>('.story-slide-img', track);
      cards.forEach((imgEl) => {
        gsap.fromTo(
          imgEl,
          {scale: 1.16, xPercent: -6},
          {
            scale: 1.04,
            xPercent: 6,
            ease: 'none',
            scrollTrigger: {
              trigger: imgEl,
              containerAnimation: horizontalTween,
              start: 'left right',
              end: 'right left',
              scrub: true,
            },
          },
        );
      });
    });

    // Mobile & Tablet Scroll Animations (SVG path only; swipe cards stay visible immediately)
    mm.add('(max-width: 1023px)', () => {
      if (svgPathRef.current) {
        const totalLen = svgPathRef.current.getTotalLength();
        gsap.set(svgPathRef.current, {
          strokeDasharray: totalLen,
          strokeDashoffset: totalLen,
        });

        gsap.to(svgPathRef.current, {
          strokeDashoffset: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top 85%',
            end: 'center center',
            scrub: 0.6,
          },
        });
      }
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="corridor-story-heading"
      className="relative bg-[#07111F] text-[#F7F4EE] py-16 sm:py-20 lg:py-0 lg:min-h-screen flex flex-col justify-center overflow-hidden border-y border-white/10"
    >
      <div className="max-w-7xl mx-auto w-full px-5 sm:px-6 lg:px-8 mb-8 sm:mb-10 lg:mb-12">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-5 sm:gap-6">
          <div>
            <p className="text-xs font-semibold tracking-[0.18em] uppercase text-[#D6B77A] mb-2">
              The Route Chronicle
            </p>
            <h2
              id="corridor-story-heading"
              className="font-serif text-[clamp(1.85rem,5.5vw,3rem)] leading-[1.1] font-medium text-[#F7F4EE]"
            >
              From Meerut to the Mountains &amp; Heritage Plains
            </h2>
          </div>

          {/* Animated SVG Route Curve */}
          <div className="w-full max-w-sm">
            <svg
              viewBox="0 0 360 44"
              fill="none"
              aria-hidden="true"
              className="w-full h-9 sm:h-10 overflow-visible"
            >
              <path
                d="M 4 32 C 70 4, 120 40, 185 20 C 245 2, 295 36, 356 12"
                stroke="rgba(255,255,255,0.14)"
                strokeWidth="1.5"
                strokeDasharray="4 4"
              />
              <path
                ref={svgPathRef}
                d="M 4 32 C 70 4, 120 40, 185 20 C 245 2, 295 36, 356 12"
                stroke="#D6B77A"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <circle cx="4" cy="32" r="3.5" fill="#D6B77A" />
              <circle cx="356" cy="12" r="3.5" fill="#D6B77A" />
            </svg>
            <div className="flex items-center justify-between text-[11px] tracking-[0.12em] uppercase text-[#F7F4EE]/55 mt-1">
              <span>Jagriti Vihar, Meerut</span>
              <span className="lg:hidden">Swipe Chapters →</span>
              <span className="hidden lg:inline">Scroll to Follow Route</span>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop: GSAP Pinned Horizontal Track | Mobile/Tablet: Native Touch Snap Rail */}
      <div className="w-full overflow-x-auto lg:overflow-visible snap-x snap-mandatory [-webkit-overflow-scrolling:touch] pb-2 lg:pb-0">
        <div
          ref={trackRef}
          className="flex flex-row gap-4 sm:gap-6 lg:gap-8 px-5 sm:px-6 lg:px-12 w-max lg:w-auto will-change-transform"
        >
          {STORY_CHAPTERS.map((item) => (
            <article
              key={item.chapter}
              data-cursor="view"
              data-cursor-label="Route"
              className="snap-start group relative w-[84vw] max-w-[330px] sm:w-[390px] sm:max-w-none lg:w-[540px] xl:w-[600px] shrink-0 bg-[#0D1B2E] border border-white/10 rounded-sm overflow-hidden flex flex-col"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-[#13253D]">
                <div className="story-slide-img w-full h-full will-change-transform">
                  <EditorialImage
                    src={item.image}
                    alt={item.alt}
                    fallbackTitle={item.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-[#0D1B2E]/80 via-transparent to-transparent"
                />
              </div>

              <div className="p-5 sm:p-7 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-2 text-xs text-[#D6B77A]/90 tracking-wide mb-2">
                    <span className="font-semibold uppercase tracking-[0.14em]">{item.chapter}</span>
                    <span aria-hidden="true" className="text-[#D6B77A]/45">
                      ·
                    </span>
                    <span className="text-[#F7F4EE]/70">{item.corridor}</span>
                  </div>
                  <h3 className="font-serif text-2xl sm:text-3xl font-medium text-[#F7F4EE] mb-2">
                    {item.title}
                  </h3>
                  <p className="text-[15px] sm:text-sm text-[#F7F4EE]/75 leading-relaxed dark-optical">
                    {item.description}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-white/10">
                  <a
                    href={buildWhatsAppUrl(item.enquiryText)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="min-h-[44px] inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#D6B77A] hover:text-[#E8D2A3] transition-colors"
                  >
                    <MessageCircle className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>Enquire This Route</span>
                    <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
