// questions.js
const truthQuestions = [
  { id: 1, category: '基础', level: 'easy', question: '你谈过几次恋爱？' },
  { id: 2, category: '基础', level: 'easy', question: '你现在喜欢的人是谁？' },
  { id: 3, category: '基础', level: 'easy', question: '你做过的最尴尬的事情是什么？' },
  { id: 4, category: '基础', level: 'easy', question: '你最喜欢我们中间的哪个人？' },
  { id: 5, category: '基础', level: 'easy', question: '你最大的秘密是什么？' },
  { id: 6, category: '基础', level: 'medium', question: '你有没有偷偷喜欢过好朋友的对象？' },
  { id: 7, category: '基础', level: 'medium', question: '你上次哭是什么时候？为什么？' },
  { id: 8, category: '基础', level: 'medium', question: '你说过最大的谎是什么？' },
  { id: 9, category: '基础', level: 'medium', question: '你最不想让谁知道的事情是什么？' },
  { id: 10, category: '基础', level: 'medium', question: '你有没有想过出轨/劈腿？' },
  { id: 11, category: '基础', level: 'hard', question: '你做过最卑鄙的事情是什么？' },
  { id: 12, category: '基础', level: 'hard', question: '你有没有伤害过你最爱的人？' },
  { id: 13, category: '基础', level: 'hard', question: '你最遗憾的事情是什么？' },
  { id: 14, category: '基础', level: 'hard', question: '如果可以，你想和谁交换人生？' },
  { id: 15, category: '基础', level: 'hard', question: '你曾经背叛过信任你的人吗？' },
  { id: 16, category: '朋友', level: 'easy', question: '你觉得在场谁最花心？' },
  { id: 17, category: '朋友', level: 'easy', question: '你最不想和谁做朋友？' },
  { id: 18, category: '朋友', level: 'medium', question: '你有没有在背后说过朋友的坏话？' },
  { id: 19, category: '朋友', level: 'medium', question: '你觉得谁最可能先结婚？' },
  { id: 20, category: '朋友', level: 'medium', question: '你曾经因为什么事差点失去一个朋友？' },
  { id: 21, category: '朋友', level: 'hard', question: '你觉得谁最有可能离婚？' },
  { id: 22, category: '朋友', level: 'hard', question: '你最羡慕在场谁的生活？' },
  { id: 23, category: '朋友', level: 'hard', question: '你有没有讨厌过自己的朋友？' },
  { id: 24, category: '家庭', level: 'easy', question: '你爸妈知道你的男/女朋友吗？' },
  { id: 25, category: '家庭', level: 'easy', question: '你和家里关系怎么样？' },
  { id: 26, category: '家庭', level: 'medium', question: '你有没有对家人撒过很大的谎？' },
  { id: 27, category: '家庭', level: 'medium', question: '你最不喜欢家里哪个规矩？' },
  { id: 28, category: '家庭', level: 'hard', question: '你有没有埋怨过自己的父母？' },
  { id: 29, category: '家庭', level: 'hard', question: '如果家人不喜欢你的对象，你会怎么办？' },
  { id: 30, category: '家庭', level: 'hard', question: '你最害怕失去哪个家人？' },
  { id: 31, category: '工作', level: 'easy', question: '你对自己的工作满意吗？' },
  { id: 32, category: '工作', level: 'easy', question: '你有没有被老板骂哭过？' },
  { id: 33, category: '工作', level: 'medium', question: '你有没有想过辞职不干了？' },
  { id: 34, category: '工作', level: 'medium', question: '你最讨厌的同事是谁？为什么？' },
  { id: 35, category: '工作', level: 'medium', question: '你有没有说过公司或同事的坏话？' },
  { id: 36, category: '工作', level: 'hard', question: '你最想从事什么工作？' },
  { id: 37, category: '工作', level: 'hard', question: '你有没有为了工作牺牲过什么重要的东西？' },
  { id: 38, category: '金钱', level: 'easy', question: '你现在有多少存款？' },
  { id: 39, category: '金钱', level: 'easy', question: '你买过最贵的东西是什么？' },
  { id: 40, category: '金钱', level: 'medium', question: '你有没有月光族过？' },
  { id: 41, category: '金钱', level: 'medium', question: '你借过钱给朋友吗？有没有还？' },
  { id: 42, category: '金钱', level: 'hard', question: '你有没有欠过信用卡债务？' },
  { id: 43, category: '金钱', level: 'hard', question: '你会不会为了钱做出违背良心的事？' },
  { id: 44, category: '金钱', level: 'hard', question: '你最想有多少钱才能财务自由？' },
  { id: 45, category: '未来', level: 'easy', question: '你最近有什么小目标？' },
  { id: 46, category: '未来', level: 'easy', question: '你下个假期想去哪里玩？' },
  { id: 47, category: '未来', level: 'medium', question: '五年后你想成为什么样的人？' },
  { id: 48, category: '未来', level: 'medium', question: '你最想实现的梦想是什么？' },
  { id: 49, category: '未来', level: 'medium', question: '你有没有想过不婚？' },
  { id: 50, category: '未来', level: 'hard', question: '如果生命只剩一年，你会怎么过？' }
];

