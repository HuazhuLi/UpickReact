/**
 * Created by faraway on 17-8-12.
 */
import PropTypes from 'prop-types'
import React from 'react'

import style from './Result.styl'

import bad from '../../assets/bad.png'
import success from '../../assets/success.png'

const Result = (props) => (
  <div className={style['result-container']}>
    <div className={style['image']}>
      {
        props.status === 0
          ? <img src={bad} alt="失败！"/>
          : <img src={success} alt="成功！"/>
      }
    </div>
    <div className={style['text']}>
      {props.title && <h1>{props.title}</h1>}
      {props.text && <p>{props.text}</p>}
    </div>
    <div className={style['buttons']}>
      {props.buttonTitle && <button onClick={() => props.onButtonClick()}>{props.buttonTitle}</button>}
      {props.linkTitle && <a onClick={() => props.onLinkClick()}>{props.linkTitle}</a>}
    </div>
  </div>
)
Result.propTypes = {
  status: PropTypes.oneOf([0, 1]).isRequired,
  title: PropTypes.string,
  text: PropTypes.string,
  buttonTitle: PropTypes.string,
  onButtonClick: PropTypes.func,
  linkTitle: PropTypes.string,
  onLinkClick: PropTypes.func
}

export default Result
