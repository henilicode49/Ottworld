/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        glass: {
          DEFAULT: 'rgba(15, 23, 42, 0.6)',
          hover: 'rgba(30, 41, 59, 0.7)',
        },
        primary: {
          DEFAULT: '#3b82f6', // Blue 500
          glow: '#60a5fa',
        }
      },
    },
  },
  plugins: [],
}
