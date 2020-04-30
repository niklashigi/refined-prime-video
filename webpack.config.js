const path = require('path')
const TerserPlugin = require('terser-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

const extensionDirectory =
  process.env.NODE_ENV === 'development' ? 'chrome' : 'common'

module.exports = {
  entry: {
    content: './source/content.ts',
    popup: './source/popup/popup.ts',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.vue', '.svg'],
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
				test: /\.tsx?$/,
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
    minimizer: [
      new TerserPlugin({
        extractComments: false,
        terserOptions: {
          output: { comments: false },
        },
      }),
    ],
  },
  output: {
    path: `${__dirname}/extensions/${extensionDirectory}`,
    filename: '[name].js',
  },
  devtool: process.env.NODE_ENV === 'production' ? false : 'inline-source-map',
  plugins: [new VueLoaderPlugin()],
}
