import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/pages/**/*.{js,ts,jsx,tsx,mdx}", "./src/components/**/*.{js,ts,jsx,tsx,mdx}", "./src/app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Roboto", "sans-serif"],
      },
      backgroundColor: {
        dark: "#1e1e1e",
        gray: "#333333",
        blue: "#4682b4",
      },

      borderColor: {
        "light-gray": "#333333",
        blue: "#4682b4",
        dark: "#1e1e1e",
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
export default config;
