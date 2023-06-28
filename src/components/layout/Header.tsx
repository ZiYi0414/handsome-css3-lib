import dynamic from 'next/dynamic';
import styles from './index.module.scss';
import LinkGroup from '@/components/nav/linkGroup';
import PhoneGroup from '@/components/nav/phoneGroup';
import classNames from 'classnames';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import LoginGroup from 'nav/loginGroup';

const IconGroup = dynamic(import('@/components/nav/iconGroup'), { ssr: false });
export default function Header() {
  return (
    <header className="flex relative">
      <div className={styles.header__wrap}>
        <div className={styles.header}>
          <Link href={'/'}>
            <div className={styles.header__title}>
              <span className="iconfont icon-awa-logo ml-2 !text-[32px]" />
              <p className="ml-2">{`AwA UI`}</p>
            </div>
          </Link>

          <div className={classNames(styles.header__right, 'flex')}>
            <LinkGroup />
            <IconGroup />
            <LoginGroup />
          </div>
          <PhoneGroup />
        </div>
      </div>
    </header>
  );
}
