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
      <div className={style['search-input-wrapper']} style={this.props.style}>
        <input
          className={style['search-input']}
          placeholder="请输入搜索内容"
          value={this.state.keyword}
          onChange={e => this.setState({ keyword: e.target.value })}
        />
        <button
          disabled={this.state.keyword === ''}
          className={style['search-button']}
          onClick={() => this.props.onSubmit(this.state.keyword)}
        >
          搜索
        </button>
      </div>
    )
  }
}
