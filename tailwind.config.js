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
        brand: {
          50: '#F3F8F5',
          100: '#E4EFE8',
          200: '#C5DCCF',
          300: '#99C1AD',
          400: '#6CA389',
          500: '#44866A',
          600: '#23654B', // Tân Cương Evergreen
          700: '#1B4F3A',
          800: '#153C2D',
          900: '#102C21',
        },
        clay: {
          50: '#FFF7ED',
          100: '#FFEDD5',
          200: '#FED7AA',
          400: '#FB923C',
          500: '#F97316',
          600: '#EA580C', // Warm terracotta
          700: '#C2410C',
        },
        stone: {
          50: '#FAFAF8',
          100: '#F4F4F0',
          200: '#E6E6DF',
          300: '#D5D5CC',
          400: '#A3A399',
          500: '#737368',
          600: '#52524A',
          700: '#3F3F38',
          800: '#262622',
          900: '#181816',
        }
      },
      fontFamily: {
        sans: ['"Be Vietnam Pro"', '"Plus Jakarta Sans"', 'sans-serif'],
        display: ['"Plus Jakarta Sans"', '"Be Vietnam Pro"', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 2px 10px -2px rgba(27, 79, 58, 0.05), 0 1px 3px 0 rgba(0, 0, 0, 0.03)',
        'card-hover': '0 16px 32px -8px rgba(27, 79, 58, 0.11), 0 4px 10px -2px rgba(0, 0, 0, 0.04)',
        'elevated': '0 20px 45px -12px rgba(16, 44, 33, 0.18)',
        'subtle': '0 1px 2px 0 rgba(0, 0, 0, 0.04)',
      },
      borderRadius: {
        'xl': '12px',
        '2xl': '16px',
        '3xl': '22px',
      }
    },
  },
  plugins: [],
}
