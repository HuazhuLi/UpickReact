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

  areas = ['东', '中', '西']

  state = {
    listHeight: 0,
    areaIndex: ['全', ...this.areas].join('').indexOf(this.props.initialAreaIndex) || 0
  }

  render () {
    // console.log(this.state.areaIndex)
    // console.log(this.props.initialAreaIndex)
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
              window._czc.push(['_trackEvent', '列表页', '子类Tab', subtypes[index], '点击'])
            }}
            locationIndex={this.state.areaIndex}
            onLocationChange={areaIndex => {
              this.setState({ areaIndex })
              window._czc.push(['_trackEvent', '列表页', '地域Tab', this.areas[areaIndex - 1], '点击'])
            }}
            onSearchButtonClick={() => {
              this.props.dispatch(push('/search'))
              window._czc.push(['_trackEvent', '列表页', '搜索', '点击'])
            }}
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
                this.swiper && this.swiper.slideTo(subtypes.findIndex(value => subtype === value), 0)
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
                        .map(shop => {
                          shop.shopArea = shop.shopArea || '东'
                          return shop
                        })
                        .filter(shop =>
                          this.state.areaIndex === 0 || // 全部
                          shop.shopArea.indexOf(this.areas[this.state.areaIndex - 1]) >= 0 // 东中西
                        )
                        .map((shop, i) => (
                          <ShopListItem
                            shop={shop}
                            key={shop.shopName + i}
                            onShopClick={() => {
                              // replace this history to save area information
                              dispatch(replace(`/list/${type}/${subtype}/${this.areas[this.state.areaIndex - 1] || '全'}`))
                              dispatch(push(`/detail/${shop.shopName}`))
                              window._czc.push(['_trackEvent', '列表页', '店铺列表', shop.shopName, '点击'])
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
