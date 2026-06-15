Page({
  data: {
    type: 'vote',
    title: '',
    content: '',
    options: ['', ''],
    deadline: '',
    submitting: false
  },

  onLoad() {
    if (!wx.cloud) {
      wx.showToast({ title: '请使用 2.2.3 或以上的基础库', icon: 'none' });
    }
  },

  selectType(e) {
    this.setData({ type: e.currentTarget.dataset.type });
  },

  onTitleChange(e) {
    this.setData({ title: e.detail.value });
  },

  onContentChange(e) {
    this.setData({ content: e.detail.value });
  },

  onOptionChange(e) {
    const index = e.currentTarget.dataset.index;
    const options = this.data.options;
    options[index] = e.detail.value;
    this.setData({ options });
  },

  addOption() {
    this.setData({ options: [...this.data.options, ''] });
  },

  removeOption(e) {
    const index = e.currentTarget.dataset.index;
    if (this.data.options.length <= 2) {
      wx.showToast({ title: '至少保留两个选项', icon: 'none' });
      return;
    }
    const options = this.data.options.filter((_, i) => i !== index);
    this.setData({ options });
  },

  onDeadlineChange(e) {
    this.setData({ deadline: e.detail.value });
  },

  submit() {
    const { type, title, content, options, deadline } = this.data;
    if (!title.trim()) {
      wx.showToast({ title: '请输入标题', icon: 'none' });
      return;
    }
    if (type === 'vote' && options.some(o => !o.trim())) {
      wx.showToast({ title: '请填写完整选项', icon: 'none' });
      return;
    }
    if (type === 'event' && !content.trim()) {
      wx.showToast({ title: '请输入活动内容', icon: 'none' });
      return;
    }

    this.setData({ submitting: true });
    const payload = {
      type,
      title: title.trim(),
      content: content.trim(),
      options: type === 'vote' ? options.filter(o => o.trim()) : [],
      deadline: deadline || null
    };

    wx.cloud.callFunction({
      name: 'quickstartFunctions',
      data: { type: 'createInteraction', data: payload }
    }).then(res => {
      const result = res.result;
      if (result.success) {
        wx.showToast({ title: '发布成功', icon: 'success' });
        setTimeout(() => {
          wx.navigateBack();
        }, 1000);
      } else {
        wx.showToast({ title: result.errMsg || '发布失败', icon: 'none' });
        this.setData({ submitting: false });
      }
    }).catch(err => {
      console.error(err);
      wx.showToast({ title: '发布失败', icon: 'none' });
      this.setData({ submitting: false });
    });
  }
});