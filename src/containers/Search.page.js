/**
 * Created by faraway on 17-8-9.
 */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { changeSearchText } from '../actions'

import SearchInput from '../components/SearchInput/index'

class Search extends Component {
  /**
   * 搜索容器的render函数
   */
  static mapStateToProps ({ uiState, shops }) {
    return {
      keyword: uiState.keyword
    }
  }

  render () {
    const { dispatch } = this.props
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
      }}>
        <SearchInput
          style={{
            flexShrink: '0'
          }}
          keyword={this.props.keyword}
          onChange={e => dispatch(changeSearchText(e.target.value))}
          onSubmit={value => dispatch(push(`/search/${value}`))}
          hints={[]}
        />
        {
          this.props.children
        }
      </div>
    )
  }

  // shouldComponentUpdate (nextProps, nextState) {
  //   if (nextProps.internalKeyword === this.props.internalKeyword) {
  //     return false
  //   }
  // }

  componentWillReceiveProps (nextProps) {
    // if (this.props.keyword !== nextProps.keyword) {
    //   this.setState({ keyword: nextProps.keyword })
    // }
    console.log(nextProps)
  }
}

export default connect(Search.mapStateToProps)(Search)
