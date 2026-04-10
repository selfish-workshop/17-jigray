"use client";
import { useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";

export default function NewListingPage() {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <>
        <Header />
        <div className="max-w-2xl mx-auto px-4 py-20 text-center">
          <div className="text-6xl mb-6">🏠</div>
          <h1 className="text-2xl font-bold text-slate-900 mb-4">Listing Created!</h1>
          <p className="text-slate-600 mb-8">Your property has been submitted for review. It will be visible to guests within 24 hours.</p>
          <Link href="/host/dashboard" className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700">
            Back to Dashboard
          </Link>
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
        <Link href="/host/dashboard" className="text-sm text-blue-600 hover:underline mb-4 inline-block">
          &larr; Back to Dashboard
        </Link>
        <h1 className="text-2xl font-bold text-slate-900 mb-8">Add New Listing</h1>

        <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Property Title *</label>
            <input type="text" className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="e.g., Cozy Studio near Yonsei University" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Type *</label>
              <select className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>Studio</option>
                <option>Share House</option>
                <option>Officetel</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Nearest University *</label>
              <input type="text" className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="e.g., Yonsei University" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Address *</label>
            <input type="text" className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Full address" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Monthly Rent (&#8361;) *</label>
              <input type="number" className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="500000" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Deposit (&#8361;) *</label>
              <input type="number" className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="5000000" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Maintenance (&#8361;)</label>
              <input type="number" className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="50000" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Area (m&sup2;)</label>
              <input type="number" className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="23" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Floor</label>
              <input type="number" className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="3" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Min Stay (months)</label>
              <input type="number" className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="6" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Photos *</label>
            <div className="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center">
              <p className="text-4xl mb-2">📷</p>
              <p className="text-sm text-slate-500">Drag & drop photos here, or click to browse</p>
              <p className="text-xs text-slate-400 mt-1">Minimum 5 photos recommended</p>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Amenities</label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {["WiFi", "Air Conditioning", "Washing Machine", "Furnished", "Elevator", "Parking", "Gym"].map((a) => (
                <label key={a} className="flex items-center gap-2 text-sm text-slate-600">
                  <input type="checkbox" className="rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
                  {a}
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
            <textarea rows={4} className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Describe your property..." />
            <p className="text-xs text-slate-400 mt-1">Write in Korean - we&apos;ll auto-translate to English for guests</p>
          </div>

          <button
            onClick={() => setSubmitted(true)}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition-colors"
          >
            Submit Listing
          </button>
        </div>
      </main>
    </>
  );
}
