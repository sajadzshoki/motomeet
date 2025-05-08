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
                100: '#E8E9FF',
                200: '#C5C7FA',
                300: '#A3A4F3',
                400: '#8182EC',
                500: '#5E60E5',
                600: '#4B4CB8',
                700: '#39398A',
                800: '#26265C',
                900: '#13132F',
            },
            secondary: {
                100: '#5E62A1',
                200: '#4B4E81',
                300: '#393B60',
                400:'#262740',
                500: '#1B1C2E',
                600: '#131420',
                700: '#0F101A',
                800: '#0B0C13',
                900: '#0B0C13'
            },
            tertiary: {
                100: '#5E62A1',
                200: '#4B4E81',
                300: '#393B60',
                400:'#262740',
                500: '#1B1C2E',
                600: '#131420',
                700: '#0F101A',
                800: '#0B0C13',
                900: '#0B0C13'
            },

            gray: {
                100: '#E6E6E6',
                200: '#CCCCCC',
                300: '#B3B3B3',
                400: '#999999',
                500: '#808080',
                600: '#666666',
                700: '#4D4D4D',
                800: '#333333',
                900: '#1A1A1A',
            },
            green: {
                500: '#40BF6A'
            },
            yellow: {
                500: '#FFB400'
            },
            red: {
                500: '#DF2040'
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