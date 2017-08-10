/**
 * Created by faraway on 17-8-9.
 */

import * as type from '../actions/consts'

export function index (state = {
  indexData: {
    slogan: 'Loading...',
    shopTypes: ['...', '...', '...', '...', '...'],
    popularShops: []
  },
  isLoadingIndex: false,
  updatedTime: 0,
  errorInfo: {}
}, action) {
  return Object.assign({}, state, (function () {
    /**
     * 立即执行函数
     */
    switch (action.type) {
      case type.REQUEST_INDEX_DATA:
        return {
          isLoadingIndex: true
        }
      case type.RECEIVE_INDEX_DATA:
        return {
          indexData: action.indexData,
          isLoadingIndex: false,
          updatedTime: action.receivedAt
        }
      case type.FAILED_INDEX_DATA:
        return {
          isLoadingIndex: false,
          errorInfo: action.error
        }
      default:
        return {}
    }
  })())
}

export function searchResult (state = {
  keyword: '',
  searchResult: [
    // {
    //   'subtype': '食堂',
    //   'open_time': '06:30-09:00;10:50-13:00;16:30-19:30',
    //   'shop_address': '东小门以北50米左右',
    //   'shop_area': '',
    //   'shop_name': '东教工食堂',
    //   'shop_tags': ['分量足', '价格实惠', '太贵', '座位太少', '干净', '服务热情'],
    //   'shop_score': 8.5,
    //   'imgs': [
    //     {
    //       'src': 'shop_images/shop-41394f62-105d-11e7-8fe3-525400b76a89.jpg',
    //       'height': 2304,
    //       'msrc': 'shop_images/mshop-41394f62-105d-11e7-8fe3-525400b76a89.jpg',
    //       'width': 3456
    //     }
    //   ],
    //   'shop_type': '美食'
    // }
  ],
  isSearching: false,
  errorInfo: {}
}, action) {
  return Object.assign({}, state, (function () {
    switch (action.type) {
      case type.REQUEST_SEARCH:
        return {
          keyword: action.keyword,
          isSearching: true
        }
      case type.RECEIVE_SEARCH:
        return {
          keyword: action.keyword,
          isSearching: false,
          searchResult: action.searchResult
        }
      case type.FAILED_SEARCH:
        return {
          keyword: action.keyword,
          isSearching: false,
          searchResult: [],
          errorInfo: action.error
        }
      default:
        return {}
    }
  })())
}

export function searchInfo (state = {
  isFetchingSearchInfo: false,
  searchInfo: {
    searchInfoHistory: [

    ],
    searchInfoHot: [

    ]
  },
  updatedTime: 0
}, action) {
  return Object.assign({}, state, (function () {
    switch (action.type) {
      case type.REQUEST_SEARCH_INFO:
        return {
          isFetchingSearchInfo: true
        }
      case type.RECEIVE_SEARCH_INFO:
        return {
          isFetchingSearchInfo: false,
          searchInfo: action.searchInfo,
          updatedTime: action.receivedAt
        }
      case type.FAILED_SEARCH_INFO:
        return {
          isFetchingSearchInfo: false,
          errorInfo: action.error
        }
      default:
        return {}
    }
  })())
}

export function globalAlarm (state = {
  timer: -1,
  alarmValue: 'Error!',
  alarmColor: '#FF305D',
  show: false
}, action) {
  return Object.assign({}, state, (function () {
    switch (action.type) {
      case type.UPDATE_GLOBAL_ALARM_TIMER:
        return {
          timer: action.timer
        }
      case type.SHOW_GLOBAL_ALARM:
        return {
          alarmValue: action.alarmValue,
          alarmColor: action.alarmColor,
          show: true
        }
      case type.HIDE_GLOBAL_ALARM:
        return {
          show: false
        }
      default:
        return {}
    }
  })())
}
