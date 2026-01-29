<template>
  <ErrorFallBack>
    <div
      class="flex flex-col justify-center items-center gap-6 min-h[3/4] lg:min-h-screen text-center font-bold bg-[url('/bg-img.jpg')] bg-cover bg-center bg-no-repeat px-4 sm:px-6 overflow-hidden pt-8 relative"
    >
      <div class="absolute inset-0 bg-black/60"></div>

      <div
        class="absolute inset-0 bg-[url('/bg-img.jpg')] bg-cover bg-center bg-no-repeat glow-2"
      ></div>

      <div class="glow"></div>

      <div class="z-10">
        <h1 class="font-heading font-bold text-4xl sm:text-5xl lg:text-6xl">
          <span class="text-blue-500">CABASH </span>BLOG
        </h1>

        <p
          class="font-sans tracking-wider mt-2 text-base sm:text-lg lg:text-2xl"
        >
          Dig into insights about our products, use cases, and POVs
        </p>
      </div>

      <div v-if="status === 'pending'">
        <article aria-busy="true">Loading...</article>
      </div>

      <div v-else-if="error">
        <span>Error loading {{ error.message }}</span>
      </div>

      <div
        v-else
        class="grid grid-cols-1 md:grid-cols-2 w-full max-w-5xl gap-6 sm:gap-8 p-4 sm:p-6 lg:p-8 bg-[#12172A] z-10 relative overflow-hidden"
      >
        <div
          class="absolute inset-0 bg-[url('/bg-img.jpg')] bg-cover bg-center bg-no-repeat glow-2"
        ></div>

        <div v-if="statusImg === 'pending'">
          <p aria-busy="true">Loading...</p>
        </div>

        <div v-else-if="imgError || !imgPost" class="z-10">
          <NuxtLink :to="`/blog/${randomPost.id}`">
            <div class="relative aspect-video overflow-hidden rounded-lg">
              <NuxtImg
                src="https://i.imgur.com/3XY2QVx.jpeg"
                alt="tech-img"
                class="w-full h-full object-cover"
                format="webp"
              />
            </div>
          </NuxtLink>
        </div>

        <div v-else class="z-10">
          <NuxtLink :to="`/blog/${randomPost.id}`" class="group">
            <div class="relative aspect-video overflow-hidden rounded-lg">
              <NuxtImg
                :src="imgPost.url"
                :alt="imgPost.description"
                format="webp"
                class="w-full h-full object-cover"
              />
            </div>
          </NuxtLink>
        </div>

        <NuxtLink :to="`/blog/${randomPost.id}`" class="group z-10">
          <div class="text-left space-y-2">
            <h2
              class="font-heading text-lg sm:text-xl lg:text-2xl transition-colors group-hover:text-[#4F6BFF]"
            >
              {{ randomPost.title }}
            </h2>

            <p class="font-sans text-sm sm:text-base text-[#A5ACC9]">
              {{ randomPost.excerpt }}
            </p>
          </div>
        </NuxtLink>
      </div>
    </div>
  </ErrorFallBack>
</template>

<script setup>
const { fetchPosts, fetchImg } = usePosts();

const { data: postData, error: imgError, status: statusImg } = await fetchImg();
const imgPost = computed(() => postData.value);

const { data: posts, error, status } = await fetchPosts();

const randomPostNum = computed(() =>
  Math.floor(Math.random() * posts.value?.data.length),
);

const randomPost = computed(() => posts.value?.data[randomPostNum.value]);
</script>

<style scoped>
.glow::before {
  content: "";
  inset: 0;
  border-radius: 50%;
  background: rgb(254, 193, 193);
  position: absolute;
  filter: blur(40px);
  animation: pulse 7s ease-in-out infinite;
}

.glow-2 {
  animation: slide 4s ease-in-out infinite;
  opacity: 0.5;
  filter: blur(1px);
}

.glow-2::before {
  content: "";
  inset: 0;
  background: rgb(0, 0, 0);
  position: absolute;
  opacity: 0.7;
}

@keyframes pulse {
  0%,
  100% {
    opacity: 0;
  }
  50% {
    opacity: 0.01;
  }
}

@keyframes slide {
  0%,
  100% {
    transform: translateX(0);
  }
  35% {
    transform: translateX(10px);
  }
  75% {
    transform: translateX(-4px);
  }
}
</style>
