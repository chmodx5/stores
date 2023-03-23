/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#00AB55",
          light: "#87CEFA",
          dark: "#0000CD",
        },
        secondary: {
          DEFAULT: "#212B36",
        },
        error: {
          DEFAULT: "#B82722",
        },
        warning: { DEFAULT: "#B77513" },
        info: { DEFAULT: "#00B8D9" },
        success: { DEFAULT: "#00AB55" },
        accent: { DEFAULT: "#FFAB00" },
      },
      fontFamily: {
        sans: ["poppins", "sans-serif"],
      },
    },
  },
  plugins: [],
};
