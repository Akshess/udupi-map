"use client";
import { useEffect, useState } from "react";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import { useRouter } from "next/navigation";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

export default function PanchayatMap() {
  const router = useRouter();
  const [geoData, setGeoData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/geojson/gram-panchayat.geojson")
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.url}`);
        return res.json();
      })
      .then(setGeoData)
      .catch((err) => {
        console.error("[PanchayatMap] Failed to load GeoJSON:", err);
        setError(err.message);
      });
  }, []);

  function onEachFeature(feature: any, layer: L.Layer) {
    const lgdCode = Number(feature.properties?.LGDGPCode);
    const name = feature.properties?.KGISVill_2 ?? `GP ${lgdCode}`;

    (layer as L.Path).bindTooltip(name, { sticky: true });

    if (!isNaN(lgdCode) && lgdCode > 0) {
      layer.on({
        click: () => {
          router.push(`/my-city/Administrative/gram-panchayats/${lgdCode}`);
        },
        mouseover: (e: any) => {
          e.target.setStyle({ fillOpacity: 0.75, weight: 2 });
        },
        mouseout: (e: any) => {
          e.target.setStyle({ fillOpacity: 0.4, weight: 1 });
        },
      });
    }
  }

  if (error) {
    return (
      <div className="flex h-[500px] w-full items-center justify-center rounded-xl border border-red-100 bg-red-50">
        <p className="text-sm text-red-600">
          Failed to load map data:{" "}
          <span className="font-mono">{error}</span>
        </p>
      </div>
    );
  }

  return (
    <div className="relative">
      {!geoData && (
        <div className="absolute inset-0 z-10 flex items-center justify-center rounded-xl bg-gray-50">
          <p className="text-sm text-gray-500">Loading map…</p>
        </div>
      )}
      <MapContainer
        center={[13.3409, 74.7421]}
        zoom={10}
        className="h-[500px] w-full rounded-xl"
        style={{ zIndex: 0 }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {geoData && (
          <GeoJSON
            key="gram-panchayat"
            data={geoData}
            style={{
              color: "#0f766e",
              weight: 1,
              fillColor: "#99f6e4",
              fillOpacity: 0.4,
            }}
            onEachFeature={onEachFeature}
          />
        )}
      </MapContainer>
    </div>
  );
}
