/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#604AEC",
        "primary-foreground": "#FFFFFF",
        secondary: "#FF7F27",
        "secondary-foreground": "#FFFFFF",
        mute: "#D7E8FF",
      },
    },
  },
  plugins: [],
};
