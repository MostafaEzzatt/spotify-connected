/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                base: "#121212",
                highlight: {
                    DEFAULT: "#1fdf64",
                    press: "#169c46",
                },
                avatar: "#282828",
                headerBackground: "#535353",
                listBlock: "#181818",
            },
        },
    },
    plugins: [],
};
