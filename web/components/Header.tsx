"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();
  const isGuest = pathname.startsWith("/guest");
  const isHost = pathname.startsWith("/host");
  const isAdmin = pathname.startsWith("/admin");

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl font-bold text-blue-600">StayKo</span>
            <span className="hidden sm:inline text-sm text-slate-500">Find Your Home in Korea</span>
          </Link>
          <nav className="flex items-center gap-1 sm:gap-4">
            <Link
              href="/guest/listings"
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                isGuest ? "bg-blue-50 text-blue-700" : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              Guest
            </Link>
            <Link
              href="/host/dashboard"
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                isHost ? "bg-blue-50 text-blue-700" : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              Host
            </Link>
            <Link
              href="/admin/settlements"
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                isAdmin ? "bg-blue-50 text-blue-700" : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              Admin
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
