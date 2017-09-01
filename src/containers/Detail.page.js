/**
 * Created by faraway on 17-8-18.
 */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import { fetchShopDetail, setCurrentShop } from '../actions'

import ShopDetail from '../components/ShopDetail'
import ShopComments from '../components/ShopComments'
import Loading from '../components/Loading'

class Detail extends Component {
  static mapStateToProps = ({ shopDetail }) => ({
    shop: shopDetail.shops[shopDetail.currentShop],
    comments: shopDetail.comments,
    isLoadingShopDetail: shopDetail.isLoadingShopDetail
  })
  constructor (props) {
    super(props)
    this.state = {
      sortFunc: (comment1, comment2) => comment1.issueTime - comment2.issueTime,
      currentPosition: 0,
      collapsed: false
    }
  }
  render () {
    if ((!this.props.isLoadingShopDetail && this.props.shop)) {
      /**
       * 只有不在加载且 currentShop 所指向的店铺存在
       */
      return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          <ShopDetail
            shop={this.props.shop}
            collapsed={this.state.collapsed}
            style={{ flexShrink: 0 }}
          />
          <ShopComments
            comments={this.props.shop.comments.sort(this.state.sortFunc)}
            activeIndex={this.state.currentPosition}
            style={{ flexGrow: 1 }}
            onNewClick={() =>
              this.setState({
                sortFunc: (comment1, comment2) => comment1.issueTime - comment2.issueTime,
                currentPosition: 0
              })}
            onHotClick={() =>
              this.setState({
                sortFunc: (comment1, comment2) => comment1.likeNumber - comment2.likeNumber,
                currentPosition: 1
              })
            }
            onScrollIsGreat={() => {
              if (this.state.collapsed === false) {
                this.setState({
                  collapsed: true
                })
              }
            }}
            onScrollIsNotGreat={() => {
              if (this.state.collapsed === true) {
                this.setState({
                  collapsed: false
                })
              }
            }}
          />
        </div>
      )
    } else {
      return <Loading/>
    }
  }
  componentWillMount () {
    const { dispatch } = this.props
    dispatch(fetchShopDetail(this.props.match.params.shopName))
    dispatch(setCurrentShop(this.props.match.params.shopName))
  }
  componentWillReceiveProps (nextProps) {
    if (this.props.location.pathname !== nextProps.location.pathname) {
      const { dispatch } = this.props
      dispatch(fetchShopDetail(nextProps.match.params.shopName))
      dispatch(setCurrentShop(nextProps.match.params.shopName))
    }
  }
}

export default connect(Detail.mapStateToProps)(Detail)
