//app.js
App({
  onLaunch: function () {
    
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        // env 参数说明：
        //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
        //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
        //   如不填则使用默认环境（第一个创建的环境）
        env: 'mrzhou-aa9xx',
        traceUser: true,
      })
    }
    wx.login({
      success: res => {
        let code = res.code;
        let appid = "wx27c36a50d0815d9d";
        let secret = "dcddcf257557365b17407b09c218642c";
        let url = `https://api.weixin.qq.com/sns/jscode2session?appid=${appid}&secret=${secret}&js_code=${code}&grant_type=authorization_code`;
        wx.request({
          url,
          success: res => {
            this.globalData.openid = res.data.openid;
          }
        })

      }
    })
    this.globalData = {}
  }
})
