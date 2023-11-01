/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./views/**/*.ejs"],
  theme: {
    fontFamily: {
      londrina: ["'Londrina Solid'"],
      body: ['"Roboto"', "'sans serif'"],
      taskName: ["'Patrick Hand', 'cursive'"],
    },
    extend: {},
  },
  plugins: [],
};
