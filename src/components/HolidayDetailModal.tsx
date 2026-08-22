import React, { useState } from 'react';
import { X, Star, Check, Ban, Clock, Send, Sparkles, CheckCircle2 } from 'lucide-react';
// Unused icons cleaned up: Calendar, MapPin, ShieldCheck, Users
// import { X, Star, Calendar, Check, Ban, Clock, MapPin, Send, ShieldCheck, Users, Sparkles, CheckCircle2 } from 'lucide-react';
import { HolidayPackage } from '../data/travelData';
import { useLeadForm } from '../context/LeadContext';

interface HolidayDetailModalProps {
  pkg: HolidayPackage | null;
  onClose: () => void;
  onInquirySubmitted: (message: string) => void;
}

export const HolidayDetailModal: React.FC<HolidayDetailModalProps> = ({ pkg, onClose, onInquirySubmitted }) => {
  const [activeTab, setActiveTab] = useState<'itinerary' | 'inclusions' | 'inquire'>('itinerary');
  const [travelersCount, setTravelersCount] = useState(2);
  const [travelDate, setTravelDate] = useState('2026-06-15');
  const [guestName, setGuestName] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const { openLead } = useLeadForm();

  if (!pkg) return null;

  const calculatedTotal = pkg.rawPrice * travelersCount;

  const handleSubmitInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    // Routed to the unified lead form - no direct submission from this modal.
    openLead(`Holiday Package - ${pkg.title} (${pkg.duration}) for ${travelersCount} traveler(s)`);
    onClose();
    // Previous inquiry flow kept for reference:
    // if (!guestName || !guestPhone || !guestEmail) {
    //   alert('Please fill out your name, phone and email.');
    //   return;
    // }
    // setSubmitted(true);
    // onInquirySubmitted(`Booking inquiry received for ${pkg.title}! Our holiday specialist will call you on ${guestPhone} within 30 minutes.`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-4xl rounded-sm shadow-2xl border border-[#e5e5e5] overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header with Hero Image Banner */}
        <div className="relative h-60 sm:h-72 w-full shrink-0">
          <img 
            src={pkg.image} 
            alt={pkg.title}
            className="w-full h-full object-cover brightness-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent p-6 flex flex-col justify-between text-white">
            <div className="flex justify-between items-start">
              <span className="bg-brand-maroon text-white text-[10px] font-bold px-3 py-1 rounded-sm uppercase tracking-widest shadow-xs">
                {pkg.category} Holiday
              </span>
              <button 
                onClick={onClose}
                className="bg-black/50 hover:bg-black/80 text-white p-2 rounded-full backdrop-blur-xs transition cursor-pointer"
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>

            <div>
              <div className="flex items-center gap-2 text-amber-300 text-xs font-semibold mb-1">
                <Star size={13} fill="currentColor" />
                <span>{pkg.rating} ({pkg.reviewsCount} verified traveler reviews)</span>
                <span className="text-white/60">•</span>
                <span className="text-white flex items-center gap-1"><Clock size={12}/> {pkg.duration}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold serif leading-tight drop-shadow-sm">
                {pkg.title}
              </h2>
            </div>
          </div>
        </div>

        {/* Modal Navigation Tabs */}
        <div className="flex border-b border-[#e5e5e5] bg-[#FAF9F6] px-6">
          <button
            onClick={() => setActiveTab('itinerary')}
            className={`py-3.5 px-4 font-semibold text-xs sm:text-sm border-b-2 transition cursor-pointer ${
              activeTab === 'itinerary'
                ? 'border-brand-maroon text-brand-maroon bg-white'
                : 'border-transparent text-gray-500 hover:text-gray-900'
            }`}
          >
            Day-by-Day Itinerary
          </button>
          <button
            onClick={() => setActiveTab('inclusions')}
            className={`py-3.5 px-4 font-semibold text-xs sm:text-sm border-b-2 transition cursor-pointer ${
              activeTab === 'inclusions'
                ? 'border-brand-maroon text-brand-maroon bg-white'
                : 'border-transparent text-gray-500 hover:text-gray-900'
            }`}
          >
            Inclusions & Exclusions
          </button>
          <button
            onClick={() => setActiveTab('inquire')}
            className={`py-3.5 px-4 font-semibold text-xs sm:text-sm border-b-2 transition cursor-pointer ${
              activeTab === 'inquire'
                ? 'border-brand-maroon text-brand-maroon bg-white'
                : 'border-transparent text-gray-500 hover:text-gray-900'
            }`}
          >
            Book / Customize Trip
          </button>
        </div>

        {/* Modal Content Scrollable Area */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {/* TAB 1: ITINERARY */}
          {activeTab === 'itinerary' && (
            <div className="space-y-6">
              {/* Highlights */}
              <div className="bg-amber-50/70 border border-amber-200/80 rounded-xl p-4">
                <h4 className="font-bold text-xs uppercase tracking-wider text-amber-900 mb-2.5 flex items-center gap-1.5">
                  <Sparkles size={14} className="text-brand-orange" />
                  Key Experience Highlights
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {pkg.highlights.map((highlight, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-amber-950 font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-orange shrink-0"></span>
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Day-by-Day Accordion / Flow */}
              <div>
                <h3 className="font-bold text-base text-brand-navy mb-4">Detailed Tour Program</h3>
                <div className="space-y-4 relative before:absolute before:left-4 before:top-2 before:bottom-2 before:w-0.5 before:bg-gray-200">
                  {pkg.itinerary.map((item) => (
                    <div key={item.day} className="relative pl-10">
                      <div className="absolute left-2 top-0.5 w-5 h-5 rounded-full bg-brand-maroon text-white text-[11px] font-bold flex items-center justify-center -translate-x-1/2 ring-4 ring-white shadow-xs">
                        {item.day}
                      </div>
                      <div className="bg-gray-50 border border-gray-200/70 rounded-xl p-4 hover:bg-white hover:shadow-xs transition">
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <h4 className="font-bold text-sm text-brand-navy">
                            Day {item.day}: {item.title}
                          </h4>
                          <span className="text-[10px] text-gray-400 font-semibold uppercase">Included Tour</span>
                        </div>
                        <p className="text-xs text-gray-600 leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: INCLUSIONS & EXCLUSIONS */}
          {activeTab === 'inclusions' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-emerald-50/60 border border-emerald-200/80 rounded-xl p-5">
                <h4 className="font-bold text-sm text-emerald-900 mb-4 flex items-center gap-2">
                  <Check size={18} className="text-emerald-600" />
                  What's Included
                </h4>
                <ul className="space-y-3">
                  {pkg.inclusions.map((inc, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs text-emerald-950 font-medium">
                      <CheckCircle2 size={15} className="text-emerald-600 shrink-0 mt-0.5" />
                      <span>{inc}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-rose-50/60 border border-rose-200/80 rounded-xl p-5">
                <h4 className="font-bold text-sm text-rose-900 mb-4 flex items-center gap-2">
                  <Ban size={18} className="text-rose-600" />
                  What's Not Included
                </h4>
                <ul className="space-y-3">
                  {pkg.exclusions.map((exc, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs text-rose-950 font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0 mt-1.5"></span>
                      <span>{exc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* TAB 3: INQUIRE / BOOK */}
          {activeTab === 'inquire' && (
            <div>
              {submitted ? (
                <div className="text-center py-8 space-y-4">
                  <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 size={36} />
                  </div>
                  <h3 className="text-xl font-bold text-brand-navy">Holiday Inquiry Submitted!</h3>
                  <p className="text-sm text-gray-600 max-w-md mx-auto">
                    Thank you, <strong>{guestName}</strong>. Our senior destination specialist has been assigned to your request and will contact you via WhatsApp & Call on <strong>{guestPhone}</strong>.
                  </p>
                  <button
                    onClick={onClose}
                    className="bg-brand-maroon text-white px-6 py-2.5 rounded-xl font-bold text-sm"
                  >
                    Back to Explore
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmitInquiry} className="space-y-5">
                  <div className="bg-gray-50 p-4 rounded-xl flex flex-wrap items-center justify-between gap-4 border border-gray-200">
                    <div>
                      <span className="text-xs text-gray-400">Package Starting Price</span>
                      <p className="text-xl font-black text-brand-maroon">
                        {pkg.price} <span className="text-xs font-normal text-gray-500">/ person</span>
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <label className="text-xs font-bold text-gray-600">Travelers:</label>
                      <select
                        value={travelersCount}
                        onChange={(e) => setTravelersCount(Number(e.target.value))}
                        className="p-2 border rounded-lg text-sm bg-white font-bold"
                      >
                        {[1, 2, 3, 4, 5, 6, 8, 10].map(n => (
                          <option key={n} value={n}>{n} {n === 1 ? 'Person' : 'Persons'}</option>
                        ))}
                      </select>
                    </div>
                    <div className="text-right">
                      <span className="text-xs text-gray-400">Estimated Total</span>
                      <p className="text-xl font-black text-brand-navy">
                        ₹{calculatedTotal.toLocaleString('en-IN')}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-gray-600">Your Full Name *</label>
                      <input 
                        type="text" 
                        required
                        placeholder="e.g. Anand Verma"
                        value={guestName}
                        onChange={(e) => setGuestName(e.target.value)}
                        className="w-full p-2.5 border rounded-lg text-sm bg-white outline-none focus:border-brand-maroon mt-1"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-gray-600">Phone Number (with WhatsApp) *</label>
                      <input 
                        type="tel" 
                        required
                        placeholder="+91 98765 43210"
                        value={guestPhone}
                        onChange={(e) => setGuestPhone(e.target.value)}
                        className="w-full p-2.5 border rounded-lg text-sm bg-white outline-none focus:border-brand-maroon mt-1"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-gray-600">Email Address *</label>
                      <input 
                        type="email" 
                        required
                        placeholder="anand@example.com"
                        value={guestEmail}
                        onChange={(e) => setGuestEmail(e.target.value)}
                        className="w-full p-2.5 border rounded-lg text-sm bg-white outline-none focus:border-brand-maroon mt-1"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-gray-600">Target Travel Date *</label>
                      <input 
                        type="date" 
                        required
                        value={travelDate}
                        onChange={(e) => setTravelDate(e.target.value)}
                        className="w-full p-2.5 border rounded-lg text-sm bg-white outline-none focus:border-brand-maroon mt-1"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-gray-600">Special Preferences or Custom Requests</label>
                    <textarea
                      placeholder="e.g. Need sea-view room upgrade, candlelight dinner on 2nd night, vegetarian food only..."
                      value={specialRequests}
                      onChange={(e) => setSpecialRequests(e.target.value)}
                      className="w-full p-2.5 border rounded-lg text-sm bg-white outline-none focus:border-brand-maroon mt-1 h-20"
                    ></textarea>
                  </div>

                  <div className="pt-2 flex justify-end gap-3">
                    <button
                      type="submit"
                      className="bg-brand-maroon hover:bg-brand-maroon-dark text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2 shadow-md transition cursor-pointer"
                    >
                      <Send size={16} />
                      <span>Request Customized Itinerary Quote</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}
        </div>

        {/* Footer actions */}
        {activeTab !== 'inquire' && (
          <div className="bg-gray-50 border-t border-gray-200 px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <span className="text-xs text-gray-400 block">Package Price (All Inclusive)</span>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-black text-brand-maroon">{pkg.price}</span>
                <span className="text-xs text-gray-400 line-through">{pkg.originalPrice}</span>
              </div>
            </div>
            <div className="flex gap-3 w-full sm:w-auto">
              <button
                onClick={() => setActiveTab('inquire')}
                className="w-full sm:w-auto bg-brand-maroon hover:bg-brand-maroon-dark text-white px-8 py-2.5 rounded-xl font-bold text-sm shadow-md transition cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Book This Package</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default HolidayDetailModal;
