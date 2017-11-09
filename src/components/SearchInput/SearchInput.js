/**
 * Created by faraway on 17-8-11.
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'

import style from './SearchInput.styl'

import searchIcon from '../../assets/search-orange.png'

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

  timeoutHandlerBlur = 0

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
            placeholder='请输入搜索内容'
            value={this.props.keyword}
            onChange={e => this.props.onChange(e.target.value) || this.setState({ showHint: !!e.target.value })}
            onFocus={e => e.target.value && this.setState({ showHint: true })}
            onBlur={e =>
              // setTimeout 避免“点不到”下面的li
              e.target.value && (this.timeoutHandlerBlur = setTimeout(() => this.setState({ showHint: false }), 100))
            }
          />
          <button
            disabled={this.props.keyword === ''}
            className={style['search-button']}
            onClick={() => this.props.onSubmit(this.props.keyword)}
          >
          搜索
          </button>
        </div>
        <div
          className={style['hints-list']}
          style={{ display: (this.props.hint.length > 0 && this.state.showHint) ? undefined : 'none' }}
        >
          <ul>
            {
              this.props.hint.map(hint =>
                <li key={hint.id} onClick={() => this.props.onChange(hint.shopName) || this.props.onSubmit(hint.shopName)}>
                  <img className={style['search-icon']} src={searchIcon}/>
                  <span className={style['shop-name']}>{hint.shopName}</span>
                  <span className={style['shop-mark']}>{hint.shopScore > 0 ? Number(hint.shopScore).toFixed(1) : '暂无评分'}</span>
                </li>
              )
            }
          </ul>
        </div>
      </div>
    )
  }

  componentWillUnmount () {
    clearTimeout(this.timeoutHandlerBlur)
  }
}
