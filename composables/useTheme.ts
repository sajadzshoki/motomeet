import { ref } from 'vue'

const theme = ref<'dark' | 'light'>('dark')

export function useTheme() {
    const toggleTheme = () => {
        if (theme.value === 'dark') {
            document.documentElement.classList.add('theme-light')
            theme.value = 'light'
        } else {
            document.documentElement.classList.remove('theme-light')
            theme.value = 'dark'
        }
    }

    return {
        theme,
        toggleTheme
    }
}
