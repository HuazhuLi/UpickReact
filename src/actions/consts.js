/**
 * Created by faraway on 17-8-9.
 */
/**
 * 这个文件编写常用的action types
 */

/**
 * 关于主页index数据接口的常量
 */
export const INDEX_DATA = {
  REQUEST: 'INDEX_DATA @ REQUEST',
  SUCCESS: 'INDEX_DATA @ SUCCESS',
  FAILURE: 'INDEX_DATA @ FAILURE'
}

export const SEARCH = {
  REQUEST: 'SEARCH @ REQUEST',
  SUCCESS: 'SEARCH @ SUCCESS',
  FAILURE: 'SEARCH @ FAILURE'
}

export const REQUEST_INDEX_DATA = 'REQUEST_INDEX_DATA'
export const RECEIVE_INDEX_DATA = 'RECEIVE_INDEX_DATA'
export const FAILED_INDEX_DATA = 'FAILED_INDEX_DATA'

/**
 * 关于搜索的常量
 */
export const REQUEST_SEARCH = 'REQUEST_SEARCH'
export const RECEIVE_SEARCH = 'RECEIVE_SEARCH'
export const FAILED_SEARCH = 'FAILED_SEARCH'

/**
 * 关于搜索信息（热门搜索，搜索历史）
 */
export const REQUEST_SEARCH_INFO = 'REQUEST_SEARCH_INFO'
export const RECEIVE_SEARCH_INFO = 'RECEIVE_SEARCH_INFO'
export const FAILED_SEARCH_INFO = 'FAILED_SEARCH_INFO'

/**
 * 关于全局错误提示
 */
export const SHOW_GLOBAL_ALARM = 'SHOW_GLOBAL_ALARM'
export const HIDE_GLOBAL_ALARM = 'HIDE_GLOBAL_ALARM'
export const UPDATE_GLOBAL_ALARM_TIMER = 'UPDATE_GLOBAL_ALARM_TIMER'

/**
 * NOTE:
 * 由于失败action被全局警示代替，这里不再使用
 */

/**
 * 关于获取店铺的actions
 */
export const REQUEST_SHOPS_BY_TYPES = 'REQUEST_SHOPS_BY_TYPES'
export const RECEIVE_SHOPS_BY_TYPES = 'RECEIVE_SHOPS_BY_TYPES'
export const SET_CURRENT_SHOP_TYPE = 'SET_CURRENT_SHOP_TYPE'

/**
 * 关于店铺详情的actions
 */
export const REQUEST_SHOP_COMMENT = 'REQUEST_SHOP_COMMENT'
export const RECEIVE_SHOP_COMMENT = 'RECEIVE_SHOP_COMMENT'
export const SET_CURRENT_SHOP = 'SET_CURRENT_SHOP'
