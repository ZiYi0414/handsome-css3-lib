import { useMemo } from 'react';
import dynamic from 'next/dynamic';
import styles from './index.module.scss';
import LinkGroup from '@/components/nav/linkGroup';
import PhoneGroup from '@/components/nav/phoneGroup';
import classNames from 'classnames';
import NextImage from 'image/NextImage';
import { useTheme } from 'next-themes';
import Logo from '@/assets/img/logo.png';
import Logo_dark from '@/assets/img/logo_dark.png';
import Link from 'next/link';

const IconGroup = dynamic(import('@/components/nav/iconGroup'), { ssr: false });
export default function Header() {
  const { resolvedTheme } = useTheme();

  return (
    <header className="flex relative">
      <div className={styles.header__wrap}>
        <div className={styles.header}>
          <Link href={'/'}>
            <div className={styles.header__title}>
              <NextImage
                src={resolvedTheme === 'dark' ? Logo : Logo_dark}
                alt="AWA UI LOGO"
                width={38}
                height={38}
                draggable={false}
              ></NextImage>
              <p className="ml-2">{`AwA UI`}</p>
            </div>
          </Link>

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
