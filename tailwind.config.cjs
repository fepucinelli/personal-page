module.exports = {
  darkMode: 'class',
  content: [
    './app.vue',
    './components/**/*.{vue,js,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: 'rgb(var(--brand) / <alpha-value>)',
          dark: 'rgb(var(--brand-dark) / <alpha-value>)',
          light: '#66FF88',
          subtle: 'rgba(0, 255, 65, 0.1)',
        },
        volt: {
          DEFAULT: '#C8F53A',
          dark: '#A0CC1E',
          subtle: 'rgba(200, 245, 58, 0.1)',
        },
        surface: {
          light: '#FFFFFF',
          DEFAULT: '#F5F5F5',
          dark: '#E5E5E5',
        },
        ink: {
          DEFAULT: '#111111',
          secondary: '#444444',
          muted: '#777777',
        },
        night: {
          DEFAULT: '#050805',
          surface: '#080C08',
          elevated: '#0D160D',
          border: '#1A2A1A',
        },
      },
      fontFamily: {
        display: ['"Syne"', 'system-ui', 'sans-serif'],
        body: ['"Chakra Petch"', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
    },
  },
  plugins: [],
}
