/**
 * Created by faraway on 17-8-10.
 */
import PropTypes from 'prop-types'
import React from 'react'
import { Link } from 'react-router-dom'

import style from './PopularShops.styl'

const PopularShops = props => (
  <div className={style['']} style={props.style}>
    <ul className={style['popular-shop-list']}>
      {props.shops.map((shop, i) => (
        <li className={style['popular-shop-list-item']} key={i}>
          <a
            onClick={() => props.onShopClick(shop)}
            className={style['popular-shop-list-link']}
          >
            {shop.shopName}
          </a>
        </li>
      ))}
    </ul>
  </div>
)
PopularShops.propTypes = {
  shops: PropTypes.arrayOf(
    PropTypes.shape({
      shopName: PropTypes.string
    })
  ).isRequired,
  onShopClick: PropTypes.func.isRequired
}

export default PopularShops
