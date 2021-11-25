module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        transparent: "transparent",
        primary: "#131313",
        secondary: "#F1F1F1",
      },
      maxHeight: {
        "screen-80": "80vh",
      },
      minWidth: {
        "screen-md": "768px",
      },
    },
    container: {
      center: true,
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
