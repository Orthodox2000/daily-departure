import React, { useState } from 'react';
import { Plane, Hotel, Palmtree, FileCheck, MapPin, Calendar, Users, Search, ArrowRightLeft, Sparkles } from 'lucide-react';

export type SearchTab = 'Flights' | 'Hotels' | 'Holidays' | 'Visa';

interface SearchWidgetProps {
  initialTab?: SearchTab;
  onSearch: (tab: SearchTab, params: Record<string, string>) => void;
  compact?: boolean;
}

export const SearchWidget: React.FC<SearchWidgetProps> = ({ 
  initialTab = 'Flights', 
  onSearch,
  compact = false 
}) => {
  const [activeTab, setActiveTab] = useState<SearchTab>(initialTab);

  // Flights State
  const [flightFrom, setFlightFrom] = useState('Mumbai (BOM)');
  const [flightTo, setFlightTo] = useState('Dubai (DXB)');
  const [flightDate, setFlightDate] = useState('');
  const [flightTravellers, setFlightTravellers] = useState('1 Traveller, Economy');
  const [tripType, setTripType] = useState<'one-way' | 'round-trip'>('one-way');

  // Hotels State
  const [hotelCity, setHotelCity] = useState('Dubai, UAE');
  const [hotelCheckIn, setHotelCheckIn] = useState('');
  const [hotelCheckOut, setHotelCheckOut] = useState('');
  const [hotelGuests, setHotelGuests] = useState('2 Adults, 1 Room');

  // Holidays State
  const [holidayDest, setHolidayDest] = useState('Maldives');
  const [holidayDate, setHolidayDate] = useState('');
  const [holidayDuration, setHolidayDuration] = useState('4-7 Days');
  const [holidayTravelers, setHolidayTravelers] = useState('2 Travelers (Couple)');

  // Visa State
  const [visaCountry, setVisaCountry] = useState('Dubai / UAE');
  const [visaType, setVisaType] = useState('Tourist E-Visa');

  const swapFlightAirports = () => {
    const temp = flightFrom;
    setFlightFrom(flightTo);
    setFlightTo(temp);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let params: Record<string, string> = {};

    if (activeTab === 'Flights') {
      params = { from: flightFrom, to: flightTo, date: flightDate, travellers: flightTravellers, tripType };
    } else if (activeTab === 'Hotels') {
      params = { city: hotelCity, checkIn: hotelCheckIn, checkOut: hotelCheckOut, guests: hotelGuests };
    } else if (activeTab === 'Holidays') {
      params = { destination: holidayDest, departureDate: holidayDate, duration: holidayDuration, travelers: holidayTravelers };
    } else if (activeTab === 'Visa') {
      params = { country: visaCountry, type: visaType };
    }

    onSearch(activeTab, params);
  };

  const tabs: { id: SearchTab; label: string; icon: React.FC<{ size?: number; className?: string }> }[] = [
    { id: 'Flights', label: 'Flights', icon: Plane },
    { id: 'Hotels', label: 'Hotels', icon: Hotel },
    { id: 'Holidays', label: 'Holidays', icon: Palmtree },
    { id: 'Visa', label: 'Visa', icon: FileCheck },
  ];

  return (
    <div className={`bg-white shadow-xl max-w-5xl mx-auto rounded-sm border border-[#e5e5e5] text-gray-800 transition-all ${compact ? 'p-3' : 'p-3 sm:p-5'}`}>
      {/* Search Type Tabs */}
      <div className="flex border-b border-[#e5e5e5] mb-4 gap-4 sm:gap-8 px-2 overflow-x-auto no-scrollbar">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              id={`tab-btn-${tab.id.toLowerCase()}`}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`pb-3.5 text-xs sm:text-sm flex items-center gap-2 tracking-wide transition-all cursor-pointer whitespace-nowrap ${
                isActive
                  ? 'text-brand-maroon border-b-2 border-brand-maroon font-bold'
                  : 'text-gray-400 hover:text-gray-600 font-medium border-b-2 border-transparent'
              }`}
            >
              <Icon size={16} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Contents Form */}
      <form onSubmit={handleSearchSubmit} className="p-1 sm:p-2">
        {/* FLIGHTS TAB */}
        {activeTab === 'Flights' && (
          <div className="space-y-4">
            <div className="flex items-center gap-6 text-xs font-semibold text-gray-600 px-1">
              <label className="flex items-center gap-2 cursor-pointer">
                <input 
                  type="radio" 
                  name="tripType" 
                  checked={tripType === 'one-way'} 
                  onChange={() => setTripType('one-way')} 
                  className="accent-brand-maroon"
                />
                <span>One Way</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input 
                  type="radio" 
                  name="tripType" 
                  checked={tripType === 'round-trip'} 
                  onChange={() => setTripType('round-trip')} 
                  className="accent-brand-maroon"
                />
                <span>Round Trip</span>
              </label>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-0 border border-[#e5e5e5] rounded-sm bg-white divide-y md:divide-y-0 md:divide-x divide-[#e5e5e5]">
              {/* From */}
              <div className="p-3 bg-white hover:bg-[#FAF9F6] transition-colors">
                <p className="text-[10px] uppercase font-bold tracking-widest text-gray-400 block mb-1">From</p>
                <div className="flex items-center gap-2">
                  <MapPin size={15} className="text-brand-maroon shrink-0" />
                  <input 
                    type="text"
                    value={flightFrom} 
                    onChange={(e) => setFlightFrom(e.target.value)}
                    placeholder="City or Airport"
                    className="w-full text-sm font-bold text-[#1a2b48] outline-none bg-transparent"
                  />
                </div>
              </div>

              {/* To with swap button */}
              <div className="relative p-3 bg-white hover:bg-[#FAF9F6] transition-colors">
                <button
                  type="button"
                  onClick={swapFlightAirports}
                  title="Swap Origin and Destination"
                  className="hidden lg:flex absolute -left-3.5 top-1/2 -translate-y-1/2 bg-white border border-[#e5e5e5] rounded-full p-1 shadow-xs hover:text-brand-maroon hover:border-brand-maroon z-10 cursor-pointer"
                >
                  <ArrowRightLeft size={12} />
                </button>
                <p className="text-[10px] uppercase font-bold tracking-widest text-gray-400 block mb-1">To</p>
                <div className="flex items-center gap-2">
                  <MapPin size={15} className="text-brand-orange shrink-0" />
                  <input 
                    type="text"
                    value={flightTo} 
                    onChange={(e) => setFlightTo(e.target.value)}
                    placeholder="Destination Airport"
                    className="w-full text-sm font-bold text-[#1a2b48] outline-none bg-transparent"
                  />
                </div>
              </div>

              {/* Departure */}
              <div className="p-3 bg-white hover:bg-[#FAF9F6] transition-colors">
                <p className="text-[10px] uppercase font-bold tracking-widest text-gray-400 block mb-1">Departure Date</p>
                <div className="flex items-center gap-2">
                  <Calendar size={15} className="text-brand-maroon shrink-0" />
                  <input 
                    type="date"
                    value={flightDate} 
                    onChange={(e) => setFlightDate(e.target.value)}
                    className="w-full text-sm font-bold text-[#1a2b48] outline-none bg-transparent cursor-pointer"
                  />
                </div>
              </div>

              {/* Travellers */}
              <div className="p-3 bg-white hover:bg-[#FAF9F6] transition-colors">
                <p className="text-[10px] uppercase font-bold tracking-widest text-gray-400 block mb-1">Travellers & Class</p>
                <div className="flex items-center gap-2">
                  <Users size={15} className="text-brand-maroon shrink-0" />
                  <select 
                    value={flightTravellers}
                    onChange={(e) => setFlightTravellers(e.target.value)}
                    className="w-full text-sm font-bold text-[#1a2b48] outline-none bg-transparent cursor-pointer"
                  >
                    <option value="1 Traveller, Economy">1 Adult, Economy</option>
                    <option value="2 Travellers, Economy">2 Adults, Economy</option>
                    <option value="2 Adults, 1 Child, Economy">Family (2A + 1C)</option>
                    <option value="1 Traveller, Premium Economy">1 Adult, Premium Eco</option>
                    <option value="1 Traveller, Business Class">1 Adult, Business Class</option>
                  </select>
                </div>
              </div>

              {/* Search Button */}
              <div className="p-2 sm:p-2.5 flex items-center justify-center bg-white">
                <button 
                  type="submit"
                  id="btn-search-flights"
                  className="w-full h-full min-h-[44px] bg-brand-maroon hover:bg-brand-maroon-dark text-white rounded-sm font-bold flex items-center justify-center gap-2 text-sm shadow-sm transition-all cursor-pointer py-2.5 px-4 active:scale-95"
                >
                  <Search size={16} />
                  <span>Search Flights</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* HOTELS TAB */}
        {activeTab === 'Hotels' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-0 border border-[#e5e5e5] rounded-sm bg-white divide-y md:divide-y-0 md:divide-x divide-[#e5e5e5]">
            {/* City / Destination */}
            <div className="p-3 bg-white hover:bg-[#FAF9F6] transition-colors">
              <p className="text-[10px] uppercase font-bold tracking-widest text-gray-400 block mb-1">City or Property</p>
              <div className="flex items-center gap-2">
                <MapPin size={15} className="text-brand-maroon shrink-0" />
                <input 
                  type="text"
                  value={hotelCity} 
                  onChange={(e) => setHotelCity(e.target.value)}
                  placeholder="Dubai, Paris, Bali, etc."
                  className="w-full text-sm font-bold text-[#1a2b48] outline-none bg-transparent"
                />
              </div>
            </div>

            {/* Check-In */}
            <div className="p-3 bg-white hover:bg-[#FAF9F6] transition-colors">
              <p className="text-[10px] uppercase font-bold tracking-widest text-gray-400 block mb-1">Check-In</p>
              <div className="flex items-center gap-2">
                <Calendar size={15} className="text-brand-maroon shrink-0" />
                <input 
                  type="date"
                  value={hotelCheckIn} 
                  onChange={(e) => setHotelCheckIn(e.target.value)}
                  className="w-full text-sm font-bold text-[#1a2b48] outline-none bg-transparent cursor-pointer"
                />
              </div>
            </div>

            {/* Check-Out */}
            <div className="p-3 bg-white hover:bg-[#FAF9F6] transition-colors">
              <p className="text-[10px] uppercase font-bold tracking-widest text-gray-400 block mb-1">Check-Out</p>
              <div className="flex items-center gap-2">
                <Calendar size={15} className="text-brand-orange shrink-0" />
                <input 
                  type="date"
                  value={hotelCheckOut} 
                  onChange={(e) => setHotelCheckOut(e.target.value)}
                  className="w-full text-sm font-bold text-[#1a2b48] outline-none bg-transparent cursor-pointer"
                />
              </div>
            </div>

            {/* Guests */}
            <div className="p-3 bg-white hover:bg-[#FAF9F6] transition-colors">
              <p className="text-[10px] uppercase font-bold tracking-widest text-gray-400 block mb-1">Guests & Rooms</p>
              <div className="flex items-center gap-2">
                <Users size={15} className="text-brand-maroon shrink-0" />
                <select 
                  value={hotelGuests}
                  onChange={(e) => setHotelGuests(e.target.value)}
                  className="w-full text-sm font-bold text-[#1a2b48] outline-none bg-transparent cursor-pointer"
                >
                  <option value="1 Adult, 1 Room">1 Adult, 1 Room</option>
                  <option value="2 Adults, 1 Room">2 Adults, 1 Room</option>
                  <option value="2 Adults, 2 Children, 1 Room">Family (2A + 2C)</option>
                  <option value="4 Adults, 2 Rooms">Group (4 Adults, 2 Rooms)</option>
                </select>
              </div>
            </div>

            {/* Search Button */}
            <div className="p-2 sm:p-2.5 flex items-center justify-center bg-white">
              <button 
                type="submit"
                id="btn-search-hotels"
                className="w-full h-full min-h-[44px] bg-brand-maroon hover:bg-brand-maroon-dark text-white rounded-sm font-bold flex items-center justify-center gap-2 text-sm shadow-sm transition-all cursor-pointer py-2.5 px-4 active:scale-95"
              >
                <Search size={16} />
                <span>Search Hotels</span>
              </button>
            </div>
          </div>
        )}

        {/* HOLIDAYS TAB */}
        {activeTab === 'Holidays' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-0 border border-[#e5e5e5] rounded-sm bg-white divide-y md:divide-y-0 md:divide-x divide-[#e5e5e5]">
            {/* Holiday Destination */}
            <div className="p-3 bg-white hover:bg-[#FAF9F6] transition-colors">
              <p className="text-[10px] uppercase font-bold tracking-widest text-gray-400 block mb-1">Destination</p>
              <div className="flex items-center gap-2">
                <MapPin size={15} className="text-brand-maroon shrink-0" />
                <select 
                  value={holidayDest}
                  onChange={(e) => setHolidayDest(e.target.value)}
                  className="w-full text-sm font-bold text-[#1a2b48] outline-none bg-transparent cursor-pointer"
                >
                  <option value="All Destinations">All Destinations</option>
                  <option value="Maldives">Maldives</option>
                  <option value="Switzerland">Switzerland</option>
                  <option value="Thailand">Thailand</option>
                  <option value="Dubai">Dubai</option>
                  <option value="Bali">Bali</option>
                  <option value="Europe">Europe Grandeur</option>
                </select>
              </div>
            </div>

            {/* Departure - optional, user picks a date (never hardcoded) */}
            <div className="p-3 bg-white hover:bg-[#FAF9F6] transition-colors">
              <p className="text-[10px] uppercase font-bold tracking-widest text-gray-400 block mb-1">Departure (Optional)</p>
              <div className="flex items-center gap-2">
                <Calendar size={15} className="text-brand-maroon shrink-0" />
                <input
                  type="date"
                  value={holidayDate}
                  onChange={(e) => setHolidayDate(e.target.value)}
                  className="w-full text-sm font-bold text-[#1a2b48] outline-none bg-transparent"
                />
              </div>
            </div>

            {/* Duration */}
            <div className="p-3 bg-white hover:bg-[#FAF9F6] transition-colors">
              <p className="text-[10px] uppercase font-bold tracking-widest text-gray-400 block mb-1">Duration</p>
              <div className="flex items-center gap-2">
                <Palmtree size={15} className="text-brand-orange shrink-0" />
                <select 
                  value={holidayDuration}
                  onChange={(e) => setHolidayDuration(e.target.value)}
                  className="w-full text-sm font-bold text-[#1a2b48] outline-none bg-transparent cursor-pointer"
                >
                  <option value="3-5 Days">Short Break (3-5 Days)</option>
                  <option value="4-7 Days">Standard (4-7 Days)</option>
                  <option value="8-12 Days">Extended Tour (8-12 Days)</option>
                  <option value="12+ Days">Grand Tour (12+ Days)</option>
                </select>
              </div>
            </div>

            {/* Travelers */}
            <div className="p-3 bg-white hover:bg-[#FAF9F6] transition-colors">
              <p className="text-[10px] uppercase font-bold tracking-widest text-gray-400 block mb-1">Trip Type</p>
              <div className="flex items-center gap-2">
                <Users size={15} className="text-brand-maroon shrink-0" />
                <select 
                  value={holidayTravelers}
                  onChange={(e) => setHolidayTravelers(e.target.value)}
                  className="w-full text-sm font-bold text-[#1a2b48] outline-none bg-transparent cursor-pointer"
                >
                  <option value="Couple / Honeymoon">Couple / Honeymoon</option>
                  <option value="Family with Kids">Family with Kids</option>
                  <option value="Friends Group">Friends Group</option>
                  <option value="Solo Traveler">Solo Traveler</option>
                </select>
              </div>
            </div>

            {/* Search Button */}
            <div className="p-2 sm:p-2.5 flex items-center justify-center bg-white">
              <button 
                type="submit"
                id="btn-search-holidays"
                className="w-full h-full min-h-[44px] bg-brand-maroon hover:bg-brand-maroon-dark text-white rounded-sm font-bold flex items-center justify-center gap-2 text-sm shadow-sm transition-all cursor-pointer py-2.5 px-4 active:scale-95"
              >
                <Search size={16} />
                <span>Explore Packages</span>
              </button>
            </div>
          </div>
        )}

        {/* VISA TAB */}
        {activeTab === 'Visa' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 border border-[#e5e5e5] rounded-sm bg-white divide-y md:divide-y-0 md:divide-x divide-[#e5e5e5]">
            {/* Country */}
            <div className="p-3 bg-white hover:bg-[#FAF9F6] transition-colors">
              <p className="text-[10px] uppercase font-bold tracking-widest text-gray-400 block mb-1">Select Country</p>
              <div className="flex items-center gap-2">
                <MapPin size={15} className="text-brand-maroon shrink-0" />
                <select 
                  value={visaCountry}
                  onChange={(e) => setVisaCountry(e.target.value)}
                  className="w-full text-sm font-bold text-[#1a2b48] outline-none bg-transparent cursor-pointer"
                >
                  <option value="Dubai / UAE">Dubai / UAE 🇦🇪</option>
                  <option value="Schengen (Europe)">Schengen (Europe) 🇪🇺</option>
                  <option value="United Kingdom">United Kingdom 🇬🇧</option>
                  <option value="United States">United States 🇺🇸</option>
                  <option value="Singapore">Singapore 🇸🇬</option>
                  <option value="Thailand">Thailand 🇹🇭</option>
                </select>
              </div>
            </div>

            {/* Visa Category */}
            <div className="p-3 bg-white hover:bg-[#FAF9F6] transition-colors">
              <p className="text-[10px] uppercase font-bold tracking-widest text-gray-400 block mb-1">Visa Type</p>
              <div className="flex items-center gap-2">
                <FileCheck size={15} className="text-brand-maroon shrink-0" />
                <select 
                  value={visaType}
                  onChange={(e) => setVisaType(e.target.value)}
                  className="w-full text-sm font-bold text-[#1a2b48] outline-none bg-transparent cursor-pointer"
                >
                  <option value="Tourist E-Visa">Tourist E-Visa</option>
                  <option value="Business Visitor Visa">Business Visitor Visa</option>
                  <option value="Express Fast-Track Visa">Express Fast-Track Visa</option>
                  <option value="Transit Visa">Transit Visa</option>
                </select>
              </div>
            </div>

            {/* Passport Nationality */}
            <div className="p-3 bg-white hover:bg-[#FAF9F6] transition-colors">
              <p className="text-[10px] uppercase font-bold tracking-widest text-gray-400 block mb-1">Passport Holder</p>
              <div className="flex items-center gap-2">
                <Sparkles size={15} className="text-brand-orange shrink-0" />
                <span className="text-sm font-bold text-[#1a2b48]">Indian Passport (Regular)</span>
              </div>
            </div>

            {/* Check Visa Button */}
            <div className="p-2 sm:p-2.5 flex items-center justify-center bg-white">
              <button 
                type="submit"
                id="btn-search-visa"
                className="w-full h-full min-h-[44px] bg-brand-maroon hover:bg-brand-maroon-dark text-white rounded-sm font-bold flex items-center justify-center gap-2 text-sm shadow-sm transition-all cursor-pointer py-2.5 px-4 active:scale-95"
              >
                <FileCheck size={16} />
                <span>Check Visa & Apply</span>
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};
export default SearchWidget;
