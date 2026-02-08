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
          DEFAULT: '#2B7A5B',
          dark: '#1F5E44',
          light: '#4A9E78',
          subtle: '#D0E8DB',
        },
        surface: {
          light: '#FAF7F2',
          DEFAULT: '#F2EDE5',
          dark: '#E8E0D4',
        },
        ink: {
          DEFAULT: '#1A1714',
          secondary: '#6B6560',
          muted: '#9C958D',
        },
        night: {
          DEFAULT: '#141210',
          surface: '#1E1B18',
          elevated: '#282420',
          border: '#3A3530',
        },
      },
      fontFamily: {
        display: ['"Instrument Serif"', 'Georgia', 'serif'],
        body: ['Satoshi', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
    },
  },
  plugins: [],
}
