import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import style from './ToolBar.styl'

class ToolBar extends React.Component {
  static mapStateToProps () {
    return {}
  }

  state = {
    activeTab: 0
  }

  render () {
    return (
      <div className={style['wrapper']}>
        <div className={style['wrapper']}>
          { this.props.children }
        </div>
        <div className={style['tool-bar']}>
          <div className={style['icon-wrapper']}>
            <div className={style['icon-home']}></div>
            <span className={style['title']}>首页</span>
          </div>
          <div className={style['icon-wrapper']}>
            <div className={style['icon-kind']}></div>
            <span className={style['title']}>分类</span>
          </div>
          <div className={style['icon-wrapper']}>
            <div className={style['icon-mine']}></div>
            <span className={style['title']}>我的</span>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(ToolBar.mapStateToProps)(ToolBar)
