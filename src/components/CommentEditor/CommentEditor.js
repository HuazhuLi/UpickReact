import PropTypes from 'prop-types'
import React from 'react'

import style from './CommentEditor.styl'

import album from '../../assets/album.png'

export class CommentEditor extends React.Component {
  static propTypes = {
    // images: PropTypes.array
    onImagesChange: PropTypes.func.isRequired
  }

  state = {
    images: []
  }

  inputElement = null

  /**
   * 用于标识当前组件是否处于挂载状态，避免Promise
   * 很久以后resolve()并setState导致错误
   * @typedef {bool}
   */
  _mounted

  /**
   * @return {Promise.<String>}
   * @param {File} file
   */
  static async fileToBase64 (file) {
    let fileReader = new FileReader()
    fileReader.readAsDataURL(file)
    let base64String = await new Promise((resolve, reject) => {
      fileReader.onload = (e) => {
        resolve(e.target.result)
      }
      fileReader.onerror = (err) => {
        reject(err)
      }
    })
    if (file.size / 1024 > 500) {
      let image = new Image()
      image.src = base64String
      await new Promise((resolve) => {
        if (image.complete) {
          resolve()
        } else {
          image.onload = () => {
            if (image.width > 0 && image.height > 0) {
              resolve()
            }
          }
        }
      })
      let canvas = document.createElement('CANVAS')
      canvas.width = 800
      canvas.height = 800 * image.height / image.width
      let ctx = canvas.getContext('2d')
      ctx.drawImage(
        image,
        0, 0,
        image.width,
        image.height,
        0, 0,
        canvas.width,
        canvas.height
      )
      base64String = canvas.toDataURL()
    }
    return base64String
  }

  albumClickHandler = () => {
    if (this.inputElement instanceof HTMLElement) {
      this.inputElement.click()
      this.inputElement.onchange = async () => {
        // resolve(
        //   this.inputElement.files.map(file =>)
        // )
        // 取出前三个
        const files = Array.prototype.slice.call(this.inputElement.files, 0, 3 - this.state.images.length)
        const imagesBase64 = await Promise.all(files.map(CommentEditor.fileToBase64))
        const images = imagesBase64.map((imageBase64, i) => ({
          // 用id进行快速筛选
          id: Math.random().toString(36).slice(2),
          imageBase64,
          ...files[i]
        }))
        if (this._mounted) {
          this.setState(preState => ({
            images: [...preState.images, ...images]
          }), () => {
            this.props.onImagesChange(this.state.images)
          })
        }
      }
    } else {
      return null
    }
  }

  deleteClickHandler = (id) => {
    this.setState(preState => ({
      images: preState.images.filter(image => image.id !== id)
    }), () => {
      this.props.onImagesChange(this.state.images)
    })
  }

  render () {
    const { props } = this
    const { onImagesChange, ...other } = this.props
    return (
      <div className={style['editor-wrapper']}>
        <textarea
          {...other}
          className={style['editor']}
          placeholder={'亲，店家服务、环境怎么样？发布图文点评吧！(不超过 200 字)'}
        />
        <div className={style['image-display-wrapper']}>
          <input
            multiple
            type='file'
            ref={ele => { this.inputElement = ele }}
            style={{ display: 'none' }}
          />
          <div className={style['image-display']}>
            {
              this.state.images.map(image =>
                <div key={image.id} className={style['image-wrapper']}>
                  <span onClick={() => this.deleteClickHandler(image.id)}>+</span>
                  <img src={image.imageBase64}/>
                </div>
              )
            }
            {
              this.state.images.length < 3
                ? <img
                  className={style['image-selector']}
                  src={album}
                  onClick={this.albumClickHandler}
                />
                : <div className={style['image-wrapper']}></div>
            }
            {
              new Array(3 - this.state.images.length).fill(0).map((value, i) =>
                <div key={i} className={style['image-wrapper']}></div>
              )
            }
          </div>
        </div>
      </div>
    )
  }

  componentWillMount () {
    this._mounted = true
  }

  componentWillUmount () {
    this._mounted = false
  }
}

export default CommentEditor
