/**
 * Created by faraway on 17-8-9.
 */
import React, { Component } from 'react'
import { connect } from 'react-redux'

import EntryHeader from '../components/EntryHeader'

class Entry extends Component {
  static mapStateToProps ({ index }) {
    return { index }
  }
  render () {
    const { indexData } = this.props.index
    return (
      <div>
        <EntryHeader/>
        <div className="">{indexData.shopTypes.join(' ')}</div>
      </div>
    )
  }
}
export default connect(Entry.mapStateToProps)(Entry)
