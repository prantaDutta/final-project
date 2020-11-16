module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  purge: ["./components/**/*.{js,ts,jsx,tsx}", "./pages/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: (theme) => ({
        "header-img": "url('/background-1.jpg')",
      }),
      height: {
        "1vh": "10vh",
        "2vh": "20vh",
        "3vh": "30vh",
        "4vh": "40vh",
        "5vh": "50vh",
        "6vh": "60vh",
        "7vh": "70vh",
        "8vh": "80vh",
        "9vh": "90vh",
        "10vh": "100vh",
      },
      colors: {
        mint: "##ADEFD1FF",
      },
      spacing: {
        1.5: "0.35rem",
      },
    },
  },
  variants: {},
  plugins: [
    require("@adoxyz/tailwindcss-named-colors"),
    require("./tailwindPlugins/bg-img-with-opacity"),
  ],
};
