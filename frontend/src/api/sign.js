import request from 'Utils/request';

const GET = 'GET';
const POST = 'POST';

// 发送验证码
export const sendYzm = {
  fetcher: async (url, data) => request(POST, url, data),
  url: '/verify_code'
};

// 获得文件上传token
export const getUploadToken = {
  fetcher: async (url, data) => request(POST, url, data),
  url: '/upload_token'
};

// 获得报名表信息
export const getFormInfo = {
  fetcher: async (url, query, data) => request(GET, url, query, data),
  url: '/newer/:association_name/form'
};

// 获得先前填写的报名表信息
export const getPrevFormInfo = {
  fetcher: async (url, query, data) => request(POST, url, query, data),
  url: '/newer/:association_name/form/:phone'
};

// 报名(包括更新信息)
export const updateFormInfo = {
  fetcher: async (query, data) => request(POST, url, query, data),
  url: '/newer/:association_name/:group_name/signup'
};

// 查询面试状态
export const getStatus = {
  fetcher: async (query, data) => request(GET, url, query, data),
  url: '/newer/:association_name/status/:phone'
};
