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
        // colors: {
        //     primary: {
        //         100: 'var(--color-primary-100)',
        //         200: 'var(--color-primary-200)',
        //         300: 'var(--color-primary-300)',
        //         400: 'var(--color-primary-400)',
        //         500: 'var(--color-primary-500)',
        //         600: 'var(--color-primary-600)',
        //         700: 'var(--color-primary-700)',
        //         800: 'var(--color-primary-800)',
        //         900: 'var(--color-primary-900)',
        //
        //     },
        //     secondary: {
        //         100: 'var(--color-secondary-100)',
        //         200: 'var(--color-secondary-200)',
        //         300: 'var(--color-secondary-300)',
        //         400: 'var(--color-secondary-400)',
        //         500: 'var(--color-secondary-500)',
        //         600: 'var(--color-secondary-600)',
        //         700: 'var(--color-secondary-700)',
        //         800: 'var(--color-secondary-800)',
        //         900: 'var(--color-secondary-900)',
        //     },
        //     tertiary: {
        //         100: 'var(--color-tertiary-100)',
        //         200: 'var(--color-tertiary-200)',
        //         300: 'var(--color-tertiary-300)',
        //         400: 'var(--color-tertiary-400)',
        //         500: 'var(--color-tertiary-500)',
        //         600: 'var(--color-tertiary-600)',
        //         700: 'var(--color-tertiary-700)',
        //         800: 'var(--color-tertiary-800)',
        //         900: 'var(--color-tertiary-900)',
        //     },
        //     gray: {
        //         100: 'var(--color-gray-100)',
        //         200: 'var(--color-gray-200)',
        //         300: 'var(--color-gray-300)',
        //         400: 'var(--color-gray-400)',
        //         500: 'var(--color-gray-500)',
        //         600: 'var(--color-gray-600)',
        //         700: 'var(--color-gray-700)',
        //         800: 'var(--color-gray-800)',
        //         900: 'var(--color-gray-900)',
        //     },
        //     green: {
        //         500: 'var(--color-green-500)',
        //     },
        //     yellow: {
        //         500: 'var(--color-yellow-500)',
        //     },
        //     red: {
        //         500: 'var(--color-red-500)',
        //     }
        // }
        colors:{


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
            50:'#F7F7F7',
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
        },
            screenMain:'#131420',
            screenGray:'#191919'

        },
        boxShadow:{
            insetClub:'80px 80px 200px 0px #000 inset'
        },
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