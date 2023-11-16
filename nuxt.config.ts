// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    "@nuxt/ui",
    "nuxt-server-utils",
    "@sidebase/nuxt-auth",
    "@nuxt/image",
  ],

  runtimeConfig: {
    auth: {
      origin: process.env.AUTH_ORIGIN,
      secret: process.env.AUTH_SECRET,
    },
    stripeSecretKey: process.env.STRIPE_SECRET_KEY,
    stripeWebhookSecret: process.env.STRIPE_WEBHOOK_SECRET,
    public: {
      pixabayApiKey: process.env.PIXABAY_API_KEY,
      priceId: process.env.STRIPE_PRICE_ID,
      stripePublicKey: process.env.STRIPE_PUBLIC_KEY,
    },
  },

  auth: {
    baseURL: process.env.AUTH_ORIGIN,
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
