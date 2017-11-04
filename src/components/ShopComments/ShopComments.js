/**
 * Created by faraway on 17-8-18.
 */
import React from 'react'
import PropTypes from 'prop-types'

import style from './ShopComments.styl'

// const ShopComments = props => (

// )

export default class ShopComments extends React.Component {
  static propTypes = {
    comments: PropTypes.arrayOf(
      PropTypes.shape({
        headimgurl: PropTypes.string,
        nickname: PropTypes.string,
        issueTime: PropTypes.number,
        likeNumber: PropTypes.number,
        dislikeNumber: PropTypes.number,
        text: PropTypes.string
      })
    ).isRequired,
    onNewClick: PropTypes.func.isRequired,
    onHotClick: PropTypes.func.isRequired,
    onScrollIsGreat: PropTypes.func.isRequired,
    onScrollIsNotGreat: PropTypes.func.isRequired,
    onCommentClick: PropTypes.func.isRequired
  }

  commentListUl = []

  state = {
    comments: this.props.comments.map(
      comment =>
        /** 既不顶也不踩：0 */
        !comment.liked && !comment.disliked
          ? 0
          : comment.liked
            /** 顶 */
            ? 1
            /** 踩 */
            : -1
    )
    // /** 评论列表最新(左侧)的scrollTop */
    // leftScrollTop: 0,
    // /** 评论列表最热(右侧)的scrollTop */
    // rightScrollTop: 0
  }

  componentWillReceiveProps (nextProps) {
    this.setState({
      comments: this.props.comments.map(
        comment =>
          /** 既不顶也不踩：0 */
          !comment.liked && !comment.disliked
            ? 0
            : comment.liked
              /** 顶 */
              ? 1
              /** 踩 */
              : -1
      )
    })
  }

  commentListScrollHandler = event => {
    const thisUL = event.target
    if (thisUL instanceof HTMLElement) {
      /** 简单的以第一个评论高度的四倍为阈值 */
      if (thisUL.scrollTop >= thisUL.firstChild.clientHeight * 4) {
        /** 触发滑动很多 */
        this.props.onScrollIsGreat()
      } else {
        /** 触发滑动不是太多 */
        this.props.onScrollIsNotGreat()
      }
    }
  }

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
              (props.activeIndex === 0 ? style['active'] : '')
            }
            onClick={() => {
              props.onNewClick()
              setTimeout(() => this.commentListScrollHandler({ target: this.commentListUl[this.props.activeIndex] }))
            }}
            children={'最新评论'}
          />
          <span
            className={
              style['text'] +
              ' ' +
              (props.activeIndex === 1 ? style['active'] : '')
            }
            onClick={() => {
              props.onHotClick()
              setTimeout(() => this.commentListScrollHandler({ target: this.commentListUl[this.props.activeIndex] }))
            }}
            children={'最热评论'}
          />
        </div>
        {[0, 1].map(number =>
          <ul
            key={number}
            style={{ display: props.activeIndex !== number ? 'none' : undefined }}
            className={style['comments-list']}
            onScroll={this.commentListScrollHandler}
            ref={ele => { this.commentListUl[number] = ele }}
          >
            {props.comments.map((comment, i) => (
              <li key={i}>
                {/**
                        * 最烦人的就是这些该死的html标签，
                        * 很影响代码美观，但是属性很多有没有办法
                        */ }
                <img src={comment.authorHeadimg} />
                <div className={style['comment-value']}>
                  <div className={style['name']}>
                    <div className={style['name-date']}>
                      <span className={style['span-name']}>
                        {comment.authorNickname}
                      </span>
                      <span className={style['span-date']}>
                        {new Date(comment.issueTime).toLocaleDateString()}
                      </span>
                    </div>
                    <div className={style['like']}>
                      <span
                        className={
                          style['icon'] +
                                ' ' +
                                (this.state.comments[i] === 1
                                  ? style['liked']
                                  : style['like'])
                        }
                        onClick={() => {
                          const newComments = [...this.state.comments]
                          newComments[i] = newComments[i] === 1 ? 0 : 1
                          this.props.onCommentClick(comment, newComments[i])
                          this.setState({ comments: newComments })
                        }}
                      />
                      <span className={style['value']}>
                        {comment.likeNumber +
                                /**
                                 * 这里以原始的comment为基数，根据原始的
                                 * 顶/踩情况(liked/disliked)和当前的状
                                 * 态计算出最终数量
                                 **/
                                (this.state.comments[i] !== 1 && comment.liked
                                  ? -1
                                  : this.state.comments[i] === 1 && !comment.liked
                                    ? 1
                                    : 0
                                )
                        }
                      </span>
                    </div>
                    <div className={style['dislike']}>
                      <span
                        className={
                          style['icon'] +
                                ' ' +
                                (this.state.comments[i] === -1
                                  ? style['disliked']
                                  : style['dislike'])
                        }
                        onClick={() => {
                          const newComments = [...this.state.comments]
                          newComments[i] = newComments[i] === -1 ? 0 : -1
                          this.props.onCommentClick(comment, newComments[i])
                          this.setState({ comments: newComments })
                        }}
                      />
                      <span className={style['value']}>
                        {comment.dislikeNumber +
                                (this.state.comments[i] !== -1 && comment.disliked
                                  ? -1
                                  : this.state.comments[i] === -1 && !comment.disliked
                                    ? 1
                                    : 0)}
                      </span>
                    </div>
                  </div>
                  <div className={style['text']}>
                    <p>{comment.commentText}</p>
                    <ul className={style['comment-img-ul']}>
                      {(comment.imgs || []).map(img => (
                        <li key={img.msrc}>
                          <img src={img.msrc} />
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </li>
            ))}
            {(!props.comments || props.comments.length <= 0) && (
              <p className={style['no-comment']}>尴尬，暂时还没有人评论...</p>
            )}
          </ul>
        )}
      </div>
    )
  }
}
