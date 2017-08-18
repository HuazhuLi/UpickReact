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
      <span className={style['text'] + ' ' + style['active']}>最新评论</span>
      <span className={style['text']}>最热评论</span>
    </div>
    <ul className={style['comments-list']}>
      {
        props.comments.map((comment, i) => (
          <li key={i}>
            <img src={comment.headimgurl}/>
            <div className={style['comment-value']}>
              <div className={style['name']}>
                <div className={style['name-date']}>
                  <span className={style['span-name']}>{comment.authorNickname}</span>
                  <span className={style['span-date']}>{new Date(comment.issueTime * 1000).toLocaleDateString()}</span>
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
                <p>{comment.text}</p>
                <ul/>
              </div>
            </div>
          </li>
        ))
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
  })).isRequired
}

export default ShopComments
