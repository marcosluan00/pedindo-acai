/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        purplePrimary: '#4A0E50', 
        purpleSecondary: '#8E44AD',
        accentPink: '#FF69B4',
        successGreen: '#28a745',
        warningYellow: '#ffc107',
      },
    },
  },
  plugins: [],
}
