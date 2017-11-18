import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import { fetchAllSubtypes } from '../actions'

import AllSubtypes from '../components/AllSubtypes'
import Loading from '../components/Loading'

import * as wx from '../plugins/wx'

class Subtype extends React.Component {
  static mapStateToProps ({ subtypes: { originValue, isFetching } }) {
    return {
      subtypes: originValue,
      isFetchingSubtypes: isFetching
    }
  }

  render () {
    const { dispatch } = this.props
    if (this.props.isFetchingSubtypes) {
      return <Loading />
    }
    return (
      <AllSubtypes
        subtypes={this.props.subtypes}
        onSubtypeClick={(type, subtype) => {
          dispatch(push(`/list/${type}/${subtype}`))
          window._czc.push(['_trackEvent', '全部分类页', '点击', type, subtype])
        }}
      />
    )
  }

  componentWillMount () {
    const { dispatch } = this.props
    dispatch(fetchAllSubtypes())
    wx.wxShare({
      title: '华科优铺 | 所有的分类都在这里啦！', // 分享标题
      desc: '发现校内优质店铺，\n吐槽校内黑心商家，\n让品质校园生活从华科优铺开始！',
      success: () => {
        window._czc.push(['_trackEvent', '全部分类页', '用户分享', '分享成功'])
      },
      cancel: () => {
        // 用户取消分享后执行的回调函数
        window._czc.push(['_trackEvent', '全部分类页', '用户分享', '分享取消'])
      }
    })
  }
}

export default connect(Subtype.mapStateToProps)(Subtype)
