/**
 * Created by faraway on 17-8-15.
 */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import ShopList from '../components/ShopList'
import ListTopBar from '../components/ListTopBar'

class SwipeShopList extends Component {
  static mapStateToProps = function ({ shopsByTypes }) {
    return {
      shopsByTypes: shopsByTypes.shopsByTypes,
      isLoadingShopsByType: shopsByTypes.isLoadingShopsByType,
      currentShopType: shopsByTypes.currentShopType
    }
  }
  render () {
    const type = this.props.currentShopType
    return (
      <div>
        {/*<ListTopBar subtypes={this.props.shopsByTypes[type]}/>*/}
      </div>
    )
  }
}

export default connect(SwipeShopList.mapStateToProps)(SwipeShopList)
