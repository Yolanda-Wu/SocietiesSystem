const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const isDev = process.env.NODE_ENV === 'development';

module.exports = {
  entry: { app: './src/index.js' },
  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/',
    filename: 'js/[name].[hash:7].js',
  },
  resolve: {
    extensions: ['*', '.js', '.jsx'],
    alias: {
      Components: path.resolve(__dirname, '../src/components/'),
      Pages: path.resolve(__dirname, '../src/pages/'),
      Assets: path.resolve(__dirname, '../src/assets'),
      Api: path.resolve(__dirname, '../src/api'),
      Utils: path.resolve(__dirname, '../src/utils'),
    },
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'output',
      minify: isDev
        ? {}
        : {
            collapseWhitespace: true,
            html5: true,
            minifyCSS: true,
            removeComments: true,
            removeEmptyAttributes: true,
          },
      template: 'src/index.html',
      chunks: ['app', 'vendors', 'common'],
      // favicon: 'src/assets/images/logo.png',
      filename: 'index.html',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react'],
            plugins: ['react-hot-loader/babel'],
          },
        },
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 1024,
            },
          },
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: ['file-loader'],
      },
    ],
  },
};
