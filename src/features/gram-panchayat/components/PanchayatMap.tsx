"use client";
import { useEffect, useState } from "react";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import { useRouter } from "next/navigation";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix broken marker icons in Next.js + Webpack
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

export default function PanchayatMap() {
  const router = useRouter();
  const [geoData, setGeoData] = useState<any>(null);

  useEffect(() => {
    fetch("/geojson/udupi_panchayats.geojson")
      .then((res) => res.json())
      .then(setGeoData)
      .catch((err) => console.error("Failed to load GeoJSON:", err));
  }, []);

  function onEachFeature(feature: any, layer: L.Layer) {
    const lgdCode =
      feature.properties?.lgd_code ??
      feature.properties?.LGD_CODE ??
      feature.properties?.lgdCode;

    if (lgdCode) {
      (layer as L.Path).bindTooltip(
        feature.properties?.name ?? String(lgdCode),
        { sticky: true }
      );

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

  return (
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
  );
}
