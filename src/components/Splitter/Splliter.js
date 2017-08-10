/**
 * Created by faraway on 17-8-10.
 */
import React from 'react'
import PropTypes from 'prop-types'

import style from './Splitter.styl'

const DotLine = (props) => (
  props.rotate === true
    ? <span className={`${style['dot-line']} ${style['rotate']}`}/>
    : <span className={style['dot-line']}/>
)
DotLine.propTypes = {
  rotate: PropTypes.bool.isRequired
}

const Splitter = (props) => (
  <div>
    <DotLine rotate={false}/>
    {props.content}
    <DotLine rotate={true}/>
  </div>
)
Splitter.propTypes = {
  content: PropTypes.string.isRequired
}
