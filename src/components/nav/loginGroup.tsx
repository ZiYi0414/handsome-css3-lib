import React, { useEffect } from 'react';
import * as github_api from '@/lib/api-github/api-github';
import useLocalStorage from 'hooks/useLocalStorage';
import classNames from 'classnames';
import styles from './index.module.scss';
import Link from 'next/link';
import { GitHubUserInfo } from 'types/github';

export default function LoginGroup() {
  const [user] = useLocalStorage<GitHubUserInfo>('awa-user-info');

  const handleLogin = () => {
    github_api.login();
  };

  const handleLogOut = () => {
    github_api.logout();
  };

  const getUser = async () => {
    const res = await github_api.loadUserInfo();
  };

  useEffect(() => {
    if (github_api.getAccessToken()) {
      getUser();
    }
  }, []);

  return (
    <div className={styles.iconGroup__wrap}>
      {user ? (
        <Link href="/profile">
          <img src={user?.avatar_url} className={styles.avator} />
        </Link>
      ) : (
        <button className="ml-4 px-4" onClick={handleLogin}>
          <small>Sign in</small>
          <span
            className={classNames('iconfont ml-2 !text-[22px] icon-github')}
          />
        </button>
      )}
    </div>
  );
}
