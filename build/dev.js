// /**
//  * Created by faraway on 17-8-4.
//  */
//
// const express = require('express')
// const webpack = require('webpack')
// const webpackConfig = require('../config/webpack.config.dev')
//
// const compiler = webpack(webpackConfig)
// const app = express()
//
// const devMiddleware = require('webpack-dev-middleware')(compiler, {
//   quiet: true,
//   publicPath: webpackConfig.output.publicPath
// })
//
// const hotMiddleware = require('webpack-hot-middleware')(compiler, {
//   log: () => {}
// })
//
// // force page reload when html-webpack-plugin template changes
// compiler.plugin('compilation', function (compilation) {
//   compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
//     hotMiddleware.publish({ action: 'reload' })
//     cb()
//   })
// })
// // serve webpack bundle output
// app.use(devMiddleware)
//
// // enable hot-reload and state-preserving
// // compilation error display
// app.use(hotMiddleware)
//
// const readyPromise = new Promise((resolve) => {
//   devMiddleware.waitUntilValid(() => {
//     resolve()
//   })
// })
//
// const server = app.listen(8080)
//
// module.exports = {
//   ready: readyPromise,
//   close: () => {
//     server.close()
//   }
// }

/**
 * Created by faraway on 17-7-17.
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
  publicPath: webpackConfig.output.publicPath,
  quiet: true
})

const hotMiddleware = require('webpack-hot-middleware')(compiler, {
  log: () => {}
})

// app.use((req, res, next) => {
//   req.headers.host = 'iknowhust-question.hustonline.net'
//   next()
// })

const proxyTable = {
  // '/api': 'http://iknowhust-question.hustonline.net/'
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

const port = 8080

devMiddleware.waitUntilValid(() => {
  console.log(`> Listening at ${port}`)
})

app.listen(port)
