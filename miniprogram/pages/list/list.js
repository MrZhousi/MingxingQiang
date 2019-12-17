const db = wx.cloud.database()
Page({
  data: {
    starArr: [],
    userObj: {},
    page:1
  },
  goDetail(e) {
    console.log(e)
    wx.navigateTo({
      url: `/pages/detail/detail?id=${e.currentTarget.id}`,
    })
  },
  getList(page){
    wx.showLoading({
      title: '正在加载'
    })
    db.collection('starInfo').orderBy('date', 'desc').limit(6).skip(6 * page).get().then(
      res=>{
        wx.hideLoading()
        console.log(res)
        this.setData({
          starArr:this.data.starArr.concat(res.data)
        })
      }
    )
  },
  onPullDownRefresh(){
    this.data.starArr = []
    this.data.page = 1
    this.getList(1)
  },
  onReachBottom() {
    let page = this.data.page++;
    this.getList(page)
  },
  onLoad() {
    this.getList(0)
    // let id = wx.getStorageSync("id")
    // let openid = wx.getStorageSync("openid")
    // db.collection("users").doc(id).get({
    //   success:res=>{
    //     console.log(res)
    //     this.setData({
    //       userObj:res.data
    //     })
    //   }
    // })
    // db.collection("starInfo").where({}).get().then(
    //   res=>{
    //     let arr = res.data
    //       this.setData({
    //         starArr: arr
    //       })
    //   }
    // )
    
  }
})