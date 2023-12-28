import { useEffect, useState } from 'react';
import Layout from 'layout/Layout';
import Seo from 'Seo';
import useLoaded from 'hooks/useLoaded';
import useLocalStorage from 'hooks/useLocalStorage';
import SideMenu from 'layout/SideMenu';
import classNames from 'classnames';
import styles from '../styles/Profile.module.scss';
import { GitHubUserInfo } from 'types/github';

export default function Profile() {
  const isLoaded = useLoaded();
  const [localUser] = useLocalStorage<GitHubUserInfo>('awa-user-info');
  const [user, setUser] = useState<GitHubUserInfo>({});
  useEffect(() => {
    setUser({ ...localUser });
  }, [localUser]);
  return (
    <Layout>
      <Seo templateTitle="AwA" />
      <div
        className={classNames(
          isLoaded && 'fade-in-start',
          styles.profile__wrap
        )}
      >
        <SideMenu data-fade="1" />
        <div className={styles.container} data-fade="1">
          <div className="flex">
            <img
              className={styles.avator}
              src={user.avatar_url ?? ''}
              alt="头像"
            />
            <div className="ml-4">
              <div className="font-semibold text-3xl">{user.name}</div>
              <div className="text-gray-300 my-1">{user.login}</div>
              <div className="mt-10 mb-4">{user.bio}</div>
              <div>
                <span>{user.company} </span>
                <span>{user.location} </span>
                <span>{user.login} </span>
                <span>{user.blog}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
