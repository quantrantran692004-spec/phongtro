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
        // Official BARNES Luxury European Architectural Palette
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
          50: '#FAF9F7',
          100: '#F7F6F2', // Primary warm architectural background
          200: '#EFEEE8', // Soft neutral surface
          300: '#E5E2D9', // Standard border and divider
          400: '#D5D1C5',
        },
        charcoal: {
          50: '#F7F7F7',
          100: '#ECECEC',
          200: '#D5D5D5',
          300: '#B0B2AF',
          400: '#8E918E',
          500: '#777B78', // Muted secondary typography
          600: '#555955',
          700: '#3E413E',
          800: '#2D302D',
          900: '#252725', // Main primary charcoal typography
          950: '#181918',
        },
        // Direct tokens requested in prompt
        barnes: {
          ivory: '#F7F6F2',
          white: '#FFFFFF',
          charcoal: '#252725',
          muted: '#777B78',
          green: '#23483D',
          greenHover: '#1A372E',
          softNeutral: '#EFEEE8',
          border: '#E5E2D9',
          hoverSubtle: '#E8EEE9',
        },
        stone: {
          50: '#FAF9F7',
          100: '#F7F6F2',
          200: '#EFEEE8',
          300: '#E5E2D9',
          400: '#BDB9AC',
          500: '#777B78',
          600: '#555855',
          700: '#3D403D',
          800: '#2A2C2A',
          900: '#252725',
        }
      },
      fontFamily: {
        sans: ['"Be Vietnam Pro"', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['"Manrope"', '"Be Vietnam Pro"', 'system-ui', 'sans-serif'],
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
      },
      boxShadow: {
        'whisper': '0 1px 2px 0 rgba(37, 39, 37, 0.04)',
        'card': '0 2px 8px -1px rgba(37, 39, 37, 0.05), 0 1px 3px -1px rgba(37, 39, 37, 0.03)',
        'card-hover': '0 12px 28px -6px rgba(37, 39, 37, 0.08), 0 4px 10px -2px rgba(37, 39, 37, 0.03)',
        'elevated': '0 20px 40px -10px rgba(37, 39, 37, 0.10)',
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
      }
    },
  },
  plugins: [],
}