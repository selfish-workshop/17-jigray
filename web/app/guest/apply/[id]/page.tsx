"use client";
import { use, useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import listingsData from "@/data/listings.json";

export default function ApplyPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const listing = listingsData.find((l) => l.id === id);
  const [submitted, setSubmitted] = useState(false);

  if (!listing) {
    return (
      <>
        <Header />
        <div className="text-center py-20">
          <p className="text-slate-500">Listing not found</p>
        </div>
      </>
    );
  }

  if (submitted) {
    return (
      <>
        <Header />
        <div className="max-w-2xl mx-auto px-4 py-20 text-center">
          <div className="text-6xl mb-6">🎉</div>
          <h1 className="text-2xl font-bold text-slate-900 mb-4">Application Submitted!</h1>
          <p className="text-slate-600 mb-8">
            Your application for &ldquo;{listing.title}&rdquo; has been sent to the host.
            You&apos;ll receive a response within 1-3 days.
          </p>
          <Link
            href="/guest/listings"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Browse More Listings
          </Link>
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="max-w-2xl mx-auto px-4 sm:px-6 py-8">
        <Link href={`/guest/listings/${listing.id}`} className="text-sm text-blue-600 hover:underline mb-4 inline-block">
          &larr; Back to listing
        </Link>
        <h1 className="text-2xl font-bold text-slate-900 mb-2">Apply for Reservation</h1>
        <p className="text-slate-500 mb-8">{listing.title}</p>

        <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Full Name *</label>
              <input type="text" className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Your full name" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Email *</label>
              <input type="email" className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="you@university.edu" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">University / Affiliation *</label>
            <input type="text" className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="e.g., Exchange Student from MIT" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Move-in Date *</label>
              <input type="date" className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Move-out Date *</label>
              <input type="date" className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Message to Host</label>
            <textarea
              rows={4}
              className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Introduce yourself briefly. Tell the host about your stay purpose, habits, etc."
            />
          </div>

          <div className="bg-slate-50 rounded-lg p-4 text-sm">
            <p className="font-medium text-slate-700 mb-2">Reservation Summary</p>
            <div className="flex justify-between text-slate-600">
              <span>Monthly Rent</span>
              <span>&#8361;{listing.rent.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Deposit (one-time)</span>
              <span>&#8361;{listing.deposit.toLocaleString()}</span>
            </div>
          </div>

          <button
            onClick={() => setSubmitted(true)}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition-colors"
          >
            Submit Application
          </button>
          <p className="text-xs text-slate-400 text-center">
            No payment is collected now. The host will review your application first.
          </p>
        </div>
      </main>
    </>
  );
}
