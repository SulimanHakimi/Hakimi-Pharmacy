// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        black: '#000000',
        green: {
          600: '#16a34a',
        },
      },
    },
  },
  plugins: [
    require('tailwindcss-animate'),
  ],
};