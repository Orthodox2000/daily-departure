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
}

export interface VisaService {
  id: string;
  country: string;
  flag: string;
  visaType: string;
  processingTime: string;
  stayPeriod: string;
  validity: string;
  fee: string;
  rawFee: number;
  image: string;
  documents: string[];
  steps: string[];
}

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
    duration: '5 Days / 4 Nights'
  },
  {
    id: 'bali',
    name: 'Bali',
    country: 'Indonesia',
    price: '₹28,500',
    rawPrice: 28500,
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80',
    category: 'Beach',
    tagline: 'Lush terraced hills, sacred temples, and turquoise waves',
    rating: 4.8,
    duration: '6 Days / 5 Nights'
  },
  {
    id: 'maldives',
    name: 'Maldives',
    country: 'Maldives',
    price: '₹42,999',
    rawPrice: 42999,
    image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=800&q=80',
    category: 'Luxury',
    tagline: 'Private overwater villas and pristine coral reefs',
    rating: 5.0,
    duration: '4 Days / 3 Nights'
  },
  {
    id: 'europe',
    name: 'Europe',
    country: 'France & Switzerland',
    price: '₹89,999',
    rawPrice: 89999,
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80',
    category: 'Europe',
    tagline: 'Timeless romantic streets, Swiss Alps, and historic grandeur',
    rating: 4.9,
    duration: '8 Days / 7 Nights'
  },
  {
    id: 'thailand',
    name: 'Phuket & Krabi',
    country: 'Thailand',
    price: '₹22,999',
    rawPrice: 22999,
    image: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&w=800&q=80',
    category: 'Beach',
    tagline: 'Limestone islands, night markets, and vibrant culture',
    rating: 4.7,
    duration: '5 Days / 4 Nights'
  },
  {
    id: 'singapore',
    name: 'Singapore',
    country: 'Singapore',
    price: '₹34,500',
    rawPrice: 34500,
    image: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=800&q=80',
    category: 'Asia',
    tagline: 'Gardens by the Bay, Marina Bay Sands, and Sentosa',
    rating: 4.8,
    duration: '4 Days / 3 Nights'
  },
  {
    id: 'switzerland',
    name: 'Switzerland',
    country: 'Switzerland',
    price: '₹1,05,000',
    rawPrice: 105000,
    image: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=800&q=80',
    category: 'Europe',
    tagline: 'Snow-capped peaks, scenic train rides, and alpine lakes',
    rating: 5.0,
    duration: '7 Days / 6 Nights'
  },
  {
    id: 'japan',
    name: 'Tokyo & Kyoto',
    country: 'Japan',
    price: '₹95,000',
    rawPrice: 95000,
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80',
    category: 'Asia',
    tagline: 'Cherry blossoms, ancient shrines, and neon cityscape',
    rating: 4.9,
    duration: '7 Days / 6 Nights'
  }
];

