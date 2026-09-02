import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Toast from './components/Toast';
import { LeadProvider, useLeadForm } from './context/LeadContext';

import HomePage from './pages/HomePage';
import FlightsPage from './pages/FlightsPage';
import HolidaysPage from './pages/HolidaysPage';
import HotelsPage from './pages/HotelsPage';
import VisaPage from './pages/VisaPage';
import ContactPage from './pages/ContactPage';

import type { SearchTab } from './components/SearchWidget';

type Service = 'Flights' | 'Hotels' | 'Holidays' | 'Visa';

interface AppShellProps {
  onShowToast: (msg: string) => void;
}

/**
 * Single unified flow: every CTA on every page opens the ONE common enquiry
 * form (LeadContext -> LeadFormModal). Context strings carry page-specific
 * details so the owner email always shows what the user was looking at.
 */
const AppShell: React.FC<AppShellProps> = ({ onShowToast }) => {
  const { openLead } = useLeadForm();
  const [activePage, setActivePage] = useState<string>('Home');

  const handleNavigate = (page: string) => {
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Navbar "Book Now" - generic booking enquiry per service.
  const handleOpenBooking = (service?: Service) => {
    openLead(`${service || 'Travel'} Booking — General Enquiry`);
  };

  const handleSearchSubmitted = (tab: SearchTab, params: Record<string, string>) => {
    if (tab === 'Flights') {
      setActivePage('Flights');
      onShowToast(`Showing flights from ${params.from || 'Mumbai'} to ${params.to || 'Dubai'}...`);
    } else if (tab === 'Hotels') {
      setActivePage('Hotels');
      onShowToast(`Showing luxury stays in ${params.city || 'Dubai'}...`);
    } else if (tab === 'Holidays') {
      setActivePage('Holidays');
      onShowToast(`Filtering packages for ${params.destination || 'All Destinations'}...`);
    } else if (tab === 'Visa') {
      setActivePage('Visa');
      onShowToast(`Opening visa application requirements for ${params.country || 'selected destination'}...`);
    }
  };

  return (
    <div className="flex flex-col min-h-screen font-sans bg-[#FAF9F6] text-[#1a2b48] antialiased selection:bg-brand-maroon selection:text-white">
      {/* Global Navigation Bar */}
      <Navbar
        activePage={activePage}
        onNavigate={handleNavigate}
        onOpenBookModal={handleOpenBooking}
      />

      {/* Dynamic Page Views */}
      <div className="flex-1">
        {activePage === 'Home' && (
          <HomePage
            onNavigate={handleNavigate}
            onSearchSubmitted={handleSearchSubmitted}
          />
        )}

        {activePage === 'Flights' && <FlightsPage onNavigate={handleNavigate} onShowToast={onShowToast} />}

        {activePage === 'Holidays' && <HolidaysPage onShowToast={onShowToast} />}

        {activePage === 'Hotels' && <HotelsPage />}

        {activePage === 'Visa' && (
          <VisaPage onNavigate={handleNavigate} />
        )}

        {activePage === 'Contact' && <ContactPage onShowToast={onShowToast} />}
      </div>

      {/* Global Footer */}
      <Footer onNavigate={handleNavigate} onShowToast={onShowToast} />
    </div>
  );
};

export function App() {
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const showToast = (msg: string) => setToastMessage(msg);

  return (
    <>
      <LeadProvider onSuccess={showToast}>
        <AppShell onShowToast={showToast} />
      </LeadProvider>
      <Toast message={toastMessage} onClose={() => setToastMessage(null)} />
    </>
  );
}

export default App;
