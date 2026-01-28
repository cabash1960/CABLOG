<template>
  <ErrorFallBack>
    <div class="relative">
      <hero />
      <!-- ///////////// -->
      <div class="container relative flex justify-between px-8 py-12">
        <div class="flex border border-gray-400">
          <input
            type="text"
            v-model="searchQuery"
            placeholder="Search by title, content..."
            class="px-4 py-2 outline-none bg-transparent w-3/4 flex-1 text-center placeholder:text-xl"
          />
          <button class="px-4 py-2 border-l-1"><Search /></button>
        </div>

        <div class="flex flex-wrap gap-2">
          <button
            @click="selectedTag = null"
            :class="[
              'px-4 py-2  text-sm font-medium  transition-colors',
              selectedTag === null
                ? 'bg-transparent text-white !border !border-gray-400 '
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300',
            ]"
          >
            All
          </button>
          <div class="flex flex-wrap gap-2">
            <button
              v-for="tag in availableTags"
              :key="tag"
              @click="selectedTag = tag"
              :class="[
                'px-4 py-2  text-sm font-medium transition-colors',
                selectedTag === tag
                  ? 'border-2 border-white/50'
                  : 'bg-transparent text-gray-700 hover:bg-gray-300',
              ]"
            >
              {{ tag }}
            </button>
          </div>
        </div>
      </div>
      <!-- ///////////// -->

      <div class="container px-8 py-12">
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
            <div class="!grid grid-cols-3 gap-8">
              <BlogCard
                v-for="post in displayedPosts"
                :key="post.id"
                :post="post"
              />
            </div>

            <!-- Load More Button -->
            <div class="text-center mt-8">
              <button
                v-if="canLoadMore"
                @click="loadMore"
                :disabled="isloading"
                class="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
              >
                {{ isloading ? "Loading..." : "Load more" }}
              </button>

              <!-- All Loaded Message -->
              <p v-else class="text-gray-600">No more articles</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </ErrorFallBack>
</template>

<script setup>
import { Search } from "lucide-vue-next";

const { fetchPosts } = usePosts();
const { data, status, error } = await fetchPosts();

// All posts from API
const posts = computed(() => data.value?.data || []);

// Search and filter state
const searchQuery = ref("");
const selectedTag = ref(null);

// Extract unique tags
const availableTags = computed(() => {
  const tagsSet = new Set();
  posts.value.forEach((post) => {
    if (post.tags) {
      const postTags = post.tags.split(",").map((tag) => tag.trim());
      postTags.forEach((tag) => tagsSet.add(tag));
    }
  });
  return Array.from(tagsSet).sort();
});

// Apply search and tag filters
const filteredPosts = computed(() => {
  let result = posts.value;

  // Search filter
  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase();
    result = result.filter((post) => {
      const titleMatch = post.title?.toLowerCase().includes(query);
      const contentMatch = post.content?.toLowerCase().includes(query);
      const excerptMatch = post.excerpt?.toLowerCase().includes(query);
      return titleMatch || contentMatch || excerptMatch;
    });
  }

  // Tag filter
  if (selectedTag.value) {
    result = result.filter((post) => {
      if (!post.tags) return false;
      const postTags = post.tags.split(",").map((tag) => tag.trim());
      return postTags.includes(selectedTag.value);
    });
  }

  return result;
});

// Load more functionality
const filteredNumberPosts = ref(3);
const isloading = ref(false);

// Posts to display (filtered + limited by count)
const displayedPosts = computed(() => {
  return filteredPosts.value.slice(0, filteredNumberPosts.value);
});

// Can we load more?
const canLoadMore = computed(() => {
  return filteredNumberPosts.value < filteredPosts.value.length;
});

// Load more function
function loadMore() {
  isloading.value = true;
  setTimeout(() => {
    filteredNumberPosts.value += 3;
    isloading.value = false;
  }, 2000);
}

// Reset count when search/tag changes
watch([searchQuery, selectedTag], () => {
  filteredNumberPosts.value = 3; // ✅ Fixed variable name
});
</script>
