export interface Destination {
  id: string;
  name: string;
  country: string;
  price: string;
  rawPrice: number;
  image: string;
  category: 'Popular' | 'Beach' | 'Europe' | 'Asia' | 'Luxury';
  tagline: string;
  rating: number;
  duration: string;
  iconType: 'plane' | 'palm' | 'waves' | 'globe';
}

export interface FlightDeal {
  id: string;
  from: string;
  fromCode: string;
  to: string;
  toCode: string;
  price: string;
  rawPrice: number;
  airline: string;
  airlineCode: string;
  image: string;
  departureDate: string;
  returnDate?: string;
  duration: string;
  type: 'Non-stop' | '1 Stop';
  flightNumber: string;
  departureTime: string;
  arrivalTime: string;
  baggage: string;
}

export interface HolidayPackage {
  id: string;
  title: string;
  destination: string;
  country: string;
  duration: string;
  days: number;
  nights: number;
  price: string;
  rawPrice: number;
  originalPrice: string;
  rating: number;
  reviewsCount: number;
  image: string;
  gallery: string[];
  category: 'Beach' | 'Europe' | 'Asia' | 'Luxury' | 'Honeymoon' | 'Adventure';
  highlights: string[];
  inclusions: string[];
  exclusions: string[];
  itinerary: { day: number; title: string; desc: string }[];
}

export interface Hotel {
  id: string;
  name: string;
  location: string;
  city: string;
  country: string;
  stars: number;
  rating: number;
  reviewsCount: number;
  pricePerNight: string;
  rawPrice: number;
  image: string;
  gallery: string[];
  amenities: string[];
  roomType: string;
  description: string;
  address: string;
  propertyType: 'Hotels' | 'Resorts' | 'Apartments' | 'Villas';
}

export interface VisaDestination {
  id: string;
  title: string;
  country: string;
  region: string;
  types: string;
  visaType?: string;
  image: string;
  flag: string;
  processingTime: string;
  stayPeriod: string;
  validity: string;
  fee: string;
  rawFee: number;
  documents: string[];
  steps: string[];
}

export type VisaService = VisaDestination;

export interface Testimonial {
  id: string;
  name: string;
  city?: string;
  package?: string;
  avatar: string;
  rating: number;
  text: string;
}

// Hero Carousel Images with captions and travel highlights
export const HERO_CAROUSEL_SLIDES = [
  {
    id: 'slide-1',
    image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=2000&q=85',
    title: 'Your Next',
    highlight: 'Journey Starts Here',
    subtitle: 'Flights, Hotels, Holidays & Visa – All in One Place.',
    tag: 'Mountain & Alpine Adventures'
  },
  {
    id: 'slide-2',
    image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=2000&q=85',
    title: 'Discover Luxury',
    highlight: 'Island Escapes',
    subtitle: 'Overwater villas, private beaches & crystal clear waters.',
    tag: 'Tropical Maldives & Bali'
  },
  {
    id: 'slide-3',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=2000&q=85',
    title: 'Experience Exotic',
    highlight: 'Global Wonders',
    subtitle: 'Handcrafted holiday packages with VIP local transfers & tours.',
    tag: 'Europe, Asia & Middle East'
  },
  {
    id: 'slide-4',
    image: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=2000&q=85',
    title: 'Unforgettable',
    highlight: 'Swiss Alpine Dreams',
    subtitle: 'Panoramic mountain trains, luxury chalets & fresh glacier air.',
    tag: 'Switzerland & French Alps'
  }
];

export const POPULAR_DESTINATIONS: Destination[] = [
  {
    id: 'dubai',
    name: 'Dubai',
    country: 'United Arab Emirates',
    price: '₹24,999',
    rawPrice: 24999,
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80',
    category: 'Popular',
    tagline: 'Futuristic skylines, desert dunes, and luxury shopping',
    rating: 4.9,
    duration: '4 Nights / 5 Days',
    iconType: 'plane'
  },
  {
    id: 'bali',
    name: 'Bali',
    country: 'Indonesia',
    price: '₹29,999',
    rawPrice: 29999,
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80',
    category: 'Beach',
    tagline: 'Lush terraced hills, sacred temples, and turquoise waves',
    rating: 4.8,
    duration: '4 Nights / 5 Days',
    iconType: 'palm'
  },
  {
    id: 'maldives',
    name: 'Maldives',
    country: 'Maldives',
    price: '₹34,999',
    rawPrice: 34999,
    image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=800&q=80',
    category: 'Luxury',
    tagline: 'Private overwater villas and pristine coral reefs',
    rating: 5.0,
    duration: '4 Nights / 5 Days',
    iconType: 'waves'
  },
  {
    id: 'europe',
    name: 'Europe',
    country: 'France & Switzerland',
    price: '₹59,999',
    rawPrice: 59999,
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80',
    category: 'Europe',
    tagline: 'Timeless romantic streets, Eiffel Tower & alpine peaks',
    rating: 4.9,
    duration: '5 Nights / 6 Days',
    iconType: 'globe'
  }
];

