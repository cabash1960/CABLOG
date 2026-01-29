<template>
  <ErrorFallBack>
    <div
      class="relative h-full overflow-hidden rounded-xl bg-[#12172A] p-4 sm:p-6 shadow-lg transition hover:shadow-xl hover:shadow-blue-500/20"
    >
      <div
        class="absolute inset-0 bg-[url('/bg-img.jpg')] bg-cover bg-center bg-no-repeat glow-3"
      ></div>

      <NuxtLink
        :to="`/blog/${post.id}`"
        class="relative z-10 flex flex-col h-full group"
      >
        <h2
          class="font-bold text-lg sm:text-xl lg:text-2xl mb-2 transition-colors group-hover:text-blue-600"
        >
          {{ post.title }}
        </h2>

        <p class="text-sm sm:text-base text-gray-400 mb-4 line-clamp-3">
          {{ post.excerpt || post.content?.substring(0, 150) + "..." }}
        </p>

        <div
          class="mt-auto flex items-center justify-between text-xs sm:text-sm text-gray-500"
        >
          <span v-if="post.author">By {{ post.author }}</span>
          <span v-if="post.createdAt">
            {{ formatDate(post.createdAt) }}
          </span>
        </div>
      </NuxtLink>
    </div>
  </ErrorFallBack>
</template>

<script setup>
defineProps({
  post: {
    type: Object,
    required: true,
  },
});

const formatDate = (date) =>
  new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
</script>
