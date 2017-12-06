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

export const init = async () => {
  // return await http.get(`${root}/users/status`).then(data => data.status)
  if (isLocalhost()) {
    return
  }
  await fetch(`api/v2/users/status`)
    .then(res => {
      return new Promise((resolve, reject) => {
        res.json().then(({ data: status }) => {
          if (status === true) {
            resolve(status)
          } else {
            window.title = '需要登录！'
            window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx70014cb42f7c9422&redirect_uri=https%3A//weixin.bingyan-tech.hustonline.net/upick/api/v2/weixin/access&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect'
            reject(new Error('User is not logged in!'))
          }
        })
      })
    })

  await fetch('api/v2/jsapi', {
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
}

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
