/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        bg: 'rgb(var(--bg) / <alpha-value>)',
        surface: 'rgb(var(--surface) / <alpha-value>)',
        'surface-hover': 'rgb(var(--surface-hover) / <alpha-value>)',
        'surface-active': 'rgb(var(--surface-active) / <alpha-value>)',
        border: 'rgba(255, 255, 255, 0.10)',
        'border-focus': 'rgba(255, 255, 255, 0.25)',
        'text-main': 'rgb(var(--text-main) / <alpha-value>)',
        'text-muted': 'rgba(255, 255, 255, 0.65)',
        accent: 'rgb(var(--accent) / <alpha-value>)',
        'accent-soft': 'var(--accent-soft)',
        'accent-glow': 'var(--accent-glow)',
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
        manrope: ['Manrope', 'sans-serif'],
        montserrat: ['Montserrat', 'sans-serif'],
        dmsans: ['"DM Sans"', 'sans-serif'],
        playfair: ['"Playfair Display"', 'serif'],
        spacegrotesk: ['"Space Grotesk"', 'sans-serif'],
        outfit: ['Outfit', 'sans-serif'],
        sora: ['Sora', 'sans-serif'],
        bebas: ['"Bebas Neue"', 'cursive', 'sans-serif'],
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
        'card': '0 4px 20px -2px rgba(0, 0, 0, 0.5)',
        'accent-sm': '0 0 15px -3px var(--accent-glow)',
        'accent-lg': '0 0 30px -5px var(--accent-glow)',
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}
