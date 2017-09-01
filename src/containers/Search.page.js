/**
 * Created by faraway on 17-8-9.
 */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
import { push } from 'react-router-redux'

import SearchResult from './SearchResult'
import SearchInfo from './SearchInfo'
import SearchInput from '../components/SearchInput/index'

class Search extends Component {
  /**
   * 搜索容器的render函数
   * @returns {XML}
   */
  render () {
    const { dispatch } = this.props
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
      }}>
        <SearchInput
          onSubmit={(value) => { dispatch(push(`/search/${value}`)) }}
          style={{
            flexShrink: '0'
          }}
        />
        {
          this.props.children
        }
      </div>
    )
  }
}

export default connect(() => ({}))(Search)
