<template>
  <NuxtErrorBoundary @error="logError">
    <slot />

    <template #error="{ error, clearError }">
      <div
        class="p-8 text-center space-y-4 border border-red-200 rounded-lg bg-red-50"
      >
        <div class="text-6xl">⚠️</div>
        <h2 class="text-xl font-bold">Something went wrong</h2>
        <p class="text-gray-700">{{ error?.message || String(error) }}</p>

        <div class="flex gap-4 justify-center">
          <button
            @click="clearError"
            class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Try Again
          </button>

          <button
            @click="goHome"
            class="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
          >
            Go Home
          </button>
        </div>
      </div>
    </template>
  </NuxtErrorBoundary>
</template>

<script setup>
const router = useRouter();

onErrorCaptured((err, instance, info) => {
  console.error("ErrorFallback caught:", err);
  console.log("Error info:", info);

  return false;
});

const logError = (error) => {
  console.error("Error boundary triggered:", error);
};

const goHome = () => {
  router.push("/");
};
</script>
