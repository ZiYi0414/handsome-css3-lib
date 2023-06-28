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

function fetchFactory(method: string) {
  const isBrowser = typeof window !== 'undefined';
  return function (
    apiPath: string,
    data: any = {},
    base = 'https://api.github.com'
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
      'application/vnd.github.squirrel-girl-preview, application/vnd.github.html+json'
    );
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

    return fetch(url, requestOptions)
      .then(response => {
        const contentType = response.headers.get('content-type') || '';
        if (!contentType.includes('application/json')) {
          return response.text();
        }
        return response.json().then(json => {
          if (response.ok) {
            return json;
          } else {
            throw new Error(json.message);
          }
        });
      })
      .catch(error => {
        throw error;
      });
  };
}

export const http = {
  get: fetchFactory('GET'),
  post: fetchFactory('POST'),
  delete: fetchFactory('DELETE'),
  put: fetchFactory('PUT')
};
