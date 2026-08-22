import React, { useState } from 'react';
import { X, Plane, Hotel, Palmtree, FileCheck, CheckCircle2, ShieldCheck, ArrowRight } from 'lucide-react';
// Unused data imports cleaned up - destination options are hardcoded in the select below
// import { POPULAR_DESTINATIONS, HOLIDAY_PACKAGES, HOTELS_DATA, VISA_DESTINATIONS } from '../data/travelData';
import { useLeadForm } from '../context/LeadContext';

interface UniversalBookingModalProps {
  initialService?: 'Flights' | 'Hotels' | 'Holidays' | 'Visa';
  onClose: () => void;
  onSuccess: (message: string) => void;
}

export const UniversalBookingModal: React.FC<UniversalBookingModalProps> = ({
  initialService = 'Holidays',
  onClose,
  onSuccess,
}) => {
  const [service, setService] = useState<'Flights' | 'Hotels' | 'Holidays' | 'Visa'>(initialService);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [destination, setDestination] = useState('Maldives');
  const [travelDate, setTravelDate] = useState('2026-06-15');
  const [passengers, setPassengers] = useState(2);
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const { openLead } = useLeadForm();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Routed to the unified lead form - no direct submission from this modal.
    openLead(`${service} Booking - ${destination}, ${passengers} traveler(s), departure ${travelDate}`);
    onClose();
    // Previous booking flow kept for reference:
    // if (!name || !phone || !email) {
    //   alert('Please fill out your contact details.');
    //   return;
    // }
    // setSubmitted(true);
    // onSuccess(`Thank you ${name}! Your ${service} reservation request for ${destination} has been received. Our concierge will call ${phone} promptly.`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-gray-100 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Top Header */}
        <div className="bg-brand-maroon text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-black italic">D'</span>
            <div>
              <h3 className="font-extrabold text-lg leading-tight">Daily Departure Instant Booking</h3>
              <p className="text-xs text-white/80">Tailored flights, hotels, tour packages & fast-track visas</p>
            </div>
          </div>
          <button onClick={onClose} className="text-white/80 hover:text-white p-1 rounded-md cursor-pointer">
            <X size={20} />
          </button>
        </div>

        {/* Service Selector Tabs */}
        <div className="grid grid-cols-4 bg-gray-100 border-b border-gray-200 text-xs font-bold text-gray-600">
          {[
            { id: 'Holidays' as const, label: 'Holiday Package', icon: Palmtree },
            { id: 'Flights' as const, label: 'Flight Booking', icon: Plane },
            { id: 'Hotels' as const, label: 'Hotel Stay', icon: Hotel },
            { id: 'Visa' as const, label: 'Visa Service', icon: FileCheck },
          ].map((tab) => {
            const Icon = tab.icon;
            const active = service === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setService(tab.id)}
                className={`py-3 px-2 flex flex-col sm:flex-row items-center justify-center gap-1.5 transition cursor-pointer ${
                  active ? 'bg-white text-brand-maroon border-b-2 border-brand-maroon shadow-xs' : 'hover:bg-gray-200/60'
                }`}
              >
                <Icon size={15} />
                <span className="truncate">{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Form Body */}
        <div className="p-6 overflow-y-auto space-y-5 flex-1">
          {submitted ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 size={36} />
              </div>
              <h3 className="text-2xl font-black text-brand-navy">Booking Request Received!</h3>
              <p className="text-sm text-gray-600 max-w-md mx-auto">
                Booking ID: <strong className="text-brand-maroon">DD-{Math.floor(100000 + Math.random() * 900000)}</strong>. Our dedicated travel officer will share available deals on <strong>{phone}</strong>.
              </p>
              <button onClick={onClose} className="bg-brand-maroon text-white px-8 py-2.5 rounded-xl font-bold text-sm">
                Close Window
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-bold text-gray-500">Destination / Country *</label>
                  <select
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    className="w-full p-2.5 border rounded-lg text-sm bg-white mt-1 outline-none font-semibold focus:border-brand-maroon"
                  >
                    <option value="Maldives">Maldives</option>
                    <option value="Dubai / UAE">Dubai / UAE</option>
                    <option value="Switzerland & Paris">Switzerland & Paris (Europe)</option>
                    <option value="Bali, Indonesia">Bali, Indonesia</option>
                    <option value="Phuket & Bangkok (Thailand)">Phuket & Bangkok (Thailand)</option>
                    <option value="Singapore">Singapore</option>
                    <option value="London (United Kingdom)">London (United Kingdom)</option>
                    <option value="New York (USA)">New York (USA)</option>
                  </select>
                </div>
                <div>
                  <label className="text-[11px] font-bold text-gray-500">Expected Departure Date *</label>
                  <input
                    type="date"
                    required
                    value={travelDate}
                    onChange={(e) => setTravelDate(e.target.value)}
                    className="w-full p-2.5 border rounded-lg text-sm bg-white mt-1 outline-none focus:border-brand-maroon font-semibold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="text-[11px] font-bold text-gray-500">Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rahul Sharma"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-2.5 border rounded-lg text-sm bg-white mt-1 outline-none focus:border-brand-maroon"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-gray-500">Mobile Phone *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full p-2.5 border rounded-lg text-sm bg-white mt-1 outline-none focus:border-brand-maroon"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-gray-500">Number of Travelers</label>
                  <select
                    value={passengers}
                    onChange={(e) => setPassengers(Number(e.target.value))}
                    className="w-full p-2.5 border rounded-lg text-sm bg-white mt-1 outline-none font-semibold"
                  >
                    {[1, 2, 3, 4, 5, 6, 8, 10, 15].map(n => (
                      <option key={n} value={n}>{n} {n === 1 ? 'Traveler' : 'Travelers'}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="text-[11px] font-bold text-gray-500">Email Address *</label>
                <input
                  type="email"
                  required
                  placeholder="rahul@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-2.5 border rounded-lg text-sm bg-white mt-1 outline-none focus:border-brand-maroon"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-gray-500">Special Notes or Questions (Optional)</label>
                <textarea
                  placeholder="e.g. Need hotel upgrade, vegetarian meals, flight with minimum layover..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full p-2.5 border rounded-lg text-sm bg-white mt-1 outline-none focus:border-brand-maroon h-16"
                ></textarea>
              </div>

              <div className="bg-amber-50 p-3 rounded-lg flex items-center gap-2 text-xs text-amber-800 border border-amber-200">
                <ShieldCheck size={16} className="text-amber-600 shrink-0" />
                <span>Zero cancellation penalty within 24 hours of booking confirmation.</span>
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-2.5 rounded-xl border text-sm font-semibold text-gray-600 hover:bg-gray-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-brand-maroon hover:bg-brand-maroon-dark text-white px-8 py-2.5 rounded-xl font-bold text-sm shadow-md transition flex items-center gap-2 cursor-pointer"
                >
                  <span>Submit Booking Request</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
export default UniversalBookingModal;
