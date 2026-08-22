import React, { useState } from 'react';
import { PlaneTakeoff, Menu, X, PhoneCall, Sparkles } from 'lucide-react';

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
    <header className="bg-white border-b border-[#e5e5e5] py-4 px-6 sm:px-10 md:px-14 flex justify-between items-center sticky top-0 z-50 shadow-xs">
      {/* Brand Logo */}
      <div 
        id="navbar-brand"
        onClick={() => handleNavClick("Home")}
        className="flex items-center gap-3 cursor-pointer select-none group"
      >
        <div className="bg-brand-maroon text-white p-2.5 rounded-xl shadow-md group-hover:scale-105 transition-transform flex items-center justify-center">
          <PlaneTakeoff size={22} className="text-white" />
        </div>
        <div className="flex flex-col">
          <h1 className="font-extrabold text-xl text-brand-navy tracking-tight leading-none flex items-center gap-1.5">
            <span>Daily Departure</span>
          </h1>
          <p className="text-[10px] text-brand-orange font-bold tracking-widest uppercase mt-0.5">
            Explore More. Worry Less.
          </p>
        </div>
      </div>

      {/* Desktop Navigation Links */}
      <nav id="desktop-nav" className="hidden lg:flex items-center gap-8 xl:gap-10 font-medium text-sm tracking-wide text-gray-500">
        {links.map((link) => {
          const isActive = activePage.toLowerCase() === link.toLowerCase();
          return (
            <button
              key={link}
              id={`nav-link-${link.toLowerCase()}`}
              onClick={() => handleNavClick(link)}
              className={`relative py-1 text-sm tracking-wide transition-colors duration-200 cursor-pointer ${
                isActive 
                  ? 'text-brand-maroon font-bold border-b-2 border-brand-maroon pb-0.5' 
                  : 'text-gray-500 hover:text-brand-maroon'
              }`}
            >
              {link}
            </button>
          );
        })}
      </nav>

      {/* Right CTAs */}
      <div className="hidden sm:flex items-center gap-4">
        <a 
          href="tel:+919876543210" 
          className="hidden xl:flex items-center gap-2 text-xs font-semibold text-gray-600 hover:text-brand-maroon transition-colors py-1.5 px-3 rounded-sm bg-[#FAF9F6] border border-[#e5e5e5]"
        >
          <PhoneCall size={13} className="text-brand-maroon" />
          <span>+91 98765 43210</span>
        </a>

        <button 
          id="btn-book-now-header"
          onClick={() => onOpenBookModal()}
          className="bg-brand-maroon text-white px-7 py-2.5 rounded-sm font-semibold text-sm hover:bg-brand-maroon-dark transition-all duration-200 shadow-sm flex items-center gap-2 cursor-pointer active:scale-95"
        >
          <PlaneTakeoff size={16} />
          <span>Book Your Trip</span>
        </button>
      </div>

      {/* Mobile Hamburger Button */}
      <div className="flex items-center gap-2 lg:hidden">
        <button
          id="btn-book-now-header-mobile-sm"
          onClick={() => onOpenBookModal()}
          className="sm:hidden bg-brand-maroon text-white px-3 py-1.5 rounded-sm text-xs font-bold flex items-center gap-1"
        >
          <PlaneTakeoff size={14} />
          <span>Book</span>
        </button>
        <button
          id="mobile-menu-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 text-gray-700 hover:text-brand-maroon hover:bg-gray-100 rounded-sm transition-colors cursor-pointer"
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[69px] bg-white border-b border-[#e5e5e5] shadow-xl p-6 z-50 animate-in slide-in-from-top-4 duration-200">
          <nav className="flex flex-col space-y-4">
            {links.map((link) => {
              const isActive = activePage.toLowerCase() === link.toLowerCase();
              return (
                <button
                  key={link}
                  id={`mobile-nav-link-${link.toLowerCase()}`}
                  onClick={() => handleNavClick(link)}
                  className={`text-left text-base font-semibold py-2 px-3 rounded-sm transition-colors ${
                    isActive 
                      ? 'bg-brand-maroon/10 text-brand-maroon font-bold' 
                      : 'text-gray-700 hover:bg-gray-50 hover:text-brand-maroon'
                  }`}
                >
                  {link}
                </button>
              );
            })}
          </nav>
          
          <div className="mt-6 pt-6 border-t border-gray-100 flex flex-col gap-3">
            <a 
              href="tel:+919876543210" 
              className="flex items-center justify-center gap-2 py-2.5 rounded-sm bg-[#FAF9F6] border border-[#e5e5e5] text-sm font-semibold text-gray-700"
            >
              <PhoneCall size={16} className="text-brand-maroon" />
              <span>Call Us: +91 98765 43210</span>
            </a>
            <button
              id="mobile-drawer-book-now"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBookModal();
              }}
              className="w-full bg-brand-maroon text-white py-3 rounded-sm text-sm font-semibold flex items-center justify-center gap-2 shadow-sm hover:bg-brand-maroon-dark"
            >
              <PlaneTakeoff size={18} />
              <span>Book Your Trip</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
export default Navbar;
