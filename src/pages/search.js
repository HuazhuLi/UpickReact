/**
 * Created by faraway on 17-8-9.
 */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
import { push } from 'react-router-redux'

import SearchResult from '../containers/SearchResult'
import SearchInfo from '../containers/SearchInfo'
import SearchInput from '../components/SearchInput'

class Search extends Component {
  /**
   * 搜索容器的render函数
   * @returns {XML}
   */
  render () {
    const { dispatch } = this.props
    console.log(this.props)
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
        <Switch style={{
          flexShrink: '0'
        }}>
          <Route path={`${this.props.match.path}/:keyword`} component={SearchResult}/>
          <Route exact path={''} component={SearchInfo}/>
        </Switch>
      </div>
    )
  }
}

export default connect(() => ({}))(Search)
