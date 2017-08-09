/**
 * Created by faraway on 17-8-9.
 */
import * as type from './consts'
import axios from 'axios'
import objectToCamel from '../plugins/camel'
const r = '/api/v1'

export const fetchIndex = () => async (dispatch, getState) => {
  dispatch(requestIndex())
  const state = getState()
  if (state.index.receivedAt - Date.now() >= 3600 * 1000 * 0.2) {
    try {
      const index = await axios.get(`${r}/index`)
        .then(res => res.status === 200 && res.data)
        .then(data => data.status === 200 && data.data)
        .then(objectToCamel)
      dispatch(receiveIndex(Object.assign({}, index)))
    } catch (e) {
      dispatch(failedReceiveIndex())
    }
  } else {
    dispatch(receiveIndex(state.index))
  }
}

export const requestIndex = () => ({
  type: type.REQUEST_INDEX_DATA
})

export const receiveIndex = (indexData) => ({
  type: type.RECEIVE_INDEX_DATA,
  indexData,
  receivedAt: Date.now()
})

export const failedReceiveIndex = () => ({
  type: type.FAILED_INDEX_DATA
})
