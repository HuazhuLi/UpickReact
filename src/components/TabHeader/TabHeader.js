import React from 'react'
import PropTypes from 'prop-types'

import style from './TabHeader.styl'

const TabHeader = props =>
  <div className={style['tab-header-wrapper']}>
    {
      props.tabTitles.map((title, i) =>
        <div
          key={title}
          onClick={() => props.onTabChange(i)}
          className={style['tab-selection'] + ' ' + (i === props.activeIndex ? style['active'] : '')}
        >
          <div className={style['title-wrapper']}>
            {title}
          </div>
        </div>
      )
    }
    {/* <div className={style['select-line']}></div> */}
  </div>

TabHeader.propTypes = {
  tabTitles: PropTypes.arrayOf(PropTypes.string).isRequired,
  activeIndex: PropTypes.number.isRequired,
  onTabChange: PropTypes.func.isRequired
}

export default TabHeader
