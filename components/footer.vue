<template>
  <footer class="container py-4 px-8 bottom-0 text-center text-[#6F789F ]">
    <p>CaBlog Inc @{{ currentDate }}</p>
  </footer>
</template>

<script setup>
import { ref } from "vue";

const currentDate = ref(new Date().getFullYear());
</script>

<style lang="scss" scoped></style>
