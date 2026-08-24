import React, { useState } from 'react';
import { 
  Plane, ArrowRight, ArrowRightLeft, Calendar, 
  Users, Tag, ShieldCheck, Headset, CalendarCheck, Mail
} from 'lucide-react';
// Unused icons cleaned up: Search, Send, CheckCircle2
// import { 
//   Plane, Search, ArrowRight, ArrowRightLeft, Calendar, 
//   Users, Tag, ShieldCheck, Headset, CalendarCheck, Mail, Send, CheckCircle2 
// } from 'lucide-react';
import { FLIGHT_DEALS } from '../data/travelData';
import { useLeadForm } from '../context/LeadContext';

interface FlightsPageProps {
  onShowToast: (msg: string) => void;
}

export const FlightsPage: React.FC<FlightsPageProps> = ({ 
  onShowToast 
}) => {
  const [tripType, setTripType] = useState<'One Way' | 'Round Trip' | 'Multi City'>('One Way');
  const [origin, setOrigin] = useState('Mumbai (BOM)');
  const [destination, setDestination] = useState('Dubai (DXB)');
  const [departureDate, setDepartureDate] = useState('2026-05-25');
  const [travellers, setTravellers] = useState('1 Traveller, Economy');
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);
  const { openLead } = useLeadForm();

  const swapOriginDest = () => {
    const temp = origin;
    setOrigin(destination);
    setDestination(temp);
  };

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    // Routed to the unified lead form - no direct subscription endpoint.
    openLead(`Flight Deals Newsletter${newsletterEmail ? ` - ${newsletterEmail}` : ''}`);
    // Previous subscribe flow kept for reference:
    // if (!newsletterEmail || !newsletterEmail.includes('@')) {
    //   onShowToast('Please enter a valid email address.');
    //   return;
    // }
    // setNewsletterSubscribed(true);
    // onShowToast(`Subscribed! Flight discount alerts will be sent to ${newsletterEmail}`);
    // setNewsletterEmail('');
  };

  return (
    <main className="min-h-screen bg-white pb-16">
      {/* 1. BREADCRUMB & HEADER MATCHING SCREENSHOT */}
      <section className="max-w-6xl mx-auto px-6 pt-6">
        <div className="text-xs text-gray-500 mb-4">
          <span className="hover:text-gray-800 cursor-pointer">Home</span> &gt; <span className="text-gray-800 font-medium">Flights</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center pb-8">
          <div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold serif text-[#1a2b48] leading-tight mb-3">
              Flights
            </h1>
            <p className="text-sm text-gray-500 font-light max-w-md leading-relaxed">
              Find the best flight deals to your favorite destinations.
            </p>
          </div>

          <div className="h-52 sm:h-64 rounded-xl overflow-hidden shadow-xs">
            <img
              src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1200&q=80"
              alt="Flight soaring above blue sky"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* 2. FLIGHT SEARCH BAR CARD MATCHING SCREENSHOT */}
      <section className="max-w-6xl mx-auto px-6 mb-12">
        <div className="bg-white border border-gray-200/80 rounded-xl p-5 sm:p-6 shadow-sm">
          {/* Trip Type Radios */}
          <div className="flex gap-6 mb-4 text-xs font-semibold text-gray-700">
            {(['One Way', 'Round Trip', 'Multi City'] as const).map((type) => (
              <label key={type} className="flex items-center gap-1.5 cursor-pointer">
                <input
                  type="radio"
                  name="tripType"
                  checked={tripType === type}
                  onChange={() => setTripType(type)}
                  className="accent-[#800020]"
                />
                <span>{type}</span>
              </label>
            ))}
          </div>

          {/* Search Inputs Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 items-center">
            {/* From */}
            <div className="border border-gray-200 rounded-lg p-2.5 bg-gray-50/50">
              <span className="text-[10px] font-semibold text-gray-400 uppercase block">From</span>
              <input
                type="text"
                value={origin}
                onChange={(e) => setOrigin(e.target.value)}
                className="w-full text-xs sm:text-sm font-semibold text-gray-800 outline-none bg-transparent mt-0.5"
                placeholder="From City / Airport"
              />
            </div>

            {/* To */}
            <div className="relative border border-gray-200 rounded-lg p-2.5 bg-gray-50/50">
              <button
                type="button"
                onClick={swapOriginDest}
                className="hidden lg:flex absolute -left-3.5 top-1/2 -translate-y-1/2 bg-white border border-gray-200 rounded-full p-1 shadow-xs hover:text-[#800020] z-10 cursor-pointer"
                title="Swap"
              >
                <ArrowRightLeft size={11} />
              </button>
              <span className="text-[10px] font-semibold text-gray-400 uppercase block">To</span>
              <input
                type="text"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="w-full text-xs sm:text-sm font-semibold text-gray-800 outline-none bg-transparent mt-0.5"
                placeholder="To City / Airport"
              />
            </div>

            {/* Departure */}
            <div className="border border-gray-200 rounded-lg p-2.5 bg-gray-50/50">
              <span className="text-[10px] font-semibold text-gray-400 uppercase block">Departure</span>
              <div className="flex items-center gap-1 mt-0.5">
                <Calendar size={13} className="text-gray-400 shrink-0" />
                <input
                  type="date"
                  value={departureDate}
                  onChange={(e) => setDepartureDate(e.target.value)}
                  className="w-full text-xs font-semibold text-gray-800 outline-none bg-transparent"
                />
              </div>
            </div>

            {/* Travellers & Class */}
            <div className="border border-gray-200 rounded-lg p-2.5 bg-gray-50/50">
              <span className="text-[10px] font-semibold text-gray-400 uppercase block">Travellers & Class</span>
              <div className="flex items-center gap-1 mt-0.5">
                <Users size={13} className="text-gray-400 shrink-0" />
                <select
                  value={travellers}
                  onChange={(e) => setTravellers(e.target.value)}
                  className="w-full text-xs font-semibold text-gray-800 outline-none bg-transparent cursor-pointer"
                >
                  <option value="1 Traveller, Economy">1 Traveller, Economy</option>
                  <option value="2 Travellers, Economy">2 Travellers, Economy</option>
                  <option value="1 Traveller, Business">1 Traveller, Business</option>
                  <option value="Family, Economy">Family (2A, 2C)</option>
                </select>
              </div>
            </div>

            {/* Search Button */}
            <button
              type="button"
              onClick={() => openLead(`Flight Search — ${origin} to ${destination} • ${departureDate || 'flexible dates'} • ${travellers}`)}
              className="bg-[#800020] hover:bg-[#600018] text-white h-[50px] rounded-lg font-medium text-xs sm:text-sm flex items-center justify-center gap-1.5 shadow-xs transition-all cursor-pointer"
            >
              <span>Search Flights</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </section>

      {/* 3. POPULAR FLIGHT DEALS MATCHING SCREENSHOT */}
      <section className="max-w-6xl mx-auto px-6 mb-16">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl sm:text-2xl font-bold serif text-[#1a2b48]">Popular Flight Deals</h2>
          <button
            onClick={() => openLead('Flights Enquiry — All Deals')}
            className="text-xs sm:text-sm font-semibold text-gray-600 hover:text-[#800020] flex items-center gap-1 cursor-pointer"
          >
            <span>View All</span>
            <ArrowRight size={14} />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {FLIGHT_DEALS.map((deal) => (
            <div
              key={deal.id}
              onClick={() => openLead(`Flight Deal — ${deal.airline} ${deal.fromCode} to ${deal.toCode} • ${deal.price}`)}
              className="bg-white border border-gray-200/80 rounded-xl overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between group cursor-pointer"
            >
              <div>
                <div className="relative h-40 overflow-hidden">
                  <img
                    src={deal.image}
                    alt={deal.to}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  <div className="absolute top-2.5 right-2.5 bg-[#800020] text-white text-[10px] font-semibold px-2 py-0.5 rounded-md">
                    {deal.airline}
                  </div>
                </div>

                <div className="p-4 space-y-1">
                  <h3 className="text-sm font-bold serif text-[#1a2b48] group-hover:text-[#800020] transition-colors leading-tight flex items-center gap-1.5">
                    <span>{deal.from.split(' ')[0]}</span>
                    <Plane size={12} className="text-[#800020]" />
                    <span>{deal.to.split(' ')[0]}</span>
                  </h3>
                  <p className="text-[11px] text-gray-500 font-light">
                    {deal.departureDate} • {deal.type} • {deal.duration}
                  </p>
                </div>
              </div>

              <div className="p-4 pt-2 border-t border-gray-100 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-gray-400 block uppercase font-medium">From</span>
                  <span className="text-base font-bold serif text-[#800020]">₹{deal.price}</span>
                </div>
                <div className="w-7 h-7 rounded-full bg-rose-50 text-[#800020] group-hover:bg-[#800020] group-hover:text-white flex items-center justify-center transition-colors">
                  <ArrowRight size={13} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. WHY BOOK FLIGHTS WITH US? MATCHING SCREENSHOT */}
      <section className="bg-gray-50 py-14 border-y border-gray-100 mb-14">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-2xl font-bold serif text-[#1a2b48] mb-10">
            Why Book Flights With Us?
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Tag,
                title: 'Best Prices',
                desc: 'We compare prices from top airlines to get you the best deals.'
              },
              {
                icon: ShieldCheck,
                title: 'Safe & Secure',
                desc: 'Your booking is 100% secure with us.'
              },
              {
                icon: Headset,
                title: '24/7 Support',
                desc: 'Get assistance anytime, anywhere.'
              },
              {
                icon: CalendarCheck,
                title: 'Flexible Options',
                desc: 'Easy changes and cancellations on selected flights.'
              }
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} className="flex flex-col items-center text-center">
                  <div className="w-14 h-14 rounded-full bg-rose-50 border border-rose-100 text-[#800020] flex items-center justify-center mb-3 shadow-xs">
                    <Icon size={22} />
                  </div>
                  <h3 className="text-sm font-bold serif text-[#1a2b48] mb-1">{item.title}</h3>
                  <p className="text-xs text-gray-500 max-w-xs">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. GET EXCLUSIVE FLIGHT DEALS STRIP MATCHING SCREENSHOT */}
      <section className="max-w-6xl mx-auto px-6">
        <div className="bg-rose-50/70 border border-rose-200/80 rounded-xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3.5 text-center md:text-left">
            <div className="w-11 h-11 rounded-full bg-[#800020] text-white flex items-center justify-center shrink-0">
              <Mail size={20} />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#1a2b48] serif">Get Exclusive Flight Deals</h3>
              <p className="text-xs text-gray-600 font-light">Subscribe to get amazing offers and travel updates.</p>
            </div>
          </div>

          <form onSubmit={handleNewsletter} className="flex w-full md:w-auto gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              className="p-2.5 px-3.5 bg-white border border-gray-200 rounded-lg text-xs outline-none focus:border-[#800020] w-full md:w-64"
              required
            />
            <button
              type="submit"
              className="bg-[#800020] hover:bg-[#600018] text-white px-5 py-2.5 rounded-lg text-xs font-semibold shadow-xs transition-colors whitespace-nowrap cursor-pointer"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </main>
  );
};
export default FlightsPage;
