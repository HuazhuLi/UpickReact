/**
 * Created by faraway on 17-8-4.
 */

const ora = require('ora')
const path = require('path')
const rm = require('rimraf')
const chalk = require('chalk')
const webpack = require('webpack')
const webpackConfig = require('../config/webpack.config.prod')

const spinner = ora('building for production...')
spinner.start()
rm(path.resolve(__dirname, '../dist'), err => {
  if (err) throw err
  webpack(webpackConfig, function (err, stats) {
    spinner.stop()
    if (err) throw err
    process.stdout.write(stats.toString(
      {
        colors: true,
        modules: false,
        children: false,
        chunks: false,
        chunkModules: false
      }
    ) + '\n\n')
    console.log(chalk.cyan('  Build complete.\n'))
    console.log(chalk.yellow(
      '  Tip: built files are meant to be served over an HTTP server.\n' +
      '  Opening index.html over file:// won\'t work.\n'
    ))
  })
})
