import request from 'Utils/request';

const GET = 'GET';
const POST = 'POST';

// 获取活动信息
export const getActivities = {
  fetcher: async (url, query, data) => request(GET, url, query, data),
  url: '/admin/:society_name/activity',
};

// 游客获取活动信息
export const getVisitActivities = {
  fetcher: async (url, query, data) => request(GET, url, query, data),
  url: '/society/:society_name/activity',
};

// 反馈
export const feedback = {
  fetcher: async (url, query, data) => request(POST, url, query, data),
  url: '/society/:society_name/feedback',
};

// 获取社团信息
export const getScoietyDetail = {
  fetcher: async (url, query, data) => request(GET, url, query, data),
  url: '/society/:society_name/info',
};

// 参加或退出活动
export const joinOrQuitActivity = {
  fetcher: async (url, query, data) => request(POST, url, query, data),
  url: '/admin/:society_name/activity/join',
};

// 查询面试状态
export const getStatus = {
  fetcher: async (query, data) => request(GET, url, query, data),
  url: '/newer/:association_name/status/:phone',
};
