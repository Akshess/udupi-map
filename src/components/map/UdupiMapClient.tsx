"use client";

import { useEffect, useState } from "react";
import { GeoJSON, MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import type { FeatureCollection, Feature, MultiPolygon } from "geojson";
import type { TalukProperties } from "@/types/taluka";

export default function UdupiMap() {
  const [geoData, setGeoData] = useState<
    FeatureCollection<MultiPolygon, TalukProperties> | null
  >(null);

  useEffect(() => {
    async function loadGeoJson() {
      const response = await fetch("/geojson/udupi-talukas.geojson");
      const data: FeatureCollection<MultiPolygon, TalukProperties> =
        await response.json();

      setGeoData(data);
    }

    loadGeoJson();
  }, []);

  const onEachFeature = (
    feature: Feature<MultiPolygon, TalukProperties>,
    layer: L.Layer
  ) => {
    layer.on({
      click: () => {
        alert(feature.properties.KGISTalukN);
      },
    });
  };

  return (
    <MapContainer
      center={[13.35, 74.75]}
      zoom={10}
      style={{ height: "100vh", width: "100%" }}
    >
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {geoData && (
        <GeoJSON
          data={geoData}
          onEachFeature={onEachFeature}
        />
      )}
    </MapContainer>
  );
}