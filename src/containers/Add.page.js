import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import { fetchAllSubtypes, uploadImage, addShop, throwGlobalAlarm } from '../actions'

import AddShop from '../components/AddShop'
import Loading from '../components/Loading'

class Add extends React.Component {
  static mapStateToProps ({ subtypes, uploadedImages, addShop }) {
    return {
      subtypes: subtypes.value,
      isFetchingSubtypes: subtypes.isFetching,

      uploadedImages: uploadedImages.value,
      isUploading: uploadedImages.fetchingCount > 0,
      uploadError: uploadedImages.error,

      isAdding: addShop.isAdding,
      addError: addShop.error
    }
  }

  uploadResolve = () => {}
  addResolve = () => {}
  uploadReject = () => {}
  addReject = () => {}

  render () {
    const { dispatch } = this.props
    if (this.props.isFetchingSubtypes) {
      return <Loading />
    }
    return (
      <AddShop
        subtypes={this.props.subtypes}
        onRequestSubmit={async e => {
          const { shopName, shopAddress, subtype, imgs } = e
          if (!shopName || !shopAddress || !subtype) {
            dispatch(throwGlobalAlarm('请完整填写!'))
            return
          }
          if (imgs.length > 0) {
            dispatch(uploadImage(imgs[0]))
            await new Promise((resolve, reject) => {
              this.uploadResolve = resolve
              this.uploadReject = reject
            })
          }
          // 是的，接口中没有subtype
          dispatch(addShop(
            shopName, shopAddress,
            imgs.length > 0 ? [ this.props.uploadedImages[imgs[0].id] ] : []
          ))
          await new Promise((resolve, reject) => {
            this.addResolve = resolve
            this.addReject = reject
          })
        }}
      />
    )
  }

  componentWillMount () {
    const { dispatch } = this.props
    dispatch(fetchAllSubtypes())
  }

  componentWillReceiveProps (nextProps) {
    const { dispatch } = this.props
    // 当前未在加载，即将开始加载
    if (!this.props.isUploading && nextProps.isUploading) {
      dispatch(throwGlobalAlarm('开始上传图片...', 'rgb(80,212,103)', 10000000/** 意味无限长 */))
    }

    // 当前仍在加载，即将结束加载
    if (this.props.isUploading && !nextProps.isUploading) {
      if (!nextProps.uploadError) {
        this.uploadResolve()
      } else {
        this.uploadReject('Failed To Upload Image!')
      }
    }

    if (!this.props.isAdding && nextProps.isAdding) {
      dispatch(throwGlobalAlarm('提交中...', 'rgb(80,212,103)', 10000000))
    }

    if (this.props.isAdding && !nextProps.isAdding) {
      if (!nextProps.addError) {
        this.addResolve()
        dispatch(throwGlobalAlarm('提交成功！', 'rgb(80,212,103)'))
      } else {
        this.addReject('Failed To Submit Shop!')
      }
    }
  }
}

export default connect(Add.mapStateToProps)(Add)
