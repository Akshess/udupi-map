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
    // ⚠️ Adjust property name to match your GeoJSON (lgd_code, LGD_CODE, lgdCode, etc.)
    const lgdCode = feature.properties?.lgd_code ?? feature.properties?.LGD_CODE ?? feature.properties?.lgdCode;

    if (lgdCode) {
      (layer as L.Path).bindTooltip(feature.properties?.name ?? String(lgdCode), {
        sticky: true,
      });

      layer.on({
        click: () => {
