import Link from "next/link";

interface Listing {
  id: string;
  title: string;
  type: string;
  university: string;
  address: string;
  rent: number;
  deposit: number;
  area: number;
  amenities: string[];
  images: string[];
  rating: number;
  reviewCount: number;
  availableFrom: string;
}

const typeLabels: Record<string, string> = {
  studio: "Studio",
  sharehouse: "Share House",
  officetel: "Officetel",
};

const amenityIcons: Record<string, string> = {
  wifi: "WiFi",
  aircon: "AC",
  washing_machine: "Laundry",
  furnished: "Furnished",
  elevator: "Elevator",
  parking: "Parking",
  gym: "Gym",
};

export default function ListingCard({ listing }: { listing: Listing }) {
  return (
    <Link href={`/guest/listings/${listing.id}`} className="group">
      <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
        <div className="relative h-48 bg-slate-200">
          <img
            src={listing.images[0]}
            alt={listing.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-medium text-slate-700">
            {typeLabels[listing.type] || listing.type}
          </span>
        </div>
        <div className="p-4">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-semibold text-slate-900 line-clamp-1">{listing.title}</h3>
            <div className="flex items-center gap-1 shrink-0">
              <span className="text-amber-500">&#9733;</span>
              <span className="text-sm font-medium">{listing.rating}</span>
              <span className="text-xs text-slate-400">({listing.reviewCount})</span>
            </div>
          </div>
          <p className="text-sm text-slate-500 mt-1">{listing.university} &middot; {listing.address}</p>
          <div className="flex flex-wrap gap-1 mt-2">
            {listing.amenities.slice(0, 3).map((a) => (
              <span key={a} className="bg-slate-100 text-slate-600 text-xs px-2 py-0.5 rounded">
                {amenityIcons[a] || a}
              </span>
            ))}
            {listing.amenities.length > 3 && (
              <span className="text-xs text-slate-400">+{listing.amenities.length - 3}</span>
            )}
          </div>
          <div className="mt-3 pt-3 border-t border-slate-100 flex items-end justify-between">
            <div>
              <span className="text-lg font-bold text-blue-600">
                &#8361;{listing.rent.toLocaleString()}
              </span>
              <span className="text-sm text-slate-500">/mo</span>
            </div>
            <div className="text-xs text-slate-400">
              Deposit &#8361;{(listing.deposit / 10000).toFixed(0)}만
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
