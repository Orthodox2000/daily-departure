import React, { useState } from 'react';
import { X, Send, CheckCircle2, User, Mail, Phone, MessageSquareText } from 'lucide-react';

interface LeadFormModalProps {
  /** Auto-filled context describing which button/form triggered this request */
  source: string;
  onSubmit: (payload: { name: string; email: string; countryCode: string; phone: string; message: string }) => void;
  onClose: () => void;
  submitting?: boolean;
}

const COUNTRY_CODES = [
  { code: '+91', label: 'India' },
  { code: '+971', label: 'UAE' },
  { code: '+960', label: 'Maldives' },
  { code: '+65', label: 'Singapore' },
  { code: '+66', label: 'Thailand' },
  { code: '+62', label: 'Indonesia' },
  { code: '+977', label: 'Nepal' },
  { code: '+94', label: 'Sri Lanka' },
  { code: '+44', label: 'United Kingdom' },
  { code: '+1', label: 'USA / Canada' },
  { code: '+61', label: 'Australia' },
  { code: '+49', label: 'Germany' },
  { code: '+33', label: 'France' },
  { code: '+41', label: 'Switzerland' },
];

/**
 * Unified lead-capture form.
 * Every booking / inquiry / subscribe activity across the site is routed here.
 * The `source` prop is auto-filled with the trigger context (button/modal/page).
 * Submission does NOT hit any endpoint yet - handled by LeadProvider -> api/client.ts
 */
export const LeadFormModal: React.FC<LeadFormModalProps> = ({ source, onSubmit, onClose, submitting = false }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [countryCode, setCountryCode] = useState('+91');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !phone.trim()) {
      setError('Please fill in your name, email and mobile number.');
      return;
    }
    if (!email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }
    if (phone.replace(/\D/g, '').length < 7) {
      setError('Please enter a valid mobile number.');
      return;
    }
    setError(null);
    onSubmit({ name: name.trim(), email: email.trim(), countryCode, phone: phone.trim(), message });
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-gray-100 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="bg-brand-maroon text-white px-6 py-4 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <img
              src="/images/logo-small.jpeg"
              alt="Daily Departure logo"
              referrerPolicy="no-referrer"
              className="w-11 h-11 rounded-lg bg-white object-contain p-1 shadow-sm"
            />
            <div>
              <h3 className="font-bold text-lg leading-tight">Get More Info</h3>
              <p className="text-xs text-white/80">One quick form for everything - our expert calls you.</p>
            </div>
          </div>
          <button onClick={onClose} className="text-white/80 hover:text-white p-1 rounded-md transition-colors cursor-pointer" aria-label="Close form">
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto space-y-4 flex-1">
          {/* Auto-filled trigger context */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-xs">
            <span className="text-gray-400 font-semibold uppercase tracking-wider block">Regarding</span>
            <span className="font-bold text-brand-navy">{source}</span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div>
              <label className="text-[11px] font-bold text-gray-500">Full Name *</label>
              <div className="relative mt-1">
                <User size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  required
                  placeholder="e.g. Rahul Sharma"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 border rounded-lg text-sm bg-white outline-none focus:border-brand-maroon"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="text-[11px] font-bold text-gray-500">Email Address *</label>
              <div className="relative mt-1">
                <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  required
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 border rounded-lg text-sm bg-white outline-none focus:border-brand-maroon"
                />
              </div>
            </div>

            {/* Mobile with country code */}
            <div>
              <label className="text-[11px] font-bold text-gray-500">Mobile Number (with country code) *</label>
              <div className="flex gap-2 mt-1">
                <select
                  value={countryCode}
                  onChange={(e) => setCountryCode(e.target.value)}
                  className="w-28 p-2.5 border rounded-lg text-sm bg-gray-50 outline-none focus:border-brand-maroon cursor-pointer"
                  aria-label="Country code"
                >
                  {COUNTRY_CODES.map((c) => (
                    <option key={c.code} value={c.code}>{c.code} {c.label}</option>
                  ))}
                </select>
                <div className="relative flex-1">
                  <Phone size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="tel"
                    required
                    placeholder="98765 43210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 border rounded-lg text-sm bg-white outline-none focus:border-brand-maroon"
                  />
                </div>
              </div>
            </div>

            {/* Message prefilled from the triggering button */}
            <div>
              <label className="text-[11px] font-bold text-gray-500">Message</label>
              <div className="relative mt-1">
                <MessageSquareText size={14} className="absolute left-3 top-3 text-gray-400" />
                <textarea
                  rows={3}
                  placeholder="Anything specific we should know?"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 border rounded-lg text-sm bg-white outline-none focus:border-brand-maroon resize-none"
                ></textarea>
              </div>
            </div>

            {error && (
              <p className="text-xs text-red-600 font-semibold bg-red-50 border border-red-100 rounded-md px-3 py-2">{error}</p>
            )}

            {/* Footer actions */}
            <div className="pt-1 flex justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 rounded-xl border text-sm font-semibold text-gray-600 hover:bg-gray-50 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="bg-brand-maroon hover:bg-brand-maroon-dark disabled:opacity-60 disabled:cursor-not-allowed text-white px-8 py-2.5 rounded-xl font-bold text-sm shadow-md transition flex items-center gap-2 cursor-pointer"
              >
                {submitting ? (
                  <span>Sending...</span>
                ) : (
                  <>
                    <Send size={15} />
                    <span>Get More Info</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LeadFormModal;

// Success indicator reused by LeadProvider's inline confirmation
export const LeadSuccessNote: React.FC<{ onClose: () => void }> = ({ onClose }) => (
  <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in duration-200">
    <div className="bg-white w-full max-w-sm rounded-2xl shadow-2xl p-8 text-center space-y-4">
      <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
        <CheckCircle2 size={36} />
      </div>
      <h3 className="text-xl font-black text-brand-navy">Request Received!</h3>
      <p className="text-sm text-gray-600">
        Thank you! Our travel expert will contact you shortly with the best options.
      </p>
      <button onClick={onClose} className="bg-brand-maroon hover:bg-brand-maroon-dark text-white px-8 py-2.5 rounded-xl font-bold text-sm transition cursor-pointer">
        Done
      </button>
    </div>
  </div>
);
