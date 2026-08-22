import React, { useState } from 'react';
import { Plane, Search, Clock, ArrowRight, ArrowRightLeft, Filter, ShieldCheck, Sparkles, SlidersHorizontal } from 'lucide-react';
import { FLIGHT_DEALS, FlightDeal } from '../data/travelData';

interface FlightsPageProps {
  onSelectFlight: (flight: FlightDeal) => void;
  onOpenBookModal: (service?: 'Flights' | 'Hotels' | 'Holidays' | 'Visa') => void;
}

export const FlightsPage: React.FC<FlightsPageProps> = ({ onSelectFlight, onOpenBookModal }) => {
  const [tripType, setTripType] = useState<'One Way' | 'Round Trip' | 'Multi City'>('One Way');
  const [origin, setOrigin] = useState('Mumbai (BOM)');
  const [destination, setDestination] = useState('Dubai (DXB)');
  const [departureDate, setDepartureDate] = useState('2026-05-25');
  const [travellers, setTravellers] = useState('1 Traveller, Economy');
  const [airlineFilter, setAirlineFilter] = useState('All');
  const [sortBy, setSortBy] = useState<'price' | 'duration'>('price');

  const filteredDeals = FLIGHT_DEALS.filter(f => {
    if (airlineFilter === 'All') return true;
    return f.airline.toLowerCase().includes(airlineFilter.toLowerCase());
  }).sort((a, b) => {
    if (sortBy === 'price') return a.rawPrice - b.rawPrice;
    return a.duration.localeCompare(b.duration);
  });

  const swapOriginDest = () => {
    const temp = origin;
    setOrigin(destination);
    setDestination(temp);
  };

  return (
    <main className="min-h-screen bg-[#FAF9F6] pb-20">
      {/* Flight Hero Banner */}
      <div className="relative h-[400px] sm:h-[440px] flex items-center justify-center">
        <img 
          src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1920&q=80" 
          alt="Flight above clouds"
          className="absolute inset-0 w-full h-full object-cover object-center brightness-[0.65]"
        />
        <div className="absolute inset-0 hero-gradient"></div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-6 w-full text-center flex flex-col items-center justify-center">
          <div className="text-white flex flex-col items-center">
            <span className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-sm text-xs font-semibold uppercase tracking-widest text-brand-orange mb-4 border border-white/20">
              <Plane size={13} /> Official Airline Partner Fares
            </span>
            <h1 className="text-4xl sm:text-6xl font-bold serif mb-4 tracking-tight leading-tight text-center">
              Flights & Air Tickets
            </h1>
            <p className="text-base sm:text-lg text-gray-200 font-light leading-relaxed max-w-2xl mx-auto text-center">
              Find the best curated flight deals to your favorite destinations with zero hidden convenience fees.
            </p>
          </div>
        </div>
      </div>

      {/* Main Search Panel & Filter Body */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 -mt-16 sm:-mt-20 relative z-30">
        <div className="bg-white p-6 sm:p-8 rounded-sm shadow-md border border-[#e5e5e5]">
          {/* Trip Type Tabs */}
          <div className="flex gap-8 mb-6 border-b border-[#e5e5e5] pb-4 text-xs font-semibold uppercase tracking-wider">
            {(['One Way', 'Round Trip', 'Multi City'] as const).map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => setTripType(type)}
                className={`transition-all cursor-pointer relative pb-4 -mb-4 ${
                  tripType === type
                    ? 'text-brand-maroon border-b-2 border-brand-maroon font-bold'
                    : 'text-gray-400 hover:text-gray-700'
                }`}
              >
                {type}
              </button>
            ))}
          </div>

          {/* Search Inputs Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 items-end">
            <div className="border border-[#e5e5e5] rounded-sm p-3 bg-[#FAF9F6] focus-within:bg-white focus-within:border-brand-maroon transition-all">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block">From</label>
              <input 
                className="w-full text-sm font-semibold text-gray-800 outline-none bg-transparent mt-1" 
                value={origin}
                onChange={(e) => setOrigin(e.target.value)}
                placeholder="Departure Airport"
              />
            </div>

            <div className="relative border border-[#e5e5e5] rounded-sm p-3 bg-[#FAF9F6] focus-within:bg-white focus-within:border-brand-maroon transition-all">
              <button
                type="button"
                onClick={swapOriginDest}
                className="hidden lg:flex absolute -left-3.5 top-1/2 -translate-y-1/2 bg-white border border-[#e5e5e5] rounded-full p-1 shadow-xs hover:text-brand-maroon z-10 cursor-pointer"
                title="Swap"
              >
                <ArrowRightLeft size={12} />
              </button>
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block">To</label>
              <input 
                className="w-full text-sm font-semibold text-gray-800 outline-none bg-transparent mt-1" 
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                placeholder="Destination Airport"
              />
            </div>

            <div className="border border-[#e5e5e5] rounded-sm p-3 bg-[#FAF9F6] focus-within:bg-white focus-within:border-brand-maroon transition-all">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block">Departure</label>
              <input 
                className="w-full text-sm font-semibold text-gray-800 outline-none bg-transparent mt-1" 
                type="date"
                value={departureDate}
                onChange={(e) => setDepartureDate(e.target.value)}
              />
            </div>

            <div className="border border-[#e5e5e5] rounded-sm p-3 bg-[#FAF9F6] focus-within:bg-white focus-within:border-brand-maroon transition-all">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block">Travellers</label>
              <select 
                value={travellers}
                onChange={(e) => setTravellers(e.target.value)}
                className="w-full text-sm font-semibold text-gray-800 outline-none bg-transparent mt-1 cursor-pointer"
              >
                <option value="1 Traveller, Economy">1 Traveller, Economy</option>
                <option value="2 Travellers, Economy">2 Travellers, Economy</option>
                <option value="1 Traveller, Business">1 Traveller, Business Class</option>
                <option value="Family, Economy">Family (2 Adults, 2 Kids)</option>
              </select>
            </div>

            <button 
              type="button"
              onClick={() => {}}
              className="bg-brand-maroon hover:bg-brand-maroon-dark text-white h-[58px] rounded-sm font-semibold text-sm flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer active:scale-95"
            >
              <span>Search Flights</span>
              <ArrowRight size={16} />
            </button>
          </div>

          {/* Quick Filter Bar */}
          <div className="mt-6 pt-4 border-t border-[#e5e5e5] flex flex-wrap items-center justify-between gap-4 text-xs">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-gray-500 flex items-center gap-1">
                <SlidersHorizontal size={14} /> Filter Airlines:
              </span>
              {['All', 'Emirates', 'Singapore', 'Qatar', 'Turkish', 'British Airways'].map((airline) => (
                <button
                  key={airline}
                  onClick={() => setAirlineFilter(airline)}
                  className={`px-3 py-1 rounded-sm font-semibold transition cursor-pointer text-xs ${
                    airlineFilter === airline 
                      ? 'bg-brand-maroon text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {airline}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <span className="text-gray-500 font-medium">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="font-semibold text-[#1a2b48] bg-[#FAF9F6] border border-[#e5e5e5] p-1 rounded-sm outline-none cursor-pointer text-xs"
              >
                <option value="price">Cheapest First</option>
                <option value="duration">Fastest Duration</option>
              </select>
            </div>
          </div>
        </div>

        {/* Popular Flight Deals Section */}
        <div className="py-16">
          <div className="flex justify-between items-end mb-8 pb-3 border-b border-[#e5e5e5]">
            <div>
              <span className="text-xs uppercase tracking-widest text-brand-orange font-bold block mb-1">
                Verified Direct & 1-Stop Fares
              </span>
              <h2 className="text-3xl font-bold serif text-[#1a2b48]">Popular Flight Deals</h2>
            </div>
            <button 
              onClick={() => onOpenBookModal('Flights')}
              className="text-brand-maroon font-bold text-sm italic border-b border-brand-maroon pb-0.5 cursor-pointer"
            >
              Request Custom Route Fare
            </button>
          </div>

          {/* Flight Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredDeals.map((f) => (
              <div 
                key={f.id} 
                id={`flight-card-${f.id}`}
                onClick={() => onSelectFlight(f)}
                className="bg-white border border-[#e5e5e5] rounded-sm overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between group cursor-pointer"
              >
                <div>
                  <div className="relative h-44 overflow-hidden">
                    <img 
                      src={f.image} 
                      alt={f.to}
                      className="h-full w-full object-cover group-hover:scale-105 transition duration-500" 
                    />
                    <div className="absolute top-3 left-3 bg-[#1a2b48]/85 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-0.5 rounded-sm">
                      {f.flightNumber}
                    </div>
                    <div className="absolute top-3 right-3 bg-emerald-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-sm">
                      {f.type}
                    </div>
                  </div>

                  <div className="p-5">
                    <div className="text-[10px] font-bold text-brand-orange mb-1 tracking-widest uppercase">
                      {f.airline}
                    </div>
                    
                    <div className="flex items-center justify-between text-base font-bold text-[#1a2b48] mb-2 serif">
                      <span>{f.from.split(' ')[0]}</span>
                      <ArrowRight size={15} className="text-brand-orange group-hover:translate-x-1 transition-transform" />
                      <span>{f.to.split(' ')[0]}</span>
                    </div>

                    <div className="text-xs text-gray-500 space-y-1 mb-4">
                      <p className="flex items-center gap-1.5">
                        <Clock size={12} className="text-gray-400" />
                        <span>{f.departureDate} • {f.duration}</span>
                      </p>
                      <p className="text-[11px] text-gray-400 font-light">
                        {f.baggage}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="px-5 pb-5 pt-3 border-t border-[#e5e5e5] flex justify-between items-center bg-[#FAF9F6]">
                  <div>
                    <p className="text-[9px] text-gray-400 uppercase font-semibold">From (Taxes Incl.)</p>
                    <p className="font-bold text-lg serif text-brand-maroon">₹{f.price}</p>
                  </div>
                  <div className="bg-brand-maroon/10 group-hover:bg-brand-maroon text-brand-maroon group-hover:text-white p-2 rounded-sm transition-colors">
                    <ArrowRight size={14} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Flight Perks Banner */}
        <div className="bg-white rounded-sm p-8 border border-[#e5e5e5] shadow-xs mb-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-brand-maroon/10 text-brand-maroon rounded-full flex items-center justify-center font-bold">
              <ShieldCheck size={22} />
            </div>
            <div>
              <h4 className="font-bold serif text-sm text-[#1a2b48]">Free Flight Rescheduling</h4>
              <p className="text-xs text-gray-500 font-light">1-time date change waiver on select international airlines.</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-brand-maroon/10 text-brand-maroon rounded-full flex items-center justify-center font-bold">
              <Sparkles size={22} />
            </div>
            <div>
              <h4 className="font-bold serif text-sm text-[#1a2b48]">Instant Web Check-in</h4>
              <p className="text-xs text-gray-500 font-light">Boarding passes delivered straight to WhatsApp.</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-brand-maroon/10 text-brand-maroon rounded-full flex items-center justify-center font-bold">
              <Plane size={22} />
            </div>
            <div>
              <h4 className="font-bold serif text-sm text-[#1a2b48]">Prepaid Baggage Discount</h4>
              <p className="text-xs text-gray-500 font-light">Save up to 40% on extra baggage allowance at time of booking.</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
export default FlightsPage;
