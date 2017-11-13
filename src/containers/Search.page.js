/**
 * Created by faraway on 17-8-9.
 */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { Switch, Route } from 'react-router-dom'

import { changeSearchText, fetchSearchHint } from '../actions'

import SearchInput from '../components/SearchInput/index'

import * as wx from '../plugins/wx'

const SearchInfo = require('../containers/SearchInfo').default
const SearchResult = require('../containers/SearchResult').default

class Search extends Component {
  /**
   * 搜索容器的render函数
   */
  static mapStateToProps ({ shops, searchHint }) {
    return {
      keyword: shops.keywordToShow,
      hint: searchHint.value
    }
  }

  timeoutHandler = 0

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
          onChange={value => {
            dispatch(changeSearchText(value))
            clearTimeout(this.timeoutHandler)
            if (value) {
              this.timeoutHandler = setTimeout(() => dispatch(fetchSearchHint(value)), 500)
            }
          }}
          onSubmit={value => dispatch(push(`/search/${value}`))}
          hint={this.props.hint || []}
        />
        {
          this.props.children
        }
        {/* <Switch>
          {[<Route component={SearchResult} path={'/search/:keyword'} key={1}/>,
            <Route component={SearchInfo} path={'/search'} exact key={2}/>]}
        </Switch> */}
      </div>
    )
  }

  componentWillMount () {
    document.title = '搜索'
    wx.wxShare({
      title: `华科优铺 | 来这里搜索校内优秀商家`, // 分享标题
      desc: '还不快快点进来搜索！'
    })
  }
}

export default connect(Search.mapStateToProps)(Search)
