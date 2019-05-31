const TerserPlugin = require('terser-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
  entry: {
    content: './source/content.ts',
    popup: './source/popup/popup.ts',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.vue'],
  },
  module: {
		rules: [
			{
				test: /\.vue$/,
				loader: 'vue-loader'
			},
			{
				test: /\.tsx?$/,
				loader: 'ts-loader',
        options: { appendTsSuffixTo: [/\.vue$/] }
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
    path: __dirname + '/extensions/common',
    filename: '[name].js',
  },
  devtool: process.env.NODE_ENV === 'production' ? false : 'inline-source-map',
  plugins: [new VueLoaderPlugin()],
}
