module.exports = {
  content: [
    "./pages/**/*.js",
    "./Components/**/*.js",
    "./Components/Header.js",
  ],
  theme: {
    extend: {},
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
