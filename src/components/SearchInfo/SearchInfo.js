/**
 * Created by faraway on 17-8-11.
 */
import React from 'react'
import PropTypes from 'prop-types'

import style from './SearchInfo.styl'

const KeywordList = (props) => (
  <ul>
    {
      props.keywords.map((keyword, i) => (
        <li key={i}>
          {keyword}
        </li>
      ))
    }
  </ul>
)
KeywordList.propTypes = {
  keywords: PropTypes.arrayOf(PropTypes.string).isRequired
}

const SearchInfo = (props) => (
  <div>
    <div>
      <h3>{'热门搜索'}</h3>
      <KeywordList keywords={props.searchInfoHot}/>
    </div>
    <div>
      <h3>{'搜索历史'}</h3>
      <KeywordList keywords={props.searchInfoHistory}/>
    </div>
  </div>
)
SearchInfo.propTypes = {
  searchInfoHistory: PropTypes.arrayOf(PropTypes.string).isRequired,
  searchInfoHot: PropTypes.arrayOf(PropTypes.string).isRequired
}

export default SearchInfo
