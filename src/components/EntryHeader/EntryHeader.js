/**
 * Created by faraway on 17-8-10.
 */
import React from 'react'
import PropTypes from 'prop-types'

import waveImg from '../../assets/wave.png'

import style from './EntryHeader.styl'

/**
 * Slogan 组件
 * @param props
 * @constructor
 */
const Slogan = (props) => (
  <h3 className={style['slogan']}>{props.slogan}</h3>
)
Slogan.propTypes = {
  slogan: PropTypes.string.isRequired
}

/**
 * 主要组件
 * @param props
 * @constructor
 */
const EntryHeader = (props) => {
  return (
    <header>
      <img src={waveImg} className={style['wave-image']}/>
      <h1 className={style['h1-with-Logo']}/>
      <Slogan slogan={props.slogan}/>
    </header>
  )
}
EntryHeader.propTypes = {
  slogan: PropTypes.string.isRequired
}

export default EntryHeader
