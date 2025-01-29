/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
        colors: {
            primary: "#2C3E50",
            secondary: "#1ABC9C",
            background: "#ECF0F1",
            card: "#FFFFFF",
            border: "#BDC3C7",
            accent: "#E74C3C",
            text: "#34495E",
          },
          fontFamily: {
            sans: ["Poppins", "sans-serif"],
            playfair: ["Playfair Display Variable"],
            geist: ["Geist"],
          },
    },
  },
  plugins: [],
};
