/**
 * Created by faraway on 17-8-10.
 */
import React, { Component } from 'react'
import { connect } from 'react-redux'

import ShopList from '../components/ShopList'
import ShopListItem from '../components/ShopListItem'
import SearchInfo from '../components/SearchInfo'

import { fetchSearchInfo, fetchSearchResult } from '../actions'

class Search extends Component {
  static mapStateToProps ({ searchResult, searchInfo }) {
    return {
      searchResult: searchResult.searchResult,
      searchInfo: searchInfo.searchInfo
    }
  }
  render () {
    return (
      <div>
        {
          'keyword' in this.props.match.params
            ? <ShopList>
              {
                this.props.searchResult.map((shop, i) => (
                  <ShopListItem key={i} shop={shop} onShopClick={() => { console.log('Shop Click!') }}/>
                ))
              }
            </ShopList>
            : <SearchInfo {...this.props.searchInfo}/>
        }
      </div>
    )
  }
  componentWillMount () {
    const { dispatch } = this.props
    dispatch(fetchSearchResult('食堂'))
    dispatch(fetchSearchInfo())
    // if ('keyword' in this.props.match.params) {
    //   dispatch(fetchSearchResult('食堂'))
    // } else {
    //   dispatch(fetchSearchInfo())
    // }
  }
}

export default connect(Search.mapStateToProps)(Search)
