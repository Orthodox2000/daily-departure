import React, { useState } from 'react';
import { FileCheck, ShieldCheck, Clock, CheckCircle2, ArrowRight, Sparkles, Globe, HelpCircle, Users } from 'lucide-react';
import { VISA_SERVICES, VisaService, FAQS } from '../data/travelData';

interface VisaPageProps {
  onSelectVisa: (visa: VisaService) => void;
  onOpenBookModal: (service?: 'Flights' | 'Hotels' | 'Holidays' | 'Visa') => void;
}

export const VisaPage: React.FC<VisaPageProps> = ({ onSelectVisa, onOpenBookModal }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredVisas = VISA_SERVICES.filter(v =>
    v.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
    v.visaType.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-[#FAF9F6] pb-20">
      {/* Hero Banner */}
      <div className="relative h-[400px] sm:h-[440px] flex items-center justify-center">
        <img 
          src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1920&q=80" 
          alt="International travel documents"
          className="absolute inset-0 w-full h-full object-cover object-center brightness-[0.65]"
        />
        <div className="absolute inset-0 hero-gradient"></div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-6 w-full text-center flex flex-col items-center justify-center">
          <div className="text-white flex flex-col items-center">
            <span className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-sm text-brand-orange px-3 py-1 rounded-sm text-xs font-semibold uppercase tracking-widest mb-4 border border-white/20">
              <FileCheck size={13} /> 99.2% Visa Approval Rate
            </span>
            <h1 className="text-4xl sm:text-6xl font-bold serif mb-4 tracking-tight leading-tight text-center">
              Visa Assistance & Processing
            </h1>
            <p className="text-base sm:text-lg text-gray-200 font-light leading-relaxed max-w-2xl mx-auto text-center">
              Complete document verification, expedited VFS appointments, form filling, and express e-visa approvals for 45+ countries.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 -mt-16 relative z-30">
        {/* Visa Search Bar */}
        <div className="bg-white p-6 rounded-sm shadow-md border border-[#e5e5e5] mb-12">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="flex-1 w-full relative">
              <input
                type="text"
                placeholder="Search country (e.g. Dubai, Schengen, UK, US, Singapore, Thailand)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full p-3.5 pl-11 border border-[#e5e5e5] rounded-sm text-xs sm:text-sm font-semibold outline-none focus:border-brand-maroon bg-[#FAF9F6] focus:bg-white"
              />
              <FileCheck size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-maroon" />
            </div>
            <button
              onClick={() => onOpenBookModal('Visa')}
              className="w-full sm:w-auto bg-brand-maroon hover:bg-brand-maroon-dark text-white px-7 py-3.5 rounded-sm font-semibold text-xs sm:text-sm shadow-xs transition whitespace-nowrap cursor-pointer"
            >
              Get Free Visa Consultation
            </button>
          </div>
        </div>

        {/* Visas Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {filteredVisas.map((visa) => (
            <div
              key={visa.id}
              id={`visa-card-${visa.id}`}
              onClick={() => onSelectVisa(visa)}
              className="bg-white rounded-sm overflow-hidden shadow-xs hover:shadow-lg border border-[#e5e5e5] transition-all duration-300 flex flex-col justify-between group cursor-pointer"
            >
              <div>
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={visa.image}
                    alt={visa.country}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  <div className="absolute top-4 left-4 bg-[#1a2b48]/85 backdrop-blur-xs text-white text-xs font-semibold px-3 py-1 rounded-sm flex items-center gap-1.5">
                    <span className="text-base leading-none">{visa.flag}</span>
                    <span>{visa.country}</span>
                  </div>
                  <div className="absolute bottom-3 right-4 bg-emerald-600 text-white text-[10px] font-semibold px-2.5 py-0.5 rounded-sm flex items-center gap-1">
                    <Clock size={11} />
                    <span>{visa.processingTime}</span>
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <div>
                    <h3 className="font-bold serif text-xl text-[#1a2b48] group-hover:text-brand-maroon transition-colors mb-1">
                      {visa.visaType}
                    </h3>
                    <p className="text-xs text-gray-500 font-light">
                      Stay: <strong className="text-gray-700 font-medium">{visa.stayPeriod}</strong> • Validity: <strong className="text-gray-700 font-medium">{visa.validity}</strong>
                    </p>
                  </div>

                  <div className="bg-[#FAF9F6] p-3 rounded-sm border border-[#e5e5e5] space-y-1.5 text-xs">
                    <span className="font-semibold text-gray-400 uppercase text-[9px] tracking-wider block">Key Documents:</span>
                    {visa.documents.slice(0, 2).map((doc, i) => (
                      <p key={i} className="text-gray-600 flex items-center gap-1.5 line-clamp-1 font-light">
                        <CheckCircle2 size={12} className="text-emerald-600 shrink-0" />
                        <span>{doc}</span>
                      </p>
                    ))}
                  </div>
                </div>
              </div>

              <div className="px-6 pb-6 pt-4 border-t border-[#e5e5e5] bg-[#FAF9F6] flex items-center justify-between">
                <div>
                  <span className="text-[9px] text-gray-400 font-semibold uppercase block">All Inclusive Fee</span>
                  <p className="text-2xl font-bold serif text-brand-maroon">{visa.fee}</p>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectVisa(visa);
                  }}
                  className="bg-brand-maroon hover:bg-brand-maroon-dark text-white px-4 py-2 rounded-sm text-xs font-semibold shadow-xs transition flex items-center gap-1 cursor-pointer"
                >
                  <span>Apply Now</span>
                  <ArrowRight size={13} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* 4-Step Visa Process */}
        <div className="bg-white rounded-sm p-8 sm:p-12 border border-[#e5e5e5] shadow-xs mb-16">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-semibold uppercase tracking-widest text-brand-orange block mb-1">Simple & Fast</span>
            <h2 className="text-3xl font-bold serif text-[#1a2b48]">How Our Visa Service Works</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {[
              { num: '01', title: 'Submit Documents', desc: 'Upload your passport scan & photos or send them via WhatsApp to our visa coordinator.' },
              { num: '02', title: 'Expert Verification', desc: 'Our senior visa lawyers review every document to ensure 100% compliance with embassy rules.' },
              { num: '03', title: 'Appointment & Filing', desc: 'We book your earliest VFS slot and handle all online embassy submissions.' },
              { num: '04', title: 'Visa Approved', desc: 'Receive your approved eVisa via email or stamped passport delivered safely to your door.' }
            ].map((step, idx) => (
              <div key={idx} className="bg-[#FAF9F6] p-6 rounded-sm border border-[#e5e5e5] relative">
                <span className="text-2xl font-bold serif text-brand-maroon/30 mb-2 block">{step.num}</span>
                <h4 className="font-bold serif text-base text-[#1a2b48] mb-2">{step.title}</h4>
                <p className="text-xs text-gray-500 leading-relaxed font-light">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};
export default VisaPage;
