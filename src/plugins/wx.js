import wx from 'weixin-js-sdk'

// import fetch from 'whatwg-fetch'

const config = {
  appId: '', // appId
  timestamp: '', // timestamp
  nonceStr: '', // nonceStr
  signature: '' // signature
}

const isLocalhost = () =>
  window.location.href.indexOf('localhost') >= 0 ||
  window.location.href.indexOf('127.0.0.1') >= 0

export const init = () =>
  !isLocalhost() &&
  fetch('api/v2/jsapi', {
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
      return new Promise((resolve, reject) => {
        res.json().then(({data: { appId, timestamp, nonceStr, signature }}) => {
          wx.config({
            debug: false,
            appId: appId,
            timestamp: timestamp,
            nonceStr: nonceStr,
            signature: signature,
            jsApiList: [
              'onMenuShareTimeline',
              'onMenuShareAppMessage',
              'onMenuShareQQ',
              'onMenuShareWeibo',
              'onMenuShareQZone',
              'previewImage'
            ]
          })
          wx.ready(() => {
            resolve()
          })
          wx.error(function (res) {
            reject(new Error('微信配置失败！'))
          })
          config.appId = appId
          config.timestamp = timestamp
          config.nonceStr = nonceStr
          config.signature = signature
        })
      })
    })

export const getConfig = () => config

window.wx = {
  init,
  getConfig
}

export function wxShare (wechatShareConfig) {
  const jumpBearer = 'https://weixin.bingyan-tech.hustonline.net/devupick/jump.html'
  const imgUrl = 'https://weixin.bingyan-tech.hustonline.net/devupick/static/img/title-share.png'
  if (!wechatShareConfig.link) {
    wechatShareConfig.link = `${jumpBearer}?to=${encodeURIComponent(window.location.href)}`
  }
  if (!wechatShareConfig.imgUrl) {
    wechatShareConfig.imgUrl = imgUrl
  }
  console.log(wechatShareConfig)
  wx.onMenuShareTimeline(wechatShareConfig)
  wx.onMenuShareAppMessage(wechatShareConfig)
  wx.onMenuShareQQ(wechatShareConfig)
  wx.onMenuShareWeibo(wechatShareConfig)
  wx.onMenuShareQZone(wechatShareConfig)
}
