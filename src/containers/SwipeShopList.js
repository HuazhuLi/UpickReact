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
import Loading from '../components/Loading'

class SwipeShopList extends Component {
  static mapStateToProps = function ({ shops }) {
    return {
      ...shops
    }
  }
  constructor (props) {
    super(props)
    this.swipeWrapper = null
    this.state = {
      listHeight: 0,
      currentSubtypeIndex: 0
    }
  }
  render () {
    const { dispatch } = this.props
    const type = this.props.currentShopType
    const subtypes = (this.props.shopsByType[type] || {}).shopsBySubtypes || []
    console.log(subtypes)
    if (this.props.isLoadingShopsByType) {
      return <Loading/>
    } else {
      return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          <ListTopBar
            subtypes={subtypes}
            style={{ flexShrink: '0' }}
            activeIndex={this.state.currentSubtypeIndex}
            onSubtypeClick={(index) => {
              this.setState({
                currentSubtypeIndex: index
              })
            }}
            onSearchButtonClick={() => this.props.dispatch(push('/search'))}
          />
          <div
            style={{ flexGrow: '1', overflowY: 'auto' }}
            ref={(a) => {
              /**
               * 仅仅在第一次setState, 否则会不断爆栈
               */
              if (!this.swipeWrapper) {
                this.swipeWrapper = a
                this.setState({
                  listHeight: this.swipeWrapper.clientHeight
                })
              }
            }}
          >
            <SwipeableViews
              resistance={true}
              index={this.state.currentSubtypeIndex}
              onChangeIndex={(to, from) => this.setState({ currentSubtypeIndex: to })}
            >
              {
                subtypes.map((subtype, i) => (
                  <ShopList
                    key={subtype}
                    style={{ height: this.state.listHeight + 'px' }}
                  >
                    {
                      this.props.shopsBySubtype[subtype].shopList
                        .map(id => this.props.shops[id])
                        .map((shop, i) => (
                          <ShopListItem shop={shop} key={i} onShopClick={() => dispatch(push(`/detail/${shop.shopName}`))}/>
                        ))
                    }
                  </ShopList>
                ))
              }
            </SwipeableViews>
          </div>
        </div>
      )
    }
  }
}

export default connect(SwipeShopList.mapStateToProps)(SwipeShopList)
