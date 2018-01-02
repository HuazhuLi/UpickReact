/**
 * Created by faraway on 17-8-18.
 */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import { fetchShopDetail, fetchShopComments, commentComment, showTicketsBox } from '../actions'

import ShopDetail from '../components/ShopDetail'
import ShopComments from '../components/ShopComments'
import FloatButton from '../components/FloatButton'
import Loading from '../components/Loading'
import ReceiveTickets from '../components/ReceiveTickets'

import * as wx from '../plugins/wx'

class Detail extends Component {
  static mapStateToProps = ({ shopDetail, shopComments, ticketBox }) => {
    return {
      shop: shopDetail.value,
      comments: shopComments.value,
      NO_USED_TIME: shopComments.time,
      isFetching: shopDetail.isFetching || shopComments.isFetching,

      ticketsBoxOpen: ticketBox.open
    }
  }
  constructor (props) {
    super(props)
    this.state = {
      collapsed: false
    }
  }
  render () {
    if ((!this.props.isFetching && this.props.shop.shopName !== '...')) {
      /**
       * 只有不在加载且店铺存在
       */
      if (window.location.search.indexOf('fromqrcode') >= 0) {
        window._czc.push(['_trackEvent',
          '二维码埋点',
          '详情页面-' + (this.props.shop.isAuth ? '认证商家' : '未认证'),
          this.props.shop.shopName
        ])
      }
      return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          <ShopDetail
            shop={this.props.shop}
            collapsed={this.state.collapsed}
            style={{ flexShrink: 0 }}
            onRecTicketsClick={() => this.props.dispatch(showTicketsBox())}
            hasActivity={this.props.shop.hasActivity}
          />
          <ShopComments
            comments={this.props.comments}
            // activeIndex={this.state.currentPosition}
            style={{ flexGrow: 1 }}
            /*
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
            */
            /**
             * 滚动的很大
             */
            onScrollIsGreat={() => {
              if (this.state.collapsed === false) {
                this.setState({
                  collapsed: true
                })
              }
            }}
            /**
             * 滚动的不是很大
             */
            onScrollIsNotGreat={() => {
              if (this.state.collapsed === true) {
                this.setState({
                  collapsed: false
                })
              }
            }}

            onCommentClick={(comment, operation) => {
              this.props.dispatch(commentComment(comment.authorOpenid, comment.issueTime, operation))
            }}
          />
          <FloatButton onClick={() => {
            this.props.dispatch(push(`/comment/${this.props.shop.shopName}`))
            window._czc.push(['_trackEvent', '详情页', this.props.shop.shopName, '评论', '点击'])
          }}/>
          {
            this.props.shop.hasActivity &&
            <ReceiveTickets show={this.props.ticketsBoxOpen}/>
          }
        </div>
      )
    } else {
      // fullpage loading
      return <Loading/>
    }
  }
  componentWillMount () {
    document.title = '商家详情'

    const { dispatch } = this.props
    dispatch(fetchShopDetail(this.props.match.params.shopName))
    dispatch(fetchShopComments(this.props.match.params.shopName))
    // dispatch(setCurrentShop(this.props.match.params.shopName))
  }
  componentWillReceiveProps (nextProps) {
    const { shopName } = nextProps.match.params
    const shop = nextProps.shop
    try {
      wx.wxShare({
        title: `“${shopName}”等你来评!`, // 分享标题
        desc: `营业时间为${shop.openTime}，位于${shop.shopAddress}，评分${parseInt(shop.shopScore)}分。`, // 分享链接
        imgUrl: shop.imgs[0].msrc.indexOf('hustonline.net') >= 0
          ? shop.imgs[0].msrc
          : window.location.href.split('#')[0] + shop.imgs[0].msrc
      })
    } catch (e) {}
    if (this.props.location.pathname !== nextProps.location.pathname) {
      const { dispatch } = this.props
      dispatch(fetchShopDetail(nextProps.match.params.shopName))
      dispatch(fetchShopComments(nextProps.match.params.shopName))
      // dispatch(setCurrentShop(nextProps.match.params.shopName))
    }
  }
}

export default connect(Detail.mapStateToProps)(Detail)
