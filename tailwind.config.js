module.exports = {
  content: [
    "./pages/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    keyframes: {
      shimmer: {
        '100%': { transform: 'translateX(100%)' },
      },
      ping: {
        '75%, 100%': {
          transform: 'scale(2)',
          opacity: '0'
        },
      },
      pulse: {
        '0%, 100%': { opacity: '1' },
        '50%': { opacity: '.5' }
      },
    },
  },
  plugins: [
    require("tailwind-scrollbar"),
  ],
}
