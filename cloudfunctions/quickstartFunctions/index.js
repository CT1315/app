const cloud = require("wx-server-sdk");
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV,
});

const db = cloud.database();
const _ = db.command;

const initDatabase = async () => {
  try { await db.createCollection('interactions'); } catch (e) {}
  try { await db.createCollection('participations'); } catch (e) {}
  return { success: true };
};

// 获取openid
const getOpenId = async () => {
  const wxContext = cloud.getWXContext();
  return {
    openid: wxContext.OPENID,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID,
  };
};

// 创建互动
const createInteraction = async (event) => {
  const { title, type, content, options, deadline } = event.data;
  const wxContext = cloud.getWXContext();
  try {
    const result = await db.collection('interactions').add({
      data: {
        _openid: wxContext.OPENID,
        title,
        type,
        content: content || '',
        options: options || [],
        deadline: deadline ? new Date(deadline) : null,
        participants: [],
        createdAt: new Date(),
        status: 'active'
      }
    });
    return { success: true, data: { _id: result._id } };
  } catch (e) {
    return { success: false, errMsg: e.message || e };
  }
};

// 获取互动列表
const getInteractionList = async () => {
  try {
    const { data } = await db.collection('interactions').orderBy('createdAt', 'desc').limit(50).get();
    return { success: true, data };
  } catch (e) {
    return { success: false, errMsg: e.message || e };
  }
};

// 获取互动详情
const getInteractionDetail = async (event) => {
  const { id } = event.data;
  const wxContext = cloud.getWXContext();
  try {
    const { data: [detail] } = await db.collection('interactions').where({ _id: id }).get();
    if (!detail) return { success: false, errMsg: 'not found' };

    const { data: myParticipation } = await db.collection('participations').where({
      interactionId: id,
      _openid: wxContext.OPENID
    }).get();

    let isExpired = false;
    if (detail.deadline && new Date(detail.deadline) < new Date()) {
      isExpired = true;
    }

    return { success: true, data: { ...detail, hasParticipated: myParticipation.length > 0, isExpired } };
  } catch (e) {
    return { success: false, errMsg: e.message || e };
  }
};

// 参与互动
const participate = async (event) => {
  const { interactionId, type, content, choice } = event.data;
  const wxContext = cloud.getWXContext();
  try {
    const { data: existing } = await db.collection('participations').where({
      interactionId,
      _openid: wxContext.OPENID
    }).get();
    if (existing.length > 0) {
      return { success: false, errMsg: '你已经参与过了' };
    }

    const { data: [interaction] } = await db.collection('interactions').where({ _id: interactionId }).get();
    if (!interaction) return { success: false, errMsg: '互动不存在' };
    if (interaction.deadline && new Date(interaction.deadline) < new Date()) {
      return { success: false, errMsg: '已截止' };
    }

    await db.collection('participations').add({
      data: {
        _openid: wxContext.OPENID,
        interactionId,
        type,
        content: content || choice || '',
        choice: choice || '',
        createdAt: new Date()
      }
    });

    await db.collection('interactions').doc(interactionId).update({
      data: {
        participants: _.push(wxContext.OPENID)
      }
    });

    return { success: true };
  } catch (e) {
    return { success: false, errMsg: e.message || e };
  }
};

// 获取结果
const getResults = async (event) => {
  const { interactionId } = event.data;
  try {
    const { data: participations } = await db.collection('participations').where({
      interactionId
    }).orderBy('createdAt', 'desc').get();

    const { data: [interaction] } = await db.collection('interactions').where({ _id: interactionId }).get();
    let voteStats = {};
    if (interaction && interaction.type === 'vote' && interaction.options) {
      interaction.options.forEach(opt => voteStats[opt] = 0);
      participations.forEach(p => {
        if (p.choice && voteStats[p.choice] !== undefined) {
          voteStats[p.choice]++;
        }
      });
    }

    return { success: true, data: { participations, voteStats } };
  } catch (e) {
    return { success: false, errMsg: e.message || e };
  }
};

// 云函数入口函数
exports.main = async (event, context) => {
  switch (event.type) {
    case "initDatabase":
      return await initDatabase();
    case "getOpenId":
      return await getOpenId();
    case "createInteraction":
      return await createInteraction(event);
    case "getInteractionList":
      return await getInteractionList();
    case "getInteractionDetail":
      return await getInteractionDetail(event);
    case "participate":
      return await participate(event);
    case "getResults":
      return await getResults(event);
  }
};
