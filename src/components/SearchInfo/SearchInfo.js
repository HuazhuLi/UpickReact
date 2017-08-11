/**
 * Created by faraway on 17-8-11.
 */
import React from 'react'
import PropTypes from 'prop-types'

import style from './SearchInfo.styl'

const KeywordList = (props) => (
  <ul className={style['keyword-list']}>
    {
      props.keywords.map((keyword, i) => (
        <li
          className={style['keyword-list-item']}
          key={i}
          onClick={() => props.onKeywordClick(keyword)}
        >
          {keyword}
        </li>
      ))
    }
  </ul>
)
KeywordList.propTypes = {
  keywords: PropTypes.arrayOf(PropTypes.string).isRequired,
  onKeywordClick: PropTypes.func.isRequired
}

const SearchInfo = (props) => (
  <div className={style['search-info-wrapper']}>
    <div className={style['keyword-list-wrapper']}>
      <h3 className={style['title']}>{'热门搜索'}</h3>
      <KeywordList
        keywords={props.searchInfoHot}
        onKeywordClick={(keyword) => props.onKeywordClick(keyword)}
      />
    </div>
    <div className={style['keyword-list-wrapper']}>
      <h3 className={style['title']}>{'搜索历史'}</h3>
      <KeywordList
        keywords={props.searchInfoHistory}
        onKeywordClick={(keyword) => props.onKeywordClick(keyword)}
      />
    </div>
  </div>
)
SearchInfo.propTypes = {
  searchInfoHistory: PropTypes.arrayOf(PropTypes.string).isRequired,
  searchInfoHot: PropTypes.arrayOf(PropTypes.string).isRequired,
  onKeywordClick: PropTypes.func.isRequired
}

export default SearchInfo
