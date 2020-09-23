import request from '../utils/request';

const GET = 'GET';
const POST = 'POST';

// 每个api都给个注释描述功能吧，方便看
// 不用每个api都走redux，酌情处理（写的太恶心了

// 退出登录
export const logout = {
  fetcher: async (url, data) => request(POST, url, data),
  url: '/logout',
};

// 修改密码
export const updatePassword = {
  fetcher: async (url, data) => request(POST, url, data),
  url: '/password',
};
