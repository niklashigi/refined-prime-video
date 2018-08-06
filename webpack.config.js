module.exports = {
  entry: './source/content.ts',
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  module: {
		rules: [
			{
				test: /\.tsx?$/,
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
