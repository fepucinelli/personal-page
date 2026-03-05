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
          DEFAULT: '#00C9B4',
          dark: '#009E8F',
          light: '#4DDFCF',
          subtle: 'rgba(0, 201, 180, 0.12)',
        },
        volt: {
          DEFAULT: '#C8F53A',
          dark: '#A0CC1E',
          subtle: 'rgba(200, 245, 58, 0.1)',
        },
        surface: {
          light: '#F0FAF9',
          DEFAULT: '#E2F5F3',
          dark: '#C4E8E4',
        },
        ink: {
          DEFAULT: '#2D1B3D',
          secondary: '#4A3558',
          muted: '#7A6590',
        },
        night: {
          DEFAULT: '#071E2A',
          surface: '#0B2D3E',
          elevated: '#0D4A59',
          border: '#1A3A47',
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