export const HOLIDAY_PACKAGES: HolidayPackage[] = [
  {
    id: 'maldives-escape',
    title: 'Maldives Escape',
    destination: 'Maldives',
    country: 'Maldives',
    duration: '4 Nights / 5 Days',
    days: 5,
    nights: 4,
    price: '₹34,999',
    rawPrice: 34999,
    originalPrice: '₹45,000',
    rating: 4.9,
    reviewsCount: 184,
    image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80'
    ],
    category: 'Luxury',
    highlights: ['Private Overwater Villa Stay', 'Complimentary Speedboat Transfers', 'Daily Breakfast & Dinner', 'Guided Snorkeling Safari'],
    inclusions: ['4 Nights in Lagoon Overwater Villa', 'Daily Breakfast & Dinner', 'Roundtrip Airport Speedboat Transfers', 'Sunset Dolphin Watching Cruise'],
    exclusions: ['International Flights', 'Travel Insurance', 'Personal Water Sports', 'Spa services'],
    itinerary: [
      { day: 1, title: 'Arrival at Male & Speedboat Transfer', desc: 'Arrive at Male Airport and transfer to your luxury private island resort.' },
      { day: 2, title: 'Reef Snorkeling & Water Sports', desc: 'Explore vibrant coral reefs with colorful marine life and enjoy water sports.' },
      { day: 3, title: 'Romantic Sunset Cruise', desc: 'Set sail on a traditional Dhoni for a magical golden sunset dolphin cruise.' },
      { day: 4, title: 'Island Relaxation & Spa', desc: 'Spend a leisurely day by your private deck pool and unwind with an ocean spa therapy.' },
      { day: 5, title: 'Departure', desc: 'Enjoy breakfast over the ocean before checking out and returning to Male Airport.' }
    ]
  },
  {
    id: 'swiss-delight',
    title: 'Swiss Delight',
    destination: 'Switzerland',
    country: 'Switzerland',
    duration: '5 Nights / 6 Days',
    days: 6,
    nights: 5,
    price: '₹69,999',
    rawPrice: 69999,
    originalPrice: '₹85,000',
    rating: 5.0,
    reviewsCount: 142,
    image: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1527668752968-14dc70a27c95?auto=format&fit=crop&w=800&q=80'
    ],
    category: 'Europe',
    highlights: ['Mount Titlis Cable Car Excursion', 'Lucerne Lake Cruise', 'Interlaken & Jungfraujoch Top of Europe', 'Swiss Travel Pass Included'],
    inclusions: ['5 Nights in 4-Star Alpine Hotels', 'Daily Buffet Breakfast', 'Swiss Travel Pass (First Class)', 'Mount Titlis & Ice Flyer Pass'],
    exclusions: ['Visa Processing Fees', 'International Airfare', 'Personal Expenses'],
    itinerary: [
      { day: 1, title: 'Arrival in Zurich & Transfer to Lucerne', desc: 'Arrive in Zurich and take the scenic train to Lake Lucerne.' },
      { day: 2, title: 'Mount Titlis & Perpetual Snow', desc: 'Take the world-first revolving cable car to Mount Titlis summit.' },
      { day: 3, title: 'Interlaken & Jungfrau Glacier', desc: 'Journey to the Top of Europe at 3,454 meters.' },
      { day: 4, title: 'Zermatt & Matterhorn Viewpoint', desc: 'Visit iconic car-free Zermatt facing the Matterhorn.' },
      { day: 5, title: 'Geneva City & Lake Jet d\'Eau', desc: 'Explore historic Geneva and tranquil lakeside gardens.' },
      { day: 6, title: 'Departure from Zurich', desc: 'Transfer to Zurich Airport with memories of the Alps.' }
    ]
  },
  {
    id: 'thailand-getaway',
    title: 'Thailand Getaway',
    destination: 'Thailand',
    country: 'Thailand',
    duration: '4 Nights / 5 Days',
    days: 5,
    nights: 4,
    price: '₹21,999',
    rawPrice: 21999,
    originalPrice: '₹30,000',
    rating: 4.8,
    reviewsCount: 290,
    image: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&w=800&q=80'
    ],
    category: 'Beach',
    highlights: ['Phi Phi Islands Speedboat Day Tour', 'Bangkok Temples & Chao Phraya Dinner Cruise', 'Patong Beachfront Resort', 'Airport Transfers Included'],
    inclusions: ['4 Nights stay in 4-Star Resort', 'Daily Breakfast', 'Phi Phi Islands Tour with Buffet Lunch', 'Bangkok City & Temple Tour'],
    exclusions: ['National park fees ($15)', 'Personal shopping', 'Gratuities'],
    itinerary: [
      { day: 1, title: 'Arrival in Phuket', desc: 'Warm reception and transfer to your beachfront resort in Phuket.' },
      { day: 2, title: 'Phi Phi & Maya Bay Speedboat Excursion', desc: 'Swim in crystal turquoise waters and visit Maya Bay.' },
      { day: 3, title: 'Flight to Bangkok & Evening Cruise', desc: 'Fly to Bangkok and enjoy an illuminated Chao Phraya dinner cruise.' },
      { day: 4, title: 'Grand Palace & Shopping Malls', desc: 'Visit Bangkok\'s iconic temples and world-class shopping centers.' },
      { day: 5, title: 'Departure', desc: 'Transfer to Bangkok International Airport.' }
    ]
  },
  {
    id: 'bali-bliss',
    title: 'Bali Bliss',
    destination: 'Bali, Indonesia',
    country: 'Indonesia',
    duration: '4 Nights / 5 Days',
    days: 5,
    nights: 4,
    price: '₹29,999',
    rawPrice: 29999,
    originalPrice: '₹38,000',
    rating: 4.9,
    reviewsCount: 215,
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80'
    ],
    category: 'Honeymoon',
    highlights: ['Ubud Rice Terraces & Jungle Swing', 'Tanah Lot Sunset Rock Temple', 'Private Pool Villa in Seminyak', 'Traditional Balinese Spa'],
    inclusions: ['4 Nights in Private Pool Villa', 'Daily Floating Breakfast', 'Private AC Car for all tours', 'Balinese Massage Session'],
    exclusions: ['Visa on Arrival', 'International Flights', 'Personal expenses'],
    itinerary: [
      { day: 1, title: 'Arrival in Denpasar & Ubud Transfer', desc: 'Private transfer to your serene jungle villa in Ubud.' },
      { day: 2, title: 'Tegallalang Rice Terrace & Bali Swing', desc: 'Experience the famous jungle swing and coffee plantations.' },
      { day: 3, title: 'Uluwatu Cliff & Kecak Fire Dance', desc: 'Witness the iconic cliffside sunset and fire dance show.' },
      { day: 4, title: 'Tanah Lot Temple & Seminyak Beach', desc: 'Visit the offshore rock temple and unwind at Seminyak beach clubs.' },
      { day: 5, title: 'Departure', desc: 'Transfer to Bali Ngurah Rai Airport (DPS).' }
    ]
  },
  {
    id: 'dubai-explorer',
    title: 'Dubai Explorer',
    destination: 'Dubai, UAE',
    country: 'United Arab Emirates',
    duration: '4 Nights / 5 Days',
    days: 5,
    nights: 4,
    price: '₹24,999',
    rawPrice: 24999,
    originalPrice: '₹35,000',
    rating: 4.9,
    reviewsCount: 320,
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80'
    ],
    category: 'Luxury',
    highlights: ['Burj Khalifa 124th Floor Entry', 'Desert Safari with BBQ Buffet & Dune Bashing', 'Dubai Marina Luxury Yacht Cruise', 'Dubai Frame & City Tour'],
    inclusions: ['4 Nights in 4-Star Downtown Hotel', 'Daily Breakfast', 'Desert Safari 4x4 with Dinner', 'Burj Khalifa Non-Prime Ticket'],
    exclusions: ['Tourism Dirham fee', 'Personal shopping'],
    itinerary: [
      { day: 1, title: 'Arrival & Dubai Marina Dhow Cruise', desc: 'Check in to your hotel and enjoy an evening buffet dinner cruise.' },
      { day: 2, title: 'Dubai City Tour & Burj Khalifa View', desc: 'Visit Palm Jumeirah, Dubai Frame and ascend Burj Khalifa.' },
      { day: 3, title: '4x4 Desert Safari & Bedouin Camp', desc: 'Dune bashing, camel riding, fire show, and Arabic BBQ.' },
      { day: 4, title: 'Museum of the Future & Dubai Mall', desc: 'Explore futuristic architectural marvels and shopping.' },
      { day: 5, title: 'Departure', desc: 'Private transfer to Dubai International Airport (DXB).' }
    ]
  },
  {
    id: 'greece-retreat',
    title: 'Greece Retreat',
    destination: 'Greece',
    country: 'Greece',
    duration: '5 Nights / 6 Days',
    days: 6,
    nights: 5,
    price: '₹59,999',
    rawPrice: 59999,
    originalPrice: '₹75,000',
    rating: 4.9,
    reviewsCount: 165,
    image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=800&q=80'
    ],
    category: 'Europe',
    highlights: ['Santorini Cliffside Hotel with Caldera View', 'Oia Sunset Walk', 'Athens Acropolis Guided Tour', 'High-Speed Ferry Transfers'],
    inclusions: ['3 Nights Santorini + 2 Nights Athens Hotel', 'Daily Greek Breakfast', 'High-Speed Ferry Tickets', 'Athens Acropolis Entry'],
    exclusions: ['Schengen Visa', 'International Flights', 'Tourist tax'],
    itinerary: [
      { day: 1, title: 'Arrival in Athens', desc: 'Arrive in historic Athens and check in to your boutique hotel.' },
      { day: 2, title: 'Acropolis & Parthenon', desc: 'Guided morning tour of the ancient Acropolis and historic Plaka district.' },
      { day: 3, title: 'Ferry to Santorini & Oia', desc: 'Sail across the Aegean Sea to Santorini and watch the sunset at Oia.' },
      { day: 4, title: 'Red Beach & Caldera Cruise', desc: 'Sail the volcanic caldera and swim in therapeutic hot springs.' },
      { day: 5, title: 'Santorini Wine Tasting', desc: 'Taste famous Assyrtiko wines at cliffside vineyards.' },
      { day: 6, title: 'Departure', desc: 'Transfer to Santorini or Athens Airport.' }
    ]
  }
];

