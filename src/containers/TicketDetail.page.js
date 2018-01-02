import React, { Component } from 'react'
import { connect } from 'react-redux'

import { fetchShopDetail, fetchTicketByCode, throwGlobalAlarm } from '../actions'

import Loading from '../components/Loading'
import TicketDetail from '../components/TicketDetail'

class TicketDetailPage extends Component {
  static mapStateToProps ({ shopDetail, ticketDetail }) {
    return {
      shop: shopDetail.value,
      ticket: ticketDetail.value,
      isFetching: shopDetail.isFetching || ticketDetail.isFetching,
      error: shopDetail.error || ticketDetail.error
    }
  }

  render () {
    if (this.props.isFetching || this.props.error || this.props.shop.shopName === '...') {
      return <Loading/>
    }
    return (
      <TicketDetail
        shopDetail={this.props.shop}
        ticketDetail={this.props.ticket}
        code={this.props.match.params.code}
      />
    )
  }

  componentWillMount () {
  }
  componentDidMount () {
    this.fetchDetail(this.props.match.params.code)
    // this.props.dispatch(fetchShopDetail())
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.match.params.code !== nextProps.match.params.code) {
      this.fetchDetail(nextProps.match.params.code)
    }
  }

  fetchDetail (code) {
    const {dispatch} = this.props
    dispatch(fetchTicketByCode(code))
      .then(({ payload: {shopName} }) => dispatch(fetchShopDetail(shopName)))
      .catch(() => dispatch(throwGlobalAlarm('加载失败!')))
  }
}

export default connect(TicketDetailPage.mapStateToProps)(TicketDetailPage)
