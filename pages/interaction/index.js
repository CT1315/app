Page({
  data: {
    list: [],
    loading: false
  },

  onLoad() {
    wx.cloud.callFunction({
      name: 'quickstartFunctions',
      data: { type: 'initDatabase' }
    }).catch(() => {});
  },

  onShow() {
    this.loadList();
  },

  loadList() {
    this.setData({ loading: true });
    wx.cloud.callFunction({
      name: 'quickstartFunctions',
      data: { type: 'getInteractionList' }
    }).then(res => {
      const result = res.result;
      if (result.success) {
        const list = result.data.map(item => {
          let isExpired = false;
          if (item.deadline && new Date(item.deadline) < new Date()) {
            isExpired = true;
          }
          return { ...item, isExpired, participants: item.participants || [] };
        });
        this.setData({ list, loading: false });
      } else {
        wx.showToast({ title: '使用本地数据', icon: 'none' });
        this.setData({ list: this.getMockData(), loading: false });
      }
    }).catch(err => {
      console.error('云函数调用失败，使用本地模拟数据:', err);
      wx.showToast({ title: '使用本地数据', icon: 'none' });
      this.setData({ list: this.getMockData(), loading: false });
    });
  },

  getMockData() {
    const now = new Date();
    return [
      {
        _id: 'mock1',
        title: '周末聚会投票',
        type: 'vote',
        content: '大家周末想去哪里玩？',
        options: ['公园野餐', '密室逃脱', 'KTV唱歌', '看电影'],
        participants: ['user1', 'user2', 'user3'],
        createdAt: new Date(now.getTime() - 3600000).toISOString(),
        isExpired: false,
        deadline: new Date(now.getTime() + 86400000).toISOString()
      },
      {
        _id: 'mock2',
        title: '生日派对邀请',
        type: 'event',
        content: '下周五晚上7点，在我家举办生日派对，欢迎大家参加！地址：XX小区XX栋XX室',
        options: [],
        participants: ['user1', 'user2'],
        createdAt: new Date(now.getTime() - 7200000).toISOString(),
        isExpired: false,
        deadline: new Date(now.getTime() + 36000000).toISOString()
      },
      {
        _id: 'mock3',
        title: '大家最近过得怎么样？',
        type: 'message',
        content: '好久没见了，想听听大家最近的近况',
        options: [],
        participants: ['user1'],
        createdAt: new Date(now.getTime() - 1800000).toISOString(),
        isExpired: false,
        deadline: null
      }
    ];
  },

  goCreate() {
    wx.navigateTo({ url: '/pages/interaction/create' });
  },

  goDetail(e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({ url: '/pages/interaction/detail?id=' + id });
  },

  formatTime(dateStr) {
    const date = new Date(dateStr);
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hour = date.getHours().toString().padStart(2, '0');
    const minute = date.getMinutes().toString().padStart(2, '0');
    return `${month}-${day} ${hour}:${minute}`;
  },

  typeLabel(type) {
    const map = { vote: '投票', event: '活动', message: '留言' };
    return map[type] || type;
  }
});