import React, { useState } from 'react';
import { X, Star, MapPin, Check, Sparkles, ShieldCheck, ArrowRight } from 'lucide-react';
// Unused icons cleaned up: Wifi, Coffee, Waves, User, Mail, Phone, Calendar
// import { X, Star, MapPin, Check, Wifi, Coffee, Waves, Sparkles, ShieldCheck, ArrowRight, User, Mail, Phone, Calendar } from 'lucide-react';
import { Hotel } from '../data/travelData';
import { useLeadForm } from '../context/LeadContext';

interface HotelDetailModalProps {
  hotel: Hotel | null;
  onClose: () => void;
  onBookSuccess: (details: { hotel: Hotel; guestName: string; nights: number; total: number }) => void;
}

export const HotelDetailModal: React.FC<HotelDetailModalProps> = ({ hotel, onClose, onBookSuccess }) => {
  const [nights, setNights] = useState(3);
  const [roomsCount, setRoomsCount] = useState(1);
  const [guestName, setGuestName] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [checkInDate, setCheckInDate] = useState('2026-05-25');
  const [isBooked, setIsBooked] = useState(false);
  const { openLead } = useLeadForm();

  if (!hotel) return null;

  const totalAmount = hotel.rawPrice * nights * roomsCount;
  const taxes = Math.round(totalAmount * 0.18);
  const grandTotal = totalAmount + taxes;

  const handleConfirmHotel = (e: React.FormEvent) => {
    e.preventDefault();
    // Routed to the unified lead form - no direct submission from this modal.
    openLead(`Hotel Booking - ${hotel.name}, ${nights} night(s), ${roomsCount} room(s), check-in ${checkInDate}`);
    onClose();
    // Previous booking flow kept for reference:
    // if (!guestName || !guestEmail || !guestPhone) {
    //   alert('Please fill out guest name, email and phone.');
    //   return;
    // }
    // setIsBooked(true);
    // onBookSuccess({
    //   hotel,
    //   guestName,
    //   nights,
    //   total: grandTotal
    // });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-3xl rounded-2xl shadow-2xl border border-gray-100 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Top Image Banner */}
        <div className="relative h-60 w-full shrink-0">
          <img src={hotel.image} alt={hotel.name} className="w-full h-full object-cover brightness-90" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent p-6 flex flex-col justify-between text-white">
            <div className="flex justify-between items-start">
              <div className="flex gap-1 bg-black/50 backdrop-blur-sm px-2.5 py-1 rounded-full text-amber-400 text-xs font-bold">
                {Array.from({ length: hotel.stars }).map((_, i) => (
                  <Star key={i} size={12} fill="currentColor" />
                ))}
                <span className="ml-1 text-white">{hotel.stars}-Star Luxury Hotel</span>
              </div>
              <button onClick={onClose} className="bg-black/50 hover:bg-black/80 text-white p-2 rounded-full cursor-pointer">
                <X size={18} />
              </button>
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-black">{hotel.name}</h2>
              <p className="text-xs text-gray-300 flex items-center gap-1 mt-1">
                <MapPin size={13} className="text-brand-orange" /> {hotel.address}
              </p>
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {isBooked ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <ShieldCheck size={36} />
              </div>
              <h3 className="text-2xl font-black text-brand-navy">Hotel Reservation Confirmed!</h3>
              <p className="text-sm text-gray-600">
                Reservation Voucher generated for <strong>{guestName}</strong> at <strong>{hotel.name}</strong>.
              </p>
              <div className="bg-gray-50 p-4 rounded-xl max-w-md mx-auto text-xs text-left space-y-2 border">
                <div className="flex justify-between"><span>Check-in Date:</span><span className="font-bold">{checkInDate}</span></div>
                <div className="flex justify-between"><span>Duration:</span><span className="font-bold">{nights} Nights, {roomsCount} Room</span></div>
                <div className="flex justify-between"><span>Room Type:</span><span className="font-bold">{hotel.roomType}</span></div>
                <div className="flex justify-between text-brand-maroon font-bold text-sm pt-1 border-t">
                  <span>Total Paid:</span><span>₹{grandTotal.toLocaleString('en-IN')}</span>
                </div>
              </div>
              <button onClick={onClose} className="bg-brand-maroon text-white px-8 py-2.5 rounded-xl font-bold text-sm">
                Close
              </button>
            </div>
          ) : (
            <form onSubmit={handleConfirmHotel} className="space-y-6">
              {/* Hotel Bio & Amenities */}
              <div>
                <p className="text-xs text-gray-600 leading-relaxed mb-4">{hotel.description}</p>
                <h4 className="font-bold text-xs uppercase tracking-wider text-brand-navy mb-2">Featured Amenities</h4>
                <div className="flex flex-wrap gap-2">
                  {hotel.amenities.map((amenity, i) => (
                    <span key={i} className="text-xs bg-gray-100 text-gray-700 font-medium px-3 py-1 rounded-full flex items-center gap-1.5 border border-gray-200">
                      <Check size={12} className="text-brand-maroon" /> {amenity}
                    </span>
                  ))}
                </div>
              </div>

              {/* Booking Config */}
              <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="text-[11px] font-bold text-gray-500">Check-in Date</label>
                  <input
                    type="date"
                    value={checkInDate}
                    onChange={(e) => setCheckInDate(e.target.value)}
                    className="w-full p-2 border rounded-lg text-xs bg-white mt-1 outline-none font-bold"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-gray-500">Nights</label>
                  <select
                    value={nights}
                    onChange={(e) => setNights(Number(e.target.value))}
                    className="w-full p-2 border rounded-lg text-xs bg-white mt-1 outline-none font-bold"
                  >
                    {[1, 2, 3, 4, 5, 7, 10, 14].map(n => (
                      <option key={n} value={n}>{n} {n === 1 ? 'Night' : 'Nights'}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-[11px] font-bold text-gray-500">Rooms</label>
                  <select
                    value={roomsCount}
                    onChange={(e) => setRoomsCount(Number(e.target.value))}
                    className="w-full p-2 border rounded-lg text-xs bg-white mt-1 outline-none font-bold"
                  >
                    {[1, 2, 3, 4].map(n => (
                      <option key={n} value={n}>{n} {n === 1 ? 'Room' : 'Rooms'}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Guest Form */}
              <div className="space-y-3">
                <h4 className="font-bold text-xs uppercase tracking-wider text-brand-navy">Guest Contact Information</h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="text-[11px] font-bold text-gray-500">Primary Guest Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Priya Sharma"
                      value={guestName}
                      onChange={(e) => setGuestName(e.target.value)}
                      className="w-full p-2.5 border rounded-lg text-sm bg-white mt-1 outline-none focus:border-brand-maroon"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-gray-500">Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="priya@example.com"
                      value={guestEmail}
                      onChange={(e) => setGuestEmail(e.target.value)}
                      className="w-full p-2.5 border rounded-lg text-sm bg-white mt-1 outline-none focus:border-brand-maroon"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-gray-500">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={guestPhone}
                      onChange={(e) => setGuestPhone(e.target.value)}
                      className="w-full p-2.5 border rounded-lg text-sm bg-white mt-1 outline-none focus:border-brand-maroon"
                    />
                  </div>
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="border-t pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <span className="text-xs text-gray-400">Total Price ({nights} Nights + 18% GST)</span>
                  <p className="text-2xl font-black text-brand-maroon">₹{grandTotal.toLocaleString('en-IN')}</p>
                </div>
                <button
                  type="submit"
                  className="w-full sm:w-auto bg-brand-maroon hover:bg-brand-maroon-dark text-white px-8 py-3 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-brand-maroon/20 transition-all cursor-pointer"
                >
                  <span>Confirm Hotel Booking</span>
                  <ArrowRight size={18} />
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
export default HotelDetailModal;
