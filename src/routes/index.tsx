import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

export default component$(() => {
  return (
    <>
      <header class="h-20 px-4 w-full max-w-screen-xl mx-auto flex items-center justify-between">
        <div class="flex-4">
          <b class="text-2xl">Rezerve</b>
        </div>
        <div class="flex flex-1 gap-12 justify-center items-center">
          <a href="">Ana Sayfa</a>
          <a href="">Referanslar</a>
          <a href="">Hakkımızda</a>
          <a href="">Reklam Ver</a>
        </div>
        <div class="flex-4">
          <a href="/basic-map" class="border hover:border-black px-5 py-3 rounded-full">Giriş Yap</a>
        </div>
      </header>
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