export const FLIGHT_DEALS: FlightDeal[] = [
  {
    id: 'f-dubai',
    from: 'Mumbai (BOM)',
    fromCode: 'BOM',
    to: 'Dubai (DXB)',
    toCode: 'DXB',
    price: '24,999',
    rawPrice: 24999,
    airline: 'Emirates',
    airlineCode: 'EK',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=600&q=80',
    departureDate: '25 May, 2026',
    duration: '3h 20m',
    type: 'Non-stop',
    flightNumber: 'EK 501',
    departureTime: '04:30 AM',
    arrivalTime: '06:20 AM',
    baggage: '30 kg Check-in + 7 kg Cabin'
  },
  {
    id: 'f-singapore',
    from: 'Mumbai (BOM)',
    fromCode: 'BOM',
    to: 'Singapore (SIN)',
    toCode: 'SIN',
    price: '29,999',
    rawPrice: 29999,
    airline: 'Singapore Airlines',
    airlineCode: 'SQ',
    image: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=600&q=80',
    departureDate: '28 May, 2026',
    duration: '5h 10m',
    type: 'Non-stop',
    flightNumber: 'SQ 421',
    departureTime: '11:45 PM',
    arrivalTime: '07:30 AM (+1)',
    baggage: '25 kg Check-in + 7 kg Cabin'
  },
  {
    id: 'f-paris',
    from: 'Mumbai (BOM)',
    fromCode: 'BOM',
    to: 'Paris (CDG)',
    toCode: 'CDG',
    price: '59,999',
    rawPrice: 59999,
    airline: 'Qatar Airways',
    airlineCode: 'QR',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=600&q=80',
    departureDate: '30 May, 2026',
    duration: '10h 40m',
    type: '1 Stop',
    flightNumber: 'QR 556',
    departureTime: '04:10 AM',
    arrivalTime: '01:50 PM',
    baggage: '25 kg Check-in + 7 kg Cabin'
  },
  {
    id: 'f-newyork',
    from: 'Mumbai (BOM)',
    fromCode: 'BOM',
    to: 'New York (JFK)',
    toCode: 'JFK',
    price: '69,999',
    rawPrice: 69999,
    airline: 'Turkish Airlines',
    airlineCode: 'TK',
    image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=600&q=80',
    departureDate: '02 Jun, 2026',
    duration: '15h 30m',
    type: '1 Stop',
    flightNumber: 'TK 721',
    departureTime: '06:25 AM',
    arrivalTime: '04:55 PM',
    baggage: '2 x 23 kg Check-in + 8 kg Cabin'
  }
];

