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
      show: globalAlarm.show
    }
  }
  render () {
    const props = this.props
    return (
      <div
        style={{ backgroundColor: props.color }}
        className={`${style['global-alarm']} ${props.show ? style['show'] : ''}`}
      >
        <p>{props.value}</p>
      </div>
    )
  }
}
// GlobalAlarm.propTypes = {
//   color: PropTypes.string.isRequired,
//   value: PropTypes.string.isRequired
// }

export default connect(GlobalAlarm.mapStateToProps)(GlobalAlarm)
