/**
 * Created by faraway on 17-8-11.
 */
import React from 'react'

import style from './ShopList.styl'

const ShopList = (props) => (
  <ul
    className={`${style['shop-list']} ${props.children.length > 0 ? style['show-bottom-tip'] : ''}`}
    style={props.style}
  >
    {props.children}
  </ul>
)

export default ShopList
