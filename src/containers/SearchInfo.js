/**
 * Created by faraway on 17-8-11.
 */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import SearchInfoComponent from '../components/SearchInfo'

import { fetchSearchInfo } from '../actions'

class SearchInfo extends Component {
  static mapStateToProps = function ({ searchInfo }) {
    return {
      searchInfo: searchInfo.searchInfo
    }
  }
  render () {
    const { dispatch } = this.props
    return (
      <SearchInfoComponent
        {...this.props.searchInfo}
        onKeywordClick={(keyword) => dispatch(push(`/search/${keyword}`))}
      />
    )
  }
  componentWillMount () {
    const { dispatch } = this.props
    dispatch(fetchSearchInfo())
  }
}

export default connect(SearchInfo.mapStateToProps)(SearchInfo)
