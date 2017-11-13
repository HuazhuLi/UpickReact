/**
 * Created by faraway on 17-8-15.
 */
import React, { Component } from 'react'
import { connect } from 'react-redux'

import SwipeShopList from './SwipeShopList'

import { setCurrentShopType, fetchShopsByType, setCurrentShopSubType } from '../actions/index'

import * as wx from '../plugins/wx'

class List extends Component {
  componentWillMount () {
    const { type, subtype } = this.props.match.params

    wx.wxShare({
      title: `校内所有“${type || subtype}”相关的商家都在这里啦！| 华科优铺`, // 分享标题
      desc: '还不快快点进来看看！'
    })
    document.title = type

    this.props.dispatch(fetchShopsByType(type))
    this.props.dispatch(setCurrentShopType(type))
    subtype && this.props.dispatch(setCurrentShopSubType(subtype))
  }
  componentWillReceiveProps (nextProps) {
    const { type, subtype } = nextProps.match.params

    wx.wxShare({
      title: `校内所有“${type || subtype}”相关的商家都在这里啦！| 华科优铺`, // 分享标题
      desc: '还不快快点进来看看！'
    })
    document.title = type

    if (nextProps.match.params.type !== this.props.match.params.type) {
      this.props.dispatch(fetchShopsByType(type))
      this.props.dispatch(setCurrentShopType(type))
    }
    if (nextProps.match.params.subtype !== this.props.match.params.subtype) {
      subtype && this.props.dispatch(setCurrentShopSubType(subtype))
    }
  }
  render () {
    return (
      <SwipeShopList/>
    )
  }
}

export default connect(() => ({}))(List)
