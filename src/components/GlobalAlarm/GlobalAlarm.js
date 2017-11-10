/**
 * Created by faraway on 17-8-11.
 */
import React, { Component } from 'react'
import { connect } from 'react-redux'

import style from './GlobalAlarm.styl'

class GlobalAlarm extends Component {
  static mapStateToProps ({ globalAlarm }) {
    return {
      color: globalAlarm.alarmColor,
      value: globalAlarm.alarmValue,
      displayTime: globalAlarm.alarmTime,
      thrownTime: globalAlarm.time
    }
  }

  timer = 0

  state = {
    show: false
  }

  render () {
    const props = this.props
    return (
      <div
        style={{ backgroundColor: props.color || '#FF305D' }}
        className={`${style['global-alarm']} ${this.state.show ? style['show'] : ''}`}
      >
        <p>{props.value}</p>
      </div>
    )
  }
  componentWillReceiveProps (nextProps) {
    if (
      nextProps.color /***/!== this.props.color /***/ ||
      nextProps.value /***/!== this.props.value /***/ ||
      nextProps.thrownTime !== this.props.thrownTime
    ) {
      clearTimeout(this.timer)
      this.setState({
        show: true
      })
      this.timer = setTimeout(() => this.setState({ show: false }), nextProps.displayTime)
    }
  }
}
// GlobalAlarm.propTypes = {
//   color: PropTypes.string.isRequired
//   value: PropTypes.string.isRequired
// }

export default connect(GlobalAlarm.mapStateToProps)(GlobalAlarm)
