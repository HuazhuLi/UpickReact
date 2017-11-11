/**
 * Created by faraway on 17-8-18.
 */
import React from 'react'
import PropTypes from 'prop-types'

import style from './ShopComments.styl'

import CommentList from '../CommentList'

// const ShopComments = props => (

// )

export default class ShopComments extends React.Component {
  static propTypes = {
    onCommentClick: PropTypes.func.isRequired
  }

  sortFunc = [
    (comment1, comment2) => comment2.issueTime - comment1.issueTime,
    (comment1, comment2) => comment2.likeNumber - comment1.likeNumber
  ]

  state = {
    currentTab: 0
    // comments: this.props.comments.sort(this.sortFunc[0]).map(
    //   comment =>
    //     /** 既不顶也不踩：0 */
    //     !comment.liked && !comment.disliked
    //       ? 0
    //       : comment.liked
    //         /** 顶 */
    //         ? 1
    //         /** 踩 */
    //         : -1
    // )
    // /** 评论列表最新(左侧)的scrollTop */
    // leftScrollTop: 0,
    // /** 评论列表最热(右侧)的scrollTop */
    // rightScrollTop: 0
  }

  // componentWillReceiveProps (nextProps) {
  //   this.setState({
  //     // comments: this.props.comments.sort(this.sortFunc[this.state.currentTab]).map(
  //     //   comment =>
  //     //     /** 既不顶也不踩：0 */
  //     //     !comment.liked && !comment.disliked
  //     //       ? 0
  //     //       : comment.liked
  //     //         /** 顶 */
  //     //         ? 1
  //     //         /** 踩 */
  //     //         : -1
  //     // )
  //   })
  // }

  /**
   * 评论列表的顶踩逻辑的实现主要是：
   * 设置operation：1：顶；0：什么也没有；-1：踩；
   * 每个评论用户只能有一种操作，对应三种可能：
   * 根绝是否已经赞过和operation，可以确定顶或者踩
   * 的最终数量
   */
  render () {
    const props = this.props
    return (
      <div style={props.style} className={style['comments']}>
        <div className={style['top-bar']}>
          <span className={style['icon'] + ' ' + style['comment']} />
          <span
            className={
              style['text'] +
              ' ' +
              (this.state.currentTab === 0 ? style['active'] : '')
            }
            onClick={() => {
              this.setState({
                currentTab: 0
              })
              // props.onNewClick()
              // setTimeout(() => this.commentListScrollHandler({ target: this.commentListUl[this.props.activeIndex] }))
            }}
            children={'最新评论'}
          />
          <span
            className={
              style['text'] +
              ' ' +
              (this.state.currentTab === 1 ? style['active'] : '')
            }
            onClick={() => {
              this.setState({
                currentTab: 1
              })
              // props.onHotClick()
              // setTimeout(() => this.commentListScrollHandler({ target: this.commentListUl[this.props.activeIndex] }))
            }}
            children={'最热评论'}
          />
        </div>
        {[0, 1].map(number =>
          <CommentList
            key={number}
            comments={this.props.comments.sort(this.sortFunc[this.state.currentTab])}
            show={this.state.currentTab === number}
            onScrollIsGreat={this.props.onScrollIsGreat}
            onScrollIsNotGreat={this.props.onScrollIsNotGreat}
            onCommentClick={this.props.onCommentClick}
          />
        )}
      </div>
    )
  }
}
