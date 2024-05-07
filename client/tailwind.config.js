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
        Instagram: ['Fontspring', 'sans-serif'],
        Head: ['IGhead', 'sans-serif'],
        Body: ['IGsans', 'sans-serif']
      },
      keyframes: {
        colorAnimation: {
          '0%': { color: '#1c576d' },
          '14.2857%': { color: '#1bd686' },
          '28.5714%': { color: '#19b2ea' },
          '42.8571%': { color: '#1ea53a' },
          '57.1429%': { color: '#f82ab1' },
          '71.4286%': { color: '#722f9c' },
          '85.7143%': { color: '#1c576d' },
          '100%': { color: '#1c576d' },
        },
      },
      animation: {
        colorAnimation: 'colorAnimation 10s linear infinite',
      },
    },
  },
  plugins: [],
}