<template>
  <NuxtErrorBoundary>
    <slot />
    <template #error="{ error }">
      <div
        class="min-h-screen px-8 py-4 grid place-items-center max-w-md text-center space-y-6"
      >
        <div>⚠️</div>
        <h1>Something went Wrong</h1>
        <p v-if="error?.message">Error: {{ error.message }}</p>
        <p v-else>Error: {{ String(error) }}</p>
        <button @click="handleError">Clear error</button>
      </div>
    </template>
  </NuxtErrorBoundary>
</template>
<script setup>
const handleError = () => {
  clearError({ redirect: "/" });
};
</script>
