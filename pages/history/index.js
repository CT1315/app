// history.js
Page({
  data: {
    history: []
  },

  onShow: function () {
    this.loadHistory();
  },

  loadHistory: function () {
    const history = wx.getStorageSync('gameHistoryDetail');
    if (history) {
      try {
        const parsed = JSON.parse(history);
        this.setData({
          history: parsed.reverse()
        });
      } catch (e) {
        console.error('[History] Failed to parse history:', e);
        this.setData({ history: [] });
      }
    } else {
      this.setData({ history: [] });
    }
  },

  formatTime: function (timestamp) {
    const date = new Date(timestamp);
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hour = date.getHours().toString().padStart(2, '0');
    const minute = date.getMinutes().toString().padStart(2, '0');
    return `${month}-${day} ${hour}:${minute}`;
  },

  clearHistory: function () {
    wx.showModal({
      title: '确认清除',
      content: '确定要清除所有游戏记录吗？',
      confirmColor: '#FF6B6B',
      success: (res) => {
        if (res.confirm) {
          wx.removeStorageSync('gameHistory');
          wx.removeStorageSync('gameHistoryDetail');
          this.setData({ history: [] });
          wx.showToast({
            title: '已清除',
            icon: 'success'
          });
        }
      }
    });
  },

  goToGame: function () {
    wx.switchTab({
      url: '/pages/index/index'
    });
  }
});
