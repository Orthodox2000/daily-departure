import React from 'react';
import {
  X,
  Star,
  MapPin,
  Clock,
  CheckCircle2,
  XCircle,
  Hotel,
  PlaneTakeoff,
  FileCheck,
  Ticket,
  Bus,
  Info,
  CalendarRange
} from 'lucide-react';
import type { HolidayPackage } from '../data/travelData';

interface PackageDetailModalProps {
  pkg: HolidayPackage;
  onClose: () => void;
  onEnquire: () => void;
}

const INCLUDE_ITEMS: { key: keyof HolidayPackage['includes']; label: string; icon: React.ReactNode }[] = [
  { key: 'hotel', label: 'Hotel Accomodation', icon: <Hotel size={16} /> },
  { key: 'flight', label: 'Flight Tickets', icon: <PlaneTakeoff size={16} /> },
  { key: 'visa', label: 'Visa', icon: <FileCheck size={16} /> },
  { key: 'entranceTickets', label: 'Entrance Tickets', icon: <Ticket size={16} /> },
  { key: 'transportation', label: 'Transportation', icon: <Bus size={16} /> }
];

export const PackageDetailModal: React.FC<PackageDetailModalProps> = ({ pkg, onClose, onEnquire }) => {
  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-3xl rounded-2xl shadow-2xl border border-gray-100 overflow-hidden flex flex-col max-h-[92vh] animate-in slide-in-from-bottom-8 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="relative h-52 sm:h-64 shrink-0">
          <img
            src={pkg.image}
            alt={pkg.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
          <button
            onClick={onClose}
            className="absolute top-3 right-3 bg-black/40 hover:bg-black/70 text-white p-1.5 rounded-full transition-colors cursor-pointer"
            aria-label="Close details"
          >
            <X size={20} />
          </button>
          <div className="absolute bottom-4 left-5 right-5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-brand-orange bg-black/40 px-2.5 py-0.5 rounded-sm inline-block mb-2">
              {pkg.category}
            </span>
            <h3 className="font-bold serif text-2xl sm:text-3xl text-white leading-tight">{pkg.title}</h3>
            <p className="text-xs text-white/85 flex items-center gap-1.5 mt-1">
              <MapPin size={13} /> {pkg.destination}
            </p>
          </div>
        </div>

        {/* Body */}
        <div className="overflow-y-auto flex-1 p-5 sm:p-7 space-y-6">
          {/* Quick facts */}
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-gray-600">
            <span className="flex items-center gap-1.5">
              <Clock size={14} className="text-brand-maroon" /> {pkg.duration}
            </span>
            <span className="flex items-center gap-1.5 text-amber-600 font-bold">
              <Star size={14} fill="currentColor" /> {pkg.rating}
              <span className="text-gray-400 font-normal">({pkg.reviewsCount} reviews)</span>
            </span>
            <span className="flex items-center gap-1.5 font-bold text-brand-maroon text-sm">
              <span className="font-medium text-gray-400">From</span> {pkg.price}
              <span className="text-xs text-gray-400 line-through font-normal">{pkg.originalPrice}</span>
            </span>
          </div>

          {/* Highlights */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Highlights</h4>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {pkg.highlights.map((h, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-[#1a2b48]">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-orange mt-1.5 shrink-0" />
                  {h}
                </li>
              ))}
            </ul>
          </div>

          {/* What's Included in the Cost */}
          <div>
            <h4 className="flex items-center gap-2 text-base font-bold serif text-[#1a2b48] mb-1">
              <Info size={16} className="text-brand-maroon" /> What's Included in the Cost
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
              {INCLUDE_ITEMS.map(({ key, label, icon }) => (
                <div key={key} className="flex items-start gap-3 border border-gray-100 rounded-lg p-3 bg-[#FAF9F6]">
                  <div className="w-8 h-8 rounded-md bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                    {icon}
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">{label}</p>
                    <p className="text-sm font-medium text-[#1a2b48] leading-snug">{pkg.includes[key]}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Exclusions */}
          <div>
            <h4 className="flex items-center gap-2 text-base font-bold serif text-[#1a2b48] mb-1">
              <XCircle size={16} className="text-red-500" /> Excluded from Cost
            </h4>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
              {pkg.exclusions.map((ex, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                  <XCircle size={14} className="text-red-400 mt-0.5 shrink-0" />
                  {ex}
                </li>
              ))}
            </ul>
          </div>

          {/* Itinerary */}
          <div>
            <h4 className="flex items-center gap-2 text-base font-bold serif text-[#1a2b48] mb-3">
              <CalendarRange size={16} className="text-brand-maroon" /> Day-by-Day Itinerary
            </h4>
            <ol className="border-l-2 border-brand-orange/60 pl-5 space-y-4">
              {pkg.itinerary.map((day) => (
                <li key={day.day} className="relative">
                  <span className="absolute -left-[27px] top-0.5 w-4 h-4 rounded-full bg-brand-orange border-2 border-white shadow-sm" />
                  <p className="text-sm font-bold text-[#1a2b48]">
                    Day {day.day} — <span className="font-semibold">{day.title}</span>
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{day.desc}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* Footer CTA */}
        <div className="shrink-0 border-t border-gray-100 bg-[#FAF9F6] px-5 sm:px-7 py-4 flex items-center justify-between gap-4">
          <div>
            <span className="text-[10px] text-gray-400 block uppercase font-medium">All Inclusive From</span>
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-bold serif text-brand-maroon">{pkg.price}</span>
              <span className="text-xs text-gray-400 line-through">{pkg.originalPrice}</span>
            </div>
          </div>
          <button
            onClick={onEnquire}
            className="bg-brand-maroon hover:bg-brand-maroon-dark text-white px-6 py-3 rounded-xl font-bold text-sm shadow-md transition flex items-center gap-2 cursor-pointer"
          >
            <CheckCircle2 size={16} />
            Enquire Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default PackageDetailModal;
