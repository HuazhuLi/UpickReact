import React from 'react'
import PropTypes from 'prop-types'

import style from './CommentTopBar.styl'

const CommentTopBar = props => (
  <div className={style['top-bar']}>
    <h1>{props.shopName}</h1>
    <button className={style['submit']} onClick={() => props.onSubmit()}>发表</button>
  </div>
)

CommentTopBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  shopName: PropTypes.string.isRequired
}

export default CommentTopBar
