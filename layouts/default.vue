<template>
  <ErrorFallBack>
    <nav-bar />
    <main>
      <div></div>
      <slot />
    </main>
    <footer class="container py-4 px-8 text-center text-[#6F789F ]">
      <p>CaBlog Inc @{{ currentDte }}</p>
    </footer>
  </ErrorFallBack>
</template>

<script setup>
const currentDte = computed(() => {
  const now = new Date();
  return now.getFullYear();
});
</script>
