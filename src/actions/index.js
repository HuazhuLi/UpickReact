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
    .then(({ data }) => { console.log(data); return data })
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
    headers: {
      'content-type': 'application/json'
    },
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
    headers: {
      'content-type': 'application/json'
    },
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

// /**
//  * @returns {thunk}
//  * @param type {string}
//  */
// export const fetchShopsByType = (type) => async (dispatch, getState) => {
//   dispatch(requestShopsByTypes(type))
//   // http://debug.upick.hustonline.net/api/v2/shops/list
//   const { shopsByTypes } = getState()
//   if (type in shopsByTypes.shopsByTypes) {
//     dispatch(receiveShopsByTypes(type, shopsByTypes.shopsByTypes[type]))
//     return
//   }
//   try {
//     /**
//      * @type shopList {Array.<object>}
//      * @type subtypes {Array.<string>}
//      */
//     const { shopList, subtypes } = await axios.post(
//       `${r}/shops/list`,
//       {
//         'shop_type': type,
//         'request_type': 1
//       },
//       {
//         headers: {
//           'content-type': 'application/json'
//         }
//       }
//     )
//       .then(res => res.status === 200 && res.data)
//       .then(data => data.status === 200 && data.data)
//       .then(camelizeKeys)
//       /**
//        * 如果返回对象不包括下面两个属性，就会抛出错误
//        */
//       .then(({ shopList, subtypes }) => ({ shopList, subtypes }))
//       .then(wait(300))
//       .catch((e) => {
//         throw e
//       })
//     const shopsBySubtypes = subtypes.reduce((ret, subtype) => (
//       {
//         ...ret,
//         [subtype]: shopList.filter((shop) => shop.subtype === subtype)
//       }
//     ), {})
//     dispatch(receiveShopsByTypes(type, shopsBySubtypes))
//   } catch (e) {
//     console.log(e)
//     dispatch(throwGlobalAlarm(2500, undefined, '获取店铺列表失败！'))
//   }
// }
//
// export const requestShopsByTypes = (shopType) => ({
//   type: type.REQUEST_SHOPS_BY_TYPES,
//   shopType
// })
//
// export const receiveShopsByTypes = (shopType, shopsBySubtypes) => ({
//   type: type.RECEIVE_SHOPS_BY_TYPES,
//   shopsBySubtypes,
//   shopType
// })
//
// export const setCurrentShopType = (shopType) => ({
//   type: type.SET_CURRENT_SHOP_TYPE,
//   shopType
// })

/**
 * 店铺详情不从店铺列表中直接获取的原因：
 * 1.防止以后店铺列表缩小内容范围，导致数据不足
 * 2.懒
//  */
// export const fetchShopDetail = (shopName) => async (dispatch, getState) => {
//   dispatch(requestShopDetail(shopName))
//   const { shopDetail } = getState()
//   if (shopName in shopDetail.shops) {
//     dispatch(receiveShopDetail(shopName, shopDetail.shops[shopName]))
//   } else {
//     try {
//       const shop = await axios.get(`${r}/shops`, {
//         params: {
//           'shop_name': shopName
//         }
//       })
//         .then(res => res.status === 200 && res.data)
//         .then(data => data.status === 200 && data.data)
//         .then(camelizeKeys)
//         .catch((e) => {
//           throw e
//         })
//       const { commentList } = await axios.post(`${r}/shops/comments`, {
//         'request_type': 2,
//         'shop_name': shopName
//       })
//         .then(res => res.status === 200 && res.data)
//         .then(data => data.status === 200 && data.data)
//         .then(camelizeKeys)
//         .catch((e) => {
//           throw e
//         })
//       shop.comments = commentList
//       dispatch(receiveShopDetail(shopName, shop))
//     } catch (e) {
//       dispatch(throwGlobalAlarm(2500, undefined, '获取店铺信息失败！'))
//     }
//   }
// }

// export const requestShopDetail = (shopName) => ({
//   type: TYPE.REQUEST_SHOP_COMMENT,
//   shopName
// })

// export const receiveShopDetail = (shopName, shop) => ({
//   type: TYPE.RECEIVE_SHOP_COMMENT,
//   shopName,
//   shop
// })

// export const setCurrentShop = (shopName) => ({
//   type: TYPE.SET_CURRENT_SHOP,
//   shopName
// })

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
