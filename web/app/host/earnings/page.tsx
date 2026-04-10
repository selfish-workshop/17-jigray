"use client";
import Link from "next/link";
import Header from "@/components/Header";
import settlementsData from "@/data/settlements.json";

const months = [
  { label: "Jan", value: 850000 },
  { label: "Feb", value: 1050000 },
  { label: "Mar", value: 1200000 },
  { label: "Apr", value: 1200000 },
];

export default function EarningsPage() {
  const hostSettlements = settlementsData.filter((s) => s.hostId === "h1");
  const totalEarned = hostSettlements.filter((s) => s.status === "completed").reduce((sum, s) => sum + s.netAmount, 0);
  const pending = hostSettlements.filter((s) => s.status === "pending").reduce((sum, s) => sum + s.netAmount, 0);
  const maxValue = Math.max(...months.map((m) => m.value));

  return (
    <>
      <Header />
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link href="/host/dashboard" className="text-sm text-blue-600 hover:underline mb-4 inline-block">
          &larr; Back to Dashboard
        </Link>
        <h1 className="text-2xl font-bold text-slate-900 mb-8">Earnings</h1>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <p className="text-sm text-slate-500">Total Earned</p>
            <p className="text-2xl font-bold text-green-600 mt-1">&#8361;{totalEarned.toLocaleString()}</p>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <p className="text-sm text-slate-500">Pending Settlement</p>
            <p className="text-2xl font-bold text-amber-600 mt-1">&#8361;{pending.toLocaleString()}</p>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <p className="text-sm text-slate-500">Commission Rate</p>
            <p className="text-2xl font-bold text-slate-700 mt-1">10%</p>
          </div>
        </div>

        {/* Chart */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 mb-8">
          <h2 className="font-semibold mb-6">Monthly Revenue (2026)</h2>
          <div className="flex items-end gap-4 h-48">
            {months.map((m) => (
              <div key={m.label} className="flex-1 flex flex-col items-center gap-2">
                <span className="text-xs text-slate-500">&#8361;{(m.value / 10000).toFixed(0)}만</span>
                <div
                  className="w-full bg-blue-500 rounded-t-lg transition-all"
                  style={{ height: `${(m.value / maxValue) * 100}%` }}
                />
                <span className="text-sm text-slate-600 font-medium">{m.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Settlement History */}
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h2 className="font-semibold mb-4">Settlement History</h2>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 text-slate-500 font-medium">Period</th>
                <th className="text-right py-3 text-slate-500 font-medium">Revenue</th>
                <th className="text-right py-3 text-slate-500 font-medium">Commission</th>
                <th className="text-right py-3 text-slate-500 font-medium">Net Amount</th>
                <th className="text-right py-3 text-slate-500 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {hostSettlements.map((s) => (
                <tr key={s.id} className="border-b border-slate-100">
                  <td className="py-3 font-medium">{s.period}</td>
                  <td className="py-3 text-right">&#8361;{s.totalRevenue.toLocaleString()}</td>
                  <td className="py-3 text-right text-red-500">-&#8361;{s.commission.toLocaleString()}</td>
                  <td className="py-3 text-right font-medium">&#8361;{s.netAmount.toLocaleString()}</td>
                  <td className="py-3 text-right">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      s.status === "completed" ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"
                    }`}>
                      {s.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </>
  );
}
