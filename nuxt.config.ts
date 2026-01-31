// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-01-27",
  devtools: { enabled: false },
  app: {
    pageTransition: { name: "page", mode: "out-in" },
    head: {
      link: [{ rel: "icon", type: "image/png", href: "/img-logo.png" }],
    },
  },
  modules: ["@nuxtjs/tailwindcss", "@nuxt/fonts", "@nuxt/image"],
  image: {
    domains: ["res.cloudinary.com"],
  },
  css: ["@picocss/pico", "/assets/main.css", "/assets/piccoOverideCss.css"],
  fonts: {
    provider: "google",
    families: [
      {
        name: "Space Grotesk",
        provider: "google",
        fallbacks: ["Arial"],
      },
      {
        name: "Inter",
        provider: "google",
      },
      { name: "JetBrains Mono", provider: "google" },
      { name: "IBM Plex Sans", provider: "google" },
    ],
  },
  tailwindcss: {
    config: {
      theme: {
        extend: {
          fontFamily: {
            sans: ["IBM Plex Sans", "sans-serif"],
            heading: ["Space Grotesk", "sans-serif"],
            mono: ["JetBrains Mono", "monospace"],
          },
        },
      },
    },
  },
});
