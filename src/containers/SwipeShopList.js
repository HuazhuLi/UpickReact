/**
 * Created by faraway on 17-8-15.
 */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import SwipeableViews from 'react-swipeable-views'

import ShopList from '../components/ShopList'
import ShopListItem from '../components/ShopListItem'
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
    const subtypes = Object.keys(this.props.shopsByTypes[type] || {})
    return (
      <div>
        <ListTopBar subtypes={subtypes}/>
        <SwipeableViews>
          {
            subtypes.map((subtype) => (
              <ShopList inLoadingStatus={this.props.isLoadingShopsByType} key={subtype}>
                {
                  this.props.shopsByTypes[type][subtype].map((shop, i) => (
                    <ShopListItem shop={shop} key={i} onShopClick={() => {}}/>
                  ))
                }
              </ShopList>
            ))
          }
        </SwipeableViews>
      </div>
    )
  }
}

export default connect(SwipeShopList.mapStateToProps)(SwipeShopList)
