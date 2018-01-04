/**
 * Created by faraway on 17-8-9.
 */
import * as TYPE from '../actions/consts'
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
  currentShopSubType: '',
  currentShopListScrollTop: 0,
  keyword: '',
  keywordToShow: '',
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
      case TYPE.SEARCH.CHANGE_KEYWORD:
        return {
          keywordToShow: action.payload.keyword
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

      case TYPE.SHOPS_BY_TYPES.CHANGE_SUBTYPE:
        return {
          currentShopSubType: action.shopSubType
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
      case TYPE.SEARCH_HOT.FAILURE:
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
      case TYPE.SEARCH_HISTORY.FAILURE:
        return {
          isFetching: false
        }
      default:
        return {}
    }
  })())
}

export function searchHint (state = {
  isFetching: false,
  value: []
}, action) {
  return Object.assign({}, state, (function () {
    switch (action.type) {
      case TYPE.SEARCH_HINT.REQUEST:
        return {
          isFetching: true
        }
      case TYPE.SEARCH_HINT.SUCCESS:
        return {
          isFetching: false,
          value: action.payload.shopList
        }
      case TYPE.SEARCH_HINT.FAILURE:
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
  alarmColor: '#FF305D',
  alarmTime: 3000,
  time: Date.now()
}, action) {
  return Object.assign({}, state, (function () {
    if (action.type === TYPE.GLOBAL_ALARM.SHOW) {
      return {
        ...action.payload,
        time: Date.now()
      }
    }
    if (action.type === TYPE.RECEIVE_TICKETS.RECEIVE.FAILURE) {
      if (action.error && action.payload.response.status === 403) {
        return {
          alarmValue: '您今日已领取2张优惠券了哦!',
          alarmColor: '#FEA91C',
          alarmTime: 3000,
          time: Date.now()
        }
      }
    }
    if (action.error) {
      let alarmValue
      if (action.payload.name === 'InternalError') {
        alarmValue = `${action.type.split(' @ ')[0]}失败: 未知错误！`
      } else {
        if (action.payload.response && action.payload.response.error) {
          alarmValue = action.payload.response.error
        } else {
          alarmValue = `${action.type.split(' @ ')[0]}失败: 网络错误！`
        }
      }
      return {
        alarmValue,
        alarmColor: '#FF305D',
        alarmTime: 3000,
        time: Date.now()
      }
    }
  })())
}

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
  /**
   * 这个time是为了改变数据，引起重新渲染，导
   * 致组件的componentWillReceiveProps得
   * 已被执行。
   */
  time: Date.now(),
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
        if (action.error) {
          return {
            time: Date.now()
          }
        } else {
          return {}
        }
    }
  })())
}

// export function uiState (state = {
//   keyword: ''
// }, action) {
//   return Object.assign({}, state, (function () {
//     switch (action.type) {

//     }
//   })())
// }

export function commentTags (state = {
  isFetching: false,
  value: []
}, action) {
  return Object.assign({}, state, (function () {
    switch (action.type) {
      case TYPE.COMMENT_TAGS.REQUEST:
        return {
          isFetching: true
        }
      case TYPE.COMMENT_TAGS.SUCCESS:
        return {
          isFetching: false,
          value: action.payload.shopTags
        }
      case TYPE.COMMENT_TAGS.FAILURE:
        return {
          isFetching: false
        }
      default:
        return {}
    }
  })())
}

export function uploadedImages (state = {
  fetchingCount: 0,
  value: {},
  error: null
}, action) {
  return Object.assign({}, state, (function () {
    switch (action.type) {
      case TYPE.UPLOAD_IMAGE.REQUEST:
        return {
          fetchingCount: state.fetchingCount + 1,
          error: null
        }
      case TYPE.UPLOAD_IMAGE.SUCCESS:
        return {
          fetchingCount: state.fetchingCount - 1,
          value: {
            ...state.value,
            [action.payload.id]: {
              src: action.payload.url,
              msrc: action.payload.simgUrl,
              width: action.payload.width,
              height: action.payload.height
            }
          },
          error: null
        }
      case TYPE.UPLOAD_IMAGE.FAILURE:
        return {
          fetchingCount: state.fetchingCount - 1,
          error: action.error
        }
    }
  })())
}

export function comment (state = {
  isCommenting: false,
  error: null
}, action) {
  return Object.assign({}, state, (function () {
    switch (action.type) {
      case TYPE.COMMENT.REQUEST:
        return {
          isCommenting: true,
          error: null
        }
      case TYPE.COMMENT.SUCCESS:
        return {
          isCommenting: false,
          error: null
        }
      case TYPE.COMMENT.FAILURE:
        return {
          isCommenting: false,
          error: action.error
        }
    }
  })())
}

// 所有的subtypes
export function subtypes (state = {
  value: [],
  originValue: [],
  isFetching: false,
  error: null
}, action) {
  return Object.assign({}, state, (function () {
    switch (action.type) {
      case TYPE.ALL_TYPES.REQUEST:
        return {
          isFetching: true,
          error: null
        }
      case TYPE.ALL_TYPES.SUCCESS:
        return {
          isFetching: false,
          error: null,
          // 得到的其实是 [{type_name: "饮品", subtypes: ["咖啡馆", "奶茶饮品"]}]
          originValue: action.payload,
          value: action.payload.reduce((allSubtypes, type) => [...allSubtypes, ...type.subtypes], [])
        }
      case TYPE.ALL_TYPES.FAILURE:
        return {
          isFetching: false,
          error: action.error
        }
    }
  })())
}

