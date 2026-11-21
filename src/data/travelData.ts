export const BUSINESS_INFO = {
  name: 'Nishchay Tours & Travels',
  shortName: 'NISHCHAY TOURS & TRAVELS',
  locationShort: 'Jagriti Vihar, Meerut',
  fullAddress: 'Jagriti Vihar, Meerut, Uttar Pradesh, India',
  phoneDisplay: '+91 74669 98858',
  phoneTel: 'tel:+917466998858',
  whatsappNumber: '917466998858',
  whatsappBaseUrl: 'https://wa.me/917466998858',
  googleMapsUrl:
    'https://www.google.com/maps/search/?api=1&query=Nishchay+Tours+%26+Travels+Jagriti+Vihar+Meerut',
  googleMapsEmbedUrl:
    'https://maps.google.com/maps?q=Jagriti%20Vihar,%20Meerut,%20Uttar%20Pradesh,%20India&t=&z=14&ie=UTF8&iwloc=&output=embed',
  referencedRating: '4.9',
  referencedReviewCount: '33',
} as const;

export function buildWhatsAppUrl(message: string): string {
  return `${BUSINESS_INFO.whatsappBaseUrl}?text=${encodeURIComponent(message)}`;
}

export interface ServiceItem {
  id: string;
  index: string;
  title: string;
  subtitle: string;
  description: string;
  iconName:
    | 'MapPin'
    | 'Navigation'
    | 'ArrowRight'
    | 'Repeat'
    | 'Users'
    | 'Plane'
    | 'Compass'
    | 'Sparkles';
  enquiryMessage: string;
}

export const SERVICES: ServiceItem[] = [
  {
    id: 'local-taxi',
    index: '01.',
    title: 'Local Taxi Services',
    subtitle: 'Meerut City & NCR Mobility',
    description:
      'Prompt city pickups across Meerut for business meetings, family errands, hospital visits, and day-long local travel.',
    iconName: 'MapPin',
    enquiryMessage:
      'Hello Nishchay Tours & Travels, I would like to enquire about Local Taxi Services in Meerut.',
  },
  {
    id: 'outstation-taxi',
    index: '02.',
    title: 'Outstation Taxi',
    subtitle: 'Intercity & Hill Station Routes',
    description:
      'Comfortable chauffeur-driven outstation journeys from Meerut across Uttarakhand, Uttar Pradesh, Delhi NCR, and Rajasthan.',
    iconName: 'Navigation',
    enquiryMessage:
      'Hello Nishchay Tours & Travels, I would like to enquire about an Outstation Taxi from Meerut.',
  },
  {
    id: 'one-way-travel',
    index: '03.',
    title: 'One-Way Travel',
    subtitle: 'Direct Point-to-Point Drops',
    description:
      'Convenient single-leg intercity transfers tailored to your departure time without unnecessary return-trip complexity.',
    iconName: 'ArrowRight',
    enquiryMessage:
      'Hello Nishchay Tours & Travels, I would like to enquire about One-Way Travel.',
  },
  {
    id: 'round-trip-travel',
    index: '04.',
    title: 'Round-Trip Travel',
    subtitle: 'Multi-Day Return Itineraries',
    description:
      'Dedicated vehicles and flexible wait schedules for same-day or multi-day return journeys with complete peace of mind.',
    iconName: 'Repeat',
    enquiryMessage:
      'Hello Nishchay Tours & Travels, I would like to enquire about Round-Trip Travel.',
  },
  {
    id: 'family-trips',
    index: '05.',
    title: 'Family Trips',
    subtitle: 'Spacious & Thoughtful Pacing',
    description:
      'Unhurried family vacations and pilgrimage tours planned around comfort for elders, children, and shared luggage.',
    iconName: 'Users',
    enquiryMessage:
      'Hello Nishchay Tours & Travels, I would like to enquire about planning a Family Trip.',
  },
  {
    id: 'airport-transfers',
    index: '06.',
    title: 'Airport Transfers',
    subtitle: 'Delhi IGI & Regional Terminals',
    description:
      'Timely door-to-terminal pickups and arrivals coordinated around your flight schedule for stress-free departures.',
    iconName: 'Plane',
    enquiryMessage:
      'Hello Nishchay Tours & Travels, I would like to enquire about an Airport Transfer.',
  },
  {
    id: 'weekend-getaways',
    index: '07.',
    title: 'Weekend Getaways',
    subtitle: 'Short Escapes From Meerut',
    description:
      'Refreshing two- to three-day drives into the foothills, river towns, and heritage cities within easy reach of Meerut.',
    iconName: 'Compass',
    enquiryMessage:
      'Hello Nishchay Tours & Travels, I would like to enquire about Weekend Getaway travel options.',
  },
  {
    id: 'customized-packages',
    index: '08.',
    title: 'Customized Tour Packages',
    subtitle: 'Tailored Route Planning',
    description:
      'Bespoke multi-stop routes shaped around your preferred pace, travel dates, group size, and vehicle preference.',
    iconName: 'Sparkles',
    enquiryMessage:
      'Hello Nishchay Tours & Travels, I would like to enquire about a Customized Tour Package.',
  },
];

