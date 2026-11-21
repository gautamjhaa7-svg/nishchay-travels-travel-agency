import {useEffect, useMemo, useRef, useState, type FormEvent} from 'react';
import {motion} from 'motion/react';
import {
  Check,
  CheckCircle2,
  Copy,
  ExternalLink,
  MessageCircle,
  RotateCcw,
} from 'lucide-react';
import {buildWhatsAppUrl, BUSINESS_INFO} from '../data/travelData';

interface EnquiryFormSectionProps {
  prefilledDestination: string;
}

interface FormState {
  fullName: string;
  mobile: string;
  pickupLocation: string;
  destination: string;
  travelDate: string;
  returnDate: string;
  passengers: string;
  vehiclePreference: string;
  tripType: 'One-Way' | 'Round-Trip';
  notes: string;
}

type FormErrors = Partial<Record<keyof FormState, string>>;

function getTodayIso(): string {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, '0');
  const d = String(now.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

export function EnquiryFormSection({prefilledDestination}: EnquiryFormSectionProps) {
  const todayIso = useMemo(() => getTodayIso(), []);
  const hiddenAnchorRef = useRef<HTMLAnchorElement | null>(null);

  const [form, setForm] = useState<FormState>({
    fullName: '',
    mobile: '',
    pickupLocation: 'Jagriti Vihar, Meerut',
    destination: '',
    travelDate: '',
    returnDate: '',
    passengers: '4',
    vehiclePreference: 'SUV',
    tripType: 'Round-Trip',
    notes: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [submittedMessage, setSubmittedMessage] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (prefilledDestination) {
      setForm((prev) => ({...prev, destination: prefilledDestination}));
      setSubmittedMessage(null);
    }
  }, [prefilledDestination]);

  const validate = (): FormErrors => {
    const nextErrors: FormErrors = {};

    if (!form.fullName.trim() || form.fullName.trim().length < 2) {
      nextErrors.fullName = 'Please enter your full name.';
    }

    const digitsOnly = form.mobile.replace(/\D/g, '');
    if (digitsOnly.length < 10 || digitsOnly.length > 13) {
      nextErrors.mobile = 'Please enter a valid 10-digit mobile number.';
    }

    if (!form.pickupLocation.trim()) {
      nextErrors.pickupLocation = 'Please enter a pickup location.';
    }

    if (!form.destination.trim()) {
      nextErrors.destination = 'Please enter your destination.';
    }

    if (!form.travelDate) {
      nextErrors.travelDate = 'Please select your travel date.';
    }

    if (form.returnDate && form.travelDate && form.returnDate < form.travelDate) {
      nextErrors.returnDate = 'Return date cannot be earlier than the travel date.';
    }

    const pax = Number(form.passengers);
    if (!form.passengers || Number.isNaN(pax) || pax < 1 || pax > 50) {
      nextErrors.passengers = 'Please specify a valid passenger count (1–50).';
    }

    return nextErrors;
  };

  const buildStructuredMessage = (): string => {
    const lines = [
      `Hello ${BUSINESS_INFO.name},`,
      `I would like to submit a travel enquiry:`,
      '',
      `Name: ${form.fullName.trim()}`,
      `Mobile: ${form.mobile.trim()}`,
      `Trip Type: ${form.tripType}`,
      `Pickup Location: ${form.pickupLocation.trim()}`,
      `Destination: ${form.destination.trim()}`,
      `Travel Date: ${form.travelDate}`,
      ...(form.returnDate ? [`Return Date: ${form.returnDate}`] : []),
      `Passengers: ${form.passengers}`,
      `Vehicle Preference: ${form.vehiclePreference}`,
      ...(form.notes.trim() ? [`Additional Requirements: ${form.notes.trim()}`] : []),
      '',
      'Please share vehicle availability and an estimated quote.',
    ];
    return lines.join('\n');
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    const msg = buildStructuredMessage();
    setSubmittedMessage(msg);
    setCopied(false);

    // Trigger external WhatsApp link safely via anchor element rather than window.open
    requestAnimationFrame(() => {
      hiddenAnchorRef.current?.click();
    });
  };

  const whatsappHref = submittedMessage ? buildWhatsAppUrl(submittedMessage) : '#';

  const handleCopy = async () => {
    if (!submittedMessage) return;
    try {
      await navigator.clipboard.writeText(submittedMessage);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(false);
    }
  };

  const updateField = <K extends keyof FormState>(field: K, value: FormState[K]) => {
    setForm((prev) => ({...prev, [field]: value}));
    if (errors[field]) {
      setErrors((prev) => ({...prev, [field]: undefined}));
    }
  };

  return (
    <section id="enquiry" className="bg-[#07111F] text-[#F7F4EE] py-16 sm:py-22 lg:py-28">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-16 items-start">
          {/* Left Editorial Guidance */}
          <motion.div
            initial={{opacity: 0, y: 18}}
            whileInView={{opacity: 1, y: 0}}
            viewport={{once: true, margin: '-20px'}}
            transition={{duration: 0.55, ease: [0.16, 1, 0.3, 1]}}
            className="lg:col-span-5"
          >
            <p className="text-xs font-semibold tracking-[0.18em] uppercase text-[#D6B77A] mb-3">
              Personalized Travel Desk
            </p>
            <h2 className="font-serif text-[clamp(1.85rem,5.5vw,3.1rem)] leading-[1.12] font-medium text-[#F7F4EE]">
              Plan Your Journey With Us
            </h2>
            <div className="w-14 sm:w-16 h-px bg-[#D6B77A] my-5 sm:my-6" aria-hidden="true" />
            <p className="text-[15px] sm:text-base text-[#F7F4EE]/75 leading-relaxed dark-optical mb-6 sm:mb-8">
              Share your route, travel dates, and preferred vehicle category. Your enquiry will be
              formatted directly for WhatsApp so our team in Jagriti Vihar, Meerut can respond with
              personalized options and availability.
            </p>

            <div className="space-y-4 border-t border-white/10 pt-5 sm:pt-6 text-sm text-[#F7F4EE]/75">
              <div>
                <p className="text-xs uppercase tracking-[0.14em] text-[#D6B77A] mb-1">
                  Enquiry Process
                </p>
                <p className="leading-relaxed text-[15px] sm:text-sm">
                  Submitting this form prepares a WhatsApp travel enquiry—it is not an automated
                  live reservation. Final vehicle allocation and pricing are confirmed directly in
                  conversation.
                </p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.14em] text-[#D6B77A] mb-1">
                  Direct Assistance
                </p>
                <a
                  href={BUSINESS_INFO.phoneTel}
                  className="inline-flex items-center min-h-[44px] text-base font-medium text-[#F7F4EE] hover:text-[#D6B77A] transition-colors tabular-nums"
                >
                  {BUSINESS_INFO.phoneDisplay}
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right Form Container */}
          <motion.div
            initial={{opacity: 0, y: 18}}
            whileInView={{opacity: 1, y: 0}}
            viewport={{once: true, margin: '-20px'}}
            transition={{duration: 0.55, delay: 0.05, ease: [0.16, 1, 0.3, 1]}}
            className="lg:col-span-7"
          >
            <div className="rounded-sm bg-[#0D1B2E] border border-white/10 p-5 sm:p-8 lg:p-10">
              {/* Hidden safe anchor for opening WhatsApp upon form submission */}
              <a
                ref={hiddenAnchorRef}
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="sr-only"
                tabIndex={-1}
                aria-hidden="true"
              >
                Open WhatsApp
              </a>

              {submittedMessage ? (
                <div className="space-y-6">
                  <div className="flex items-start gap-3.5 sm:gap-4">
                    <CheckCircle2
                      className="w-6 h-6 sm:w-7 sm:h-7 text-[#D6B77A] shrink-0 mt-0.5"
                      aria-hidden="true"
                    />
                    <div>
                      <h3 className="font-serif text-2xl sm:text-3xl font-medium text-[#F7F4EE]">
                        Your Travel Enquiry Is Ready for WhatsApp
                      </h3>
                      <p className="mt-2 text-[15px] sm:text-sm text-[#F7F4EE]/75 leading-relaxed">
                        Your enquiry will be sent through WhatsApp to{' '}
                        <span className="text-[#F7F4EE] font-medium">
                          {BUSINESS_INFO.name} ({BUSINESS_INFO.phoneDisplay})
                        </span>
                        . Please note this submits an enquiry rather than a confirmed reservation.
                      </p>
                    </div>
                  </div>

                  <div className="rounded-sm bg-[#07111F] border border-white/10 p-4 sm:p-5">
                    <p className="text-xs font-semibold tracking-[0.14em] uppercase text-[#D6B77A] mb-3">
                      Prepared WhatsApp Message
                    </p>
                    <pre className="whitespace-pre-wrap font-sans text-sm text-[#F7F4EE]/85 leading-relaxed break-words">
                      {submittedMessage}
                    </pre>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-3">
                    <a
                      href={whatsappHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto min-h-[48px] inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-sm bg-[#D6B77A] text-[#07111F] text-xs font-semibold tracking-wider uppercase hover:bg-[#E8D2A3] transition-colors whitespace-nowrap"
                    >
                      <MessageCircle className="w-4 h-4" aria-hidden="true" />
                      <span>Send Enquiry on WhatsApp</span>
                      <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                    </a>

                    <button
                      type="button"
                      onClick={handleCopy}
                      className="w-full sm:w-auto min-h-[46px] inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-sm border border-white/20 text-[#F7F4EE] text-xs font-medium tracking-wider uppercase hover:border-[#D6B77A] hover:text-[#D6B77A] transition-colors cursor-pointer whitespace-nowrap"
                    >
                      {copied ? (
                        <>
                          <Check className="w-4 h-4 text-[#D6B77A]" aria-hidden="true" />
                          <span>Message Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" aria-hidden="true" />
                          <span>Copy Message</span>
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() => setSubmittedMessage(null)}
                      className="w-full sm:w-auto min-h-[44px] inline-flex items-center justify-center gap-1.5 px-4 py-3 text-xs font-medium text-[#F7F4EE]/70 hover:text-[#F7F4EE] transition-colors cursor-pointer whitespace-nowrap"
                    >
                      <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>Edit Enquiry</span>
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-5 sm:space-y-6">
                  {/* Trip Type Segmented Control */}
                  <div>
                    <span className="block text-xs font-medium tracking-wider uppercase text-[#F7F4EE]/75 mb-2">
                      Journey Type
                    </span>
                    <div
                      role="radiogroup"
                      aria-label="Trip type"
                      className="grid grid-cols-2 sm:inline-flex w-full sm:w-auto p-1 bg-[#07111F] border border-white/10 rounded-sm"
                    >
                      {(['Round-Trip', 'One-Way'] as const).map((type) => {
                        const active = form.tripType === type;
                        return (
                          <button
                            key={type}
                            type="button"
                            role="radio"
                            aria-checked={active}
                            onClick={() => updateField('tripType', type)}
                            className={`min-h-[44px] sm:min-h-0 px-4 sm:px-5 py-2 text-xs font-semibold tracking-wide rounded-sm transition-colors cursor-pointer whitespace-nowrap ${
                              active
                                ? 'bg-[#D6B77A] text-[#07111F]'
                                : 'text-[#F7F4EE]/70 hover:text-[#F7F4EE]'
                            }`}
                          >
                            {type}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
                    {/* Full Name */}
                    <div>
                      <label
                        htmlFor="enquiry-name"
                        className="block text-xs font-medium tracking-wider uppercase text-[#F7F4EE]/75 mb-2"
                      >
                        Full Name <span className="text-[#D6B77A]">*</span>
                      </label>
                      <input
                        id="enquiry-name"
                        type="text"
                        required
                        value={form.fullName}
                        onChange={(e) => updateField('fullName', e.target.value)}
                        placeholder="Your full name"
                        aria-invalid={Boolean(errors.fullName)}
                        className="w-full min-h-[48px] px-4 py-3 rounded-sm bg-[#07111F] border border-white/15 text-base sm:text-sm text-[#F7F4EE] placeholder:text-[#F7F4EE]/35 focus:outline-none focus:border-[#D6B77A] transition-colors"
                      />
                      {errors.fullName && (
                        <p className="mt-1.5 text-xs text-rose-300">{errors.fullName}</p>
                      )}
                    </div>

                    {/* Mobile Number */}
                    <div>
                      <label
                        htmlFor="enquiry-mobile"
                        className="block text-xs font-medium tracking-wider uppercase text-[#F7F4EE]/75 mb-2"
                      >
                        Mobile Number <span className="text-[#D6B77A]">*</span>
                      </label>
                      <input
                        id="enquiry-mobile"
                        type="tel"
                        required
                        value={form.mobile}
                        onChange={(e) => updateField('mobile', e.target.value)}
                        placeholder="+91 98XXX XXXXX"
                        aria-invalid={Boolean(errors.mobile)}
                        className="w-full min-h-[48px] px-4 py-3 rounded-sm bg-[#07111F] border border-white/15 text-base sm:text-sm text-[#F7F4EE] placeholder:text-[#F7F4EE]/35 focus:outline-none focus:border-[#D6B77A] transition-colors tabular-nums"
                      />
                      {errors.mobile && (
                        <p className="mt-1.5 text-xs text-rose-300">{errors.mobile}</p>
                      )}
                    </div>

                    {/* Pickup Location */}
                    <div>
                      <label
                        htmlFor="enquiry-pickup"
                        className="block text-xs font-medium tracking-wider uppercase text-[#F7F4EE]/75 mb-2"
                      >
                        Pickup Location <span className="text-[#D6B77A]">*</span>
                      </label>
                      <input
                        id="enquiry-pickup"
                        type="text"
                        required
                        value={form.pickupLocation}
                        onChange={(e) => updateField('pickupLocation', e.target.value)}
                        placeholder="e.g. Jagriti Vihar, Meerut"
                        aria-invalid={Boolean(errors.pickupLocation)}
                        className="w-full min-h-[48px] px-4 py-3 rounded-sm bg-[#07111F] border border-white/15 text-base sm:text-sm text-[#F7F4EE] placeholder:text-[#F7F4EE]/35 focus:outline-none focus:border-[#D6B77A] transition-colors"
                      />
                      {errors.pickupLocation && (
                        <p className="mt-1.5 text-xs text-rose-300">{errors.pickupLocation}</p>
                      )}
                    </div>

                    {/* Destination */}
                    <div>
                      <label
                        htmlFor="enquiry-destination"
                        className="block text-xs font-medium tracking-wider uppercase text-[#F7F4EE]/75 mb-2"
                      >
                        Destination <span className="text-[#D6B77A]">*</span>
                      </label>
                      <input
                        id="enquiry-destination"
                        type="text"
                        required
                        value={form.destination}
                        onChange={(e) => updateField('destination', e.target.value)}
                        placeholder="e.g. Mussoorie, Rishikesh, Delhi Airport"
                        aria-invalid={Boolean(errors.destination)}
                        className="w-full min-h-[48px] px-4 py-3 rounded-sm bg-[#07111F] border border-white/15 text-base sm:text-sm text-[#F7F4EE] placeholder:text-[#F7F4EE]/35 focus:outline-none focus:border-[#D6B77A] transition-colors"
                      />
                      {errors.destination && (
                        <p className="mt-1.5 text-xs text-rose-300">{errors.destination}</p>
                      )}
                    </div>

                    {/* Travel Date */}
                    <div>
                      <label
                        htmlFor="enquiry-date"
                        className="block text-xs font-medium tracking-wider uppercase text-[#F7F4EE]/75 mb-2"
                      >
                        Travel Date <span className="text-[#D6B77A]">*</span>
                      </label>
                      <input
                        id="enquiry-date"
                        type="date"
                        required
                        min={todayIso}
                        value={form.travelDate}
                        onChange={(e) => updateField('travelDate', e.target.value)}
                        aria-invalid={Boolean(errors.travelDate)}
                        className="w-full min-h-[48px] px-4 py-3 rounded-sm bg-[#07111F] border border-white/15 text-base sm:text-sm text-[#F7F4EE] focus:outline-none focus:border-[#D6B77A] transition-colors tabular-nums [color-scheme:dark]"
                      />
                      {errors.travelDate && (
                        <p className="mt-1.5 text-xs text-rose-300">{errors.travelDate}</p>
                      )}
                    </div>

                    {/* Return Date (Optional) */}
                    <div>
                      <label
                        htmlFor="enquiry-return-date"
                        className="block text-xs font-medium tracking-wider uppercase text-[#F7F4EE]/75 mb-2"
                      >
                        Return Date <span className="text-[#F7F4EE]/45">(Optional)</span>
                      </label>
                      <input
                        id="enquiry-return-date"
                        type="date"
                        min={form.travelDate || todayIso}
                        value={form.returnDate}
                        onChange={(e) => updateField('returnDate', e.target.value)}
                        aria-invalid={Boolean(errors.returnDate)}
                        className="w-full min-h-[48px] px-4 py-3 rounded-sm bg-[#07111F] border border-white/15 text-base sm:text-sm text-[#F7F4EE] focus:outline-none focus:border-[#D6B77A] transition-colors tabular-nums [color-scheme:dark]"
                      />
                      {errors.returnDate && (
                        <p className="mt-1.5 text-xs text-rose-300">{errors.returnDate}</p>
                      )}
                    </div>

                    {/* Number of Passengers */}
                    <div>
                      <label
                        htmlFor="enquiry-passengers"
                        className="block text-xs font-medium tracking-wider uppercase text-[#F7F4EE]/75 mb-2"
                      >
                        Number of Passengers <span className="text-[#D6B77A]">*</span>
                      </label>
                      <input
                        id="enquiry-passengers"
                        type="number"
                        min={1}
                        max={50}
                        required
                        value={form.passengers}
                        onChange={(e) => updateField('passengers', e.target.value)}
                        aria-invalid={Boolean(errors.passengers)}
                        className="w-full min-h-[48px] px-4 py-3 rounded-sm bg-[#07111F] border border-white/15 text-base sm:text-sm text-[#F7F4EE] focus:outline-none focus:border-[#D6B77A] transition-colors tabular-nums"
                      />
                      {errors.passengers && (
                        <p className="mt-1.5 text-xs text-rose-300">{errors.passengers}</p>
                      )}
                    </div>

                    {/* Vehicle Preference */}
                    <div>
                      <label
                        htmlFor="enquiry-vehicle"
                        className="block text-xs font-medium tracking-wider uppercase text-[#F7F4EE]/75 mb-2"
                      >
                        Vehicle Preference
                      </label>
                      <select
                        id="enquiry-vehicle"
                        value={form.vehiclePreference}
                        onChange={(e) => updateField('vehiclePreference', e.target.value)}
                        className="w-full min-h-[48px] px-4 py-3 rounded-sm bg-[#07111F] border border-white/15 text-base sm:text-sm text-[#F7F4EE] focus:outline-none focus:border-[#D6B77A] transition-colors"
                      >
                        <option value="Sedan">Sedan</option>
                        <option value="SUV">SUV</option>
                        <option value="Premium SUV">Premium SUV</option>
                        <option value="Tempo Traveller">Tempo Traveller</option>
                        <option value="Open to Recommendation">Open to Recommendation</option>
                      </select>
                    </div>
                  </div>

                  {/* Additional Requirements */}
                  <div>
                    <label
                      htmlFor="enquiry-notes"
                      className="block text-xs font-medium tracking-wider uppercase text-[#F7F4EE]/75 mb-2"
                    >
                      Additional Requirements <span className="text-[#F7F4EE]/45">(Optional)</span>
                    </label>
                    <textarea
                      id="enquiry-notes"
                      rows={3}
                      value={form.notes}
                      onChange={(e) => updateField('notes', e.target.value)}
                      placeholder="Preferred pickup time, luggage notes, multi-stop requests, or senior-friendly pacing..."
                      className="w-full px-4 py-3 rounded-sm bg-[#07111F] border border-white/15 text-base sm:text-sm text-[#F7F4EE] placeholder:text-[#F7F4EE]/35 focus:outline-none focus:border-[#D6B77A] transition-colors resize-y"
                    />
                  </div>

                  <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
                    <button
                      type="submit"
                      className="w-full sm:w-auto min-h-[48px] inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-sm bg-[#D6B77A] text-[#07111F] text-xs font-semibold tracking-wider uppercase hover:bg-[#E8D2A3] transition-colors cursor-pointer whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F7F4EE]"
                    >
                      <MessageCircle className="w-4 h-4" aria-hidden="true" />
                      <span>Submit Travel Enquiry</span>
                    </button>
                    <p className="text-xs text-[#F7F4EE]/55 text-center sm:text-left">
                      Opens a prefilled WhatsApp message to {BUSINESS_INFO.phoneDisplay}.
                    </p>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
