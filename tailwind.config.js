/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Brand palette inspired by the logo: blue, purple, cyan, orange.
        brand: {
          blue: '#2563eb',
          indigo: '#4f46e5',
          purple: '#7c3aed',
          cyan: '#06b6d4',
          orange: '#f97316',
        },
        // Semantic axis colors used across charts & UI.
        axis: {
          freedom: '#2563eb', // آزادی
          authority: '#7c3aed', // اقتدار
          left: '#06b6d4', // چپ
          right: '#f97316', // راست
        },
      },
      fontFamily: {
        sans: ['Vazirmatn', 'Inter', 'system-ui', 'sans-serif'],
        display: ['Vazirmatn', 'Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'brand-gradient':
          'linear-gradient(135deg, #06b6d4 0%, #2563eb 35%, #7c3aed 70%, #f97316 130%)',
        'brand-radial':
          'radial-gradient(120% 120% at 50% 0%, rgba(124,58,237,0.18) 0%, rgba(37,99,235,0.10) 40%, rgba(6,182,212,0.0) 75%)',
      },
      boxShadow: {
        glow: '0 10px 40px -12px rgba(79,70,229,0.45)',
        card: '0 8px 30px -12px rgba(2,6,23,0.18)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'spin-slow': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '200% 0' },
          '100%': { backgroundPosition: '-200% 0' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.5s ease-out both',
        float: 'float 6s ease-in-out infinite',
        'spin-slow': 'spin-slow 40s linear infinite',
        shimmer: 'shimmer 2.5s linear infinite',
      },
    },
  },
  plugins: [],
}