export type PackageCategory = 'All' | 'Himalayan Hills' | 'Spiritual Trails' | 'Heritage & Wildlife';

export interface TourPackage {
  id: string;
  destination: string;
  region: string;
  category: Exclude<PackageCategory, 'All'>;
  tagline: string;
  description: string;
  image: string;
  imageAlt: string;
}

export const TOUR_PACKAGES: TourPackage[] = [
  {
    id: 'mussoorie',
    destination: 'Mussoorie',
    region: 'Uttarakhand Foothills',
    category: 'Himalayan Hills',
    tagline: 'Queen of the Hills',
    description:
      'Misty cedar ridges, colonial promenades, and sweeping views over the Doon Valley designed for unhurried mountain escapes.',
    image: '/src/assets/images/dest_mussoorie_ridge_1795253420367.jpg',
    imageAlt: 'Misty Himalayan cedar forest ridge overlooking Mussoorie valley at golden hour',
  },
  {
    id: 'dehradun',
    destination: 'Dehradun',
    region: 'Doon Valley',
    category: 'Himalayan Hills',
    tagline: 'Gateway to Garhwal',
    description:
      'A serene valley city framed by the Shivalik hills, ideal for scenic family visits, campus travel, and hillside retreats.',
    image: '/src/assets/images/about_editorial_journey_1795253404090.jpg',
    imageAlt: 'Scenic mountain road winding through pine hills above the valley at sunrise',
  },
  {
    id: 'rishikesh',
    destination: 'Rishikesh',
    region: 'Ganga Foothills',
    category: 'Spiritual Trails',
    tagline: 'Riverfront Serenity',
    description:
      'Emerald riverbanks, iconic suspension bridges, and tranquil evening prayers nestled where the Ganga meets the Himalayas.',
    image: '/src/assets/images/dest_ganga_spiritual_1795253404633.jpg',
    imageAlt: 'Evening twilight over the emerald Ganga river and illuminated bridge in Rishikesh',
  },
  {
    id: 'haridwar',
    destination: 'Haridwar',
    region: 'Sacred Ghats',
    category: 'Spiritual Trails',
    tagline: 'Timeless Devotion',
    description:
      'Comfortable family and elder-friendly journeys to Har Ki Pauri and revered shrines along the sacred banks of the Ganga.',
    image: '/src/assets/images/dest_ganga_spiritual_1795253404633.jpg',
    imageAlt: 'Serene Ganga riverfront and glowing evening lamps along Himalayan foothills',
  },
  {
    id: 'nainital',
    destination: 'Nainital',
    region: 'Kumaon Lakes',
    category: 'Himalayan Hills',
    tagline: 'Emerald Lake Basin',
    description:
      'Pine-fringed hillsides surrounding Naini Lake, offering crisp mountain air and relaxed lakeside itineraries.',
    image: '/src/assets/images/dest_himalayan_hills_1795253403793.jpg',
    imageAlt: 'Golden sunset over an emerald Himalayan hill station lake surrounded by forested slopes',
  },
  {
    id: 'jim-corbett',
    destination: 'Jim Corbett',
    region: 'Terai Wilderness',
    category: 'Heritage & Wildlife',
    tagline: 'Sal Forest Sanctuary',
    description:
      'Dawn drives through towering sal forests and quiet riverside landscapes in India’s iconic Himalayan foothill wilderness.',
    image: '/src/assets/images/dest_wildlife_forest_1795253403614.jpg',
    imageAlt: 'Golden sunrise light filtering through tall sal forest trail near Jim Corbett',
  },
  {
    id: 'agra',
    destination: 'Agra',
    region: 'Yamuna Heritage Corridor',
    category: 'Heritage & Wildlife',
    tagline: 'Architectural Marvels',
    description:
      'Smooth highway touring to Agra’s timeless marble and sandstone monuments, suited for day returns or overnight cultural trips.',
    image: '/src/assets/images/dest_agra_monument_1795253420397.jpg',
    imageAlt: 'Sunrise view through sandstone archway framing white marble dome and reflecting pool in Agra',
  },
  {
    id: 'jaipur',
    destination: 'Jaipur',
    region: 'Rajasthan',
    category: 'Heritage & Wildlife',
    tagline: 'The Pink City',
    description:
      'Regal courtyards, hilltop forts, and vibrant bazaars explored with private chauffeur comfort from Meerut.',
    image: '/src/assets/images/dest_heritage_palace_1795253403678.jpg',
    imageAlt: 'Carved sandstone palace archways and sunlit courtyard reflecting pool in Jaipur',
  },
];

