"use client";
import { use, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import Header from "@/components/Header";
import listingsData from "@/data/listings.json";

const PayPalPayment = dynamic(() => import("@/components/PayPalPayment"), { ssr: false });

type Step = "form" | "payment" | "done";

export default function ApplyPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const listing = listingsData.find((l) => l.id === id);
  const [step, setStep] = useState<Step>("form");
  const [paymentDetails, setPaymentDetails] = useState<Record<string, unknown> | null>(null);

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

  // Step 3: Done
  if (step === "done") {
    return (
      <>
        <Header />
        <div className="max-w-2xl mx-auto px-4 py-20 text-center">
          <div className="text-6xl mb-6">🎉</div>
          <h1 className="text-2xl font-bold text-slate-900 mb-4">Reservation Complete!</h1>
          <p className="text-slate-600 mb-2">
            Your deposit for &ldquo;{listing.title}&rdquo; has been paid successfully.
          </p>
          <p className="text-sm text-slate-500 mb-8">
            The host will confirm your reservation within 1-3 days. You&apos;ll receive an email notification.
          </p>
          {paymentDetails && (
            <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-sm text-left max-w-sm mx-auto mb-8">
              <p className="font-medium text-green-800 mb-2">Payment Confirmed</p>
              <div className="space-y-1 text-green-700">
                <p>Status: {(paymentDetails as Record<string, string>).status || "COMPLETED"}</p>
                <p>ID: {(paymentDetails as Record<string, string>).id || "SANDBOX-TX"}</p>
              </div>
            </div>
          )}
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
        <p className="text-slate-500 mb-6">{listing.title}</p>

        {/* Progress Steps */}
        <div className="flex items-center gap-3 mb-8">
          <div className={`flex items-center gap-2 ${step === "form" ? "text-blue-600" : "text-green-600"}`}>
            <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white ${step === "form" ? "bg-blue-600" : "bg-green-500"}`}>
              {step === "form" ? "1" : "✓"}
            </span>
            <span className="text-sm font-medium">Application</span>
          </div>
          <div className="flex-1 h-px bg-slate-200" />
          <div className={`flex items-center gap-2 ${step === "payment" ? "text-blue-600" : "text-slate-400"}`}>
            <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white ${step === "payment" ? "bg-blue-600" : "bg-slate-300"}`}>
              2
            </span>
            <span className="text-sm font-medium">Payment</span>
          </div>
        </div>

        {/* Step 1: Form */}
        {step === "form" && (
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
                rows={3}
                className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Introduce yourself briefly..."
              />
            </div>

            <div className="bg-slate-50 rounded-lg p-4 text-sm space-y-2">
              <p className="font-medium text-slate-700">Reservation Summary</p>
              <div className="flex justify-between text-slate-600">
                <span>Monthly Rent</span>
                <span>&#8361;{listing.rent.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Deposit (pay now via PayPal)</span>
                <span className="font-bold">&#8361;{listing.deposit.toLocaleString()}</span>
              </div>
            </div>

            <button
              onClick={() => setStep("payment")}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition-colors"
            >
              Continue to Payment &rarr;
            </button>
          </div>
        )}

        {/* Step 2: PayPal Payment */}
        {step === "payment" && (
          <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-6">
            <div>
              <h2 className="font-semibold text-lg text-slate-900 mb-1">Pay Deposit</h2>
              <p className="text-sm text-slate-500">
                Pay the deposit via PayPal to complete your reservation.
              </p>
            </div>

            <PayPalPayment
              amount={listing.deposit}
              description={`StayKo Deposit — ${listing.title}`}
              onSuccess={(details) => {
                setPaymentDetails(details);
                setStep("done");
              }}
              onError={() => {
                alert("Payment failed. Please try again.");
              }}
            />

            <button
              onClick={() => setStep("form")}
              className="w-full py-2 text-sm text-slate-500 hover:text-slate-700"
            >
              &larr; Back to application
            </button>
          </div>
        )}
      </main>
    </>
  );
}
