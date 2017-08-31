/**
 * Created by faraway on 17-8-18.
 */
import React from 'react'
import PropTypes from 'prop-types'

import style from './ShopDetail.styl'

const ShopDetail = (props) => (
  <div style={props.style}>
    <div className={style['title']}>
      <h1>
        <span>{props.shop.shopName}</span>
        <span className={style['mark']}>{props.shop.shopScore.toFixed(1)}</span>
      </h1>
    </div>
    <div className={style['time-location']}>
      <div className={style['time']}>
        <span className={style['icon'] + ' ' + style['clock']}/>
        <span className={style['name']}>营业时间</span>
        <span className={style['colon']}>:</span>
        <ul className={style['value']}>
          {
            props.shop.openTime.split(' ').map((time, i) => (
              <li key={i}>{time}</li>
            ))
          }
        </ul>
      </div>
      <div className={style['location']}>
        <span className={style['icon'] + ' ' + style['loc']}/>
        <span className={style['name']}>地址</span>
        <span className={style['colon']}>:</span>
        <p className={style['value']}>{props.shop.shopAddress}</p>
      </div>
    </div>
    <div className={style['images']}>
      {
        props.shop.imgs.map((img, i) => (
          <img key={i} src={img.msrc || img.src} alt={props.shop.shopName}/>
        ))
      }
    </div>
    <div className={style['tags']}>
      <ul>
        {
          props.shop.shopTags.map((tag) => (
            <li key={tag} className={style['negative']}>{tag}</li>
          ))
        }
      </ul>
    </div>
  </div>
)
ShopDetail.propTypes = {
  shop: PropTypes.shape({
    shopName: PropTypes.string,
    shopScore: PropTypes.number,
    shopAddress: PropTypes.string,
    shopTags: PropTypes.arrayOf(PropTypes.string),
    imgs: PropTypes.arrayOf(PropTypes.shape({
      msrc: PropTypes.string,
      src: PropTypes.string
    }))
  })
}

export default ShopDetail