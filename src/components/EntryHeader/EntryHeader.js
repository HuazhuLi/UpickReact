/**
 * Created by faraway on 17-8-10.
 */
import React from 'react'

import waveImg from '../../assets/wave.png'
import logoImg from '../../assets/logo.png'
import quoteImg from '../../assets/quote.png'
import typesImg from '../../assets/types.png'
import searchImg from '../../assets/search.png'

import style from './EntryHeader.styl'

console.log(style)

const EntryHeader = () => (
  <header>
    <img src={waveImg} className={style['wave-image']}/>
    <h1 className={style['h1-with-Logo']}/>
  </header>
)

export default EntryHeader
