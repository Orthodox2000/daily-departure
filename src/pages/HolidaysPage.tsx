import React, { useState } from 'react';
import { 
  MapPin, Calendar, Clock, Users, ArrowRight, 
  Tag, ShieldCheck, Headset, CalendarCheck, Lock, Send
} from 'lucide-react';
// Unused icons cleaned up: Palmtree, ChevronDown
// import { 
//   Palmtree, MapPin, Calendar, Clock, Users, ArrowRight, 
//   Tag, ShieldCheck, Headset, CalendarCheck, Lock, Send, CheckCircle2, ChevronDown
// } from 'lucide-react';
import { HOLIDAY_PACKAGES } from '../data/travelData';
import type { HolidayPackage } from '../data/travelData';
import { PackageCard } from '../components/PackageCard';
import { PackageDetailModal } from '../components/PackageDetailModal';
import { useLeadForm } from '../context/LeadContext';

interface HolidaysPageProps {
  onShowToast: (msg: string) => void;
}

export const HolidaysPage: React.FC<HolidaysPageProps> = ({ 
  onShowToast 
}) => {
  // Search state
  const [searchDest, setSearchDest] = useState('');
  const [searchTravelers, setSearchTravelers] = useState('2 Travellers');
  const [searchDepartFrom, setSearchDepartFrom] = useState('');
  const [searchDepartTo, setSearchDepartTo] = useState('');
  const [searchDuration, setSearchDuration] = useState('Any Duration');
  const [selectedPkg, setSelectedPkg] = useState<HolidayPackage | null>(null);
  const { openLead } = useLeadForm();

  const departureLabel = searchDepartFrom && searchDepartTo
    ? `${searchDepartFrom} to ${searchDepartTo}`
    : searchDepartFrom || searchDepartTo || 'Anytime';

  const filteredPackages = HOLIDAY_PACKAGES.filter((p) => {
    if (!searchDest) return true;
    return p.title.toLowerCase().includes(searchDest.toLowerCase()) ||
           p.destination.toLowerCase().includes(searchDest.toLowerCase()) ||
           p.country.toLowerCase().includes(searchDest.toLowerCase());
  });

  return (
    <main className="min-h-screen bg-white pb-16">
      {/* 1. BREADCRUMB & HEADER MATCHING SCREENSHOT */}
      <section className="max-w-6xl mx-auto px-6 pt-6">
        <div className="text-xs text-gray-500 mb-4">
          <span className="hover:text-gray-800 cursor-pointer">Home</span> &gt; <span className="text-gray-800 font-medium">Holidays</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center pb-8">
          <div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold serif text-[#1a2b48] leading-tight mb-3">
              Explore Amazing <br />
              <span className="text-[#1a2b48]">Holiday Packages</span>
            </h1>
            <p className="text-sm text-gray-500 font-light max-w-md leading-relaxed">
              Handpicked destinations and experiences for your perfect getaway.
            </p>
          </div>

          <div className="h-52 sm:h-64 rounded-xl overflow-hidden shadow-xs">
            <img
              src="https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1200&q=80"
              alt="Tropical overwater villas"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* 2. SEARCH BAR WIDGET MATCHING SCREENSHOT */}
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
                  value={searchDest}
                  onChange={(e) => setSearchDest(e.target.value)}
                  className="w-full text-xs font-semibold text-gray-800 outline-none bg-transparent"
                />
              </div>
            </div>

            {/* Travelers */}
            <div className="border border-gray-200 rounded-lg p-2.5 bg-gray-50/50">
              <span className="text-[10px] font-semibold text-gray-400 uppercase block">Travelers</span>
              <div className="flex items-center gap-1.5 mt-0.5">
                <Users size={14} className="text-gray-400 shrink-0" />
                <select
                  value={searchTravelers}
                  onChange={(e) => setSearchTravelers(e.target.value)}
                  className="w-full text-xs font-semibold text-gray-800 outline-none bg-transparent cursor-pointer"
                >
                  <option value="1 Traveller">1 Traveller</option>
                  <option value="2 Travellers">2 Travellers</option>
                  <option value="3 Travellers">3 Travellers</option>
                  <option value="Family (4+)">Family (4+)</option>
                </select>
              </div>
            </div>

            {/* Departure - optional date range (no hardcoded dates) */}
            <div className="border border-gray-200 rounded-lg p-2.5 bg-gray-50/50">
              <span className="text-[10px] font-semibold text-gray-400 uppercase block">Departure (optional)</span>
              <div className="flex items-center gap-1 mt-0.5">
                <Calendar size={14} className="text-gray-400 shrink-0" />
                <input
                  type="date"
                  value={searchDepartFrom}
                  onChange={(e) => setSearchDepartFrom(e.target.value)}
                  className="w-full text-xs font-semibold text-gray-800 outline-none bg-transparent"
                />
              </div>
              <div className="flex items-center gap-1 mt-1">
                <ArrowRight size={14} className="text-gray-400 shrink-0" />
                <input
                  type="date"
                  value={searchDepartTo}
                  min={searchDepartFrom || undefined}
                  onChange={(e) => setSearchDepartTo(e.target.value)}
                  className="w-full text-xs font-semibold text-gray-800 outline-none bg-transparent"
                />
              </div>
            </div>

            {/* Duration */}
            <div className="border border-gray-200 rounded-lg p-2.5 bg-gray-50/50">
              <span className="text-[10px] font-semibold text-gray-400 uppercase block">Duration</span>
              <div className="flex items-center gap-1.5 mt-0.5">
                <Clock size={14} className="text-gray-400 shrink-0" />
                <select
                  value={searchDuration}
                  onChange={(e) => setSearchDuration(e.target.value)}
                  className="w-full text-xs font-semibold text-gray-800 outline-none bg-transparent cursor-pointer"
                >
                  <option value="Any Duration">Any Duration</option>
                  <option value="3-4 Days">3 - 4 Days</option>
                  <option value="5-7 Days">5 - 7 Days</option>
                  <option value="8+ Days">8+ Days</option>
                </select>
              </div>
            </div>

            {/* Submit */}
            <button
              type="button"
              onClick={() => openLead(`Holiday Search — ${searchDest || 'Any destination'} • ${searchTravelers} • Departing ${departureLabel} • ${searchDuration}`)}
              className="bg-[#800020] hover:bg-[#600018] text-white h-[50px] rounded-lg font-medium text-xs sm:text-sm flex items-center justify-center gap-1.5 shadow-xs transition-all cursor-pointer"
            >
              <span>Search Holidays</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </section>

      {/* 3. TWO COLUMN LAYOUT: PACKAGES (LEFT) & INQUIRY FORM (RIGHT) */}
      <section className="max-w-6xl mx-auto px-6 mb-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Popular Holiday Packages (approx 8 cols) */}
          <div className="lg:col-span-8">
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-xl sm:text-2xl font-bold serif text-[#1a2b48]">Popular Holiday Packages</h2>
              <span className="text-xs text-gray-500 font-medium">Showing {filteredPackages.length} packages</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {filteredPackages.map((pkg) => (
                <PackageCard key={pkg.id} pkg={pkg} onView={setSelectedPkg} />
              ))}
            </div>
          </div>

          {/* Right Column: Plan Your Holiday CTA (opens the unified enquiry form) */}
          <div className="lg:col-span-4">
            <div className="bg-white border border-gray-200/90 rounded-xl p-5 sm:p-6 shadow-sm sticky top-24 text-center">
              <h3 className="text-lg font-bold serif text-[#1a2b48] mb-1">Plan Your Holiday</h3>
              <p className="text-xs text-gray-500 mb-5 leading-relaxed font-light">
                Tell us where you want to go — our travel experts will design the perfect itinerary and call you back with the best price.
              </p>
              <button
                type="button"
                onClick={() => openLead(`Holiday Enquiry${searchDest ? ` — ${searchDest}` : ''} • ${searchTravelers} • Departing ${departureLabel}`)}
                className="w-full bg-[#800020] hover:bg-[#600018] text-white py-3 rounded-lg text-sm font-semibold flex items-center justify-center gap-2 shadow-xs transition-all cursor-pointer"
              >
                <span>Start My Holiday Plan</span>
                <Send size={14} />
              </button>
              <p className="text-[10px] text-gray-400 flex items-center justify-center gap-1 pt-3 font-light">
                <Lock size={10} className="text-gray-400" />
                <span>Your information is safe with us.</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. WHY BOOK HOLIDAYS WITH US? MATCHING SCREENSHOT */}
      <section className="bg-gray-50 py-12 border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-2xl font-bold serif text-[#1a2b48] mb-8">
            Why Book Holidays With Us?
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Tag,
                title: 'Best Price Guarantee',
                desc: 'We ensure you get the best deals.'
              },
              {
                icon: ShieldCheck,
                title: 'Trusted Travel Experts',
                desc: 'Experienced professionals to plan your perfect trip.'
              },
              {
                icon: Headset,
                title: '24/7 Support',
                desc: "We're here to help you anytime."
              },
              {
                icon: CalendarCheck,
                title: 'Flexible Booking',
                desc: 'Easy changes and cancellations.'
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

      {selectedPkg && (
        <PackageDetailModal
          pkg={selectedPkg}
          onClose={() => setSelectedPkg(null)}
          onEnquire={() => {
            const p = selectedPkg;
            setSelectedPkg(null);
            openLead(`Holiday Package — ${p.title} (${p.duration}) • ${p.price}`);
          }}
        />
      )}
    </main>
  );
};
export default HolidaysPage;
