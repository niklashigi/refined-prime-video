const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

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
		minimizer: [
			new UglifyJsPlugin({
				uglifyOptions: {
					output: {
            comments: false
					}
				}
      })
		]
	},
  output: {
    path: __dirname + '/extensions/chrome',
    filename: 'content.js',
  },
}
