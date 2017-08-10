/**
 * Created by faraway on 17-8-10.
 */
import PropTypes from 'prop-types'
import React from 'react'

import style from './Classify.styl'

import Splitter from '../Splitter/'

/**
 * 这是这个文件主要要暴露的组件
 * @param props
 * @constructor
 */
const Classify = (props) => (
  <div>
    <Splitter content={'分类'}/>
    <div>

    </div>
  </div>
)

Classify.propTypes = {
  onTypeClick: PropTypes.func.isRequired,
  types: PropTypes.shape({
    shopName: PropTypes.string
  }).isRequired,
  slogan: PropTypes.string.isRequired
}
