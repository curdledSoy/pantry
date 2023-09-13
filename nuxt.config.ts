// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@sidebase/nuxt-auth',
    '@nuxtjs/tailwindcss',
    '@vueuse/nuxt',
    '@nuxtjs/color-mode'
  ],
  colorMode: {
    classSuffix: ''
  },

  typescript: {
    shim: false
  },

  runtimeConfig: {
    authSalt: ''
  },
  build: {
    transpile: [
      '@fortawesome/vue-fontawesome',
      '@fortawesome/fontawesome-svg-core',
      '@fortawesome/free-regular-svg-icons',
      '@fortawesome/free-solid-svg-icons'
    ]
  },

  nitro: {
    experimental: {
      openAPI: true
    }
  },
  css: ['@fortawesome/fontawesome-svg-core/styles.css'],

  devtools: {
    enabled: false,

    timeline: {
      enabled: true
    }
  }
})
