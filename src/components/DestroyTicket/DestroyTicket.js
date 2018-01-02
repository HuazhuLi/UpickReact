import PropTypes from 'prop-types'
import React from 'react'

import style from './DestroyTicket.styl'

import TicketBgDestroy from '../../assets/destroy_ticket.png'

const DestroyTicket = props => (
  <div className={style['root']}>
    <div className={style['destroy']}>
      <img src={TicketBgDestroy} className={style['scaler']}/>
      <div className={style['content']}>
        <input
          className={style['code']}
          onChange={props.onChange}
          value={props.value}
        />
        <button
          className={style['confirm']}
          onClick={props.onConfirm}
        >
          {
            props.pending
              ? '正在销毁'
              : '销毁'
          }
        </button>
      </div>
    </div>
  </div>
)

export default DestroyTicket
