import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import { fetchShopDetail, fetchShopComments, commentComment } from '../actions'

import CommentTopBar from '../components/CommentTopBar'
import MarkSelector from '../components/MarkSelector'
import TagSelector from '../components/TagSelector'

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
        <TagSelector tags={new Array(30).fill('不好吃').map((value, i) => value + i)}/>
      </div>
    )
  }
}

export default connect(Comment.mapStateToProps)(Comment)
