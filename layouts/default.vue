<template>
  <ErrorFallBack>
    <nav-bar />
    <Suspense>
      <template #default>
        <main class="min-h-screen">
          <slot />
        </main>
      </template>
      <template #fallback>
        <SkeletonLoader />
      </template>
    </Suspense>
    <Footer />
  </ErrorFallBack>
</template>

<script setup>
const currentDte = computed(() => {
  const now = new Date();
  return now.getFullYear();
});
</script>
