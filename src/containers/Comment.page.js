import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import { fetchShopDetail, fetchShopComments, commentComment } from '../actions'

import CommentTopBar from '../components/CommentTopBar'
import MarkSelector from '../components/MarkSelector'

class Comment extends React.Component {
  static mapStateToProps () {
    return {}
  }
  render () {
    const { shopName } = this.props.match.params
    return (
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <CommentTopBar shopName={shopName} onSubmit={() => console.log('aa')}/>
        <MarkSelector onMarkUpdate={mark => console.log(mark)}/>
      </div>
    )
  }
}

export default connect(Comment.mapStateToProps)(Comment)
