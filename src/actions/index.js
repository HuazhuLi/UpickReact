/**
 * Created by faraway on 17-8-9.
 */
import * as type from './consts'
import axios from 'axios'
import objectToCamel from '../plugins/camel'
const r = '/api/v2'

export const fetchIndex = () => async (dispatch, getState) => {
  dispatch(requestIndex())
  const state = getState()
  if (Date.now() - state.index.updatedTime >= 3600 * 1000 * 0.2) {
    try {
      const indexData = await axios.get(`${r}/index`)
        .then(res => res.status === 200 && res.data)
        .then(data => data.status === 200 && data.data)
        .then(objectToCamel)
      dispatch(receiveIndex(Object.assign({}, indexData)))
    } catch (e) {
      dispatch(failedReceiveIndex(e))
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

export const failedReceiveIndex = (error) => ({
  type: type.FAILED_INDEX_DATA,
  error
})
