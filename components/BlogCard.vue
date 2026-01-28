<template>
  <div class="border rounded-lg p-6 hover:shadow-lg transition-shadow">
    <NuxtLink :to="`/blog/${post.id}`" class="block">
      <h2 class="text-2xl font-bold mb-2 hover:text-blue-600">
        {{ post.title }}
      </h2>

      <p class="text-gray-600 mb-4">
        {{ post.excerpt || post.content?.substring(0, 150) + "..." }}
      </p>

      <div class="flex items-center justify-between text-sm text-gray-500">
        <span v-if="post.author">By {{ post.author }}</span>
        <span v-if="post.createdAt">{{ formatDate(post.createdAt) }}</span>
      </div>
    </NuxtLink>
  </div>
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
