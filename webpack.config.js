module.exports = {
  entry: './source/content.js',
  resolve: {
    extensions: ['.js'],
  },
  optimization: {
    minimize: false
  },
  output: {
    path: __dirname + '/distribution',
    filename: 'content.js',
  },
}