export const FLIGHT_DEALS: FlightDeal[] = [
  {
    id: 'f1',
    from: 'Mumbai (BOM)',
    fromCode: 'BOM',
    to: 'Dubai (DXB)',
    toCode: 'DXB',
    price: '24,999',
    rawPrice: 24999,
    airline: 'Emirates',
    airlineCode: 'EK-501',
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
    id: 'f2',
    from: 'Mumbai (BOM)',
    fromCode: 'BOM',
    to: 'Singapore (SIN)',
    toCode: 'SIN',
    price: '29,999',
    rawPrice: 29999,
    airline: 'Singapore Airlines',
    airlineCode: 'SQ-421',
    image: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=600&q=80',
    departureDate: '28 May, 2026',
    duration: '5h 15m',
    type: 'Non-stop',
    flightNumber: 'SQ 421',
    departureTime: '11:45 PM',
    arrivalTime: '07:30 AM (+1)',
    baggage: '25 kg Check-in + 7 kg Cabin'
  },
  {
    id: 'f3',
    from: 'Mumbai (BOM)',
    fromCode: 'BOM',
    to: 'Paris (CDG)',
    toCode: 'CDG',
    price: '59,999',
    rawPrice: 59999,
    airline: 'Qatar Airways',
    airlineCode: 'QR-556',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=600&q=80',
    departureDate: '02 Jun, 2026',
    duration: '9h 40m',
    type: '1 Stop',
    flightNumber: 'QR 556',
    departureTime: '04:10 AM',
    arrivalTime: '01:50 PM',
    baggage: '25 kg Check-in + 7 kg Cabin'
  },
  {
    id: 'f4',
    from: 'Mumbai (BOM)',
    fromCode: 'BOM',
    to: 'New York (JFK)',
    toCode: 'JFK',
    price: '69,999',
    rawPrice: 69999,
    airline: 'Turkish Airlines',
    airlineCode: 'TK-721',
    image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=600&q=80',
    departureDate: '10 Jun, 2026',
    duration: '16h 30m',
    type: '1 Stop',
    flightNumber: 'TK 721',
    departureTime: '06:25 AM',
    arrivalTime: '04:55 PM',
    baggage: '2 x 23 kg Check-in + 8 kg Cabin'
  },
  {
    id: 'f5',
    from: 'Delhi (DEL)',
    fromCode: 'DEL',
    to: 'London (LHR)',
    toCode: 'LHR',
    price: '54,500',
    rawPrice: 54500,
    airline: 'British Airways',
    airlineCode: 'BA-142',
    image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=600&q=80',
    departureDate: '15 Jun, 2026',
    duration: '9h 10m',
    type: 'Non-stop',
    flightNumber: 'BA 142',
    departureTime: '03:15 AM',
    arrivalTime: '07:55 AM',
    baggage: '23 kg Check-in + 7 kg Cabin'
  },
  {
    id: 'f6',
    from: 'Bangalore (BLR)',
    fromCode: 'BLR',
    to: 'Bangkok (BKK)',
    toCode: 'BKK',
    price: '18,750',
    rawPrice: 18750,
    airline: 'Thai Airways',
    airlineCode: 'TG-326',
    image: 'https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&w=600&q=80',
    departureDate: '20 Jun, 2026',
    duration: '3h 50m',
    type: 'Non-stop',
    flightNumber: 'TG 326',
    departureTime: '00:30 AM',
    arrivalTime: '05:50 AM',
    baggage: '20 kg Check-in + 7 kg Cabin'
  }
];

