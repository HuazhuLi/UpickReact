import PropTypes from 'prop-types'
import React from 'react'

import style from './TicketDetail.styl'

import TicketBgBottom from '../../assets/ticket_bg_bottom.png'

const TicketDetail = props => (
  <div className={style['root']}>
    <div className={style['detail']}>
      <div
        className={style['logo']}
        style={{ backgroundImage: `url(${props.shopDetail.imgs[0].msrc})` }}>
      </div>
      <h1 className={style['title']}>
        {props.shopDetail.shopName}
      </h1>
      <p className={style['discount']}>
        {props.ticketDetail.discount}
      </p>
      <p className={style['duration']}>
        {new Date(props.ticketDetail.startTime).toLocaleDateString()}
        {' - '}
        {new Date(props.ticketDetail.endTime).toLocaleDateString()}
      </p>
      <p></p>
    </div>
    <div className={style['code']}>
      <img src={TicketBgBottom}/>
      <h2 className={style['number']}>No.{props.code}</h2>
    </div>
  </div>
)

export default TicketDetail
