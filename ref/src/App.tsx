import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Toast from './components/Toast';
import FlightBookingModal from './components/FlightBookingModal';
import HolidayDetailModal from './components/HolidayDetailModal';
import HotelDetailModal from './components/HotelDetailModal';
import VisaApplyModal from './components/VisaApplyModal';
import UniversalBookingModal from './components/UniversalBookingModal';

import HomePage from './pages/HomePage';
import FlightsPage from './pages/FlightsPage';
import HolidaysPage from './pages/HolidaysPage';
import HotelsPage from './pages/HotelsPage';
import VisaPage from './pages/VisaPage';
import ContactPage from './pages/ContactPage';

import { Destination, FlightDeal, HolidayPackage, Hotel, VisaService, HOLIDAY_PACKAGES } from './data/travelData';
import { SearchTab } from './components/SearchWidget';

export function App() {
  const [activePage, setActivePage] = useState<string>('Home');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Modal States
  const [selectedFlight, setSelectedFlight] = useState<FlightDeal | null>(null);
  const [selectedPackage, setSelectedPackage] = useState<HolidayPackage | null>(null);
  const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(null);
  const [selectedVisa, setSelectedVisa] = useState<VisaService | null>(null);
  const [universalModalService, setUniversalModalService] = useState<'Flights' | 'Hotels' | 'Holidays' | 'Visa' | null>(null);

  // Listen to browser hash or history if needed
  const handleNavigate = (page: string) => {
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
  };

  const handleSelectDestination = (dest: Destination) => {
    // Check if matching holiday package exists
    const matchedPkg = HOLIDAY_PACKAGES.find(
      p => p.destination.toLowerCase().includes(dest.name.toLowerCase()) || 
           dest.name.toLowerCase().includes(p.destination.toLowerCase())
    );
    if (matchedPkg) {
      setSelectedPackage(matchedPkg);
    } else {
      setActivePage('Holidays');
      showToast(`Exploring curated holiday packages for ${dest.name}...`);
    }
  };

  const handleSearchSubmitted = (tab: SearchTab, params: Record<string, string>) => {
    if (tab === 'Flights') {
      setActivePage('Flights');
      showToast(`Showing flights from ${params.from || 'Mumbai'} to ${params.to || 'Dubai'}...`);
    } else if (tab === 'Hotels') {
      setActivePage('Hotels');
      showToast(`Showing luxury stays in ${params.city || 'Dubai'}...`);
    } else if (tab === 'Holidays') {
      setActivePage('Holidays');
      showToast(`Filtering packages for ${params.destination || 'All Destinations'}...`);
    } else if (tab === 'Visa') {
      setActivePage('Visa');
      showToast(`Opening visa application requirements for ${params.country || 'selected destination'}...`);
    }
  };

  return (
    <div className="flex flex-col min-h-screen font-sans bg-[#FAF9F6] text-[#1a2b48] antialiased selection:bg-brand-maroon selection:text-white">
      {/* Global Navigation Bar */}
      <Navbar 
        activePage={activePage} 
        onNavigate={handleNavigate} 
        onOpenBookModal={(service) => setUniversalModalService(service || 'Holidays')}
      />

      {/* Dynamic Page Views */}
      <div className="flex-1">
        {activePage === 'Home' && (
          <HomePage 
            onNavigate={handleNavigate}
            onSelectDestination={handleSelectDestination}
            onSelectPackage={(pkg) => setSelectedPackage(pkg)}
            onOpenBookModal={(service) => setUniversalModalService(service || 'Holidays')}
            onSearchSubmitted={handleSearchSubmitted}
          />
        )}

        {activePage === 'Flights' && (
          <FlightsPage 
            onSelectFlight={(flight) => setSelectedFlight(flight)}
            onOpenBookModal={(service) => setUniversalModalService(service || 'Flights')}
          />
        )}

        {activePage === 'Holidays' && (
          <HolidaysPage 
            onSelectPackage={(pkg) => setSelectedPackage(pkg)}
            onOpenBookModal={(service) => setUniversalModalService(service || 'Holidays')}
          />
        )}

        {activePage === 'Hotels' && (
          <HotelsPage 
            onSelectHotel={(hotel) => setSelectedHotel(hotel)}
            onOpenBookModal={(service) => setUniversalModalService(service || 'Hotels')}
          />
        )}

        {activePage === 'Visa' && (
          <VisaPage 
            onSelectVisa={(visa) => setSelectedVisa(visa)}
            onOpenBookModal={(service) => setUniversalModalService(service || 'Visa')}
          />
        )}

        {activePage === 'Contact' && (
          <ContactPage onShowToast={showToast} />
        )}
      </div>

      {/* Global Footer */}
      <Footer onNavigate={handleNavigate} onShowToast={showToast} />

      {/* Modals & Dialogs */}
      {selectedFlight && (
        <FlightBookingModal
          flight={selectedFlight}
          onClose={() => setSelectedFlight(null)}
          onSuccess={(details) => {
            showToast(`Flight booking confirmed! PNR: ${details.pnr} for ${details.travelerName}`);
          }}
        />
      )}

      {selectedPackage && (
        <HolidayDetailModal
          pkg={selectedPackage}
          onClose={() => setSelectedPackage(null)}
          onInquirySubmitted={(msg) => showToast(msg)}
        />
      )}

      {selectedHotel && (
        <HotelDetailModal
          hotel={selectedHotel}
          onClose={() => setSelectedHotel(null)}
          onBookSuccess={(details) => {
            showToast(`Hotel reservation confirmed for ${details.guestName} at ${details.hotel.name}!`);
          }}
        />
      )}

      {selectedVisa && (
        <VisaApplyModal
          visa={selectedVisa}
          onClose={() => setSelectedVisa(null)}
          onSubmitSuccess={(msg) => showToast(msg)}
        />
      )}

      {universalModalService && (
        <UniversalBookingModal
          initialService={universalModalService}
          onClose={() => setUniversalModalService(null)}
          onSuccess={(msg) => showToast(msg)}
        />
      )}

      {/* Notification Toast */}
      <Toast message={toastMessage} onClose={() => setToastMessage(null)} />
    </div>
  );
}

export default App;
