/**
 * Created by faraway on 17-8-11.
 */
import React from 'react'
import PropTypes from 'prop-types'

import Loading from '../Loading'

import style from './ShopList.styl'

const ShopList = (props) => (
  props.inLoadingStatus === true
    ? <Loading/>
    : <ul
      className={`${style['shop-list']} ${props.children.length > 0 ? style['show-bottom-tip'] : ''}`}
      style={props.style}
    >
      {props.children}
    </ul>
)
ShopList.propTypes = {
  inLoadingStatus: PropTypes.bool
}

export default ShopList
