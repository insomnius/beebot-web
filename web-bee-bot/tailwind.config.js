/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bee-yellow': '#FFD700',
        'bee-black': '#2C2C2C',
        'bee-blue': '#4A90E2',
        'bee-green': '#7ED321',
        'bee-red': '#D0021B',
        'bee-orange': '#F5A623',
      },
      fontFamily: {
        'kid': ['Comic Sans MS', 'cursive'],
      },
      animation: {
        'bounce-slow': 'bounce 2s infinite',
        'pulse-slow': 'pulse 3s infinite',
        'wiggle': 'wiggle 1s ease-in-out infinite',
      },
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        }
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
}