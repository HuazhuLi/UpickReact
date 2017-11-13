import React, { Component } from 'react'
import { connect } from 'react-redux'
import { replace } from 'react-router-redux'

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
      <AllSubtypes subtypes={this.props.subtypes}/>
    )
  }

  componentWillMount () {
    const { dispatch } = this.props
    dispatch(fetchAllSubtypes())
    wx.wxShare({
      title: '华科优铺 | 所有的分类都在这里啦！', // 分享标题
      desc: '发现校内优质店铺，\n吐槽校内黑心商家，\n让品质校园生活从华科优铺开始！'
    })
  }
}

export default connect(Subtype.mapStateToProps)(Subtype)
