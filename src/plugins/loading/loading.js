/**
 * Created by faraway on 17-7-30.
 */
// eslint-disable-next-line import/no-webpack-loader-syntax
import style from './loading.styl'
const loadingRoot = document.createElement('DIV')

loadingRoot.setAttribute('class', style['loading'])
loadingRoot.innerHTML = `
<div class="${style['animating']}">
  <div class="${style['three-balls']}">
    <div class="${style['ball']} ${style['light']}"></div>
    <div class="${style['ball']} ${style['light-dark']}"></div>
    <div class="${style['ball']} ${style['dark']}"></div>
  </div>
</div>
<h1>Loading...</h1>
`

document.body.appendChild(loadingRoot)

export function startLoading () {
  setTimeout(() => {
    loadingRoot.classList.add(style['show'])
  }, 0)
}

export function stopLoading () {
  setTimeout(() => {
    loadingRoot.classList.remove(style['show'])
  }, 0)
}
