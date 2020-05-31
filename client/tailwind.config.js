const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  theme: {
    extend: {
      colors: {
        themeYellow: "#FFEB09",
        themeGreen: "#ADFFD5",
        themeOrange: "#FF6C00",
      },
      fontFamily: {
        sans: ["Source Sans Pro", ...defaultTheme.fontFamily.sans],
      },
    },
  },
};
