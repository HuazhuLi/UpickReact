/**
 * Created by faraway on 17-8-15.
 */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push, replace } from 'react-router-redux'
import Swiper from 'react-id-swiper'

import { setCurrentShopSubType } from '../actions'

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

  swipeWrapper = null
  swiper = null

  state = {
    listHeight: 0
  }

  render () {
    const { dispatch } = this.props
    const type = this.props.currentShopType
    const subtypes = (this.props.shopsByType[type] || {}).shopsBySubtypes || []
    const subtype = this.props.currentShopSubType
    // if (subtype === '') {
    //   dispatch(setCurrentShopSubType(subtypes[0]))
    // }
    if (this.props.isLoadingShopsByType) {
      return <Loading/>
    } else {
      return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          <ListTopBar
            subtypes={subtypes}
            style={{ flexShrink: '0' }}
            activeIndex={(subtypes.findIndex(value => subtype === value) + 1 || 1) - 1}
            onSubtypeClick={index => {
              // this.setState({
              //   currentSubtypeIndex: index
              // })
              this.swiper.slideTo(index)
            }}
            onSearchButtonClick={() => this.props.dispatch(push('/search'))}
          />
          <div
            style={{ flexGrow: '1', overflowY: 'auto' }}
            ref={(a) => {
              /**
               * 仅仅在第一次setState, 否则会爆栈
               */
              if (!this.swipeWrapper) {
                this.swipeWrapper = a
                this.setState({
                  listHeight: this.swipeWrapper.clientHeight
                })
              }
            }}
          >
            <Swiper
              ref={reactSwiper => {
                this.swiper = reactSwiper && reactSwiper.swiper
                this.swiper && this.swiper.slideTo(subtypes.findIndex(value => subtype === value))
              }}
              on={{
                slideChange: () => dispatch(setCurrentShopSubType(subtypes[this.swiper.activeIndex]))
              }}
              lazy={true}
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
                          <ShopListItem
                            shop={shop}
                            key={i}
                            onShopClick={() => {
                              dispatch(replace(`/list/${type}/${subtype}`))
                              dispatch(push(`/detail/${shop.shopName}`))
                            }}
                          />
                        ))
                    }
                  </ShopList>
                ))
              }
            </Swiper>
          </div>
        </div>
      )
    }
  }
}

export default connect(SwipeShopList.mapStateToProps)(SwipeShopList)
