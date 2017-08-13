/**
 * Created by faraway on 17-8-11.
 */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import ShopList from '../components/ShopList'
import ShopListItem from '../components/ShopListItem'
import Result from '../components/Result'

import { fetchSearchResult } from '../actions'

/**
 * 没有相关店铺的一个子容器
 */
const NoSuchShops = connect(() => ({}))((props) => (
  <Result
    onButtonClick={() => props.dispatch(push('/add'))}
    buttonTitle={'添加新店'}
    text={'到添加新店里面提醒我们吧！'}
    title={'没有找到该店铺哦～'}
    status={0}
  />
))

class SearchResult extends Component {
  static mapStateToProps = function ({ searchResult }) {
    return {
      searchResult: searchResult.searchResult
    }
  }
  render () {
    return (
      (this.props.searchResult || []).length > 0
        ? <ShopList>
          {
            this.props.searchResult.map((shop, i) => (
              <ShopListItem key={i} shop={shop} onShopClick={() => { console.log('Shop Click!') }}/>
            ))
          }
        </ShopList>
        : <NoSuchShops/>
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
