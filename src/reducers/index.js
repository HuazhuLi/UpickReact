/**
 * Created by faraway on 17-8-9.
 */

import * as type from '../actions/consts'

export function index (state = {
  indexData: {
    slogan: 'Loading...',
    shopTypes: ['生活服务', '玩的', '健身', '喝的', '美食'],
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
