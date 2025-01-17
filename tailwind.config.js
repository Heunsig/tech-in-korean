/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,njk,js,md}"],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}