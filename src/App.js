/**
 * Created by faraway on 17-8-9.
 */
import React from 'react'
import { render } from 'react-dom'
import { browserHistory } from 'react-router'
import { Route } from 'react-router-dom'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { AppContainer } from 'react-hot-loader'
import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux'
import createHistory from 'history/createBrowserHistory'

import * as reducers from './reducers'
import Entry from './pages/entry'

// Create a history of your choosing (we're using a browser history in this case)
const history = createHistory()

// Build the middleware for intercepting and dispatching navigation actions
const middleware = routerMiddleware(history)

// Add the reducer to your store on the `router` key
// Also apply our middleware for navigating
const store = createStore(
  combineReducers({
    ...reducers,
    router: routerReducer
  }),
  applyMiddleware(middleware)
)

store.subscribe(() => {
  console.log(store.getState())
  // todo
})

render(
  <AppContainer>
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Route path={'/entry'}><Entry/></Route>
      </ConnectedRouter>
    </Provider>
  </AppContainer>,
  document.getElementById('root')
)

if (module.hot) {
  module.hot.accept()
}