export interface FleetCategory {
  id: string;
  name: string;
  categoryLabel: string;
  idealFor: string;
  description: string;
  availabilityNote: string;
  image: string;
  imageAlt: string;
}

export const FLEET_CATEGORIES: FleetCategory[] = [
  {
    id: 'sedan',
    name: 'Sedan',
    categoryLabel: 'Executive City & Intercity',
    idealFor: 'Solo Travellers · Couples · Airport Transfers',
    description:
      'Refined everyday comfort for smooth city transfers, airport runs, and efficient outstation journeys for smaller groups.',
    availabilityNote: 'Exact seating, luggage fit & tariff confirmed on enquiry',
    image: '/src/assets/images/fleet_touring_sedan_1795253403559.jpg',
    imageAlt: 'Representative modern white executive touring sedan parked on a stone overlook',
  },
  {
    id: 'suv',
    name: 'SUV',
    categoryLabel: 'Versatile Family Cruiser',
    idealFor: 'Families · Hill Station Drives · Multi-Day Tours',
    description:
      'Balanced cabin space and poised ride comfort tailored for family outings, highway stretches, and winding hill climbs.',
    availabilityNote: 'Exact seating, luggage fit & tariff confirmed on enquiry',
    image: '/src/assets/images/fleet_premium_mpv_1795253420928.jpg',
    imageAlt: 'Representative sleek dark touring family SUV parked along a stone driveway at twilight',
  },
  {
    id: 'premium-suv',
    name: 'Premium SUV',
    categoryLabel: 'Signature Chauffeur Comfort',
    idealFor: 'Executive Travel · Luxury Retreats · Long Routes',
    description:
      'Elevated cabin quietness and commanding road presence for distinguished business travel and extended family holidays.',
    availabilityNote: 'Exact seating, luggage fit & tariff confirmed on enquiry',
    image: '/src/assets/images/fleet_executive_suv_1795253403735.jpg',
    imageAlt: 'Representative luxury executive SUV parked beneath a warmly lit hotel portico',
  },
  {
    id: 'tempo-traveller',
    name: 'Tempo Traveller',
    categoryLabel: 'Group & Pilgrimage Coach',
    idealFor: 'Extended Families · Group Tours · Events',
    description:
      'Cohesive group travel where everyone rides together comfortably on outstation circuits, weddings, and family pilgrimages.',
    availabilityNote: 'Exact seating, luggage fit & tariff confirmed on enquiry',
    image: '/src/assets/images/fleet_tempo_traveller_1795253426222.jpg',
    imageAlt: 'Representative modern pearl-white high-roof group touring van at a mountain viewpoint',
  },
];

export interface FeaturePillar {
  index: string;
  title: string;
  description: string;
}

