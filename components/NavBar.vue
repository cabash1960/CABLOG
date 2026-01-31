<template>
  <ErrorFallBack>
    <header class="sticky top-0 z-50">
      <div
        class="relative bg-[url('/bg-img.jpg')] bg-cover bg-center bg-no-repeat"
      >
        <div class="absolute inset-0 bg-black/80"></div>

        <nav
          class="relative container mx-auto px-5 py-4 text-[#E6E8F0 ] flex items-center justify-between"
        >
          <NuxtLink to="/" class="flex items-center gap-2 font-black">
            <NuxtImg src="/img-logo.png" alt="CA Blog" width="30" height="30" />
            <span> <span class="text-blue-500">CA</span>Blog </span>
          </NuxtLink>

          <ul class="hidden md:flex items-center gap-6 font-medium">
            <li><NuxtLink to="/features">Featured</NuxtLink></li>
            <li><NuxtLink to="#">Announcements</NuxtLink></li>
            <li><NuxtLink to="#">About</NuxtLink></li>
          </ul>

          <button
            class="md:hidden z-10"
            @click="open = !open"
            aria-label="Toggle menu"
          >
            ☰
          </button>
        </nav>

        <div
          v-if="open"
          class="md:hidden relative bg-black/90 text-white px-5 py-4 space-y-4"
        >
          <NuxtLink to="/features" class="block">Featured</NuxtLink>
          <NuxtLink to="#" class="block">Announcements</NuxtLink>
          <NuxtLink to="#" class="block">About</NuxtLink>
        </div>
      </div>
    </header>
  </ErrorFallBack>
</template>

<script setup>
import { ref } from "vue";
const open = ref(false);
</script>
