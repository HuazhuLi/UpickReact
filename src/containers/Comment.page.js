import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import { fetchShopDetail, fetchShopComments, commentComment } from '../actions'

class Comment extends React.Component {
  static mapStateToProps () {
    return {}
  }

  render () {
    const { shopName } = this.props.match.params
    return (
      <div className="top-bar">
        <h1>集锦园食堂</h1>
        <button className="submit">发表</button>
      </div>
    )
  }
}

export default connect(Comment.mapStateToProps)(Comment)
