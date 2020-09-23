import request from 'Utils/request';

const GET = 'GET';
const POST = 'POST';

// 社团联盟登录
export const adminLogin = {
  fetcher: async (url, data) => request(POST, url, data),
  url: '/login',
};

// 获取成员列表
export const getMemberList = {
  fetcher: async (url, query, data) => request(GET, url, query, data),
  url: '/admin/:society_name/member',
};

// 修改成员
export const updateMember = {
  fetcher: async (url, query, data) => request(POST, url, query, data),
  url: '/admin/:society_name/member',
};

// 获取活动信息
export const getActivities = {
  fetcher: async (url, query, data) => request(GET, url, query, data),
  url: '/admin/:society_name/activity',
};

// 修改活动信息
export const updateActivities = {
  fetcher: async (url, query, data) => request(POST, url, query, data),
  url: '/admin/:society_name/activity',
};

// 报名(包括更新信息)
export const updateFormInfo = {
  fetcher: async (query, data) => request(POST, url, query, data),
  url: '/newer/:association_name/:group_name/signup',
};

// 查询面试状态
export const getStatus = {
  fetcher: async (query, data) => request(GET, url, query, data),
  url: '/newer/:association_name/status/:phone',
};
