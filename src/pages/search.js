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
    return (
      <div>
        <SearchInput onSubmit={(value) => { dispatch(push(`/search/${value}`)) }}/>
        <Switch>
          <Route path={`${this.props.match.path}/:keyword`} component={SearchResult}/>
          <Route exact path={''} component={SearchInfo}/>
        </Switch>
      </div>
    )
  }
}

export default connect(() => ({}))(Search)
