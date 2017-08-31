/**
 * Created by faraway on 17-8-31.
 */
import React from 'react'
import { render } from 'react-dom'
import { Route, Switch } from 'react-router-dom'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { ConnectedRouter, routerReducer, routerMiddleware } from 'react-router-redux'
import createHistory from 'history/createHashHistory'
import thunk from 'redux-thunk'

import * as reducers from './reducers'

const history = createHistory()
const reduxRouter = routerMiddleware(history)

const store = createStore(
  combineReducers({
    ...reducers,
    router: routerReducer
  }),
  applyMiddleware(thunk, reduxRouter)
)

const Entry = require('./pages/entry').default
const Search = require('./pages/search').default
const List = require('./pages/list').default
const Detail = require('./pages/detail').default
const GlobalAlarm = require('./components/GlobalAlarm').default
render(
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
  </Provider>,
  document.getElementById('root')
)