export const HOLIDAY_PACKAGES: HolidayPackage[] = [
  {
    id: 'maldives-pkg',
    title: 'Maldives Overwater Dream & Spa Retreat',
    destination: 'Maldives',
    duration: '4 Days / 3 Nights',
    days: 4,
    nights: 3,
    price: '₹54,999',
    rawPrice: 54999,
    originalPrice: '₹68,000',
    rating: 4.9,
    reviewsCount: 142,
    image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80'
    ],
    category: 'Luxury',
    highlights: ['Luxury Water Villa with private deck', 'All Meals & Premium Beverages', 'Complimentary Speedboat Transfers', 'Snorkeling Safari with Marine Biologist'],
    inclusions: ['3 Nights stay in Overwater Villa', 'Daily Breakfast, Lunch & Dinner', 'Return Speedboat Transfers from Male', '1x Romantic Sunset Cruise'],
    exclusions: ['International Flights', 'Travel Insurance', 'Personal Water Sports', 'Spa treatments not specified'],
    itinerary: [
      { day: 1, title: 'Arrival in Paradise', desc: 'Arrive at Male International Airport and board a luxury speedboat transfer to your resort island. Check into your private water villa.' },
      { day: 2, title: 'Coral Reef Snorkeling & Sunset Cruise', desc: 'Enjoy a morning guided snorkeling excursion exploring vibrant coral gardens. In the evening, set sail on a golden sunset dolphin cruise.' },
      { day: 3, title: 'Spa Rejuvenation & Beach Dinner', desc: 'Indulge in a signature aromatherapy massage followed by an exclusive private 4-course dinner by the candlelit beach.' },
      { day: 4, title: 'Farewell Maldives', desc: 'Enjoy breakfast over the ocean before checking out and taking your speedboat transfer back to Male Airport.' }
    ]
  },
  {
    id: 'swiss-pkg',
    title: 'Swiss Alps Panorama & Lake Geneva',
    destination: 'Switzerland',
    duration: '7 Days / 6 Nights',
    days: 7,
    nights: 6,
    price: '₹1,24,999',
    rawPrice: 124999,
    originalPrice: '₹1,45,000',
    rating: 5.0,
    reviewsCount: 98,
    image: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1527668752968-14dc70a27c95?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80'
    ],
    category: 'Europe',
    highlights: ['Jungfraujoch - Top of Europe Mountain Excursion', 'Scenic Glacier Express Panorama Train', 'Lake Lucerne Cruise', 'Zermatt Matterhorn views'],
    inclusions: ['6 Nights in 4-Star Scenic Hotels', 'Daily Buffet Breakfast', 'Swiss Travel Pass (First Class)', 'Jungfraujoch Mountain Excursion Ticket'],
    exclusions: ['Visa Fees', 'International Airfare', 'Lunches & Dinners unless noted', 'City tourist taxes'],
    itinerary: [
      { day: 1, title: 'Arrival in Zurich & Transfer to Lucerne', desc: 'Arrive in Zurich, activate your Swiss Travel Pass, and take the scenic train to Lake Lucerne. Evening walk across the Chapel Bridge.' },
      { day: 2, title: 'Mount Titlis & Ice Flyer', desc: 'Ascend Mount Titlis on the rotating cable car. Walk the cliff bridge and experience perpetual snow and ice.' },
      { day: 3, title: 'Interlaken & Jungfraujoch Excursion', desc: 'Take the cogwheel railway to Europe\'s highest train station, Jungfraujoch, standing at 3,454m.' },
      { day: 4, title: 'Scenic Train to Zermatt', desc: 'Travel to car-free Zermatt. Marvel at the dramatic pyramid shape of the world-famous Matterhorn.' },
      { day: 5, title: 'Glacier Express to St. Moritz', desc: 'Board the world\'s slowest express train passing 291 bridges and 91 tunnels through stunning valleys.' },
      { day: 6, title: 'Geneva Lakeside & Old Town', desc: 'Explore Geneva\'s Jet d\'Eau and historic cobblestone lanes.' },
      { day: 7, title: 'Departure', desc: 'Transfer to Zurich or Geneva Airport for your onward flight.' }
    ]
  },
  {
    id: 'thai-pkg',
    title: 'Exotic Thailand - Bangkok & Phuket Island Tour',
    destination: 'Thailand',
    duration: '6 Days / 5 Nights',
    days: 6,
    nights: 5,
    price: '₹32,999',
    rawPrice: 32999,
    originalPrice: '₹42,000',
    rating: 4.8,
    reviewsCount: 215,
    image: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1528181304800-259b08848526?auto=format&fit=crop&w=800&q=80'
    ],
    category: 'Beach',
    highlights: ['Phi Phi Islands Speedboat Tour with Buffet Lunch', 'Bangkok Grand Palace & Temple City Tour', 'James Bond Island Canoeing', 'Phuket Fantasea Show with Dinner'],
    inclusions: ['3 Nights Phuket + 2 Nights Bangkok 4-Star Resort', 'Daily Breakfast', 'All Intercity & Airport Transfers', 'Phi Phi Island Excursion with snorkeling gear'],
    exclusions: ['National park fees ($15 approx)', 'Personal expenses', 'Gratuities'],
    itinerary: [
      { day: 1, title: 'Welcome to Phuket', desc: 'Land in Phuket, get a warm greeting from our representative, and transfer to your beachfront resort.' },
      { day: 2, title: 'Phi Phi Islands Speedboat Day Tour', desc: 'Cruise across turquoise seas to Maya Bay, Monkey Beach, and Viking Cave. Enjoy a seaside buffet lunch.' },
      { day: 3, title: 'Phuket City & Cultural Highlights', desc: 'Visit the Big Buddha viewpoint, Wat Chalong temple, and colorful Old Phuket Town.' },
      { day: 4, title: 'Flight to Bangkok & Chao Phraya Dinner Cruise', desc: 'Fly to vibrant Bangkok. In the evening, board a luxury dinner cruise on the illuminated Chao Phraya river.' },
      { day: 5, title: 'Bangkok Temples & Shopping', desc: 'Visit Wat Arun (Temple of Dawn), Wat Pho (Reclining Buddha), and shop at world-class malls or Chatuchak market.' },
      { day: 6, title: 'Departure', desc: 'Transfer to Suvarnabhumi Airport with golden memories.' }
    ]
  },
  {
    id: 'dubai-pkg',
    title: 'Dubai Deluxe City & Desert Safari Experience',
    destination: 'Dubai',
    duration: '5 Days / 4 Nights',
    days: 5,
    nights: 4,
    price: '₹38,500',
    rawPrice: 38500,
    originalPrice: '₹48,000',
    rating: 4.9,
    reviewsCount: 310,
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1580674684081-7617fbf3d745?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1546412414-e1885259563a?auto=format&fit=crop&w=800&q=80'
    ],
    category: 'Luxury',
    highlights: ['Burj Khalifa 124th Floor Observation Deck', 'Desert Safari with BBQ Buffet & Fire Dance Show', 'Dubai Marina Yacht Cruise', 'Museum of the Future entry'],
    inclusions: ['4 Nights stay in 4-Star Downtown Hotel', 'Daily Breakfast', 'Desert Safari with 4x4 Dune Bashing', 'Burj Khalifa Non-Prime entry'],
    exclusions: ['Tourism Dirham fee (approx $4/night)', 'Personal shopping', 'Optional helicopter tour'],
    itinerary: [
      { day: 1, title: 'Arrival & Marina Dhow Cruise', desc: 'Transfer to hotel. Evening buffet dinner cruise along the Marina skyline.' },
      { day: 2, title: 'Half Day City Tour & Burj Khalifa', desc: 'Visit Dubai Frame, Palm Jumeirah, and ascend to the 124th floor of Burj Khalifa.' },
      { day: 3, title: 'Premium Desert Safari & Bedouin Camp', desc: 'Exciting dune bashing in 4x4 Land Cruisers, camel ride, henna painting, and belly dancing show with BBQ.' },
      { day: 4, title: 'Museum of the Future & Dubai Mall', desc: 'Explore the futuristic museum exhibits followed by shopping and the Dubai Fountain show.' },
      { day: 5, title: 'Departure', desc: 'Transfer to Dubai International Airport (DXB).' }
    ]
  },
  {
    id: 'bali-pkg',
    title: 'Bali Bliss - Ubud Rainforest & Seminyak Beach',
    destination: 'Bali',
    duration: '6 Days / 5 Nights',
    days: 6,
    nights: 5,
    price: '₹36,999',
    rawPrice: 36999,
    originalPrice: '₹46,500',
    rating: 4.9,
    reviewsCount: 180,
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1555400038-63f5ba517a47?auto=format&fit=crop&w=800&q=80'
    ],
    category: 'Honeymoon',
    highlights: ['Ubud Rice Terraces & Giant Jungle Swing', 'Private Pool Villa in Seminyak', 'Tanah Lot Sunset Temple', 'Mount Batur Sunrise Jeep Tour'],
    inclusions: ['3 Nights Ubud Jungle Resort + 2 Nights Seminyak Villa', 'Daily Floating Breakfast', 'Private AC Car for all tours', 'Balinese Spa Treatment'],
    exclusions: ['Flight tickets', 'Visa on Arrival ($35)', 'Personal tips'],
    itinerary: [
      { day: 1, title: 'Arrival & Ubud Check-in', desc: 'Private transfer to Ubud resort amidst serene greenery.' },
      { day: 2, title: 'Kintamani & Tegallalang Swing', desc: 'Visit volcano viewpoint, coffee plantation, and jungle swing over the rice terraces.' },
      { day: 3, title: 'Uluwatu Sunset & Kecak Fire Dance', desc: 'Visit cliff-top Uluwatu temple and witness the traditional Kecak dance at twilight.' },
      { day: 4, title: 'Transfer to Seminyak & Beach Clubs', desc: 'Check into your private pool villa in Seminyak. Relax at Potato Head or Ku De Ta.' },
      { day: 5, title: 'Tanah Lot Temple & Spa Day', desc: 'Iconic offshore rock temple visit and 90-minute signature Balinese massage.' },
      { day: 6, title: 'Departure', desc: 'Transfer to Denpasar Airport (DPS).' }
    ]
  }
];

