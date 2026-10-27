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
        // Luxury European Architectural Palette (BARNES International Realty Standard)
        brand: {
          50: '#F2F6F4',
          100: '#E4EDE8',
          200: '#C9DCD3',
          300: '#9EBFAFD',
          400: '#5F9382',
          500: '#396E5F',
          600: '#2A574A',
          700: '#23483D', // Signature BARNES Deep Forest Green
          800: '#1A372E',
          900: '#11241E',
        },
        ivory: {
          DEFAULT: '#F7F6F2',
          50: '#FAF9F6',
          100: '#F7F6F2', // Primary warm architectural background
          200: '#EFECE5',
          300: '#E6E4DE', // Subtle border
          400: '#DAD8D0', // Secondary stone accent
        },
        charcoal: {
          50: '#F6F6F6',
          100: '#ECECEC',
          200: '#D5D5D5',
          300: '#B0B2AF',
          400: '#8E918E',
          500: '#777B78', // Muted slate gray
          600: '#555955',
          700: '#3E413E',
          800: '#2D302D',
          900: '#252725', // Deep primary charcoal text
          950: '#181918',
        },
        clay: {
          50: '#FAF5F3',
          100: '#F4E9E6',
          500: '#A85A48',
          600: '#944735', // Restrained terracotta
          700: '#7E3626',
        },
        // Mapped Stone Palette matching European architectural luxury
        stone: {
          50: '#FAF9F7',
          100: '#F7F6F2', // Warm Ivory background
          200: '#E6E4DE', // Architectural hairline divider
          300: '#DAD8D0', // Stone gray accent
          400: '#9A9C97',
          500: '#777B78', // Muted secondary text
          600: '#555855', // Intermediate body text
          700: '#3D403D', // Strong body text
          800: '#2A2C2A', // Dark headline
          900: '#252725', // Primary charcoal
        }
      },
      fontFamily: {
        sans: ['"Be Vietnam Pro"', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['"Manrope"', '"Be Vietnam Pro"', 'system-ui', 'sans-serif'],
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
      },
      boxShadow: {
        'whisper': '0 1px 2px 0 rgba(37, 39, 37, 0.04)',
        'card': '0 2px 6px -1px rgba(37, 39, 37, 0.06), 0 1px 3px -1px rgba(37, 39, 37, 0.03)',
        'card-hover': '0 12px 28px -6px rgba(37, 39, 37, 0.09), 0 4px 10px -2px rgba(37, 39, 37, 0.03)',
        'elevated': '0 20px 40px -10px rgba(37, 39, 37, 0.12)',
        'subtle': '0 1px 2px 0 rgba(37, 39, 37, 0.04)',
      },
      borderRadius: {
        'none': '0px',
        'sm': '4px',
        'DEFAULT': '6px',
        'md': '8px',
        'lg': '10px',
        'xl': '14px',
        '2xl': '18px',
        '3xl': '24px',
      }
    },
  },
  plugins: [],
}