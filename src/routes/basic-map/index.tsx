import { component$, useStyles$, useSignal, $ } from "@builder.io/qwik";
import leafletStyles from "../../../node_modules/leaflet/dist/leaflet.css?inline";
import { LeafletMap } from "~/components/leaflet-map";
import type { LocationsProps } from "~/models/location";

const list = [
    {
        title: "Pano Reklam",
        desc: "Ümraniye",
        type: "test",
        status: "0",
        long: "29.1234",
        lat: "41.1234",
    },
    {
        title: "Billboard",
        desc: "Çekmeköy",
        type: "test",
        status: "1",
        long: "32.866287",
        lat: "39.925533",
    },
];

export default component$(() => {
    useStyles$(leafletStyles);

    const locations = useSignal<LocationsProps[]>(list.map(item => ({
        name: item.title,
        point: [parseFloat(item.lat), parseFloat(item.long)],
        boundaryBox: "",
        zoom: 9,
        marker: true,
    })));

    const currentLocation = useSignal<LocationsProps | null>(null);

    const showAllLocations = $(() => {
        currentLocation.value = null;
    });

    const changeLocation = $((index: number) => {
        currentLocation.value = {
            ...locations.value[index],
            zoom: 15,
        };
    });

    return (
        <div class="flex row">
            <div class="w-1/3 max-lg:hidden pt-5 flex flex-col px-5 max-w-md gap-4 shadow-2xl rounded-r-2xl">
                <div class="flex items-center justify-between">
                    <b class="my-3 text-2xl">Rezerve.</b>
                    <button onClick$={showAllLocations} class="px-3 py-1.5 rounded-lg border text-sm">Tümünü Göster</button>
                </div>
                <input
                    placeholder="Pano Ara..."
                    class="border-2 py-3 px-5 rounded-lg transition outline-none focus:border-black"
                />
                <div class="flex px-2 items-center justify-between">
                    <p>Panolar</p>
                    <p class="text-sm opacity-70">Toplam: {list.length}</p>
                </div>

                <div class="w-full">
                    {list.map((item, index) => (
                        <Item
                            key={index}
                            title={item.title}
                            desc={item.desc}
                            status={item.status}
                            onClick$={() => changeLocation(index)}
                        />
                    ))}
                </div>
            </div>

            <div
                class="absolute lg:hidden flex p-4 shadow-2xl flex-col bg-white rounded-t-3xl w-full h-1/3 bottom-0 left-0 right-0 z-20"
            >
                <b class="my-3 text-2xl">Rezerve.</b>
                <input placeholder="Pano Ara..." class="border py-3 px-5 rounded-lg"/>
                <p>Panolar</p>

                <div class="w-full">
                    <Item status="1" title="" desc="" onClick$={() => {}} />
                </div>
            </div>

            <LeafletMap locations={locations.value} currentLocation={currentLocation.value} />
        </div>
    );
});

const Item = component$(({ title, desc, status, onClick$ }) => {
    return (
        <div class="hover:bg-zinc-100 flex border-b items-center justify-start h-24 w-full px-4">
            <button onClick$={onClick$} class="flex flex-col gap-1 flex-1">
                {status == "1" ? (
                    <p class="bg-green-600 px-2 py-1 text-white text-xs rounded-full">
                        Kiralandı
                    </p>
                ) : (
                    <p class="bg-red-600 px-2 py-1 text-white text-xs rounded-full">
                        Müsait
                    </p>
                )}
                <b class="text-sm">{title}</b>
                <p class="text-xs">{desc}</p>
            </button>
            <button class="hover:bg-zinc-300 p-1 rounded-full">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    fill="#000000"
                    viewBox="0 0 256 256"
                >
                    <path d="M140,128a12,12,0,1,1-12-12A12,12,0,0,1,140,128Zm56-12a12,12,0,1,0,12,12A12,12,0,0,0,196,116ZM60,116a12,12,0,1,0,12,12A12,12,0,0,0,60,116Z"></path>
                </svg>
            </button>
        </div>
    );
});
