import React, { Component } from 'react'
import { connect } from 'react-redux'

import UserInfoHeader from '../components/UserInfoHeader'
import CommentList from '../components/CommentList'
import TabHeader from '../components/TabHeader'
import Swiper from 'react-id-swiper'

import mainStyle from '../style/main.styl'

import { fetchUserInfo, throwGlobalAlarm, fetchAllTickets } from '../actions/index'

class UserInfo extends Component {
  static mapStateToProps ({ userInfo, userTickets }) {
    return {
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

  heightSet = false

  render () {
    return (
      <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <UserInfoHeader
          nickname={this.props.nickname}
          headimgurl={this.props.headimgurl}
          commentCount={this.props.comments.length}
          ticketCount={this.props.tickets.length}
        />
        <TabHeader
          tabTitles={['我的评论', '我的卡券']}
          activeIndex={this.state.activeTabIndex}
          onTabChange={index => this.setState({ activeTabIndex: index })}
        />
        <div
          style={{ flexGrow: 1 }}
          ref={ele => {
            if ((ele instanceof HTMLElement) && !this.heightSet) {
              this.setState({
                scopeHeight: ele.clientHeight + 'px'
              })
              this.heightSet = true
            }
          }}
        >
          <Swiper>
            <div style={{ height: this.state.scopeHeight, overflow: 'auto' }} className={mainStyle['comment-list-no-img']}>
              <CommentList
                comments={this.props.comments}
                onScrollIsGreat={() => {}}
                onScrollIsNotGreat={() => {}}
                onCommentClick={() => {
                  // this.props.dispatch(commentComment(comment.authorOpenid, comment.issueTime, operation))
                  this.props.dispatch(throwGlobalAlarm('暂时不支持赞/踩自己的评论哦！'))
                }}
              />
            </div>
            <div>
              <CommentList
                comments={[]}
                onScrollIsGreat={() => {}}
                onScrollIsNotGreat={() => {}}
              />
            </div>
          </Swiper>
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
