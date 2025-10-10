import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // PixelPath Brand Colors (maintaining cozy palette with accessibility improvements)
        'pixelpath-primary': '#9a7aa0', // Original primary-color
        'pixelpath-secondary': '#bdcfb5', // Original secondary-color  
        'pixelpath-bg': '#f7f3eb', // Original soft beige
        'pixelpath-text': '#2d333a', // Darker for better contrast
        'pixelpath-accent': '#8d94ba', // Original accent-color
        'pixelpath-success': '#c0f8d1', // Original success-color
        
        // Semantic colors using Tailwind standards
        primary: {
          50: '#faf8fb',
          100: '#f3f0f5', 
          200: '#e8e1ed',
          300: '#d5c7df',
          400: '#bfa6cc',
          500: '#9a7aa0',
          600: '#826689',
          700: '#6d5372',
          800: '#5a445f',
          900: '#4a3a4f',
        },
        secondary: {
          50: '#f6faf4',
          100: '#e9f5e3',
          200: '#d4ebc8',
          300: '#bdcfb5',
          400: '#9bb891',
          500: '#7a9f6f',
          600: '#5f8055',
          700: '#4d6746',
          800: '#40533b',
          900: '#374633',
        },
      },
      fontFamily: {
        'sans': ['Inter', 'Titillium Web', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'cozy': '0 4px 6px rgba(0, 0, 0, 0.1)',
        'cozy-lg': '0 10px 15px rgba(0, 0, 0, 0.1)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
    },
  },
  plugins: [
    forms,
  ],
}