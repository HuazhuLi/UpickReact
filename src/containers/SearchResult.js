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
  static mapStateToProps = function ({ shops }) {
    return {
      searchResult: shops.search[shops.keyword].shopList.map(id => shops.shops[id]),
      isSearching: shops.isSearching
    }
  }
  render () {
    const { dispatch } = this.props
    return (
      /**
       * 当加载没有完成或者结果不为空时显示店铺列表
       */
      (this.props.searchResult || []).length > 0 || this.props.isSearching
        ? <ShopList inLoadingStatus={this.props.isSearching} style={{ flexGrow: '1' }}>
          {
            this.props.searchResult.map((shop, i) => (
              <ShopListItem key={i} shop={shop} onShopClick={() => dispatch(push(`/detail/${shop.shopName}`)) }/>
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
