import { LS_ACCESS_TOKEN_KEY } from './constants';

export const isString = (s: any): s is string =>
  toString.call(s) === '[object String]';

export function getTargetContainer(container: Element | string): Element {
  let targetContainer: Element;
  if (container instanceof Element) {
    targetContainer = container;
  } else if (isString(container)) {
    targetContainer = document.getElementById(container)!;
  } else {
    targetContainer = document.createElement('div');
  }

  return targetContainer;
}

export interface QueryParams {
  [key: string]: string;
}

export const Query = {
  parse(search: string = window.location.search): QueryParams {
    if (!search) return {};
    const queryString = search[0] === '?' ? search.substring(1) : search;
    const query: QueryParams = {};
    queryString.split('&').forEach(queryStr => {
      const [key, value] = queryStr.split('=');
      if (key) query[key] = value;
    });

    return query;
  },
  stringify(query: QueryParams, prefix = '?'): string {
    const queryString = Object.keys(query)
      .map(key => `${key}=${encodeURIComponent(query[key] || '')}`)
      .join('&');
    return queryString ? prefix + queryString : '';
  }
};

// 创建缓存池
const genRequestKey = (url: string, param = {}) => {
  return url + Object.entries(param).map(([k, v]) => `${k}=${v}`);
};
const sleep = (t: number) => new Promise(resolve => setTimeout(resolve, t));

const requestMap = new Map();
const resultMap = new Map();
const expire = 300;

function fetchFactory(method: string) {
  const isBrowser = typeof window !== 'undefined';
  return async function (
    apiPath: string,
    data: any = {},
    // base = 'https://api.github.com'
    base = ''
  ) {
    const token = isBrowser
      ? localStorage.getItem(LS_ACCESS_TOKEN_KEY)
      : undefined;

    let url = `${base}${apiPath}`;
    if (method === 'GET' || method === 'DELETE') {
      url += Query.stringify(data);
    }

    const headers = new Headers();
    headers.append(
      'Accept',
      'application/vnd.github.squirrel-girl-preview, application/vnd.github.raw+json'
    );
    headers.append('X-GitHub-Api-Version', '2022-11-28');
    // 添加跨域的头部信息
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    // 添加其他头部信息
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    if (token) {
      headers.append('Authorization', `Bearer ${token}`);
    }

    const requestOptions: RequestInit = {
      method,
      headers
    };

    if (method !== 'GET' && method !== 'DELETE') {
      headers.set('Content-Type', 'application/json');
      requestOptions.body = JSON.stringify(data);
    }

    const key = genRequestKey(url, requestOptions);
    const result = resultMap.get(key);
    if (result) {
      const { t, data } = result;
      if (Date.now() < t + expire) {
        return data;
      }
    }

    const request = requestMap.get(key);
    if (request) return await request;

    const createFetch = (
      url: string,
      requestOptions: {},
      onResponse: (res: any) => void
    ) => {
      try {
        return fetch(url, requestOptions)
          .then(response => {
            const contentType = response.headers.get('content-type') || '';
            if (!contentType.includes('application/json')) {
              return response.text();
            }
            onResponse(response);
            return response.json().then(json => {
              if (response.ok) {
                return json;
              } else {
                console.error(json.message);
              }
            });
          })
          .catch(error => {
            throw error;
          });
      } catch (err) {
        console.error(err);
      }
    };

    const promise = createFetch(url, requestOptions, result => {
      resultMap.set(key, {
        t: Date.now(),
        data: result
      });
      requestMap.delete(key);
    });

    requestMap.set(key, promise);

    return await promise;
  };
}

export const http = {
  get: fetchFactory('GET'),
  post: fetchFactory('POST'),
  delete: fetchFactory('DELETE'),
  put: fetchFactory('PUT')
};
