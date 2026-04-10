"use client";
import { useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import listingsData from "@/data/listings.json";
import reservationsData from "@/data/reservations.json";

const statusColors: Record<string, string> = {
  pending: "bg-amber-100 text-amber-700",
  approved: "bg-green-100 text-green-700",
  rejected: "bg-red-100 text-red-700",
};

export default function HostDashboard() {
  const hostListings = listingsData.filter((l) => l.hostId === "h1");
  const hostReservations = reservationsData.filter((r) =>
    hostListings.some((l) => l.id === r.listingId)
  );

  return (
    <>
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Host Dashboard</h1>
            <p className="text-slate-500 text-sm mt-1">Welcome back, Kim Youngsoo</p>
          </div>
          <Link
            href="/host/listings/new"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            + Add Listing
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Active Listings", value: hostListings.length, icon: "🏠" },
            { label: "Pending Requests", value: hostReservations.filter((r) => r.status === "pending").length, icon: "⏳" },
            { label: "Approved", value: hostReservations.filter((r) => r.status === "approved").length, icon: "✅" },
            { label: "This Month Revenue", value: "₩1,200,000", icon: "💰" },
          ].map((stat) => (
            <div key={stat.label} className="bg-white rounded-xl border border-slate-200 p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500">{stat.label}</p>
                  <p className="text-2xl font-bold text-slate-900 mt-1">{stat.value}</p>
                </div>
                <span className="text-3xl">{stat.icon}</span>
              </div>
            </div>
          ))}
        </div>

        {/* My Listings */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 mb-8">
          <h2 className="font-semibold text-lg mb-4">My Listings</h2>
          <div className="space-y-4">
            {hostListings.map((listing) => (
              <div key={listing.id} className="flex items-center gap-4 p-4 rounded-lg bg-slate-50">
                <img
                  src={listing.images[0]}
                  alt={listing.title}
                  className="w-20 h-20 rounded-lg object-cover"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-slate-900 truncate">{listing.title}</h3>
                  <p className="text-sm text-slate-500">{listing.university}</p>
                  <p className="text-sm font-medium text-blue-600">
                    &#8361;{listing.rent.toLocaleString()}/mo
                  </p>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1">
                    <span className="text-amber-500 text-sm">&#9733;</span>
                    <span className="text-sm font-medium">{listing.rating}</span>
                  </div>
                  <p className="text-xs text-slate-400">{listing.reviewCount} reviews</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Reservations */}
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h2 className="font-semibold text-lg mb-4">Reservation Requests</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="text-left py-3 px-2 text-slate-500 font-medium">Guest</th>
                  <th className="text-left py-3 px-2 text-slate-500 font-medium">Listing</th>
                  <th className="text-left py-3 px-2 text-slate-500 font-medium">Period</th>
                  <th className="text-left py-3 px-2 text-slate-500 font-medium">Status</th>
                  <th className="text-left py-3 px-2 text-slate-500 font-medium">Action</th>
                </tr>
              </thead>
              <tbody>
                {hostReservations.map((res) => {
                  const listing = listingsData.find((l) => l.id === res.listingId);
                  return (
                    <tr key={res.id} className="border-b border-slate-100">
                      <td className="py-3 px-2">
                        <p className="font-medium">{res.guestName}</p>
                        <p className="text-xs text-slate-400">{res.guestUniversity}</p>
                      </td>
                      <td className="py-3 px-2 text-slate-600">{listing?.title?.slice(0, 30)}...</td>
                      <td className="py-3 px-2 text-slate-600 text-xs">
                        {res.moveIn} ~ {res.moveOut}
                      </td>
                      <td className="py-3 px-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[res.status]}`}>
                          {res.status}
                        </span>
                      </td>
                      <td className="py-3 px-2">
                        {res.status === "pending" && (
                          <div className="flex gap-2">
                            <button className="text-xs bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700">
                              Approve
                            </button>
                            <button className="text-xs bg-red-100 text-red-600 px-3 py-1 rounded hover:bg-red-200">
                              Reject
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-6 text-center">
          <Link href="/host/earnings" className="text-blue-600 hover:underline text-sm">
            View Earnings Report &rarr;
          </Link>
        </div>
      </main>
    </>
  );
}
