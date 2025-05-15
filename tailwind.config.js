
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        plantgreen: "#0c803f", // 👈 własny kolor
      },
    },
  },
  plugins: [],
}
