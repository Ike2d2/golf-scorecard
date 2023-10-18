/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["*.{html,js}"],
  theme: {
    extend: {
      colors: {
        primary: "hsla(200, 15%, 70%, 1)",
        "primary-transparent": "hsla(200, 15%, 70%, 0.5)",
      }
    },
  },
  plugins: [],
}

