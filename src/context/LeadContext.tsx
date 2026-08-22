import React, { createContext, useCallback, useContext, useState } from 'react';
import LeadFormModal, { LeadSuccessNote } from '../components/LeadFormModal';
import { submitLead } from '../api/client';

interface LeadContextValue {
  /**
   * Opens the unified lead form.
   * @param source Auto-filled context of what triggered it,
   *               e.g. "Flight Booking — IndiGo BOM → DXB"
   */
  openLead: (source: string) => void;
}

const LeadContext = createContext<LeadContextValue>({ openLead: () => undefined });

export const useLeadForm = () => useContext(LeadContext);

interface LeadProviderProps {
  /** Toast callback so the provider can announce success */
  onSuccess?: (message: string) => void;
  children: React.ReactNode;
}

/**
 * App-wide provider that owns the single unified lead form.
 * All forms / booking modals / subscribe actions route through openLead()
 * instead of submitting anywhere themselves. No data leaves the browser yet -
 * api/client.ts stubs the network call until the backend is written.
 */
export const LeadProvider: React.FC<LeadProviderProps> = ({ onSuccess, children }) => {
  const [source, setSource] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const openLead = useCallback((triggerSource: string) => {
    setSource(triggerSource);
    setSubmitted(false);
    setSubmitting(false);
  }, []);

  const close = useCallback(() => {
    setSource(null);
    setSubmitting(false);
    // Keep `submitted` true briefly so the success note can render its exit
    setTimeout(() => setSubmitted(false), 200);
  }, []);

  const handleSubmit = async (payload: { name: string; email: string; countryCode: string; phone: string; message: string }) => {
    if (!source) return;
    setSubmitting(true);
    try {
      await submitLead({
        name: payload.name,
        email: payload.email,
        countryCode: payload.countryCode,
        phone: `${payload.countryCode} ${payload.phone}`.trim(),
        source,
      });
      setSubmitting(false);
      setSubmitted(true);
      onSuccess?.('Request received! Our travel expert will contact you shortly.');
    } catch {
      setSubmitting(false);
      onSuccess?.('Something went wrong. Please try again.');
    }
  };

  return (
    <LeadContext.Provider value={{ openLead }}>
      {children}
      {source && !submitted && (
        <LeadFormModal
          key={source}
          source={source}
          submitting={submitting}
          onSubmit={handleSubmit}
          onClose={close}
        />
      )}
      {submitted && <LeadSuccessNote onClose={close} />}
    </LeadContext.Provider>
  );
};

export default LeadProvider;
