import React, { Component } from 'react'
import { connect } from 'react-redux'
import { replace } from 'react-router-redux'

import { requestDestroy, throwGlobalAlarm } from '../actions'

import DestroyTicket from '../components/DestroyTicket'

class Destroy extends Component {
  static mapStateToProps ({ destroyTicket }) {
    return {
      isFetching: destroyTicket.isFetching
    }
  }

  state = {
    code: ''
  }

  render () {
    return (
      <DestroyTicket
        onConfirm={() => {
          console.log(this.state.code)
          if (!this.state.code || isNaN(this.state.code)) {
            this.props.dispatch(throwGlobalAlarm('优惠券编码无效', '#FFA91E'))
            return
          }
          this.props.dispatch(requestDestroy(this.state.code))
        }}
        onChange={(e) => {
          this.setState({
            code: e.target.value
          })
        }}
        value={this.state.code}
        pending={this.props.isFetching}
      />
    )
  }
}

export default connect(Destroy.mapStateToProps)(Destroy)
