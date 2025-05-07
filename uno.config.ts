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
                100: '#DCF9F1',
                200: '#B1F1DF',
                300: '#86EACE',
                400: '#5AE2BC',
                500: '#2EDAAA',
                600: '#20B68C',
                700: '#198B6B',
                800: '#115F49',
                900: '#093428',
            },
            // primary: {
            //     100: '#E8E9FF',  // very light tint
            //     200: '#C5C7FA',
            //     300: '#A3A4F3',
            //     400: '#8182EC',
            //     500: '#5E60E5',  // base indigo-violet
            //     600: '#4B4CB8',
            //     700: '#39398A',
            //     800: '#26265C',
            //     900: '#13132F',  // near black
            // },
            // primary2: {
            //     100: '#F0F3FF',   // soft icy periwinkle
            //     200: '#D5DCFF',
            //     300: '#B1BAFF',
            //     400: '#8B98FF',
            //     500: '#6575FF',   // base: bright periwinkle-blue
            //     600: '#505DD1',
            //     700: '#3B45A3',
            //     800: '#262E75',
            //     900: '#111747',   // very dark indigo-blue
            // },
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
        'default' : 'flex flex-col items-center justify-center p-3 gap-2 rounded-md border-(1 solid gray-400) bg-gray-100',
        'flexCol' : 'flex flex-col',
        'flexCenter' : 'items-center justify-center',
        'mainBorder':'border-(1 solid gray-200 )',

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