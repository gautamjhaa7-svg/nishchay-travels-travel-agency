import {useEffect, useState} from 'react';
import {MessageCircle, Phone} from 'lucide-react';
import {buildWhatsAppUrl, BUSINESS_INFO} from '../data/travelData';

export function MobileFloatingActions() {
  const [keyboardOpen, setKeyboardOpen] = useState(false);

  useEffect(() => {
    const isFormInput = (el: EventTarget | null) => {
      if (!(el instanceof HTMLElement)) return false;
      const tag = el.tagName;
      return tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT';
    };

    const onFocusIn = (e: FocusEvent) => {
      if (isFormInput(e.target)) {
        setKeyboardOpen(true);
      }
    };

    const onFocusOut = () => {
      // Delay slightly so moving between fields keeps bar tucked out of the way
      setTimeout(() => {
        if (!isFormInput(document.activeElement)) {
          setKeyboardOpen(false);
        }
      }, 120);
    };

    document.addEventListener('focusin', onFocusIn);
    document.addEventListener('focusout', onFocusOut);
    return () => {
      document.removeEventListener('focusin', onFocusIn);
      document.removeEventListener('focusout', onFocusOut);
    };
  }, []);

  const whatsappUrl = buildWhatsAppUrl(
    `Hello ${BUSINESS_INFO.name}, I would like to plan a journey from Meerut.`,
  );

  return (
    <>
      {/* Floating WhatsApp Action Button (Desktop + Tablet) */}
      <div className="hidden md:block fixed bottom-6 right-6 z-40">
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with Nishchay Tours & Travels on WhatsApp"
          className="group relative inline-flex items-center gap-2.5 px-4 py-3.5 rounded-full bg-[#D6B77A] text-[#07111F] shadow-xl hover:bg-[#E8D2A3] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F7F4EE]"
        >
          <span
            aria-hidden="true"
            className="absolute inset-0 rounded-full bg-[#D6B77A]/40 motion-safe:animate-ping pointer-events-none"
          />
          <MessageCircle className="relative w-5 h-5 stroke-[2]" aria-hidden="true" />
          <span className="relative text-xs font-semibold tracking-wider uppercase whitespace-nowrap">
            WhatsApp Us
          </span>
        </a>
      </div>

      {/* Compact Sticky Mobile Booking Bar (hides cleanly when keyboard is open on form fields) */}
      <div
        className={`md:hidden fixed bottom-0 inset-x-0 z-40 bg-[#07111F]/95 backdrop-blur-md border-t border-white/15 px-3 py-2 transition-transform duration-200 ${
          keyboardOpen ? 'translate-y-full pointer-events-none' : 'translate-y-0'
        }`}
      >
        <div className="grid grid-cols-3 gap-2 max-w-md mx-auto">
          <a
            href={BUSINESS_INFO.phoneTel}
            className="inline-flex items-center justify-center gap-1.5 min-h-[44px] rounded-sm border border-white/15 text-[#F7F4EE] text-xs font-medium whitespace-nowrap"
          >
            <Phone className="w-3.5 h-3.5 text-[#D6B77A]" aria-hidden="true" />
            <span>Call</span>
          </a>

          <a
            href="#enquiry"
            className="inline-flex items-center justify-center min-h-[44px] rounded-sm border border-[#D6B77A]/40 text-[#D6B77A] text-xs font-semibold tracking-wide whitespace-nowrap"
          >
            Plan Trip
          </a>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-1.5 min-h-[44px] rounded-sm bg-[#D6B77A] text-[#07111F] text-xs font-semibold tracking-wide whitespace-nowrap"
          >
            <MessageCircle className="w-3.5 h-3.5" aria-hidden="true" />
            <span>WhatsApp</span>
          </a>
        </div>
      </div>
    </>
  );
}
