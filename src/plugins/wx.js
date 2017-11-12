import wx from 'weixin-js-sdk'

import fetch from 'whatwg-fetch'

const config = {
  appId: '', // appId
  timestamp: '', // timestamp
  nonceStr: '', // nonceStr
  signature: '' // signature
}

export const init = () =>
  fetch('/api/v2/jsapi', {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify({
      url: window.location.href.split('#')[0]
    })
  })
    .then(res => {
      res.json().then(({ appId, timestamp, nonceStr, signature }) => {
        config.appId = appId
        config.timestamp = timestamp
        config.nonceStr = nonceStr
        config.signature = signature
      })
      return res.json()
    })

export const getConfig = () => config

window.wx = {
  init,
  getConfig
}
