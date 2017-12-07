import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push, replace, goBack } from 'react-router-redux'

import {
  fetchShopDetail,
  fetchShopComments,
  commentComment,
  fetchTags,
  uploadImage,
  throwGlobalAlarm,
  comment
} from '../actions'

import Loading from '../components/Loading'
import CommentTopBar from '../components/CommentTopBar'
import MarkSelector from '../components/MarkSelector'
import TagSelector from '../components/TagSelector'
import CommentEditor from '../components/CommentEditor'
import Result from '../components/Result'

import * as wx from '../plugins/wx'

class Comment extends React.Component {
  static mapStateToProps ({ commentTags, uploadedImages, comment }) {
    return {
      tags: commentTags.value.map(tag => tag.tagName) || [],
      isFetching: commentTags.isFetching,

      isUploading: uploadedImages.fetchingCount > 0,
      fetchingCount: uploadedImages.fetchingCount,
      uploadedImages: uploadedImages.value,
      uploadError: uploadedImages.error,

      isCommenting: comment.isCommenting,
      commentError: comment.error
    }
  }

  state = {
    shopScore: 7,
    images: [],
    text: '',
    selectedTags: [],
    success: false
  }

  uploadResolve = () => {}
  commentResolve = () => {}
  uploadReject = () => {}
  commentReject = () => {}

  render () {
    const { shopName } = this.props.match.params
    const { dispatch } = this.props
    if (this.props.isFetching) {
      return <Loading />
    }
    if (this.state.success) {
      return (
        <Result
          status={1}
          title={'感谢评论'}
          text={'您的评论将在我们审核通过之后立刻显示！'}
          buttonTitle={'返回店铺'}
          linkTitle={'返回首页'}
          onButtonClick={() => dispatch(goBack())}
          onLinkClick={() => dispatch(replace(`/`))}
        />
      )
    }
    return (
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <CommentTopBar
          shopName={shopName}
          onSubmit={async () => {
            // console.log(await Promise.all())
            window._czc.push(['_trackEvent', '评论页', '提交', shopName, this.state.images.length > 0 ? '带有图片' : '不带图片'])

            this.state.images.map(image => dispatch(uploadImage(image)))
            if (this.state.images.length > 0) {
              await new Promise((resolve, reject) => {
                this.uploadResolve = resolve
                this.uploadReject = reject
              })
            }
            dispatch(comment(
              shopName,
              this.state.shopScore,
              this.state.text,
              this.state.selectedTags,
              this.state.images.map(image => this.props.uploadedImages[image.id])
            ))
            await new Promise((resolve, reject) => {
              this.commentResolve = resolve
              this.commentReject = reject
            })
            this.setState({ success: true })
          }}
        />
        <MarkSelector
          defaultMark={7}
          onMarkUpdate={mark => this.setState({ shopScore: mark })}
        />
        <TagSelector
          tags={this.props.tags}
          onTagsChange={tags => this.setState({ selectedTags: tags })}
        />
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
    document.title = `评价“${shopName}”`
    wx.wxShare({
      title: `华科优铺邀请你为“${shopName}”`, // 分享标题
      desc: `发现校内优质店铺，\n吐槽校内黑心商家，\n让品质校园生活从华科优铺开始！` // 分享链接
    })
  }

  componentWillReceiveProps (nextProps) {
    const { shopName } = nextProps.match.params
    wx.wxShare({
      title: `华科优铺邀请你为“${shopName}”`, // 分享标题
      desc: `发现校内优质店铺，\n吐槽校内黑心商家，\n让品质校园生活从华科优铺开始！` // 分享链接
    })
    const { dispatch } = this.props
    // 当前未在加载，即将开始加载
    if (!this.props.isUploading && nextProps.isUploading) {
      dispatch(throwGlobalAlarm('开始上传图片...', 'rgb(80,212,103)', 10000000/** 意味无限长 */))
    }

    // 当前仍在加载，即将结束加载
    if (this.props.isUploading && !nextProps.isUploading) {
      console.log(this.props.uploadError)
      if (!nextProps.uploadError) {
        this.uploadResolve()
      } else {
        this.uploadReject('Failed To Upload Image!')
      }
    }

    if (!this.props.isCommenting && nextProps.isCommenting) {
      dispatch(throwGlobalAlarm('提交评价...', 'rgb(80,212,103)'))
    }

    if (this.props.isCommenting && !nextProps.isCommenting) {
      if (!nextProps.commentError) {
        this.commentResolve()
        dispatch(throwGlobalAlarm('评价成功！', 'rgb(80,212,103)'))
      } else {
        this.commentReject('Failed To Submit Comment!')
      }
    }
    if (this.props.match.params.shopName !== nextProps.match.params.shopName) {
      const { shopName } = this.props.match.params
      const { dispatch } = this.props
      dispatch(fetchTags(shopName))
    }
  }
}

export default connect(Comment.mapStateToProps)(Comment)
