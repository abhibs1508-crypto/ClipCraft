/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bgMain: '#030712',
        surfaceMain: '#111827',
        cardBg: 'rgba(255, 255, 255, 0.08)',
        cardBorder: 'rgba(255, 255, 255, 0.12)',
        primary: '#3B82F6', // Blue Accent
        secondary: '#7C3AED', // Purple Accent
        highlight: '#06B6D4', // Cyan
        success: '#22c55e', // Green
        warning: '#f97316', // Orange
        danger: '#ef4444', // Red
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Space Grotesk', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
        manrope: ['Manrope', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 12s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'pulse-slower': 'pulse 16s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'logo-dash': 'logo-dash 2s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        'logo-dash': {
          '0%': { strokeDashoffset: '240' },
          '100%': { strokeDashoffset: '0' },
        }
      }
    },
  },
  plugins: [],
}
