import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import style from './ToolBar.styl'

class ToolBar extends React.Component {
  static mapStateToProps () {
    return {}
  }

  state = {
    activeTab: 0
  }

  isHomeActive () {
    return this.props.location.pathname === '/'
  }

  isKindActive () {
    return this.props.location.pathname.indexOf('/list/') >= 0 ||
    this.props.location.pathname.indexOf('/subtype') >= 0
  }

  isMineActive () {
    return this.props.location.pathname.indexOf('/mine') >= 0
  }

  render () {
    const { dispatch } = this.props
    return (
      <div className={style['wrapper']}>
        <div className={style['wrapper']}>
          { this.props.children }
        </div>
        <div className={style['tool-bar']}>
          <div
            className={style['icon-wrapper']}
            onClick={() => {
              if (!this.isHomeActive()) {
                dispatch(push('/'))
              }
              window._czc.push(['_trackEvent', '底部栏', '首页', '点击'])
            }}
          >
            <div className={style['icon-home'] + ' ' + (this.isHomeActive() ? style['active'] : '')}></div>
            <span className={style['title'] + ' ' + (this.isHomeActive() ? style['active'] : '')}>首页</span>
          </div>
          {/* <div
            className={style['icon-wrapper']}
            onClick={() => {
              if (!this.isKindActive()) {
                dispatch(push('/subtype'))
              }
              window._czc.push(['_trackEvent', '底部栏', '分类', '点击'])
            }}
          >
            <div className={style['icon-kind'] + ' ' + (this.isKindActive() ? style['active'] : '')}></div>
            <span className={style['title'] + ' ' + (this.isKindActive() ? style['active'] : '')}>分类</span>
          </div> */}
          <div
            className={style['icon-wrapper']}
            onClick={() => {
              if (!this.isMineActive()) {
                dispatch(push('/mine'))
              }
              window._czc.push(['_trackEvent', '底部栏', '我的', '点击'])
            }}
          >
            <div className={style['icon-mine'] + ' ' + (this.isMineActive() ? style['active'] : '')}></div>
            <span className={style['title'] + ' ' + (this.isMineActive() ? style['active'] : '')}>我的</span>
          </div>
        </div>
      </div>
    )
  }

  historyUnlisten = null

  componentWillMount () {
    this.historyUnlisten = this.props.history.listen((location, action) => {
      // TODO:
    })
  }
  componentWillUnmount () {
    this.historyUnlisten()
  }
}

export default connect(ToolBar.mapStateToProps)(ToolBar)
