/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./index.html", "./src/**/*.{js,jsx}"],
	theme: {
		extend: {
			colors: {
				paleYellow: "#FDFBEF",
				primaryGreen: "#004A49",
				mediumGreen: "#003D3E",
				darkGreen: "#020304",
				lightGreen: "#008E77",
				secondary: "#FD6B25",
				dimWhite: "rgba(255, 255, 255, 0.7)",
				dimBlue: "rgba(254, 216, 142, 0.2)",
			},
			fontFamily: {
				poppins: ["Poppins", "sans-serif"],
			},
			width: {
				a4: "210mm",
				smallerPage: "174mm",
			},
			height: {
				a4: "297mm",
				smallerPage: "174mm",
			},
			spacing: {
				a42: "215mm",
				a43: "195mm",
				smallerPage2: "179mm",
				smallerPage3: "159mm",
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
	plugins: [require("daisyui")],
};
