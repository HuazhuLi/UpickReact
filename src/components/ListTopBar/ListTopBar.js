/**
 * Created by faraway on 17-8-15.
 */
import React from 'react'
import PropTypes from 'prop-types'

import style from './ListTopBar.styl'

const ListTopBar = (props) => (
  <div className={style['top-bar']} style={props.style}>
    <a className={style['search-link']} onClick={() => props.onSearchButtonClick()}/>
    <div className={style['subtypes-selector']}>
      {
        (props.subtypes || []).map((subtype, i) => (
          <div
            key={subtype}
            className={`${style['subtype']} ${props.activeIndex === i ? style['active'] : ''}`}
            onClick={() => props.onSubtypeClick(i, subtype)}
          >{subtype}</div>
        ))
      }
    </div>
  </div>
)
ListTopBar.propTypes = {
  subtypes: PropTypes.arrayOf(PropTypes.string).isRequired,
  activeIndex: PropTypes.number.isRequired,
  onSubtypeClick: PropTypes.func.isRequired,
  onSearchButtonClick: PropTypes.func.isRequired
}

export default ListTopBar
