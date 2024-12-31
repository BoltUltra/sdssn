'use client';

import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { nigeriaGeoJSON } from './NigeriaStates';

interface StateData {
  state: string;
  total: number;
}

interface NigeriaChoroplethMapProps {
  data: StateData[];
}

export default function NigeriaStatesMap({ data }: NigeriaChoroplethMapProps) {
  const mapRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !data || data.length === 0) return;

    if (!mapRef.current) {
      mapRef.current = L.map('map').setView([9.082, 8.6753], 6);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: '© OpenStreetMap contributors',
      }).addTo(mapRef.current);

      function getColor(total: number) {
        return total > 10
          ? '#800026'
          : total > 5
          ? '#BD0026'
          : total > 2
          ? '#E31A1C'
          : total > 1
          ? '#FC4E2A'
          : total > 0
          ? '#FD8D3C'
          : '#FFEDA0';
      }

      function addMarkers(map) {
        data.forEach((state) => {
          const stateGeo = nigeriaGeoJSON.features.find(
            (feature) =>
              feature.properties.name.toLowerCase() ===
              state.state.toLowerCase()
          );
          if (stateGeo) {
            const centroid = L.geoJSON(stateGeo).getBounds().getCenter();
            L.circleMarker(centroid, {
              radius: state.total * 10,
              color: getColor(state.total),
              weight: 1,
              opacity: 1,
              fillOpacity: 0.7,
            })
              .addTo(map)
              .bindPopup(
                `<strong>${state.state}</strong><br>Total: ${state.total}`
              );
          }
        });
      }

      function style(feature: any) {
        const stateData = data.find(
          (d) => d.state.toLowerCase() === feature.properties.name.toLowerCase()
        );
        const total = stateData ? stateData.total : 0;
        return {
          fillColor: getColor(total),
          weight: 1, // Increased from 2 to 4
          heigt: 4,
          width: 4,
          opacity: 1,
          color: 'white',
          dashArray: '3',
          fillOpacity: 0.9, // Increased from 0.7 to 0.9
          stroke: true,
          strokeWidth: 2, // Added stroke width
          zoomOffset: 1, // Added zoom offset
        };
      }

      function highlightFeature(e: L.LeafletMouseEvent) {
        const layer = e.target;
        layer.setStyle({
          weight: 1,
          color: '#666',
          dashArray: '',
          fillOpacity: 0.7,
        });
        layer.bringToFront();
      }

      function resetHighlight(e: L.LeafletMouseEvent) {
        geojsonLayer.resetStyle(e.target);
      }

      function zoomToFeature(e: L.LeafletMouseEvent) {
        if (mapRef.current) {
          mapRef.current.fitBounds(e.target.getBounds());
        }
      }

      function onEachFeature(feature: any, layer: L.Layer) {
        layer.on({
          mouseover: highlightFeature,
          mouseout: resetHighlight,
          click: zoomToFeature,
        });
        const stateData = data.find(
          (d) => d.state.toLowerCase() === feature.properties.name.toLowerCase()
        );
        const total = stateData ? stateData.total : 0;
        layer.bindPopup(
          `<strong>${feature.properties.name}</strong><br>Total: ${total}`
        );
      }

      const geojsonLayer = L.geoJSON(nigeriaGeoJSON, {
        style: style,
        onEachFeature: onEachFeature,
      }).addTo(mapRef.current);

      addMarkers(mapRef.current);
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [data]);

  if (!data || data.length === 0) {
    return (
      <div
        className="h-[500px] w-full rounded-lg shadow-lg flex items-center justify-center bg-gray-100"
        aria-label="Map data is loading or unavailable"
      >
        <p className="text-gray-600">Map data is unavailable</p>
      </div>
    );
  }

  return (
    <div
      id="map"
      className="h-[500px] w-full rounded-lg shadow-lg"
      aria-label="Choropleth Map of Nigeria showing user distribution by state"
    />
  );
}
