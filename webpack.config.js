const TerserPlugin = require('terser-webpack-plugin')

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
      new TerserPlugin({
        terserOptions: {
          output: { comments: false },
        },
      }),
    ],
  },
  output: {
    path: __dirname + '/extensions/chrome',
    filename: 'content.js',
  },
}
