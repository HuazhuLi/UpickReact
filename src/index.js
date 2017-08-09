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
  await import('./App.js')
  stopLoading()
})()
