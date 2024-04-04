/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      colors: {
        "main-blue": "#5ba3bf",
        "main-bg": "#f5f5f7",
      },
    },
    fontFamily: {
      quicksand: ["Quicksand", "sans-serif"],
      playfair: ["Playfair Display", "serif"],
      poppins: ["Poppins", "sans-serif"],
      raleway: ["Raleway", "sans-serif"],
      montserrat: ["Montserrat", "sans-serif"],
    },
  },
  plugins: [],
};
