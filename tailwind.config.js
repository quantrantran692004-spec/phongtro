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
          50: '#F0FDF4',
          100: '#DCFCE7',
          200: '#BBF7D0',
          300: '#86EFAC',
          400: '#4ADE80',
          500: '#16A34A',
          600: '#059669', // High-contrast Emerald
          700: '#047857',
          800: '#065F46',
          900: '#064E3B',
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
        // Ultra High-Contrast Text Palette (Batdongsan & Airbnb Standard)
        stone: {
          50: '#FAFAF9',
          100: '#F5F5F4',
          200: '#E7E5E4',
          300: '#D6D3D1',
          400: '#78716C', // Darkened significantly so stone-400 is crisp and readable!
          500: '#57534E', // High contrast secondary
          600: '#44403C', // Deep readable body
          700: '#292524', // Heavy contrast
          800: '#1C1917', // Rich deep black
          900: '#0C0A09', // Absolute solid black
        }
      },
      fontFamily: {
        sans: ['"Inter"', '"Be Vietnam Pro"', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['"Inter"', '"Be Vietnam Pro"', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 1px 3px 0 rgba(0, 0, 0, 0.08), 0 1px 2px -1px rgba(0, 0, 0, 0.04)',
        'card-hover': '0 12px 24px -6px rgba(0, 0, 0, 0.12), 0 4px 8px -2px rgba(0, 0, 0, 0.05)',
        'elevated': '0 20px 35px -8px rgba(0, 0, 0, 0.18)',
        'subtle': '0 1px 2px 0 rgba(0, 0, 0, 0.06)',
      },
      borderRadius: {
        'xl': '12px',
        '2xl': '16px',
        '3xl': '24px',
      }
    },
  },
  plugins: [],
}
