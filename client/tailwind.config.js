/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primaryBlue : '#1c576d',
        pirmaryGreen: '#1bd686',
        lightBlue: '#19b2ea',
        secondaryGreen: '#1ea53a',
        primaryPink: '#f82ab1',
        primaryPurple: '#722f9c'
      },
      fontFamily: {
        Instagram: ['Settikef-PersonalUse', 'sans']
      }
    },
  },
  plugins: [],
}