import { createError, useLazyFetch } from "#app";

export const usePosts = () => {
  const baseURL = "https://api.oluwasetemi.dev";

  const fetchPosts = async (page: number = 1, limit: number = 10) => {
    const { data, status, error, refresh } = await useFetch(
      `${baseURL}/posts`,
      {
        key: `posts-${page}-${limit}`,
        query: { page, limit },
        server: true,
        lazy: false,
      },
    );
    if (error.value) {
      throw createError({
        status: 500,
        statusText: error.value.message || "Failed to fetch posts",
      });
    }

    return { data, error, status, refresh };
  };

  const fetchSlugPosts = async (id: string) => {
    const { data, status, error, refresh } = await useFetch(
      `${baseURL}/posts/${id}`,
      {
        key: `posts-${id}`,
        server: true,
        lazy: false,
      },
    );
    if (error.value) {
      throw createError({
        status: 500,
        statusText: error.value.message || "Failed to fetch post",
      });
    }
    return { data, error, status, refresh };
  };

  return {
    fetchPosts,
    fetchSlugPosts,
  };
};
