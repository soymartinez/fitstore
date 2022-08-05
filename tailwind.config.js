module.exports = {
  content: [
    "./pages/*.{js,ts,jsx,tsx}",
    "./pages/auth/*.{js,ts,jsx,tsx}",
    "./components/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  keyframes: {
    shimmer: {
      '100%': {
        transform: 'translateX(100%)',
      },
    },
  },
  plugins: [
    require("tailwind-scrollbar"),
  ],
}
