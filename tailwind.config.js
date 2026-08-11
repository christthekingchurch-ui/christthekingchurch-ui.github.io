/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
        accent: 'var(--color-accent)',
        background: 'var(--color-background)',
        foreground: 'var(--color-foreground)',
        muted: 'var(--color-muted)',
        border: 'var(--color-border)',
        gold: {
          50: '#FBF7EE',
          100: '#F5ECDA',
          200: '#EBDAB5',
          300: '#D4BA85',
          400: '#C8A96E',
          500: '#B8944E',
          600: '#A8894E',
          700: '#8B7355',
          800: '#6B5B43',
          900: '#4A3F2F',
        },
        ivory: {
          50: '#FDFBF7',
          100: '#F5F0EA',
          200: '#EDE5D8',
          300: '#E0D4C2',
        },
        charcoal: {
          50: '#F5F5F5',
          100: '#E0E0E0',
          200: '#B0B0B0',
          300: '#888888',
          400: '#555555',
          500: '#3D3D3D',
          600: '#2C2C2C',
          700: '#1a1a1a',
          800: '#141414',
          900: '#0F0F0F',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Playfair Display', 'Georgia', 'serif'],
      },
      animation: {
        'fade-up': 'fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'fade-in': 'fadeIn 1s ease-out forwards',
        'ken-burns': 'kenBurns 20s ease-in-out infinite alternate',
        'slide-up': 'slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        kenBurns: {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(1.08)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
