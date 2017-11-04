/**
 * Created by faraway on 17-8-18.
 */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import { fetchShopDetail, fetchShopComments, commentComment } from '../actions'

import ShopDetail from '../components/ShopDetail'
import ShopComments from '../components/ShopComments'
import FloatButton from '../components/FloatButton'
import Loading from '../components/Loading'

class Detail extends Component {
  static mapStateToProps = ({ shopDetail, shopComments }) => {
    return {
      shop: shopDetail.value,
      comments: shopComments.value,
      NO_USED_TIME: shopComments.time,
      isFetching: shopDetail.isFetching || shopComments.isFetching
    }
  }
  constructor (props) {
    super(props)
    this.state = {
      sortFunc: (comment1, comment2) => comment1.issueTime - comment2.issueTime,
      currentPosition: 0,
      collapsed: false
    }
  }
  render () {
    if ((!this.props.isFetching && this.props.shop)) {
      /**
       * 只有不在加载且店铺存在
       */
      return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          <ShopDetail
            shop={this.props.shop}
            collapsed={this.state.collapsed}
            style={{ flexShrink: 0 }}
          />
          <ShopComments
            comments={this.props.comments.sort(this.state.sortFunc)}
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
          <FloatButton onClick={() => this.props.dispatch(push(`/comment/${this.props.shop.shopName}`))}/>
        </div>
      )
    } else {
      // fullpage loading
      return <Loading/>
    }
  }
  componentWillMount () {
    const { dispatch } = this.props
    dispatch(fetchShopDetail(this.props.match.params.shopName))
    dispatch(fetchShopComments(this.props.match.params.shopName))
    // dispatch(setCurrentShop(this.props.match.params.shopName))
  }
  componentWillReceiveProps (nextProps) {
    if (this.props.location.pathname !== nextProps.location.pathname) {
      const { dispatch } = this.props
      dispatch(fetchShopDetail(nextProps.match.params.shopName))
      dispatch(fetchShopComments(nextProps.match.params.shopName))
      // dispatch(setCurrentShop(nextProps.match.params.shopName))
    }
  }
}

export default connect(Detail.mapStateToProps)(Detail)
