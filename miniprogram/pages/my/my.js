const db = wx.cloud.database()
Page({
  data: {
    info: {},
    flag: true,
    id: '',
    openid: ''
  },
  history() {
    let userInfo = wx.getStorageSync("userInfo")
    if (!userInfo) {
      wx.showToast({
        title: '请您先登录',
        icon: 'none'
      })
      return
    }
    wx.navigateTo({
      url: '/pages/history/history',
    })
  },
  onShow() {
    let userObj = wx.getStorageSync("userInfo")
    if (userObj) {
      this.setData({
        flag: false,
        info:userObj
      })
    }
    // let id = wx.getStorageSync("id")
    // if (!id) {
    //   return
    // }
    // db.collection("users").doc(id).get({
    //   success: res => {
    //     // console.log(res)
    //     this.setData({
    //       info: res.data,
    //       flag: false
    //     })
    //   }
    // })
  },
  getUser(e) {
    console.log(e)
    if (e.detail.userInfo) {
      this.setData({
        flag: false,
        info: e.detail.userInfo
      })
    }
    // db.collection("users").add({
    //   data: e.detail.userInfo,
    //   success: res => {
    //     // console.log(res)
    //     this.setData({
    //       id: res._id,
    //       flag: false
    //     })
    //     db.collection("users").doc(this.data.id).get({
    //       success: res => {
    //         console.log(res)
    //         this.setData({
    //           info: res.data,
    //           openid: res.data._openid
    //         })

    //         wx.setStorageSync('openid', this.data.openid)
    //       }
    //     })
    //     wx.setStorageSync("id", res._id)
    //   }
    // })
    wx.setStorageSync("userInfo", e.detail.userInfo)
    // this.setData({
    //   info: e.detail.userInfo,
    //   // flag:false
    // })
  },
  
  //添加信息
  addInfo() {
    wx.getSetting({
      success:res=>{
        // console.log(res)
        if (res.authSetting['scope.userInfo']==true){
          // wx.
          wx.navigateTo({
            url: '/pages/addInfo/addInfo',
          })
        }else{
          // wx.getUserInfo({
          //   success:res=>{
          //     console.log(res)
          //   }
          // })
          wx.showModal({
            title: '提示',
            content: '请先登录',
          })
        }

      }
    })
    // let userInfo = wx.getStorageSync("userInfo")
    // if(!userInfo){
    //   wx.showToast({
    //     title: '请您先登录',
    //     icon: 'none'
    //   })
    //   return
    // }
    // wx.navigateTo({
    //   url: '../../pages/addInfo/addInfo'
    // })
  }
})