import { LS_ACCESS_TOKEN_KEY, LS_USER_KEY } from './constants';
import { Query, http } from './uitls';
import { GitHubTokenResponse } from 'types/github';
import { resBody } from 'types/api';

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
  setUserLocal
};
