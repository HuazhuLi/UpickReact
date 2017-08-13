/**
 * Created by faraway on 17-8-13.
 */
import React from 'react'

import style from '../../plugins/loading/loading.styl'

const Loading = () => (
  <div className={`${style['loading']} ${style['no-fixed']} ${style['show']}`}>
    <div className={style['animating']}>
      <div className={style['three-balls']}>
        <div className={`${style['ball']} ${style['light']}`}/>
        <div className={`${style['ball']} ${style['light-dark']}`}/>
        <div className={`${style['ball']} ${style['dark']}`}/>
      </div>
    </div>
    <h1>Loading...</h1>
  </div>
)

export default Loading
