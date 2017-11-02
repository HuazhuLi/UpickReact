/**
 * Created by faraway on 17-8-9.
 */
import * as type from '../actions/consts'
import { normalize, schema as Schema } from 'normalizr'

const shopSchema = new Schema.Entity('shops')
const keywordSchema = new Schema.Entity('keyword')

const searchResultSchema = new Schema.Entity('searchResult', {
  keyword: keywordSchema,
  shopList: [ shopSchema ]
})

const shopsBySubtypeSchema = new Schema.Entity('shopsBySubtype', {
  shopList: [ shopSchema ]
})

const shopsByTypesSchema = [new Schema.Entity('shopsByType', {
  shopsBySubtypes: [ shopsBySubtypeSchema ]
})]

const TYPE = type

export function index (state = {
  value: {
    slogan: '...',
    shopTypes: ['...', '...', '...', '...', '...'],
    popularShops: new Array(6).fill({ shopName: '...' })
  },
  isFetching: false,
  error: {}
}, action) {
  return Object.assign({}, state, (function () {
    /**
     * 立即执行函数
     */
    switch (action.type) {
      case TYPE.INDEX_DATA.REQUEST:
        return {
          isFetching: true
        }
      case TYPE.INDEX_DATA.SUCCESS:
        if (action.error) {
          return {
            isFetching: false,
            error: action.error
          }
        }
        return {
          value: action.payload,
          isFetching: false
        }
      case TYPE.INDEX_DATA.FAILURE:
        return {
          isFetching: false
        }
      default:
        return {}
    }
  })())
}

export function shops (state = {
  isSearching: false,
  isLoadingShopsByType: false,
  shopsByType: {
    // '美食': {
    //   shopBySubtype: []
    // }
  },
  shopsBySubtype: {

  },
  currentShopType: '',
  keyword: '',
  search: {
    '': {
      id: '',
      keyword: '',
      shopList: []
    }
    // 'hehe': []
  },
  shops: {}
}, action) {
  return Object.assign({}, state, (function () {
    switch (action.type) {
      // 下面是搜索相关
      case TYPE.SEARCH.REQUEST:
        return {
          keyword: '',
          isSearching: true
        }
      case TYPE.SEARCH.SUCCESS:
        const normalizedSearchData = normalize(action.payload, searchResultSchema).entities
        return {
          keyword: action.payload.keyword,
          isSearching: false,
          search: {
            ...state.search,
            ...normalizedSearchData.searchResult
          },
          shops: {
            ...state.shops,
            ...normalizedSearchData.shops
          }
        }
      case TYPE.SEARCH.FAILURE:
        return {
          keyword: '',
          isSearching: false
        }
      // 下面是店铺by type 相关
      case TYPE.SHOPS_BY_TYPES.REQUEST:
        return {
          isLoadingShopsByType: true
        }
      case TYPE.SHOPS_BY_TYPES.CHANGE_TYPE:
        return {
          currentShopType: action.shopType
        }
      case TYPE.SHOPS_BY_TYPES.SUCCESS:
        const normalizedTypesData = normalize([
          {
            id: action.payload.shopType,
            shopsBySubtypes: action.payload.subtypes
              .map(subtype => ({
                id: subtype,
                shopList: action.payload.shopList.filter(shop => shop.subtype === subtype)
              }))
          }
        ], shopsByTypesSchema).entities
        return {
          shops: {
            ...state.shops,
            ...normalizedTypesData.shops
          },
          shopsByType: {
            ...state.shopsByType,
            ...normalizedTypesData.shopsByType
          },
          shopsBySubtype: {
            ...state.shopsBySubtype,
            ...normalizedTypesData.shopsBySubtype
          },
          isLoadingShopsByType: false
        }
      case TYPE.SHOPS_BY_TYPES.FAILURE:
        return {
          isLoadingShopsByType: false
        }
      default:
        return {}
    }
  })())
}

