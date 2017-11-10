
import React from 'react'
import PropTypes from 'prop-types'

import style from './AddShop.styl'

import wave from '../../assets/wave.png'
import shop from '../../assets/pic_addstore.png'
import iconPhoto from '../../assets/icon_photo.png'

const TopBar = props =>
  <div className={style['header-title']}>
    <img src={wave} className={style['bg-wave']}/>
    <img src={shop} className={style['round-icon']}/>
  </div>

class Form extends React.Component {
  state = {
    shopName: '',
    shopAddress: '',
    image: null,
    selectedIndex: -1,
    showList: false
  }

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

  inputElement = null

  albumClickHandler = () => {
    if (this.inputElement instanceof HTMLElement) {
      this.inputElement.click()
      this.inputElement.onchange = async () => {
        // in fact there is only one file at most
        const files = Array.prototype.slice.call(this.inputElement.files, 0, 1)
        const imagesBase64 = await Promise.all(files.map(Form.fileToBase64))
        const images = imagesBase64.map((imageBase64, i) => ({
          // 用id进行快速筛选
          id: Math.random().toString(36).slice(2),
          imageBase64,
          ...files[i]
        }))

        this.setState(preState => ({
          image: images[0]
        }), () => {
          this.props.onImageSelected(this.state.image)
        })
      }
    }
  }

  render () {
    const props = this.props
    return (
      <div className={style['form']}>
        <div className={style['inputs']}>
          <div className={style['input-name']}>
            <span className={style['icon']}></span>
            <input
              type="text"
              placeholder="店铺名称"
              tabIndex="1"
              value={this.state.shopName}
              onChange={e =>
                this.setState(
                  { shopName: e.target.value },
                  () => this.props.onShopNameChange(this.state.shopName)
                )
              }
            />
          </div>
          <div className={style['input-location']}>
            <span className={style['icon']}></span>
            <input
              type="text"
              placeholder="店铺地址"
              tabIndex="2"
              value={this.state.shopAddress}
              onChange={e =>
                this.setState(
                  { shopAddress: e.target.value },
                  () => this.props.onShopAddressChange(this.state.shopAddress)
                )
              }
            />
          </div>
          <div className={style['input-type']}>
            <span className={style['icon']}></span>
            <div className={style['pulldown-wrapper']}>
              <div
                tabIndex="3"
                onFocus={() => this.setState({ showList: true })}
                // 避免“点不到”的情况
                onBlur={() => setTimeout(() => this.setState({ showList: false }), 100)}
              >
                <p
                  // 使用p的原因是避免导致uncontrolled input
                  // onChange={e => this.setState({ selectedIndex: 0 })}
                >
                  {
                    this.state.selectedIndex >= 0
                      ? (props.subtypes || ['暂无分类'])[this.state.selectedIndex]
                      : '选择分类'
                  }
                </p>
                <span className={style['icon']}></span>
              </div>
              <ul className={style['type-list'] + ' ' + (this.state.showList ? style['show'] : '')}>
                {
                  (props.subtypes || ['暂无分类']).map((subtype, i) =>
                    <li
                      key={subtype}
                      onClick={() =>
                        this.setState(
                          { selectedIndex: i },
                          () => this.props.onSubtypeChange({
                            index: i,
                            subtype
                          })
                        )
                      }
                    >
                      { subtype }
                    </li>
                  )
                }
              </ul>
            </div>
          </div>
        </div>
        <div className={style['upload-file']}>
          <input type="file" ref={ele => { this.inputElement = ele }}/>
          <div className={style['touch-to-choose']} tabIndex="4" onClick={this.albumClickHandler}>
            <div style={{ display: this.state.image ? 'none' : undefined }}>
              <img src={iconPhoto}/>
              <span>上传图片</span>
            </div>
            <img
              className={style['preview']}
              src={(this.state.image || {}).imageBase64}
              style={{ display: this.state.image ? undefined : 'none' }}
            />
          </div>
        </div>
        <button
          className={style['submit-button']}
          tabIndex="5"
          onClick={() =>
            this.props.onRequestSubmit({
              shopName: this.state.shopName,
              shopAddress: this.state.shopAddress,
              subtype: (this.props.subtypes || ['暂无分类'])[this.state.selectedIndex],
              imgs: this.state.image ? [ this.state.image ] : []
            })
          }
        >提交</button>
      </div>
    )
  }
}

const AddShop = props =>
  <div className={style['add']}>
    <TopBar/>
    <Form
      // default
      onShopNameChange={() => {}}
      onShopAddressChange={() => {}}
      onSubtypeChange={() => {}}
      onImageSelected={() => {}}
      onRequestSubmit={() => {}}
      {...props}
    />
  </div>

export default AddShop
