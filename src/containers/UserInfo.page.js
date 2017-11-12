import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import UserInfoHeader from '../components/UserInfoHeader'
import CommentList from '../components/CommentList'
import TicketList from '../components/TicketList'
import TabHeader from '../components/TabHeader'
import Loading from '../components/Loading'
import Swiper from 'react-id-swiper'

import mainStyle from '../style/main.styl'

import { fetchUserInfo, throwGlobalAlarm, fetchAllTickets } from '../actions/index'

class UserInfo extends Component {
  static mapStateToProps ({ userInfo, userTickets }) {
    return {
      isFetching: userInfo.isFetching || userTickets.isFetching,
      nickname: userInfo.nickname,
      headimgurl: userInfo.headimgurl,
      comments: userInfo.comments.map(comment => ({...comment, authorNickname: userInfo.nickname})),
      tickets: userTickets.value
    }
  }

  state = {
    scopeHeight: '100%',
    activeTabIndex: 0
  }

  swiper = null

  heightSet = false

  render () {
    const { dispatch } = this.props
    return (
      <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <UserInfoHeader
          nickname={this.props.nickname}
          headimgurl={this.props.headimgurl}
          commentCount={this.props.comments.length || 0}
          ticketCount={this.props.tickets.length || 0}
        />
        <TabHeader
          tabTitles={['我的评论', '我的卡券']}
          activeIndex={this.state.activeTabIndex}
          onTabChange={index =>
            this.setState(
              { activeTabIndex: index },
              () => this.swiper.slideTo(index)
            )
          }
        />
        <div
          style={{ flexGrow: 1, display: 'flex', height: '100%' }}
          ref={ele => {
            if ((ele instanceof HTMLElement) && !this.heightSet) {
              this.setState({
                scopeHeight: ele.clientHeight + 'px'
              }, () => { this.heightSet = true })
            }
          }}
        >
          {
            this.props.isFetching
              ? <Loading />
              : (
                <Swiper
                  ref={reactSwiper => {
                    this.swiper = reactSwiper && reactSwiper.swiper
                    // this.swiper && this.swiper.slideTo(subtypes.findIndex(value => subtype === value))
                  }}
                  on={{
                    slideChange: () => this.setState({activeTabIndex: this.swiper.activeIndex})
                  }}
                >
                  <div style={{ height: this.state.scopeHeight, overflow: 'auto' }} className={mainStyle['comment-list-no-img']}>
                    <CommentList
                      // 当高度没有设置好的时候，就显示所有评论，会导致外面被撑开
                      comments={this.heightSet ? this.props.comments : []}
                      onScrollIsGreat={() => {}}
                      onScrollIsNotGreat={() => {}}
                      onCommentClick={() => {
                        // this.props.dispatch(commentComment(comment.authorOpenid, comment.issueTime, operation))
                        this.props.dispatch(throwGlobalAlarm('暂时不支持赞/踩自己的评论哦！'))
                      }}
                    />
                  </div>
                  <div style={{ height: this.state.scopeHeight, overflow: 'auto' }}>
                    <TicketList
                      tickets={this.props.tickets}
                      onTicketClick={ticket => dispatch(push(`/detail/${ticket.shopName}`))}
                      onRightActionClick={ticket => dispatch(throwGlobalAlarm('现在不在活动期间!'))}
                    />
                  </div>
                </Swiper>
              )
          }
        </div>
      </div>
    )
  }

  componentWillMount () {
    const { dispatch } = this.props

    document.title = '用户中心'

    dispatch(fetchUserInfo())
    dispatch(fetchAllTickets())
  }
}

export default connect(UserInfo.mapStateToProps)(UserInfo)
