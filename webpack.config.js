const path = require('path');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const {TsconfigPathsPlugin} = require('tsconfig-paths-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const {ENV} = process.env;

module.exports = {
  entry: {
    popup: './src/pages/popup/index.tsx',
    content: './src/pages/content/index.tsx',
    background: './src/scripts/background.ts',
  },
  mode: ENV,
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'build'),
  },
  devtool: ENV === 'development' ? 'source-map' : undefined,
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json', '.scss', 'css'],
    modules: [path.join(__dirname, 'node_modules')],
    plugins: [
      new TsconfigPathsPlugin({
        configFile: './tsconfig.json',
        baseUrl: 'src',
      }),
    ],
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanStaleWebpackAssets: false,
    }),
    new ForkTsCheckerWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './src/pages/popup/popup.html',
      filename: 'popup.html',
      excludeChunks: ['content', 'background'],
    }),
    new CopyPlugin([
      {
        from: 'src/images/*',
        to: './images',
        flatten: true,
      },
      {
        from: 'manifest.json',
        to: './',
      },
      {
        from: 'node_modules/webextension-polyfill/dist/browser-polyfill.min.js',
      },
    ]),
  ],
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
            },
          },
        ],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          'style-loader',
          'webpack-typings-for-css',
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[name]__[local]--[hash:base64:5]',
                exportLocalsConvention: 'camelCase',
              },
            },
          },
          'sass-loader',
        ],
      },
    ],
  },
};
