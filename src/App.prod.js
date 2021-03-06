/**
 * Created by faraway on 17-8-31.
 */
import React from 'react'
import { render } from 'react-dom'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import {
  ConnectedRouter,
  routerReducer,
  routerMiddleware
} from 'react-router-redux'
import createHistory from 'history/createHashHistory'
import { apiMiddleware } from 'redux-api-middleware'

import * as reducers from './reducers'

const history = createHistory()
const reduxRouter = routerMiddleware(history)

const store = createStore(
  combineReducers({
    ...reducers,
    router: routerReducer
  }),
  applyMiddleware(reduxRouter, apiMiddleware)
)

const RootRoute = require('./routes').default
const GlobalAlarm = require('./components/GlobalAlarm').default
render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <RootRoute />
        <GlobalAlarm />
      </div>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
)
