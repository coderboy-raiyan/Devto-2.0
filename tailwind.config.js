/* eslint-disable global-require */
module.exports = {
    content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
    theme: {},
    plugins: [
        require("@tailwindcss/forms"),
        require("tailwind-scrollbar-hide"),
        require("@tailwindcss/typography"),
    ],
};
