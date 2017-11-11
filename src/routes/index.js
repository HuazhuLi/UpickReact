/**
 * Created by faraway on 17-8-31.
 */
import React from 'react'
import { Switch, Route } from 'react-router-dom'

const Entry = require('../containers/Entry.page').default
const Search = require('../containers/Search.page').default
const List = require('../containers/List.page').default
const Detail = require('../containers/Detail.page').default
const Comment = require('../containers/Comment.page').default
const SearchInfo = require('../containers/SearchInfo').default
const SearchResult = require('../containers/SearchResult').default
const Add = require('../containers/Add.page').default
const UserInfo = require('../containers/UserInfo.page').default
const ToolBar = require('../components/ToolBar').default

const concatPath = (a, b) => {
  // if (a[-1] === '/' && b[0] === '/') {

  // }
  return (a + b).replace(/\/\//g, '/')
}

// 要求路由上的parent要能接受其children
const MyRoute = props => (
  <Route
    path={props.path}
    exact={props.exact}
    component={props.children
      // 有children的时候，要封一层传入children
      ? localProps =>
        <props.component {...localProps}>
          {
            <Switch>
              {
                props.children.map(child =>
                  <MyRoute key={child.path} {...child} path={concatPath(localProps.match.path, child.path)}/>
                )
              }
            </Switch>
          }
        </props.component>
      // 无children, 直接传该组件
      : props.component
    }
  />
)

// 这很Vue
const routesConfig = [
  {
    path: '/',
    exact: false,
    component: ToolBar,
    children: [
      {
        path: '/',
        exact: true,
        component: Entry
      },
      {
        path: '/mine',
        exact: true,
        component: UserInfo
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
        path: '/list/:type/:subtype',
        exact: false,
        component: List
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
      },
      {
        path: '/comment/:shopName',
        exact: false,
        component: Comment
      },
      {
        path: '/add',
        exact: true,
        component: Add
      }
    ]
  }
]

export default () => (
  <Switch>
    {
      routesConfig.map(route => <MyRoute key={route.path} {...route}/>)
    }
    {/* <Route path={'/'} exact component={Entry}/>
    <Route path={'/search'} component={props =>
      <Search>
        <Route path={'/search/:keyword'} component={SearchResult}/>
        <Route path={'/search'} exact component={SearchInfo}/>
      </Search>
    }/>
    <Route path={'/list/:type'} exact component={List}/>
    <Route path={'/list/:type'} exact component={Entry}/> */}
  </Switch>
)
