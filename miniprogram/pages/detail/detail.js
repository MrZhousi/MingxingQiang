const db = wx.cloud.database()

Page({
  data: {
    dataObj: {},
  },
  onLoad(e) {
    console.log(e)
    // let userObj = wx.getStorageSync("userInfo")
    // this.setData({
    //   userObj
    // })
    let id = e.id
    db.collection("starInfo").doc(id).get({
      success: res => {
        // console.log(res)
        let newDate = res.data.date
        console.log(newDate)
        var date = new Date(newDate);
        let Y = date.getFullYear() + '年'
        // console.log(Y)
        let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '月'
        let D = date.getDate() + '日 '
        let h = date.getHours() + ':'
        let m = date.getMinutes() + ':'
        let s = date.getSeconds()
        res.data.date = Y + M + D + h + m + s
        this.setData({
          dataObj: res.data
        })
      }
    })
  }
})