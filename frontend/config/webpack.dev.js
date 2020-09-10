const path = require('path');
const common = require('./webpack.common.js');
const webpack = require('webpack');
const merge = require('webpack-merge');
const StyleLintPlugin = require('stylelint-webpack-plugin');

module.exports = merge(common, {
  mode: 'development', // 开发模式
  devtool: 'inline-source-map', // 源映射 追踪错误
  devServer: {
    contentBase: path.join(__dirname, '../dist'),
    publicPath: '/',
    historyApiFallback: true,
    hot: true
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new StyleLintPlugin({
      emitErrors: false
    })
  ],
  module: {
    rules: [
      {
        test: /\.s?css$/,
        use: ['style-loader', 'css-loader', 'sass-loader', 'postcss-loader']
      },
      {
        test: /\.js$/,
        use: ['react-hot-loader/webpack', 'babel'],
        include: path.join(__dirname, 'src')
      }
    ]
  }
});
