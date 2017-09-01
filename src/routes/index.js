/**
 * Created by faraway on 17-8-31.
 */
import React from 'react'
import { Switch, Route } from 'react-router-dom'

const Entry = require('../containers/Entry.page').default
const Search = require('../containers/Search.page').default
const List = require('../containers/List.page').default
const Detail = require('../containers/Detail.page').default
const SearchInfo = require('../containers/SearchInfo').default
const SearchResult = require('../containers/SearchResult').default

const MyRoute = (props) => (
  <Route
    path={props.path}
    exact={props.exact}
    component={(localProps) =>
      <props.component {...localProps}>
        {
          props.children &&
          <Switch>
            {
              props.children.map(child =>
                <MyRoute key={child.path} {...child} path={localProps.match.path + child.path}/>
              )
            }
          </Switch>
        }
      </props.component>
    }
  />
)

// 这很Vue
const routesConfig = [
  {
    path: '/',
    exact: true,
    component: Entry
  },
  {
    path: '/search',
    exact: false,
    component: Search,
    children: [
      {
        path: '/:keyword',
        exact: false,
        component: SearchResult
      },
      {
        path: '',
        exact: true,
        component: SearchInfo
      }
    ]
  },
  {
    path: '/list/:type',
    exact: false,
    component: List
  },
  {
    path: '/detail/:shopName',
    exact: false,
    component: Detail
  }
]

export default () => (
  <Switch>
    {
      routesConfig.map(route => <MyRoute key={route.path} {...route}/>)
    }
  </Switch>
)
