/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          green: {
            medium: "#4CAF50",
            light: "#81C784",
            dark: "#388E3C",
          },
          blue: {
            medium: "#2196F3",
            light: "#64B5F6",
            dark: "#1976D2",
          },
        },
        secondary: {
          orange: {
            medium: "#FF9800",
            light: "#FFB74D",
            dark: "#F57C00",
          },
          red: {
            medium: "#F44336",
            light: "#E57373",
            dark: "#D32F2F",
          },
        },
        neutral: {
          gray: {
            medium: "#9E9E9E",
            light: "#E0E0E0",
            dark: "#616161",
          },
          black: {
            light: "#545454",
            dark: "#343434",
          },
          white: "#FFFFFF",
        },
      },
      keyframes: {
        slideLeftToRight: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(0)" },
        },
        slideTopToBottom: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(0)" },
        },
        slideRightToLeft: {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0)" },
        },
        slideBottomToTop: {
          "0%": { transform: "translateY(100%)" },
          "100%": { transform: "translateY(0)" },
        },
      },
      animation: {
        slideLeftToRight: "slideLeftToRight 0.5s ease-in-out",
        slideTopToBottom: "slideTopToBottom 0.5s ease-in-out",
        slideRightToLeft: "slideRightToLeft 0.5s ease-in-out",
        slideBottomToTop: "slideBottomToTop 0.5s ease-in-out",
      },
    },
  },
  plugins: [],
};
