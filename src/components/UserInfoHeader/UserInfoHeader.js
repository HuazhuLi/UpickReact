import React from 'react'
import PropTypes from 'prop-types'

import style from './UserInfoHeader.styl'

const UserInfoHeader = props =>
  <header className={style['user-info-header']}>
    <h1 className={style['nickname']}>{props.nickname}</h1>
    <img className={style['head-img']} src={props.headimgurl}/>
    <div className={style['comment-ticket-count']}>
      <div className={style['comment-count']}>
        <div>评论数</div>
        <div className={style['number']}>{props.commentCount || 0}</div>
      </div>
      <div className={style['devider']}></div>
      <div className={style['ticket-count']}>
        <div>卡券数</div>
        <div className={style['number']}>{props.ticketCount || 0}</div>
      </div>
    </div>
  </header>

UserInfoHeader.propTypes = {
  nickname: PropTypes.string.isRequired,
  headimgurl: PropTypes.string.isRequired,
  commentCount: PropTypes.number.isRequired,
  ticketCount: PropTypes.number.isRequired
}

export default UserInfoHeader
