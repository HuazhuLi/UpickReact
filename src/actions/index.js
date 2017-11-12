/**
 * Created by faraway on 17-8-9.
 */
import * as type from './consts'

import { camelizeKeys } from 'humps'
import { CALL_API } from 'redux-api-middleware'

const r = 'api/v2'
const GET = 'GET'
const POST = 'POST'
const TYPE = type

function wait (timeToWait) {
  return function (data) {
    return new Promise((resolve) => setTimeout(() => resolve(data), timeToWait))
  }
}

/**
 * 大都相同
 * @param {object} action
 * @param {object} state
 * @param {object} res
 */
function payload (action, state, res) {
  if (res.status !== 200) {
    // dispatch(throwGlobalAlarm(5000, undefined, 'API Error!'))
    throw new Error('API Error!')
  }
  return res
    .json()
    .then(camelizeKeys)
    // eslint-disable no-sequences
    .then(({ data }) => data)
}
/**
  * 获取主页内容
  */
export const fetchIndex = () => (
  {
    [CALL_API]: {
      endpoint: `${r}/index`,
      credentials: 'include',
      method: GET,
      types: [
        TYPE.INDEX_DATA.REQUEST,
        {
          type: TYPE.INDEX_DATA.SUCCESS,
          payload
        },
        TYPE.INDEX_DATA.FAILURE
      ]
    }
  }
)

/**
 * 获取热门搜索
 */
export const fetchSearchHot = () => (
  {
    [CALL_API]: {
      endpoint: `${r}/shops/hot_records`,
      credentials: 'include',
      method: GET,
      types: [
        TYPE.SEARCH_HOT.REQUEST,
        {
          type: TYPE.SEARCH_HOT.SUCCESS,
          payload
        },
        TYPE.SEARCH_HOT.FAILURE
      ]
    }
  }
)

/**
 * 获取搜索历史
 */
export const fetchSearchHistory = () => (
  {
    [CALL_API]: {
      endpoint: `${r}/shops/search_history`,
      credentials: 'include',
      method: GET,
      types: [
        TYPE.SEARCH_HISTORY.REQUEST,
        {
          type: TYPE.SEARCH_HISTORY.SUCCESS,
          payload
        },
        TYPE.SEARCH_HISTORY.FAILURE
      ]
    }
  }
)

/**
 * 搜索结果相关
 */
export const fetchSearchResult = keyword => ({
  [CALL_API]: {
    endpoint: `${r}/shops/list?key_word=${keyword}&request_type=3`,
    method: GET,
    credentials: 'include',
    types: [
      TYPE.SEARCH.REQUEST,
      {
        type: TYPE.SEARCH.SUCCESS,
        payload: (action, state, res) => {
          if (res.status !== 200) {
            // dispatch(throwGlobalAlarm(5000, undefined, 'API Error!'))
            throw new Error('API Error!')
          }
          return res
            .json()
            .then(camelizeKeys)
            .then(({data}) => ({
              id: keyword,
              keyword,
              ...data
            }))
        }
      },
      TYPE.SEARCH.FAILURE
    ]
  }
})

/**
 * 抛出一个全局警示
 * @param {string} alarmColor
 * @param {string} alarmValue
 */
export const throwGlobalAlarm = (alarmValue, alarmColor = '#FF305D', alarmTime = 3000) => ({
  type: TYPE.GLOBAL_ALARM.SHOW,
  payload: {
    alarmValue,
    alarmColor,
    alarmTime
  }
})

export const fetchShopsByType = (type) => ({
  [CALL_API]: {
    endpoint: `${r}/shops/list?shop_type=${type}&request_type=1`,
    method: GET,
    // 带上/接受 cookie
    credentials: 'include',
    types: [
      TYPE.SHOPS_BY_TYPES.REQUEST,
      {
        type: TYPE.SHOPS_BY_TYPES.SUCCESS,
        payload: (action, state, res) => {
          if (res.status !== 200) throw new Error('API Error!')
          return res
            .json()
            .then(camelizeKeys)
            .then(({data}) => ({
              shopType: type,
              id: type,
              ...data
            }))
        }
      },
      TYPE.SHOPS_BY_TYPES.FAILURE
    ]
  }
})

export const setCurrentShopType = (shopType) => ({
  type: TYPE.SHOPS_BY_TYPES.CHANGE_TYPE,
  shopType
})

export const setCurrentShopSubType = (shopSubType) => ({
  type: TYPE.SHOPS_BY_TYPES.CHANGE_SUBTYPE,
  shopSubType
})

export const fetchShopDetail = shopName => ({
  [CALL_API]: {
    endpoint: `${r}/shops?shop_name=${shopName}`,
    method: GET,
    // 带上/接受 cookie
    credentials: 'include',
    types: [
      TYPE.SHOP_DETAIL.REQUEST,
      {
        type: TYPE.SHOP_DETAIL.SUCCESS,
        payload
      },
      TYPE.SHOP_DETAIL.FAILURE
    ]
  }
})

export const fetchShopComments = shopName => ({
  [CALL_API]: {
    endpoint: `${r}/comments?shop_name=${shopName}`,
    method: GET,
    // 带上/接受 cookie
    credentials: 'include',
    types: [
      TYPE.SHOP_COMMENTS.REQUEST,
      {
        type: TYPE.SHOP_COMMENTS.SUCCESS,
        payload
      },
      TYPE.SHOP_COMMENTS.FAILURE
    ]
  }
})

