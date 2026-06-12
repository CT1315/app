export default defineAppConfig({
  pages: [
    'pages/index/index',
    'pages/questions/index',
    'pages/history/index',
    'pages/mine/index'
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: '真心话大冒险',
    navigationBarTextStyle: 'black'
  },
  tabBar: {
    color: '#636E72',
    selectedColor: '#FF6B6B',
    backgroundColor: '#ffffff',
    borderStyle: 'black',
    list: [
      {
        pagePath: 'pages/index/index',
        text: '游戏'
      },
      {
        pagePath: 'pages/questions/index',
        text: '题库'
      },
      {
        pagePath: 'pages/history/index',
        text: '历史'
      },
      {
        pagePath: 'pages/mine/index',
        text: '我的'
      }
    ]
  }
})
