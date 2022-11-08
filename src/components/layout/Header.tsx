import { useMemo } from 'react';
import styles from './index.module.scss';
import LinkGroup from '@/components/nav/linkGroup';
import IconGroup from '@/components/nav/iconGroup';
export default function Header() {
  return (
    <header className={styles.header__wrap}>
      <div className={styles.header}>
        <div></div>
        <div className='flex'>
          <LinkGroup />
          <IconGroup />
        </div>
      </div>
    </header>
  );
}
