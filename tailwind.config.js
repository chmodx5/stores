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
          hover: "#14925F",
          contrastText: "#fff",
          light: {
            DEFAULT: "#00AB55",
            hover: "#14925F",
            contrastText: "#14925F",
          },
          dark: {
            DEFAULT: "#00AB55",
            hover: "#14925F",
            contrastText: "#fff",
          },
        },
        secondary: {
          DEFAULT: "#212B36",
          hover: "#212B38",
          contrastText: "#fff",
          light: {
            DEFAULT: "#212B36",
            hover: "#212B38",
            contrastText: "#14925F",
          },
          dark: {
            DEFAULT: "#212B36",
            hover: "#212B38",
            contrastText: "#fff",
          },
        },
        error: {
          DEFAULT: "#B82722",
          hover: "#B82722",
          contrastText: "#fff",
          light: {
            DEFAULT: "#B82722",
            hover: "#B82722",
            contrastText: "#14925F",
          },
          dark: {
            DEFAULT: "#B82722",
            hover: "#B82722",
            contrastText: "#fff",
          },
        },
        warning: {
          DEFAULT: "#B77513",
          hover: "#B77513",
          contrastText: "#fff",
          light: {
            DEFAULT: "#B77513",
            hover: "#B77513",
            contrastText: "#14925F",
          },
          dark: {
            DEFAULT: "#B77513",
            hover: "#B77513",
            contrastText: "#fff",
          },
        },
        info: {
          DEFAULT: "#00B8D9",
          hover: "#00B8D9",
          contrastText: "#fff",
          light: {
            DEFAULT: "#00B8D9",
            hover: "#00B8D9",
            contrastText: "#14925F",
          },
          dark: {
            DEFAULT: "#00B8D9",
            hover: "#00B8D9",
            contrastText: "#fff",
          },
        },
        success: {
          DEFAULT: "#00AB55",
          hover: "#00AB55",
          contrastText: "#fff",
          light: {
            DEFAULT: "#00AB55",
            hover: "#00AB55",
            contrastText: "#14925F",
          },
          dark: {
            DEFAULT: "#00AB55",
            hover: "#00AB55",
            contrastText: "#fff",
          },
        },
        accent: {
          DEFAULT: "#FFAB00",
          hover: "#FFAB00",
          contrastText: "#fff",
          light: {
            DEFAULT: "#FFAB00",
            hover: "#FFAB00",
            contrastText: "#14925F",
          },
          dark: {
            DEFAULT: "#FFAB00",
            hover: "#FFAB00",
            contrastText: "#fff",
          },
        },
      },
      fontFamily: {
        sans: ["poppins", "sans-serif"],
      },
    },
  },
  plugins: [],
};
