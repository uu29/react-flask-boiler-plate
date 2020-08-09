const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require('path');

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
  module: {
    rules: [
      {
        oneOf: [
          {
            test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
            loader: require.resolve('url-loader'),
            options: {
              limit: 10000,
              name: 'static/media/[name].[hash:8].[ext]',
            },
          },
          {
            test: /\.(js|jsx|mjs)$/,
            include: APP_PATH,
            loader: require.resolve('babel-loader'),
            options: {
              cacheDirectory: true,
            },
          },
          {
            test: /\.scss$/,
            use: ['style-loader', 'css-loader', 'sass-loader'],
          },
          {
            exclude: [/\.js$/, /\.html$/, /\.json$/],
            loader: require.resolve('file-loader'),
            options: {
              name: 'static/media/[name].[hash:8].[ext]',
            },
          },
        ],
      },
    ],
  },
  devServer: {
    hot: true,
    contentBase: ROOT_PATH,
    historyApiFallback: true,
    overlay: {
      warning: true,
      errors: true,
    },
    //publicPath: path.resolve(__dirname, "static/dist"),
    proxy: [
      {
        context: ['/api', '/'],
        target: 'http://localhost:5000',
      },
    ],
    watchContentBase: true,
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        uglifyOptions: {
          compress: false,
          ecma: 6,
          mangle: true,
        },
        sourceMap: true,
      }),
    ],
    splitChunks: {
      name: 'vendor',
      chunks: 'initial',
    },
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      // minimize: true,
    }),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    new ExtractTextPlugin({
      filename: 'css/app.css',
    }),
    new HtmlWebPackPlugin({
      title: 'Hot Module Replacement',
      template: path.resolve(APP_PATH, 'index.html'),
      filename: path.resolve(ROOT_PATH, 'index.html'),
      alwaysWriteToDisk: true,
    }),
    new webpack.HotModuleReplacementPlugin(),
    new CleanWebpackPlugin(),
    new HtmlWebpackHarddiskPlugin(),
  ],
  resolve: {
    modules: ['node_modules'],
    extensions: ['.js', '.json', '.jsx', '.css', '.scss'],
  },
};
