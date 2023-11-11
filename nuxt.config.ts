// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxt/ui", "nuxt-server-utils", "@sidebase/nuxt-auth"],

  auth: {
    provider: {
      type: "authjs",
    },
  },
  ui: {},
  nuxtServerUtils: {
    mongodbUri: process.env.NEXTAUTH_URL,
  },
});
