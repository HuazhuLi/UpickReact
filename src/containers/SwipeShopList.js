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
  constructor (props) {
    super(props)
    this.swipeInstance = {}
    this.state = {
      listHeight: 0,
      currentSubtypeIndex: 0
    }
  }
  render () {
    const type = this.props.currentShopType
    const subtypes = Object.keys(this.props.shopsByTypes[type] || {})
    return (
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <ListTopBar
          subtypes={subtypes}
          style={{ flexShrink: '0' }}
          activeIndex={this.state.currentSubtypeIndex}
        />
        <SwipeableViews
          style={{ flexGrow: '1', overflowY: 'auto' }}
          ref={(a) => { this.swipeInstance = a }}
          resistance={true}
        >
          {
            subtypes.map((subtype, i) => (
              <ShopList
                inLoadingStatus={this.props.isLoadingShopsByType}
                key={subtype}
                style={{ height: this.state.listHeight + 'px' }}
              >
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
  componentDidMount () {
    this.setState({
      listHeight: this.swipeInstance.containerNode.parentNode.clientHeight
    })
  }
}

export default connect(SwipeShopList.mapStateToProps)(SwipeShopList)
