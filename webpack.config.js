const path = require('path')
const TerserPlugin = require('terser-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

const isProduction = process.env.NODE_ENV === 'production'

module.exports = {
  mode: isProduction ? 'production' : 'development',
  entry: {
    content: './source/content.ts',
    popup: './source/popup/popup.ts',
  },
  resolve: {
    extensions: ['.ts', '.js', '.vue', '.svg'],
    alias: {
      '~feather-icons': path.resolve(
        __dirname,
        'node_modules/feather-icons/dist/icons',
      ),
    },
  },
  module: {
		rules: [
			{
				test: /\.vue$/,
				loader: 'vue-loader',
			},
			{
				test: /\.ts$/,
				loader: 'ts-loader',
        options: { appendTsSuffixTo: [/\.vue$/] },
			},
			{
				test: /\.svg/,
				loader: 'vue-svg-loader',
        options: {
          svgo: {
            plugins: [
              { removeXMLNS: true },
              { removeAttrs: { attrs: ['class'] } },
            ],
          },
        },
			},
		],
  },
  optimization: {
    minimizer: isProduction ? [
      new TerserPlugin({
        extractComments: false,
        terserOptions: {
          output: { comments: false },
        },
      }),
    ] : [],
  },
  output: {
    filename: '[name].js',
  },
  devtool: isProduction ? false : 'source-map',
  plugins: [new VueLoaderPlugin()],
}
