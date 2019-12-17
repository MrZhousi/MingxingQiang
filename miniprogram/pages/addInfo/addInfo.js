const db = wx.cloud.database()
const app = getApp()
Page({
  data: {
    region: [],
    imgsrc: '',
    flag: false,
    fileID: ""
  },
  myChange(e) {
    // console.log(e)
    this.setData({
      region: e.detail.value
    })
  },
  //添加图片
  addImg() {
    wx.chooseImage({
      success: (res) => {
        // console.log(res)
        this.setData({
          imgsrc: res.tempFilePaths[0],
          flag: true
        })
      },
      fail: err => {
        console.log(err)
      }
    })
  },
  mySubmit(e) {
    // console.log(e)

    let date = new Date().getTime()
    let starInfo = e.detail.value
    let userInfo = wx.getStorageSync("userInfo")
    starInfo.userInfo = userInfo
    starInfo.date = date
    if (!this.data.imgsrc) {
      wx.showToast({
        title: '请添加图片',
        icon: 'none'
      })
      return
    }

    if (!e.detail.value.username) {
      wx.showToast({
        title: '请添加姓名',
        icon: 'none'
      })
      return
    }
    if (e.detail.value.region.length == 0) {
      wx.showToast({
        title: '请添地址',
        icon: 'none'
      })
      return
    }
    if (!e.detail.value.introduce) {
      wx.showToast({
        title: '请添个人介绍',
        icon: 'none'
      })
      return
    }

    let suf = /\.\w+$/.exec(this.data.imgsrc)[0]
    wx.cloud.uploadFile({
      cloudPath: "images/" + new Date().getTime() + suf,
      filePath: this.data.imgsrc,
      success: res => {
        // console.log(res)
        starInfo.imgsrc = res.fileID
        this.setData({
          fileID: res.fileID
        })
        wx.showToast({
          title: "添加成功"
        })
        db.collection("starInfo").add({
          data: starInfo,
          success: res => {
            console.log(res)
            let id = res._id

            // let id = wx.getStorageSync("id")
            // if(!id){
            //   wx.setStorageSync("id", res._id)
            // }
          }
        })
        wx.reLaunch({
          url: "/pages/list/list"
        })
      }
    })
  }
})