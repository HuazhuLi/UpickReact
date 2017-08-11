/**
 * Created by faraway on 17-8-10.
 */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, Switch } from 'react-router-dom'

import ShopList from '../components/ShopList'
import ShopListItem from '../components/ShopListItem'
import SearchInfo from '../components/SearchInfo'

import { fetchSearchInfo, fetchSearchResult } from '../actions'

class Search extends Component {
  /**
   * 子容器，不知道放在这里合适不合适
   */
  static SearchInfo = connect(function ({ searchInfo }) {
    return {
      searchInfo: searchInfo.searchInfo
    }
  })(class extends Component {
    render () {
      return (
        <SearchInfo {...this.props.searchInfo}/>
      )
    }
    componentWillMount () {
      const { dispatch } = this.props
      dispatch(fetchSearchInfo())
    }
  })
  /**
   * 子容器，不知道放在这里合适不合适
   */
  static SearchResult = connect(function ({ searchResult }) {
    return {
      searchResult: searchResult.searchResult
    }
  })(class extends Component {
    render () {
      return (
        <ShopList>
          {
            this.props.searchResult.map((shop, i) => (
              <ShopListItem key={i} shop={shop} onShopClick={() => { console.log('Shop Click!') }}/>
            ))
          }
        </ShopList>
      )
    }
    componentWillMount () {
      const { dispatch } = this.props
      dispatch(fetchSearchResult(this.props.match.params.keyword))
    }
    // componentWillUpdate () {
    //   const { dispatch } = this.props
    //   dispatch(fetchSearchResult(this.props.match.params.keyword))
    //   console.log(this.props.match.params.keyword)
    // }
    componentWillReceiveProps (nextProps) {
      /**
       * 当当前路由和即将得到的路由不同时，更新
       */
      if (this.props.location.pathname !== nextProps.location.pathname) {
        this.props.dispatch(fetchSearchResult(nextProps.match.params.keyword))
      }
    }
  })

  // /**
  //  * 主容器的
  //  */
  // static mapStateToProps ({ searchResult, searchInfo }) {
  //   return {
  //     searchResult: searchResult.searchResult,
  //     searchInfo: searchInfo.searchInfo
  //   }
  // }

  /**
   * 搜索容器的render函数
   * @returns {XML}
   */
  render () {
    return (
      <Switch>
        <Route path={`${this.props.match.path}/:keyword`} component={Search.SearchResult}/>
        <Route exact path="" component={Search.SearchInfo}/>
      </Switch>
    )
  }
}

/**
 * 主容器只需要一个dispatch足够了
 */
export default connect(() => ({}))(Search)
