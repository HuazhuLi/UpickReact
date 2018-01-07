import React from 'react'
import PropTypes from 'prop-types'

import style from './TicketList.styl'

const TicketList = props =>
  <ul className={style['ticket-list']}>
    {
      (props.tickets || []).map(ticket =>
        <li
          className={[
            style['single-ticket'],
            (ticket.endTime < Date.now() ? style['out-of-date'] : ''),
            (!ticket.valid ? style['destroyed'] : '')
          ].join(' ')}
          key={ticket.id}
          onClick={() => props.onTicketClick(ticket)}
        >
          <div className={style['shop-info-wrapper']}>
            <img src={(ticket.shopImg[0] || {}).msrc} className={style['shop-icon']}/>

            <div className={style['text-info']}>
              <h1>{ticket.shopName}</h1>
              <span className={style['promotion-info']}>{ticket.discount}</span>
              <span className={style['duration-info']}>
                {ticket.startTime ? new Date(ticket.startTime).toLocaleDateString() : '???'}
                {' - '}
                {ticket.endTime ? new Date(ticket.endTime).toLocaleDateString() : '???'}
              </span>
            </div>

            <div
              className={style['right-action']}
              onClick={event => {
                event.stopPropagation()
                props.onRightActionClick(ticket)
              }}
            />
          </div>
        </li>
      )
    }
  </ul>

export default TicketList