export const HOTELS_DATA: Hotel[] = [
  {
    id: 'hotel-ocean-view',
    name: 'Ocean View Resort',
    location: 'Goa, India',
    city: 'Goa',
    country: 'India',
    stars: 5,
    rating: 4.9,
    reviewsCount: 520,
    pricePerNight: '₹5,499',
    rawPrice: 5499,
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80'
    ],
    amenities: ['Free Wi-Fi', 'Breakfast', 'Pool', 'Parking'],
    roomType: 'Deluxe Sea View Suite',
    description: 'Premier seaside luxury featuring infinity pool, private beach access, and gourmet oceanfront restaurants in North Goa.',
    address: 'Calangute Beach Road, North Goa, India',
    propertyType: 'Resorts'
  },
  {
    id: 'hotel-mountain-lodge',
    name: 'The Mountain Lodge',
    location: 'Manali, India',
    city: 'Manali',
    country: 'India',
    stars: 4,
    rating: 4.7,
    reviewsCount: 380,
    pricePerNight: '₹4,299',
    rawPrice: 4299,
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80'
    ],
    amenities: ['Free Wi-Fi', 'Breakfast', 'Parking'],
    roomType: 'Pine View Wooden Chalet',
    description: 'Cozy wooden lodge nestled in the deodar cedar forests of Manali with uninterrupted snow peak views and warm hearths.',
    address: 'Old Manali Hills, Himachal Pradesh, India',
    propertyType: 'Hotels'
  },
  {
    id: 'hotel-city-center',
    name: 'City Center Hotel',
    location: 'Mumbai, India',
    city: 'Mumbai',
    country: 'India',
    stars: 4,
    rating: 4.6,
    reviewsCount: 640,
    pricePerNight: '₹6,199',
    rawPrice: 6199,
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80'
    ],
    amenities: ['Free Wi-Fi', 'Breakfast', 'Gym', 'Parking'],
    roomType: 'Executive Business King Room',
    description: 'Contemporary high-rise hotel located minutes from Mumbai International Airport and business districts with full wellness gym.',
    address: 'Andheri East Business District, Mumbai, India',
    propertyType: 'Hotels'
  },
  {
    id: 'hotel-beachside-retreat',
    name: 'Beachside Retreat',
    location: 'Kerala, India',
    city: 'Kerala',
    country: 'India',
    stars: 5,
    rating: 4.9,
    reviewsCount: 450,
    pricePerNight: '₹7,299',
    rawPrice: 7299,
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80'
    ],
    amenities: ['Free Wi-Fi', 'Breakfast', 'Pool', 'Parking'],
    roomType: 'Heritage Backwater Cottage',
    description: 'Traditional Kerala architecture set amidst serene backwaters and coconut groves with authentic Ayurvedic wellness spa.',
    address: 'Kovalam Beach Road, Thiruvananthapuram, Kerala, India',
    propertyType: 'Resorts'
  }
];

