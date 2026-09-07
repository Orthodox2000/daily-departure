import React from 'react';
import { Star, MapPin, Clock, ArrowRight, PlaneTakeoff, Hotel, FileCheck, Ticket, Bus } from 'lucide-react';
import type { HolidayPackage } from '../data/travelData';

interface PackageCardProps {
  pkg: HolidayPackage;
  featured?: boolean;
  onView: (pkg: HolidayPackage) => void;
}

const PREVIEW_ICONS = [Hotel, PlaneTakeoff, FileCheck, Ticket, Bus];

export const PackageCard: React.FC<PackageCardProps> = ({ pkg, featured = false, onView }) => {
  const category = pkg.category;
  const duration = pkg.duration;

  return (
    <div
      onClick={() => onView(pkg)}
      className="bg-white rounded-xl overflow-hidden border border-gray-200/80 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between group cursor-pointer"
    >
      <div>
        <div className="relative h-44 overflow-hidden">
          <img
            src={pkg.image}
            alt={pkg.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
          />
          {featured && (
            <div className="absolute top-3 left-3 bg-brand-maroon text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-sm shadow-sm">
              {category}
            </div>
          )}
          <div className="absolute top-2.5 right-2.5 bg-[#800020] text-white text-[10px] font-semibold px-2.5 py-0.5 rounded-md">
            {duration}
          </div>
        </div>

        <div className="p-4 space-y-1.5">
          {featured && (
            <div className="flex items-center gap-1.5 text-xs text-amber-600 font-bold">
              <Star size={13} fill="currentColor" />
              <span>{pkg.rating}</span>
              <span className="text-gray-400 font-normal">({pkg.reviewsCount} reviews)</span>
            </div>
          )}

          <h3
            className={`font-bold serif text-[#1a2b48] group-hover:text-[#800020] transition-colors leading-tight ${
              featured ? 'text-lg' : 'text-base'
            }`}
          >
            {pkg.title}
          </h3>

          <p className="text-xs text-gray-400 flex items-center gap-1">
            <MapPin size={11} className="text-gray-400" />
            <span>{pkg.destination}</span>
          </p>

          <p className="text-xs text-gray-400 flex items-center gap-1">
            <Clock size={11} className="text-gray-400" />
            <span>{duration}</span>
          </p>

          {/* Compact inclusion preview */}
          <div className="pt-2 border-t border-gray-100 mt-1">
            <p className="text-[10px] text-gray-400 uppercase font-medium tracking-wider mb-1.5">What's Included</p>
            <div className="flex flex-wrap gap-1.5">
              {PREVIEW_ICONS.map((Icon, i) => (
                <span key={i} className="w-6 h-6 rounded-md bg-emerald-50 text-emerald-600 flex items-center justify-center" title={Object.values(pkg.includes)[i]}>
                  <Icon size={13} />
                </span>
              ))}
              <span className="text-[10px] font-semibold text-emerald-600 flex items-center">See details</span>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 pt-2 border-t border-gray-100 flex items-center justify-between">
        <div>
          <span className="text-[10px] text-gray-400 block uppercase font-medium">Starting From</span>
          <div className="flex items-baseline gap-1.5">
            <span className="text-base font-bold serif text-[#800020]">{pkg.price}</span>
            {featured && <span className="text-[10px] text-gray-400 line-through">{pkg.originalPrice}</span>}
          </div>
        </div>
        <div className="w-7 h-7 rounded-full bg-rose-50 text-[#800020] group-hover:bg-[#800020] group-hover:text-white flex items-center justify-center transition-colors">
          <ArrowRight size={13} />
        </div>
      </div>
    </div>
  );
};

export default PackageCard;
