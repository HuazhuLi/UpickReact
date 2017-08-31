/**
 * Created by faraway on 17-8-31.
 */
import React from 'react'
import { render, unmountComponentAtNode } from 'react-dom'
import { Route, Switch } from 'react-router-dom'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { Provider } from 'react-redux'
import { AppContainer } from 'react-hot-loader'
import { ConnectedRouter, routerReducer, routerMiddleware } from 'react-router-redux'
import createHistory from 'history/createHashHistory'
import thunk from 'redux-thunk'

import * as reducers from './reducers'

// Create a history of your choosing (we're using a browser history in this case)
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
    applyMiddleware(thunk, reduxRouter)
  )
)

const renderFullPage = () => {
  const Entry = require('./pages/entry').default
  const Search = require('./pages/search').default
  const List = require('./pages/list').default
  const Detail = require('./pages/detail').default
  const GlobalAlarm = require('./components/GlobalAlarm').default
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <div style={{height: '100%'}}>
          <Switch>
            <Route path={'/search'} component={Search}/>
            <Route path={'/list/:type'} component={List}/>
            <Route path={'/detail/:shopName'} component={Detail}/>
            <Route exact path={'/'} component={Entry}/>
          </Switch>
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

export default reRender