export const WHY_CHOOSE_PILLARS: FeaturePillar[] = [
  {
    index: '01.',
    title: 'Customer-Focused Travel Experience',
    description:
      'Every itinerary begins with listening—matching route timing, stopovers, and vehicle style to the people travelling.',
  },
  {
    index: '02.',
    title: 'Comfortable Journeys',
    description:
      'Thoughtful pacing and well-kept touring vehicles designed so the drive feels as restorative as the destination itself.',
  },
  {
    index: '03.',
    title: 'Convenient Booking',
    description:
      'Direct coordination by phone or WhatsApp without complex portals, long hold queues, or impersonal call centers.',
  },
  {
    index: '04.',
    title: 'Personalized Travel Enquiries',
    description:
      'Share your pickup point in Meerut, dates, and passenger preferences to receive options shaped around your exact trip.',
  },
  {
    index: '05.',
    title: 'Transparent Communication',
    description:
      'Clear discussion of vehicle availability, routing, and terms directly with our team before you confirm any journey.',
  },
];

export type GalleryCategory =
  | 'All'
  | 'Mountain Roads'
  | 'Destinations'
  | 'Landscapes'
  | 'Vehicles';

export interface GalleryItem {
  id: string;
  title: string;
  caption: string;
  category: Exclude<GalleryCategory, 'All'>;
  image: string;
  alt: string;
  featured?: boolean;
}

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'gal-1',
    title: 'Golden Hour Mountain Ascent',
    caption: 'Scenic Himalayan highway approaches into Uttarakhand foothills',
    category: 'Mountain Roads',
    image: '/src/assets/images/hero_mountain_suv_1795253403401.jpg',
    alt: 'Representative luxury SUV travelling along a winding Himalayan mountain highway at sunset',
    featured: true,
  },
  {
    id: 'gal-2',
    title: 'Sunrise Over the Pines',
    caption: 'Early morning overlooks along curated hill-station routes',
    category: 'Landscapes',
    image: '/src/assets/images/about_editorial_journey_1795253404090.jpg',
    alt: 'Sunrise mist over pine-covered mountain ridges and curved hill road',
  },
  {
    id: 'gal-3',
    title: 'Twilight on the Ganga',
    caption: 'Evening serenity along the sacred riverfront in Rishikesh',
    category: 'Destinations',
    image: '/src/assets/images/dest_ganga_spiritual_1795253404633.jpg',
    alt: 'Illuminated bridge and calm emerald waters of the Ganga at dusk',
  },
  {
    id: 'gal-4',
    title: 'Heritage Stone Courtyards',
    caption: 'Architectural grandeur across Rajasthan’s royal cities',
    category: 'Destinations',
    image: '/src/assets/images/dest_heritage_palace_1795253403678.jpg',
    alt: 'Sandstone palace arches reflected in a quiet courtyard pool',
  },
  {
    id: 'gal-5',
    title: 'Dawn in the Sal Forest',
    caption: 'Misty woodland trails near the Jim Corbett foothills',
    category: 'Landscapes',
    image: '/src/assets/images/dest_wildlife_forest_1795253403614.jpg',
    alt: 'Sunbeams breaking through tall sal trees along a forest road',
  },
  {
    id: 'gal-6',
    title: 'Executive Evening Arrivals',
    caption: 'Representative chauffeur-driven SUV touring aesthetic',
    category: 'Vehicles',
    image: '/src/assets/images/fleet_executive_suv_1795253403735.jpg',
    alt: 'Representative executive SUV parked at a warm limestone portico',
  },
  {
    id: 'gal-7',
    title: 'Agra Morning Reflections',
    caption: 'Soft dawn light over classic Mughal marble architecture',
    category: 'Destinations',
    image: '/src/assets/images/dest_agra_monument_1795253420397.jpg',
    alt: 'White marble dome and reflecting pool seen through a sandstone arch at dawn',
  },
  {
    id: 'gal-8',
    title: 'Group Mountain Expeditions',
    caption: 'Representative spacious touring coach for extended family trips',
    category: 'Vehicles',
    image: '/src/assets/images/fleet_tempo_traveller_1795253426222.jpg',
    alt: 'Representative high-roof touring van overlooking mountain valleys',
  },
];
