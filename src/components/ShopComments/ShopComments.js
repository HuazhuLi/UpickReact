/**
 * Created by faraway on 17-8-18.
 */
import React from 'react'
import PropTypes from 'prop-types'

import style from './ShopComments.styl'

const ShopComments = (props) => (
  <div style={props.style} className={style['comments']}>
    <div className={style['top-bar']}>
      <span className={style['icon'] + ' ' + style['comment']}/>
      <span
        className={style['text'] + ' ' + (props.activeIndex === 0 ? style['active'] : '')}
        onClick={() => props.onNewClick()}
        children={'最新评论'}
      />
      <span
        className={style['text'] + ' ' + (props.activeIndex === 1 ? style['active'] : '')}
        onClick={() => props.onHotClick()}
        children={'最热评论'}
      />
    </div>
    <ul
      className={style['comments-list']}
      onScroll={(event) => {
        const thisUL = event.target
        if (thisUL.scrollTop >= thisUL.firstChild.clientHeight * 4) {
          props.onScrollIsGreat()
        } else {
          props.onScrollIsNotGreat()
        }
      }}
    >
      {
        props.comments.map((comment, i) => (
          <li key={i}>
            <img src={comment.authorHeadimg}/>
            <div className={style['comment-value']}>
              <div className={style['name']}>
                <div className={style['name-date']}>
                  <span className={style['span-name']}>{comment.authorNickname}</span>
                  <span className={style['span-date']}>{new Date(comment.issueTime).toLocaleDateString()}</span>
                </div>
                <div className={style['like']}>
                  <span className={style['icon'] + ' ' + style['like']}/>
                  <span className={style['value']}>{comment.likeNumber}</span>
                </div>
                <div className={style['dislike']}>
                  <span className={style['icon'] + ' ' + style['dislike']}/>
                  <span className={style['value']}>{comment.dislikeNumber}</span>
                </div>
              </div>
              <div className={style['text']}>
                <p>{comment.commentText}</p>
                <ul className={style['comment-img-ul']}>
                  {
                    (comment.imgs || []).map(img => (
                      <li key={img.msrc}>
                        <img src={img.msrc}/>
                      </li>
                    ))
                  }
                </ul>
              </div>
            </div>
          </li>
        ))
      }
      {
        (!props.comments || props.comments.length <= 0) &&
        <p className={style['no-comment']}>尴尬，暂时还没有人评论...</p>
      }
    </ul>
  </div>
)
ShopComments.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.shape({
    headimgurl: PropTypes.string,
    nickname: PropTypes.string,
    issueTime: PropTypes.number,
    likeNumber: PropTypes.number,
    dislikeNumber: PropTypes.number,
    text: PropTypes.string
  })).isRequired,
  onNewClick: PropTypes.func.isRequired,
  onHotClick: PropTypes.func.isRequired,
  onScrollIsGreat: PropTypes.func.isRequired,
  onScrollIsNotGreat: PropTypes.func.isRequired
}

export default ShopComments
