/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],

  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      animation: {
        fall: "fall linear infinite",
        wave: "wave 1s ease-in-out infinite",
      },
      keyframes: {
        fall: {
          "0%": { transform: "translateY(0)" },
          "100%": { transform: "translateY(100vh)" },
        },
        wave: {
          "0%, 100%": { height: "10px" },
          "50%": { height: "50px" },
        },
      },
    },
  },
  plugins: [],
};
