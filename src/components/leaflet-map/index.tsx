import {
  component$,
  noSerialize,
  useSignal,
  useStyles$,
  useVisibleTask$,
} from "@builder.io/qwik";
import { Map, LatLngBounds } from "leaflet";
import type { LocationsProps } from "~/models/location";

interface LeafletMapProps {
  locations: LocationsProps[];
  currentLocation: LocationsProps | null;
}

export const LeafletMap = component$<LeafletMapProps>(({ locations, currentLocation }: LeafletMapProps) => {
  useStyles$(`
    #map {
      width: 100%;
      height: 100vh;
    }
  `);

  const mapContainer$ = useSignal<Map>();

  useVisibleTask$(async ({ track }) => {
    track(() => locations); // Track changes to locations
    track(() => currentLocation); // Track changes to currentLocation

    const { tileLayer, marker } = await import("leaflet");

    if (mapContainer$.value) {
      mapContainer$.value.remove();
    }

    const map = new Map("map").setView([41.015137, 28.979530], 6); // Default view to Turkey

    tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution:
          '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);

    if (currentLocation) {
      const centerPosition: [number, number] = currentLocation.point as [number, number];
      if (currentLocation.marker) {
        marker(centerPosition).bindPopup(`Marker at [${centerPosition}]`).addTo(map);
      }
      map.setView(centerPosition, currentLocation.zoom || 15);
    } else {
      const bounds = new LatLngBounds(locations.map(loc => loc.point as [number, number]));
      map.fitBounds(bounds);
      locations.forEach((location) => {
        const centerPosition: [number, number] = location.point as [number, number];
        if (location.marker) {
          marker(centerPosition).bindPopup(`Marker at [${centerPosition}]`).addTo(map);
        }
      });
    }

    mapContainer$.value = noSerialize(map);
  });

  return <div id="map"></div>;
});