export const HOTELS_DATA: Hotel[] = [
  {
    id: 'h1',
    name: 'Burj Al Arab Jumeirah',
    city: 'Dubai',
    country: 'United Arab Emirates',
    stars: 5,
    rating: 4.9,
    reviewsCount: 1420,
    pricePerNight: '₹85,000',
    rawPrice: 85000,
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80'
    ],
    amenities: ['Private Beach', 'Infinity Pool', 'Helipad', 'Butler Service', 'Spa', 'Free WiFi', 'Breakfast Included'],
    roomType: 'Deluxe Marina Suite',
    description: 'The world’s most iconic ultra-luxury sail-shaped hotel offering unparalleled Arabian hospitality and panoramic Gulf views.',
    address: 'Jumeirah Beach Road, Dubai, UAE'
  },
  {
    id: 'h2',
    name: 'Ayana Resort & Spa',
    city: 'Jimbaran',
    country: 'Bali, Indonesia',
    stars: 5,
    rating: 4.8,
    reviewsCount: 950,
    pricePerNight: '₹22,500',
    rawPrice: 22500,
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80'
    ],
    amenities: ['Rock Bar Access', '12 Swimming Pools', 'Ocean Spa', 'Private Beach', 'Fitness Center', 'Free WiFi'],
    roomType: 'Ocean Front Suite',
    description: 'Perched on 90 hectares of cliff-top land above Jimbaran Bay, famous for sunset views at the iconic Rock Bar.',
    address: 'Jl. Karang Mas Sejahtera, Jimbaran, Bali'
  },
  {
    id: 'h3',
    name: 'Soneva Jani Luxury Resort',
    city: 'Noonu Atoll',
    country: 'Maldives',
    stars: 5,
    rating: 5.0,
    reviewsCount: 420,
    pricePerNight: '₹1,20,000',
    rawPrice: 120000,
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80'
    ],
    amenities: ['Water Slide into Lagoon', 'Retractable Roof for Stargazing', 'Overwater Cinema', 'Private Pool', 'Personal Butler'],
    roomType: '1-Bedroom Water Retreat with Slide',
    description: 'Breathtaking overwater sanctuaries nestled in a 5.6-kilometer private lagoon with crystal-clear turquoise waters.',
    address: 'Medhufaru Island, Noonu Atoll, Maldives'
  },
  {
    id: 'h4',
    name: 'Le Meurice Palace Hotel',
    city: 'Paris',
    country: 'France',
    stars: 5,
    rating: 4.9,
    reviewsCount: 880,
    pricePerNight: '₹64,000',
    rawPrice: 64000,
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80'
    ],
    amenities: ['Michelin-Star Dining', 'Tuileries Garden View', 'Valmont Spa', 'Concierge 24/7', 'Free WiFi'],
    roomType: 'Prestige Room with Park View',
    description: 'An 18th-century jewel in the heart of Paris, blending historic opulence with contemporary chic designed by Philippe Starck.',
    address: '228 Rue de Rivoli, 75001 Paris, France'
  }
];

