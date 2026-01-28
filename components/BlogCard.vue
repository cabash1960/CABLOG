<template>
  <ErrorFallBack>
    <div
      class="bg-[#12172A] relative p-6 hover:shadow-lg transition-shadow hover:!border-1 hover:border-blue-600 shadow-lg overflow-hidden h-full"
    >
      <div
        class="bg-[url('/bg-img.jpg')] bg-cover bg-center bg-no-repeat inset-0 absolute glow-3"
      ></div>
      <NuxtLink :to="`/blog/${post.id}`" class="block relative group">
        <h2 class="text-2xl font-bold mb-2 group-hover:text-blue-600 z-10">
          {{ post.title }}
        </h2>

        <p class="text-gray-600 mb-4 z-10">
          {{ post.excerpt || post.content?.substring(0, 150) + "..." }}
        </p>

        <div
          class="flex items-center justify-between text-sm text-gray-500 z-10 relative"
        >
          <span v-if="post.author">By {{ post.author }}</span>
          <span v-if="post.createdAt" class="text-bottom">{{
            formatDate(post.createdAt)
          }}</span>
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

const formatDate = (date) => {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};
</script>
