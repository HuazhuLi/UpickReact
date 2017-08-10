/**
 * Created by faraway on 17-8-9.
 */
import React, { Component } from 'react'
import { connect } from 'react-redux'

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
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%'
        }}
      >
        <EntryHeader slogan={indexData.slogan} style={{ flexShrink: '0' }}/>
        <Splitter content={'分类'} style={{ flexShrink: '0' }}/>
        <Classify types={indexData.shopTypes} style={{ flexGrow: '1' }}/>
        <Splitter content={'热门商家'} style={{ flexShrink: '0' }}/>
        <PopularShops shops={indexData.popularShops} style={{ flexShrink: '0' }}/>
      </div>
    )
  }
  componentWillMount () {
    const { dispatch } = this.props
    dispatch(fetchIndex())
  }
}
export default connect(Entry.mapStateToProps)(Entry)
