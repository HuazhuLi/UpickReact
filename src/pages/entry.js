/**
 * Created by faraway on 17-8-9.
 */
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'

class Entry extends Component {
  static propTypes = {
    indexData: PropTypes.object.isRequired
  }
  static mapStateToProps ({ indexData }) {
    return { indexData }
  }
  render () {
    const { indexData } = this.props
    return (
      <div className="">{indexData.shopTypes.join(' ')}</div>
    )
  }
}
export default connect(Entry.mapStateToProps)(Entry)
