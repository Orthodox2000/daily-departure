import React, { useState } from 'react';
import { X, FileCheck, CheckCircle2, Upload, Send } from 'lucide-react';
// Unused icons cleaned up: ShieldCheck, Clock, Calendar, AlertCircle
// import { X, FileCheck, CheckCircle2, ShieldCheck, Clock, Calendar, Upload, AlertCircle, Send } from 'lucide-react';
import { VisaService } from '../data/travelData';
import { useLeadForm } from '../context/LeadContext';

interface VisaApplyModalProps {
  visa: VisaService | null;
  onClose: () => void;
  onSubmitSuccess: (msg: string) => void;
}

export const VisaApplyModal: React.FC<VisaApplyModalProps> = ({ visa, onClose, onSubmitSuccess }) => {
  const [applicantName, setApplicantName] = useState('');
  const [passportNumber, setPassportNumber] = useState('');
  const [passportExpiry, setPassportExpiry] = useState('');
  const [travelDate, setTravelDate] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { openLead } = useLeadForm();

  if (!visa) return null;

  const handleSimulateUpload = (docName: string) => {
    if (!uploadedFiles.includes(docName)) {
      setUploadedFiles([...uploadedFiles, docName]);
    }
  };

  const handleVisaSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Routed to the unified lead form - no direct submission from this modal.
    openLead(`Visa Assistance - ${visa.country} (${visa.visaType || visa.types}), fee ${visa.fee}`);
    onClose();
    // Previous application flow kept for reference:
    // if (!applicantName || !passportNumber || !email || !phone) {
    //   alert('Please fill out all applicant fields.');
    //   return;
    // }
    // setIsSubmitted(true);
    // onSubmitSuccess(`Visa application submitted for ${visa.country}! Application Ref: DD-VISA-${Math.floor(10000 + Math.random() * 90000)}. We will contact you at ${phone}.`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-3xl rounded-2xl shadow-2xl border border-gray-100 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-brand-navy text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="text-2xl">{visa.flag}</div>
            <div>
              <h3 className="font-bold text-lg leading-tight">{visa.country} Visa Assistance</h3>
              <p className="text-xs text-gray-300">
                {visa.visaType || visa.types} • Processing: {visa.processingTime}
              </p>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white p-1 rounded-md transition-colors cursor-pointer">
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {isSubmitted ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 size={36} />
              </div>
              <h3 className="text-2xl font-black text-brand-navy">Visa Application Received!</h3>
              <p className="text-sm text-gray-600 max-w-md mx-auto">
                Our senior visa consulate team is reviewing your documents for <strong>{visa.country}</strong>. You will receive an official submission confirmation within 2 hours.
              </p>
              <button onClick={onClose} className="bg-brand-maroon text-white px-8 py-2.5 rounded-xl font-bold text-sm">
                Done
              </button>
            </div>
          ) : (
            <form onSubmit={handleVisaSubmit} className="space-y-6">
              {/* Visa Details Banner */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-gray-50 p-4 rounded-xl border border-gray-200 text-xs">
                <div>
                  <span className="text-gray-400 block font-semibold">Visa Type</span>
                  <span className="font-bold text-brand-navy">{visa.visaType || visa.types}</span>
                </div>
                <div>
                  <span className="text-gray-400 block font-semibold">Stay Duration</span>
                  <span className="font-bold text-brand-navy">{visa.stayPeriod}</span>
                </div>
                <div>
                  <span className="text-gray-400 block font-semibold">Processing Time</span>
                  <span className="font-bold text-brand-navy">{visa.processingTime}</span>
                </div>
                <div>
                  <span className="text-gray-400 block font-semibold">Total Fee</span>
                  <span className="font-black text-brand-maroon text-sm">{visa.fee}</span>
                </div>
              </div>

              {/* Applicant Details */}
              <div className="space-y-3">
                <h4 className="font-bold text-xs uppercase tracking-wider text-brand-navy">Primary Applicant Info</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-bold text-gray-500">Applicant Full Name (as on Passport) *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rahul Sharma"
                      value={applicantName}
                      onChange={(e) => setApplicantName(e.target.value)}
                      className="w-full p-2.5 border rounded-lg text-sm bg-white mt-1 outline-none focus:border-brand-maroon"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-gray-500">Passport Number *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Z1234567"
                      value={passportNumber}
                      onChange={(e) => setPassportNumber(e.target.value)}
                      className="w-full p-2.5 border rounded-lg text-sm bg-white mt-1 outline-none focus:border-brand-maroon"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-gray-500">Passport Expiry Date *</label>
                    <input
                      type="date"
                      required
                      value={passportExpiry}
                      onChange={(e) => setPassportExpiry(e.target.value)}
                      className="w-full p-2.5 border rounded-lg text-sm bg-white mt-1 outline-none focus:border-brand-maroon"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-gray-500">Target Travel Date *</label>
                    <input
                      type="date"
                      required
                      value={travelDate}
                      onChange={(e) => setTravelDate(e.target.value)}
                      className="w-full p-2.5 border rounded-lg text-sm bg-white mt-1 outline-none focus:border-brand-maroon"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-gray-500">Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="rahul@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full p-2.5 border rounded-lg text-sm bg-white mt-1 outline-none focus:border-brand-maroon"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-gray-500">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full p-2.5 border rounded-lg text-sm bg-white mt-1 outline-none focus:border-brand-maroon"
                    />
                  </div>
                </div>
              </div>

              {/* Document Checklist & Upload */}
              <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 space-y-3">
                <h4 className="font-bold text-xs uppercase tracking-wider text-brand-navy flex items-center gap-1.5">
                  <FileCheck size={16} className="text-brand-maroon" />
                  Mandatory Document Checklist
                </h4>
                <div className="space-y-2">
                  {visa.documents.map((doc, i) => {
                    const isUploaded = uploadedFiles.includes(doc);
                    return (
                      <div key={i} className="flex items-center justify-between p-2.5 bg-white rounded-lg border text-xs">
                        <span className="text-gray-700 font-medium pr-2">{doc}</span>
                        <button
                          type="button"
                          onClick={() => handleSimulateUpload(doc)}
                          className={`shrink-0 px-3 py-1 rounded-md text-[11px] font-bold flex items-center gap-1 cursor-pointer transition ${
                            isUploaded
                              ? 'bg-emerald-100 text-emerald-700'
                              : 'bg-brand-maroon/10 text-brand-maroon hover:bg-brand-maroon hover:text-white'
                          }`}
                        >
                          {isUploaded ? <><CheckCircle2 size={12}/> Attached</> : <><Upload size={12}/> Attach</>}
                        </button>
                      </div>
                    );
                  })}
                </div>
                <p className="text-[11px] text-gray-400">
                  * You can also WhatsApp your documents directly to our visa team after submitting.
                </p>
              </div>

              {/* Submit footer */}
              <div className="border-t pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <span className="text-xs text-gray-400">Visa Processing Fee</span>
                  <p className="text-2xl font-black text-brand-maroon">{visa.fee}</p>
                </div>
                <button
                  type="submit"
                  className="w-full sm:w-auto bg-brand-maroon hover:bg-brand-maroon-dark text-white px-8 py-3 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-brand-maroon/20 transition cursor-pointer"
                >
                  <Send size={16} />
                  <span>Submit Visa Application</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
export default VisaApplyModal;
