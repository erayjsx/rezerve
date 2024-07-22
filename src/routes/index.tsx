import {component$} from "@builder.io/qwik";
import type {DocumentHead} from "@builder.io/qwik-city";

export default component$(() => {
    return (
        <>
            <header
                class="h-20 sticky top-0 bg-white px-4 w-full max-w-screen-xl mx-auto flex items-center justify-between">
                <div class="flex-4">
                    <b class="text-2xl">Rezerve.</b>
                </div>
                <div class="flex max-lg:hidden flex-1 gap-12 justify-center items-center">
                    <a href="">Ana Sayfa</a>
                    <a href="">Referanslar</a>
                    <a href="">Hakkımızda</a>
                    <a href="">Reklam Ver</a>
                </div>
                <div class="flex-4">
                    <a href="/basic-map" class="border hover:border-black px-5 py-3 rounded-full">Giriş Yap</a>
                </div>
            </header>


            <main class="h-full">

                <div class="h-[44rem] w-full flex flex-col gap-4 items-center justify-center">
                    <b class="text-5xl">Rezerve.</b>
                    <p class="opacity-50">Reklam ve işbirlikleri için bize hemen ulaşın.</p>
                    <div class="flex gap-3">
                        <a href="/basic-map" class="border hover:border-black px-5 py-3 rounded-full">İletişim</a>
                        <a href="/basic-map"
                           class="border bg-black text-white hover:border-black px-5 py-3 rounded-full">Giriş Yap</a>
                    </div>
                </div>

            </main>
        </>
    );
});

export const head: DocumentHead = {
    title: "Welcome to Qwik",
    meta: [
        {
            name: "description",
            content: "Qwik site description",
        },
    ],
};
