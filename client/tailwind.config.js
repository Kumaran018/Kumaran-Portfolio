/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          900: '#000000',
          800: '#0a0a0a',
          700: '#121212',
          600: '#1a1a1a',
          500: '#262626',
        },
        accent: {
          blue: '#0066cc',
          purple: '#8622e6',
          cyan: '#00f2fe',
        }
      },
      fontFamily: {
        sans: ['Inter', 'Outfit', 'sans-serif'],
        mono: ['Fira Code', 'Courier New', 'monospace'],
        orbitron: ['Orbitron', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 8s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 3s ease-in-out infinite alternate',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 10px rgba(0, 102, 204, 0.2), 0 0 20px rgba(134, 34, 230, 0.1)' },
          '100%': { boxShadow: '0 0 25px rgba(0, 102, 204, 0.6), 0 0 45px rgba(134, 34, 230, 0.4)' },
        }
      }
    },
  },
  plugins: [],
}
