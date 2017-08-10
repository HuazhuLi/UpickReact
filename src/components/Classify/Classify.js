/**
 * Created by faraway on 17-8-10.
 */
import PropTypes from 'prop-types'
import React from 'react'
import { Link } from 'react-router-dom'

import style from './Classify.styl'

const ShopTypesSplitter = () => (
  <div className={style['shop-types-splitter']}/>
)

const LinkWithSingleShop = (props) => (
  <Link className={style['link-with-shop']} to={props.to}>
    <div className={style['bg-element']} style={{ backgroundPosition: `${props.order * 3.652}rem center` }}/>
    <div className={style['title']}>{props.content}</div>
  </Link>
)

/**
 * 这是这个文件主要要暴露的组件
 * @param props
 * @constructor
 */
const Classify = (props) => (
  <div style={props.style} className={style['classify-grow']}>
    {
      props.types
        .reduce(
          (chunks, types) => {
            if (chunks[chunks.length - 1].length >= 3) {
              chunks.push([])
            }
            chunks[chunks.length - 1].push(types)
            return chunks
          }, [[]])
        .map((chunk, i) => (
          <div key={i} className={style['types-in-line']}>
            {
              chunk
                .reduce(
                  (typesWithSplit, shop, i) => {
                    typesWithSplit.push(shop)
                    if (i !== chunk.length - 1) {
                      typesWithSplit.push('|')
                    }
                    return typesWithSplit
                  }, [])
                .map(
                  (type, iInLine) =>
                    (iInLine + 1) % 2
                      ? <LinkWithSingleShop key={iInLine} to={`/list/${type}`} order={i * 3 + iInLine / 2} content={type}/>
                      : <ShopTypesSplitter key={iInLine}/>
                )
            }
          </div>
        ))
    }
  </div>
)

Classify.propTypes = {
  types: PropTypes.arrayOf(PropTypes.string).isRequired
}

export default Classify
