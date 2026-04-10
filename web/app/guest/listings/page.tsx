"use client";
import { useState, useCallback } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import SearchBar from "@/components/SearchBar";
import BottomSheet from "@/components/BottomSheet";

const MapView = dynamic(() => import("@/components/MapView"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-slate-100">
      <p className="text-slate-400 animate-pulse">Loading map...</p>
    </div>
  ),
});

const typeFilters = [
  { value: "all", label: "All", icon: "🏠" },
  { value: "studio", label: "원룸", icon: "🏢" },
  { value: "sharehouse", label: "코리빙", icon: "👥" },
  { value: "officetel", label: "오피스텔", icon: "🏙️" },
  { value: "goshiwon", label: "고시원", icon: "📦" },
  { value: "apartment", label: "아파트", icon: "🏗️" },
];

export default function ListingsPage() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [mapCenter, setMapCenter] = useState<[number, number] | undefined>(undefined);
  const [activeType, setActiveType] = useState("all");

  const handleSelectListing = useCallback((id: string) => {
    setSelectedId(id);
  }, []);

  const handleSearchSelect = useCallback((item: { lat: number; lng: number }) => {
    setMapCenter([item.lat, item.lng]);
  }, []);

  return (
    <div className="h-screen flex flex-col relative overflow-hidden">
      {/* Top Bar */}
      <div className="absolute top-0 left-0 right-0 z-50 p-4 pb-0">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="bg-white rounded-xl px-3 py-3 shadow-sm border border-slate-200 text-blue-600 font-bold text-lg shrink-0"
          >
            StayKo
          </Link>
          <div className="flex-1">
            <SearchBar onSelect={handleSearchSelect} />
          </div>
        </div>

        {/* Type Filter Chips */}
        <div className="flex gap-2 mt-3 overflow-x-auto pb-2 scrollbar-hide">
          {typeFilters.map((f) => (
            <button
              key={f.value}
              onClick={() => setActiveType(f.value)}
              className={`shrink-0 flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-semibold border transition-all duration-200 ${
                activeType === f.value
                  ? "bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-200"
                  : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50 hover:border-slate-300"
              }`}
            >
              <span className="text-sm">{f.icon}</span>
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Map */}
      <div className="flex-1">
        <MapView
          onSelectListing={handleSelectListing}
          selectedId={selectedId}
          center={mapCenter}
        />
      </div>

      {/* Navigation Pills */}
      <div className="absolute top-[130px] right-4 z-40 flex flex-col gap-2">
        <Link
          href="/host/dashboard"
          className="bg-white rounded-lg px-3 py-2 shadow-sm border border-slate-200 text-xs font-medium text-slate-600 hover:bg-slate-50"
        >
          Host
        </Link>
        <Link
          href="/admin/settlements"
          className="bg-white rounded-lg px-3 py-2 shadow-sm border border-slate-200 text-xs font-medium text-slate-600 hover:bg-slate-50"
        >
          Admin
        </Link>
      </div>

      {/* Bottom Sheet */}
      <BottomSheet selectedId={selectedId} onSelect={handleSelectListing} />
    </div>
  );
}
