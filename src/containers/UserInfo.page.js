import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push, replace } from 'react-router-redux'

import UserInfoHeader from '../components/UserInfoHeader'
import CommentList from '../components/CommentList'
import TicketList from '../components/TicketList'
import TabHeader from '../components/TabHeader'
import Loading from '../components/Loading'
import Swiper from 'react-id-swiper'

import mainStyle from '../style/main.styl'

import { fetchUserInfo, throwGlobalAlarm, fetchAllTickets, comment } from '../actions/index'

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
    const comments = this.heightSet ? this.props.comments : []
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
          activeIndex={this.state.activeTabIndex || 0}
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
                      comments={comments.map(comment => (
                        {
                          ...comment,
                          authorNickname: comment.shopName
                        }
                      ))}
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
                      onTicketClick={ticket => {
                        if (ticket.endTime > Date.now()) {
                          dispatch(replace(`/mine/1`))
                          dispatch(push(`/ticket/${ticket.code}`))
                        } else {
                          dispatch(throwGlobalAlarm('该卡券已过期!'))
                        }
                      }}
                      // onRightActionClick={ticket => dispatch(push(`/ticket/${ticket.code}`))}
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

    // if (!this.props.match.params.index) {
    //   dispatch(replace('/mine/0'))
    // }

    dispatch(fetchUserInfo())
    dispatch(fetchAllTickets())
  }

  componentDidMount () {
    const index = Number(this.props.match.params.index)
    this.changeTab(index)
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.match.params.index !== this.props.match.params.index) {
      this.changeTab(Number(nextProps.match.params.index))
    }
  }

  changeTab (index) {
    this.setState(
      { activeTabIndex: index }
    )
    setTimeout(() => {
      this.swiper.slideTo(index, 0)
    }, 500)
  }
}

export default connect(UserInfo.mapStateToProps)(UserInfo)
