/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './pages/**/*.{html,js}',
    './components/**/*.{html,js}',
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