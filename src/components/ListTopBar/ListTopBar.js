/**
 * Created by faraway on 17-8-15.
 */
import React from 'react'
import PropTypes from 'prop-types'

import style from './ListTopBar.styl'

import TabHeader from '../TabHeader'

const ListTopBar = props => (
  <div style={props.style}>
    <div className={style['top-bar']}>
      <a
        className={style['search-link']}
        onClick={() => props.onSearchButtonClick()}
      />
      <div className={style['subtypes-selector']}>
        {(props.subtypes || []).map((subtype, i) => (
          <div
            ref={ele => {
            // 因为没有生命周期钩子，使用ref简单的hack出来这个功能
              if (ele && props.activeIndex === i) {
                try {
                  ele.scrollIntoView()
                  ele.parentNode.childNodes[i - 1].scrollIntoView()
                  ele.parentNode.childNodes[i + 1].scrollIntoView()
                } catch (e) {}
              }
            }}
            key={subtype}
            className={`${style['subtype']} ${props.activeIndex === i ? style['active'] : ''}`}
            onClick={() => props.onSubtypeClick(i, subtype)}
          >
            {subtype}
          </div>
        ))}
      </div>
    </div>
    <TabHeader
      tabTitles={'东中西'.split('')}
      activeIndex={props.locationIndex || 0}
      onTabChange={index => (props.onLocationChange || (() => {}))(index)}
    />
  </div>
)
ListTopBar.propTypes = {
  subtypes: PropTypes.arrayOf(PropTypes.string).isRequired,
  activeIndex: PropTypes.number.isRequired,
  onSubtypeClick: PropTypes.func.isRequired,
  onSearchButtonClick: PropTypes.func.isRequired
}

export default ListTopBar
