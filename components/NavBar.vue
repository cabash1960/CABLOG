<template>
  <header class="sticky top-0 z-50">
    <div
      class="relative bg-[url('/bg-img.jpg')] px-5 bg-cover bg-cneter bg-no-repeat"
    >
      <div class="inset-0 absolute bg-black/70"></div>
      <nav class="container font-heading !text-white px-8 py-3">
        <ul class="z-100">
          <li class="flex gap-2 font-heading font-black z-10">Ca-Blog</li>
        </ul>
        <ul>
          <li class="z-10"><NuxtLink to="#">Featured</NuxtLink></li>
          <li class="z-10">
            <NuxtLink to="#">Announcements</NuxtLink>
          </li>
          <li class="z-10"><NuxtLink to="#">About</NuxtLink></li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script setup></script>

<style scoped></style>
