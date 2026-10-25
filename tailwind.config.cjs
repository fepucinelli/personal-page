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
        },
        surface: {
          light: '#FAFAFA',
          DEFAULT: '#F5F5F5',
          dark: '#E5E5E5',
        },
        ink: {
          DEFAULT: '#111111',
          secondary: '#444444',
          muted: '#777777',
        },
        night: {
          // Neutral graphite: the lime brand is the only colour on the page
          DEFAULT: '#0B0B0B',
          surface: '#0E0E0E',
          elevated: '#151515',
          border: '#232323',
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
