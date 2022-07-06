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
            },
        },
    },
    plugins: [],
};
