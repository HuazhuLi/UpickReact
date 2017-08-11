/**
 * Created by faraway on 17-8-11.
 */
import React, { Component } from 'react'
import { connect } from 'react-redux'

import ShopList from '../components/ShopList'
import ShopListItem from '../components/ShopListItem'

import { fetchSearchResult } from '../actions'

class SearchResult extends Component {
  static mapStateToProps = function ({ searchResult }) {
    return {
      searchResult: searchResult.searchResult
    }
  }
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
}

export default connect(SearchResult.mapStateToProps)(SearchResult)