export function searchHot (state = {
  isFetching: false,
  value: []
}, action) {
  return Object.assign({}, state, (function () {
    switch (action.type) {
      case TYPE.SEARCH_HOT.REQUEST:
        return {
          isFetching: true
        }
      case TYPE.SEARCH_HOT.SUCCESS:
        return {
          isFetching: false,
          value: action.payload.hotRecords.map(search => search.searchWord)
        }
      case type.SEARCH_HOT.FAILURE:
        return {
          isFetching: false
        }
      default:
        return {}
    }
  })())
}

export function searchHistory (state = {
  isFetching: false,
  value: []
}, action) {
  return Object.assign({}, state, (function () {
    switch (action.type) {
      case TYPE.SEARCH_HISTORY.REQUEST:
        return {
          isFetching: true
        }
      case TYPE.SEARCH_HISTORY.SUCCESS:
        return {
          isFetching: false,
          value: action.payload.searchHistory
        }
      case type.SEARCH_HOT.FAILURE:
        return {
          isFetching: false
        }
      default:
        return {}
    }
  })())
}

export function globalAlarm (state = {
  alarmValue: 'Error!',
  alarmColor: '#FF305D'
}, action) {
  return Object.assign({}, state, (function () {
    if (action.type === type.SHOW_GLOBAL_ALARM) {
      return {
        ...action.payload
      }
    }
    if (action.error) {
      let alarmValue
      if (action.payload.name === 'InternalError') {
        alarmValue = '操作失败: 未知错误！'
      } else {
        alarmValue = '操作失败: 网络错误！'
      }
      return {
        alarmValue
      }
    }
  })())
}

// export function shopsByTypes (state = {
//   shopsByTypes: {},
//   // {
//   //   shopType: '',
//   //   shopsBySubtypes: [
//   //     {
//   //       subtype: '',
//   //       shopList: []
//   //     }
//   //   ]
//   // }
//   isLoadingShopsByType: false,
//   currentShopType: ''
// }, action) {
//   return Object.assign({}, state, (function () {
//     switch (action.type) {
//       // case type.REQUEST_SHOPS_BY_TYPES:
//       //   return {
//       //     isLoadingShopsByType: true
//       //   }
//       // case type.RECEIVE_SHOPS_BY_TYPES:
//       //   if (needLoadType) {
//       //     return {
//       //       isLoadingShopsByType: false
//       //     }
//       //   }
//       case type.REQUEST_SHOPS_BY_TYPES:
//         return {
//           isLoadingShopsByType: true
//         }
//       case type.RECEIVE_SHOPS_BY_TYPES:
//         return {
//           isLoadingShopsByType: false,
//           shopsByTypes: Object.assign({}, state.shopsByTypes, {
//             [action.shopType]: action.shopsBySubtypes
//           })
//         }
//       case type.SET_CURRENT_SHOP_TYPE:
//         return {
//           currentShopType: action.shopType
//         }
//       default:
//         return {}
//     }
//   })())
// }

export function shopDetail (state = {
  isFetching: false,
  value: {
    commentNumber: 0,
    hitNumber: 0,
    id: '',
    imgs: [],
    isAuth: false,
    isExisted: true,
    openTime: '...',
    shopAddress: '...',
    shopName: '...',
    shopScore: 7.8,
    shopTags: [],
    shopType: '...',
    status: true,
    subtype: '...'
  }
}, action) {
  return Object.assign({}, state, (function () {
    switch (action.type) {
      case TYPE.SHOP_DETAIL.REQUEST:
        return {
          isFetching: true
        }
      case TYPE.SHOP_DETAIL.SUCCESS:
        return {
          isFetching: false,
          value: action.payload
        }
      case TYPE.SHOP_DETAIL.FAILURE:
        return {
          isFetching: false
        }
      default:
        return {}
    }
  })())
}

export function shopComments (state = {
  isFetching: false,
  value: []
}, action) {
  return Object.assign({}, state, (function () {
    switch (action.type) {
      case TYPE.SHOP_COMMENTS.REQUEST:
        return {
          isFetching: true
        }
      case TYPE.SHOP_COMMENTS.SUCCESS:
        return {
          isFetching: false,
          value: action.payload.commentList
        }
      case TYPE.SHOP_COMMENTS.FAILURE:
        return {
          isFetching: false
        }
      default:
        return {}
    }
  })())
}
