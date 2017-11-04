import React from 'react'
import PropTypes from 'prop-types'
import Swiper from 'react-id-swiper'

import style from './TagSelector.styl'

export default class TagSelector extends React.Component {
  static propTypes = {
    tags: PropTypes.arrayOf(PropTypes.string).isRequired
  }

  state = {
    scopeNumber: 1,
    selectedTags: []
  }

  _fisrtTime = true
  scopeHeight = 3.4 * 20

  tagClickHandler = tag => {
    const index = this.state.selectedTags.findIndex(localTag => localTag === tag)
    if (index < 0) {
      this.setState({
        selectedTags: [...this.state.selectedTags, tag]
      })
    } else {
      const tempSelectedTags = [...this.state.selectedTags]
      tempSelectedTags.splice(index, 1)
      this.setState({ selectedTags: tempSelectedTags })
    }
  }

  render () {
    return (
      <div className={style['tags']}>
        <Swiper
          pagination={{
            el: '.swiper-pagination',
            type: 'bullets',
            clickable: true
          }}
          shouldSwiperUpdate={true}
          children={
            /**
             * 先假设只有一页，等到ul渲染完成之后，计算出到底有多少页
             * 就生成几个一模一样的 SwiperSlide，然后使用transfrom
             * 调节在scope视口中露出的位置。实现活动(flex)翻页布局
             **/
            new Array(this.state.scopeNumber).fill(0).map((value, i) => (
              <div className={style['scope-wrapper']}>
                <div
                  key={i}
                  className={style['scope']}
                  ref={ele => {
                    if (ele instanceof HTMLElement) {
                      this.scopeHeight = ele.clientHeight
                    }
                  }}
                >
                  <ul
                    key={i}
                    className={style['all-tags-ul']}
                    style={{ transform: `translate3d(0, -${this.scopeHeight * i}px, 0)` }}
                    ref={ele => {
                      if (ele instanceof HTMLElement && this._fisrtTime === true) {
                        this.setState({ scopeNumber: Math.round(ele.clientHeight / this.scopeHeight) })
                        this._fisrtTime = false
                      }
                    }}
                  >
                    {
                      (this.props.tags || []).map((tag, i) => (
                        <li
                          key={tag + i}
                          className={style['tag'] + (this.state.selectedTags.findIndex(localTag => localTag === tag) >= 0 ? ' ' + style['active'] : ' a')}
                          onClick={() => this.tagClickHandler(tag)}
                        >{tag}</li>
                      ))
                    }
                    <li className={style['last'] + ' ' + style['tag']}></li>
                  </ul>
                </div>
              </div>
            ))
          }/>
      </div>
    )
  }
}
