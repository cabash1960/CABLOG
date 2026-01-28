export const usePosts = () => {
  const baseURL = "https://api.oluwasetemi.dev";
  const baseURL2 = "https://api.sourcesplash.com/api/random";

  const fetchPosts = async () => {
    const { data, status, error } = await useFetch(`${baseURL}/posts`, {
      lazy: true,
    });
    return { data, error, status };
  };

  const fetchSlugPosts = async (id: string) => {
    const { data, status, error } = await useFetch(`${baseURL}/posts/${id}`, {
      lazy: true,
    });
    return { data, error, status };
  };

  const fetchImg = async () => {
    const { data, error, status } = useFetch(baseURL2, { lazy: true });
    return { data, error, status };
  };
  return {
    fetchPosts,
    fetchSlugPosts,
    fetchImg,
  };
};
