/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["*.{html,js}", "./modules/*.js"],
  theme: {
    extend: {
      colors: {
        primary: "hsla(200, 10%, 65%, 1)",
        "primary-transparent": "hsla(200, 10%, 65%, 0.5)",
      }
    },
  },
  plugins: [],
}

