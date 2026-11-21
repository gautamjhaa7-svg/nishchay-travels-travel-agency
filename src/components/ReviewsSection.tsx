import {useEffect, useRef} from 'react';
import {ExternalLink, ShieldCheck, Star} from 'lucide-react';
import {BUSINESS_INFO} from '../data/travelData';
import {gsap, prefersReducedMotion} from '../utils/gsapSetup';
import {MagneticWrapper} from './MagneticWrapper';

export function ReviewsSection() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.from('.reviews-card-gsap', {
        y: 26,
        opacity: 0,
        duration: 0.7,
        ease: 'power3.out',
        immediateRender: false,
        clearProps: 'transform,opacity',
        scrollTrigger: {
          trigger: '.reviews-card-gsap',
          start: 'top 94%',
          once: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="reputation-heading"
      className="bg-[#07111F] text-[#F7F4EE] py-16 sm:py-22 lg:py-24"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className="reviews-card-gsap relative rounded-sm bg-[#0D1B2E] border border-white/10 p-6 sm:p-10 lg:p-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            {/* Referenced Rating Block */}
            <div className="lg:col-span-5 border-b border-white/10 pb-7 lg:border-b-0 lg:pb-0 lg:border-r lg:pr-10">
              <p className="text-xs font-semibold tracking-[0.18em] uppercase text-[#D6B77A] mb-3 sm:mb-4">
                Verified Listing Reputation
              </p>

              <div className="flex items-baseline gap-3">
                <span className="font-serif text-5xl sm:text-7xl font-medium text-[#F7F4EE] tabular-nums">
                  {BUSINESS_INFO.referencedRating}
                </span>
                <span className="font-serif text-xl sm:text-2xl text-[#D6B77A] tabular-nums">
                  / 5.0
                </span>
              </div>

              <div
                className="flex items-center gap-1.5 mt-3 text-[#D6B77A]"
                aria-label="4.9 out of 5 stars"
              >
                {[0, 1, 2, 3, 4].map((starIndex) => (
                  <Star
                    key={starIndex}
                    className="w-4 h-4 fill-[#D6B77A] text-[#D6B77A]"
                    aria-hidden="true"
                  />
                ))}
              </div>

              <p className="mt-4 text-[15px] sm:text-sm text-[#F7F4EE]/75 leading-relaxed dark-optical">
                Referenced from {BUSINESS_INFO.referencedReviewCount} customer reviews on Google.
                We invite prospective travellers to inspect live, unedited guest feedback directly
                on our Google Maps profile.
              </p>
            </div>

            {/* Direct Link & Transparency Commitment */}
            <div className="lg:col-span-7 space-y-4 sm:space-y-5">
              <h2
                id="reputation-heading"
                className="font-serif text-[clamp(1.7rem,5vw,2.65rem)] leading-[1.14] font-medium text-[#F7F4EE]"
              >
                Read Genuine Guest Experiences Directly on Google
              </h2>

              <p className="text-[15px] sm:text-base text-[#F7F4EE]/75 leading-relaxed max-w-2xl dark-optical">
                To uphold complete authenticity, Nishchay Tours &amp; Travels does not display
                scripted testimonials or stock portraits. View our current public rating, recent
                feedback, and directions directly on Google Maps before planning your trip.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-4 sm:gap-5">
                <MagneticWrapper strength={0.2} className="w-full sm:w-auto">
                  <a
                    href={BUSINESS_INFO.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto min-h-[48px] inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-sm bg-[#D6B77A] text-[#07111F] text-xs font-semibold tracking-wider uppercase hover:bg-[#E8D2A3] transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F7F4EE]"
                  >
                    <span>Read Reviews on Google Maps</span>
                    <ExternalLink className="w-4 h-4" aria-hidden="true" />
                  </a>
                </MagneticWrapper>

                <span className="inline-flex items-center gap-2 text-xs text-[#F7F4EE]/65">
                  <ShieldCheck className="w-4 h-4 text-[#D6B77A] shrink-0" aria-hidden="true" />
                  <span>Direct link to public Google listing</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
