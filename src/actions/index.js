/**
 * Created by faraway on 17-8-9.
 */
import * as type from './consts'
import axios from 'axios'
import objectToCamel from '../plugins/camel'
const r = '/api/v2'

/**
 * 主页的index的
 */
export const fetchIndex = () => async (dispatch, getState) => {
  dispatch(requestIndex())
  const state = getState()
  if (Date.now() - state.index.updatedTime >= 3600 * 1000 * 0.2) {
    try {
      const indexData = await axios.get(`${r}/index`)
        .then(res => res.status === 200 && res.data)
        .then(data => data.status === 200 && data.data)
        .then(objectToCamel)
        .catch((e) => {
          throw e
        })
      dispatch(receiveIndex(Object.assign({}, indexData)))
    } catch (e) {
      // dispatch(failedReceiveIndex(e))
      dispatch(throwGlobalAlarm(2500, undefined, '获取主页信息失败！'))
    }
  }
  // 我发现什么都不做也可以这里。。
  // } else {
  //   dispatch(receiveIndex(state.index.indexData))
  // }
}

export const requestIndex = () => ({
  type: type.REQUEST_INDEX_DATA
})

export const receiveIndex = (indexData) => ({
  type: type.RECEIVE_INDEX_DATA,
  indexData,
  receivedAt: Date.now()
})

export const failedReceiveIndex = (error) => ({
  type: type.FAILED_INDEX_DATA,
  error
})

/**
 * 搜索结果相关
 */
export const fetchSearchResult = (keyword) => async (dispatch) => {
  dispatch(requestSearch(keyword))
  try {
    const searchResult = await axios.post(
      `${r}/shops/list`,
      {
        'key_word': keyword,
        'request_type': 3
      },
      {
        headers: {
          'content-type': 'application/json'
        }
      }
    )
      .then(res => res.status === 200 && res.data)
      .then(data => data.status === 200 && data.data)
      .then(objectToCamel)
      .then(data => data.shopList)
      .catch((e) => {
        throw e
      })
    dispatch(receiveSearch(keyword, searchResult))
  } catch (e) {
    // dispatch(failedReceiveSearch(keyword, e))
    console.log(e)
    dispatch(throwGlobalAlarm(2500, undefined, '搜索失败：网络错误！'))
  }
}

export const requestSearch = () => ({
  type: type.REQUEST_SEARCH
})

export const receiveSearch = (keyword, searchResult) => ({
  type: type.RECEIVE_SEARCH,
  keyword,
  searchResult
})

export const failedReceiveSearch = (keyword, error) => ({
  type: type.FAILED_SEARCH,
  keyword,
  error
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
        .catch((e) => {
          throw e
        })
      console.log(searchInfoHot)
      console.log(searchInfoHistory)
      dispatch(receiveSearchInfo({ searchInfoHot, searchInfoHistory }))
    } catch (e) {
      // dispatch(failedReceiveSearchInfo(e))
      console.log(e)
      dispatch(throwGlobalAlarm(2500, undefined, '获取信息失败！'))
    }
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
 * return {thunk}
 * @param alarmDuration
 * @param alarmColor
 * @param alarmValue
 */
export const throwGlobalAlarm = (alarmDuration, alarmColor, alarmValue) => async (dispatch, getState) => {
  /**
   * 把不纯的操作放在这里
   */
  clearTimeout(getState().globalAlarm.timer)
  dispatch(showGlobalAlarm(alarmColor, alarmValue))
  dispatch(updateGlobalAlarmTimer(setTimeout(() => {
    dispatch(hideGlobalAlarm())
  }, alarmDuration)))
}

export const updateGlobalAlarmTimer = (timer) => ({
  type: type.UPDATE_GLOBAL_ALARM_TIMER,
  timer
})

export const showGlobalAlarm = (alarmColor = '#FF305D', alarmValue = 'Error!') => ({
  type: type.SHOW_GLOBAL_ALARM,
  alarmColor,
  alarmValue
})

export const hideGlobalAlarm = () => ({
  type: type.HIDE_GLOBAL_ALARM
})
