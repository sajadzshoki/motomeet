// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    // compatibilityDate: '2024-11-01',
    devtools: {enabled: false},
    ssr: false,
    // pages: false,

    modules: [
      '@nuxt/content',
      '@nuxt/fonts',
      '@nuxt/image',
      '@nuxt/test-utils',
      '@unocss/nuxt',
      'nuxt-icons',
      '@nuxt/icon',
      '@vueuse/nuxt',
        "nuxt-lodash"

    ],
    app: {
        head: {
            meta: [
                {
                    name: 'viewport',
                    content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no',
                },
            ],
        },
    },
    css: [
        '@/assets/styles/main.scss',
        'vue-json-pretty/lib/styles.css',
        "@/assets/fonts/fontiran.css",
        "vue3-toastify/dist/index.css",
    ],
    plugins: [
        '@/plugins/vue-json-pretty'
    ],
    lodash: {
        prefix: "_",
        // prefixSkip: ["is"],
        upperAfterPrefix: false,
        exclude: [],
        alias: [
            // ["camelCase", "stringToCamelCase"], // => stringToCamelCase
            // ["kebabCase", "stringToKebab"], // => stringToKebab
            // ["isDate", "isLodashDate"], // => _isLodashDate
        ],
    },

})