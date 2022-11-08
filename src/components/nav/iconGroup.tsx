import { useTheme } from 'next-themes';
import Link from 'next/link';
import classNames from 'classnames';
import styles from './index.module.scss';
import UnstyledLink from 'content/link/UnstyledLink';

export default function IconGroup() {
  const { theme, setTheme } = useTheme();

  return (
    <div className={styles.iconGroup__warp}>
      <UnstyledLink href={'https://github.com/ZiYi0414/handsome-css3-lib'}>
        <button className="flex flex-col">
          <div className="flex justify-center items-center">
            <small className="text-[#d23669]">like</small>
            <span className="iconfont icon-github ml-2 !text-[22px]" />
          </div>
          <div className="flex justify-center items-center">
            <span className="iconfont icon-github1 !text-[34px]" />
            <span className="iconfont icon-github1 ml-2 !text-[34px]" />
          </div>
        </button>
      </UnstyledLink>

      <button
        className="ml-4"
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      >
        <small>{theme === 'dark' ? '辉' : '耀'}</small>
        <span
          className={classNames(
            'iconfont ml-2 !text-[22px]',
            theme === 'dark' ? 'icon-moon' : 'icon-sun'
          )}
        />
      </button>
    </div>
  );
}
