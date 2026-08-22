import React, { useState } from 'react';
import { X, Plane, CheckCircle2, ShieldCheck, CreditCard, ArrowRight, User, Mail } from 'lucide-react';
// Unused icons cleaned up: Luggage, Phone, Calendar
// import { X, Plane, CheckCircle2, Luggage, ShieldCheck, CreditCard, ArrowRight, User, Mail, Phone, Calendar } from 'lucide-react';
import { FlightDeal } from '../data/travelData';
import { useLeadForm } from '../context/LeadContext';

interface FlightBookingModalProps {
  flight: FlightDeal | null;
  onClose: () => void;
  onSuccess: (bookingDetails: { pnr: string; flight: FlightDeal; travelerName: string; total: number }) => void;
}

export const FlightBookingModal: React.FC<FlightBookingModalProps> = ({ flight, onClose, onSuccess }) => {
  const [step, setStep] = useState<'details' | 'seats' | 'payment' | 'confirmed'>('details');
  const { openLead } = useLeadForm();
  
  // Passenger Form
  const [title, setTitle] = useState('Mr');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [seat, setSeat] = useState('14A (Window)');
  const [mealPreference, setMealPreference] = useState('Asian Vegetarian');
  const [addInsurance, setAddInsurance] = useState(true);
  const [addExcessLuggage, setAddExcessLuggage] = useState(false);
  const [pnr, setPnr] = useState('');

  if (!flight) return null;

  const baseFare = flight.rawPrice;
  const taxes = Math.round(baseFare * 0.12);
  const insuranceFee = addInsurance ? 899 : 0;
  const luggageFee = addExcessLuggage ? 1800 : 0;
  const totalAmount = baseFare + taxes + insuranceFee + luggageFee;

  const handleProceedToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    // Routed to the unified lead form - no direct submission from this modal.
    openLead(`Flight Booking - ${flight.airline} ${flight.fromCode} to ${flight.toCode} (${flight.price})`);
    onClose();
    // Previous multi-step flow kept for reference:
    // if (!firstName || !lastName || !email || !phone) {
    //   alert('Please fill out all traveler details.');
    //   return;
    // }
    // setStep('payment');
  };

  const handleConfirmBooking = () => {
    // Unreachable since payment step is bypassed by the unified lead form.
    const generatedPNR = 'DD' + Math.floor(100000 + Math.random() * 900000);
    setPnr(generatedPNR);
    setStep('confirmed');
    onSuccess({
      pnr: generatedPNR,
      flight,
      travelerName: `${title} ${firstName} ${lastName}`,
      total: totalAmount
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-3xl rounded-2xl shadow-2xl border border-gray-100 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-brand-navy text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-brand-maroon p-2 rounded-lg text-white">
              <Plane size={20} />
            </div>
            <div>
              <h3 className="font-bold text-lg leading-tight">Book Flight Ticket</h3>
              <p className="text-xs text-gray-300">
                {flight.airline} • {flight.flightNumber} • {flight.type}
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white p-1 rounded-md transition-colors cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Flight Summary Ribbon */}
          <div className="bg-gray-50 p-4 rounded-xl border border-gray-200/70 flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="text-[11px] font-bold text-brand-maroon uppercase tracking-wider block">{flight.airline}</span>
              <p className="text-lg font-black text-brand-navy">{flight.fromCode} → {flight.toCode}</p>
              <p className="text-xs text-gray-500">{flight.from} to {flight.to}</p>
            </div>
            <div className="text-center">
              <span className="text-xs font-semibold text-gray-700 block">{flight.duration}</span>
              <span className="text-[11px] text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full font-bold">{flight.type}</span>
            </div>
            <div className="text-right">
              <span className="text-xs text-gray-400 block">{flight.departureDate}</span>
              <span className="text-lg font-black text-brand-maroon">₹{flight.price}</span>
            </div>
          </div>

          {step === 'details' && (
            <form onSubmit={handleProceedToPayment} className="space-y-6">
              <div>
                <h4 className="font-bold text-sm text-brand-navy mb-3 flex items-center gap-2">
                  <User size={16} className="text-brand-maroon" />
                  Primary Passenger Details
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-6 gap-3">
                  <div className="sm:col-span-1">
                    <label className="text-[11px] font-bold text-gray-500">Title</label>
                    <select 
                      value={title} 
                      onChange={(e) => setTitle(e.target.value)}
                      className="w-full p-2.5 border rounded-lg text-sm bg-white outline-none focus:border-brand-maroon mt-1"
                    >
                      <option value="Mr">Mr</option>
                      <option value="Ms">Ms</option>
                      <option value="Mrs">Mrs</option>
                      <option value="Dr">Dr</option>
                    </select>
                  </div>
                  <div className="sm:col-span-2">
                    <label className="text-[11px] font-bold text-gray-500">First / Given Name *</label>
                    <input 
                      type="text" 
                      required
                      placeholder="e.g. Rahul"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="w-full p-2.5 border rounded-lg text-sm bg-white outline-none focus:border-brand-maroon mt-1"
                    />
                  </div>
                  <div className="sm:col-span-3">
                    <label className="text-[11px] font-bold text-gray-500">Last Name / Surname *</label>
                    <input 
                      type="text" 
                      required
                      placeholder="e.g. Sharma"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="w-full p-2.5 border rounded-lg text-sm bg-white outline-none focus:border-brand-maroon mt-1"
                    />
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-bold text-sm text-brand-navy mb-3 flex items-center gap-2">
                  <Mail size={16} className="text-brand-maroon" />
                  Contact & Ticket Delivery
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-bold text-gray-500">Email Address (E-Ticket sent here) *</label>
                    <input 
                      type="email" 
                      required
                      placeholder="rahul.sharma@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full p-2.5 border rounded-lg text-sm bg-white outline-none focus:border-brand-maroon mt-1"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-gray-500">Mobile Number (SMS updates) *</label>
                    <input 
                      type="tel" 
                      required
                      placeholder="+91 98765 43210"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full p-2.5 border rounded-lg text-sm bg-white outline-none focus:border-brand-maroon mt-1"
                    />
                  </div>
                </div>
              </div>

              {/* Preferences & Add-ons */}
              <div className="bg-gray-50 p-4 rounded-xl space-y-3">
                <h4 className="font-bold text-xs text-brand-navy uppercase tracking-wider">Flight Preferences</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-bold text-gray-500">Seat Preference</label>
                    <select 
                      value={seat}
                      onChange={(e) => setSeat(e.target.value)}
                      className="w-full p-2 border rounded-lg text-xs bg-white mt-1 outline-none"
                    >
                      <option value="14A (Window)">14A (Window - Forward)</option>
                      <option value="14C (Aisle)">14C (Aisle - Forward)</option>
                      <option value="22A (Window)">22A (Window - Wing View)</option>
                      <option value="26D (Aisle)">26D (Aisle - Extra Legroom +₹450)</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-gray-500">In-Flight Meal</label>
                    <select 
                      value={mealPreference}
                      onChange={(e) => setMealPreference(e.target.value)}
                      className="w-full p-2 border rounded-lg text-xs bg-white mt-1 outline-none"
                    >
                      <option value="Asian Vegetarian">Asian Vegetarian Meal (AVML)</option>
                      <option value="Hindu Non-Veg">Hindu Non-Veg Meal (HNML)</option>
                      <option value="Jain Meal">Jain Meal (VJML)</option>
                      <option value="Diabetic Meal">Diabetic Meal (DBML)</option>
                    </select>
                  </div>
                </div>

                <div className="pt-2 border-t border-gray-200 space-y-2">
                  <label className="flex items-center gap-2 text-xs font-semibold text-gray-700 cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={addInsurance} 
                      onChange={(e) => setAddInsurance(e.target.checked)}
                      className="accent-brand-maroon w-4 h-4 rounded"
                    />
                    <span>Add Travel Shield Insurance (Medical cover up to $50,000 + Trip cancellation) - <strong>₹899</strong></span>
                  </label>
                  <label className="flex items-center gap-2 text-xs font-semibold text-gray-700 cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={addExcessLuggage} 
                      onChange={(e) => setAddExcessLuggage(e.target.checked)}
                      className="accent-brand-maroon w-4 h-4 rounded"
                    />
                    <span>Add +10 kg Extra Prepaid Baggage - <strong>₹1,800</strong></span>
                  </label>
                </div>
              </div>

              {/* Price Breakdown Footer */}
              <div className="border-t pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <span className="text-xs text-gray-400">Total Payable Amount (incl. taxes)</span>
                  <p className="text-2xl font-black text-brand-maroon">₹{totalAmount.toLocaleString('en-IN')}</p>
                </div>
                <button
                  type="submit"
                  className="w-full sm:w-auto bg-brand-maroon hover:bg-brand-maroon-dark text-white px-8 py-3 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-brand-maroon/20 transition-all cursor-pointer"
                >
                  <span>Proceed to Payment</span>
                  <ArrowRight size={18} />
                </button>
              </div>
            </form>
          )}

          {step === 'payment' && (
            <div className="space-y-6">
              <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl flex items-center gap-3 text-amber-800 text-xs">
                <ShieldCheck size={20} className="shrink-0 text-amber-600" />
                <span>Your booking is reserved for 10 minutes at the locked price of <strong>₹{totalAmount.toLocaleString('en-IN')}</strong>.</span>
              </div>

              <div className="border border-gray-200 rounded-xl p-5 space-y-4">
                <h4 className="font-bold text-sm text-brand-navy flex items-center gap-2">
                  <CreditCard size={18} className="text-brand-maroon" />
                  Select Payment Method
                </h4>
                
                <div className="space-y-2">
                  <label className="flex items-center justify-between p-3 border rounded-lg bg-gray-50 hover:bg-white cursor-pointer border-brand-maroon">
                    <div className="flex items-center gap-2">
                      <input type="radio" name="payment" defaultChecked className="accent-brand-maroon" />
                      <span className="text-sm font-bold text-gray-800">UPI / QR Code (Google Pay, PhonePe, Paytm)</span>
                    </div>
                    <span className="text-xs text-emerald-600 font-bold">Instant Confirmation</span>
                  </label>
                  <label className="flex items-center justify-between p-3 border rounded-lg bg-gray-50 hover:bg-white cursor-pointer">
                    <div className="flex items-center gap-2">
                      <input type="radio" name="payment" className="accent-brand-maroon" />
                      <span className="text-sm font-bold text-gray-800">Credit / Debit Card (Visa, MasterCard, Amex)</span>
                    </div>
                    <span className="text-xs text-gray-400">0% Convenience Fee</span>
                  </label>
                  <label className="flex items-center justify-between p-3 border rounded-lg bg-gray-50 hover:bg-white cursor-pointer">
                    <div className="flex items-center gap-2">
                      <input type="radio" name="payment" className="accent-brand-maroon" />
                      <span className="text-sm font-bold text-gray-800">Net Banking (All Major Indian Banks)</span>
                    </div>
                  </label>
                </div>
              </div>

              <div className="border-t pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={() => setStep('details')}
                  className="text-gray-500 hover:text-gray-800 text-sm font-semibold cursor-pointer"
                >
                  ← Edit Passenger Info
                </button>
                <button
                  type="button"
                  onClick={handleConfirmBooking}
                  className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20 transition-all cursor-pointer text-base"
                >
                  <ShieldCheck size={18} />
                  <span>Pay ₹{totalAmount.toLocaleString('en-IN')} & Confirm Ticket</span>
                </button>
              </div>
            </div>
          )}

          {step === 'confirmed' && (
            <div className="text-center py-6 space-y-5">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto animate-bounce">
                <CheckCircle2 size={36} />
              </div>
              <div>
                <h3 className="text-2xl font-black text-brand-navy">Flight Booking Confirmed!</h3>
                <p className="text-sm text-gray-500 mt-1">
                  PNR: <strong className="text-brand-maroon text-lg tracking-widest">{pnr}</strong>
                </p>
              </div>

              <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 text-left max-w-lg mx-auto space-y-3 text-xs text-gray-700">
                <div className="flex justify-between border-b pb-2">
                  <span className="text-gray-400">Passenger:</span>
                  <span className="font-bold">{title} {firstName} {lastName}</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="text-gray-400">Flight:</span>
                  <span className="font-bold">{flight.airline} ({flight.flightNumber})</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="text-gray-400">Route:</span>
                  <span className="font-bold">{flight.from} to {flight.to}</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="text-gray-400">Departure:</span>
                  <span className="font-bold">{flight.departureDate} at {flight.departureTime}</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="text-gray-400">Seat & Meal:</span>
                  <span className="font-bold">{seat} • {mealPreference}</span>
                </div>
                <div className="flex justify-between text-brand-maroon font-black text-sm pt-1">
                  <span>Total Paid:</span>
                  <span>₹{totalAmount.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <p className="text-xs text-gray-400">
                A copy of your e-ticket and tax invoice has been sent to <strong>{email || 'your email'}</strong> and WhatsApp.
              </p>

              <div className="pt-2 flex justify-center gap-3">
                <button
                  onClick={onClose}
                  className="bg-brand-maroon hover:bg-brand-maroon-dark text-white px-8 py-2.5 rounded-xl font-bold text-sm shadow-md transition cursor-pointer"
                >
                  Done
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default FlightBookingModal;
