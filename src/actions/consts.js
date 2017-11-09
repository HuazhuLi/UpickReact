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
  REQUEST: '主页数据 @ REQUEST',
  SUCCESS: '主页数据 @ SUCCESS',
  FAILURE: '主页数据 @ FAILURE'
}

export const SEARCH = {
  REQUEST: '搜索 @ REQUEST',
  SUCCESS: '搜索 @ SUCCESS',
  FAILURE: '搜索 @ FAILURE',
  CHANGE_KEYWORD: '搜索 @ CGANGE_KEYWORD'
}

export const SEARCH_HOT = {
  REQUEST: '获取热门搜索 @ REQUEST',
  SUCCESS: '获取热门搜索 @ SUCCESS',
  FAILURE: '获取热门搜索 @ FAILURE'
}

export const SEARCH_HISTORY = {
  REQUEST: '获取搜索历史 @ REQUEST',
  SUCCESS: '获取搜索历史 @ SUCCESS',
  FAILURE: '获取搜索历史 @ FAILURE'
}

export const SHOPS_BY_TYPES = {
  REQUEST: '获取店铺列表 @ REQUEST',
  SUCCESS: '获取店铺列表 @ SUCCESS',
  FAILURE: '获取店铺列表 @ FAILURE',
  CHANGE_TYPE: '获取店铺列表 @ CHANGE_TYPE',
  CHANGE_SUBTYPE: '获取店铺列表 @ CHANGE_SUBTYPE'
}

export const SHOP_DETAIL = {
  REQUEST: '获取店铺详情 @ REQUEST',
  SUCCESS: '获取店铺详情 @ SUCCESS',
  FAILURE: '获取店铺详情 @ FAILURE'
}

export const SHOP_COMMENTS = {
  REQUEST: '获取评论列表 @ REQUEST',
  SUCCESS: '获取评论列表 @ SUCCESS',
  FAILURE: '获取评论列表 @ FAILURE'
}

export const COMMENT_COMMENT = {
  REQUEST: '顶/踩 @ REQUEST',
  SUCCESS: '顶/踩 @ SUCCESS',
  FAILURE: '顶/踩 @ FAILURE'
}

export const COMMENT = {

}

export const SEARCH_HINT = {
  REQUEST: '获取搜索提示 @ REQUEST',
  SUCCESS: '获取搜索提示 @ SUCCESS',
  FAILURE: '获取搜索提示 @ FAILURE'
}
