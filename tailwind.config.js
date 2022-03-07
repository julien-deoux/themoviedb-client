const plugin = require('tailwindcss/plugin')

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.vue",
  ],
  theme: {
    extend: {
      colors: {
        white: '#edf0f2',
        black: '#121821',
        blue: '#1fb6ff',
        purple: '#7e5bef',
        pink: '#ff49db',
        orange: '#ff7849',
        green: '#13ce66',
        yellow: '#ffc82c',
        'gray-dark': '#313d4e',
        gray: '#8492a6',
        'gray-light': '#d3dce6',
      }
    },
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      addUtilities({
        '.inset-x-center': {
          position: 'absolute',
          left: '50%',
          transform: 'translate(-50%, 0)'
        },
      })
    })
  ],
}