export const commentComment = (authorOpenid, issueTime, operation = 0) => ({
  [CALL_API]: {
    endpoint: `${r}/comments`,
    method: POST,
    // 带上/接受 cookie
    credentials: 'include',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      'request_type': 2, // 请求类型，0代表删除评论，1代表添加评论，2代表点赞或者踩评论
      'author_openid': authorOpenid, // 评论者微信号openid
      'issue_time': issueTime, // 评论发布时间
      'like_status': operation === 0 ? false : operation === 1, // 是否点赞
      'dislike_status': operation === 0 ? false : operation === -1 // 是否踩
    }),
    types: [
      TYPE.COMMENT_COMMENT.REQUEST,
      {
        type: TYPE.COMMENT_COMMENT.SUCCESS,
        payload
      },
      TYPE.COMMENT_COMMENT.FAILURE
    ]
  }
})

export const fetchSearchHint = prefix => ({
  [CALL_API]: {
    endpoint: `${r}/shops/list?request_type=4&prefix=${prefix}`,
    method: GET,
    credentials: 'include',
    types: [
      TYPE.SEARCH_HINT.REQUEST,
      {
        type: TYPE.SEARCH_HINT.SUCCESS,
        payload
      },
      TYPE.SEARCH_HINT.FAILURE
    ]
  }
})

export const changeSearchText = keyword => ({
  type: TYPE.SEARCH.CHANGE_KEYWORD,
  payload: {
    keyword
  }
})

export const fetchTags = shopName => ({
  [CALL_API]: {
    endpoint: `${r}/shops/tags?shop_name=${shopName}`,
    method: GET,
    credentials: 'include',
    types: [
      TYPE.COMMENT_TAGS.REQUEST,
      {
        type: TYPE.COMMENT_TAGS.SUCCESS,
        payload
      },
      TYPE.COMMENT_TAGS.FAILURE
    ]
  }
})
// {
//   "request_type": Number, // 请求类型，0代表删除评论，1代表添加评论，2代表点赞或者踩评论
//   "shop_name": String, // 店铺名称
//   "shop_score": Number, // 用户打分
//   "comment_text": String, // 评论文字
//   "shop_tags" : Array [String], // 店铺标签名称
//   "imgs": [
//       {
//           "src": String, // 评论图片名称(相对路径)
//           "msrc": String, // 评论图片缩略图名称(相对路径)
//           "width": Number// 原图宽度
//           "height": Number, // 原图高度
//       }
//   ]
// }
export const comment = (shopName, shopScore, commentText, shopTags, images) => ({
  [CALL_API]: {
    endpoint: `${r}/comments`,
    method: POST,
    credentials: 'include',
    body: JSON.stringify({
      request_type: 1,
      shop_name: shopName,
      shop_score: shopScore,
      comment_text: commentText,
      shop_tags: shopTags,
      imgs: images
    }),
    headers: {
      'content-type': 'application/json'
    },
    types: [
      TYPE.COMMENT.REQUEST,
      {
        type: TYPE.COMMENT.SUCCESS,
        payload
      },
      TYPE.COMMENT.FAILURE
    ]
  }
})

export const uploadImage = image => ({
  [CALL_API]: {
    endpoint: `${r}/comments/images`,
    method: POST,
    credentials: 'include',
    body: JSON.stringify({
      type: 'upload',
      image: image.imageBase64.split(',')[1]
    }),
    headers: {
      'content-type': 'application/json'
    },
    types: [
      TYPE.UPLOAD_IMAGE.REQUEST,
      {
        type: TYPE.UPLOAD_IMAGE.SUCCESS,
        payload (action, state, res) {
          if (res.status !== 200) {
            // dispatch(throwGlobalAlarm(5000, undefined, 'API Error!'))
            throw new Error('API Error!')
          }
          return res
            .json()
            .then(camelizeKeys)
            // eslint-disable no-sequences
            .then(({ data }) => ({
              ...data,
              id: image.id
            }))
        }
      },
      TYPE.UPLOAD_IMAGE.FAILURE
    ]
  }
})

export const fetchAllSubtypes = shopName => ({
  [CALL_API]: {
    endpoint: `${r}/shops/types`,
    method: GET,
    credentials: 'include',
    types: [
      TYPE.ALL_TYPES.REQUEST,
      {
        type: TYPE.ALL_TYPES.SUCCESS,
        payload
      },
      TYPE.ALL_TYPES.FAILURE
    ]
  }
})

export const addShop = (shopName, shopAddress, imgs) => ({
  [CALL_API]: {
    endpoint: `${r}/shops`,
    method: POST,
    credentials: 'include',
    body: JSON.stringify({
      request_type: 1,
      shop_name: shopName,
      shop_address: shopAddress,
      imgs
    }),
    headers: {
      'content-type': 'application/json'
    },
    types: [
      TYPE.ADD_SHOP.REQUEST,
      {
        type: TYPE.ADD_SHOP.SUCCESS,
        payload
      },
      TYPE.ADD_SHOP.FAILURE
    ]
  }
})

export const fetchUserInfo = () => ({
  [CALL_API]: {
    endpoint: `${r}/users`,
    method: GET,
    credentials: 'include',
    types: [
      TYPE.ALL_USER_INFO.REQUEST,
      {
        type: TYPE.ALL_USER_INFO.SUCCESS,
        payload
      },
      TYPE.ALL_USER_INFO.FAILURE
    ]
  }
})

export const fetchAllTickets = () => ({
  [CALL_API]: {
    endpoint: `${r}/tickets`,
    method: GET,
    credentials: 'include',
    types: [
      TYPE.ALL_USER_TICKETS.REQUEST,
      {
        type: TYPE.ALL_USER_TICKETS.SUCCESS,
        payload
      },
      TYPE.ALL_USER_TICKETS.FAILURE
    ]
  }
})
