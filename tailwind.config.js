/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: "#0B0B10",
          soft: "#15151D",
          card: "#1C1C26",
          light: "#FFFFFF",
          "light-soft": "#F4F4F7",
          "light-card": "#FFFFFF",
        },
        accent: {
          DEFAULT: "#7C5CFF",
          danger: "#FF4D6D",
          success: "#39D98A",
          warn: "#FFB020",
        },
        ink: {
          DEFAULT: "#FFFFFF",
          dim: "#9A9AB0",
          "light-DEFAULT": "#0B0B10",
          "light-dim": "#5A5A6E",
        },
      },
      fontFamily: {
        display: ["System"],
      },
    },
  },
  plugins: [],
};
