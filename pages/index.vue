<template>
  <div class="relative">
    <ErrorFallBack>
      <hero />
    </ErrorFallBack>

    <section class="min-h-screen">
      <ErrorFallBack>
        <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div
            class="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8"
          >
            <div
              class="flex border border-gray-400 w-full md:w-96 rounded-lg overflow-hidden"
            >
              <input
                type="text"
                v-model="searchQuery"
                placeholder="Search by title, content..."
                class="px-4 py-2 outline-none bg-transparent w-full text-sm sm:text-base placeholder:text-gray-400"
              />
              <button class="px-4 py-2 border-l border-gray-400 bg-[#12172A]">
                <Search />
              </button>
            </div>

            <div class="flex flex-wrap gap-2 items-center">
              <button
                @click="selectedTag = null"
                :style="{
                  border:
                    selectedTag === null
                      ? '2px solid #4F6BFF'
                      : '1px solid #9ca3af',
                  background: 'transparent',
                  color: selectedTag === null ? '#637dfe' : '#9ca3af',
                }"
                class="px-3 sm:px-4 py-2 text-xs sm:text-sm font-bold rounded-lg transition hover:opacity-80"
              >
                All
              </button>

              <button
                v-for="tag in availableTags"
                :key="tag"
                @click="selectedTag = tag"
                :style="{
                  border:
                    selectedTag === tag
                      ? '2px solid #4F6BFF'
                      : '1px solid #9ca3af',
                  background: 'rgb(79, 107, 255,0.1)',
                  color: selectedTag === tag ? '#637dfe' : '#9ca3af',
                }"
                class="px-3 sm:px-4 py-2 text-xs sm:text-sm font-bold rounded-lg transition hover:opacity-80"
              >
                {{ tag }}
              </button>
            </div>
          </div>
        </div>
      </ErrorFallBack>

      <ErrorFallBack>
        <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <article v-if="status === 'pending'" aria-busy="true">
            Loading posts...
          </article>

          <div v-else-if="error" class="text-red-600">
            <p>Error loading posts: {{ error.message }}</p>
          </div>

          <div v-else>
            <div v-if="displayedPosts.length === 0" class="text-center py-12">
              <p class="text-gray-500">No posts found matching your search.</p>
            </div>

            <div v-else>
              <div
                class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
              >
                <BlogCard
                  v-for="post in displayedPosts"
                  :key="post.id"
                  :post="post"
                />
              </div>

              <div class="text-center mt-10">
                <button
                  v-if="canLoadMore"
                  @click="loadMore"
                  :disabled="isLoading"
                  class="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition"
                >
                  {{ isLoading ? "Loading..." : "Load more" }}
                </button>

                <p v-else class="text-gray-600">No more articles</p>
              </div>
            </div>
          </div>
        </div>
      </ErrorFallBack>
    </section>
  </div>
</template>

<script setup>
import { Search } from "lucide-vue-next";

const { fetchPosts } = usePosts();
const { data, status, error } = await fetchPosts();

const posts = computed(() => data.value?.data || []);

const searchQuery = ref("");
const selectedTag = ref(null);

const availableTags = computed(() => {
  const tagsSet = new Set();
  posts.value.forEach((post) => {
    if (post.tags) {
      post.tags
        .split(",")
        .map((tag) => tag.trim())
        .forEach((tag) => tagsSet.add(tag));
    }
  });
  return Array.from(tagsSet).sort();
});

const filteredPosts = computed(() => {
  let result = posts.value;

  if (searchQuery.value.trim()) {
    const query = searchQuery.value.trim().toLowerCase();
    result = result.filter((post) => {
      return (
        post.title?.toLowerCase().includes(query) ||
        post.content?.toLowerCase().includes(query) ||
        post.excerpt?.toLowerCase().includes(query)
      );
    });
  }

  if (selectedTag.value) {
    result = result.filter((post) => {
      if (!post.tags) return false;
      return post.tags
        .split(",")
        .map((tag) => tag.trim())
        .includes(selectedTag.value);
    });
  }

  return result;
});

const filteredNumberPosts = ref(3);
const isLoading = ref(false);

const displayedPosts = computed(() =>
  filteredPosts.value.slice(0, filteredNumberPosts.value),
);

const canLoadMore = computed(
  () => filteredNumberPosts.value < filteredPosts.value.length,
);

function loadMore() {
  isLoading.value = true;
  setTimeout(() => {
    filteredNumberPosts.value += 3;
    isLoading.value = false;
  }, 2000);
}

watch([searchQuery, selectedTag], () => {
  filteredNumberPosts.value = 3;
});
</script>
