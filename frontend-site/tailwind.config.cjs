/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        paleYellow: '#FDFBEF',
        primaryGreen: '#004A49',
        mediumGreen: '#004142',
        darkGreen: '#020304',
        lightGreen: '#008E77',
        secondary:'#FD6B25',
        dimWhite: "rgba(255, 255, 255, 0.7)",
        dimBlue: "rgba(9, 151, 124, 0.1)",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
    },
    screens: {
      // xs: "480px",
      // ss: "620px",
      // sm: "768px",
      // md: "1060px", 
      // lg: "1200px",
      // xl: "1700px",

      xs: "475px",
      ss: "480px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
    },
  },
  plugins: [],
};
