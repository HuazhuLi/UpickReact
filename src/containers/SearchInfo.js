/**
 * Created by faraway on 17-8-11.
 */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import SearchInfoComponent from '../components/SearchInfo'

import { fetchSearchHot, fetchSearchHistory, changeSearchText } from '../actions'

class SearchInfo extends Component {
  static mapStateToProps = function ({ searchHot, searchHistory }) {
    return {
      searchInfo: {
        searchInfoHot: searchHot.value,
        searchInfoHistory: searchHistory.value
      },
      isFetchingSearchInfo: searchHot.isFetching || searchHistory.isFetching
    }
  }
  render () {
    const { dispatch } = this.props
    return (
      <SearchInfoComponent
        {...this.props.searchInfo}
        inLoadingStatus={this.props.isFetchingSearchInfo}
        onKeywordClick={keyword => {
          dispatch(push(`/search/${keyword}`))
          dispatch(changeSearchText(keyword))
          window._czc.push(['_trackEvent', '搜索页', '热门or历史', keyword, '点击'])
        }}
        style={{ flexGrow: '1', overflow: 'auto' }}
      />
    )
  }
  componentWillMount () {
    const { dispatch } = this.props
    dispatch(fetchSearchHot())
    dispatch(fetchSearchHistory())
  }
}

export default connect(SearchInfo.mapStateToProps)(SearchInfo)
