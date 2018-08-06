module.exports = {
  entry: './source/content.js',
  resolve: {
    extensions: ['.js'],
  },
  output: {
    path: __dirname + '/distribution',
    filename: 'content.js',
  },
}
