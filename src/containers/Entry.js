/**
 * Created by faraway on 17-8-9.
 */
import React, { Component } from 'react'
import { connect } from 'react-redux'

import EntryHeader from '../components/EntryHeader'

import { fetchIndex } from '../actions'

class Entry extends Component {
  static mapStateToProps ({ index }) {
    return { index }
  }
  render () {
    const { indexData } = this.props.index
    return (
      <div>
        <EntryHeader slogan={indexData.slogan}/>
        <div className="">{indexData.shopTypes.join(' ')}</div>
      </div>
    )
  }
  componentWillMount () {
    const { dispatch } = this.props
    dispatch(fetchIndex())
  }
}
export default connect(Entry.mapStateToProps)(Entry)
