import { createError, useLazyFetch } from "#app";

export const usePosts = () => {
  const baseURL = "https://api.oluwasetemi.dev";
  const baseURL2 = "https://api.sourcesplash.com/api/random";

  const fetchPosts = async () => {
    const { data, status, error } = await useLazyFetch(`${baseURL}/posts`);
    if (error.value) {
      throw createError({
        status: 500,
        statusText: error.value.message || "Failed to fetch posts",
      });
    }
    return { data, error, status };
  };

  const fetchSlugPosts = async (id: string) => {
    const { data, status, error } = await useLazyFetch(
      `${baseURL}/posts/${id}`,
    );
    if (error.value) {
      throw createError({
        status: 500,
        statusText: error.value.message || "Failed to fetch post",
      });
    }
    return { data, error, status };
  };

  return {
    fetchPosts,
    fetchSlugPosts,
  };
};
