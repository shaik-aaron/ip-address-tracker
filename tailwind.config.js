/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{html,js}"],
    theme: {
        extend: {
            backgroundImage: {
                "pattern-bg-desktop":
                    "url('/src/images/pattern-bg-desktop.png')",
            },
            fontFamily: {
                rubik: ["Rubik"],
            },
            colors: {
                "dark-gray": "hsl(0, 0%, 59%)",
            },
            fontWeight: {
                regular: "400",
                medium: "500",
                bold: "700",
            },
        },
    },
    plugins: [],
};
