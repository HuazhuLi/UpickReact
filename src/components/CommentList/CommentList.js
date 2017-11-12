import PropTypes from 'prop-types'
import React from 'react'

import style from './CommentList.styl'

export default class CommentList extends React.Component {
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
    onScrollIsGreat: PropTypes.func.isRequired,
    onScrollIsNotGreat: PropTypes.func.isRequired,
    show: PropTypes.bool
  }

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

  element = null

  render () {
    const { props } = this
    return (
      <ul
        className={style['comments-list']}
        style={{ display: props.show ? 'none' : undefined }}
        onScroll={this.commentListScrollHandler.bind(this)}
        ref={ele => { this.element = ele }}
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
          <p className={style['no-comment']}>尴尬，暂时还没有评论...</p>
        )}
      </ul>
    )
  }

  componentWillReceiveProps (nextProps) {
    if ((this.props.show !== nextProps.show) && !nextProps.show) {
      if (this.element instanceof HTMLElement) {
        setTimeout(() => this.commentListScrollHandler({ target: this.element }))
      }
    }
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
}
