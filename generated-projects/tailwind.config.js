module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      colors: {
        neon: "#39ff14",
        "neon-pink": "#ff00ff",
        "neon-blue": "#00f0ff",
      },
      boxShadow: {
        neon: "0 0 5px #39ff14, 0 0 10px #39ff14, 0 0 20px #39ff14",
        "neon-pink": "0 0 5px #ff00ff, 0 0 10px #ff00ff, 0 0 20px #ff00ff",
        "neon-blue": "0 0 5px #00f0ff, 0 0 10px #00f0ff, 0 0 20px #00f0ff",
      },
    },
  },
  plugins: [],
};