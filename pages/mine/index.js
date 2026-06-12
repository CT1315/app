// mine.js
Page({
  data: {
    stats: {
      total: 0,
      truth: 0,
      dare: 0
    }
  },

  onShow: function () {
    this.loadStats();
  },

  loadStats: function () {
    const history = wx.getStorageSync('gameHistoryDetail');
    if (history) {
      try {
        const records = JSON.parse(history);
        const total = records.length;
        const truth = records.filter(r => r.mode === 'truth').length;
        const dare = records.filter(r => r.mode === 'dare').length;
        this.setData({
          stats: { total, truth, dare }
        });
      } catch (e) {
        console.error('[Mine] Failed to parse history:', e);
      }
    } else {
      this.setData({
        stats: { total: 0, truth: 0, dare: 0 }
      });
    }
  },

  handleFeedback: function () {
    wx.showToast({
      title: '感谢您的反馈！',
      icon: 'none'
    });
  },

  handleAbout: function () {
    wx.showModal({
      title: '关于真心话大冒险',
      content: '🎭 真心话大冒险\n\n一款有趣的聚会游戏，让你的派对更加精彩！\n\n版本: 1.0.0',
      showCancel: false,
      confirmText: '知道了'
    });
  }
});
