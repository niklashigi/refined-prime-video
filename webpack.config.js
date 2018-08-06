module.exports = {
  entry: './source/content.ts',
  resolve: {
    extensions: ['.ts', '.js'],
  },
  module: {
		rules: [
			{
				test: /\.ts$/,
				loader: 'awesome-typescript-loader'
			}
		]
	},
  optimization: {
    minimize: false
  },
  output: {
    path: __dirname + '/distribution',
    filename: 'content.js',
  },
}
