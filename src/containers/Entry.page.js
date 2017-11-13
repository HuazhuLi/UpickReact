/**
 * Created by faraway on 17-8-9.
 */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import EntryHeader from '../components/EntryHeader'
import Classify from '../components/Classify'
import Splitter from '../components/Splitter'
import PopularShops from '../components/PopularShops'

import { fetchIndex } from '../actions'

import * as wx from '../plugins/wx'

class Entry extends Component {
  static mapStateToProps ({ index }) {
    return {
      value: index.value,
      // 主页之前已经有加载，这里略去加载动画，
      // 但是这个属性仍然有用，例如在加载过程
      // 中设置禁止操作
      isFetching: index.isFetching,
      error: index.error
    }
  }
  render () {
    const indexData = this.props.value
    const { dispatch } = this.props
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%'
        }}
      >
        <EntryHeader
          slogan={indexData.slogan}
          style={{ flexShrink: '0' }}
          onSearchButtonClick={() => {
            /**
             * 这里是我最疑惑的一点，到底是应该用Link，
             * 还是应该用action，毕竟v4提倡声明式的路由
             */
            dispatch(push('/search'))
            // dispatch(fetchSearchInfo())
          }}
        />
        <Splitter content={'分类'} style={{ flexShrink: '0' }}/>
        <Classify
          types={indexData.shopTypes}
          style={{ flexGrow: '1' }}
          onTypesClick={(type) => !this.props.isFetching && dispatch(push(`/list/${type}`))}
        />
        <Splitter content={'热门商家'} style={{ flexShrink: '0' }}/>
        <PopularShops
          shops={indexData.popularShops}
          style={{ flexShrink: '0' }}
          onShopClick={(shop) => !this.props.isFetching && dispatch(push(`/detail/${shop.shopName}`))}
        />
      </div>
    )
  }
  componentWillMount () {
    const { dispatch } = this.props
    document.title = '华科优铺 | 校内店铺评价'
    dispatch(fetchIndex())
    setTimeout(() =>
      wx.wxShare({
        title: `华科优铺 | 让校内坑店无处遁形”`, // 分享标题
        desc: `发现校内优质店铺，\n吐槽校内黑心商家，\n让品质校园生活从华科优铺开始！` // 分享链接
      })
      , 1000)
  }
}
export default connect(Entry.mapStateToProps)(Entry)
