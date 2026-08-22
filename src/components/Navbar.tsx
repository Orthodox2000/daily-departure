import React, { useState } from 'react';
import { Plane, Menu, X, PhoneCall } from 'lucide-react';

interface NavbarProps {
  activePage: string;
  onNavigate: (page: string) => void;
  onOpenBookModal: (service?: 'Flights' | 'Hotels' | 'Holidays' | 'Visa') => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activePage, onNavigate, onOpenBookModal }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const links = ["Home", "Flights", "Holidays", "Hotels", "Visa", "Contact"];

  const handleNavClick = (page: string) => {
    onNavigate(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="bg-white border-b border-gray-100 py-3.5 px-6 sm:px-10 lg:px-16 flex justify-between items-center sticky top-0 z-50 shadow-xs">
      {/* Brand Logo matching screenshot */}
      <div 
        id="navbar-brand"
        onClick={() => handleNavClick("Home")}
        className="flex items-center gap-2.5 cursor-pointer select-none group"
      >
        {/* Company logo mark (public/images/logo-small.jpeg) */}
        <img
          src="/images/logo-small.jpeg"
          alt="Daily Departure logo"
          referrerPolicy="no-referrer"
          className="w-10 h-10 rounded-full object-cover ring-1 ring-gray-200 shadow-xs group-hover:ring-[#800020]/40 transition-all"
        />
        {/* Previous CSS-drawn logo kept for reference
        <div className="w-10 h-10 rounded-full bg-[#1a2b48] flex items-center justify-center text-white relative shadow-xs">
          <span className="font-serif font-bold text-lg italic text-white tracking-tighter">D</span>
          <span className="font-serif font-bold text-sm text-brand-orange -ml-0.5">b</span>
          <Plane size={11} className="absolute -top-1 -right-1 text-brand-orange transform rotate-45" />
        </div>
        End of previous logo */}
        <div className="flex flex-col">
          <h1 className="font-bold text-lg sm:text-xl text-[#1a2b48] tracking-tight leading-tight">
            Daily Departure
          </h1>
          <p className="text-[9px] text-brand-orange font-semibold tracking-wider uppercase">
            Explore More. Worry Less.
          </p>
        </div>
      </div>

      {/* Desktop Navigation Links */}
      <nav id="desktop-nav" className="hidden md:flex items-center gap-6 lg:gap-8 font-medium text-sm text-gray-600">
        {links.map((link) => {
          const isActive = activePage.toLowerCase() === link.toLowerCase();
          return (
            <button
              key={link}
              id={`nav-link-${link.toLowerCase()}`}
              onClick={() => handleNavClick(link)}
              className={`relative py-1.5 text-sm transition-colors duration-200 cursor-pointer ${
                isActive 
                  ? 'text-[#800020] font-semibold border-b-2 border-[#800020]' 
                  : 'text-gray-600 hover:text-[#800020]'
              }`}
            >
              {link}
            </button>
          );
        })}
      </nav>

      {/* Right Book Now CTA matching screenshot */}
      <div className="hidden md:flex items-center gap-4">
        <button 
          id="btn-book-now-header"
          onClick={() => onOpenBookModal()}
          className="bg-[#800020] hover:bg-[#600018] text-white px-5 py-2 rounded-lg font-medium text-sm transition-all duration-200 shadow-xs flex items-center gap-2 cursor-pointer active:scale-95"
        >
          <Plane size={15} />
          <span>Book Now</span>
        </button>
      </div>

      {/* Mobile Hamburger Button */}
      <div className="flex items-center gap-2 md:hidden">
        <button
          id="btn-book-now-header-mobile-sm"
          onClick={() => onOpenBookModal()}
          className="bg-[#800020] text-white px-3.5 py-1.5 rounded-md text-xs font-semibold flex items-center gap-1.5"
        >
          <Plane size={13} />
          <span>Book Now</span>
        </button>
        <button
          id="mobile-menu-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-1.5 text-gray-700 hover:text-[#800020] rounded-md transition-colors cursor-pointer"
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-[62px] bg-white border-b border-gray-200 shadow-xl p-5 z-50 animate-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col space-y-3">
            {links.map((link) => {
              const isActive = activePage.toLowerCase() === link.toLowerCase();
              return (
                <button
                  key={link}
                  id={`mobile-nav-link-${link.toLowerCase()}`}
                  onClick={() => handleNavClick(link)}
                  className={`text-left text-sm font-semibold py-2 px-3 rounded-md transition-colors ${
                    isActive 
                      ? 'bg-[#800020]/10 text-[#800020] font-bold' 
                      : 'text-gray-700 hover:bg-gray-50 hover:text-[#800020]'
                  }`}
                >
                  {link}
                </button>
              );
            })}
          </nav>
          
          <div className="mt-5 pt-4 border-t border-gray-100 flex flex-col gap-2.5">
            <a 
              href="tel:+919876543210" 
              className="flex items-center justify-center gap-2 py-2 rounded-md bg-gray-50 text-xs font-semibold text-gray-700"
            >
              <PhoneCall size={14} className="text-[#800020]" />
              <span>+91 98765 43210</span>
            </a>
            <button
              id="mobile-drawer-book-now"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBookModal();
              }}
              className="w-full bg-[#800020] text-white py-2.5 rounded-lg text-sm font-medium flex items-center justify-center gap-2 shadow-xs hover:bg-[#600018]"
            >
              <Plane size={16} />
              <span>Book Now</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
export default Navbar;
