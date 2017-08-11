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
const merge = require('webpack-merge')
const path = require('path')
const baseWebpackConfig = require('./webpack.config.base')

module.exports = merge(baseWebpackConfig, {
  module: {
    rules: [
      {
        test: /\.(css|styl)$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader?modules', 'postcss-loader', 'stylus-loader']
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
    })
    // // split vendor js into its own file
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: 'vendor',
    //   minChunks: function (module) {
    //     // any required modules inside node_modules are extracted to vendor
    //     return (
    //       module.resource &&
    //       /\.js$/.test(module.resource) &&
    //       module.resource.indexOf(
    //         path.join(__dirname, '../node_modules')
    //       ) === 0
    //     )
    //   }
    // })
    // // extract webpack runtime and module manifest to its own file in order to
    // // prevent vendor hash from being updated whenever app bundle is updated
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: 'manifest',
    //   chunks: ['vendor']
    // })
  ]
})
