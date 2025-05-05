/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2D2D2D',
        secondary: '#E5E5E5',
      },
      spacing: {
        '24': '24px', // 24px gutters
        '16': '16px', // 16px card padding
      },
      animation: {
        'ping-once': 'ping 0.7s cubic-bezier(0, 0, 0.2, 1) 1',
        'slide-up': 'slide-up 0.3s ease-out forwards'
      },
      keyframes: {
        'slide-up': {
          'from': {
            transform: 'translateY(100%)',
            opacity: '0'
          },
          'to': {
            transform: 'translateY(0)',
            opacity: '1'
          }
        }
      }
    },
  },
  plugins: [],
}