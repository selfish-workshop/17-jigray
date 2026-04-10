"use client";
import { useState, useRef, useEffect } from "react";
import locationsData from "@/data/locations.json";

interface SearchBarProps {
  onSelect: (item: { text: string; textEn: string; lat: number; lng: number; type: string }) => void;
}

const typeIcons: Record<string, string> = {
  university: "🎓",
  station: "🚇",
  area: "📍",
};

export default function SearchBar({ onSelect }: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);
  const [suggestions, setSuggestions] = useState<typeof locationsData.searchSuggestions>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!query.trim()) {
      setSuggestions([]);
      return;
    }
    const q = query.toLowerCase();
    const filtered = locationsData.searchSuggestions.filter(
      (s) =>
        s.text.toLowerCase().includes(q) ||
        s.textEn.toLowerCase().includes(q)
    );
    setSuggestions(filtered.slice(0, 6));
  }, [query]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setFocused(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className="relative w-full">
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg">🔍</span>
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setFocused(true)}
          placeholder="Search university, station, area..."
          className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
        />
        {query && (
          <button
            onClick={() => { setQuery(""); setSuggestions([]); }}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-sm"
          >
            ✕
          </button>
        )}
      </div>

      {focused && suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-xl border border-slate-200 shadow-lg overflow-hidden z-50">
          {suggestions.map((s, i) => (
            <button
              key={i}
              className="w-full flex items-center gap-3 px-4 py-3 hover:bg-blue-50 transition-colors text-left"
              onClick={() => {
                setQuery(s.text);
                setFocused(false);
                onSelect(s);
              }}
            >
              <span className="text-lg">{typeIcons[s.type] || "📍"}</span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-slate-900">{s.text}</p>
                <p className="text-xs text-slate-400">{s.textEn}</p>
              </div>
              <span className="text-xs text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full capitalize">
                {s.type}
              </span>
            </button>
          ))}
        </div>
      )}

      {focused && query && suggestions.length === 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-xl border border-slate-200 shadow-lg p-4 text-center z-50">
          <p className="text-sm text-slate-400">No results for &ldquo;{query}&rdquo;</p>
        </div>
      )}
    </div>
  );
}
