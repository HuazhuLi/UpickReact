/**
 * Created by faraway on 17-7-30.
 */
import './main.styl'
const loadingRoot = document.createElement('DIV')

loadingRoot.setAttribute('id', 'loading')
loadingRoot.innerHTML = `
<div class="animating">
  <div class="three-balls">
    <div class="ball light"></div>
    <div class="ball light-dark"></div>
    <div class="ball dark"></div>
  </div>
</div>
<h1>Loading...</h1>
`

document.body.appendChild(loadingRoot)

export function startLoading () {
  setTimeout(() => {
    loadingRoot.classList.add('show')
  }, 0)
}

export function stopLoading () {
  setTimeout(() => {
    loadingRoot.classList.remove('show')
  }, 0)
}
