/**
 * Created by faraway on 17-8-10.
 */
import PropTypes from 'prop-types'
import React from 'react'

import style from './MarkSelector.styl'

export default class extends React.Component {
  static propTypes = {
    /** 是的，这个mark是不可控的 */
    onMarkUpdate: PropTypes.func.isRequired,
    defaultMark: PropTypes.number.isRequired
  }

  state = {
    currentMark: this.props.defaultMark,
    offset: 0
  }

  startX = 0
  touched = false
  start = 0
  end = 10
  lineWidth = 0
  offsetBackup = 0
  rem = 20

  touchstart (touches) {
    this.touched = true
    if (touches.touches.length === 1) {
      const touch = touches.touches[0]
      this.startX = touch.clientX
      this.setState({
        offset: touch.clientX - this.rem * 2.5,
        currentMark: parseInt(this.state.offset / this.lineWidth * 10)
      })
      this.offsetBackup = touch.clientX - this.rem * 2.5
    }
  }
  touchmove (touches) {
    if (touches.touches.length === 1) {
      const touch = touches.touches[0]
      if (this.touched) {
        const offset = this.offsetBackup + (touch.clientX) - this.startX
        this.setState({
          offset,
          currentMark: parseInt(this.state.offset / this.lineWidth * 10)
        })
        if (offset >= this.lineWidth) {
          this.setState({
            offset: this.lineWidth,
            currentMark: 10
          })
        } else if (offset <= 0) {
          this.setState({
            offset: 0,
            currentMark: 0
          })
        }
      }
    }
  }
  touchend () {
    if (this.touched) {
      this.touched = false
    }
  }

  render () {
    return (
      <div className={style['mark']}>
        <h2>
          <span className={style['mark-display']}>{this.state.currentMark}</span>
        </h2>
        <div className={style['mark-selector']}>
          <span className={style['start']}>{this.start}</span>
          <div
            className={style['line']}
            ref={ele => {
              if (ele instanceof HTMLElement) {
                // setTimeout(() => {
                this.rem = ele.clientHeight
                if (!this.lineWidth) {
                  this.lineWidth = ele.clientWidth - ele.querySelector('div').clientWidth
                  this.setState({ offset: this.lineWidth * 0.7 })
                }
                //  = this.lineWidth * 0.7
                // }, 0)
              }
            }}
            onTouchMove={this.touchmove.bind(this)}
            onTouchStart={this.touchstart.bind(this)}
            onTouchEnd={this.touchend.bind(this)}
          >
            <i className={style['dot']}></i>
            <div className={style['block']} style={{ transform: `translate3D(${this.lineWidth / 10 * this.state.currentMark}px,0,0)` }}></div>
            <i className={style['dot']}></i>
          </div>
          <span className={style['end']}>{this.end}</span>
        </div>
      </div>
    )
  }

  componentDidUpdate (prevProps, prevState) {
    if (prevState.currentMark !== this.state.currentMark) {
      this.props.onMarkUpdate(this.state.currentMark)
    }
  }
}
