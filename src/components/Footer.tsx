import React, { useState } from 'react';
// Synced with ref/src/components/Footer.tsx - updated footer design.
import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react';
import { useLeadForm } from '../context/LeadContext';

interface FooterProps {
  onNavigate: (page: string) => void;
  onShowToast: (msg: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onShowToast }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const { openLead } = useLeadForm();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    // Routed to the unified lead form - no direct subscription endpoint.
    openLead(`Newsletter Subscription${email ? ` - ${email}` : ''}`);
    // Previous subscribe flow kept for reference:
    // if (!email || !email.includes('@')) {
    //   onShowToast('Please enter a valid email address.');
    //   return;
    // }
    // setSubscribed(true);
    // onShowToast(`Thank you for subscribing! Exclusive travel offers will be sent to ${email}`);
    // setEmail('');
  };

  const handleLinkClick = (page: string) => {
    onNavigate(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-brand-navy text-gray-300 pt-16 pb-8 border-t border-[#e5e5e5]">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 border-b border-gray-700/60 pb-12">
        {/* Col 1: Brand & Bio */}
        <div className="space-y-4">
          <div 
            onClick={() => handleLinkClick("Home")}
            className="flex items-center gap-3 text-white cursor-pointer select-none group"
          >
            {/* Company logo mark (public/images/logo-small.jpeg) */}
            <img
              src="/images/logo-small.jpeg"
              alt="Daily Departure logo"
              referrerPolicy="no-referrer"
              className="w-11 h-11 rounded-xl object-cover ring-1 ring-white/20 shadow-md group-hover:scale-105 transition-transform"
            />
            {/* Previous icon-based brand kept for reference:
            <div className="bg-brand-maroon text-white p-2.5 rounded-xl shadow-md group-hover:scale-105 transition-transform flex items-center justify-center">
              <PlaneTakeoff size={22} className="text-white" />
            </div>
            */}
            <div className="leading-none flex flex-col">
              <span className="font-extrabold text-xl leading-none text-white block">Daily Departure</span>
              <span className="text-[10px] text-brand-orange font-bold tracking-widest uppercase mt-1">EXPLORE MORE. WORRY LESS.</span>
            </div>
          </div>
          <p className="text-xs text-gray-400 leading-relaxed font-light">
            Your trusted travel partner for curated journeys. Specializing in customized international holidays, instant flight reservations, boutique hotel stays, and guaranteed visa assistance.
          </p>
          <div className="flex gap-2 pt-2">
            {[
              { Icon: Facebook, href: '#facebook', label: 'Facebook' },
              { Icon: Instagram, href: '#instagram', label: 'Instagram' },
              { Icon: Twitter, href: '#twitter', label: 'Twitter' },
              { Icon: Youtube, href: '#youtube', label: 'YouTube' }
            ].map(({ Icon, href, label }, i) => (
              <a 
                key={i} 
                href={href} 
                aria-label={label}
                onClick={(e) => { e.preventDefault(); onShowToast(`Opening ${label} channel...`); }}
                className="bg-white/10 p-2.5 rounded-sm cursor-pointer hover:bg-brand-maroon text-gray-200 hover:text-white transition duration-200"
              >
                <Icon size={15}/>
              </a>
            ))}
          </div>
        </div>

        {/* Col 2: Quick Links */}
        <div>
          <h4 className="text-white font-bold serif text-base mb-6 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-orange"></span>
            Quick Links
          </h4>
          <ul className="text-xs space-y-3 font-normal">
            {["Home", "Flights", "Holidays", "Hotels", "Visa", "Contact"].map((item) => (
              <li key={item}>
                <button 
                  id={`footer-link-${item.toLowerCase()}`}
                  onClick={() => handleLinkClick(item)}
                  className="hover:text-brand-orange hover:translate-x-1 transition-all duration-200 text-gray-300 text-left cursor-pointer"
                >
                  {item}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 3: Contact Us */}
        <div>
          <h4 className="text-white font-bold serif text-base mb-6 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-orange"></span>
            Contact Us
          </h4>
          <ul className="text-xs space-y-4">
            <li>
              <a href="tel:+919876543210" className="flex items-start gap-3 hover:text-white transition-colors group">
                <div className="p-2 rounded-sm bg-white/10 text-brand-orange group-hover:bg-brand-maroon group-hover:text-white transition-colors mt-0.5">
                  <Phone size={14} />
                </div>
                <div>
                  <span className="text-[10px] text-gray-400 block uppercase tracking-wider">Helpline</span>
                  <span className="font-semibold text-white text-xs">+91 98765 43210</span>
                </div>
              </a>
            </li>
            <li>
              <a href="mailto:info@dailydeparture.com" className="flex items-start gap-3 hover:text-white transition-colors group">
                <div className="p-2 rounded-sm bg-white/10 text-brand-orange group-hover:bg-brand-maroon group-hover:text-white transition-colors mt-0.5">
                  <Mail size={14} />
                </div>
                <div>
                  <span className="text-[10px] text-gray-400 block uppercase tracking-wider">Email</span>
                  <span className="font-semibold text-white text-xs">info@dailydeparture.com</span>
                </div>
              </a>
            </li>
            <li>
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-sm bg-white/10 text-brand-orange mt-0.5">
                  <MapPin size={14} />
                </div>
                <div>
                  <span className="text-[10px] text-gray-400 block uppercase tracking-wider">Headquarters</span>
                  <span className="text-gray-300 text-xs">123, Travel Street, Andheri (E), Mumbai, India</span>
                </div>
              </div>
            </li>
          </ul>
        </div>

        {/* Col 4: Newsletter */}
        <div>
          <h4 className="text-white font-bold serif text-base mb-6 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-orange"></span>
            Newsletter
          </h4>
          <p className="text-xs text-gray-400 mb-4 leading-relaxed font-light">
            Subscribe to get flash sales, secret hotel discounts, and instant visa updates directly to your inbox.
          </p>
          <form onSubmit={handleSubscribe} className="space-y-2">
            <div className="flex bg-white rounded-sm overflow-hidden p-1">
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email" 
                className="p-2 w-full text-black text-xs outline-none placeholder:text-gray-400" 
                required
              />
              <button 
                type="submit"
                id="btn-footer-subscribe"
                className="bg-brand-maroon hover:bg-brand-maroon-dark text-white px-3.5 rounded-sm flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Subscribe to newsletter"
              >
                <Send size={14} />
              </button>
            </div>
            {subscribed && (
              <p className="text-xs text-emerald-400 flex items-center gap-1.5 pt-1">
                <CheckCircle2 size={13} /> Subscribed successfully!
              </p>
            )}
          </form>
          <div className="mt-4 pt-3 border-t border-gray-800">
            <p className="text-[11px] text-gray-400 font-light">
              Over <strong className="text-white font-semibold">25,000+</strong> happy travelers served across India & abroad.
            </p>
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="max-w-6xl mx-auto px-6 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-[11px] text-gray-400">
        <p>© {new Date().getFullYear()} Daily Departure. All Rights Reserved. Govt of India Approved Travel Agency.</p>
        <div className="flex gap-6">
          <button onClick={() => onShowToast('Privacy Policy: All personal data is securely encrypted.')} className="hover:text-gray-200 cursor-pointer">
            Privacy Policy
          </button>
          <button onClick={() => onShowToast('Terms & Conditions: Standard IATA and tour operator terms apply.')} className="hover:text-gray-200 cursor-pointer">
            Terms & Conditions
          </button>
          <button onClick={() => handleLinkClick('Contact')} className="hover:text-gray-200 cursor-pointer">
            Support Center
          </button>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
