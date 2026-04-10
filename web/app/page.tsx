import Link from "next/link";

const modes = [
  {
    title: "Guest",
    titleKr: "게스트",
    description: "Find your perfect home near your university",
    descKr: "대학교 근처 완벽한 숙소를 찾아보세요",
    href: "/guest/listings",
    icon: "🎒",
    color: "from-blue-500 to-blue-600",
    hoverColor: "hover:from-blue-600 hover:to-blue-700",
  },
  {
    title: "Host",
    titleKr: "호스트",
    description: "List your property and manage reservations",
    descKr: "매물을 등록하고 예약을 관리하세요",
    href: "/host/dashboard",
    icon: "🏠",
    color: "from-emerald-500 to-emerald-600",
    hoverColor: "hover:from-emerald-600 hover:to-emerald-700",
  },
  {
    title: "Admin",
    titleKr: "운영진",
    description: "Manage settlements and platform operations",
    descKr: "정산 및 플랫폼 운영을 관리하세요",
    href: "/admin/settlements",
    icon: "📊",
    color: "from-violet-500 to-violet-600",
    hoverColor: "hover:from-violet-600 hover:to-violet-700",
  },
];

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <main className="max-w-4xl mx-auto px-6 py-20 text-center">
        <div className="mb-4">
          <span className="text-6xl">🏡</span>
        </div>
        <h1 className="text-5xl font-bold text-slate-900 mb-4">
          Stay<span className="text-blue-600">Ko</span>
        </h1>
        <p className="text-xl text-slate-600 mb-2">
          Find Your Home in Korea
        </p>
        <p className="text-base text-slate-500 mb-12">
          외국인 유학생을 위한 한국 장기 임대 플랫폼
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {modes.map((mode) => (
            <Link key={mode.title} href={mode.href}>
              <div
                className={`bg-gradient-to-br ${mode.color} ${mode.hoverColor} text-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer`}
              >
                <div className="text-5xl mb-4">{mode.icon}</div>
                <h2 className="text-2xl font-bold mb-1">{mode.title}</h2>
                <p className="text-sm text-white/80 mb-3">{mode.titleKr}</p>
                <p className="text-sm text-white/90">{mode.description}</p>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-slate-500">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500"></span>
            8 Listings Available
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-blue-500"></span>
            4 Verified Hosts
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-500"></span>
            7 Universities Covered
          </div>
        </div>
      </main>

      <footer className="w-full py-6 text-center text-sm text-slate-400 border-t border-slate-200 bg-white/50">
        &copy; 2026 StayKo — GitHub Workshop Demo by 17-jigray
      </footer>
    </div>
  );
}
