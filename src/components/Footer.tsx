import {ArrowUpRight, MapPin, MessageCircle, Phone} from 'lucide-react';
import {buildWhatsAppUrl, BUSINESS_INFO, SERVICES} from '../data/travelData';

const QUICK_LINKS = [
  {label: 'Home', href: '#home'},
  {label: 'About Us', href: '#about'},
  {label: 'Services', href: '#services'},
  {label: 'Tour Packages', href: '#packages'},
  {label: 'Our Fleet', href: '#fleet'},
  {label: 'Photo Gallery', href: '#gallery'},
  {label: 'Travel Enquiry', href: '#enquiry'},
  {label: 'Contact', href: '#contact'},
];

export function Footer() {
  const year = new Date().getFullYear();
  const whatsappUrl = buildWhatsAppUrl(
    `Hello ${BUSINESS_INFO.name}, I would like to book or enquire about a trip.`,
  );

  return (
    <footer className="bg-[#07111F] text-[#F7F4EE] border-t border-white/10 pt-14 sm:pt-16 pb-24 md:pb-12">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 min-[360px]:grid-cols-2 lg:grid-cols-12 gap-8 sm:gap-10 pb-12 sm:pb-14 border-b border-white/10">
          {/* Brand Column */}
          <div className="min-[360px]:col-span-2 lg:col-span-4 space-y-4">
            <a
              href="#home"
              className="font-serif text-xl font-semibold tracking-[0.12em] text-[#F7F4EE] inline-block"
            >
              {BUSINESS_INFO.shortName}
            </a>
            <p className="text-[15px] sm:text-sm text-[#F7F4EE]/70 leading-relaxed max-w-sm dark-optical">
              Meerut-based bespoke travel service focused on comfortable journeys, personalized
              itineraries, and transparent trip planning across North India.
            </p>
            <div className="pt-2">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto min-h-[46px] inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-sm bg-[#D6B77A] text-[#07111F] text-xs font-semibold tracking-wider uppercase hover:bg-[#E8D2A3] transition-colors whitespace-nowrap"
              >
                <MessageCircle className="w-3.5 h-3.5" aria-hidden="true" />
                <span>WhatsApp Booking Desk</span>
                <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <h3 className="text-xs font-semibold tracking-[0.16em] uppercase text-[#D6B77A] mb-3.5 sm:mb-4">
              Quick Links
            </h3>
            <ul className="space-y-1 text-sm text-[#F7F4EE]/75">
              {QUICK_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="inline-flex items-center min-h-[36px] hover:text-[#D6B77A] transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services List */}
          <div className="lg:col-span-3">
            <h3 className="text-xs font-semibold tracking-[0.16em] uppercase text-[#D6B77A] mb-3.5 sm:mb-4">
              Travel Services
            </h3>
            <ul className="space-y-1 text-sm text-[#F7F4EE]/75">
              {SERVICES.map((service) => (
                <li key={service.id}>
                  <a
                    href="#services"
                    className="inline-flex items-center min-h-[36px] hover:text-[#D6B77A] transition-colors"
                  >
                    {service.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div className="min-[360px]:col-span-2 lg:col-span-3">
            <h3 className="text-xs font-semibold tracking-[0.16em] uppercase text-[#D6B77A] mb-3.5 sm:mb-4">
              Contact Details
            </h3>
            <ul className="space-y-3 text-sm text-[#F7F4EE]/75">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#D6B77A] shrink-0 mt-0.5" aria-hidden="true" />
                <span>{BUSINESS_INFO.fullAddress}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#D6B77A] shrink-0" aria-hidden="true" />
                <a
                  href={BUSINESS_INFO.phoneTel}
                  className="inline-flex items-center min-h-[40px] hover:text-[#D6B77A] transition-colors tabular-nums"
                >
                  {BUSINESS_INFO.phoneDisplay}
                </a>
              </li>
              <li>
                <a
                  href={BUSINESS_INFO.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 min-h-[40px] text-xs font-medium tracking-wide text-[#D6B77A] hover:text-[#E8D2A3] underline underline-offset-4"
                >
                  <span>View Listing on Google Maps</span>
                  <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-7 sm:pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 text-xs text-[#F7F4EE]/50">
          <p>
            &copy; {year} {BUSINESS_INFO.name}. All rights reserved.
          </p>
          <p>Jagriti Vihar, Meerut, Uttar Pradesh, India</p>
        </div>
      </div>
    </footer>
  );
}
