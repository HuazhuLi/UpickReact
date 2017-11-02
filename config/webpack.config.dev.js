/**
 * Created by faraway on 17-8-4.
 */
/**
 * 这是开发环境专用的webpack.config
 * 会合并基础配置并加上一些开发环境专用的插件
 */
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const merge = require('webpack-merge')
const path = require('path')
const baseWebpackConfig = require('./webpack.config.base')

/**
 * 下面这段代码主要完成了这个任务：
 * app: ['index.js', ...] => app: ['index.js', 'dev-client.js', ...]
 */
Object.keys(baseWebpackConfig.entry).forEach(function (name) {
  baseWebpackConfig.entry[name] = [
    path.resolve(__dirname, '../build/dev-client.js'),
    'react-hot-loader/patch'
  ].concat(baseWebpackConfig.entry[name])
  // baseWebpackConfig.entry[name] = ['webpack-hot-middleware/client.js'].concat(baseWebpackConfig.entry[name])
})
module.exports = merge(baseWebpackConfig, {
  module: {
    rules: [
      {
        test: /\.min\.css$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      },
      {
        test: /\.(css|styl)$/,
        exclude: /\.min\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: 1
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true
            }
          },
          'stylus-loader'
        ]
      }
    ]
  },
  /**
   * 下面这个十分关键
   */
  devtool: '#cheap-module-eval-source-map',
  plugins: [
    // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, '../index.html'),
      inject: true
    })
  ]
})