export const VISA_DESTINATIONS: VisaDestination[] = [
  {
    id: 'schengen',
    title: 'Schengen Visa',
    country: 'Europe',
    region: 'Europe',
    types: 'Tourism, Business, Visit',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=600&q=80',
    flag: '🇪🇺',
    processingTime: '10 - 15 Working Days',
    stayPeriod: 'Up to 90 Days',
    validity: 'Up to 180 Days',
    fee: '₹9,800',
    rawFee: 9800,
    documents: ['Passport valid for 3+ months', '2 Biometric Photos', '6 Months Bank Statement', 'Travel Insurance €30,000', 'Confirmed Flight & Hotel'],
    steps: ['Document Review', 'VFS Appointment Slot', 'Biometric Submission', 'Visa Delivery']
  },
  {
    id: 'usa',
    title: 'USA Visa',
    country: 'United States',
    region: 'United States',
    types: 'Tourism, Business, Study',
    image: 'https://images.unsplash.com/photo-1508873696983-2df5703bc20d?auto=format&fit=crop&w=600&q=80',
    flag: '🇺🇸',
    processingTime: 'Based on Slot',
    stayPeriod: 'Up to 180 Days',
    validity: '10 Years Multi-Entry',
    fee: '₹18,500',
    rawFee: 18500,
    documents: ['DS-160 Barcode Form', 'Valid Passport', 'Income Tax Returns (3 Years)', 'Employment & Property Proofs'],
    steps: ['DS-160 Filing', 'Appointment Slot Booking', 'Mock Interview Coaching', 'Consulate Interview']
  },
  {
    id: 'uk',
    title: 'UK Visa',
    country: 'United Kingdom',
    region: 'United Kingdom',
    types: 'Tourism, Business, Study',
    image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=600&q=80',
    flag: '🇬🇧',
    processingTime: '15 Working Days',
    stayPeriod: 'Up to 6 Months',
    validity: '6 Months Multi-Entry',
    fee: '₹14,500',
    rawFee: 14500,
    documents: ['Passport Scan', '6 Months Salary Slips', 'Bank Statement', 'Accommodation Proof & Itinerary'],
    steps: ['Online UKVI Application', 'VFS Biometrics', 'Embassy Verification', 'Passport Stamping']
  },
  {
    id: 'australia',
    title: 'Australia Visa',
    country: 'Australia',
    region: 'Australia',
    types: 'Tourism, Business, Study',
    image: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=600&q=80',
    flag: '🇦🇺',
    processingTime: '15 - 20 Working Days',
    stayPeriod: 'Up to 3 Months',
    validity: '1 Year Multi-Entry',
    fee: '₹12,800',
    rawFee: 12800,
    documents: ['Passport Bio Pages', 'Employment Proof', 'Bank Statements', 'Detailed Travel Itinerary'],
    steps: ['ImmiAccount Filing', 'Biometrics at VFS', 'Document Verification', 'e-Visa Grant']
  },
  {
    id: 'uae',
    title: 'UAE Visa',
    country: 'United Arab Emirates',
    region: 'United Arab Emirates',
    types: 'Tourism, Business, Visit',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=600&q=80',
    flag: '🇦🇪',
    processingTime: '24 - 48 Hours',
    stayPeriod: '30 Days / 60 Days',
    validity: '60 Days',
    fee: '₹6,499',
    rawFee: 6499,
    documents: ['Clear Passport Scan', 'White Background Photo', 'Return Flight Booking (Optional)'],
    steps: ['Online Application Submission', 'Immigration Check', 'Approved E-Visa PDF to Email']
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    name: 'Priya S.',
    city: 'Mumbai, India',
    package: 'Maldives Overwater Retreat',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    text: 'Amazing experience with Daily Departure! Everything was perfectly planned and the support team was fantastic throughout our trip.'
  },
  {
    id: 't2',
    name: 'Rahul Verma',
    city: 'Pune, India',
    package: 'Switzerland Alpine Tour & Visa',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    text: 'Our Swiss holiday was flawless. From scenic train vouchers to 4-star mountain hotels in Lucerne, everything was smooth and hassle-free.'
  },
  {
    id: 't3',
    name: 'Ananya Deshmukh',
    city: 'Ahmedabad, India',
    package: 'Dubai Family Package',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    text: 'Got my Dubai tourist e-visa approved in under 24 hours. The team handled all paperwork and answered all our questions immediately.'
  }
];

