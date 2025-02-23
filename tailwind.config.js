/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          "blue-base": "#8097c9",
          'gold-base': '#d4bd58',
          'black-primary': '#212121',
          'gray-secondary': '#6d7885',
        },
      },
    },
    plugins: [],
  }