export const VISA_SERVICES: VisaService[] = [
  {
    id: 'uae-visa',
    country: 'Dubai / UAE',
    flag: '🇦🇪',
    visaType: '30 Days Tourist E-Visa',
    processingTime: '24 - 48 Hours',
    stayPeriod: '30 Days',
    validity: '60 Days from issue',
    fee: '₹6,499',
    rawFee: 6499,
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=600&q=80',
    documents: [
      'Original Passport front & back scan (6+ months validity)',
      'Passport size photograph with white background',
      'Return flight ticket confirmation (optional for application)',
      'Hotel booking voucher or host address'
    ],
    steps: ['Submit online application & passport copy', 'Pay visa processing fee securely', 'Visa verification by immigration experts', 'Receive Approved E-Visa on Email / WhatsApp']
  },
  {
    id: 'schengen-visa',
    country: 'Schengen (Europe - France, Swiss, etc.)',
    flag: '🇪🇺',
    visaType: 'Short Stay Tourist Visa (Type C)',
    processingTime: '10 - 15 Working Days',
    stayPeriod: 'Up to 90 Days',
    validity: 'Up to 180 Days / Multi-entry',
    fee: '₹9,800',
    rawFee: 9800,
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=600&q=80',
    documents: [
      'Passport valid for at least 3 months beyond departure',
      '2 Recent Biometric Photographs (35mm x 45mm)',
      'Last 6 months updated bank statement with bank seal & signature',
      'Last 3 years ITR (Income Tax Returns)',
      'Flight itinerary & hotel reservations',
      'Comprehensive Overseas Travel Insurance (€30,000 cover)',
      'Covering letter with detailed day-by-day travel itinerary'
    ],
    steps: ['Document compilation & verification by our visa specialist', 'Appointment slot booking at VFS Global', 'Biometrics & document submission at VFS', 'Passport collection with approved visa']
  },
  {
    id: 'uk-visa',
    country: 'United Kingdom',
    flag: '🇬🇧',
    visaType: 'Standard Visitor Visa (6 Months)',
    processingTime: '15 Working Days',
    stayPeriod: 'Up to 6 Months',
    validity: '6 Months (Multiple Entry)',
    fee: '₹14,500',
    rawFee: 14500,
    image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=600&q=80',
    documents: [
      'Original Passport & previous travel history',
      'Employment proof & salary slips (last 3 months)',
      '6 Months bank statement showing healthy financial balance',
      'Detailed accommodation and day-wise travel plan'
    ],
    steps: ['Online UKVI application completion', 'Fee payment & appointment scheduling', 'Biometrics at VFS Center', 'Visa stamped passport delivery']
  },
  {
    id: 'singapore-visa',
    country: 'Singapore',
    flag: '🇸🇬',
    visaType: 'e-Visa Multiple Entry',
    processingTime: '3 - 4 Working Days',
    stayPeriod: '30 Days per entry',
    validity: 'Up to 2 Years',
    fee: '₹2,750',
    rawFee: 2750,
    image: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=600&q=80',
    documents: [
      'Passport scan with 6 months validity',
      'White background matte photograph (35x45mm)',
      'Confirmed return flight tickets',
      'Singapore Hotel reservation confirmation'
    ],
    steps: ['Upload passport & photo scan', 'Verify application details', 'Official submission via Authorized Singapore Agent', 'Receive official eVisa PDF']
  },
  {
    id: 'thailand-visa',
    country: 'Thailand',
    flag: '🇹🇭',
    visaType: 'Visa On Arrival / Tourist E-Visa',
    processingTime: 'Instant / 3 Days',
    stayPeriod: '30 Days / 60 Days',
    validity: '90 Days',
    fee: '₹3,200',
    rawFee: 3200,
    image: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&w=600&q=80',
    documents: [
      'Passport with 6 months validity',
      'Flight tickets with departure within 30 days',
      'Proof of accommodation in Thailand',
      '10,000 THB per person fund proof'
    ],
    steps: ['Fill Thailand fast-track form', 'Submit online or carry at airport', 'Fast-track immigration clearance assistance']
  },
  {
    id: 'us-visa',
    country: 'United States',
    flag: '🇺🇸',
    visaType: 'B1/B2 Tourist & Business Visa (10 Years)',
    processingTime: 'Based on appointment slot',
    stayPeriod: 'Up to 180 Days per visit',
    validity: '10 Years Multiple Entry',
    fee: '₹18,500',
    rawFee: 18500,
    image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=600&q=80',
    documents: [
      'DS-160 Confirmation barcode page',
      'Valid Passport',
      'US Visa fee receipt',
      'Appointment confirmation letter',
      'Financial documents, property proofs & tax returns'
    ],
    steps: ['DS-160 form preparation and review', 'Early appointment slot tracking and booking', 'Mock interview preparation by US visa coaches', 'Consulate interview and stamping']
  }
];

