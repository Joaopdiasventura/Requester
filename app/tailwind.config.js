/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      height: {
        small: "5%",
        big: "95%",
        almost: "97.5%"
      }
    }
  },
  plugins: []
};
