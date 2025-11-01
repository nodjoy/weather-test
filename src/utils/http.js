import axios from "axios";
// import { tokenManager } from './tokenManager.js';
// 根据环境选择 baseURL
const getBaseURL = () => {
  // 开发环境：使用代理路径
  if (import.meta.env.DEV) {
    // return {
    //   qweather: '/qweather',
    //   openweather: '/openweather'
    // };
    return import.meta.env.VITE_DEV_API
  }
  // 生产环境：使用真实 API
  else {
    // return {
    //   qweather: `https://${import.meta.env.VITE_API_HOST}`,
    //   openweather: 'https://api.openweathermap.org/data/2.5'
    // };
    return import.meta.env.VITE_PROD_API
  }
};

const baseURLs = getBaseURL();

// 和风天气API
const httpInstance = axios.create({
  baseURL: baseURLs,
  timeout: 10000,
});

// 添加请求拦截器 - 动态添加Token
httpInstance.interceptors.request.use(async function (config) {
  try {
    //  发送请求: ${config.method?.toUpperCase()} ${config.url}
  } catch (error) {
   
  }

  return config;
}, function (error) {
  console.error('❌ 请求配置错误:', error);
  return Promise.reject(error);
});

// 添加响应拦截器
httpInstance.interceptors.response.use(function (response) {
  // console.log(`✅ 请求成功: ${response.status} ${response.config.url}`);
  return response;
}, function (error) {
  console.error('❌ 请求失败:', {
    url: error.config?.url,
    method: error.config?.method,
    status: error.response?.status,
    message: error.message
  });

  // 处理Token过期的情况
  if (error.response?.status === 401) {
    // console.log('🔄 Token可能过期，清除缓存');
    // tokenManager.currentToken = null; // 强制下次重新获取Token
  }

  return Promise.reject(error);
});
export default httpInstance;


