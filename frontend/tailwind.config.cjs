/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#6366f1',
        accent: '#ec4899',
        background: '#f8fafc',
        text: '#1f2937',
      },
      fontFamily: {
        'heading': ['Poppins', 'sans-serif'],
        'body': ['Inter', 'sans-serif'],
      },
      fontSize: {
        'h1': '32px',
        'h2': '24px',
        'body': '16px',
      }
    },
  },
  plugins: [],
}

