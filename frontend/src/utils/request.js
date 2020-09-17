import axios, { Method } from 'axios';
import { camelizeKeys, decamelizeKeys } from 'humps';
// import store, { history } from '../redux/store/index';

axios.defaults.baseURL = 'http://10.12.137.147:8080';
// axios.defaults.withCredentials = true; // 若跨域请求需要带 cookie 身份识别
// axios.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";

// http response 拦截器
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // 401 清除token信息并跳转到登录页面
          // 后端要给提示
          sessionStorage.removeItem('jwtToken');
          window.location.href = '/';
          // history.push('/');
          console.log('401');
          break;
        case 400:
          console.log('400');
          break;
        default:
      }
    }
    // console.log(error.response.data);
    return Promise.reject(error.response.data.error);
  }
);

// query是请求头里面带的参数  data是url里面内嵌的值
const request = async (method = 'get', url = '', query = {}, data = {}) => {
  let result;
  const underscoreData = decamelizeKeys(data);
  const underscoreQuery = decamelizeKeys(query);
  const headers = {
    Authorization: `Bearer ${sessionStorage.getItem('jwtToken')}`,
  };
  switch (method.toUpperCase()) {
    case 'GET':
      console.log(underscoreData, underscoreQuery);
      Object.keys(underscoreData).map((item) => {
        var reg = new RegExp(':' + item, 'g');
        url = url.replace(reg, underscoreData[item]);
      });
      console.log(underscoreData, underscoreQuery);
      result = await axios.get(url, {
        params: underscoreQuery,
        headers,
      });
      break;
    default:
      Object.keys(underscoreData).map((item) => {
        var reg = new RegExp(':' + item, 'g');
        url = url.replace(reg, underscoreData[item]);
      });
      result = await axios({
        method,
        url,
        data: underscoreQuery,
        headers,
      });
      break;
  }
  return camelizeKeys(result).data.data;
};

export default request;
