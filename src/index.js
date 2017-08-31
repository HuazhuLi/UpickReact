/**
 * Created by faraway on 17-8-4.
 */
/**
 * 全局的单入口
 * 暂时准备把路由放在这个文件里面
 */
import './style/main.styl'
import { startLoading, stopLoading } from './plugins/loading'
(async function () {
  startLoading()
  try {
    const reRender = (await import('./App.js')).default
    reRender()
    stopLoading()
  } catch (e) {
    console.error(e.message)
    alert(`发生了十分严重的问题: "${e.message}", 对此我们感到十分抱歉!\n请将这个界面截图发送给开发者: 微信号: Farawaaay。谢谢您的支持！`)
  }
})()
if (module.hot) {
  module.hot.accept('./App.js', () => require('./App.js').default())
}
