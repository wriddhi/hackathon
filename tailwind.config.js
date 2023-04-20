/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin')

module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        lastica: ["var(--font-lastica)", "sans-serif"],
        sans: ['monospace', 'sans-serif'],
      },
    },
  },
  plugins: [
    require("daisyui"),
    function ({ addUtilities, config }) {
    addUtilities({
      '.text-outline-0': {
        '-webkit-text-stroke': '0px white',
      },
      '.text-outline-1': {
        '-webkit-text-stroke': '1px white',
      },
      '.text-outline-2': {
        '-webkit-text-stroke': '2px white',
      },
      '.text-outline-3': {
        '-webkit-text-stroke': '3px white',
      },
      '.text-outline-4': {
        '-webkit-text-stroke': '4px white',
      },
      '.text-outline-black': {
        '-webkit-text-stroke-color': 'black',
      },


    })
    }
  ],
}