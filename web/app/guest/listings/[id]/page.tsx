"use client";
import { use } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import listingsData from "@/data/listings.json";
import hostsData from "@/data/hosts.json";

const amenityLabels: Record<string, string> = {
  wifi: "WiFi",
  aircon: "Air Conditioning",
  washing_machine: "Washing Machine",
  furnished: "Fully Furnished",
  elevator: "Elevator",
  parking: "Parking",
  gym: "Gym",
};

export default function ListingDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const listing = listingsData.find((l) => l.id === id);
  const host = listing ? hostsData.find((h) => h.id === listing.hostId) : null;

  if (!listing) {
    return (
      <>
        <Header />
        <div className="text-center py-20">
          <p className="text-4xl mb-4">😢</p>
          <p className="text-slate-500">Listing not found</p>
          <Link href="/guest/listings" className="text-blue-600 hover:underline mt-4 inline-block">
            Back to listings
          </Link>
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link href="/guest/listings" className="text-sm text-blue-600 hover:underline mb-4 inline-block">
          &larr; Back to listings
        </Link>

        {/* Images */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8 rounded-xl overflow-hidden">
          <div className="h-72 md:h-96 bg-slate-200">
            <img src={listing.images[0]} alt={listing.title} className="w-full h-full object-cover" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            {listing.images.slice(1, 3).map((img, i) => (
              <div key={i} className="h-36 md:h-[calc(12rem-0.375rem)] bg-slate-200">
                <img src={img} alt="" className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Info */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">{listing.title}</h1>
              <p className="text-slate-500 mt-1">{listing.university} &middot; {listing.address}</p>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-amber-500">&#9733;</span>
                <span className="font-semibold">{listing.rating}</span>
                <span className="text-slate-400">({listing.reviewCount} reviews)</span>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <h2 className="font-semibold mb-3">About this place</h2>
              <p className="text-slate-600 leading-relaxed">{listing.description}</p>
              <p className="text-slate-500 text-sm mt-2 italic">{listing.descriptionKr}</p>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <h2 className="font-semibold mb-3">Details</h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
                <div>
                  <p className="text-slate-400">Area</p>
                  <p className="font-medium">{listing.area}m&sup2;</p>
                </div>
                <div>
                  <p className="text-slate-400">Floor</p>
                  <p className="font-medium">{listing.floor}F / {listing.totalFloors}F</p>
                </div>
                <div>
                  <p className="text-slate-400">Available</p>
                  <p className="font-medium">{listing.availableFrom}</p>
                </div>
                <div>
                  <p className="text-slate-400">Min Stay</p>
                  <p className="font-medium">{listing.minStay} months</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <h2 className="font-semibold mb-3">Amenities</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {listing.amenities.map((a) => (
                  <div key={a} className="flex items-center gap-2 text-sm text-slate-600">
                    <span className="text-green-500">&#10003;</span>
                    {amenityLabels[a] || a}
                  </div>
                ))}
              </div>
            </div>

            {/* Host */}
            {host && (
              <div className="bg-white rounded-xl border border-slate-200 p-6">
                <h2 className="font-semibold mb-3">Host</h2>
                <div className="flex items-center gap-4">
                  <img
                    src={host.profileImage}
                    alt={host.name}
                    className="w-14 h-14 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-medium">
                      {host.name}
                      {host.verified && (
                        <span className="ml-2 text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">
                          Verified
                        </span>
                      )}
                    </p>
                    <p className="text-sm text-slate-500">
                      Response rate: {host.responseRate}% &middot; Avg: {host.avgResponseTime}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Booking Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl border border-slate-200 p-6 sticky top-24 shadow-sm">
              <div className="mb-4">
                <span className="text-2xl font-bold text-blue-600">
                  &#8361;{listing.rent.toLocaleString()}
                </span>
                <span className="text-slate-500">/month</span>
              </div>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-500">Deposit</span>
                  <span className="font-medium">&#8361;{listing.deposit.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Maintenance</span>
                  <span className="font-medium">&#8361;{listing.maintenance.toLocaleString()}</span>
                </div>
                <div className="flex justify-between border-t border-slate-100 pt-3">
                  <span className="text-slate-500">Monthly Total</span>
                  <span className="font-bold">
                    &#8361;{(listing.rent + listing.maintenance).toLocaleString()}
                  </span>
                </div>
              </div>
              <Link
                href={`/guest/apply/${listing.id}`}
                className="mt-6 block w-full bg-blue-600 hover:bg-blue-700 text-white text-center py-3 rounded-lg font-medium transition-colors"
              >
                Apply Now
              </Link>
              <p className="text-xs text-slate-400 text-center mt-3">No payment required at this stage</p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
