import React, { useState } from 'react';
import { 
  Phone, Mail, MapPin, Clock, Send, CheckCircle2, Lock
} from 'lucide-react';
// Unused icons cleaned up: ChevronDown, ChevronUp
// import { 
//   Phone, Mail, MapPin, Clock, Send, CheckCircle2, Lock, 
//   ChevronDown, ChevronUp 
// } from 'lucide-react';
import { useLeadForm } from '../context/LeadContext';

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
  const { openLead } = useLeadForm();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Routed to the unified lead form - details typed here are carried over.
    openLead(`Contact Us - ${subject}${message ? ` | "${message}"` : ''}`);
    // Previous direct-submit flow kept for reference:
    // if (!name || !email || !phone || !message) {
    //   onShowToast('Please complete all contact form fields.');
    //   return;
    // }
    // setSubmitted(true);
    // onShowToast(`Thank you, ${name}! Your inquiry has been sent to our Mumbai headquarters.`);
    // setTimeout(() => {
    //   setSubmitted(false);
    //   setName('');
    //   setEmail('');
    //   setPhone('');
    //   setMessage('');
    // }, 4000);
  };

  return (
    <main className="min-h-screen bg-white pb-16">
      {/* 1. BREADCRUMB & HEADER MATCHING SCREENSHOT */}
      <section className="max-w-6xl mx-auto px-6 pt-6">
        <div className="text-xs text-gray-500 mb-4">
          <span className="hover:text-gray-800 cursor-pointer">Home</span> &gt; <span className="text-gray-800 font-medium">Contact</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center pb-8">
          <div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold serif text-[#1a2b48] leading-tight mb-3">
              We're Here to Help
            </h1>
            <p className="text-sm text-gray-500 font-light max-w-md leading-relaxed">
              Have a question or need assistance with your booking? Get in touch with us.
            </p>
          </div>

          <div className="h-52 sm:h-64 rounded-xl overflow-hidden shadow-xs">
            <img
              src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=1200&q=80"
              alt="Travel notes, pen, map and compass"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* 2. TWO COLUMN LAYOUT: GET IN TOUCH FORM & CONTACT INFO MATCHING SCREENSHOT */}
      <section className="max-w-6xl mx-auto px-6 mb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Get in Touch Form (approx 7 cols) */}
          <div className="lg:col-span-7">
            <div className="bg-white border border-gray-200/90 rounded-xl p-6 sm:p-8 shadow-xs">
              <h2 className="text-xl font-bold serif text-[#1a2b48] mb-5">Get in Touch</h2>

              {submitted ? (
                <div className="bg-rose-50 border border-rose-200 rounded-lg p-8 text-center space-y-3">
                  <CheckCircle2 size={36} className="text-[#800020] mx-auto" />
                  <h3 className="text-lg font-bold text-[#800020] serif">Message Sent Successfully</h3>
                  <p className="text-xs text-gray-600 font-light leading-relaxed">
                    Thank you, <strong>{name}</strong>. Our travel desk will contact you within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="text-xs font-semibold text-gray-700 block mb-1">Your Name</label>
                    <input
                      type="text"
                      required
                      placeholder="Enter your name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full p-2.5 text-xs border border-gray-200 rounded-md outline-none focus:border-[#800020] bg-gray-50/50 focus:bg-white"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-semibold text-gray-700 block mb-1">Your Email</label>
                      <input
                        type="email"
                        required
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-2.5 text-xs border border-gray-200 rounded-md outline-none focus:border-[#800020] bg-gray-50/50 focus:bg-white"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-gray-700 block mb-1">Phone Number</label>
                      <input
                        type="tel"
                        required
                        placeholder="Enter your phone number"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full p-2.5 text-xs border border-gray-200 rounded-md outline-none focus:border-[#800020] bg-gray-50/50 focus:bg-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-gray-700 block mb-1">Subject</label>
                    <select
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full p-2.5 text-xs border border-gray-200 rounded-md outline-none focus:border-[#800020] bg-gray-50/50 focus:bg-white cursor-pointer"
                    >
                      <option value="Holiday Package Inquiry">Holiday Package Inquiry</option>
                      <option value="Flight Booking Inquiry">Flight Booking Inquiry</option>
                      <option value="Visa Assistance">Visa Assistance</option>
                      <option value="Hotel Reservation">Hotel Reservation</option>
                      <option value="General Inquiry">General Inquiry</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-gray-700 block mb-1">Your Message</label>
                    <textarea
                      required
                      placeholder="Write your message here..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full p-2.5 text-xs border border-gray-200 rounded-md outline-none focus:border-[#800020] bg-gray-50/50 focus:bg-white h-28 resize-none"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    id="btn-submit-contact"
                    className="bg-[#800020] hover:bg-[#600018] text-white px-6 py-2.5 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 shadow-xs transition-all cursor-pointer"
                  >
                    <Send size={13} />
                    <span>Send Message</span>
                  </button>

                  <p className="text-[10px] text-gray-400 flex items-center gap-1 pt-1 font-light">
                    <Lock size={10} className="text-gray-400" />
                    <span>Your information is safe with us.</span>
                  </p>
                </form>
              )}
            </div>
          </div>

          {/* Right Column: Contact Information (approx 5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-white border border-gray-200/90 rounded-xl p-6 shadow-xs">
              <h2 className="text-xl font-bold serif text-[#1a2b48] mb-6">Contact Information</h2>

              <div className="space-y-5">
                {/* Phone */}
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-full bg-rose-50 border border-rose-100 text-[#800020] flex items-center justify-center shrink-0">
                    <Phone size={16} />
                  </div>
                  <div>
                    <span className="text-[11px] text-gray-400 uppercase font-semibold block">Phone</span>
                    <a href="tel:+919876543210" className="text-sm font-bold text-[#1a2b48] hover:text-[#800020]">
                      +91 98765 43210
                    </a>
                    <p className="text-xs text-gray-500 font-light mt-0.5">Mon - Sat: 9:00 AM - 7:00 PM</p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-full bg-rose-50 border border-rose-100 text-[#800020] flex items-center justify-center shrink-0">
                    <Mail size={16} />
                  </div>
                  <div>
                    <span className="text-[11px] text-gray-400 uppercase font-semibold block">Email</span>
                    <a href="mailto:info@dailydeparture.com" className="text-sm font-bold text-[#1a2b48] hover:text-[#800020]">
                      info@dailydeparture.com
                    </a>
                    <p className="text-xs text-gray-500 font-light mt-0.5">We reply within 24 hours</p>
                  </div>
                </div>

                {/* Address */}
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-full bg-rose-50 border border-rose-100 text-[#800020] flex items-center justify-center shrink-0">
                    <MapPin size={16} />
                  </div>
                  <div>
                    <span className="text-[11px] text-gray-400 uppercase font-semibold block">Address</span>
                    <p className="text-xs text-gray-700 font-medium leading-relaxed">
                      123, Travel Street, Andheri (E) <br />
                      Mumbai, Maharashtra - 400069, India
                    </p>
                  </div>
                </div>

                {/* Working Hours */}
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-full bg-rose-50 border border-rose-100 text-[#800020] flex items-center justify-center shrink-0">
                    <Clock size={16} />
                  </div>
                  <div>
                    <span className="text-[11px] text-gray-400 uppercase font-semibold block">Working Hours</span>
                    <p className="text-xs text-gray-700 font-medium">Mon - Sat: 9:00 AM - 7:00 PM</p>
                    <p className="text-xs text-gray-500 font-light">Sunday: Closed</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. MAP SECTION MATCHING SCREENSHOT */}
      <section className="max-w-6xl mx-auto px-6">
        <div className="relative h-72 rounded-xl overflow-hidden shadow-xs border border-gray-200">
          <img
            src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=1600&q=80"
            alt="City map"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover brightness-95"
          />
          <div className="absolute inset-0 bg-black/10"></div>

          {/* Map Pin Marker Center */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center pointer-events-none">
            <div className="w-8 h-8 rounded-full bg-[#800020] text-white flex items-center justify-center shadow-lg border-2 border-white animate-bounce">
              <MapPin size={18} />
            </div>
            <div className="w-3 h-1 bg-black/40 rounded-full blur-xs mt-0.5"></div>
          </div>

          {/* Floating Office Card Bottom Left matching screenshot */}
          <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-xs p-3.5 rounded-lg shadow-md border border-gray-200 max-w-xs">
            <h4 className="text-xs font-bold text-[#1a2b48] serif uppercase tracking-wider">Our Office</h4>
            <p className="text-[11px] text-gray-600 mt-0.5 leading-tight">
              123, Travel Street, Andheri (E) <br />
              Mumbai, Maharashtra - 400069, India
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};
export default ContactPage;
