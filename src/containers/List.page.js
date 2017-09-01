/**
 * Created by faraway on 17-8-15.
 */
import React, { Component } from 'react'
import { connect } from 'react-redux'

import SwipeShopList from './SwipeShopList'

import { setCurrentShopType, fetchShopsByType } from '../actions/index'

class List extends Component {
  componentWillMount () {
    const { type } = this.props.match.params
    this.props.dispatch(fetchShopsByType(type))
    this.props.dispatch(setCurrentShopType(type))
  }
  componentWillReceiveProps (nextProps) {
    if (nextProps.location.pathname !== this.props.location.pathname) {
      const { type } = nextProps.match.params
      this.props.dispatch(fetchShopsByType(type))
      this.props.dispatch(setCurrentShopType(type))
    }
  }
  render () {
    return (
      <SwipeShopList/>
    )
  }
}

export default connect(() => ({}))(List)
