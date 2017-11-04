/**
 * Created by faraway on 17-8-4.
 */
/**
 * 全局的单入口
 * 暂时准备把路由放在这个文件里面
 */
import './style/main.styl'
import { startLoading, stopLoading } from './plugins/loading'

/** 下面这段代码专门为iPad编写 */
if (window.navigator.userAgent.indexOf('iPad') >= 0) {
  const iPad = () => {
    const root = document.querySelector('#root')

    root.style.width = window.innerHeight / 16 * 10 + 'px'
    root.style.marginLeft = root.style.marginRight = 'auto'

    document.body.style.backgroundColor = '#f2f2f2'
    document.documentElement.style.fontSize =
      window.innerHeight / 16 * 10 / 20 + 'px'
  }
  iPad()
  window.addEventListener('resize', () => setTimeout(iPad, 0))
}

;(async function () {
  startLoading()
  try {
    await import('./App.js')
    stopLoading()
  } catch (e) {
    alert(
      `发生了十分严重的问题: \n"${e.message}"\n 对此我们感到十分抱歉!\n请将这个界面截图发送给开发者: 微信号: Farawaaay。谢谢您的支持！`
    )
  }
})()
