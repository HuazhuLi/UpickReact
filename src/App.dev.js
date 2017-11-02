/**
 * Created by faraway on 17-8-31.
 */
import React from 'react'
import { render, unmountComponentAtNode } from 'react-dom'

import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { Provider } from 'react-redux'
import { ConnectedRouter, routerReducer, routerMiddleware } from 'react-router-redux'
import createHistory from 'history/createHashHistory'

import thunk from 'redux-thunk'
import { apiMiddleware } from 'redux-api-middleware'

import { AppContainer } from 'react-hot-loader'

import * as reducers from './reducers'
import * as actions from './actions'

// Create a history of your choosing (we're using a hash history in this case)
const history = createHistory()

// Build the middleware for intercepting and dispatching navigation actions
const reduxRouter = routerMiddleware(history)

const root = document.getElementById('root')

// Add the reducer to your store on the `router` key
// Also apply our middleware for navigating
const store = createStore(
  combineReducers({
    ...reducers,
    router: routerReducer
  }),
  composeWithDevTools(
    applyMiddleware(thunk, reduxRouter, apiMiddleware)
  )
)

const renderFullPage = () => {
  const GlobalAlarm = require('./components/GlobalAlarm').default
  const RootRoute = require('./routes').default
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <div style={{height: '100%'}}>
          <RootRoute/>
          <GlobalAlarm/>
        </div>
      </ConnectedRouter>
    </Provider>
  )
}

const reRender = () => {
  unmountComponentAtNode(root)
  render(
    <AppContainer>
      {
        renderFullPage()
      }
    </AppContainer>,
    root
  )
}

if (module.hot) {
  module.hot.accept('./reducers', () => {
    store.replaceReducer(combineReducers({
      ...require('./reducers'),
      router: routerReducer
    }))
    reRender()
  })
}

window.throwGlobalAlarm = () => store.dispatch(actions.throwGlobalAlarm(5000, undefined, Date.now()))
window.actions = actions
window.store = store

export default reRender
