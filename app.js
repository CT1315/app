// app.js
App({
  onLaunch: function () {
    console.log('App Launch')
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以支持云开发')
    } else {
      wx.cloud.init({
        env: wx.cloud.DYNAMIC_CURRENT_ENV,
        traceUser: true,
      })
    }
  },
  globalData: {
    gameHistory: []
  }
})
