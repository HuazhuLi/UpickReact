/**
 * Created by faraway on 17-8-4.
 */

const webpack = require('webpack')
const path = require('path')
const webpackConfig = require('../config/webpack.config.dev')
const express = require('express')
const proxyMiddleware = require('http-proxy-middleware')

const compiler = webpack(webpackConfig)
const app = express()

/**
 * 静态文件也不能漏了
 */
app.use('/static', express.static(path.resolve(__dirname, '../static')))

const devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath
  // quiet: true
})

const hotMiddleware = require('webpack-hot-middleware')(compiler, {
  log: () => {}
})

app.use((req, res, next) => {
  req.headers.host = 'weixin.bingyan-tech.hustonline.net'
  next()
})

const proxyTable = {
  '/api': 'https://weixin.bingyan-tech.hustonline.net/devupick/',
  '/shop_images': 'https://weixin.bingyan-tech.hustonline.net/devupick/'
}

Object.keys(proxyTable).forEach(function (context) {
  let options = proxyTable[context]
  if (typeof options === 'string') {
    options = { target: options }
  }
  app.use(proxyMiddleware(options.filter || context, options))
})

// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    hotMiddleware.publish({ action: 'reload' })
    cb()
  })
})

app.use(devMiddleware)

app.use(hotMiddleware)

app.get('/*', (req, res) => {
  res.end(devMiddleware.fileSystem.readFileSync(path.join(webpackConfig.output.path, 'index.html')))
})

const port = 8080

devMiddleware.waitUntilValid(() => {
  console.log(`> Listening at ${port}`)
})

app.listen(port)
