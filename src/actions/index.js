/**
 * Created by faraway on 17-8-9.
 */
import * as type from './consts'
import axios from 'axios'
import objectToCamel from '../plugins/camel'

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
          payload: (action, state, res) => {
            if (res.status !== 200) {
              // dispatch(throwGlobalAlarm(5000, undefined, 'API Error!'))
              throw new Error('API Error!')
            }
            return res
              .json()
              .then(camelizeKeys)
              .then(({ data }) => data)
          }
        },
        TYPE.INDEX_DATA.FAILURE
      ]
    }
  }
)

/**
 * 搜索结果相关
 */
export const fetchSearchResult = (keyword) => ({
  [CALL_API]: {
    endpoint: `${r}/shops/list`,
    method: POST,
    credentials: 'include',
    body: JSON.stringify({
      'key_word': keyword,
      'request_type': 3
    }),
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
 * 搜索信息相关
 */
export const fetchSearchInfo = () => async (dispatch, getState) => {
  dispatch(requestSearchInfo())
  const state = getState()
  /**
   * 10 minutes
   */
  if (Date.now() - state.searchInfo.updatedTime >= 60 * 1000 * 10) {
    try {
      const searchInfoHot = await axios.get(`${r}/shops/hot_records`)
        .then(res => res.status === 200 && res.data)
        .then(data => data.status === 200 && data.data)
        .then(objectToCamel)
        .then(data => data.hotRecords)
        .then(searchHistory => searchHistory.map(s => s.searchWord))
        .catch((e) => {
          throw e
        })
      const searchInfoHistory = await axios.get(`${r}/shops/search_history`)
        .then(res => res.status === 200 && res.data)
        .then(data => data.status === 200 && data.data)
        .then(objectToCamel)
        .then(data => data.searchHistory)
        .then(wait(300))
        .catch((e) => {
          throw e
        })
      dispatch(receiveSearchInfo({ searchInfoHot, searchInfoHistory }))
    } catch (e) {
      // dispatch(failedReceiveSearchInfo(e))
      dispatch(throwGlobalAlarm(2500, undefined, '获取信息失败！'))
    }
  } else {
    dispatch(receiveSearchInfo(state.searchInfo.searchInfo))
  }
}

export const requestSearchInfo = () => ({
  type: type.REQUEST_SEARCH_INFO
})

export const receiveSearchInfo = (searchInfo) => ({
  type: type.RECEIVE_SEARCH_INFO,
  searchInfo,
  receivedAt: Date.now()
})

export const failedReceiveSearchInfo = (error) => ({
  type: type.FAILED_SEARCH_INFO,
  error
})

/**
 * 抛出一个全局警示
 * @param alarmColor
 * @param alarmValue
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
    endpoint: `${r}/shops/list`,
    method: POST,
    // 带上/接受 cookie
    credentials: 'include',
    body: JSON.stringify({
      'shop_type': type,
      'request_type': 1
    }),
    headers: {
      'content-type': 'application/json'
    },
    types: []
  }
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
//       .then(objectToCamel)
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
 */
export const fetchShopDetail = (shopName) => async (dispatch, getState) => {
  dispatch(requestShopDetail(shopName))
  const { shopDetail } = getState()
  if (shopName in shopDetail.shops) {
    dispatch(receiveShopDetail(shopName, shopDetail.shops[shopName]))
  } else {
    try {
      const shop = await axios.get(`${r}/shops`, {
        params: {
          'shop_name': shopName
        }
      })
        .then(res => res.status === 200 && res.data)
        .then(data => data.status === 200 && data.data)
        .then(objectToCamel)
        .catch((e) => {
          throw e
        })
      const { commentList } = await axios.post(`${r}/shops/comments`, {
        'request_type': 2,
        'shop_name': shopName
      })
        .then(res => res.status === 200 && res.data)
        .then(data => data.status === 200 && data.data)
        .then(objectToCamel)
        .catch((e) => {
          throw e
        })
      shop.comments = commentList
      dispatch(receiveShopDetail(shopName, shop))
    } catch (e) {
      dispatch(throwGlobalAlarm(2500, undefined, '获取店铺信息失败！'))
    }
  }
}

export const requestShopDetail = (shopName) => ({
  type: type.REQUEST_SHOP_COMMENT,
  shopName
})

export const receiveShopDetail = (shopName, shop) => ({
  type: type.RECEIVE_SHOP_COMMENT,
  shopName,
  shop
})

export const setCurrentShop = (shopName) => ({
  type: type.SET_CURRENT_SHOP,
  shopName
})
