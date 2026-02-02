<template>
  <ErrorFallBack>
    <nav-bar />

    <main class="min-h-screen">
      <slot />
    </main>

    <Footer />
  </ErrorFallBack>
</template>

<script setup></script>
