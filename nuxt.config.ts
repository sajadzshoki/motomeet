// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2024-11-01',
    devtools: {enabled: false},
    ssr: false,
    // pages: false,
    runtimeConfig:{
        public:{
            supabaseUrl: process.env.SUPABASE_URL,
            supabaseAnonKey: process.env.SUPABASE_ANON_KEY,
        }
    },
    modules: [
      '@nuxt/content',
      '@nuxt/fonts',
      '@nuxt/image',
      '@nuxt/test-utils',
      '@unocss/nuxt',
      'nuxt-icons',
      '@nuxt/icon',
      '@vueuse/nuxt'
    ],

    css: [
        '@/assets/styles/main.scss',
        'vue-json-pretty/lib/styles.css',
        "@/assets/fonts/fontiran.css"
    ],
    plugins: [
        '@/plugins/vue-json-pretty'
    ]

})