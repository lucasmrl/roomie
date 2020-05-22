const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  theme: {
    extend: {
      colors: {
        yellow: "#FFEB09",
        themeGreen: "#ADFFD5",
        themeOrange: "#FF6C00",
      },
      fontFamily: {
        sans: ["Poppins", ...defaultTheme.fontFamily.sans],
      },
    },
  },
};
