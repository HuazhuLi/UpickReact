import React, { Component } from 'react'
import { connect } from 'react-redux'
// import { replace } from 'react-router-redux'

import { hideTicketsBox, fetchTicketsByShop } from '../../actions'

import Loading from '../../components/Loading'

import styles from './ReceiveTickets.styl'

class ReceiveTickets extends Component {
  static mapStateToProps = ({ shopDetail, ticketsByShop }) => {
    return {
      shop: shopDetail.value,
      tickets: ticketsByShop.value,
      // comments: shopComments.value,
      // NO_USED_TIME: shopComments.time,
      isFetching: shopDetail.isFetching || ticketsByShop.isFetching
    }
  }
  render () {
    const { show } = this.props
    return (
      <div
        className={styles['rec-ticket-bg'] + ' ' + (show ? '' : styles['hidden'])}
        onClick={() => this.props.dispatch(hideTicketsBox())}
      >
        <div className={styles['rec-ticket-root']} onClick={(e) => e.stopPropagation()}>
          <header className={styles['header']}>
            优惠券信息
          </header>
          {
            this.props.isFetching
              ? (<Loading/>)
              : (
                <ul className={styles['list']}>
                  {this.props.tickets.map((ticket) => this.renderListItem(ticket))}
                </ul>
              )
          }
          <footer className={styles['footer']}>
            <p className={styles['tip']}>明晚11点重新开抢</p>
            <button>完成</button>
          </footer>
        </div>
      </div>
    )
  }

  renderListItem (ticketInfo) {
    return (
      <li className={styles['list-item']} key={ticketInfo.id}>
        <div className={styles['detail-wrapper']}>
          <p className={styles['promotion-info']}>{ticketInfo.discount}</p>
          <p className={styles['duration-info']}>
            {new Date(ticketInfo.startTime).toLocaleDateString()}
            -
            {new Date(ticketInfo.endTime).toLocaleDateString()}
          </p>
        </div>
        <div className={styles['button-wrapper']}>
          {
            !ticketInfo.isReceived
              ? <button
                className={styles['normal']}
                onClick={() => {}}
              >
                领取
              </button>
              : <button className={styles['disabled']}>已领取</button>
          }
        </div>
      </li>
    )
  }

  componentDidMount () {
    this.props.dispatch(fetchTicketsByShop(this.props.shop.shopName))
  }
}

export default connect(ReceiveTickets.mapStateToProps)(ReceiveTickets)
