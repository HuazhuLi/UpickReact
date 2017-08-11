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

class Entry extends Component {
  static mapStateToProps ({ index }) {
    return { index }
  }
  render () {
    const { indexData } = this.props.index
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
             * 还是应该用action
             */
            dispatch(push('/search'))
            // dispatch(fetchSearchInfo())
          }}
        />
        <Splitter content={'分类'} style={{ flexShrink: '0' }}/>
        <Classify
          types={indexData.shopTypes}
          style={{ flexGrow: '1' }}
          onTypesClick={(type) => dispatch(push(`/list/${type}`))}
        />
        <Splitter content={'热门商家'} style={{ flexShrink: '0' }}/>
        <PopularShops
          shops={indexData.popularShops}
          style={{ flexShrink: '0' }}
          onShopClick={(shop) => dispatch(push(`/detail/${shop.shopName}`))}
        />
      </div>
    )
  }
  componentWillMount () {
    const { dispatch } = this.props
    dispatch(fetchIndex())
  }
}
export default connect(Entry.mapStateToProps)(Entry)
