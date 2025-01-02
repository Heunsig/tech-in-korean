/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,njk,js}"],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}