const dareChallenges = [
  { id: 1, category: '基础', level: 'easy', dare: '唱一首你最拿手的歌' },
  { id: 2, category: '基础', level: 'easy', dare: '模仿在场任意一个人的说话方式' },
  { id: 3, category: '基础', level: 'easy', dare: '做一个你觉得最丑的鬼脸' },
  { id: 4, category: '基础', level: 'easy', dare: '朗读一段你最讨厌的广告台词' },
  { id: 5, category: '基础', level: 'easy', dare: '用屁股写字' },
  { id: 6, category: '基础', level: 'medium', dare: '打电话给你喜欢的人说我想你' },
  { id: 7, category: '基础', level: 'medium', dare: '对墙壁深情告白十秒钟' },
  { id: 8, category: '基础', level: 'medium', dare: '模仿一只你最喜欢的动物' },
  { id: 9, category: '基础', level: 'medium', dare: '当场吃一口你带来的东西' },
  { id: 10, category: '基础', level: 'medium', dare: '扮演一个你讨厌的人' },
  { id: 11, category: '基础', level: 'hard', dare: '给你通讯录第三个人打电话说我想你了' },
  { id: 12, category: '基础', level: 'hard', dare: '给前任发一条复合的消息' },
  { id: 13, category: '基础', level: 'hard', dare: '在朋友圈发一条认错的消息' },
  { id: 14, category: '基础', level: 'hard', dare: '当众表演一个才艺' },
  { id: 15, category: '基础', level: 'hard', dare: '假装自己是偶像剧男主/女主' },
  { id: 16, category: '互动', level: 'easy', dare: '和在场的人玩石头剪刀布，输的人做十个俯卧撑' },
  { id: 17, category: '互动', level: 'easy', dare: '和你右边的人十指紧扣' },
  { id: 18, category: '互动', level: 'medium', dare: '拥抱在场你最不敢拥抱的人' },
  { id: 19, category: '互动', level: 'medium', dare: '和你左边的人互换衣服' },
  { id: 20, category: '互动', level: 'medium', dare: '和在场最帅/最美的人自拍' },
  { id: 21, category: '互动', level: 'hard', dare: '给在场的人每人一个拥抱' },
  { id: 22, category: '互动', level: 'hard', dare: '选一个人背你绕场一圈' },
  { id: 23, category: '互动', level: 'hard', dare: '和你最想单独相处的人独处三十秒' },
  { id: 24, category: '表达', level: 'easy', dare: '大声说我爱你三遍' },
  { id: 25, category: '表达', level: 'easy', dare: '说一句你最想对在场某人说的话' },
  { id: 26, category: '表达', level: 'medium', dare: '对你左边的人说十遍我喜欢你' },
  { id: 27, category: '表达', level: 'medium', dare: '当众宣布你喜欢谁' },
  { id: 28, category: '表达', level: 'medium', dare: '对最年长的人表白' },
  { id: 29, category: '表达', level: 'hard', dare: '说一件你最害怕的事情' },
  { id: 30, category: '表达', level: 'hard', dare: '当众说出你的一个缺点' },
  { id: 31, category: '恶搞', level: 'easy', dare: '把头像换成对方喜欢的类型一天' },
  { id: 32, category: '恶搞', level: 'easy', dare: '假装自己是机器人' },
  { id: 33, category: '恶搞', level: 'medium', dare: '用方言说一段话' },
  { id: 34, category: '恶搞', level: 'medium', dare: '学你喜欢的人的走路姿势' },
  { id: 35, category: '恶搞', level: 'medium', dare: '模仿某个明星的经典动作' },
  { id: 36, category: '恶搞', level: 'hard', dare: '扮演你爸妈的样子' },
  { id: 37, category: '恶搞', level: 'hard', dare: '假装你是变色龙' },
  { id: 38, category: '社交', level: 'easy', dare: '加在场一个人的微信' },
  { id: 39, category: '社交', level: 'easy', dare: '给你的微信置顶发消息' },
  { id: 40, category: '社交', level: 'medium', dare: '给好久不联系的朋友打电话' },
  { id: 41, category: '社交', level: 'medium', dare: '当场发一条朋友圈' },
  { id: 42, category: '社交', level: 'medium', dare: '给你的QQ好友第一名打电话' },
  { id: 43, category: '社交', level: 'hard', dare: '给你爸妈说我想你们了' },
  { id: 44, category: '社交', level: 'hard', dare: '在群里发一个红包' }
];

const categories = [
  { name: '基础', count: 15 },
  { name: '朋友', count: 8 },
  { name: '家庭', count: 6 },
  { name: '工作', count: 7 },
  { name: '金钱', count: 6 },
  { name: '未来', count: 6 },
  { name: '互动', count: 8 },
  { name: '表达', count: 6 },
  { name: '恶搞', count: 7 },
  { name: '社交', count: 7 }
];

Page({
  data: {
    currentType: 'truth',
    currentCategory: 'all',
    categories: [],
    truthList: [],
    dareList: [],
    filteredList: []
  },

  onLoad: function () {
    this.setData({
      truthList: truthQuestions,
      dareList: dareChallenges,
      categories: this.getCategories()
    });
    this.filterQuestions();
  },

  getCategories: function () {
    const allCategories = [...new Set([
      ...truthQuestions.map(q => q.category),
      ...dareChallenges.map(d => d.category)
    ])];
    return allCategories.map(name => ({ name }));
  },

  switchType: function (e) {
    const type = e.currentTarget.dataset.type;
    this.setData({
      currentType: type
    });
    this.filterQuestions();
  },

  selectCategory: function (e) {
    const category = e.currentTarget.dataset.category;
    this.setData({
      currentCategory: category
    });
    this.filterQuestions();
  },

  filterQuestions: function () {
    const { currentType, currentCategory } = this.data;
    let list = currentType === 'truth' ? this.data.truthList : this.data.dareList;

    if (currentCategory !== 'all') {
      list = list.filter(item => item.category === currentCategory);
    }

    this.setData({
      filteredList: list
    });
  },

  getLevelText: function (level) {
    const map = {
      easy: '简单',
      medium: '中等',
      hard: '困难'
    };
    return map[level] || level;
  }
});
