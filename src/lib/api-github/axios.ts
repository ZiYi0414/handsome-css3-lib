import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { LS_ACCESS_TOKEN_KEY } from './constants';

const pendingRequest: Map<string, any> = new Map();

const { CancelToken } = axios;

export const API_PREFIX = '';

export const SUCCESS_CODE = '200';

const instance = axios.create({
  baseURL: API_PREFIX,
  timeout: 30 * 1000,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
    Accept:
      'application/vnd.github.squirrel-girl-preview, application/vnd.github.html+json,application/json',
    // 添加跨域的头部信息
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
    'X-GitHub-Api-Version': '2022-11-28'
  }
});

/**
 * 生成唯一的请求key
 * @param config
 */
const getRequestKey = (config: AxiosRequestConfig): string => {
  const { url, method, data, params } = config;
  return `${method}${url}${JSON.stringify(method === 'GET' ? params : data)}`;
};

/**
 * 将请求添加到请求队列里面
 * @param config
 */
const addPendingRequest = (config: AxiosRequestConfig): void => {
  const requestKey: string = getRequestKey(config);
  config.cancelToken =
    config.cancelToken ||
    new CancelToken(c => {
      if (requestKey && !pendingRequest.has(requestKey)) {
        pendingRequest.set(requestKey, c);
      }
    });
};

/**
 * 移除请求队列中的重复请求
 * @param config
 */
const removePendingRequest = (config: AxiosRequestConfig): void => {
  const requestKey: string = getRequestKey(config);
  if (requestKey && pendingRequest.has(requestKey)) {
    const cancel = pendingRequest.get(requestKey);

    cancel(requestKey);
    pendingRequest.delete(requestKey);
  }
};

instance.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    try {
      removePendingRequest(config);
      addPendingRequest(config);
      if (
        localStorage.getItem('token') &&
        typeof config.headers?.set === 'function'
      ) {
        // append token
        const token = JSON.parse(
          localStorage.getItem(LS_ACCESS_TOKEN_KEY)!
        )?.token;

        const Authorization: string = 'Bearer ' + token;
        token && config.headers.set('Authorization', Authorization);
      }

      return config;
    } catch (err) {
      removePendingRequest(config);
      return Promise.reject(err);
    }
  },
  err => {
    removePendingRequest(err.config);
    if (axios.isCancel(err)) {
      console.log('Request canceled', err.message);
    } else {
      return Promise.reject(err);
    }
  }
);

instance.interceptors.response.use(
  (res: AxiosResponse) => {
    try {
      removePendingRequest(res.config);
      const data = res.data;

      return data;
    } catch (err) {
      console.error(err);
      //   return Promise.reject(err);
    }
  }
  //   err => Promise.reject(err)
);

export default instance;
