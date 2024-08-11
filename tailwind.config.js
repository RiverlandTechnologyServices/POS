/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: '#213018',
        secondary: '#b1ec90',
        black: {
          DEFAULT: '#000',
          100: '#39542a',
          200: '#103B66'
        },
        gray: {
          100: '#f6f9fc'
        }
      },
      fontFamily: {
        pthin: ["MartelSans-ExtraLight", "sans-serif"],
        pextralight: ["MartelSans-ExtraLight", "sans-serif"],
        plight: ["MartelSans-Light", "sans-serif"],
        pregular: ["MartelSans-Regular", "sans-serif"],
        pmedium: ["MartelSans-Regular", "sans-serif"],
        psemibold: ["MartelSans-SemiBold", "sans-serif"],
        pbold: ["MartelSans-Bold", "sans-serif"],
        pextrabold: ["MartelSans-ExtraBold", "sans-serif"],
        pblack: ["MartelSans-Black", "sans-serif"],
      },
    },
  },
  plugins: [],
}

