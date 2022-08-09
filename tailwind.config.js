module.exports = {
  content: [
    "./pages/*.{js,ts,jsx,tsx}",
    "./pages/auth/*.{js,ts,jsx,tsx}",
    "./components/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        '.animate-ping': '1s cubic-bezier(0, 0, 0.2, 1) infinite',
      }
    },
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
    },
  },
  plugins: [
    require("tailwind-scrollbar"),
  ],
}
