/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        dark: {
          background: 'rgb(24 24 27)',
          text: '#F5F5F5',
          secondary: 'rgb(39 39 42)',
          border: 'rgb(55 65 81)',
          button: '#4B70F5',
          buttonHover: '#2d56ec',
        },
        light: {
          background: 'rgb(244 244 245)',
          text: '#111827',
          secondary: 'rgb(212 212 216)',
          border: 'rgb(161 161 170)',
          button: '#4B70F5',
          buttonHover: '#2d56ec',
        },
      },
    },
  },
  plugins: [],
};
