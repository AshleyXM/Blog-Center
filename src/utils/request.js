// axios的封装处理
import axios from "axios";
import { getToken, removeToken } from "./token";
import router from "@/router";

// 1. 根域名配置
// 2. 超时时间
// 3. 请求拦截器 / 响应拦截器
const request = axios.create({
  baseURL: "https://mock.apipark.cn/m1/4720333-4372679-default",
  timeout: 5000,
});

// 请求拦截器
// 在请求发送之前做拦截，插入一些自定义的配置（如参数的设置）
request.interceptors.request.use(
  // 操作config注入token数据
  // 1. 获取token
  // 2.按照后端格式要求做token拼接
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
// 在响应返回到客户端之前做拦截，重点处理返回的数据
request.interceptors.response.use(
  (response) => {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    return response.data;
  },
  (error) => {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    // 监控401 token失效
    // console.dir(error);
    if (error?.response?.status === 401) {
      removeToken();
      window.location.reload(); // 强制刷新，否则会有401报错显示在界面，需要手动关闭
    }
    return Promise.reject(error);
  }
);

export { request };
