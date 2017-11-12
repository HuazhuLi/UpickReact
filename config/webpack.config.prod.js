/**
 * Created by faraway on 17-8-4.
 */
/**
 * 这是生产环境环境专用的webpack.config
 * 会合并基础配置并加上一些开发环境专用的插件
 */
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const ManifestPlugin = require('webpack-manifest-plugin')
const merge = require('webpack-merge')
const path = require('path')
const baseWebpackConfig = require('./webpack.config.base')

module.exports = merge(baseWebpackConfig, {
  module: {
    rules: [
      {
        test: /\.(css|styl)$/,
        exclude: /\.min\.css$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader?modules', 'postcss-loader', 'stylus-loader']
        })
      },
      {
        test: /\.min\.css$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'postcss-loader', 'stylus-loader']
        })
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      sourceMap: false
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    }),
    // extract css into its own file
    new ExtractTextPlugin({
      filename: 'static/css/[name].css'
    }),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: path.resolve(__dirname, '../dist/static'),
        ignore: ['.*']
      },
      {
        from: path.resolve(__dirname, '../jump.html'),
        to: path.resolve(__dirname, '../dist'),
        ignore: ['.*']
      }
    ]),
    new ManifestPlugin()
  ]
})
