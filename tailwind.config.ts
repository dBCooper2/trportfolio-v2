import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        cBg: "#000000", // background color
        cBgGradient: "#000000", // background color gradient
        cH1: "#FFFFFF", // heading 1 text color
        cH2: "#FFFFFF", // heading 2 text color
        cH3: "#FFFFFF", // heading 3 text color
        cH4: "#FFFFFF", // heading 4 text color
        cH5: "#FFFFFF", // heading 5 text color
        cH6: "#FFFFFF", // heading 6 text color
        cBody: "#FFFFFF", // body text color
        cBlock: "#808080", // code block color
        cLink: "#FFFFFF", // link color
        cLinkVisited: "#FFFFFF", // visited link color
        cButton: "#808080", // button color
        cButtonHover: "#808080", // button hover color
        cLineBreak: "#808080", // colors for line breaks
      },
      fontFamily: {
        font: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
export default config;
