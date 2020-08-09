const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const loader = require('sass-loader');
const ROOT_PATH = path.resolve(__dirname, '../');
const APP_PATH = path.resolve(ROOT_PATH, 'myapp/src');
const BUILD_PATH = path.resolve(ROOT_PATH, 'dist');

module.exports = {
  entry: {
    vender: ['babel-polyfill', 'eventsource-polyfill', 'react', 'react-dom'],
    app: APP_PATH,
  },
  output: {
    path: BUILD_PATH,
    publicPath: 'dist/',
    filename: 'js/[name].js',
  },
  devtool: 'inline-source-map',
  devServer: {
    hot: true,
    contentBase: ROOT_PATH,
    historyApiFallback: true,
    overlay: {
      warning: true,
      errors: true,
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|mjs)$/,
        include: APP_PATH,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
        loader: require.resolve('url-loader'),
        options: {
          limit: 10000,
          name: 'static/media/[name].[hash:8].[ext]',
        },
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Hot Module Replacement',
      template: path.resolve(APP_PATH, 'index.html'),
      filename: path.resolve(ROOT_PATH, 'index.html'),
      alwaysWriteToDisk: true,
    }),
    new HtmlWebpackHarddiskPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new CleanWebpackPlugin(),
  ],
};
