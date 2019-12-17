const db = wx.cloud.database()
const app = getApp()
Page({
  data: {
    starInfo: [],
    openid: ''
  },
  onShow() {
    console.log(111)
    let id = app.globalData.openid
    console.log(id)
    // db.collection("starInfo").doc(id).get({
    //   success: res => {
    //     console.log(res.data._openid)
    let openid = app.globalData.openid
        db.collection("starInfo").get({
          success: res => {
            // console.log(res)
            let starInfo = res.data
            let newStarInfo = starInfo.filter((item) => {
              console.log(item._openid)
              console.log(openid)
              if (item._openid == openid) {
                return item
              }
            })
            console.log(newStarInfo)
            this.setData({
              starInfo: newStarInfo
            })
          }
        })
        // this.setData({
        //   openid:res._openid
        // })
      // }
    // })



  },
  del(e) {
    console.log(e)
    wx.showModal({
      title: '提示',
      content: '您是否确认删除',
      success:(res)=>{
        if (res.confirm) {
          let index = e.currentTarget.dataset.index
          let imgsrc = e.currentTarget.dataset.imgsrc
          let starInfo = this.data.starInfo
          starInfo.splice(index, 1)
          this.setData({
            starInfo
          })
          let id = e.target.id
          db.collection("starInfo").doc(id).remove({
            success: res => {
              // console.log(res)
            }
          })
          wx.cloud.deleteFile({
              fileList: [imgsrc]
            })
            .then(res => {
              // console.log(res)
            })
            .catch(err => {
              // console.log(err)
            })
          console.log('用户点击确定')
          wx.showToast({
            title: '删除成功',
            icon: 'success',
            duration: 1500
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })


  }
})