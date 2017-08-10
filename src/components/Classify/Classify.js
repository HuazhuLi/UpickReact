/**
 * Created by faraway on 17-8-10.
 */
import PropTypes from 'prop-types'
import React from 'react'

import style from './Classify.styl'

/**
 * 这是这个文件主要要暴露的组件
 * @param props
 * @constructor
 */
const Classify = (props) => (
  <div style={props.style}/>
)

// Classify.propTypes = {
//   onTypeClick: PropTypes.func.isRequired,
//   types: PropTypes.shape({
//     shopName: PropTypes.string
//   }).isRequired
// }

export default Classify
