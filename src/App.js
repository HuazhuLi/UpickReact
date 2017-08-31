/**
 * Created by faraway on 17-8-31.
 */
/**
 * 这个文件负责热重载以及区分生产开发环境
 */
if (process.env.NODE_ENV === 'production') {
  require('./App.prod.js')
} else {
  const reRender = require('./App.dev.js').default
  reRender()
}
if (module.hot) {
  module.hot.accept('./App.dev.js', () => require('./App.dev.js').default())
}
