/**
 * Created by faraway on 17-8-9.
 */
import React from 'react'
import { render } from 'react-dom'
import { Route, Switch } from 'react-router-dom'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { AppContainer } from 'react-hot-loader'
import { ConnectedRouter, routerReducer, routerMiddleware } from 'react-router-redux'
import createHistory from 'history/createHashHistory'
import thunk from 'redux-thunk'

import * as actions from './actions'
import * as reducers from './reducers'

import Entry from './pages/entry'
import Search from './pages/search'
import GlobalAlarm from './components/GlobalAlarm'

// Create a history of your choosing (we're using a browser history in this case)
const history = createHistory()

// Build the middleware for intercepting and dispatching navigation actions
const reduxRouter = routerMiddleware(history)

// Add the reducer to your store on the `router` key
// Also apply our middleware for navigating
const store = createStore(
  combineReducers({
    ...reducers,
    router: routerReducer
  }),
  applyMiddleware(reduxRouter, thunk)
)

window.actions = actions
window.dispatch = function (action) {
  store.dispatch(action)
}
window.store = store

render(
  <AppContainer>
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <div style={{height: '100%'}}>
          <Switch>
            <Route path={'/search/:keyword'} component={Search}/>
            <Route path={'/search'} component={Search}/>
            <Route exact path={'/'} component={Entry}/>
          </Switch>
          <GlobalAlarm/>
        </div>
      </ConnectedRouter>
    </Provider>
  </AppContainer>,
  document.getElementById('root')
)

if (module.hot) {
  module.hot.accept()
}
