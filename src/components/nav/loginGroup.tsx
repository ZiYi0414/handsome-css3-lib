import classNames from 'classnames';
import styles from './index.module.scss';
import React, { useEffect } from 'react';
// import { useSession, signIn, signOut } from 'next-auth/react';
import * as github_api from '@/lib/api-github/api-github';

export default function LoginGroup() {
  // const { data } = useSession();
  const handleLogin = () => {
    // signIn();
    github_api.login();
  };

  const handleLogOut = () => {
    // signOut();
  };

  // useEffect(() => {
  //   console.log(data);
  // }, [data]);

  return (
    <div className={styles.iconGroup__wrap}>
      <button className="ml-4 px-4" onClick={handleLogin}>
        <small>Sign in</small>
        <span
          className={classNames('iconfont ml-2 !text-[22px] icon-github')}
        />
      </button>
    </div>
  );
}
