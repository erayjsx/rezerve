import { component$, useStyles$, useSignal } from "@builder.io/qwik";
import leafletStyles from "../../../node_modules/leaflet/dist/leaflet.css?inline";

import { LeafletMap } from "~/components/leaflet-map";
import type { LocationsProps } from "~/models/location";

export default component$(() => {
  useStyles$(leafletStyles);
  const currentLocation = useSignal<LocationsProps>({
    name: "Test deneme",
    point: [43.17478, -2.41172],
    boundaryBox:
      "43.14658914559456,-2.4765586853027344,43.202923523094725,-2.3467826843261723",
    zoom: 9,
    marker: true,
  });
  return (
      <div class="flex row">
        <div class="w-1/3 pt-5 flex flex-col px-5 gap-4 shadow-2xl rounded-r-2xl">
          <a href="/"> Ana sayfaya dön</a>
          <b class="my-3 text-2xl">Rezerve</b>
          <input placeholder="Pano Ara..." class="border py-3 px-5 rounded-lg"/>
          <p>Panolar</p>
        </div>
        <LeafletMap location={currentLocation}/>
      </div>
  );
});
