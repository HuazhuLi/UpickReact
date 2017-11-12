/**
 * Created by faraway on 17-8-18.
 */
import React from 'react'
import PropTypes from 'prop-types'

import style from './ShopDetail.styl'

const ShopDetail = props => (
  <div style={props.style}>
    <div className={style['title']}>
      <h1>
        <span>{props.shop.shopName}</span>
        <span className={style['mark']}>{props.shop.shopScore.toFixed(1)}</span>
      </h1>
    </div>
    <div className={style['time-location']}>
      <div className={style['time']}>
        <span className={style['icon'] + ' ' + style['clock']} />
        <span className={style['name']}>营业时间</span>
        <span className={style['colon']}>:</span>
        <ul className={style['value']}>
          {(props.shop.openTime || '未知')
            .split(' ')
            .map((time, i) => <li key={i}>{time}</li>)}
        </ul>
      </div>
      <div className={style['location']}>
        <span className={style['icon'] + ' ' + style['loc']} />
        <span className={style['name']}>地址</span>
        <span className={style['colon']}>:</span>
        <p className={style['value']}>{props.shop.shopAddress}</p>
      </div>
    </div>
    <div
      className={style['images']}
      style={{ height: props.collapsed ? '0px' : undefined }}
    >
      {props.shop.imgs
        .slice(0, 3)
        .map((img, i) => (
          <img key={i} src={img.msrc || img.src} alt={props.shop.shopName} />
        ))}
    </div>
    <div
      className={style['tags']}
      style={{ height: props.collapsed ? '0px' : undefined }}
    >
      <ul>
        {props.shop.shopTags.map(tag => (
          <li key={tag.tagName} className={style['negative']}>
            {tag.tagName}
          </li>
        ))}
      </ul>
    </div>
  </div>
)
ShopDetail.propTypes = {
  shop: PropTypes.shape({
    shopName: PropTypes.string,
    shopScore: PropTypes.number,
    shopAddress: PropTypes.string,
    shopTags: PropTypes.arrayOf(
      PropTypes.shape({
        hitNumber: PropTypes.number,
        tagName: PropTypes.string
      })
    ),
    imgs: PropTypes.arrayOf(
      PropTypes.shape({
        msrc: PropTypes.string,
        src: PropTypes.string
      })
    )
  }),
  collapsed: PropTypes.bool.isRequired
}

export default ShopDetail
