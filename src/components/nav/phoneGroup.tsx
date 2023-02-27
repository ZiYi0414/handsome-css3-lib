import { useTheme } from 'next-themes';
import classNames from 'classnames';
import styles from './index.module.scss';
import SideMenu from './sideMenu';
import { useState } from 'react';

export default function PhoneGroup() {
  const { resolvedTheme, setTheme } = useTheme();
  const [showSideMenu, setShowSideMenu] = useState(false);
  return (
    <div className={styles.phoneGroup__wrap}>
      <button
        className="mr-4"
        onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
      >
        <span
          className={classNames(
            'iconfont !text-[25px]',
            resolvedTheme === 'dark' ? 'icon-moon' : 'icon-sun'
          )}
        />
      </button>
      <div className={styles.bar__btn} onClick={() => setShowSideMenu(true)}>
        <label className={styles.bar}>
          <span className={styles.top}></span>
          <span className={styles.middle}></span>
          <span className={styles.bottom}></span>
        </label>
      </div>
      <div
        className={classNames(
          !showSideMenu && styles.sidemenu__mask__hidden,
          showSideMenu && styles.sidemenu__mask
        )}
        onClick={() => {
          setShowSideMenu(false);
        }}
      >
        <SideMenu show={showSideMenu} />
      </div>
    </div>
  );
}
