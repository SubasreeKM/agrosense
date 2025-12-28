import { useEffect, useRef, useState } from "react";
import maplibregl, { Map, Marker, Popup } from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { Search, Filter } from "lucide-react";

import { AppNavbar } from "@/components/layout/AppNavbar";
import { AppFooter } from "@/components/layout/AppFooter";

interface Place {
  name: string;
  lat: number;
  lng: number;
  address: string;
  phone: string;
  category: "fertilizer" | "office";
}

export default function Maps() {
  const mapRef = useRef<Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const markersRef = useRef<Marker[]>([]);

  const [places, setPlaces] = useState<Place[]>([]);
  const [coords, setCoords] = useState<[number, number] | null>(null);
  const [searchText, setSearchText] = useState("");
  const [filter, setFilter] = useState<"all" | "fertilizer" | "office">("all");

  /* 📍 Get user GPS location */
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) =>
        setCoords([pos.coords.longitude, pos.coords.latitude]),
      () => setCoords([77.5946, 12.9716]) // fallback: Bangalore
    );
  }, []);

  /* 🗺️ Initialize map */
  useEffect(() => {
    if (!coords || mapRef.current) return;

    mapRef.current = new maplibregl.Map({
      container: mapContainerRef.current!,
      style: "https://demotiles.maplibre.org/style.json",
      center: coords,
      zoom: 12,
    });

    mapRef.current.addControl(
      new maplibregl.NavigationControl(),
      "top-right"
    );
  }, [coords]);

  /* 🔍 Fetch places from backend */
  const fetchPlaces = async (location?: string) => {
    let url = "";

    if (location) {
      url = `http://127.0.0.1:5000/api/free-nearby-places?location=${encodeURIComponent(
        location
      )}`;
    } else if (coords) {
      url = `http://127.0.0.1:5000/api/free-nearby-places?lat=${coords[1]}&lng=${coords[0]}`;
    }

    if (!url) return;

    const res = await fetch(url);
    const data: Place[] = await res.json();

    setPlaces(data);
    renderMarkers(data, filter);

    if (data.length && mapRef.current) {
      mapRef.current.flyTo({
        center: [data[0].lng, data[0].lat],
        zoom: 12,
      });
    }
  };

  /* 🔄 Auto-search after GPS */
  useEffect(() => {
    if (coords) fetchPlaces();
  }, [coords]);

  /* 📌 Render markers */
  const renderMarkers = (data: Place[], activeFilter: string) => {
    if (!mapRef.current) return;

    markersRef.current.forEach((m) => m.remove());
    markersRef.current = [];

    data
      .filter((p) => activeFilter === "all" || p.category === activeFilter)
      .forEach((p) => {
        const popup = new Popup({ offset: 25 }).setHTML(`
          <strong>${p.name}</strong><br/>
          ${p.address}<br/>
          <small>${p.category.toUpperCase()}</small>
        `);

        const marker = new Marker({ color: p.category === "office" ? "green" : "brown" })
          .setLngLat([p.lng, p.lat])
          .setPopup(popup)
          .addTo(mapRef.current!);

        markersRef.current.push(marker);
      });
  };

  /* 🔄 Update markers on filter */
  useEffect(() => {
    renderMarkers(places, filter);
  }, [filter]);

  return (
    <div className="min-h-screen bg-background">
      <AppNavbar />

      <main className="pt-24 pb-16 container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-6">
          🌾 Agricultural Services Map
        </h1>

        {/* 🔍 Search */}
        <div className="flex gap-2 max-w-xl mx-auto mb-6">
          <input
            className="flex-1 border rounded px-4 py-2"
            placeholder="Enter city / village"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <button
            onClick={() => fetchPlaces(searchText)}
            className="bg-primary text-white px-4 py-2 rounded flex items-center gap-1"
          >
            <Search size={16} /> Search
          </button>
        </div>

        {/* 🎛 Filters */}
        <div className="flex justify-center gap-3 mb-4">
          {["all", "fertilizer", "office"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f as any)}
              className={`px-4 py-2 rounded-full border ${
                filter === f ? "bg-primary text-white" : ""
              }`}
            >
              <Filter size={14} /> {f}
            </button>
          ))}
        </div>

        {/* 🗺️ Map */}
        <div
          ref={mapContainerRef}
          className="w-full border rounded"
          style={{ height: "500px" }}
        />

        <button
  onClick={async () => {
    const res = await fetch("http://127.0.0.1:5000/api/shops");
    const data = await res.json();
    window.open(data.data.map_url, "_blank");
  }}
  className="border px-4 py-2 rounded"
>
  Open in Google Maps
</button>


        {/* 📋 List */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-3">📍 Nearby Services</h2>

          {places.length === 0 && <p>No services found.</p>}

          <ul className="space-y-2">
            {places
              .filter((p) => filter === "all" || p.category === filter)
              .map((p, i) => (
                <li
                  key={i}
                  onClick={() =>
                    mapRef.current?.flyTo({
                      center: [p.lng, p.lat],
                      zoom: 15,
                    })
                  }
                  className="border p-3 rounded cursor-pointer hover:bg-muted"
                >
                  <strong>{p.name}</strong>
                  <div className="text-sm">{p.address}</div>
                  <div className="text-xs text-muted-foreground">
                    {p.category.toUpperCase()}
                  </div>
                </li>
              ))}
          </ul>
        </div>
      </main>

      <AppFooter />
    </div>
  );
}
