import { LS_ACCESS_TOKEN_KEY, LS_USER_KEY } from './constants';
import { Query, http } from './uitls';
import {
  GitHubIssuesComponent,
  GitHubTokenResponse,
  getComponentsBodyFormGithub,
  getComponentsBodyInServer
} from 'types/github';
import { resBody } from 'types/api';
import { ContentType, HSComponentProps, SlugComponentProps } from 'types/component';

const oauthUri = 'https://github.com/login/oauth/authorize';
const redirect_uri =
  'http://localhost:8204/github_login' || window.location.href;
const scope = 'public_repo';
const client_id = process.env.NEXT_PUBLIC_CLIENT_ID ?? '';
const client_secret = process.env.NEXT_PUBLIC_CLIENT_SERCRET ?? '';

const oauthParams = { redirect_uri, scope, client_id };

const getAccessToken = () => {
  return localStorage.getItem(LS_ACCESS_TOKEN_KEY);
};

const setAccessToken = (token: string) => {
  if (window) localStorage.setItem(LS_ACCESS_TOKEN_KEY, token);
};

const getUserLocal = () => {
  return localStorage.getItem(LS_USER_KEY);
};
const setUserLocal = (user: any) => {
  if (window) localStorage.setItem(LS_USER_KEY, JSON.stringify(user));
};

const login = () => {
  window.location.href = `${oauthUri}${Query.stringify(oauthParams)}`;
};

const logout = () => {
  localStorage.removeItem(LS_ACCESS_TOKEN_KEY);
  localStorage.removeItem(LS_USER_KEY);
};

const getTokenFormGithub = (
  code: string,
  successCallBack?: (res?: any) => void
) => {
  http
    .get(
      '/api/auth/github_login',
      {
        code
      },
      ''
    )
    .then((data: resBody<GitHubTokenResponse>) => {
      setAccessToken(data.data.access_token);
      successCallBack?.(data);
      return data;
    })
    .catch(e => {
      console.log(e);
      return e;
    });
};

const getTokenFormGithubInServer = async (
  code: string
): Promise<GitHubTokenResponse> => {
  return await http
    .post(
      'https://github.com/login/oauth/access_token',
      {
        code,
        client_id,
        client_secret
      },
      ''
    )
    .then((data: any) => {
      return data;
    })
    .catch(e => {
      console.error(e);
    });
};

const getComponentsFormGithubByType = async (
  body: getComponentsBodyInServer,
  successCallBack?: (res?: any) => void
): Promise<resBody<HSComponentProps[]>> => {
  return http
    .get(
      '/api/components/type',
      {
        ...body
      },
      ''
    )
    .then((data: resBody<HSComponentProps[]>) => {
      successCallBack?.(data);
      return data;
    })
    .catch(e => {
      console.log(e);
      return e;
    });
};

const getAllComponentsFormGithub = async (
  body: getComponentsBodyFormGithub,
  successCallBack?: (res?: any) => void
): Promise<resBody<HSComponentProps[]>> => {
  return http
    .get('/api/components/all', {
      ...body
    })
    .then((data: resBody<HSComponentProps[]>) => {
      successCallBack?.(data);
      return data;
    })
    .catch(e => {
      console.log(e);
      return e;
    });
};

const getAllComponetsFormGithubInServer = async (
  body: getComponentsBodyFormGithub
): Promise<GitHubIssuesComponent[]> => {
  const { type, page = 1, per_page = 20 } = body;
  return await http
    .get(
      'https://api.github.com/repos/ZiYi0414/handsome-css3-lib/issues',
      {
        labels: 'component,' + (type?.join(',') || ''),
        page,
        per_page
      },
      ''
    )
    .then((res: GitHubIssuesComponent[]) => {
      return res;
    })
    .catch(e => {
      console.error(e);
      return [];
    });
};

const getComponentDetailFormGithub = async (
  slug: number,
  successCallBack?: (res?: any) => void
): Promise<resBody<SlugComponentProps>> => {
  return http
    .get('/api/components/detail', {
      slug
    })
    .then((data: resBody<SlugComponentProps>) => {
      successCallBack?.(data);
      return data;
    })
    .catch(e => {
      console.log(e);
      return e;
    });
};

const getComponentDetailFormGithubInServer = async (
  slug: number
): Promise<GitHubIssuesComponent> => {
  return await http
    .get(
      'https://api.github.com/repos/ZiYi0414/handsome-css3-lib/issues/' + slug
    )
    .then((data: GitHubIssuesComponent) => {
      return data;
    })
    .catch(e => {
      console.error(e);
      return {} as GitHubIssuesComponent;
    });
};

const loadUserInfo = () => {
  if (!getAccessToken()) {
    logout();
    return Promise.resolve({});
  }

  return http
    .get('/apiservice/user')
    .then(user => {
      setUserLocal(user);
      return user;
    })
    .catch(err => err);
};

export {
  getAccessToken,
  setAccessToken,
  loadUserInfo,
  login,
  logout,
  getTokenFormGithub,
  getTokenFormGithubInServer,
  getUserLocal,
  setUserLocal,
  getAllComponetsFormGithubInServer,
  getAllComponentsFormGithub,
  getComponentsFormGithubByType,
  getComponentDetailFormGithubInServer,
  getComponentDetailFormGithub
};
