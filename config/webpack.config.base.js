/**
 * Created by faraway on 17-8-4.
 */
const path = require('path')
module.exports = {
  entry: {
    app: [
      'whatwg-fetch',
      'babel-polyfill',
      path.resolve(__dirname, '../src/index.js')
    ]
  },
  output: {
    filename: 'static/js/[name].js',
    path: path.resolve(__dirname, '../dist'),
    publicPath: '',
    chunkFilename: 'static/js/[name].[hash].chunk.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: [
          path.resolve(__dirname, '../src')
          /**
           * 加上你想要include的目录
           */
        ]
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [
          path.resolve(__dirname, '../src')
          /**
           * 加上你想要include的目录
           */
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 2000,
          name: 'static/img/[name].[hash].[ext]'
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 2000,
          name: 'static/fonts/[name].[hash].[ext]'
        }
      }
      /**
       * 这里不写css相关的的原因是
       * 1.css的加载在开发环境可以用热加载优化，
       * 2.CSS可以在生产环境单独抽出或者inline化
       */
    ]
  }
}
