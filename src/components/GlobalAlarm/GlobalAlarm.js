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
  constructor (props) {
    super(props)
    this.timer = 0
    this.state = {
      show: false
    }
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
    if (nextProps.color !== this.state.color ||
        nextProps.value !== this.state.value
    ) {
      clearTimeout(this.timer)
      this.setState({
        show: true
      })
      this.timer = setTimeout(() => this.setState({ show: false }), 5000)
    }
  }
}
// GlobalAlarm.propTypes = {
//   color: PropTypes.string.isRequired
//   value: PropTypes.string.isRequired
// }

export default connect(GlobalAlarm.mapStateToProps)(GlobalAlarm)
