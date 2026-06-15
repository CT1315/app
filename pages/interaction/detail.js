Page({
  data: {
    id: '',
    detail: null,
    loading: true,
    selectedOption: '',
    replyContent: '',
    results: null,
    showResults: false
  },

  onLoad(options) {
    if (options.id) {
      this.setData({ id: options.id });
      this.loadDetail();
    } else {
      wx.showToast({ title: '无效参数', icon: 'none' });
      wx.navigateBack();
    }
  },

  loadDetail() {
    this.setData({ loading: true });
    wx.cloud.callFunction({
      name: 'quickstartFunctions',
      data: { type: 'getInteractionDetail', data: { id: this.data.id } }
    }).then(res => {
      const result = res.result;
      if (result.success) {
        this.setData({ detail: result.data, loading: false });
        if (result.data.hasParticipated || result.data.isExpired) {
          this.loadResults();
        }
      } else {
        wx.showToast({ title: '使用本地数据', icon: 'none' });
        const mockDetail = this.getMockDetail();
        this.setData({ detail: mockDetail, loading: false });
        if (mockDetail.hasParticipated || mockDetail.isExpired) {
          this.loadResults();
        }
      }
    }).catch(err => {
      console.error('云函数调用失败，使用本地模拟数据:', err);
      wx.showToast({ title: '使用本地数据', icon: 'none' });
      const mockDetail = this.getMockDetail();
      this.setData({ detail: mockDetail, loading: false });
      if (mockDetail.hasParticipated || mockDetail.isExpired) {
        this.loadResults();
      }
    });
  },

  getMockDetail() {
    const now = new Date();
    const mockData = {
      mock1: {
        _id: 'mock1',
        title: '周末聚会投票',
        type: 'vote',
        content: '大家周末想去哪里玩？',
        options: ['公园野餐', '密室逃脱', 'KTV唱歌', '看电影'],
        participants: ['user1', 'user2', 'user3'],
        createdAt: new Date(now.getTime() - 3600000).toISOString(),
        isExpired: false,
        deadline: new Date(now.getTime() + 86400000).toISOString(),
        hasParticipated: false
      },
      mock2: {
        _id: 'mock2',
        title: '生日派对邀请',
        type: 'event',
        content: '下周五晚上7点，在我家举办生日派对，欢迎大家参加！地址：XX小区XX栋XX室',
        options: [],
        participants: ['user1', 'user2'],
        createdAt: new Date(now.getTime() - 7200000).toISOString(),
        isExpired: false,
        deadline: new Date(now.getTime() + 36000000).toISOString(),
        hasParticipated: false
      },
      mock3: {
        _id: 'mock3',
        title: '大家最近过得怎么样？',
        type: 'message',
        content: '好久没见了，想听听大家最近的近况',
        options: [],
        participants: ['user1'],
        createdAt: new Date(now.getTime() - 1800000).toISOString(),
        isExpired: false,
        deadline: null,
        hasParticipated: false
      }
    };
    return mockData[this.data.id] || mockData.mock1;
  },

  loadResults() {
    wx.cloud.callFunction({
      name: 'quickstartFunctions',
      data: { type: 'getResults', data: { interactionId: this.data.id } }
    }).then(res => {
      const result = res.result;
      if (result.success) {
        this.setData({ results: result.data, showResults: true });
      } else {
        this.setData({ results: this.getMockResults(), showResults: true });
      }
    }).catch(err => {
      console.error('云函数调用失败，使用本地模拟数据:', err);
      this.setData({ results: this.getMockResults(), showResults: true });
    });
  },

  getMockResults() {
    const now = new Date();
    const mockResults = {
      mock1: {
        participations: [
          { _id: 'p1', choice: '密室逃脱', createdAt: new Date(now.getTime() - 300000).toISOString() },
          { _id: 'p2', choice: '公园野餐', createdAt: new Date(now.getTime() - 600000).toISOString() },
          { _id: 'p3', choice: '密室逃脱', createdAt: new Date(now.getTime() - 900000).toISOString() }
        ],
        voteStats: { '公园野餐': 1, '密室逃脱': 2, 'KTV唱歌': 0, '看电影': 0 }
      },
      mock2: {
        participations: [
          { _id: 'p1', content: '报名', createdAt: new Date(now.getTime() - 300000).toISOString() },
          { _id: 'p2', content: '报名', createdAt: new Date(now.getTime() - 600000).toISOString() }
        ],
        voteStats: {}
      },
      mock3: {
        participations: [
          { _id: 'p1', content: '最近工作挺忙的，但是很充实！', createdAt: new Date(now.getTime() - 300000).toISOString() }
        ],
        voteStats: {}
      }
    };
    return mockResults[this.data.id] || mockResults.mock1;
  },

  selectOption(e) {
    this.setData({ selectedOption: e.currentTarget.dataset.value });
  },

  onReplyChange(e) {
    this.setData({ replyContent: e.detail.value });
  },

  submitParticipate() {
    const { detail, selectedOption, replyContent } = this.data;
    if (detail.hasParticipated) {
      wx.showToast({ title: '你已参与过', icon: 'none' });
      return;
    }
    if (detail.isExpired) {
      wx.showToast({ title: '已截止', icon: 'none' });
      return;
    }

    let content = '';
    let choice = '';
    if (detail.type === 'vote') {
      if (!selectedOption) {
        wx.showToast({ title: '请选择一个选项', icon: 'none' });
        return;
      }
      choice = selectedOption;
    } else if (detail.type === 'message') {
      if (!replyContent.trim()) {
        wx.showToast({ title: '请输入留言', icon: 'none' });
        return;
      }
      content = replyContent.trim();
    } else if (detail.type === 'event') {
      content = '报名';
    }

    wx.cloud.callFunction({
      name: 'quickstartFunctions',
      data: {
        type: 'participate',
        data: {
          interactionId: detail._id,
          type: detail.type,
          content,
          choice
        }
      }
    }).then(res => {
      const result = res.result;
      if (result.success) {
        wx.showToast({ title: '参与成功', icon: 'success' });
        this.loadDetail();
      } else {
        wx.showToast({ title: result.errMsg || '参与失败', icon: 'none' });
      }
    }).catch(err => {
      console.error(err);
      wx.showToast({ title: '参与失败', icon: 'none' });
    });
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