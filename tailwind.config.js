/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      height:{
        'screen-minus-50': 'calc(100vh - 50px)',
      }
    },
  },
  plugins: [],
}