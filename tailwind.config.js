/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        azure: {
          DEFAULT: '#21A0F9',
          50: '#eaf5fe',
          100: '#d5ebfd',
          500: '#21A0F9',
          600: '#0d8de6',
          700: '#0b74be',
        },
        brandDark: {
          DEFAULT: '#042D7C',
          light: '#0a3a99',
          dark: '#031f55',
        },
        brandGray: {
          DEFAULT: '#F1F1F1',
          50: '#f8fafc',
          100: '#F1F1F1',
          200: '#e2e8f0',
        },
        brandWhite: '#FFFFFF',
      },
      fontFamily: {
        sansation: ['Sansation', 'SomarSans', 'system-ui', 'sans-serif'],
        sans: ['Sansation', 'SomarSans', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
