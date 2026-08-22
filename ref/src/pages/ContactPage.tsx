import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle2, MessageSquare, ChevronDown, ChevronUp } from 'lucide-react';
import { FAQS } from '../data/travelData';

interface ContactPageProps {
  onShowToast: (msg: string) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onShowToast }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('Holiday Package Inquiry');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone || !message) {
      onShowToast('Please complete all contact form fields.');
      return;
    }
    setSubmitted(true);
    onShowToast(`Thank you, ${name}! Your inquiry has been sent to our Mumbai headquarters. A representative will contact you shortly.`);
  };

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <main className="min-h-screen bg-[#FAF9F6]">
      {/* Contact Content Grid */}
      <div className="max-w-6xl mx-auto px-6 py-16 lg:py-20 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
        {/* Left Column: Contact Form */}
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-brand-orange uppercase tracking-widest mb-3">
            <span className="w-6 h-0.5 bg-brand-orange"></span>
            <span>Get in Touch</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold serif text-[#1a2b48] mb-4 tracking-tight">
            We're Here to Help
          </h1>
          <p className="text-gray-500 mb-8 text-sm sm:text-base leading-relaxed font-light">
            Have a question or need assistance with your bespoke itinerary? Get in touch with our certified travel specialists.
          </p>

          {submitted ? (
            <div className="bg-emerald-50 border border-emerald-200 rounded-sm p-8 text-center space-y-4 animate-in fade-in duration-300">
              <div className="w-14 h-14 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 size={32} />
              </div>
              <h3 className="text-2xl font-bold serif text-emerald-950">Message Dispatched</h3>
              <p className="text-xs sm:text-sm text-emerald-800 leading-relaxed max-w-md mx-auto font-light">
                Thank you, <strong>{name}</strong>. Your message has reached our team. We respond to all inquiries within 24 hours.
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setName('');
                  setEmail('');
                  setPhone('');
                  setMessage('');
                }}
                className="bg-brand-maroon text-white px-5 py-2 rounded-sm font-semibold text-xs cursor-pointer shadow-xs"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 sm:p-8 rounded-sm border border-[#e5e5e5] shadow-xs">
              <div>
                <label className="text-xs font-semibold text-gray-700 block mb-1">Your Full Name *</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Rahul Sharma" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-3 border border-[#e5e5e5] rounded-sm bg-[#FAF9F6] outline-none focus:bg-white focus:border-brand-maroon text-xs sm:text-sm transition" 
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-gray-700 block mb-1">Your Email Address *</label>
                  <input 
                    type="email" 
                    required
                    placeholder="name@example.com" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-3 border border-[#e5e5e5] rounded-sm bg-[#FAF9F6] outline-none focus:bg-white focus:border-brand-maroon text-xs sm:text-sm transition" 
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-700 block mb-1">Phone Number *</label>
                  <input 
                    type="tel" 
                    required
                    placeholder="+91 98765 43210" 
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full p-3 border border-[#e5e5e5] rounded-sm bg-[#FAF9F6] outline-none focus:bg-white focus:border-brand-maroon text-xs sm:text-sm transition" 
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-700 block mb-1">Inquiry Subject *</label>
                <select 
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full p-3 border border-[#e5e5e5] rounded-sm bg-[#FAF9F6] outline-none focus:bg-white focus:border-brand-maroon text-xs sm:text-sm font-medium transition cursor-pointer"
                >
                  <option value="Holiday Package Inquiry">Holiday Package Customization</option>
                  <option value="Flight Ticket Booking">International & Domestic Flight Booking</option>
                  <option value="Visa Application Support">Express Visa Assistance</option>
                  <option value="Hotel Reservation">Luxury Resort & Hotel Stays</option>
                  <option value="Corporate / Group Booking">Corporate Travel & Group MICE</option>
                  <option value="Existing Booking Inquiry">Existing Booking Status / Rescheduling</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-700 block mb-1">Your Message or Detailed Requirements *</label>
                <textarea 
                  required
                  placeholder="Describe your travel dates, preferred destinations, passenger count, or specific questions..." 
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full p-3 border border-[#e5e5e5] rounded-sm bg-[#FAF9F6] outline-none focus:bg-white focus:border-brand-maroon text-xs sm:text-sm h-32 resize-y transition"
                ></textarea>
              </div>

              <button 
                type="submit"
                id="btn-submit-contact"
                className="bg-brand-maroon hover:bg-brand-maroon-dark text-white px-7 py-3 rounded-sm font-semibold flex items-center justify-center gap-2 shadow-xs transition-all cursor-pointer active:scale-95 text-xs sm:text-sm w-full sm:w-auto"
              >
                <Send size={15} />
                <span>Send Message</span>
              </button>
            </form>
          )}
        </div>

        {/* Right Column: Contact Details & Map Card */}
        <div className="space-y-6">
          {/* Info Card */}
          <div className="bg-white p-6 sm:p-8 rounded-sm relative overflow-hidden border border-[#e5e5e5] shadow-xs">
            <h3 className="text-xl font-bold serif text-[#1a2b48] mb-6">Contact Information</h3>
            
            <div className="space-y-4 relative z-10">
              <a 
                href="tel:+919876543210"
                className="flex items-start gap-4 p-3 rounded-sm hover:bg-[#FAF9F6] transition-colors group"
              >
                <div className="bg-brand-maroon/10 text-brand-maroon group-hover:bg-brand-maroon group-hover:text-white p-3 rounded-sm transition-colors shrink-0">
                  <Phone size={18} />
                </div>
                <div>
                  <p className="font-semibold text-xs text-[#1a2b48]">Phone Support</p>
                  <p className="text-brand-maroon font-bold text-sm">+91 98765 43210</p>
                  <p className="text-[11px] text-gray-400 mt-0.5 font-light">Mon - Sat: 9:00 AM - 7:00 PM (IST)</p>
                </div>
              </a>

              <a 
                href="mailto:info@dailydeparture.com"
                className="flex items-start gap-4 p-3 rounded-sm hover:bg-[#FAF9F6] transition-colors group"
              >
                <div className="bg-brand-maroon/10 text-brand-maroon group-hover:bg-brand-maroon group-hover:text-white p-3 rounded-sm transition-colors shrink-0">
                  <Mail size={18} />
                </div>
                <div>
                  <p className="font-semibold text-xs text-[#1a2b48]">Email Desk</p>
                  <p className="text-brand-maroon font-bold text-sm">info@dailydeparture.com</p>
                  <p className="text-[11px] text-gray-400 mt-0.5 font-light">We reply within 24 hours</p>
                </div>
              </a>

              <div className="flex items-start gap-4 p-3 rounded-sm">
                <div className="bg-brand-maroon/10 text-brand-maroon p-3 rounded-sm shrink-0">
                  <MapPin size={18} />
                </div>
                <div>
                  <p className="font-semibold text-xs text-[#1a2b48]">Head Office</p>
                  <p className="text-gray-500 text-xs font-light mt-0.5 leading-relaxed">123, Travel Street, Andheri (E), Mumbai, Maharashtra, India - 400069</p>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Map Visualizer */}
          <div className="h-64 bg-slate-100 rounded-sm flex items-center justify-center text-gray-400 overflow-hidden relative border border-[#e5e5e5] shadow-xs group">
            <img 
              src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=1000&q=80" 
              alt="Map view"
              className="w-full h-full object-cover brightness-90 group-hover:scale-105 transition duration-700" 
            />
            <div className="absolute inset-0 bg-[#1a2b48]/20"></div>
            
            <div className="relative bg-white/95 backdrop-blur-xs p-4 rounded-sm shadow-md text-center border border-[#e5e5e5] max-w-xs">
              <div className="w-9 h-9 bg-brand-maroon text-white rounded-full flex items-center justify-center mx-auto mb-2 shadow-xs">
                <MapPin size={16} />
              </div>
              <p className="text-xs font-bold serif text-[#1a2b48] uppercase tracking-wider">Daily Departure HQ</p>
              <p className="text-[11px] text-gray-500 mt-0.5 font-light">Andheri East, Mumbai, India</p>
              <div className="mt-2 pt-2 border-t border-gray-100">
                <span className="text-[10px] text-emerald-700 font-semibold">● Open for in-person consultations</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Frequently Asked Questions Section */}
      <section className="bg-white py-16 px-6 border-t border-[#e5e5e5]">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-xs font-semibold uppercase tracking-widest text-brand-orange block mb-1">Got Questions?</span>
            <h2 className="text-3xl font-bold serif text-[#1a2b48]">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div 
                  key={index} 
                  className="bg-[#FAF9F6] rounded-sm border border-[#e5e5e5] overflow-hidden shadow-xs transition"
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full p-4 sm:p-5 text-left font-semibold text-xs sm:text-sm text-[#1a2b48] flex items-center justify-between gap-4 cursor-pointer hover:text-brand-maroon transition-colors"
                  >
                    <span className="serif font-bold text-sm sm:text-base">{faq.q}</span>
                    <span className="p-1 rounded-sm bg-white border border-[#e5e5e5] text-gray-500">
                      {isOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 text-xs sm:text-sm text-gray-500 leading-relaxed border-t border-[#e5e5e5] pt-3 font-light animate-in fade-in duration-200">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
};
export default ContactPage;
