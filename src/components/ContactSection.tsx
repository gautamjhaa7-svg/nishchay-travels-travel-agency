import {motion} from 'motion/react';
import {ExternalLink, MapPin, MessageCircle, Phone} from 'lucide-react';
import {buildWhatsAppUrl, BUSINESS_INFO} from '../data/travelData';

export function ContactSection() {
  const directWhatsAppUrl = buildWhatsAppUrl(
    `Hello ${BUSINESS_INFO.name}, I would like to enquire about a journey from Meerut.`,
  );

  return (
    <section id="contact" className="bg-[#FAF8F4] text-[#07111F] py-16 sm:py-22 lg:py-28">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-14 items-stretch">
          {/* Contact Details */}
          <motion.div
            initial={{opacity: 0, y: 18}}
            whileInView={{opacity: 1, y: 0}}
            viewport={{once: true, margin: '-20px'}}
            transition={{duration: 0.55, ease: [0.16, 1, 0.3, 1]}}
            className="lg:col-span-5 flex flex-col justify-between"
          >
            <div>
              <p className="text-xs font-semibold tracking-[0.18em] uppercase text-[#8A6D3B] mb-3">
                Visit or Reach Out
              </p>
              <h2 className="font-serif text-[clamp(1.85rem,5.5vw,3.1rem)] leading-[1.12] font-medium text-[#07111F]">
                Connect With Our Meerut Desk
              </h2>
              <div className="w-14 sm:w-16 h-px bg-[#D6B77A] my-5 sm:my-6" aria-hidden="true" />

              <div className="space-y-5 sm:space-y-6 text-[#334155]">
                <div>
                  <p className="text-xs font-semibold tracking-[0.14em] uppercase text-[#8A6D3B] mb-1">
                    Agency Name
                  </p>
                  <p className="font-serif text-2xl font-medium text-[#07111F]">
                    {BUSINESS_INFO.name}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-semibold tracking-[0.14em] uppercase text-[#8A6D3B] mb-1">
                    Location
                  </p>
                  <p className="text-[15px] sm:text-base leading-relaxed">
                    {BUSINESS_INFO.fullAddress}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-semibold tracking-[0.14em] uppercase text-[#8A6D3B] mb-1">
                    Phone &amp; WhatsApp
                  </p>
                  <a
                    href={BUSINESS_INFO.phoneTel}
                    className="inline-flex items-center min-h-[44px] text-xl font-medium text-[#07111F] hover:text-[#8A6D3B] transition-colors tabular-nums"
                  >
                    {BUSINESS_INFO.phoneDisplay}
                  </a>
                </div>
              </div>
            </div>

            {/* Action Buttons (Full-width stacked on phones, inline on sm+) */}
            <div className="mt-7 sm:mt-9 grid grid-cols-1 sm:flex sm:flex-wrap items-center gap-3">
              <a
                href={BUSINESS_INFO.phoneTel}
                className="w-full sm:w-auto min-h-[48px] inline-flex items-center justify-center gap-2 px-5 py-3 rounded-sm bg-[#07111F] text-[#F7F4EE] text-xs font-semibold tracking-wider uppercase hover:bg-[#13253D] transition-colors whitespace-nowrap"
              >
                <Phone className="w-3.5 h-3.5 text-[#D6B77A]" aria-hidden="true" />
                <span>Call Now</span>
              </a>

              <a
                href={directWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto min-h-[48px] inline-flex items-center justify-center gap-2 px-5 py-3 rounded-sm bg-[#D6B77A] text-[#07111F] text-xs font-semibold tracking-wider uppercase hover:bg-[#E8D2A3] transition-colors whitespace-nowrap"
              >
                <MessageCircle className="w-3.5 h-3.5" aria-hidden="true" />
                <span>WhatsApp Now</span>
              </a>

              <a
                href={BUSINESS_INFO.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto min-h-[48px] inline-flex items-center justify-center gap-2 px-5 py-3 rounded-sm border border-[#07111F]/25 text-[#07111F] text-xs font-semibold tracking-wider uppercase hover:border-[#07111F] transition-colors whitespace-nowrap"
              >
                <MapPin className="w-3.5 h-3.5 text-[#8A6D3B]" aria-hidden="true" />
                <span>Google Maps</span>
                <ExternalLink className="w-3 h-3" aria-hidden="true" />
              </a>
            </div>
          </motion.div>

          {/* Embedded Map */}
          <motion.div
            initial={{opacity: 0, y: 18}}
            whileInView={{opacity: 1, y: 0}}
            viewport={{once: true, margin: '-20px'}}
            transition={{duration: 0.55, delay: 0.05, ease: [0.16, 1, 0.3, 1]}}
            className="lg:col-span-7 h-[270px] sm:h-[360px] lg:h-full lg:min-h-[420px] rounded-sm overflow-hidden border border-[#07111F]/12 bg-[#EFECE6]"
          >
            <iframe
              title="Nishchay Tours & Travels — Jagriti Vihar, Meerut Map"
              src={BUSINESS_INFO.googleMapsEmbedUrl}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full border-0"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
