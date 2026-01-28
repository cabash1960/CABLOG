<template>
  <ErrorFallBack>
    <div class="container mx-auto px-4 py-8 max-w-4xl">
      <article v-if="status === 'pending'" aria-busy="true"></article>
      <div v-else-if="error" class="text-red-600">
        <p>Error loading post: {{ error.message }}</p>
      </div>

      <article v-else>
        <h1 class="text-4xl font-bold mb-4">{{ post.title }}</h1>

        <div class="text-gray-600 mb-8">
          <span v-if="post.author">By {{ post.author }}</span>
          <span v-if="post.createdAt"> • {{ formatDate(post.createdAt) }}</span>
        </div>

        <div class="prose max-w-none" v-html="post.content"></div>

        <NuxtLink
          to="/"
          class="inline-block mt-8 text-blue-600 hover:underline"
        >
          ← Back to all posts
        </NuxtLink>
      </article>
    </div>
  </ErrorFallBack>
</template>

<script setup>
const route = useRoute();
const { fetchSlugPosts } = usePosts();

const { data: post, status, error } = await fetchSlugPosts(route.params.id);
console.log(route.params.id);

const formatDate = (date) => {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};
</script>
```