export const TESTIMONIALS = [
  {
    name: 'Rahul & Priya Sharma',
    city: 'Mumbai, India',
    package: 'Maldives Overwater Retreat',
    rating: 5,
    text: 'Daily Departure planned our honeymoon trip to Maldives down to the finest detail. The water villa, the surprise sunset cruise, and seamless transfers made it the best vacation of our lives!',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
  },
  {
    name: 'Dr. Anand Verma',
    city: 'Pune, India',
    package: 'Switzerland Alpine Tour & Visa',
    rating: 5,
    text: 'Our Schengen visa was approved in just 8 working days thanks to their meticulous document checklist. The Swiss train passes and hotels in Lucerne and Zermatt were outstanding!',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80'
  },
  {
    name: 'Meera Deshmukh',
    city: 'Ahmedabad, India',
    package: 'Dubai Family Package',
    rating: 5,
    text: 'Superb customer support! When our connecting flight got slightly rescheduled, the Daily Departure team proactively updated our private desert safari pickup without any stress.',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80'
  }
];

export const FAQS = [
  {
    q: 'How do I book a holiday package with Daily Departure?',
    a: 'You can explore our holiday packages, click on "Book Now" or "Customize Trip", and submit your travel dates and passenger details. Our travel expert will immediately contact you with customized itinerary options and easy payment gateways.'
  },
  {
    q: 'Do you provide end-to-end Visa assistance?',
    a: 'Yes! We handle visa applications for over 45 countries including Dubai, Schengen (all 29 European countries), UK, USA, Singapore, Thailand, and Japan with complete documentation review, appointment booking, and mock interview guidance.'
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
