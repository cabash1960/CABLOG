<template>
  <ErrorFallBack>
    <nav-bar />
    <main>
      <slot />
      <LazyMyHeavyComponent />
    </main>
    <Footer />
  </ErrorFallBack>
</template>

<script setup>
const currentDte = computed(() => {
  const now = new Date();
  return now.getFullYear();
});
</script>
