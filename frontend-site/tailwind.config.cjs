/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        paleYellow: '#FDFBEF',
        primaryGreen: '#004949',
        darkGreen: '#020304',
        lightGreen: '#008E77',
        secondary:'#FD6B25'
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
    },
    screens: {
      xs: "480px",
      ss: "620px",
      sm: "768px",
      md: "1060px", 
      lg: "1200px",
      xl: "1700px",
    },
  },
  plugins: [],
};
