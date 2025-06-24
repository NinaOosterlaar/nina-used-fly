/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,astro,vue}",
  ],
  theme: {
    extend: {
      colors: {
        "pastel-pink": "#FFD1DC",
        "soft-pink": "#F8C8DC",
        "light-pink": "#FFE5EC",
        "dusty-pink": "#D8A7B1",
        "deep-pink": "#FF85A2",
      },
    },
  },
  plugins: [],
};