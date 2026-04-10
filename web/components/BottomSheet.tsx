"use client";
import { useState, useRef } from "react";
import Link from "next/link";
import listingsData from "@/data/listings.json";

interface BottomSheetProps {
  selectedId: string | null;
  onSelect: (id: string) => void;
}

const typeLabels: Record<string, string> = {
  studio: "Studio",
  sharehouse: "Share House",
  officetel: "Officetel",
};

export default function BottomSheet({ selectedId, onSelect }: BottomSheetProps) {
  const [expanded, setExpanded] = useState(false);
  const sheetRef = useRef<HTMLDivElement>(null);

  const selectedListing = selectedId ? listingsData.find((l) => l.id === selectedId) : null;

  return (
    <>
      {/* Bottom Sheet */}
      <div
        ref={sheetRef}
        className={`absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl shadow-[0_-4px_20px_rgba(0,0,0,0.1)] transition-all duration-300 z-40 ${
          expanded ? "h-[70vh]" : selectedListing ? "h-[240px]" : "h-[180px]"
        }`}
      >
        {/* Handle */}
        <div
          className="flex justify-center pt-2 pb-1 cursor-pointer"
          onClick={() => setExpanded(!expanded)}
        >
          <div className="w-10 h-1 bg-slate-300 rounded-full" />
        </div>

        {/* Selected Listing Card */}
        {selectedListing && !expanded && (
          <div className="px-4 pb-3">
            <div className="flex gap-3 p-3 bg-blue-50 rounded-xl border border-blue-100">
              <img
                src={selectedListing.images[0]}
                alt={selectedListing.title}
                className="w-24 h-24 rounded-lg object-cover shrink-0"
              />
              <div className="flex-1 min-w-0">
                <span className="text-xs text-blue-600 font-medium">{typeLabels[selectedListing.type]}</span>
                <h3 className="font-semibold text-slate-900 text-sm line-clamp-1 mt-0.5">{selectedListing.title}</h3>
                <p className="text-xs text-slate-500 mt-0.5">{selectedListing.university}</p>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-base font-bold text-blue-600">
                    &#8361;{selectedListing.rent.toLocaleString()}<span className="text-xs font-normal text-slate-500">/mo</span>
                  </span>
                  <Link
                    href={`/guest/listings/${selectedListing.id}`}
                    className="bg-blue-600 text-white px-3 py-1.5 rounded-lg text-xs font-medium hover:bg-blue-700"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* List Header */}
        <div className="px-4 flex items-center justify-between">
          <h3 className="text-sm font-semibold text-slate-700">
            {listingsData.length} listings available
          </h3>
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-xs text-blue-600 font-medium"
          >
            {expanded ? "Collapse" : "View All"}
          </button>
        </div>

        {/* List */}
        <div className={`overflow-y-auto px-4 pb-6 ${expanded ? "h-[calc(100%-80px)]" : "h-[80px]"}`}>
          <div className="space-y-2 mt-2">
            {listingsData.map((listing) => (
              <button
                key={listing.id}
                onClick={() => { onSelect(listing.id); setExpanded(false); }}
                className={`w-full flex items-center gap-3 p-3 rounded-xl text-left transition-colors ${
                  listing.id === selectedId
                    ? "bg-blue-50 border border-blue-200"
                    : "bg-slate-50 hover:bg-slate-100 border border-transparent"
                }`}
              >
                <img
                  src={listing.images[0]}
                  alt={listing.title}
                  className="w-16 h-16 rounded-lg object-cover shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium text-slate-900 line-clamp-1">{listing.title}</h4>
                  <p className="text-xs text-slate-500">{listing.university}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-sm font-bold text-blue-600">
                      &#8361;{listing.rent.toLocaleString()}
                    </span>
                    <span className="text-xs text-slate-400">/mo</span>
                    <span className="text-amber-500 text-xs ml-auto">&#9733; {listing.rating}</span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
