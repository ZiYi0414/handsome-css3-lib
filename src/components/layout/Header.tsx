import { useMemo } from 'react';
import styles from './index.module.scss';
import LinkGroup from '@/components/nav/linkGroup';
import IconGroup from '@/components/nav/iconGroup';
import PhoneGroup from '@/components/nav/phoneGroup';
import classNames from 'classnames';
export default function Header() {
  return (
    <header className="flex relative">
      <div className={styles.header__wrap}>
        <div className={styles.header}>
          <div className={styles.header__title}>
            <i>AwA UI</i>
          </div>
          <div className={classNames(styles.header__right, 'flex')}>
            <LinkGroup />
            <IconGroup />
          </div>
          <PhoneGroup />
        </div>
      </div>
    </header>
  );
}
