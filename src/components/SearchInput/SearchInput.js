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
      showHint: false
    }
  }
  render () {
    return (
      <div style={{ position: 'relative' }}>
        <div
          className={style['search-input-wrapper']}
          style={this.props.style}
          ref={ele => {
            if (ele instanceof HTMLElement) {
              ele.parentNode.lastChild.style.height = window.innerHeight - ele.clientHeight + 'px'
            }
          }}
        >
          <input
            className={style['search-input']}
            placeholder="请输入搜索内容"
            value={this.props.keyword}
            onChange={e => this.props.onChange(e)}
          />
          <button
            disabled={this.props.keyword === ''}
            className={style['search-button']}
            onClick={() => this.props.onSubmit(this.props.keyword)}
          >
          搜索
          </button>
        </div>
        <div className={style['hints-list']} style={{ display: this.state.showHint ? undefined : 'none' }}>
          <ul>
            {
              this.props.hints.map(hint =>
                <li key={hint.id}>
                  <img class={style['search-icon']}/>
                  <span class={style['shop-name']}>{hint.shopName}</span>
                  <span class={style['shop-mark']}>{hint.shopScore}</span>
                </li>
              )
            }
          </ul>
        </div>
      </div>
    )
  }
}
