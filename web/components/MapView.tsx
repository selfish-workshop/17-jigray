"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import locationsData from "@/data/locations.json";
import listingsData from "@/data/listings.json";

interface MapViewProps {
  onSelectListing: (id: string) => void;
  selectedId: string | null;
  center?: [number, number];
  zoom?: number;
}

export default function MapView({ onSelectListing, selectedId, center, zoom }: MapViewProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersRef = useRef<L.LayerGroup | null>(null);
  const [currentZoom, setCurrentZoom] = useState(zoom || 12);

  const createClusterIcon = useCallback((count: number, name: string) => {
    return L.divIcon({
      className: "custom-cluster",
      html: `<div style="
        background: #2563eb;
        color: white;
        border-radius: 50%;
        width: 44px;
        height: 44px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 700;
        font-size: 16px;
        box-shadow: 0 2px 8px rgba(37,99,235,0.4);
        border: 3px solid white;
      ">${count}</div>
      <div style="
        position: absolute;
        bottom: -18px;
        left: 50%;
        transform: translateX(-50%);
        background: white;
        padding: 1px 6px;
        border-radius: 4px;
        font-size: 11px;
        font-weight: 600;
        color: #334155;
        white-space: nowrap;
        box-shadow: 0 1px 3px rgba(0,0,0,0.15);
      ">${name}</div>`,
      iconSize: [44, 44],
      iconAnchor: [22, 22],
    });
  }, []);

  const createPriceIcon = useCallback((price: number, isSelected: boolean) => {
    const bg = isSelected ? "#1d4ed8" : "white";
    const color = isSelected ? "white" : "#1e293b";
    const shadow = isSelected ? "0 2px 12px rgba(29,78,216,0.5)" : "0 2px 6px rgba(0,0,0,0.15)";
    const formatted = `₩${(price / 10000).toFixed(0)}만`;
    return L.divIcon({
      className: "price-marker",
      html: `<div style="
        background: ${bg};
        color: ${color};
        padding: 4px 10px;
        border-radius: 20px;
        font-size: 13px;
        font-weight: 700;
        white-space: nowrap;
        box-shadow: ${shadow};
        border: 2px solid ${isSelected ? "white" : "#e2e8f0"};
        cursor: pointer;
        transition: all 0.15s;
      ">${formatted}</div>`,
      iconSize: [80, 30],
      iconAnchor: [40, 15],
    });
  }, []);

  const updateMarkers = useCallback((map: L.Map, zoomLevel: number) => {
    if (!markersRef.current) return;
    markersRef.current.clearLayers();

    if (zoomLevel < 13) {
      // Cluster mode: show area counts
      locationsData.areas.forEach((area) => {
        const count = area.listingIds.length;
        const marker = L.marker([area.lat, area.lng], {
          icon: createClusterIcon(count, area.nameKr),
        });
        marker.on("click", () => {
          map.setView([area.lat, area.lng], 14, { animate: true });
        });
        markersRef.current!.addLayer(marker);
      });
    } else {
      // Price mode: show individual listing prices
      const coords = locationsData.listings_coords as Record<string, { lat: number; lng: number }>;
      listingsData.forEach((listing) => {
        const coord = coords[listing.id];
        if (!coord) return;
        const marker = L.marker([coord.lat, coord.lng], {
          icon: createPriceIcon(listing.rent, listing.id === selectedId),
        });
        marker.on("click", () => {
          onSelectListing(listing.id);
        });
        markersRef.current!.addLayer(marker);
      });
    }
  }, [selectedId, onSelectListing, createClusterIcon, createPriceIcon]);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    const map = L.map(mapRef.current, {
      center: center || [37.54, 126.97],
      zoom: zoom || 12,
      zoomControl: false,
    });

    L.control.zoom({ position: "topright" }).addTo(map);

    L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/">CARTO</a>',
      maxZoom: 19,
    }).addTo(map);

    markersRef.current = L.layerGroup().addTo(map);
    mapInstanceRef.current = map;

    map.on("zoomend", () => {
      const z = map.getZoom();
      setCurrentZoom(z);
      updateMarkers(map, z);
    });

    updateMarkers(map, zoom || 12);

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (mapInstanceRef.current) {
      updateMarkers(mapInstanceRef.current, currentZoom);
    }
  }, [selectedId, updateMarkers, currentZoom]);

  useEffect(() => {
    if (mapInstanceRef.current && center) {
      mapInstanceRef.current.setView(center, 14, { animate: true });
    }
  }, [center]);

  return (
    <div ref={mapRef} className="w-full h-full" style={{ minHeight: "100%" }} />
  );
}
