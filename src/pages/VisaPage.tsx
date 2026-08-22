import React, { useState } from 'react';
import { 
  FileCheck, Clock, ArrowRight, 
  Headset, FileText, CreditCard, CheckCheck
} from 'lucide-react';
// Unused icons cleaned up: ShieldCheck, CheckCircle2, HelpCircle, Users, ChevronRight
// import { 
//   FileCheck, ShieldCheck, Clock, CheckCircle2, ArrowRight, 
//   HelpCircle, Users, Headset, FileText, CreditCard, CheckCheck, ChevronRight
// } from 'lucide-react';
import { VISA_DESTINATIONS, VisaDestination } from '../data/travelData';

interface VisaPageProps {
  onSelectVisa: (visa: VisaDestination) => void;
  onOpenBookModal: (service?: 'Flights' | 'Hotels' | 'Holidays' | 'Visa') => void;
  onNavigate: (page: string) => void;
}

export const VisaPage: React.FC<VisaPageProps> = ({ 
  onSelectVisa, 
  onOpenBookModal, 
  onNavigate 
}) => {
  const [selectedCountry, setSelectedCountry] = useState('Schengen');
  const [fromCountry, setFromCountry] = useState('India');
  const [purpose, setPurpose] = useState('Tourism');

  const handleCheckRequirements = (e: React.FormEvent) => {
    e.preventDefault();
    const found = VISA_DESTINATIONS.find(v => v.id.toLowerCase().includes(selectedCountry.toLowerCase()) || v.title.toLowerCase().includes(selectedCountry.toLowerCase()));
    if (found) {
      onSelectVisa(found);
    } else {
      onOpenBookModal('Visa');
    }
  };

  return (
    <main className="min-h-screen bg-white pb-16">
      {/* 1. BREADCRUMB & HEADER MATCHING SCREENSHOT */}
      <section className="max-w-6xl mx-auto px-6 pt-6">
        <div className="text-xs text-gray-500 mb-4">
          <span className="hover:text-gray-800 cursor-pointer">Home</span> &gt; <span className="text-gray-800 font-medium">Visa</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center pb-8">
          <div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold serif text-[#1a2b48] leading-tight mb-3">
              Easy Visa Process <br />
              <span className="text-[#1a2b48]">For Your Journey</span>
            </h1>
            <p className="text-sm text-gray-500 font-light max-w-md leading-relaxed">
              We make visa application simple, fast and hassle-free for you.
            </p>
          </div>

          <div className="h-52 sm:h-64 rounded-xl overflow-hidden shadow-xs">
            <img
              src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1200&q=80"
              alt="Passport and travel journal"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* 2. SEARCH BAR MATCHING SCREENSHOT */}
      <section className="max-w-6xl mx-auto px-6 mb-12">
        <form onSubmit={handleCheckRequirements} className="bg-white border border-gray-200/80 rounded-xl p-4 sm:p-5 shadow-sm">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 items-center">
            {/* I want visa for */}
            <div className="border border-gray-200 rounded-lg p-2.5 bg-gray-50/50">
              <span className="text-[10px] font-semibold text-gray-400 uppercase block">I want visa for</span>
              <select
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value)}
                className="w-full text-xs font-semibold text-gray-800 outline-none bg-transparent cursor-pointer mt-0.5"
              >
                <option value="Schengen">Schengen (Europe)</option>
                <option value="usa">USA</option>
                <option value="uk">United Kingdom</option>
                <option value="australia">Australia</option>
                <option value="uae">United Arab Emirates (Dubai)</option>
              </select>
            </div>

            {/* I am traveling from */}
            <div className="border border-gray-200 rounded-lg p-2.5 bg-gray-50/50">
              <span className="text-[10px] font-semibold text-gray-400 uppercase block">I am traveling from</span>
              <select
                value={fromCountry}
                onChange={(e) => setFromCountry(e.target.value)}
                className="w-full text-xs font-semibold text-gray-800 outline-none bg-transparent cursor-pointer mt-0.5"
              >
                <option value="India">India</option>
                <option value="UAE">UAE</option>
                <option value="Other">Other Country</option>
              </select>
            </div>

            {/* Purpose of Visit */}
            <div className="border border-gray-200 rounded-lg p-2.5 bg-gray-50/50">
              <span className="text-[10px] font-semibold text-gray-400 uppercase block">Purpose of Visit</span>
              <select
                value={purpose}
                onChange={(e) => setPurpose(e.target.value)}
                className="w-full text-xs font-semibold text-gray-800 outline-none bg-transparent cursor-pointer mt-0.5"
              >
                <option value="Tourism">Tourism</option>
                <option value="Business">Business</option>
                <option value="Study">Study / Education</option>
                <option value="Visit">Family Visit</option>
              </select>
            </div>

            {/* Check Requirements Button */}
            <button
              type="submit"
              className="bg-[#800020] hover:bg-[#600018] text-white h-[50px] rounded-lg font-medium text-xs sm:text-sm flex items-center justify-center gap-1.5 shadow-xs transition-all cursor-pointer"
            >
              <span>Check Visa Requirements</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </form>
      </section>

      {/* 3. POPULAR VISA DESTINATIONS MATCHING SCREENSHOT */}
      <section className="max-w-6xl mx-auto px-6 mb-16">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl sm:text-2xl font-bold serif text-[#1a2b48]">Popular Visa Destinations</h2>
          <button
            onClick={() => onOpenBookModal('Visa')}
            className="text-xs sm:text-sm font-semibold text-gray-600 hover:text-[#800020] flex items-center gap-1 cursor-pointer"
          >
            <span>View All</span>
            <ArrowRight size={14} />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {VISA_DESTINATIONS.map((visa) => (
            <div
              key={visa.id}
              onClick={() => onSelectVisa(visa)}
              className="bg-white border border-gray-200/80 rounded-xl overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between group cursor-pointer"
            >
              <div>
                <div className="relative h-36 overflow-hidden">
                  <img
                    src={visa.image}
                    alt={visa.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  <div className="absolute top-2 left-2 bg-white/90 backdrop-blur-xs text-xs font-bold px-2 py-0.5 rounded-md shadow-xs flex items-center gap-1">
                    <span>{visa.flag}</span>
                    <span className="text-[11px] text-gray-800">{visa.country}</span>
                  </div>
                </div>

                <div className="p-4 space-y-1">
                  <h3 className="text-sm font-bold serif text-[#1a2b48] group-hover:text-[#800020] transition-colors leading-tight">
                    {visa.title}
                  </h3>
                  <p className="text-[11px] text-gray-400 font-light">{visa.country}</p>
                  <p className="text-[11px] text-gray-500 line-clamp-1 mt-1">{visa.types}</p>
                </div>
              </div>

              <div className="p-4 pt-2 border-t border-gray-100 flex items-center justify-between">
                <span className="text-xs font-semibold text-[#800020] group-hover:underline flex items-center gap-1">
                  <span>Apply Now</span>
                  <ArrowRight size={11} />
                </span>
                <span className="text-[11px] font-bold text-gray-700">{visa.fee}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. OUR VISA SERVICES MATCHING SCREENSHOT */}
      <section className="bg-gray-50 py-14 border-y border-gray-100 mb-16">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-2xl font-bold serif text-[#1a2b48] mb-10">
            Our Visa Services
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: FileCheck,
                title: 'Visa Consultation',
                desc: 'Get expert advice on the right visa for your travel needs.'
              },
              {
                icon: FileText,
                title: 'Document Guidance',
                desc: 'We help you with the right documents and requirements.'
              },
              {
                icon: Clock,
                title: 'Fast Processing',
                desc: 'Quick and smooth processing to save your time.'
              },
              {
                icon: Headset,
                title: 'End-to-End Support',
                desc: "We're with you at every step of your visa journey."
              }
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} className="bg-white p-6 rounded-xl border border-gray-100 shadow-xs flex flex-col items-center text-center">
                  <div className="w-14 h-14 rounded-full bg-rose-50 border border-rose-100 text-[#800020] flex items-center justify-center mb-3 shadow-xs">
                    <Icon size={22} />
                  </div>
                  <h3 className="text-sm font-bold serif text-[#1a2b48] mb-1.5">{item.title}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed font-light">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. HOW IT WORKS MATCHING SCREENSHOT */}
      <section className="max-w-6xl mx-auto px-6 mb-16">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold serif text-[#1a2b48]">
            How It Works
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {[
            {
              icon: FileCheck,
              num: '1',
              title: '1. Choose Destination',
              desc: 'Select your destination and visa type.'
            },
            {
              icon: FileText,
              num: '2',
              title: '2. Submit Documents',
              desc: 'Upload required documents online.'
            },
            {
              icon: CreditCard,
              num: '3',
              title: '3. Make Payment',
              desc: 'Secure your payment for the visa process.'
            },
            {
              icon: CheckCheck,
              num: '4',
              title: '4. Get Your Visa',
              desc: 'Receive your visa and get ready to travel!'
            }
          ].map((step, idx) => {
            const Icon = step.icon;
            return (
              <div key={idx} className="flex flex-col items-center text-center relative">
                <div className="w-14 h-14 rounded-full bg-[#800020] text-white flex items-center justify-center mb-3 shadow-xs font-bold text-sm">
                  <Icon size={22} />
                </div>
                <h3 className="text-sm font-bold serif text-[#1a2b48] mb-1">{step.title}</h3>
                <p className="text-xs text-gray-500 max-w-xs">{step.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* 6. NEED HELP WITH YOUR VISA? BANNER STRIP MATCHING SCREENSHOT */}
      <section className="max-w-6xl mx-auto px-6">
        <div className="bg-rose-50/70 border border-rose-200/80 rounded-xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-center sm:text-left">
            <div className="w-10 h-10 rounded-full bg-[#800020] text-white flex items-center justify-center shrink-0">
              <Headset size={20} />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#1a2b48] serif">Need Help with Your Visa?</h3>
              <p className="text-xs text-gray-600 font-light">Talk to our visa experts today!</p>
            </div>
          </div>

          <button
            onClick={() => onNavigate('Contact')}
            className="bg-[#800020] hover:bg-[#600018] text-white px-6 py-2.5 rounded-lg text-xs sm:text-sm font-medium shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <span>Contact Us</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </section>
    </main>
  );
};
export default VisaPage;
