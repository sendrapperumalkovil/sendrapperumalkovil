/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        saffron: {
          50: '#F0FAF4',
          100: '#DCF7E1',
          200: '#B9EAC2',
          300: '#88D7A5',
          400: '#52C287',
          500: '#22A86C',
          600: '#1D8A5A',
          700: '#176E49',
          800: '#12543C',
          900: '#0D3A2C',
        },
        gold: {
          50: '#EAF7F1',
          100: '#D3EEE4',
          200: '#B0DCC9',
          300: '#85C2A8',
          400: '#57A986',
          500: '#368C68',
          600: '#2B7254',
          700: '#215540',
          800: '#183E32',
          900: '#102923',
        },
        maroon: {
          50: '#EBF7EE',
          100: '#D3EEDD',
          200: '#A9D7BC',
          300: '#7CC69A',
          400: '#4FA879',
          500: '#2A8B5E',
          600: '#207149',
          700: '#175737',
          800: '#103F26',
          900: '#0A2718',
        },
        cream: {
          50: '#F8FBF6',
          100: '#EFF7EE',
          200: '#E0EFE0',
          300: '#D1E7D1',
          400: '#C1DFC0',
          500: '#A8D3A8',
        },
      },
      fontFamily: {
        heading: ['Cormorant Garamond', 'serif'],
        body: ['Inter', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-out forwards',
        'fade-in-up': 'fadeInUp 0.8s ease-out forwards',
        'fade-in-down': 'fadeInDown 0.6s ease-out forwards',
        'slide-in-left': 'slideInLeft 0.8s ease-out forwards',
        'slide-in-right': 'slideInRight 0.8s ease-out forwards',
        'scale-in': 'scaleIn 0.6s ease-out forwards',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInDown: {
          '0%': { opacity: '0', transform: 'translateY(-20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-40px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(40px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(255, 153, 51, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(255, 153, 51, 0.6)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
};
