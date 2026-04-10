"use client";
import { useState } from "react";
import Header from "@/components/Header";
import settlementsData from "@/data/settlements.json";
import hostsData from "@/data/hosts.json";

const statusColors: Record<string, string> = {
  pending: "bg-amber-100 text-amber-700",
  processing: "bg-blue-100 text-blue-700",
  completed: "bg-green-100 text-green-700",
};

export default function SettlementsPage() {
  const [settlements, setSettlements] = useState(settlementsData);
  const [showModal, setShowModal] = useState<string | null>(null);

  const currentPeriod = settlements.filter((s) => s.period === "2026-04");
  const totalRevenue = currentPeriod.reduce((sum, s) => sum + s.totalRevenue, 0);
  const totalCommission = currentPeriod.reduce((sum, s) => sum + s.commission, 0);
  const pendingCount = currentPeriod.filter((s) => s.status === "pending").length;

  const handleSettle = (id: string) => {
    setSettlements((prev) =>
      prev.map((s) => (s.id === id ? { ...s, status: "completed", completedAt: "2026-04-10" } : s))
    );
    setShowModal(null);
  };

  return (
    <>
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-bold text-slate-900 mb-2">Settlement Management</h1>
        <p className="text-slate-500 text-sm mb-8">Manage host settlements and commission tracking</p>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <p className="text-sm text-slate-500">Total Revenue (Apr)</p>
            <p className="text-2xl font-bold text-slate-900 mt-1">&#8361;{totalRevenue.toLocaleString()}</p>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <p className="text-sm text-slate-500">Commission Income</p>
            <p className="text-2xl font-bold text-emerald-600 mt-1">&#8361;{totalCommission.toLocaleString()}</p>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <p className="text-sm text-slate-500">Total Payout</p>
            <p className="text-2xl font-bold text-blue-600 mt-1">&#8361;{(totalRevenue - totalCommission).toLocaleString()}</p>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <p className="text-sm text-slate-500">Pending Settlements</p>
            <p className="text-2xl font-bold text-amber-600 mt-1">{pendingCount}</p>
          </div>
        </div>

        {/* Current Period */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-lg">April 2026 Settlements</h2>
            <span className="text-sm text-slate-500">Commission Rate: 10%</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="text-left py-3 px-2 text-slate-500 font-medium">Host</th>
                  <th className="text-left py-3 px-2 text-slate-500 font-medium">Bank Account</th>
                  <th className="text-right py-3 px-2 text-slate-500 font-medium">Revenue</th>
                  <th className="text-right py-3 px-2 text-slate-500 font-medium">Commission</th>
                  <th className="text-right py-3 px-2 text-slate-500 font-medium">Net Payout</th>
                  <th className="text-center py-3 px-2 text-slate-500 font-medium">Status</th>
                  <th className="text-center py-3 px-2 text-slate-500 font-medium">Action</th>
                </tr>
              </thead>
              <tbody>
                {currentPeriod.map((s) => {
                  const host = hostsData.find((h) => h.id === s.hostId);
                  return (
                    <tr key={s.id} className="border-b border-slate-100 hover:bg-slate-50">
                      <td className="py-4 px-2">
                        <div className="flex items-center gap-3">
                          <img
                            src={host?.profileImage}
                            alt={host?.name}
                            className="w-10 h-10 rounded-full object-cover"
                          />
                          <div>
                            <p className="font-medium">{host?.nameKr}</p>
                            <p className="text-xs text-slate-400">{host?.name}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-2 text-slate-600">
                        <p className="text-xs">{host?.bankName}</p>
                        <p className="text-xs text-slate-400">{host?.accountNumber}</p>
                      </td>
                      <td className="py-4 px-2 text-right font-medium">&#8361;{s.totalRevenue.toLocaleString()}</td>
                      <td className="py-4 px-2 text-right text-red-500">-&#8361;{s.commission.toLocaleString()}</td>
                      <td className="py-4 px-2 text-right font-bold">&#8361;{s.netAmount.toLocaleString()}</td>
                      <td className="py-4 px-2 text-center">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[s.status]}`}>
                          {s.status}
                        </span>
                      </td>
                      <td className="py-4 px-2 text-center">
                        {s.status === "pending" ? (
                          <button
                            onClick={() => setShowModal(s.id)}
                            className="bg-blue-600 text-white px-3 py-1.5 rounded-lg text-xs font-medium hover:bg-blue-700 transition-colors"
                          >
                            Settle
                          </button>
                        ) : s.status === "processing" ? (
                          <button
                            onClick={() => handleSettle(s.id)}
                            className="bg-emerald-600 text-white px-3 py-1.5 rounded-lg text-xs font-medium hover:bg-emerald-700 transition-colors"
                          >
                            Complete
                          </button>
                        ) : (
                          <span className="text-xs text-slate-400">{s.completedAt}</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Past Settlements */}
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h2 className="font-semibold text-lg mb-4">Past Settlements (March 2026)</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="text-left py-3 px-2 text-slate-500 font-medium">Host</th>
                  <th className="text-right py-3 px-2 text-slate-500 font-medium">Revenue</th>
                  <th className="text-right py-3 px-2 text-slate-500 font-medium">Net Payout</th>
                  <th className="text-center py-3 px-2 text-slate-500 font-medium">Completed</th>
                </tr>
              </thead>
              <tbody>
                {settlements
                  .filter((s) => s.period === "2026-03")
                  .map((s) => {
                    const host = hostsData.find((h) => h.id === s.hostId);
                    return (
                      <tr key={s.id} className="border-b border-slate-100">
                        <td className="py-3 px-2 font-medium">{host?.nameKr} ({host?.name})</td>
                        <td className="py-3 px-2 text-right">&#8361;{s.totalRevenue.toLocaleString()}</td>
                        <td className="py-3 px-2 text-right font-medium">&#8361;{s.netAmount.toLocaleString()}</td>
                        <td className="py-3 px-2 text-center text-xs text-slate-400">{s.completedAt}</td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Settlement Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full mx-4 shadow-2xl">
            <h3 className="text-lg font-bold mb-4">Confirm Settlement</h3>
            {(() => {
              const s = settlements.find((s) => s.id === showModal);
              const host = hostsData.find((h) => h.id === s?.hostId);
              return (
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Host</span>
                    <span className="font-medium">{host?.nameKr}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Bank</span>
                    <span className="font-medium">{host?.bankName} {host?.accountNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Amount</span>
                    <span className="font-bold text-blue-600">&#8361;{s?.netAmount.toLocaleString()}</span>
                  </div>
                </div>
              );
            })()}
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowModal(null)}
                className="flex-1 py-2.5 rounded-lg border border-slate-300 text-slate-600 hover:bg-slate-50 font-medium text-sm"
              >
                Cancel
              </button>
              <button
                onClick={() => handleSettle(showModal)}
                className="flex-1 py-2.5 rounded-lg bg-blue-600 text-white hover:bg-blue-700 font-medium text-sm"
              >
                Confirm &amp; Settle
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
