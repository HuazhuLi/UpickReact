/**
 * Created by faraway on 17-8-11.
 */
import PropTypes from 'prop-types'
import React from 'react'

import style from './ShopListItem.styl'

const ShopListItem = (props) => (
  <li>
    <a onClick={() => props.onShopClick(props.shop)} className={style['']}>
      <div>
        <img src={props.shop.imgs[0].msrc} alt={props.shop.shopName}/>
      </div>
      <div>
        <h2>
          <span>{props.shop.shopName}</span>
          <span>{props.shop.shopScore}</span>
        </h2>
        <ul>
          {
            (props.shop.shopTags || []).map((shopTag, i) => (
              <li key={i}>{shopTag}</li>
            ))
          }
        </ul>
      </div>
    </a>
  </li>
)
ShopListItem.propTypes = {
  shop: PropTypes.shape({
    imgs: PropTypes.arrayOf(PropTypes.shape({
      height: PropTypes.number,
      width: PropTypes.number,
      msrc: PropTypes.string,
      src: PropTypes.string
    })),
    shopName: PropTypes.string,
    shopTags: PropTypes.arrayOf(PropTypes.string),
    shopScore: PropTypes.number
  }).isRequired,
  onShopClick: PropTypes.func.isRequired
}

export default ShopListItem
