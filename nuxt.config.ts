// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxt/ui", "nuxt-server-utils", "@sidebase/nuxt-auth", "@nuxt/image"],

  runtimeConfig: {
    public: {
      pixabayApiKey: process.env.PIXABAY_API_KEY,
    },
  },

  auth: {
    provider: {
      type: "authjs",
    },
  },
  colorMode: {
    preference: "light",
  },
  ui: {},
  nuxtServerUtils: {
    mongodbUri: process.env.NEXTAUTH_URL,
  },
});