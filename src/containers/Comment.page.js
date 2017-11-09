import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import { fetchShopDetail, fetchShopComments, commentComment, fetchTags } from '../actions'

import CommentTopBar from '../components/CommentTopBar'
import MarkSelector from '../components/MarkSelector'
import TagSelector from '../components/TagSelector'
import CommentEditor from '../components/CommentEditor'

class Comment extends React.Component {
  static mapStateToProps ({ commentTags }) {
    return {
      tags: commentTags.value.map(tag => tag.tagName) || [],
      isFetching: commentTags.isFetching
    }
  }

  state = {
    images: [],
    text: ''
  }

  render () {
    const { shopName } = this.props.match.params
    return (
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <CommentTopBar
          shopName={shopName}
          onSubmit={() => console.log('aa')}
        />
        <MarkSelector
          defaultMark={7}
          onMarkUpdate={mark => console.log(mark)}
        />
        <TagSelector tags={this.props.tags}/>
        <CommentEditor
          value={this.state.text}
          onChange={e => this.setState({ text: e.target.value })}
          onImagesChange={images => this.setState({ images })}
        />
      </div>
    )
  }

  componentWillMount () {
    const { shopName } = this.props.match.params
    const { dispatch } = this.props
    dispatch(fetchTags(shopName))
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.match.params.shopName !== nextProps.match.params.shopName) {
      const { shopName } = this.props.match.params
      const { dispatch } = this.props
      dispatch(fetchTags(shopName))
    }
  }
}

export default connect(Comment.mapStateToProps)(Comment)
