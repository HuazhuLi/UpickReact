/**
 * Created by faraway on 17-8-15.
 */
import React, { Component } from 'react'
import { connect } from 'react-redux'

import SwipeShopList from './SwipeShopList'

import { setCurrentShopType, fetchShopsByType, setCurrentShopSubType } from '../actions/index'

class List extends Component {
  componentWillMount () {
    const { type, subtype } = this.props.match.params
    this.props.dispatch(fetchShopsByType(type))
    this.props.dispatch(setCurrentShopType(type))
    subtype && this.props.dispatch(setCurrentShopSubType(subtype))
  }
  componentWillReceiveProps (nextProps) {
    const { type, subtype } = nextProps.match.params
    if (nextProps.match.params.type !== this.props.match.params.type) {
      this.props.dispatch(fetchShopsByType(type))
      this.props.dispatch(setCurrentShopType(type))
    }
    if (nextProps.match.params.subtype !== this.props.match.params.subtype) {
      subtype && this.props.dispatch(setCurrentShopSubType(subtype))
    }
  }
  render () {
    return (
      <SwipeShopList/>
    )
  }
}

export default connect(() => ({}))(List)
