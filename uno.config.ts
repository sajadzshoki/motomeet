import {
    defineConfig,
    presetAttributify,
    presetUno,
    presetIcons,
    presetTypography,
    presetWebFonts,
    presetWind3,
    transformerDirectives,
    transformerVariantGroup
} from 'unocss'
// import transformerVariantGroup from '@unocss/transformer-variant-group'
export default defineConfig({

    theme: {
        colors: {
            primary: {
                100: 'var(--color-primary-100)',
                200: 'var(--color-primary-200)',
                300: 'var(--color-primary-300)',
                400: 'var(--color-primary-400)',
                500: 'var(--color-primary-500)',
                600: 'var(--color-primary-600)',
                700: 'var(--color-primary-700)',
                800: 'var(--color-primary-800)',
                900: 'var(--color-primary-900)',

            },
            secondary: {
                100: 'var(--color-secondary-100)',
                200: 'var(--color-secondary-200)',
                300: 'var(--color-secondary-300)',
                400: 'var(--color-secondary-400)',
                500: 'var(--color-secondary-500)',
                600: 'var(--color-secondary-600)',
                700: 'var(--color-secondary-700)',
                800: 'var(--color-secondary-800)',
                900: 'var(--color-secondary-900)',
            },
            tertiary: {
                100: 'var(--color-tertiary-100)',
                200: 'var(--color-tertiary-200)',
                300: 'var(--color-tertiary-300)',
                400: 'var(--color-tertiary-400)',
                500: 'var(--color-tertiary-500)',
                600: 'var(--color-tertiary-600)',
                700: 'var(--color-tertiary-700)',
                800: 'var(--color-tertiary-800)',
                900: 'var(--color-tertiary-900)',
            },

            gray: {
                100: 'var(--color-gray-100)',
                200: 'var(--color-gray-200)',
                300: 'var(--color-gray-300)',
                400: 'var(--color-gray-400)',
                500: 'var(--color-gray-500)',
                600: 'var(--color-gray-600)',
                700: 'var(--color-gray-700)',
                800: 'var(--color-gray-800)',
                900: 'var(--color-gray-900)',
            },
            green: {
                500: 'var(--color-green-500)',
            },
            yellow: {
                500: 'var(--color-yellow-500)',
            },
            red: {
                500: 'var(--color-red-500)',
            }
        }
    },
    shortcuts: {
        'default': 'flex flex-col items-center justify-center p-3 gap-2 rounded-md border-(1 solid gray-400) bg-gray-100',
        'flexCol': 'flex flex-col',
        'flexCenter': 'items-center justify-center',
        'mainBorder': 'border-(1 solid gray-200 )',

    },

    presets: [
        presetWind3(),
        presetAttributify(),
        presetIcons(),
        presetTypography(),
        presetWebFonts({
            fonts: {
                // ...
            },
        }),
        presetUno(),
        presetAttributify(),
    ],
    transformers: [
        transformerDirectives({
            applyVariable: ['--at-apply', '--uno-apply', '--uno'],
        }),
        transformerVariantGroup(),
    ],

})