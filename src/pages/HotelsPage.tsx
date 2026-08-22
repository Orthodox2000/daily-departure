import React, { useState } from 'react';
import { 
  Star, MapPin, Wifi, Coffee, Waves, Car, 
  Dumbbell, ArrowRight, Calendar, Users, ChevronLeft, ChevronRight
} from 'lucide-react';
// Unused icons cleaned up: Hotel as HotelIcon, SlidersHorizontal, ChevronDown
// import { 
//   Hotel as HotelIcon, Star, MapPin, Wifi, Coffee, Waves, Car, 
//   Dumbbell, ArrowRight, Calendar, Users, SlidersHorizontal, ChevronDown, ChevronLeft, ChevronRight
// } from 'lucide-react';
import { HOTELS_DATA, Hotel } from '../data/travelData';

interface HotelsPageProps {
  onSelectHotel: (hotel: Hotel) => void;
  onOpenBookModal: (service?: 'Flights' | 'Hotels' | 'Holidays' | 'Visa') => void;
}

export const HotelsPage: React.FC<HotelsPageProps> = ({ onSelectHotel, onOpenBookModal }) => {
  // Search state
  const [destination, setDestination] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState('2 Guests, 1 Room');
  const [sortBy, setSortBy] = useState('Recommended');

  // Filters state
  const [maxPrice, setMaxPrice] = useState(10000);
  const [selectedStars, setSelectedStars] = useState<number[]>([5, 4, 3]);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [propertyType, setPropertyType] = useState('All Types');
  const [currentPage, setCurrentPage] = useState(1);

  const toggleStar = (star: number) => {
    setSelectedStars(prev => 
      prev.includes(star) ? prev.filter(s => s !== star) : [...prev, star]
    );
  };

  const toggleAmenity = (amenity: string) => {
    setSelectedAmenities(prev => 
      prev.includes(amenity) ? prev.filter(a => a !== amenity) : [...prev, amenity]
    );
  };

  const handleClearFilters = () => {
    setMaxPrice(10000);
    setSelectedStars([5, 4, 3, 2, 1]);
    setSelectedAmenities([]);
    setPropertyType('All Types');
    setDestination('');
  };

  const filteredHotels = HOTELS_DATA.filter(h => {
    if (destination && !h.city.toLowerCase().includes(destination.toLowerCase()) && !h.name.toLowerCase().includes(destination.toLowerCase()) && !h.country.toLowerCase().includes(destination.toLowerCase())) {
      return false;
    }
    if (h.rawPrice > maxPrice) return false;
    if (selectedStars.length > 0 && !selectedStars.includes(h.stars)) return false;
    if (propertyType !== 'All Types' && h.propertyType !== propertyType) return false;
    if (selectedAmenities.length > 0) {
      const hasAll = selectedAmenities.every(a => h.amenities.some(item => item.toLowerCase().includes(a.toLowerCase())));
      if (!hasAll) return false;
    }
    return true;
  });

  return (
    <main className="min-h-screen bg-white pb-16">
      {/* 1. BREADCRUMB & HEADER MATCHING SCREENSHOT */}
      <section className="max-w-6xl mx-auto px-6 pt-6">
        <div className="text-xs text-gray-500 mb-4">
          <span className="hover:text-gray-800 cursor-pointer">Home</span> &gt; <span className="text-gray-800 font-medium">Hotels</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center pb-8">
          <div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold serif text-[#1a2b48] leading-tight mb-3">
              Find Your <br />
              <span className="text-[#1a2b48]">Perfect Stay</span>
            </h1>
            <p className="text-sm text-gray-500 font-light max-w-md leading-relaxed">
              Comfortable stays, great locations and best prices.
            </p>
          </div>

          <div className="h-52 sm:h-64 rounded-xl overflow-hidden shadow-xs">
            <img
              src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80"
              alt="Luxury hotel bedroom"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* 2. SEARCH BAR MATCHING SCREENSHOT */}
      <section className="max-w-6xl mx-auto px-6 mb-10">
        <div className="bg-white border border-gray-200/80 rounded-xl p-4 sm:p-5 shadow-sm">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 items-center">
            {/* Destination */}
            <div className="border border-gray-200 rounded-lg p-2.5 bg-gray-50/50">
              <span className="text-[10px] font-semibold text-gray-400 uppercase block">Destination</span>
              <div className="flex items-center gap-1.5 mt-0.5">
                <MapPin size={14} className="text-gray-400 shrink-0" />
                <input
                  type="text"
                  placeholder="Where do you want to go?"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="w-full text-xs font-semibold text-gray-800 outline-none bg-transparent"
                />
              </div>
            </div>

            {/* Check-in */}
            <div className="border border-gray-200 rounded-lg p-2.5 bg-gray-50/50">
              <span className="text-[10px] font-semibold text-gray-400 uppercase block">Check-in</span>
              <div className="flex items-center gap-1.5 mt-0.5">
                <Calendar size={14} className="text-gray-400 shrink-0" />
                <input
                  type="date"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  className="w-full text-xs font-semibold text-gray-800 outline-none bg-transparent"
                />
              </div>
            </div>

            {/* Check-out */}
            <div className="border border-gray-200 rounded-lg p-2.5 bg-gray-50/50">
              <span className="text-[10px] font-semibold text-gray-400 uppercase block">Check-out</span>
              <div className="flex items-center gap-1.5 mt-0.5">
                <Calendar size={14} className="text-gray-400 shrink-0" />
                <input
                  type="date"
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  className="w-full text-xs font-semibold text-gray-800 outline-none bg-transparent"
                />
              </div>
            </div>

            {/* Guests & Rooms */}
            <div className="border border-gray-200 rounded-lg p-2.5 bg-gray-50/50">
              <span className="text-[10px] font-semibold text-gray-400 uppercase block">Guests & Rooms</span>
              <div className="flex items-center gap-1.5 mt-0.5">
                <Users size={14} className="text-gray-400 shrink-0" />
                <select
                  value={guests}
                  onChange={(e) => setGuests(e.target.value)}
                  className="w-full text-xs font-semibold text-gray-800 outline-none bg-transparent cursor-pointer"
                >
                  <option value="1 Guest, 1 Room">1 Guest, 1 Room</option>
                  <option value="2 Guests, 1 Room">2 Guests, 1 Room</option>
                  <option value="3 Guests, 1 Room">3 Guests, 1 Room</option>
                  <option value="4 Guests, 2 Rooms">4 Guests, 2 Rooms</option>
                </select>
              </div>
            </div>

            {/* Search button */}
            <button
              type="button"
              className="bg-[#800020] hover:bg-[#600018] text-white h-[50px] rounded-lg font-medium text-xs sm:text-sm flex items-center justify-center gap-1.5 shadow-xs transition-all cursor-pointer"
            >
              <span>Search Hotels</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </section>

      {/* 3. TWO COLUMN LAYOUT: HOTEL RESULTS (LEFT) & FILTERS (RIGHT) */}
      <section className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Hotels list (approx 8 cols / 70%) */}
          <div className="lg:col-span-8">
            <div className="flex justify-between items-center mb-5 pb-2 border-b border-gray-100">
              <span className="text-sm font-semibold text-gray-700">120+ Hotels found</span>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <span>Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="p-1 border border-gray-200 rounded-md font-medium text-gray-800 bg-white outline-none cursor-pointer"
                >
                  <option value="Recommended">Recommended</option>
                  <option value="PriceLow">Price: Low to High</option>
                  <option value="PriceHigh">Price: High to Low</option>
                  <option value="Rating">Rating: Highest</option>
                </select>
              </div>
            </div>

            {/* Hotel Cards in Horizontal format matching screenshot */}
            <div className="space-y-4">
              {filteredHotels.map((hotel) => (
                <div
                  key={hotel.id}
                  onClick={() => onSelectHotel(hotel)}
                  className="bg-white border border-gray-200/80 rounded-xl overflow-hidden shadow-xs hover:shadow-md transition-all duration-200 flex flex-col sm:flex-row group cursor-pointer"
                >
                  {/* Hotel Image Left */}
                  <div className="sm:w-52 h-48 sm:h-auto relative overflow-hidden shrink-0">
                    <img
                      src={hotel.image}
                      alt={hotel.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />
                  </div>

                  {/* Hotel Info Middle */}
                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Rating Stars */}
                      <div className="flex items-center gap-1 text-amber-500 mb-1">
                        {Array.from({ length: hotel.stars }).map((_, i) => (
                          <Star key={i} size={13} fill="currentColor" />
                        ))}
                      </div>

                      <h3 className="text-base font-bold serif text-[#1a2b48] group-hover:text-[#800020] transition-colors leading-tight">
                        {hotel.name}
                      </h3>

                      <p className="text-xs text-gray-400 flex items-center gap-1 mt-1">
                        <MapPin size={11} className="text-gray-400 shrink-0" />
                        <span>{hotel.location}</span>
                      </p>

                      {/* Amenities pills matching screenshot */}
                      <div className="flex flex-wrap gap-2 mt-3 text-xs text-gray-500">
                        {hotel.amenities.map((amenity, i) => (
                          <span key={i} className="flex items-center gap-1 bg-gray-50 border border-gray-100 px-2 py-0.5 rounded-md text-[11px]">
                            {amenity.includes('Wi-Fi') && <Wifi size={11} />}
                            {amenity.includes('Breakfast') && <Coffee size={11} />}
                            {amenity.includes('Pool') && <Waves size={11} />}
                            {amenity.includes('Parking') && <Car size={11} />}
                            {amenity.includes('Gym') && <Dumbbell size={11} />}
                            <span>{amenity}</span>
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Price and View Details CTA matching screenshot */}
                    <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
                      <div>
                        <span className="text-sm font-bold serif text-[#800020]">{hotel.pricePerNight}</span>
                        <span className="text-xs text-gray-400 font-light"> / night</span>
                      </div>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectHotel(hotel);
                        }}
                        className="bg-[#800020] hover:bg-[#600018] text-white px-4 py-1.5 rounded-lg text-xs font-medium transition-colors shadow-xs cursor-pointer"
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination matching screenshot: < [1] [2] [3] ... [8] > */}
            <div className="flex justify-center items-center gap-2 mt-8">
              <button className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 cursor-pointer">
                <ChevronLeft size={15} />
              </button>
              <button className="w-8 h-8 rounded-lg bg-[#800020] text-white text-xs font-semibold flex items-center justify-center shadow-xs">
                1
              </button>
              <button className="w-8 h-8 rounded-lg border border-gray-200 text-xs font-semibold text-gray-700 hover:bg-gray-50 flex items-center justify-center cursor-pointer">
                2
              </button>
              <button className="w-8 h-8 rounded-lg border border-gray-200 text-xs font-semibold text-gray-700 hover:bg-gray-50 flex items-center justify-center cursor-pointer">
                3
              </button>
              <span className="text-gray-400 text-xs px-1">...</span>
              <button className="w-8 h-8 rounded-lg border border-gray-200 text-xs font-semibold text-gray-700 hover:bg-gray-50 flex items-center justify-center cursor-pointer">
                8
              </button>
              <button className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 cursor-pointer">
                <ChevronRight size={15} />
              </button>
            </div>
          </div>

          {/* Right Column: Filters Card (approx 4 cols / 30%) */}
          <div className="lg:col-span-4">
            <div className="bg-white border border-gray-200/90 rounded-xl p-5 shadow-xs sticky top-24 space-y-5">
              <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                <h3 className="text-sm font-bold text-[#1a2b48] uppercase tracking-wider">Filters</h3>
                <button
                  onClick={handleClearFilters}
                  className="text-xs text-[#800020] font-semibold hover:underline cursor-pointer"
                >
                  Clear All
                </button>
              </div>

              {/* Price Range Slider */}
              <div>
                <div className="flex justify-between items-center mb-1.5 text-xs font-semibold text-gray-700">
                  <span>Price Range</span>
                  <span className="text-[#800020]">Up to ₹{maxPrice.toLocaleString()}</span>
                </div>
                <input
                  type="range"
                  min="2000"
                  max="10000"
                  step="500"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-[#800020] cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-gray-400 mt-1">
                  <span>₹2,000</span>
                  <span>₹10,000+</span>
                </div>
              </div>

              {/* Star Rating Checkboxes */}
              <div className="pt-2 border-t border-gray-100">
                <h4 className="text-xs font-semibold text-gray-700 mb-2">Star Rating</h4>
                <div className="space-y-1.5">
                  {[5, 4, 3, 2, 1].map((stars) => (
                    <label key={stars} className="flex items-center gap-2 text-xs text-gray-600 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedStars.includes(stars)}
                        onChange={() => toggleStar(stars)}
                        className="rounded text-[#800020] accent-[#800020]"
                      />
                      <div className="flex items-center gap-0.5 text-amber-500">
                        {Array.from({ length: stars }).map((_, i) => (
                          <Star key={i} size={11} fill="currentColor" />
                        ))}
                      </div>
                      <span className="text-gray-500 text-[11px]">{stars} Star</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Amenities */}
              <div className="pt-2 border-t border-gray-100">
                <h4 className="text-xs font-semibold text-gray-700 mb-2">Amenities</h4>
                <div className="space-y-1.5">
                  {['Free Wi-Fi', 'Breakfast Included', 'Swimming Pool', 'Parking', 'Gym'].map((amenity) => (
                    <label key={amenity} className="flex items-center gap-2 text-xs text-gray-600 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedAmenities.includes(amenity.split(' ')[0])}
                        onChange={() => toggleAmenity(amenity.split(' ')[0])}
                        className="rounded text-[#800020] accent-[#800020]"
                      />
                      <span>{amenity}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Property Type Radio */}
              <div className="pt-2 border-t border-gray-100">
                <h4 className="text-xs font-semibold text-gray-700 mb-2">Property Type</h4>
                <div className="space-y-1.5 text-xs text-gray-600">
                  {['All Types', 'Hotels', 'Resorts', 'Apartments', 'Villas'].map((type) => (
                    <label key={type} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="propertyType"
                        checked={propertyType === type}
                        onChange={() => setPropertyType(type)}
                        className="accent-[#800020]"
                      />
                      <span>{type}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};
export default HotelsPage;
