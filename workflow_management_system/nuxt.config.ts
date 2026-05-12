// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss"],
  // css: ["~/assets/css/tailwind.css"],

  runtimeConfig: {
    jwtSecret: process.env.JWT_SECRET,

    public: {},
  },
});