export const FAQS = [
  {
    q: 'How do I book a holiday package with Daily Departure?',
    a: 'You can explore our holiday packages, click on "Book Now" or "Send Inquiry", and submit your travel dates and passenger details. Our travel expert will immediately contact you with customized itinerary options and easy payment gateways.'
  },
  {
    q: 'Do you provide end-to-end Visa assistance?',
    a: 'Yes! We handle visa applications for over 45 countries including Dubai, Schengen (all 29 European countries), UK, USA, Australia, and Singapore with complete documentation review, appointment booking, and mock interview guidance.'
  },
  {
    q: 'Can I customize any of the holiday itineraries?',
    a: 'Absolutely. Every package on Daily Departure is 100% customizable. You can adjust the number of days, choose specific hotel categories, add private transfers, or include unique experiences like helicopter rides, hot air balloons, or yacht charters.'
  },
  {
    q: 'What is the cancellation and refund policy?',
    a: 'We offer flexible cancellation policies depending on the airline and hotel terms. Most packages can be rescheduled or refunded up to 15 days prior to travel date with minimal processing charges.'
  },
  {
    q: 'How does 24/7 travel support work during my trip?',
    a: 'Once your booking is confirmed, you are assigned a dedicated 24/7 Travel Concierge available on WhatsApp and phone for immediate assistance with hotel check-ins, local transfers, or flight updates.'
  }
];
