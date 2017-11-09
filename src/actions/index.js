/**
 * Created by faraway on 17-8-9.
 */
import * as type from './consts'
import axios from 'axios'

import { camelizeKeys } from 'humps'
import { CALL_API } from 'redux-api-middleware'

const r = '/api/v2'
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
export const throwGlobalAlarm = (alarmColor, alarmValue) => ({
  type: TYPE.SHOW_GLOBAL_ALARM,
  payload: {
    alarmValue,
    alarmColor
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
