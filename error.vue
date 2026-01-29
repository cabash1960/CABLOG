<template>
  <div class="min-h-screen grid place-items-center px-8">
    <div class="text-center space-y-6">
      <div class="text-8xl">
        {{ error.statusCode === 404 ? "🔍" : "⚠️" }}
      </div>

      <h1 class="text-6xl font-bold">{{ error.statusCode }}</h1>

      <p class="text-xl text-gray-600">
        {{
          error.statusCode === 404 ? "Page not found" : "Something went wrong"
        }}
      </p>

      <NuxtLink
        to="/"
        class="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 no-underline"
      >
        Go Home
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
defineProps({
  error: Object,
});
</script>
