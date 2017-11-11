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
  REQUEST: '发表评价 @ REQUEST',
  SUCCESS: '发表评价 @ SUCCESS',
  FAILURE: '发表评价 @ FAILURE'
}

export const SEARCH_HINT = {
  REQUEST: '获取搜索提示 @ REQUEST',
  SUCCESS: '获取搜索提示 @ SUCCESS',
  FAILURE: '获取搜索提示 @ FAILURE'
}

export const COMMENT_TAGS = {
  REQUEST: '获取评论标签 @ REQUEST',
  SUCCESS: '获取评论标签 @ SUCCESS',
  FAILURE: '获取评论标签 @ FAILURE'
}

export const UPLOAD_IMAGE = {
  REQUEST: '上传图片 @ REQUEST',
  SUCCESS: '上传图片 @ SUCCESS',
  FAILURE: '上传图片 @ FAILURE'
}

export const GLOBAL_ALARM = {
  SHOW: '显示全局警告'
}

export const ALL_TYPES = {
  REQUEST: '获取全部分类 @ REQUEST',
  SUCCESS: '获取全部分类 @ SUCCESS',
  FAILURE: '获取全部分类 @ FAILURE'
}

export const ADD_SHOP = {
  REQUEST: '添加店铺 @ REQUEST',
  SUCCESS: '添加店铺 @ SUCCESS',
  FAILURE: '添加店铺 @ FAILURE'
}

export const ALL_USER_TICKETS = {
  REQUEST: '获取用户点券 @ REQUEST',
  SUCCESS: '获取用户点券 @ SUCCESS',
  FAILURE: '获取用户点券 @ FAILURE'
}

export const ALL_USER_INFO = {
  REQUEST: '获取用户信息 @ REQUEST',
  SUCCESS: '获取用户信息 @ SUCCESS',
  FAILURE: '获取用户信息 @ FAILURE'
}
