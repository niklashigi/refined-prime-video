module.exports = {
  theme: {
    colors: {
      white: '#fff',
      black: '#000',
      prime: {
        300: '#00cefb',
        400: '#00c1fa',
        500: '#00aadc',
      },
      gray: {
        200: '#f3f3f3',
        300: '#e6e6e6',
        400: '#dcdcdc',
        500: '#959595',
        600: '#7d7d7d',
        700: '#767676',
        800: '#555555',
      },
      carbon: {
        200: '#75899A',
        300: '#4C6172',
        400: '#445869',
        500: '#354959',
        600: '#24333f',
        700: '#1e2a33',
        800: '#1c262e',
        900: '#141d23',
      },
    },
  },
  variants: {
    display: ['group-hover'],
  },
  purge: ['./source/popup/**/*.vue'],
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
}
