const plugin = require('tailwindcss/plugin');

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.vue",
  ],
  theme: {
    extend: {
      backgroundImage: {
        spiderman: "url('http://image.tmdb.org/t/p/original/iQFcwSGbZXMkeyKrxbPnwnRo5fl.jpg')"
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
        }
      })
    })
  ],
}
