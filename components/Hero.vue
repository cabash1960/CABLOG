<template>
  <div
    class="flex justify-center items-center gap-4 relative flex-col min-h-screen text-center font-bold bg-[url('/bg-img.jpg')] px-5 bg-cover bg-center bg-no-repeat overflow-hidden pt-8"
  >
    <div class="absolute inset-0 bg-black/60"></div>

    <div
      class="bg-[url('/bg-img.jpg')] bg-cover bg-center bg-no-repeat inset-0 absolute glow-2"
    ></div>
    <div class="glow"></div>
    <div class="z-10">
      <h1 class="text-6xl font-bold font-heading z-10">Cabash Blog</h1>
      <p class="font-sans text-2xl tracking-wider mt-1 z-10">
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
      class="!grid grid-cols-2 w-3/4 z-10 gap-8 p-8 bg-[#12172A] relative"
    >
      <div
        class="bg-[url('/bg-img.jpg')] bg-cover bg-center bg-no-repeat inset-0 absolute glow-2"
      ></div>
      <div v-if="statusImg === 'pending'">
        <p aria-busy="true">Loading...</p>
      </div>

      <div v-else-if="imgError || !imgPost" class="z-10">
        <NuxtLink :to="`/blog/${randomPost.id}`">
          <img
            src="https://www.sourcesplash.com/i/f36e92a9cdc9"
            alt="tech-img"
            class="w-[100%]"
          />
        </NuxtLink>
      </div>

      <div class="z-100" v-else>
        <NuxtLink :to="`/blog/${randomPost.id}`" class="group">
          <img :src="imgPost.url" :alt="imgPost.description" class="w-[100%]" />
        </NuxtLink>
      </div>

      <NuxtLink :to="`/blog/${randomPost.id}`" class="group">
        <div class="z-10 text-left relative" v-if="randomPost">
          <h2
            class="font-heading cursor-pointer transition-colors group-hover:!text-[#4F6BFF]"
          >
            {{ randomPost.title }}
          </h2>
          <p class="font-sans text-[1rem] !text-[#A5ACC9]">
            {{ randomPost.excerpt }}
          </p>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
const { fetchPosts, fetchImg, fetchSlugPosts } = usePosts();
const { data: postData, error: imgError, status: statusImg } = await fetchImg();

const imgPost = computed(() => postData.value);

const { data: posts, error, status } = await fetchPosts();

const randomPostNum = computed(() =>
  Math.floor(Math.random() * posts.value?.data.length),
);

const randomPost = computed(() => posts.value?.data[randomPostNum.value]);
// console.log(randomPost.value?.title);
</script>

<style scoped>
.glow::before {
  content: "";
  inset: 0;
  border-radius: 50%;
  background: rgb(254, 193, 193);
  position: absolute;
  filter: blur(40px);
  transition: all;
  animation: pulse 7s ease-in-out infinite;
}

.glow-2 {
  /* transform: translateX(-50%); */
  /* width: max-content; */
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
