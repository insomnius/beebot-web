/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bee-yellow': 'var(--bee-yellow)',
        'bee-black': 'var(--bee-black)',
        'bee-blue': 'var(--bee-blue)',
        'bee-green': 'var(--bee-green)',
        'bee-red': 'var(--bee-red)',
        'bee-orange': 'var(--bee-orange)',
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
}