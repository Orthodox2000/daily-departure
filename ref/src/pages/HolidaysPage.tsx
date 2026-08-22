import React, { useState } from 'react';
import { Palmtree, Star, Calendar, Check, ArrowRight, Sparkles, SlidersHorizontal, MapPin, Clock } from 'lucide-react';
import { HOLIDAY_PACKAGES, HolidayPackage } from '../data/travelData';

interface HolidaysPageProps {
  onSelectPackage: (pkg: HolidayPackage) => void;
  onOpenBookModal: (service?: 'Flights' | 'Hotels' | 'Holidays' | 'Visa') => void;
}

export const HolidaysPage: React.FC<HolidaysPageProps> = ({ onSelectPackage, onOpenBookModal }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [budgetFilter, setBudgetFilter] = useState<string>('all');

  const categories = ['All', 'Luxury', 'Beach', 'Europe', 'Honeymoon', 'Asia'];

  const filteredPackages = HOLIDAY_PACKAGES.filter(p => {
    if (selectedCategory !== 'All' && p.category !== selectedCategory) return false;
    if (budgetFilter === 'under-50k' && p.rawPrice > 50000) return false;
    if (budgetFilter === '50k-100k' && (p.rawPrice < 50000 || p.rawPrice > 100000)) return false;
    if (budgetFilter === 'above-100k' && p.rawPrice <= 100000) return false;
    return true;
  });

  return (
    <main className="min-h-screen bg-[#FAF9F6] pb-20">
      {/* Hero Banner */}
      <div className="relative h-[400px] sm:h-[440px] flex items-center justify-center">
        <img 
          src="https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1920&q=80" 
          alt="Curated International Holidays"
          className="absolute inset-0 w-full h-full object-cover object-center brightness-[0.65]"
        />
        <div className="absolute inset-0 hero-gradient"></div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-6 w-full text-center flex flex-col items-center justify-center">
          <div className="text-white flex flex-col items-center">
            <span className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-sm text-brand-orange px-3 py-1 rounded-sm text-xs font-semibold uppercase tracking-widest mb-4 border border-white/20">
              <Palmtree size={13} /> Curated International Holidays
            </span>
            <h1 className="text-4xl sm:text-6xl font-bold serif mb-4 tracking-tight leading-tight text-center">
              Holidays & Tours
            </h1>
            <p className="text-base sm:text-lg text-gray-200 font-light leading-relaxed max-w-2xl mx-auto text-center">
              Handcrafted dream vacations with boutique 4 & 5-star stays, guided excursions, transfers, and complete peace of mind.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 -mt-16 relative z-30">
        {/* Category Filter & Budget Controls */}
        <div className="bg-white p-6 rounded-sm shadow-md border border-[#e5e5e5] mb-12">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider mr-2 flex items-center gap-1">
                <SlidersHorizontal size={14} /> Theme:
              </span>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-1.5 rounded-sm text-xs font-semibold transition cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-brand-maroon text-white shadow-xs'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3 w-full md:w-auto">
              <span className="text-xs font-medium text-gray-500 shrink-0">Budget Filter:</span>
              <select
                value={budgetFilter}
                onChange={(e) => setBudgetFilter(e.target.value)}
                className="p-2 border border-[#e5e5e5] rounded-sm text-xs font-semibold text-[#1a2b48] bg-[#FAF9F6] outline-none w-full md:w-auto cursor-pointer"
              >
                <option value="all">All Price Ranges</option>
                <option value="under-50k">Under ₹50,000</option>
                <option value="50k-100k">₹50,000 - ₹1,00,000</option>
                <option value="above-100k">Above ₹1,00,000 (Luxury)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPackages.map((pkg) => (
            <div
              key={pkg.id}
              id={`holiday-card-${pkg.id}`}
              onClick={() => onSelectPackage(pkg)}
              className="bg-white rounded-sm overflow-hidden shadow-xs hover:shadow-lg border border-[#e5e5e5] transition-all duration-300 flex flex-col justify-between group cursor-pointer"
            >
              <div>
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={pkg.image}
                    alt={pkg.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-700 ease-out"
                  />
                  <div className="absolute top-4 left-4 bg-brand-maroon text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-sm shadow-xs">
                    {pkg.category}
                  </div>
                  <div className="absolute bottom-3 left-4 bg-[#1a2b48]/85 backdrop-blur-xs text-white text-xs px-2.5 py-1 rounded-sm flex items-center gap-1.5 font-medium">
                    <Clock size={12} className="text-brand-orange" />
                    <span>{pkg.duration}</span>
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <span className="text-[10px] font-bold text-brand-orange uppercase tracking-widest flex items-center gap-1">
                        <MapPin size={11} /> {pkg.destination}
                      </span>
                      <div className="flex items-center gap-1 text-amber-600 text-xs font-semibold">
                        <Star size={12} fill="currentColor" /> {pkg.rating} ({pkg.reviewsCount})
                      </div>
                    </div>
                    
                    <h3 className="font-bold serif text-xl text-[#1a2b48] group-hover:text-brand-maroon transition-colors line-clamp-2 leading-snug">
                      {pkg.title}
                    </h3>
                  </div>

                  {/* Highlights list */}
                  <div className="space-y-1.5 pt-2 border-t border-[#e5e5e5]">
                    {pkg.highlights.slice(0, 3).map((h, i) => (
                      <p key={i} className="text-xs text-gray-500 flex items-center gap-2 font-light">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-maroon shrink-0"></span>
                        <span className="line-clamp-1">{h}</span>
                      </p>
                    ))}
                  </div>
                </div>
              </div>

              {/* Price & CTA */}
              <div className="px-6 pb-6 pt-4 border-t border-[#e5e5e5] bg-[#FAF9F6] flex items-center justify-between">
                <div>
                  <span className="text-[9px] text-gray-400 font-semibold uppercase block">Starting Per Person</span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold serif text-brand-maroon">{pkg.price}</span>
                    <span className="text-xs text-gray-400 line-through">{pkg.originalPrice}</span>
                  </div>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectPackage(pkg);
                  }}
                  className="bg-brand-maroon hover:bg-brand-maroon-dark text-white px-4 py-2 rounded-sm text-xs font-semibold shadow-xs transition flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Explore Plan</span>
                  <ArrowRight size={13} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Custom Itinerary Builder Banner */}
        <div className="mt-16 bg-[#1a2b48] text-white rounded-sm p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-8 border border-[#e5e5e5]">
          <div className="max-w-xl">
            <span className="text-xs font-semibold uppercase tracking-widest text-brand-orange block mb-2">
              Need Something Unique?
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold serif mb-3">
              Design Your 100% Customized Holiday Itinerary
            </h3>
            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-light">
              Tell us where you want to go, your travel dates, preferred hotel chains, and budget. Our senior destination experts will create a bespoke day-by-day plan with free quotes.
            </p>
          </div>
          <button
            onClick={() => onOpenBookModal('Holidays')}
            className="bg-brand-maroon hover:bg-brand-maroon-dark text-white px-7 py-3 rounded-sm font-semibold text-xs sm:text-sm shadow-md transition-all cursor-pointer whitespace-nowrap"
          >
            Customize My Trip &rarr;
          </button>
        </div>
      </div>
    </main>
  );
};
export default HolidaysPage;
