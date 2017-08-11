/**
 * Created by faraway on 17-8-11.
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'

import style from './SearchInput.styl'

export default class SearchInput extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired
  }
  constructor (props) {
    super(props)
    this.state = {
      keyword: ''
    }
  }
  render () {
    return (
      <div>
        <input
          placeholder="请输入搜索内容"
          value={this.state.keyword}
          onChange={(e) => this.setState({ keyword: e.target.value })}
        />
        <button onClick={() => this.props.onSubmit(this.state.keyword)}>搜索</button>
      </div>
    )
  }
}
