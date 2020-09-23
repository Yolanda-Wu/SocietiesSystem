import request from 'Utils/request';

const GET = 'GET';
const POST = 'POST';

// 社团联盟登录
export const leagueLogin = {
  fetcher: async (url, data) => request(POST, url, data),
  url: '/login',
};

// 提交申请
export const sendApply = {
  fetcher: async (url, data) => request(POST, url, data),
  url: '/application/submit',
};

// 获取社团列表
export const getSocietyList = {
  fetcher: async (url, data) => request(GET, url, data),
  url: '/league/society',
};

// 修改社团联系信息
export const updateContact = {
  fetcher: async (url, data) => request(POST, url, data),
  url: '/league/admin',
};

// 获取申请表
export const getApplications = {
  fetcher: async (url, data) => request(GET, url, data),
  url: '/admin/application/review',
};

// 审核申请表
export const reviewApplication = {
  fetcher: async (url, data) => request(POST, url, data),
  url: '/admin/application/review',
};
