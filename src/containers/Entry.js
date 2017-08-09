/**
 * Created by faraway on 17-8-9.
 */
import React, { Component } from 'react'
import { connect } from 'react-redux'

class Entry extends Component {
  static mapStateToProps ({ index }) {
    return { index }
  }
  render () {
    const { indexData } = this.props.index
    return (
      <div className="">{indexData.shopTypes.join(' ')}</div>
    )
  }
}
export default connect(Entry.mapStateToProps)(Entry)
