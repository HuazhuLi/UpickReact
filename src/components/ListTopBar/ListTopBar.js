/**
 * Created by faraway on 17-8-15.
 */
import React from 'react'
import PropTypes from 'prop-types'

import style from './ListTopBar.styl'

const ListTopBar = (props) => (
  <div className={style['top-bar']}>
    <a className={style['search-link']}/>
    <div className={style['subtypes-selector']}>
      {
        (props.subtypes || []).map((subtype) => (
          <div key={subtype} className={style['subtype']}>{subtype}</div>
        ))
      }
    </div>
  </div>
)
ListTopBar.propTypes = {
  subtypes: PropTypes.arrayOf(PropTypes.string).isRequired
}

export default ListTopBar
