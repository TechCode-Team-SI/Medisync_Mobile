/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')

module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ...colors, 
        primary: '#539091',
        primaryDisable: "#A8DCD9",
        secondary: '#68C3B7',
        terciary: "#CCEAE8",
        principal: "#FFFFFF",
        cancel: "#818F8F",
        bgMenu: "#E9F6F5",
        bgInput:"#CCEAE8",
      },
      fontFamily: {
        roboto: ["Roboto", "sans-serif"],
        montserrat: ["Montserrat", "monospace"],
        spacemono: ["SpaceMono"],
      },
    },
  },
  plugins: [],
};
