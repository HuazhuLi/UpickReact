import React from 'react'
import PropTypes from 'prop-types'

import style from './FloatButton.styl'

const FloatButton = props =>
  <button
    className={style['float-button']}
    onClick={() => props.onClick()}
  />

FloatButton.propTypes = {
  onClick: PropTypes.func.isRequired
}

export default FloatButton
