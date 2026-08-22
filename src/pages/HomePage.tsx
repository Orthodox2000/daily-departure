import React, { useState, useEffect } from 'react';
// Synced with ref/src/pages/HomePage.tsx - updated homepage layout.
import { Calendar, BadgePercent, ShieldCheck, Globe, Headphones, Star, ArrowRight, PlaneTakeoff } from 'lucide-react';
// Unused icon cleaned up: Sparkles (hero badge removed)
// import { Calendar, BadgePercent, ShieldCheck, Globe, Headphones, Star, ArrowRight, PlaneTakeoff, Sparkles } from 'lucide-react';
import { SearchWidget, SearchTab } from '../components/SearchWidget';
import { POPULAR_DESTINATIONS, HOLIDAY_PACKAGES, TESTIMONIALS, Destination, HolidayPackage } from '../data/travelData';

interface HomePageProps {
  onNavigate: (page: string) => void;
  onSelectDestination: (dest: Destination) => void;
  onSelectPackage: (pkg: HolidayPackage) => void;
  onOpenBookModal: (service?: 'Flights' | 'Hotels' | 'Holidays' | 'Visa') => void;
  onSearchSubmitted: (tab: SearchTab, params: Record<string, string>) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  onSelectDestination,
  onSelectPackage,
  onOpenBookModal,
  onSearchSubmitted
}) => {
  // Hero background images taken directly from curated holiday package cards
  const heroBackgrounds = HOLIDAY_PACKAGES.map(pkg => ({
    id: pkg.id,
    title: pkg.title,
    destination: pkg.destination,
    image: pkg.image,
    price: pkg.price
  }));

  const [activeHeroIdx, setActiveHeroIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveHeroIdx((prev) => (prev + 1) % heroBackgrounds.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [heroBackgrounds.length]);

  return (
    <div className="min-h-screen bg-[#FAF9F6]">
      {/* Hero Section - black base with 80%-opacity imagery for text clarity */}
      <section className="relative min-h-[520px] sm:min-h-[580px] flex items-center justify-center text-white pb-24 sm:pb-28 bg-black">
        {/* Background Images with Crossfade & Proper Fit */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {heroBackgrounds.map((bg, idx) => (
            <img 
              key={bg.id}
              src={bg.image} 
              alt={`${bg.destination} holiday`}
              referrerPolicy="no-referrer"
              className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-1000 ease-in-out transform scale-105 ${
                idx === activeHeroIdx ? 'opacity-80' : 'opacity-0'
              }`}
            />
          ))}
          {/* Navy gradient veil for extra text contrast */}
          <div className="absolute inset-0 hero-gradient"></div>
          {/* Previous treatment kept for reference: brightness-[0.6] */}
        </div>

        {/* Hero Background Controls / Destination Tag */}
        <div className="absolute top-6 right-6 sm:top-8 sm:right-10 z-20 flex items-center gap-2">
          <div className="bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-full text-xs text-white/90 border border-white/20 flex items-center gap-2 font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Featured: <strong className="text-amber-300 font-semibold">{heroBackgrounds[activeHeroIdx].destination}</strong> ({heroBackgrounds[activeHeroIdx].price})</span>
          </div>
          <div className="hidden sm:flex items-center gap-1">
            {heroBackgrounds.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveHeroIdx(i)}
                aria-label={`Slide ${i + 1}`}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                  i === activeHeroIdx ? 'bg-brand-orange w-6' : 'bg-white/40 hover:bg-white/70'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Hero Copy - Centered */}
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto pt-10 pb-12 flex flex-col items-center justify-center">
          {/* Badge removed per request - kept for reference:
          <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-md px-4 py-1 rounded-full text-xs font-semibold tracking-wider text-brand-orange uppercase border border-white/20 mb-6 animate-in fade-in duration-500">
            <Sparkles size={13} className="text-brand-orange" />
            <span>Curated Summer 2026 International Departures</span>
          </div>
          */}

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold mb-4 serif leading-[1.15] tracking-tight drop-shadow-md text-center">
            Your Next <br className="hidden sm:inline" />
            <span className="italic font-normal text-amber-100">
              Journey Starts Here
            </span>
          </h1>
          
          <p className="text-base sm:text-xl text-gray-200 max-w-xl mx-auto font-light leading-relaxed mb-8 drop-shadow-sm text-center">
            Flights, Hotels, Holidays & Visa — All in One Place.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              id="hero-cta-explore-holidays"
              onClick={() => onNavigate('Holidays')}
              className="bg-brand-maroon hover:bg-brand-maroon-dark text-white px-8 py-3 rounded-sm font-semibold text-sm sm:text-base flex items-center gap-2.5 shadow-md transition-all cursor-pointer active:scale-95"
            >
              <PlaneTakeoff size={18} />
              <span>Explore Holiday Packages</span>
            </button>
            <button
              id="hero-cta-check-visa"
              onClick={() => onNavigate('Visa')}
              className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white border border-white/40 px-8 py-3 rounded-sm font-semibold text-sm sm:text-base flex items-center gap-2 shadow-sm transition-all cursor-pointer"
            >
              <span>Instant Visa Assistance</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* Overlapping Multi-Tab Search Widget with high z-index */}
      <div className="max-w-5xl mx-auto px-4 -mt-20 sm:-mt-24 relative z-40">
        <SearchWidget onSearch={onSearchSubmitted} />
      </div>

      {/* Popular Destinations Section */}
      <section className="pt-16 sm:pt-20 pb-20 max-w-6xl mx-auto px-6 relative z-10">
        <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-4 mb-10 pb-4 border-b border-[#e5e5e5]">
          <div>
            <span className="text-xs uppercase tracking-widest text-brand-orange font-bold block mb-1">
              Curated Getaways
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold serif text-[#1a2b48] tracking-tight">
              Popular Destinations
            </h2>
          </div>
          <button 
            onClick={() => onNavigate('Holidays')}
            className="text-brand-maroon hover:text-brand-maroon-dark font-bold text-sm italic border-b border-brand-maroon pb-0.5 self-start sm:self-auto flex items-center gap-1 group cursor-pointer"
          >
            <span>View All Destinations</span>
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Destinations Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {POPULAR_DESTINATIONS.slice(0, 4).map((dest) => (
            <div 
              key={dest.id} 
              id={`destination-card-${dest.id}`}
              onClick={() => onSelectDestination(dest)}
              className="relative h-88 rounded-sm overflow-hidden group cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300 border border-[#e5e5e5] bg-white"
            >
              <img 
                src={dest.image} 
                alt={dest.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition duration-700 ease-out" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1a2b48] via-black/40 to-transparent p-6 flex flex-col justify-between text-white">
                <div className="flex justify-between items-center">
                  <span className="bg-white/20 backdrop-blur-md px-2.5 py-0.5 rounded-sm text-[11px] font-semibold text-white border border-white/20 uppercase tracking-wider">
                    {dest.duration}
                  </span>
                  <div className="flex items-center gap-1 bg-amber-400 text-[#1a2b48] font-bold text-xs px-2 py-0.5 rounded-sm">
                    <Star size={11} fill="currentColor" /> {dest.rating}
                  </div>
                </div>

                <div>
                  <span className="text-[10px] text-brand-orange font-bold uppercase tracking-widest block mb-0.5">
                    {dest.country}
                  </span>
                  <h3 className="font-bold serif text-2xl drop-shadow-sm mb-1">{dest.name}</h3>
                  <p className="text-xs text-gray-300 line-clamp-1 mb-3 font-light">{dest.tagline}</p>
                  <div className="flex justify-between items-center pt-2.5 border-t border-white/20">
                    <div>
                      <span className="text-[9px] text-gray-300 uppercase tracking-wider block">Starting From</span>
                      <span className="font-bold text-lg text-white serif">{dest.price}</span>
                    </div>
                    <span className="text-xs font-bold text-brand-orange group-hover:translate-x-1 transition-transform flex items-center gap-1">
                      Explore &rarr;
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Holiday Packages Banner */}
      <section className="py-20 bg-white border-y border-[#e5e5e5]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-4 mb-10 pb-4 border-b border-[#e5e5e5]">
            <div>
              <span className="text-xs uppercase tracking-widest text-brand-orange font-bold block mb-1">
                Handcrafted Itineraries
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold serif text-[#1a2b48] tracking-tight">
                Featured Holiday Packages
              </h2>
            </div>
            <button 
              onClick={() => onNavigate('Holidays')}
              className="text-brand-maroon font-bold text-sm italic border-b border-brand-maroon pb-0.5 cursor-pointer self-start sm:self-auto"
            >
              Browse All 25+ Packages &rarr;
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {HOLIDAY_PACKAGES.slice(0, 3).map((pkg) => (
              <div
                key={pkg.id}
                id={`featured-pkg-${pkg.id}`}
                onClick={() => onSelectPackage(pkg)}
                className="bg-white rounded-sm overflow-hidden shadow-sm hover:shadow-lg border border-[#e5e5e5] transition-all duration-300 flex flex-col cursor-pointer group"
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={pkg.image}
                    alt={pkg.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  <div className="absolute top-4 left-4 bg-brand-maroon text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-sm shadow-sm">
                    {pkg.category}
                  </div>
                  <div className="absolute bottom-3 left-4 bg-black/70 backdrop-blur-xs text-white text-xs px-2.5 py-1 rounded-sm flex items-center gap-1.5 font-medium">
                    <Calendar size={13} className="text-brand-orange" />
                    <span>{pkg.duration}</span>
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-center gap-1.5 text-xs text-amber-600 font-bold mb-2">
                      <Star size={13} fill="currentColor" />
                      <span>{pkg.rating}</span>
                      <span className="text-gray-400 font-normal">({pkg.reviewsCount} reviews)</span>
                    </div>
                    <h3 className="font-bold serif text-xl text-[#1a2b48] group-hover:text-brand-maroon transition-colors line-clamp-1">
                      {pkg.title}
                    </h3>
                    <p className="text-xs text-gray-500 mt-2 line-clamp-2 leading-relaxed">
                      {pkg.highlights.slice(0, 2).join(' • ')}
                    </p>
                  </div>

                  <div className="border-t border-[#e5e5e5] pt-4 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-gray-400 uppercase font-semibold block">All Inclusive From</span>
                      <div className="flex items-baseline gap-2">
                        <span className="text-xl font-bold serif text-brand-maroon">{pkg.price}</span>
                        <span className="text-xs text-gray-400 line-through">{pkg.originalPrice}</span>
                      </div>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectPackage(pkg);
                      }}
                      className="bg-brand-maroon text-white hover:bg-brand-maroon-dark px-4 py-2 rounded-sm text-xs font-semibold transition-all cursor-pointer"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Daily Departure Section */}
      <section className="bg-[#FAF9F6] py-20 px-6 border-b border-[#e5e5e5]">
        <div className="max-w-6xl mx-auto text-center">
          <span className="text-xs uppercase tracking-widest text-brand-orange font-bold block mb-1">
            The Daily Departure Difference
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold serif text-[#1a2b48] mb-3">
            Why Choose Daily Departure?
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto text-sm sm:text-base mb-14 font-light leading-relaxed">
            We simplify modern global journeys with transparent pricing, handpicked luxury stays, and dedicated 24/7 travel specialists.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { 
                icon: BadgePercent, 
                title: "Best Price Guarantee", 
                desc: "Direct contracts with global airlines and resorts guarantee exceptional value with no hidden costs." 
              },
              { 
                icon: ShieldCheck, 
                title: "Trusted Experts", 
                desc: "Certified destination specialists who personally verify every hotel, tour guide, and transfer route." 
              },
              { 
                icon: Globe, 
                title: "Guaranteed Visa Support", 
                desc: "99.2% approval rate with dedicated document auditing, VFS slot assistance, and interview guidance." 
              },
              { 
                icon: Headphones, 
                title: "24/7 Travel Concierge", 
                desc: "Direct WhatsApp and phone assistance throughout your journey from departure to your safe return." 
              }
            ].map((item, i) => (
              <div 
                key={i} 
                className="bg-white p-8 rounded-sm border border-[#e5e5e5] hover:shadow-md transition-all duration-300 flex flex-col items-center text-center group"
              >
                <div className="w-14 h-14 bg-brand-maroon/10 text-brand-maroon rounded-full flex items-center justify-center mb-5 group-hover:bg-brand-maroon group-hover:text-white transition-colors duration-300">
                  <item.icon size={26}/>
                </div>
                <h4 className="font-bold serif text-lg text-[#1a2b48] mb-2">{item.title}</h4>
                <p className="text-xs text-gray-500 leading-relaxed font-normal">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Customer Testimonials Carousel */}
      <section className="py-20 bg-white px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-xl mx-auto mb-14">
            <span className="text-xs uppercase tracking-widest text-brand-orange font-bold block mb-1">Traveler Stories</span>
            <h2 className="text-3xl font-bold serif text-[#1a2b48]">Loved by 25,000+ Happy Travelers</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((t, idx) => (
              <div key={idx} className="bg-[#FAF9F6] p-8 rounded-sm border border-[#e5e5e5] flex flex-col justify-between">
                <div>
                  <div className="flex text-amber-500 gap-1 mb-4">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} size={15} fill="currentColor" />
                    ))}
                  </div>
                  <p className="text-sm text-gray-600 italic font-serif leading-relaxed mb-6">
                    "{t.text}"
                  </p>
                </div>
                <div className="flex items-center gap-3 pt-4 border-t border-[#e5e5e5]">
                  <img src={t.avatar} alt={t.name} referrerPolicy="no-referrer" className="w-11 h-11 rounded-full object-cover border border-brand-maroon" />
                  <div>
                    <h4 className="font-bold text-sm text-[#1a2b48]">{t.name}</h4>
                    <p className="text-[11px] text-gray-400">{t.city} • <span className="text-brand-orange font-medium">{t.package}</span></p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Instant Action CTA Strip */}
      <section className="bg-brand-navy text-white py-16 px-6 border-t border-[#e5e5e5]">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
          <div>
            <span className="text-xs uppercase tracking-widest text-brand-orange font-bold block mb-1">
              Start Planning Today
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold serif mb-2 tracking-tight">
              Ready for your next adventure?
            </h2>
            <p className="text-gray-300 text-sm sm:text-base max-w-xl font-light">
              Get personalized itineraries and immediate booking discounts with our dedicated travel desk.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => onOpenBookModal('Holidays')}
              className="bg-brand-maroon text-white hover:bg-brand-maroon-dark px-8 py-3 rounded-sm font-semibold text-sm shadow-md transition-all cursor-pointer active:scale-95"
            >
              Plan My Vacation
            </button>
            <button
              onClick={() => onNavigate('Contact')}
              className="bg-transparent hover:bg-white/10 text-white border border-white/40 px-6 py-3 rounded-sm font-semibold text-sm transition-colors cursor-pointer"
            >
              Talk to Specialist
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
export default HomePage;
