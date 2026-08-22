import React, { useState } from 'react';
import { Hotel as HotelIcon, Star, MapPin, Check, Wifi, Coffee, Sparkles, ArrowRight, SlidersHorizontal } from 'lucide-react';
import { HOTELS_DATA, Hotel } from '../data/travelData';

interface HotelsPageProps {
  onSelectHotel: (hotel: Hotel) => void;
  onOpenBookModal: (service?: 'Flights' | 'Hotels' | 'Holidays' | 'Visa') => void;
}

export const HotelsPage: React.FC<HotelsPageProps> = ({ onSelectHotel, onOpenBookModal }) => {
  const [cityFilter, setCityFilter] = useState('All');
  const [starFilter, setStarFilter] = useState<number | 'All'>('All');

  const filteredHotels = HOTELS_DATA.filter(h => {
    if (cityFilter !== 'All' && !h.city.toLowerCase().includes(cityFilter.toLowerCase()) && !h.country.toLowerCase().includes(cityFilter.toLowerCase())) {
      return false;
    }
    if (starFilter !== 'All' && h.stars !== starFilter) {
      return false;
    }
    return true;
  });

  return (
    <main className="min-h-screen bg-[#FAF9F6] pb-20">
      {/* Hero Banner */}
      <div className="relative h-[400px] sm:h-[440px] flex items-center justify-center">
        <img 
          src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1920&q=80" 
          alt="Luxury Resort Stays"
          className="absolute inset-0 w-full h-full object-cover object-center brightness-[0.65]"
        />
        <div className="absolute inset-0 hero-gradient"></div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-6 w-full text-center flex flex-col items-center justify-center">
          <div className="text-white flex flex-col items-center">
            <span className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-sm text-brand-orange px-3 py-1 rounded-sm text-xs font-semibold uppercase tracking-widest mb-4 border border-white/20">
              <HotelIcon size={13} /> Stays & Boutique Resorts
            </span>
            <h1 className="text-4xl sm:text-6xl font-bold serif mb-4 tracking-tight leading-tight text-center">
              Hotels & Stays
            </h1>
            <p className="text-base sm:text-lg text-gray-200 font-light leading-relaxed max-w-2xl mx-auto text-center">
              Handpicked boutique properties with complimentary breakfast, room upgrades, and verified guest satisfaction.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 -mt-16 relative z-30">
        {/* Filter bar */}
        <div className="bg-white p-6 rounded-sm shadow-md border border-[#e5e5e5] mb-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider mr-2 flex items-center gap-1">
                <SlidersHorizontal size={14} /> Destination:
              </span>
              {['All', 'Dubai', 'Bali', 'Maldives', 'Paris'].map((city) => (
                <button
                  key={city}
                  onClick={() => setCityFilter(city)}
                  className={`px-4 py-1.5 rounded-sm text-xs font-semibold transition cursor-pointer ${
                    cityFilter === city
                      ? 'bg-brand-maroon text-white shadow-xs'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {city}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3 w-full md:w-auto">
              <span className="text-xs font-medium text-gray-500 shrink-0">Property Rating:</span>
              <select
                value={starFilter}
                onChange={(e) => setStarFilter(e.target.value === 'All' ? 'All' : Number(e.target.value))}
                className="p-2 border border-[#e5e5e5] rounded-sm text-xs font-semibold text-[#1a2b48] bg-[#FAF9F6] outline-none w-full md:w-auto cursor-pointer"
              >
                <option value="All">All Star Ratings</option>
                <option value="5">5-Star Luxury Stays</option>
                <option value="4">4-Star Premium Hotels</option>
              </select>
            </div>
          </div>
        </div>

        {/* Hotels Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredHotels.map((hotel) => (
            <div
              key={hotel.id}
              id={`hotel-card-${hotel.id}`}
              onClick={() => onSelectHotel(hotel)}
              className="bg-white rounded-sm overflow-hidden shadow-xs hover:shadow-lg border border-[#e5e5e5] transition-all duration-300 flex flex-col sm:flex-row group cursor-pointer"
            >
              <div className="sm:w-2/5 relative h-64 sm:h-auto overflow-hidden shrink-0">
                <img
                  src={hotel.image}
                  alt={hotel.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
                <div className="absolute top-3 left-3 bg-[#1a2b48]/80 backdrop-blur-xs text-amber-300 text-xs px-2.5 py-0.5 rounded-sm flex items-center gap-1 font-semibold">
                  <Star size={12} fill="currentColor" />
                  <span>{hotel.rating}</span>
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center gap-1 text-amber-500 text-xs mb-1">
                    {Array.from({ length: hotel.stars }).map((_, i) => (
                      <Star key={i} size={12} fill="currentColor" />
                    ))}
                    <span className="text-gray-400 font-normal ml-1">({hotel.reviewsCount} reviews)</span>
                  </div>

                  <h3 className="font-bold serif text-xl text-[#1a2b48] group-hover:text-brand-maroon transition-colors">
                    {hotel.name}
                  </h3>

                  <p className="text-xs text-gray-500 flex items-center gap-1 mt-1 font-light">
                    <MapPin size={12} className="text-brand-orange shrink-0" />
                    <span className="line-clamp-1">{hotel.address}</span>
                  </p>

                  <p className="text-xs text-gray-500 line-clamp-2 mt-3 leading-relaxed font-light">
                    {hotel.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {hotel.amenities.slice(0, 3).map((a, i) => (
                      <span key={i} className="text-[10px] bg-gray-100 text-gray-700 px-2 py-0.5 rounded-sm font-medium">
                        {a}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="border-t border-[#e5e5e5] pt-4 flex items-center justify-between">
                  <div>
                    <span className="text-[9px] text-gray-400 uppercase font-semibold block">Nightly Rate From</span>
                    <p className="text-xl font-bold serif text-brand-maroon">{hotel.pricePerNight}</p>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectHotel(hotel);
                    }}
                    className="bg-brand-maroon hover:bg-brand-maroon-dark text-white px-4 py-2 rounded-sm text-xs font-semibold transition flex items-center gap-1 cursor-pointer"
                  >
                    <span>Reserve Room</span>
                    <ArrowRight size={13} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};
export default HotelsPage;
