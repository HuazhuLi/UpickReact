/**
 * Created by faraway on 17-8-11.
 */
import PropTypes from 'prop-types'
import React from 'react'

import style from './ShopListItem.styl'

const ShopListItem = (props) => (
  <li className={style['shop-list-item-wrapper']} style={props.style}>
    <a
      onClick={() => props.onShopClick(props.shop)}
      className={style['shop-item-a']}
    >
      <div className={style['left-image']}>
        <img src={props.shop.imgs[0] ? props.shop.imgs[0].msrc || props.shop.imgs[0].src : '' } alt={props.shop.shopName}/>
      </div>
      <div className={style['right-content']}>
        <h2 className={style['title-score']}>
          <span className={style['title']}>{props.shop.shopName}</span>
          <span className={style['score']}>{(props.shop.shopScore === 10 ? 10 : props.shop.shopScore.toFixed(1)) + '分'}</span>
        </h2>
        <ul className={style['tags-list']}>
          {
            (props.shop.shopTags || []).map((shopTag, i) => (
              <li key={i} className={style['tags-list-item'] + ' ' + (shopTag.positive ? '' : style['negative'])}>{shopTag.tagName}</li>
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