export function addShop (state = {
  isAdding: false,
  error: null
}, action) {
  return Object.assign({}, state, (function () {
    switch (action.type) {
      case TYPE.ADD_SHOP.REQUEST:
        return {
          isAdding: true,
          error: null
        }
      case TYPE.ADD_SHOP.SUCCESS:
        return {
          isAdding: false,
          error: null
        }
      case TYPE.ADD_SHOP.FAILURE:
        return {
          isAdding: false,
          error: action.error
        }
    }
  })())
}

export function userInfo (state = {
  isFetching: false,

  headimgurl: '', // 用户头像
  nickname: '', // 昵称
  comments: [],

  error: null
}, action) {
  return Object.assign({}, state, (function () {
    switch (action.type) {
      case TYPE.ALL_USER_INFO.REQUEST:
        return {
          isFetching: true,
          error: null
        }
      case TYPE.ALL_USER_INFO.SUCCESS:
        return {
          isFetching: false,

          headimgurl: action.payload.userInfo.headimgurl,
          nickname: action.payload.userInfo.nickname,
          comments: action.payload.comments,

          error: null
        }
      case TYPE.ALL_USER_INFO.FAILURE:
        return {
          isFetching: false,
          value: {},
          error: action.error
        }
    }
  })())
}

export function userTickets (state = {
  isFetching: false,

  value: [],

  error: null
}, action) {
  return Object.assign({}, state, (function () {
    switch (action.type) {
      case TYPE.ALL_USER_TICKETS.REQUEST:
        return {
          isFetching: true,
          error: null
        }
      case TYPE.ALL_USER_TICKETS.SUCCESS:
        return {
          isFetching: false,

          value: action.payload,

          error: null
        }
      case TYPE.ALL_USER_TICKETS.FAILURE:
        return {
          isFetching: false,
          value: [],
          error: action.error
        }
    }
  })())
}

export function ticketBox (state = {
  open: false
}, action) {
  return Object.assign({}, state, (function () {
    switch (action.type) {
      case TYPE.RECEIVE_TICKETS.SHOW_BOX:
        return {
          open: true
        }
      case TYPE.RECEIVE_TICKETS.HIDE_BOX:
        return {
          open: false
        }
      default:
        return {}
    }
  })())
}

export function ticketsByShop (state = {
  isFetching: false,
  value: [],
  error: null
}, action) {
  return Object.assign({}, state, (function () {
    switch (action.type) {
      case TYPE.RECEIVE_TICKETS.BY_SHOP.REQUEST:
        return {
          isFetching: true,
          error: null
        }
      case TYPE.RECEIVE_TICKETS.BY_SHOP.SUCCESS:
        return {
          isFetching: false,

          value: action.payload.tickets.map((ticket) => ({
            ...ticket,
            isReceiving: false
          })),

          error: null
        }
      case TYPE.RECEIVE_TICKETS.BY_SHOP.FAILURE:
        return {
          isFetching: false,
          value: [],
          error: action.error
        }
      case TYPE.RECEIVE_TICKETS.RECEIVE.REQUEST: {
        // make a copy
        const value = state.value.map((ticket) => Object.assign({}, ticket))
        for (const v of value) {
          console.log(v, action)
          if (v.id === action.payload.id) {
            v.isReceiving = true
            break
          }
        }
        return {
          value
        }
      }
      case TYPE.RECEIVE_TICKETS.RECEIVE.SUCCESS: {
        // make a copy
        const value = state.value.map((ticket) => Object.assign({}, ticket))
        for (const v of value) {
          if (v.id === action.payload.id) {
            v.isReceived = true
            break
          }
        }
        return {
          value
        }
      }
      case TYPE.RECEIVE_TICKETS.RECEIVE.FAILURE: {
        // make a copy
        const value = state.value.map((ticket) => Object.assign({}, ticket))
        for (const v of value) {
          if (v.id === action.payload.id) {
            v.isReceiving = false
            break
          }
        }
        return {
          value
        }
      }
    }
  })())
}

export function ticketDetail (state = {
  isFetching: false,
  value: {
    discount: '...',
    shopName: '...',
    startTime: Date.now(),
    endTime: Date.now()
  },
  error: null
}, action) {
  return Object.assign({}, state, (function () {
    switch (action.type) {
      case TYPE.RECEIVE_TICKETS.BY_CODE.REQUEST:
        return {
          isFetching: true
        }
      case TYPE.RECEIVE_TICKETS.BY_CODE.SUCCESS:
        return {
          isFetching: false,
          value: action.payload
        }
      case TYPE.RECEIVE_TICKETS.BY_CODE.FAILURE:
        return {
          isFetching: false,
          error: action.error
        }
    }
  })())
}

export function destroyTicket (state = {
  isFetching: false,
  error: null
}, action) {
  return Object.assign({}, state, (function () {
    switch (action.type) {
      case TYPE.RECEIVE_TICKETS.DESTROY.REQUEST:
        return {
          isFetching: true
        }
      case TYPE.RECEIVE_TICKETS.DESTROY.SUCCESS:
        return {
          isFetching: false,
          error: null
        }
      case TYPE.RECEIVE_TICKETS.DESTROY.FAILURE:
        return {
          isFetching: false,
          error: action.error
        }
    }
  })())
}
